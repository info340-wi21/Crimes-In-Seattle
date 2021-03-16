import alert from './img/alert.png';
import spd from './img/spd.png';
import sng from './img/sng.png';


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

    return (
        <section className="landing">
            <div className="video">
                <iframe title="Seattle Police Department Spotlight"src="https://www.youtube.com/embed/VqMaE-CANrU" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen>
                </iframe>
            </div>
            <section className="resources">
                <h2>Resource Links</h2>
                <div className="resource">
                    <a href="https://alert.seattle.gov/ ">
                        <h3>Official Emergency Notification for the City of Seattle</h3>
                        <img alt="seattle alert log" src={alert}/>
                    </a>
                </div>
                <div className="resource">
                    <a href="http://www.seattle.gov/police/need-help/when-should-i-call-911">
                        <h3>Seattle Police Department</h3>
                        <img alt="seattle police department logo" src={spd}/>
                    </a>
                </div>
                <div className="resource">
                    <a href="https://sngi.org/">
                        <h3>Seattle Neighborhood Group</h3>
                        <img alt="seattle neighborhood group logo" src={sng}/>
                    </a>
                </div>
            </section>
        </section> 
    )
}