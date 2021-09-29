import React, { useState, useCallback, useMemo } from "react";
import "./App.css";
import Layout from "./Layout";

function App() {
  const [count, setCount] = useState(0);

  console.log("Parent Component Rendered");
  return (
    <Layout>
      <p>
        <i> -- Parent Component -- </i>
      </p>
      <button onClick={() => setCount(current => current + 1)}>
        Click {count} {" "} 
      </button>
      <MemoizedChildComponent title="hello" />
    </Layout>
  );
}

function ChildComponent({ title }) {
  sleep(2000) // heavy process simulation
  console.log("Child Component Rendered");
  return (
    <>
      <p>
        <br />
        <i> -- Child Component -- </i>
      </p>
      <h1> {title}, React </h1>
    </>
  );
}

const MemoizedChildComponent = React.memo(ChildComponent)

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

export default App;