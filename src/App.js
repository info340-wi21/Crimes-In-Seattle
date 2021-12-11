import { CrimeMap } from './CrimeMap';
import Main from './Main';
import {Redirect, Route} from 'react-router-dom';
import { Switch } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import { RenderSignIn } from './SignIn';
import { RenderLog } from './Log';
import React from 'react';
import { HistogramChart } from './Histogram';
import { CardList } from './Cardview'
import { Footer } from './Footer';
import { Header } from './Header';
import { About } from './About';

function App(props) {

  return (
    <div>
      
      <Header />

      <main>
        <Switch>
          <Route exact path="/">
            <RenderSignIn />
            <Main />
          </Route>
          <Route path="/histogram">
              <CardList months = { props.data.months }/>
              <HistogramChart months = { props.data.months }/>
          </Route>
          <Route path="/map">
            <CrimeMap points={props.data.months}/>
          </Route>
          <Route path="/log">
            <RenderLog />
          </Route>
          <Route path="/about/:resourceId">
            <About />
          </Route>
          <Redirect to="/" />
        </Switch>
      </main>
      <Footer />
    </div>
  )
}

export default App;