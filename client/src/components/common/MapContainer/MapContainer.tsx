import { Map, Marker } from "@vis.gl/react-maplibre";
import darkStyle from "./lib/dark.json";
import "./style.scss";

import "maplibre-gl/dist/maplibre-gl.css";
import Loading from "../Loading/Loading";
import { getValidatedUrl } from "../../../utils/imgGetValidatedUrl";

interface MapContainerProps {
  long: number;
  lat: number;
  setNewLocation?: (location: { long: number; lat: number }) => void;
  logo?: string;
  name?: string;
}

const MapContainer = ({
  long,
  lat,
  setNewLocation,
  logo,
  name,
}: MapContainerProps) => {
  const isDark = window.Telegram.WebApp.colorScheme;
  const lightStyle = "https://tiles.openfreemap.org/styles/liberty";

  console.log("Longitude:", long, "Latitude:", lat);

  if (!long || !lat) return <Loading />;
  return (
    <div className="map-container">
      <Map
        initialViewState={{
          longitude: long,
          latitude: lat,
          zoom: 15,
          pitch: 20,
        }}
        //@ts-ignore
        mapStyle={isDark == "dark" ? darkStyle : lightStyle}
        attributionControl={false}>
        <Marker
          longitude={long}
          latitude={lat}
          color="red"
          anchor="bottom"
          draggable={setNewLocation ? true : false}
          className="Marker"
          onDragEnd={(evt) => {
            setNewLocation &&
              setNewLocation({
                long: evt.lngLat.lng,
                lat: evt.lngLat.lat,
              });
          }}>
          {logo && (
            <div className="Marker__image">
              <img src={getValidatedUrl(logo)} alt="" />
              <strong>{name}</strong>
            </div>
          )}
        </Marker>
      </Map>
    </div>
  );
};

export default MapContainer;
