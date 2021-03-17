import {useState, useEffect} from 'react';
import firebase from 'firebase/app';
import { Form, FormGroup, Label, Input, Button, Alert, Card, CardGroup, CardBody, CardTitle, CardText } from 'reactstrap';

export function RenderLog() {

    let [user, setUser] = useState(undefined);

    const [visible, setVisible] = useState(false);
    const showAlert = () => setVisible(true);
    const closeAlert = () => setVisible(false);

    const [isLoading, setIsLoading] = useState(true);

    let [incident, setIncident] = useState('');
    let [month, setMonth] = useState('');
    let [location, setLocation] = useState('');

    const handleIncidentChange = event => {
        setIncident(event.target.value);
    }
    const handleMonthChange = event => {
        setMonth(event.target.value);
    }
    const handleLocationChange = event => {
        setLocation(event.target.value);
    }
    const handleFormReset = event => {
        event.preventDefault();
        let clear = "";
        setIncident(clear);
        setMonth(clear);
        setLocation(clear);
    }

    useEffect(() => {
        const authUnregisterFunction = firebase.auth().onAuthStateChanged((firebaseUser) => {
            if(firebaseUser) {
                setUser(firebaseUser);
                setIsLoading(false);
            } else {
                setUser(null);
                setIsLoading(false);
            }
        })

        return function cleanup() {
            authUnregisterFunction();
        }
    }, [])

    if(isLoading) {
        return <div className='d-flex justify-content-center m-2'><p>Loading...</p></div>
    }
    if(!user) {
        return <NotSignedIn />
    } else {
        return <div>
            <h1>Welcome {user.displayName}</h1>
            <LogForm
                user={user}
                incident={incident}
                month={month}
                location={location}
                incidentChange={handleIncidentChange}
                monthChange={handleMonthChange}
                locationChange={handleLocationChange}
                resetForm={handleFormReset}
                visible={visible}
                showAlert={showAlert}
                closeAlert={closeAlert}
            />
            <RenderUserLog user={user}/>
        </div>
    }
}

export function LogForm(props) {
    let userRef = firebase.database().ref(props.user.uid);

    let incidentInput;
    if (!props.incident) {
        incidentInput = (
            <FormGroup>
                <Label for="incident">Incident:</Label>
                <Input required type="text" name="incident" id="incident" placeholder="What was the incident?" value={props.incident} onChange={props.incidentChange} />
            </FormGroup>
        )
    } else {
        incidentInput = (
            <FormGroup>
                <Label for="incident">Incident:</Label>
                <Input required valid type="text" name="incident" id="incident" placeholder="What was the incident?" value={props.incident} onChange={props.incidentChange} />
            </FormGroup>
        )
    }
    let monthInput;
    if (!props.month) {
        monthInput = (
            <FormGroup>
                <Label for="month">Month:</Label>
                <Input required type="text" name="month" id="month" placeholder="What month?" value={props.month} onChange={props.monthChange} />
            </FormGroup>
        )
    } else {
        monthInput = (
            <FormGroup>
                <Label for="month">Month:</Label>
                <Input valid required type="text" name="month" id="month" placeholder="What month?" value={props.month} onChange={props.monthChange} />
            </FormGroup>
        )
    }
    let locationInput;
    if (!props.location) {
        locationInput = (
            <FormGroup>
                <Label for="location">Location:</Label>
                <Input required type="text" name="location" id="location" placeholder="What location?" value={props.location} onChange={props.locationChange} />
            </FormGroup>
        )
    } else {
        locationInput = (
            <FormGroup>
                <Label for="location">Location:</Label>
                <Input valid required type="text" name="location" id="location" placeholder="What location?" value={props.location} onChange={props.locationChange} />
            </FormGroup>
        )
    }

    let whenClicked = () => {
        if (props.incident && props.month && props.location) {
            userRef.push({'incident': props.incident, 'month': props.month, 'location': props.location});
            let getAlert = props.showAlert;
            getAlert();   
        }
    }

    return <div className="logForm">
        <Form onSubmit={props.resetForm}>
            {incidentInput}
            {monthInput}
            {locationInput}
            <FormGroup>
                <Button onClick={whenClicked} type="submit" color="primary">Submit</Button>
            </FormGroup>
            <FormGroup>
                <Alert color="success" isOpen={props.visible} toggle={props.closeAlert}>Your submission has been successfully logged!</Alert>
            </FormGroup>
        </Form>
    </div>
}

export function NotSignedIn() {
    return <div>
        <h1>You must sign in to use the Log feature!</h1>
        <h2>Go back to the Main page to sign in.</h2>
    </div>
}

export function RenderUserLog() {
    const [logs, setLogs] = useState([]);
    useEffect(() => {
        let user = firebase.auth().currentUser;
        let uid = user.uid;
            const userLogsRef = firebase.database().ref(uid);
            userLogsRef.on('value', (snapshot) => {
                let userLogsObj = snapshot.val();
                if(userLogsObj !== null) {
                    let userLogsKeys = Object.keys(userLogsObj)
                    let logsArray = userLogsKeys.map((key) => {
                        let singleLog = userLogsObj[key]
                        singleLog.key = key
                        return singleLog;
                    })

                    setLogs(logsArray);
                }
            })
    }, [])
    
    let logItems = [];
    logItems = logs.map((singleLogItem) => {
        return <LogItem key={singleLogItem.key} incident={singleLogItem.incident} location={singleLogItem.location} month={singleLogItem.month} />
    })

    if(logs.length === 0) {
        return null;
    } else {
        return <div>
            <CardGroup>
                {logItems}
            </CardGroup>
        </div>
    }
}

export function LogItem(props) {
    return <div>
            <Card>
                <CardBody>
                    <CardTitle>Incident: {props.incident}</CardTitle>
                    <CardText>Month: {props.month}</CardText>
                    <CardText>Location: {props.location}</CardText>
                </CardBody>
            </Card>
    </div>
}