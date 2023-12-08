
import Intro from './pages/Intro'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css'
function App() {
  return (
   
    <Router>
      <div className="App">
       <Intro/>
        <Routes>
          <Route path="/" exact component={Intro} />
        
        </Routes>
      </div>
    </Router>
  );
}

export default App;
