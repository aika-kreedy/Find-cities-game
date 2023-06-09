import React, { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import { getDistanceFromCoords } from "./utils/getDistFromCoOrds";

const cities = [
  {
    name: "Ireland",
    position: {
      lat: -7.24,
      lng: 55.06,
    },
  },
  {
    name: "Rome",
    position: {
      lat: 41.902783,
      lng: 12.496366,
    },
  },
  {
    name: "Helsenki",
    position: {
      lat: 60.169856,
      lng: 24.938379,
    },
  },
  {
    name: "Stockholm",
    position: {
      lat: 59.329323,
      lng: 18.068581,
    },
  },
  {
    name: "London",
    position: {
      lat: 51.507351,
      lng: -0.127758,
    },
  },
  {
    name: "Oslo",
    position: {
      lat: 59.913869,
      lng: 10.752245,
    },
  },
  {
    name: "Paris",
    position: {
      lat: 48.856614,
      lng: 2.352222,
    },
  },
  {
    name: "Wien",
    position: {
      lat: 48.208174,
      lng: 16.373819,
    },
  },
  {
    name: "Budapest",
    position: {
      lat: 47.497912,
      lng: 19.040235,
    },
  },
];

const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/continents/europe.json";

const MapC = () => {
  const [place, setPlace] = useState(null);
  const [coOrds, setCoOrds] = useState([[[11.08, 47.39]]]);
  const [score, setScore] = useState(15000);
  const [dist, setDist] = useState(0);
  const [foundPlaces, setFoundPlaces] = useState([]);
  const [result, setResult] = useState("");

  
  // let randomIdx;

  // handle click on Map
  const handleClick = (geo) => () => {
    // Set place
    setPlace(geo.properties.geounit);
    // Set coOrdinates on Click
    setCoOrds(geo.geometry.coordinates[0]);
    console.log("geoUnit", place);
    
    cities.forEach((city) => {
      const currDist = getDistanceFromCoords(
        coOrds[0][0],
        coOrds[0][1],
        city.position.lat,
        city.position.lng
      );
        
      setDist(currDist);
      console.log(dist, "dist");

      if (!isNaN(currDist)) {
        setScore(score - Math.floor(currDist));
        if ( score < 0 ) {
          setResult("GAME_OVER");
          setScore(15000);
          return; 
        }

        if (currDist < 100) {
          console.log(currDist, "currDist");
          alert(`found ${city.name}`);
          setFoundPlaces([...foundPlaces, city]);
        }
      }
    });

    // const dist = getDistanceFromCoords(
    //   coOrds[0][0],
    //   coOrds[0][1],
    //   -7.24,
    //   55.06
    // );
    // set Distance
    // setDist(dist);
    // console.log("dist", dist);

    // set Score
    // if (!isNaN(dist)) {
    //   setScore(score - Math.floor(dist));
    //   if (score < 100) {
    //     alert("Game Over");
    //   }
    //   setScore(15000);
    // }
    // if (dist < 250) {
    //   alert(`found ${place}`);
    // }
  };
  return (
    
    <ComposableMap
      width={800}
      height={800}
      projection="geoAzimuthalEqualArea"
      projectionConfig={{
        rotate: [-10.0, -53.0, 0],
        scale: 1200,
      }}
    >
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map((geo) => (
            <Geography
              key={geo.rsmKey}
              geography={geo}
              fill="#231ce6"
              stroke="#EAEAEC"
              onClick={handleClick(geo)}
            />
          ))
        }
      </Geographies>
      {coOrds && (
        <Marker coordinates={coOrds[0]}>
          <circle r={5} fill="orange" />
        </Marker>
      )}
      {
        <Marker coordinates={[-19.01, 67.53]}>
          <text textAnchor="middle" fill="orange">
            {`Score : ${score}`}
          </text>
        </Marker>
      }
      {foundPlaces.length > 0 &&
        foundPlaces.map((place) => (
          <Marker
            coordinates={[place?.position?.lat, place?.position?.lng]}
            fill="#777"
            key={Math.random() * 10}
          >
            <text textAnchor="middle" fill="#F53">
              {place?.name}
            </text>
          </Marker>
        ))}
        <Marker coordinates={[-25.01, 67.53]}>
          <text textAnchor="middle" fill="orange">
            {`${result}`}
          </text>
        </Marker>
    </ComposableMap>
  );
};

export default MapC;
