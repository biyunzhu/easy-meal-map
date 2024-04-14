import "./Homepage.scss";
import MealList from "../../components/MealList/MealList";

function Homepage({ meals }) {
  return (
    <section className="home">
      <MealList meals={meals} className="board__meals" />
    </section>
  );
}

export default Homepage;
