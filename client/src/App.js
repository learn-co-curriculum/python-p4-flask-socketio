import React, { useState, useEffect } from "react";
import io from "socket.io-client";

let endPoint = "127.0.0.1:5555";
let socket = io.connect(`${endPoint}`);

const App = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    getMessages();
  }, [messages.length]);

  const getMessages = () => {
    socket.on("message", message => {
      setMessages([...messages, message]);
    });
  };

  const onChange = e => {
    setMessage(e.target.value);
  };

  const onClick = () => {
    if (message !== "") {
      socket.emit("message", message);
      setMessage("");
    } else {
      alert("Don't forget to add a message!");
    }
  };

  return (
    <div>
      <h1>Welcome to the chat!</h1>
       <div>
          {messages.map(message => (
          <p style={{"paddingLeft": "10px"}} key={message}>{message}</p>
        ))}
      </div>
      <input value={message} name="message" onChange={e => onChange(e)} />
      <button onClick={onClick}>Send Message</button>
    </div>
  );
};

export default App;
