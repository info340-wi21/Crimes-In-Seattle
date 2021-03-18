import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/app';
import 'firebase/auth';
import {useState, useEffect} from 'react';

const uiConfig = {
    signInOptions: [
        {
            provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
            requireDisplayName: true
        }
    ],
    credentialHelper: 'none',
    callbacks: {
        signInSuccessWithAuthResult: () => false
    },
}

export function RenderSignIn() {
    const [user, setUser] = useState(undefined);
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
        return <StyledFirebaseAuth className='d-flex justify-content-center m-2' uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
    } else {
        return (<div className='d-flex justify-content-center m-2'>
            <button onClick={() => {firebase.auth().signOut()}}>Sign Out</button>
        </div>)
    }
}