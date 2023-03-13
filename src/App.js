import "./App.css";
import React, { useState } from "react";
import MapC from "./component/Map";

const data =[{"name":"Ireland"},{"name":"Rome"},{"name":"Helsenki"},{"name":"Stockholm"},{"name":"London"},{"name":"Oslo"},{"name":"Paris"},{"name":"Wien"},{"name":"Budapest"}];
const listItems = data.map((d) => <p key={d.name}>{d.name}</p>);
function App() {

  const [hasRender, setRender] = useState(false);
  const onShow = React.useCallback(() => setRender(true), []);

  return (
    <div className="App">
       <div>
       <div class="wrapper ten">
        <h1 class="bounce">
                <span>G</span>
                <span>A</span>
                <span>M</span>
                <span>E</span>
                <span>-</span>
                <span>M</span>
                <span>A</span>
                <span>P</span>
            </h1>
            </div>
        <h3  style ={{color:"#50C878"}}>Find the Location of the fellowing Cities:</h3>
     <div> {listItems }</div>
      </div>
      <>
      <button className="btn-start"   onClick={onShow}>START GAME</button>
      {hasRender &&  <MapC />}
    </>
     
    </div>
  );
}

export default App;
