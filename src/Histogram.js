import Chart from "react-google-charts";

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