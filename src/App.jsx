
import Intro from './pages/Intro'
import Upload from './pages/upload'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css'
import Profile from './pages/profile';
function App() {
  return (
   
    <Router>
      <div className="App">
      
        <Routes>
         <Route path='/upload' Component={Upload}/>
        <Route path="/profile" Component={Profile}/>
        <Route path="/" Component={Intro}/>
        
        
        </Routes>
      </div>
    </Router>
  );
}

export default App;
