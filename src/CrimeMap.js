import { MapContainer, TileLayer } from "react-leaflet"; 
import L from 'leaflet';

L.Icon.Default.imagePath = "/";

export function CrimeMap(props) {
    let seattle = [47.608013, -122.335167];

    return (
        <MapContainer center={seattle} zoom={12}>
          <TileLayer
            attribution='Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
            url='https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}'
            maxZoom={18}
            minZoom={11}
            id='mapbox/streets-v11'
            tileSize={512}
            zoomOffset={-1}
            accessToken='pk.eyJ1IjoidmllbmFqIiwiYSI6ImNra3hoNzk5dDAwY2kyb2p6bHVxaXFibXgifQ.NsxjDYiMSE3pTqyxnO_1Zw'
          />
        </MapContainer> 
    )
  }

export default CrimeMap;