import './App.css';
import Login from './components/Login';
import { Routes, Route } from "react-router-dom";
import Dashboard from './components/Dashboard/Dashboard';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      </header>
    </div>
  );
}

export default App;
