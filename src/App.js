import './App.css';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import DayHappinessPrompt from './components/DayHappinessPrompt';
import HappinessStats from './components/HappinessStats';
import NavHome from './assets/nav-home.svg'
import NavStats from './assets/nav-stats.svg'
import NavInfo from './assets/nav-info.svg'
import Info from './components/Info';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <nav>
          <Link to="/" className="nav-item"><img src={NavHome} alt='home'/></Link>
          <Link to="/stats" className="nav-item"><img src={NavStats} alt='stats'/></Link>
          <Link to="/info" className="nav-item"><img src={NavInfo} alt='info'/></Link>
        </nav>
        <div id="main-content">
          <Routes>
            <Route path="/" element={<DayHappinessPrompt />}></Route>
            <Route path="/stats" element={<HappinessStats />}></Route>
            <Route path="/info" element={<Info />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
