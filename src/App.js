import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Create from './create/Create';
import Header from './header/Header';
import Home from './Home';
import Read from './read/Read';
import './style.sass';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/read" element={<Read />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
