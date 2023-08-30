import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import {HomePage} from "./views/HomePage";
import {GamePage} from "./views/GamePage";
import {Header} from "./components/Header";
//TODO сделать 5 минут сохранине информации
// TODO сортировка
function App() {
  return (
    <>
      <Header/>
      <div className='container mx-auto py-4'>
        <Routes>
          <Route path="/" element={<HomePage/>}></Route>
          <Route path="/:id" element={<GamePage/>}></Route>
        </Routes>
        </div>
    </>
  );
}

export default App;
