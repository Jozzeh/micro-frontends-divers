import React, { useState } from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";
import { MessageBus } from "@podium/browser";
import Namer from "./Namer";


function App(props) {
  const messageBus = new MessageBus();

  const [messager, setMessage] = useState("");

  messageBus.subscribe("internalchannel", "newMessage", (event) => {
    if (event.payload.message !== messager) {
      console.log("message received from " + event.payload.from);
      setMessage(event.payload.message);
    }
  });

  return (
    <Router basename="/demo">
      <Switch>
        <Route path="/:name">
          <Namer messager={messager} />
        </Route>
        <Route path="/">
          <div className="App">
            <header className="App-header">
              <img src="/images/react.svg" className="App-logo" alt="logo" />
              <p>Message received:</p>
              <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                {messager}
              </a>
            </header>
          </div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
