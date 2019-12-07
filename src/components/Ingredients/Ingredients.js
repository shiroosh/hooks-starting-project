import React, { useState, useEffect } from "react";

import IngredientForm from "./IngredientForm";
import IngredientList from "../Ingredients/IngredientList";
import Search from "./Search";

const Ingredients = () => {
  const [userIngredients, setUserIngredients] = useState([]);

  // runs after every render cycle
  // useEffect();

  const addIngredientHandler = ingredient => {
    fetch("https://react-hooks-fc045.firebaseio.com/ingredients.json", {
      method: "POST",
      body: JSON.stringify({ ingredient }),
      headers: { "Content-Type": "application/json" }
    })
      .then(response => response.json())
      .then(responseData => {
        setUserIngredients(prevIngredients => [
          ...prevIngredients,
          {
            id: responseData.name,
            ...ingredient
          }
        ]);
      });
  };

  const removeIngredientHandler = ingredientId => {
    setUserIngredients(prevIngredients =>
      prevIngredients.filter(ingredient => ingredient.id !== ingredientId)
    );
  };

  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientHandler} />

      <section>
        <Search />
        <IngredientList
          ingredients={userIngredients}
          onRemoveIngredient={removeIngredientHandler}
        />
      </section>
    </div>
  );
};

export default Ingredients;
