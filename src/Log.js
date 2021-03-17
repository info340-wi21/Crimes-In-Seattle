import {useState, useEffect} from 'react';
import firebase from 'firebase/app';
import { Form, FormFeedback, FormGroup, FormText, Label, Input, Button, Alert, Card, CardGroup, CardBody, CardTitle, CardText } from 'reactstrap';

export function RenderLog() {
    let [user, setUser] = useState(undefined);

    const inputItems = [
        {
            name: "incident",
            placeholder: "What was the incident?",
            label: "Incident:"
        },
        {
            name: "month",
            placeholder: "What month?",
            label: "Month:"
        },
        {
            name: "location",
            placeholder: "What location?",
            label: "Location:"
        },
    ];

    const [visible, setVisible] = useState(false);
    const showAlert = () => setVisible(true);
    const closeAlert = () => setVisible(false);

    const [isLoading, setIsLoading] = useState(true);

    let [incident, setIncident] = useState('');
    let [month, setMonth] = useState('');
    let [location, setLocation] = useState('');

    const handleChange = event => {
        let input = event.target.id;
        if (input === "incident") {
            setIncident(event.target.value);
        } else if (input === "month") {
            setMonth(event.target.value);
        } else {
            setLocation(event.target.value);
        }
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
                onChange={handleChange}
                resetForm={handleFormReset}
                visible={visible}
                showAlert={showAlert}
                closeAlert={closeAlert}
                inputItems={inputItems}
            />
            <RenderUserLog user={user}/>
        </div>
    }
}

export function LogForm(props) {
    let userRef = firebase.database().ref(props.user.uid);

    let whenClicked = () => {
        if (props.incident && props.month && props.location) {
            userRef.push({'incident': props.incident, 'month': props.month, 'location': props.location});
            let getAlert = props.showAlert;
            getAlert();   
        }
    }

    return <div className="logForm">
        <Form onSubmit={props.resetForm}>
            <GetInput check={props.incident} onChange={props.onChange} info={props.inputItems[0]}/>
            <GetInput check={props.month} onChange={props.onChange} info={props.inputItems[1]}/>
            <GetInput check={props.location} onChange={props.onChange} info={props.inputItems[2]}/>
            <FormGroup>
                <Button onClick={whenClicked} type="submit" color="primary">Submit</Button>
            </FormGroup>
            <FormGroup>
                <Alert color="success" isOpen={props.visible} toggle={props.closeAlert}>Your submission has been successfully logged!</Alert>
            </FormGroup>
        </Form>
    </div>
}

export function GetInput(props) {
    let input;
    let check = props.check;
    let info = props.info;
    if (!check) {
        input = (
            <FormGroup>
                <Label for={info.name}>{info.label}</Label>
                <Input required type="text" name={info.name} id={info.name} placeholder={info.placeholder} value={check} onChange={props.onChange} />
                <FormText color="danger">*Required</FormText>
            </FormGroup>
        )
    } else {
        input = (
            <FormGroup>
                <Label for={info.name}>{info.label}</Label>
                <Input valid type="text" name={info.name} id={info.name} placeholder={info.placeholder} value={check} onChange={props.onChange} />
                <FormFeedback valid>Nice!</FormFeedback>
            </FormGroup>
        )
    }
    return input;
}


export function NotSignedIn() {
    return <div>
        <h1>You must sign in to use the Log feature!</h1>
        <h1>Go back to the Main page to sign in.</h1>
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