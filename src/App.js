import Chart from "react-google-charts";
import CrimeMap from './CrimeMap';
import Main from './Main';
import {Link, NavLink, Redirect, Route} from 'react-router-dom';
import {Switch} from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import {RenderSignIn} from './SignIn';
import {RenderLog} from './Log';
import React, { useState } from 'react';

function App(props) {

  const theMonths = props.data.months;

  const [clicked, setClick] = useState(theMonths);

  const handleClick = (month) => {
    const monthsCopy =  clicked.map( months => {
      if (months.month === month) { 
        months.clicked = true;
      }
      return months;
    });
    setClick(monthsCopy);
  }

  return (
    <div>
      <nav>
        <NavBar />
      </nav>
      
      <header>
        <Title />
      </header>
      
      <main>
        <Switch>
          <Route exact path="/">
            <RenderSignIn />
            <Main />
          </Route>
          <Route path="/about">
              <CardList months = { props.data.months } clickCallback= { handleClick }/>
              <HistogramChart months = { props.data.months }/>
          </Route>
          <Route path="/map">
            <div className="container">
                <CrimeMap points={props.data.months}/>
            </div>
          </Route>
          <Route path="/log">
            <RenderLog />
          </Route>
          <Redirect to="/" />
        </Switch>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default App;

export function CardList(props) {
  let monthsdata = [];
  let months = props.months;
  for(let i = 1; i < props.months.length; i++){
    monthsdata.push({month : months[i].month, count : months[i].points.length, clicked: months[i].clicked, points: months[i].points})
  }
  let cards = monthsdata.map(month => {
    return <Card month = {month} clickCallback={props.clickCallback}></Card> 
  });
  return (
    <div className="card-container">
        { cards }
    </div>
  );
}

export function Card(props) {
  let card;
  let descriptions = [];
  for (let i = 0; i < 3; i++) {
    descriptions.push(props.month.points[i].description)
  }
  if (props.month.clicked === true) {
    let descs = descriptions.map( description => {
      return <p>* {description}</p>
    })
    card = (<div className="card">
        <p> Common incidents for this month were:</p>
        { descs }
        <p>total: {props.month.count} cases</p>
      </div>)
  } else {
    card = (
      <div className="card" onClick= { () => {props.clickCallback(props.month.month)}}>
        <div className="month" key={props.month.month}>
          <h2> In {props.month.month} there were</h2>
          <p>{props.month.count}</p>
          <h2>cases</h2>
        </div>
      </div>
    )
  }
  return card;
}

export function Title() {
  return (
    <div className='heading'>
      <h1><Link to="/">Seattle Alerts</Link></h1>
      <p>With our incident tracking plot and map, gain a better understanding of your surroundings in Seattle</p>
    </div>
  )
}

export function NavBar() {
  return (
    <div>
      <ul className="navbar">
        <li className="nav-items"><NavLink to="/" activeClassName="activeLink">Main</NavLink></li>
        <li className="nav-items"><NavLink to="/about" activeClassName="activeLink">Histogram</NavLink></li>
        <li className="nav-items"><NavLink to="/map" activeClassName="activeLink">Map</NavLink></li>
        <li className="nav-items"><NavLink to="/log" activeClassName="activeLink">Log</NavLink></li>
      </ul>
    </div>
  )
}

export function Footer() {
  return (
    <div>
      <address>
        Contact us at <a href="mailto:ysuzuki1@uw.edu">ysuzuki1@uw.edu</a>, or at <a href="tel:206-271-9956">206-271-9956</a>.
      </address>
      <p>&copy; 2021 Jerry Viena, Byeong Ik Kang, Yui Suzuki, Kellen Maier, Chris Kim.</p>
    </div>
  )
}

export function HistogramChart(props) {
  let months = props.months;
  let monthsdata = months.map (month => {
    return(
      [month.month.substring(0,3), month.points.length]
    ) 
  });
  monthsdata[0] = ["Month", "Number of Incidents"];
  return (
    <div className="chart-container" style={{ display: 'flex' }}>
      <Chart
          width={'100%'}
          height={'400px'}
          chartType="ColumnChart"
          loader={<div>Loading Chart</div>}
          data={monthsdata}
          options={{
            title: 'Number of Incident Reports in Seattle per Month',
            chartArea: { width: '70%' },
            hAxis: {
              title: 'Months',
              minValue: 0,
            },
            vAxis: {
              title: 'Count',
              minValue: 0,
              position: 'right',
            },
          }}
          legendToggle
        />
    </div>
  )
}