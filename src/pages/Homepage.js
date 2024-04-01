import "./Homepage.scss";
import MealList from "../components/MealList/MealList";
import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../constant-variables";

function Homepage() {
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
    <section className="home">
      <MealList meals={mealList} className="board__meals" />
    </section>
  );
}

export default Homepage;
