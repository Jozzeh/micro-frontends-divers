import React, { useState, useEffect } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";
import { MessageBus } from '@podium/browser';

function App() {
  const messageBus = new MessageBus();

  const [messager, setMessage] = useState('');

  messageBus.subscribe('internalchannel', 'newMessage', event => {
    if(event.payload.from !== 'react navigation' && event.payload.message !== messager){
      console.log('message received from ' + event.payload.from);
      setMessage(event.payload.message);
    }
  });

  function handleChange(e) {
    setMessage(e.target.value);
    messageBus.publish('internalchannel', 'newMessage', {message: e.target.value, from: 'react navigation'});
  }

  return (
    <Router>
      <nav className="Navigation">
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/demo">Demo</a></li>
          <li><a href="/demo/urlparam">Url param</a></li>
          <li className="messagebus">Message: {messager}</li>
          <li>Set message: <input type="text" value={messager} onChange={handleChange}/></li>
        </ul>
      </nav>
    </Router>
    
  );
}

export default App;
