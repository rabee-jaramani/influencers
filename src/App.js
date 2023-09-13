// import { BrowserRouter as Router, Route,  } from 'react-router-dom';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Create from './create/Create';
import Header from './header/Header';
import Home from './Home';
import Read from './read/Read';
import './style.sass';
// import { HashRouter as  Route, Routes } from 'react-router-dom';
function App() {
  return (
    <HashRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/read" element={<Read />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
