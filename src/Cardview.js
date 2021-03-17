export function CardList(props) {
  let monthsdata = [];
  let months = props.months;
  for(let i = 1; i < props.months.length; i++){
    monthsdata.push({month : months[i].month, count : months[i].points.length, clicked: months[i].clicked, points: months[i].points})
  }
  let cards = monthsdata.map((month) => {
    return <Card month={month} key={month.month} clickCallback={props.clickCallback}></Card> 
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
      return <p key={description}>* {description}</p>
    })
    card = (<div className="card">
        <section>
          <p> Common incidents for this month were:</p>
          { descs }
          <p>total: {props.month.count} cases</p>
        </section>
      </div>)
  } else {
    card = (
      <div className="card" onClick= { () => {props.clickCallback(props.month.month)}}>
        <div className="month">
          <h2> In {props.month.month} there were</h2>
          <p>{props.month.count}</p>
          <h2>cases</h2>
        </div>
      </div>
    )
  }
  return card;
}