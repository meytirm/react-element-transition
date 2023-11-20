import './App.css'
import {ReactTransition} from "./components";
import {useState} from "react";

function App() {
  const [show, setShow] = useState(true)
  return (
    <div className="App" style={{display: 'flex'}}>
      <button onClick={() => setShow(!show)}>show/hide</button>
      <ReactTransition value={show}>
        <div>hello</div>
      </ReactTransition>
    </div>
  )
}

export default App
