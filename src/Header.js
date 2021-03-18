import { Link, NavLink } from 'react-router-dom';

export function Header() {
    return (
        <div>
            <nav>
                <NavBar />
            </nav>
            <header>
                <Title />
            </header>
        </div>
    )
}

export function Title() {
    return (
      <div className='heading'>
        <h1><Link to="/">Seattle Alerts</Link></h1>
        <p>With our incident cards, histogram and map, gain a better understanding of your surroundings in Seattle</p>
      </div>
    )
  }
  
  export function NavBar() {
    return (
      <div>
        <ul className="navbar">
          <li className="nav-items"><NavLink to="/" activeClassName="activeLink">Main</NavLink></li>
          <li className="nav-items"><NavLink to="/histogram" activeClassName="activeLink">Histogram</NavLink></li>
          <li className="nav-items"><NavLink to="/map" activeClassName="activeLink">Map</NavLink></li>
          <li className="nav-items"><NavLink to="/log" activeClassName="activeLink">Log</NavLink></li>
        </ul>
      </div>
    )
  }