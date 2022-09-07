import React, { useEffect } from "react";
import Header from './components/Header';
import Meme from './components/Meme';
import './App.css';

function App() {
  useEffect(() => {
    document.title = "Meme Generator"
  }, []);

  return (
    <div className="App">
      <Header/>
      <Meme/>
    </div>
  );
}

export default App;
