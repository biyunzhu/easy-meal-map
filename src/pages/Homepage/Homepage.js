import "./Homepage.scss";
import MealList from "../../components/MealList/MealList";

function Homepage() {
  return (
    <section className="home">
      <MealList className="board__meals" />
    </section>
  );
}

export default Homepage;
