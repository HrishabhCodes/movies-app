import "./App.css";
import Banner from "./components/Banner";
import Navbar from "./components/Navbar";
import Movies from "./components/Movies";
import Favorites from "./components/Favorites";
import {
  BrowserRouter as Router,
  Routes,
  Switch,
  Route,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Banner />
              <Movies />
            </>
          }
        />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </Router>
  );
}

export default App;
