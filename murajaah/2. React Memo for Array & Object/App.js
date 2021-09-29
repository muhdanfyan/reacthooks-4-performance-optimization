import React, { useState, useCallback, useMemo } from "react";
import "./App.css";
import Layout from "./Layout";

/**
 * ada masalah dalam react memo saat penggunaan variable object
 * ketika digunakan object ada masalah optimasi component child tetap dirender karena JS tetap menganggap nilai object berbeda meskipun nilai inputannya sama
 * solusi pertama ubah variable objet menjadi global (keluarkan dalam scope)
 * solusi kedua buat function compare lalu ubah nilai object dengan stringify
 * solusi ketiga pindahkan pindahkan variable ke state (paling simple) karena variabl state tidak dire-create ketika di-render
 * 
 */

// solusi 1
// tapi tidak semua kasus harus gunakan ubah variable menjadi global
// const user = { name : "John" }
function App() {
  const [count, setCount] = useState(0);
  // const user = { name : "John" }
  // solusi 3
  const [user, setUser] = useState({ name : "John" })

  console.log("Parent Component Rendered");
  return (
    <Layout>
      <p>
        <i> -- Parent Component -- </i>
      </p>
      <button onClick={() => setCount(current => current + 1)}>
        Click {count} {" "} 
      </button>
      <MemoizedChildComponent title="hello" user = {user}/>
    </Layout>
  );
}

function ChildComponent({ title, user }) {
  // sleep(2000) // heavy process simulation
  console.log("Child Component Rendered");
  return (
    <>
      <p>
        <br />
        <i> -- Child Component -- </i>
      </p>
      <h1> {title}, {user.name} </h1>
    </>
  );
}

// solusi 2
function compare (prevProps, nextProps){
  return JSON.stringify (prevProps) === JSON.stringify(nextProps)
}
// const MemoizedChildComponent = React.memo(ChildComponent, compare)

const MemoizedChildComponent = React.memo(ChildComponent)

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

export default App;