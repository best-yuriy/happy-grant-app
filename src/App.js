import './App.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import AppRoute from './components/AppRoute';
import DayHappinessPrompt from './components/DayHappinessPrompt';
import HappinessStats from './components/HappinessStats';
import NavHome from './assets/nav-home.svg'
import NavStats from './assets/nav-stats.svg'
import NavInfo from './assets/nav-info.svg'
import Info from './components/Info';

function App() {
  return (
    <div className="App flex-column">
      <BrowserRouter>
        <nav className="flex-column-fixed flex-row">
          <NavLink to="/" className="nav-item"><img src={NavHome} alt='home'/></NavLink>
          <NavLink to="/stats" className="nav-item"><img src={NavStats} alt='stats'/></NavLink>
          <NavLink to="/info" className="nav-item"><img src={NavInfo} alt='info'/></NavLink>
        </nav>
        <div className="flex-column-main">
          <Routes>
            <Route path="/info" element={<Info />} />
            <Route element={<AppRoute />}>
              <Route path="/" element={<DayHappinessPrompt />} />
              <Route path="/stats" element={<HappinessStats />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
