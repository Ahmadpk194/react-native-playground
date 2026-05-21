import { createContext, useState } from "react";

const FavoritesContext = createContext({
  ids: [],
  addFavorite: (id) => {console.log('hello')},
  removeFavorite: (id) => {},
});

function FavoritesContextProvider({ children }) {
  const [favoriteMealIds, setFavoriteMealIds] = useState([]);


  function addFavorite(id) {
    setFavoriteMealIds((prevIds) => [...prevIds, id]);
  }

  function removeFavorite(id) {
    setFavoriteMealIds((prevIds) =>
      prevIds.filter((mealId) => mealId !== id)
    );
  }

  const values = {
    ids: favoriteMealIds,
    addFavorite: addFavorite,
    removeFavorite: removeFavorite,
  };

  return (
    <FavoritesContext.Provider value={values}>
      {children}
    </FavoritesContext.Provider>
  );
}

export { FavoritesContext };
export default FavoritesContextProvider;