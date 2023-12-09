
import Intro from './pages/Intro'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css'
import SampleComponent from './pages/sample';
function App() {
  return (
   
    <Router>
      <div className="App">
      
        <Routes>
        <Route path="/sample" Component={SampleComponent}/>
        <Route path="/" Component={Intro}/>
        
        </Routes>
      </div>
    </Router>
  );
}

export default App;
