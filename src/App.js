import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Homepage from "./pages/Homepage/Homepage";
import Tracker from "./pages/Tracker/Tracker";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/history" element={<Tracker />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
