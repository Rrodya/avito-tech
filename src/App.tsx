import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import {HomePage} from "./views/HomePage";
import {GamePage} from "./views/GamePage";
import {Header} from "./components/Header";

function App() {
  return (
    <>
      <Header/>
      <Routes>
        <Route path="/" element={<HomePage/>}></Route>
        <Route path="/:id" element={<GamePage/>}></Route>
      </Routes>
    </>
  );
}

export default App;
