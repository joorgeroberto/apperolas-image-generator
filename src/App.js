// import image from './images/jorge.jpg';
import image from './images/domingos.jpeg';

import './App.css';
import { Canvas } from './Canvas';
import AnimatedCanvas from './AnimatedCanvas';

function App() {
  return (
    <Canvas
      imageToShow={image}
      textToShow={"I've logged bugs last week, I've logged some bugs yesterday and I'll log more bugs today!"}
      // textToShow={`Hello world`}
      author={'sabados, Domingos'}
      width='1280'
      height='720'
    />
    // <AnimatedCanvas />
  );
}

export default App;
