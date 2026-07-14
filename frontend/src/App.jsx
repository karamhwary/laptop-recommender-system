import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Survey from "./pages/survey";
import Result from "./pages/Result";
import LaptopsList from "./pages/LaptopsList";
import LaptopDetails from "./pages/LaptopDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/survey" element={<Survey />} />
        <Route path="/result" element={<Result />} />
        <Route path="/laptops" element={<LaptopsList />} />
        <Route path="/laptop/:id" element={<LaptopDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
