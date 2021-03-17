import { Redirect } from 'react-router-dom';
import { useState } from 'react';

export function Main() {
    return (
        <div>
            <Introduction />
            <Resource />
        </div>
    )
}

export function Introduction() {

    return (
        <section id="about">
            <h2>About</h2>
            <p>
                Our general topic is regarding community incident awareness in Seattle. Oftentimes, we see police or EMT reporting to an incident, however, community members are left without a clear understanding of what happened. This can lead to misinformation being
                spread, and as members of the UW, we have witnessed this ourselves right in the University District and throughout the city. With proper awareness and awareness of their surroundings, people will be able to safely navigate their day. A
                comprehensive app that displays recent incidents that happened in Seattle and specific communities using data from the Seattle Police Department, as well as community input will give community members the information they need to be alerted
                and feel safe.
            </p>
        </section>
    )
}

export default Main;


export function Resource() {

    const [redirectTo, setRedirectTo] = useState(undefined);

    if (redirectTo) {
        return <Redirect push to={'/about/' + redirectTo}/>
    }

    return (
        <section className="landing">
            <div className="video">
                <iframe title="Seattle Police Department Spotlight"src="https://www.youtube.com/embed/VqMaE-CANrU" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen>
                </iframe>
            </div>
            <section className="resources">
                <h2>Resource Links - Check it Out</h2>
                <div className="resource" onClick={() => {setRedirectTo("Alert Seattle")}} >
                    <h3>Official Emergency Notification for the City of Seattle</h3>
                    <img alt="seattle alert log" src={'../img/alert.png'}/>
                </div>
                <div className="resource" onClick={() => {setRedirectTo("Seattle Police")}} >
                    <h3>Seattle Police Department</h3>
                    <img alt="seattle police department logo" src={"../img/spd.png"}/>
                </div>
                <div className="resource" onClick={() => {setRedirectTo("Seattle Neighborhood Group")}}>
                    <h3>Seattle Neighborhood Group</h3>
                    <img alt="seattle neighborhood group logo" src={'../img/sng.png'}/>
                </div>
            </section>
        </section> 
    )
}