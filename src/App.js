// import React, { useState } from 'react';
import Chart from "react-google-charts";
import CrimeMap from './CrimeMap';
import {Link, NavLink, Redirect, Route} from 'react-router-dom';
import {Switch} from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import {RenderSignIn} from './signIn';

function App(props) {
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
          <Route path="/main"><section id="about"></section><RenderSignIn /></Route>
          <Route path="/about">
              <section id="about"></section>
              <div className="test">
                <Card months = { props.data.months }/>
              </div>
              <section>
                <HistogramChart months = { props.data.months }/>
              </section>
          </Route>
          <Route path="/map">
            <section id="about"></section>
            <div className="container">
              <section>
                <CrimeMap />
              </section>
            </div>
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

export function Card(props) {
  let months = props.months;
  let monthsdata = [];
  for(let i = 1; i < props.months.length; i++){
    monthsdata.push({month : months[i].month, count : months[i].points.length})
  }
  console.log(monthsdata)
  console.log(monthsdata["Jan"]);
  return (
    <div>
        {monthsdata.map(month => (
          <div className="card">
            <div className="month" key={month.month}>{month.month}:{month.count}</div>
          </div>
        ))}
    </div>
  )
}

export function Title() {
  return (
    <div className='heading'>
      <h1><Link to="/main">Seattle Alerts</Link></h1>
      <p>With our incident tracking plot and map below, gain a better understanding of your surroundings in Seattle</p>
    </div>
  )
}

export function NavBar() {
  return (
    <div>
      <ul className="navbar">
        <li className="nav-items"><NavLink to="/main" activeClassName="activeLink">Main</NavLink></li>
        <li className="nav-items"><NavLink to="/about" activeClassName="activeLink">Histogram</NavLink></li>
        <li className="nav-items"><NavLink to="/map" activeClassName="activeLink">Map</NavLink></li>
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
      [month.month, month.points.length]
    ) 
  });
  monthsdata[0] = ["Month", "Number of Incidents"];
  return (
    <div className="chart-container" style={{ display: 'flex' }}>
      <Chart
          width={'100%'}
          height={'100%'}
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