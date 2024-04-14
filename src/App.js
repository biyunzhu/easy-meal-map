import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import { BASE_URL } from "./constant-variables";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Homepage from "./pages/Homepage/Homepage";
import Tracker from "./pages/Tracker/Tracker";

function App() {
  const [mealList, setMealList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMealList = async () => {
      try {
        const mealListData = await axios.get(`${BASE_URL}/meals`);
        setMealList(mealListData.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    getMealList();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Homepage meals={mealList} />} />
          <Route path="/history" element={<Tracker meals={mealList} />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
