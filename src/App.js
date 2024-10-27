import './App.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
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
          <NavLink to="/" className="nav-item"><img src={NavHome} alt='home'/></NavLink>
          <NavLink to="/stats" className="nav-item"><img src={NavStats} alt='stats'/></NavLink>
          <NavLink to="/info" className="nav-item"><img src={NavInfo} alt='info'/></NavLink>
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
