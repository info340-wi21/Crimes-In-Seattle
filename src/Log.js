import {useState, useEffect} from 'react';
import firebase from 'firebase/app';
import { Form, Label, Input, Button } from 'reactstrap';

export function RenderLog() {
    let [user, setUser] = useState(undefined);
    const [isLoading, setIsLoading] = useState(true);

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
            <LogForm user={user}/>
            {/*<RenderUserLog uid={user.uid}/>    uncomment when RenderUserLog is working*/}
        </div>
    }
}

export function LogForm(props) {
    let userRef = firebase.database().ref(props.user.uid);
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

    return <div className="logForm">
        <Form>
            <Label for="incident">Incident:</Label>
            <Input type="text" name="incident" id="incident" placeholder="What was the incident?" onChange={handleIncidentChange} />
            <Label for="month">Month:</Label>
            <Input type="text" name="month" id="month" placeholder="What month?" onChange={handleMonthChange} />
            <Label for="location">Location:</Label>
            <Input type="text" name="location" id="location" placeholder="What location?" onChange={handleLocationChange} />
            <Button onClick={() => {userRef.push({'incident': incident, 'month': month, 'location': location})}} color="primary">Submit</Button>
        </Form>
    </div>
}

export function NotSignedIn() {
    return <p>You must sign in to use the Log feature.</p>
}

export function RenderUserLog(props) {
    //Render the users saved information
}