import "./MealRecipe.scss";
import axios from "axios";
import { Draggable } from "react-beautiful-dnd";
import { BASE_URL } from "../../constant-variables";
import changeIcon from "../../assets/icons/refresh_reload_repeat_rotate_sync_icon.svg";
import deleteIcon from "../../assets/icons/delete_dustbin_garbage_recycle bin_trash can_icon.svg";
import removeRcipeFromMealList from "../../utils/removeRecipeFromMealList";
import changeRecipeForMeal from "../../utils/changeRecipeForMeal";

function MealRecipe({
  recipe,
  index,
  mealList,
  meal_id,
  setMealList,
  buttonStatus,
  setButtonStatus,
}) {
  const handleChange = () => {
    // Remove old meal & recipe pair from database
    const removeRcipeFromMeal = async () => {
      try {
        const response = await axios.delete(
          `${BASE_URL}/meals?meal_id=${meal_id}&recipe_id=${recipe.recipe_id}`
        );
      } catch (error) {
        console.error(error);
      }
    };
    removeRcipeFromMeal();
    // Add new random recipe to meal
    const addRandomRecipe = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/meals/auto/${meal_id}`);
        const newRecipe = response.data;
        // Update meal list
        const newMealList = changeRecipeForMeal(
          mealList,
          meal_id,
          index,
          newRecipe
        );
        setMealList(newMealList);
        setButtonStatus(!buttonStatus);
      } catch (error) {
        console.error(error);
      }
    };
    addRandomRecipe();
  };
  const handleDelete = () => {
    // remove recipe from meal
    const newMealList = removeRcipeFromMealList(mealList, meal_id, index);

    // Remove old meal & recipe pair from database
    const removeRcipeFromMeal = async () => {
      try {
        const response = await axios.delete(
          `${BASE_URL}/meals?meal_id=${meal_id}&recipe_id=${recipe.recipe_id}`
        );
        setMealList(newMealList);
        setButtonStatus(!buttonStatus);
      } catch (error) {
        console.error(error);
      }
    };
    removeRcipeFromMeal();
  };
  return (
    <Draggable
      draggableId={`${recipe.recipe_uuid}`}
      key={recipe.recipe_uuid}
      index={index}
    >
      {(provided) => (
        <div
          className="meal-recipe"
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          {/* <img
            className="meal-recipe__thumbnail"
            src="https://edamam-product-images.s3.amazonaws.com/web-img/1dc/1dc25689983e340ac037e67660b3e8a9-s?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFgaCXVzLWVhc3QtMSJGMEQCIAqWkviAbyQhtXIUrVgLMmFEtCrdHaL8Zzlr05d%2FnKg4AiAPKhogmZQcJSGDxzD3fjdB3HoyZUhEgvoR6G078rkzqirCBQiQ%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDE4NzAxNzE1MDk4NiIMKrMauVJzTOJZGGtFKpYFLowfZql03zLLRjMneyG3u54xFtLBHor%2F18Z9V%2Fh8kTenGxf4LiZ74VU835B956uJFz3aPe%2BMXBnqrSeP7wAkemyD2T0KnIG%2BOYxNWn87kxLMAE4ztrajhXlb1Apv8A9sEhAoPBgdWOyRtv76wK%2FYO8H7eB1%2F1rcZq%2Fv7GFlm1Ou9URGQ0RfjxJU34dB8gLA7eMY%2FKb8BNIluDOfd%2BRKOc08VZ8g1wlvUzPK6oYfDlBdIVyUUWFsi%2Bes8%2FI9vPaHKkgx10VLTzDEFnQwqjcq6nKMONZL34Sg4GZm16qzhUy2z%2F1FQDsesZCBiqSZGQzRFPa1ZEy08n%2F8UjPweDc778Uwq5v9v0DAHgZHwJ0HywcI7Qwm4qCWsBECxxpVBAnT8qSMdOAtEf5NZu2BB1u1h9CrVofmC1RDcPD25YXXY%2FTkjAWvNereG5tWcBAdSNysyAe24caWjPt%2FLila5bRaMa5GdQZtsl%2FYB9e%2BSKeUQgu7TiGnDhFutyMW3XMjs8RB6z1zD9UqoOAq8wIASLdbdPPZ3YdGKOU1v3rtjkQ0EzxgxSuzGic%2BJV3uXAWXxN8wADLquIHb9zBqmW6%2Fp0DqfTnpU%2BQAVWWzpJOcfyyDP%2Fkwo9M%2FeIiUEYUNHflHLDTFFCQzCHrfkQHM33ZSd63XSHXOtf0B0F6Ky8r9kLeV%2FtMIuvjMd7NNbcs%2BvlUnQO24HK6uDYlnpF4cAOXDd6qyAdKOYcvg9%2Ff7crhl1IqhsNGk3lnGV5ef5Zt3iG%2FhdUMhMKtvX9lQ6wHBFca%2FWSj57S%2B0SmnZjeuaJ9qhn%2BVuQf%2FQCS8zcIU%2B8mlUA2YrVrX11TkCFvA72wIoif%2BoISQNyaf9XkAKA69Oev8sh%2BkzMCPORmzjjGwkw%2B%2BjvsAY6sgG8gl2CQXdJC%2BPFM%2F3dOBBkuVefktGW28VTyx6AHF5JZNvEVh0KnWXLqWzSODafq5mUnSUgWk1nqGUDVouYXaQ4vAXzJvvaOHbBZWO%2F%2Br7Q52Mtamb%2BbL2ic2U4ATBBg5kHHdHfHCUF%2BF4IspvjBscEmbL7mjaB10%2Bv2AI2uUYSMKoz%2FkRJbEZ2CQoshww%2FviqSzg1bU02Oc6mN0pnuIUbHAQjOJ1u46GhDY1mWwuLzCZva&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240414T162725Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFLTSILTWF%2F20240414%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=846e086896e6b54b38c653649a4c72724238b8414daa1549969b284caca341bc"
          /> */}
          <a href={recipe.recipe_url} target="_blank">
            {recipe.recipe_name}
          </a>
          <div className="meal-recipe__icons">
            <div className="meal-recipe__item">
              <img
                src={changeIcon}
                alt="change recipe"
                onClick={handleChange}
                className="meal-recipe__icon"
              />
              <p className="meal-recipe__message">Change recipe</p>
            </div>
            <div className="meal-recipe__item">
              <img
                src={deleteIcon}
                alt="delete recipe"
                onClick={handleDelete}
                className="meal-recipe__icon"
              />
              <p className="meal-recipe__message">Delete recipe</p>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
}

export default MealRecipe;
