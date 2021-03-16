import {useState, useEffect} from 'react';
import firebase from 'firebase/app';
import { Form, Label, Input, Button } from 'reactstrap';

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
            <LogForm
                user={user}
                incident={incident}
                month={month}
                location={location}
                incidentChange={handleIncidentChange}
                montchChange={handleMonthChange}
                locationChange={handleLocationChange}
                restForm={handleFormReset}
            />
            {/*<RenderUserLog uid={user.uid}/>    uncomment when RenderUserLog is working*/}
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
            <Input type="text" name="month" id="month" placeholder="What month?" value={props.month} onChange={props.montchChange} />
            <Label for="location">Location:</Label>
            <Input type="text" name="location" id="location" placeholder="What location?" value={props.location} onChange={props.locationChange} />
            <Button onClick={() => {userRef.push({'incident': props.incident, 'month': props.month, 'location': props.location})}} type="submit" onSubmit={props.restForm} color="primary">Submit</Button>
        </Form>
    </div>
}

export function NotSignedIn() {
    return <p>You must sign in to use the Log feature.</p>
}

export function RenderUserLog(props) {
    //Render the users saved information
}