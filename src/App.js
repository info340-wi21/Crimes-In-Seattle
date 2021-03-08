// import React, { useState } from 'react';
import Chart from "react-google-charts";

function App(props) {
  return (
    <div>
      <nav>
          <div>
              <ul className="navbar">
              </ul>
          </div>
      </nav>
      <header>
      </header>
      <main>
          <section id="about">
          </section>

          <div className="container">

              <section>
                <HistogramChart months = { props.data.months }/>
              </section>

              <section>
              </section>
          </div>
      </main>
      <footer>
      </footer>
    </div>
  )
}

export default App;

export function HistogramChart(props) {
  let months = props.months;
  let monthsdata = months.map (month => {
    return(
      [month.month, month.points.length]
    ) 
  });
  monthsdata[0] = ["Month", "Number of Incidents"];
  return (
    <div style={{ display: 'flex' }}>
      <Chart
          width={2000}
          height={700}
          chartType="ColumnChart"
          loader={<div>Loading Chart</div>}
          data={monthsdata}
          options={{
            title: 'Number of Incident Reports in Seattle per Month',
            chartArea: { width: '30%' },
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