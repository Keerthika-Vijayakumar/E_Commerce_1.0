import './App.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import DetailPage from './Pages/DetailPage';
import ListingPage from './Pages/ListingPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/products/:id" element={<DetailPage />} />
          <Route path="/products" element={<ListingPage />} />
          <Route path="/" element={<ListingPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
