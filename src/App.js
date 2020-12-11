import React from "react";
import Weather from "./components/Weather";
import currentDate from "./components/currentDate";
import "./App.scss";

function App() {
  return (
    <>
      <main>
        <currentDate />
        <Weather />
      </main>
    </>
  );
}

export default App;
