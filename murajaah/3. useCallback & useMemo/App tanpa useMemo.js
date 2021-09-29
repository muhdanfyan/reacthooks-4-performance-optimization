import React, { useState, useCallback, useMemo } from "react";
import "./App.css";
import Layout from "./Layout";

/**
 * gunakan useCallbac
 * 
 */

function App() {
  const [count, setCount] = useState(0);
  const [user, setUser] = useState({ name : "John" })
  const likeAction = () => setCount(current => current + 1)
  const memoizedLikeAction = useCallback(likeAction, []) //tambahan Callback

  console.log("Parent Component Rendered");
  return (
    <Layout>
      <p>
        <i> -- Parent Component -- </i>
      </p>
      <button onClick={likeAction}>
        Like {count} {" "} 
      </button>
      <MemoizedChildComponent 
        title="hello" 
        user = {user}
        action={memoizedLikeAction}/>
    </Layout>
  );
}

function ChildComponent({ title, user, action }) {
  // sleep(2000) // heavy process simulation
  console.log("Child Component Rendered");
  return (
    <>
      <p>
        <br />
        <i> -- Child Component -- </i>
      </p>
      <h1> {title}, {user.name} </h1>
      <button onClick={action}> Like </button> 
    </>
  );
}

function compare (prevProps, nextProps){
  return JSON.stringify (prevProps) === JSON.stringify(nextProps)
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