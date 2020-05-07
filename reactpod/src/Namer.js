import React from "react";
import {
  useParams
} from "react-router-dom";

import "./App.css";

function Namer(props) {
  const { name } = useParams();
  return (
    <div className="App">
      <header className="App-header">
        <p>URL PARAMETER ======= {name}</p>
        <p>MESSAGE BUS   ======= {props.messager}</p>
      </header>
    </div>
  );
}

export default Namer;
