import { useState } from 'react';
import { HoverBox, RotateElement } from './components';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <HoverBox />
      <RotateElement />
    </>
  );
}

export default App;
