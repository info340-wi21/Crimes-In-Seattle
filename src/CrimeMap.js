import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import {Icon} from 'leaflet';
import { Form, Label, Input } from 'reactstrap';
import React, { useState } from 'react';

export function CrimeMap(props) {
  const [selectValue, setSelectValue] = useState('');

  const handleChange = (event) => {
    let newSelectValue = event.target.value;
    setSelectValue(newSelectValue);
  }

  let seattle = [47.608013, -122.335167];
  let crimeData = props.points;

  return (
    <section>
      <MapContainer center={seattle} zoom={12}>
        <Tile />
        <GetMarkers points={crimeData} value={selectValue}/>
      </MapContainer> 
      <Selector value={selectValue} onChange={handleChange}/>
    </section>
  )
}

export default CrimeMap;

export function Tile() {
  return (
    <TileLayer
      attribution='Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      url='https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}'
      maxZoom={18}
      minZoom={11}
      id='mapbox/streets-v11'
      tileSize={512}
      zoomOffset={-1}
      accessToken='pk.eyJ1IjoidmllbmFqIiwiYSI6ImNra3hoNzk5dDAwY2kyb2p6bHVxaXFibXgifQ.NsxjDYiMSE3pTqyxnO_1Zw'
    />
  )
}

export function GetMarkers(props) {
  let data = props.points;
  let selectValue = props.value;
  let selectedMonth = "";

  if (selectValue === "january") {
    selectedMonth = data[1].points;
  } else if (selectValue === "february") {
    selectedMonth = data[2].points;
  } else if (selectValue === "march") {
    selectedMonth = data[3].points;
  } else if (selectValue === "april") {
    selectedMonth = data[4].points;
  } else if (selectValue === "may") {
    selectedMonth = data[5].points;  
  } else if (selectValue === "june") {
    selectedMonth = data[6].points;  
  } else if (selectValue === "july") {
    selectedMonth = data[7].points;  
  } else if (selectValue === "august") {
    selectedMonth = data[8].points;
  } else if (selectValue === "september") {
    selectedMonth = data[9].points;
  } else if (selectValue === "october") {
    selectedMonth = data[10].points;  
  } else if (selectValue === "november") {
    selectedMonth = data[11].points;  
  } else if (selectValue === "december") {
    selectedMonth = data[12].points;      
  } else {
    selectedMonth = "";
  }

  // convert to an Array
  selectedMonth = Array.from(selectedMonth);

  let markers = selectedMonth.map((singlePoint) => {
    let lat = singlePoint.lat;
    let long = singlePoint.long;
    let location = [lat, long];
    let description = singlePoint.description;
    let singleMarker = (
      <Marker position={location} icon={new Icon({iconUrl: markerIconPng, iconSize: [25, 41]})} key={location}>
        <Popup key={description}>Incident: {description}</Popup>
      </Marker>
    )
    return singleMarker;
  })

  return (
    <div>
      {markers}
    </div>
  )
}

export function Selector(props) {
  return (
    <Form>
      <Label for="select">Select A Month</Label>
      <Input type="select" name="select" value={props.value} onChange={props.onChange}>
        <option value=""></option>
        <option value="january">January</option>
        <option value="february">February</option>
        <option value="march">March</option>
        <option value="april">April</option>
        <option value="may">May</option>
        <option value="june">June</option>
        <option value="july">July</option>
        <option value="august">August</option>
        <option value="september">September</option>
        <option value="october">October</option>
        <option value="november">November</option>
        <option value="december">December</option>
      </Input>
    </Form>
  )
}