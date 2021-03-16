import {useState, useEffect} from 'react';
import firebase from 'firebase/app';
import { Form, Label, Input, Button, Card, CardGroup, CardBody, CardTitle, CardText } from 'reactstrap';

export function RenderLog() {
    let [user, setUser] = useState(undefined);
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
            />
            <RenderUserLog user={user}/>
        </div>
    }
}

export function LogForm(props) {
    let userRef = firebase.database().ref(props.user.uid);

    return <div className="logForm">
        <Form>
            <Label for="incident">Incident:</Label>
            <Input type="text" name="incident" id="incident" placeholder="What was the incident?" value={props.incident} onChange={props.incidentChange} />
            <Label for="month">Month:</Label>
            <Input type="text" name="month" id="month" placeholder="What month?" value={props.month} onChange={props.monthChange} />
            <Label for="location">Location:</Label>
            <Input type="text" name="location" id="location" placeholder="What location?" value={props.location} onChange={props.locationChange} />
            <Button onClick={() => {userRef.push({'incident': props.incident, 'month': props.month, 'location': props.location})}} type="submit" onSubmit={props.resetForm} color="primary">Submit</Button>
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