// import React, { useState } from 'react';
import Chart from "react-google-charts";
// import { Route, Switch, Link, Redirect, NavLink } from 'react-router-dom';

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
          <section id="about">
          </section>
          <div className="test">
            <Card months = { props.data.months }/>
          </div>
          <div className="container">

              <section>
                <HistogramChart months = { props.data.months }/>
              </section>
          </div>
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
      <h1>Seattle Alerts</h1>
      <p>With our incident tracking plot and map below, gain a better understanding of your surroundings in Seattle</p>
    </div>
  )
}

export function NavBar() {
  return (
    <div>
      <ul className="navbar">
        <li className="nav-items"><a href="index.html">Main</a></li>
        <li className="nav-items"><a href="#">Resources</a></li>
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