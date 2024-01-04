import React, { useState } from "react";
import Login from "./components/Login/Login";
import Mainlayout from "./components/Mainlayout/Mainlayout";
import "./App.css";
import { ChatProvider } from "./context/chatContext";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
  };
  return (
    <ChatProvider>
        <div className="App">
          {loggedIn ? <Mainlayout /> : <Login onLogin={handleLogin} />}
        </div>
    </ChatProvider>
  );
}

export default App;
