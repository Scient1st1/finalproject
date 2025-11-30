"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useAuth } from "../hooks/Auth";

type FavouritesContextType = {
  favourites: number[];
  addToFavourites: (movieId: number) => void;
  removeFromFavourites: (movieId: number) => void;
  isFavourite: (movieId: number) => boolean;
};

const FavouritesContext = createContext<FavouritesContextType | undefined>(
  undefined
);

export const FavouritesProvider = ({ children }: { children: ReactNode }) => {
  const { user, loading } = useAuth();
  const [favourites, setFavourites] = useState<number[]>([]);

  useEffect(() => {
    if (user && user.favourites) {
      setFavourites(user.favourites);
    }
  }, [user, loading]);

  const addToFavourites = (movieId: number) => {
    setFavourites((prevFavourites) => {
      const newFavourites = [...prevFavourites, movieId];
      updateUserFavourites(newFavourites);
      return newFavourites;
    });
  };

  const removeFromFavourites = (movieId: number) => {
    setFavourites((prevFavourites) => {
      const newFavourites = prevFavourites.filter((id) => id !== movieId);
      updateUserFavourites(newFavourites);
      return newFavourites;
    });
  };

  const isFavourite = (movieId: number) => {
    return favourites.includes(movieId);
  };

  const updateUserFavourites = (newFavourites: number[]) => {
    if (user) {
      const updatedUser = { ...user, favourites: newFavourites };
      localStorage.setItem("user", JSON.stringify(updatedUser));
    }
  };

  return (
    <FavouritesContext.Provider
      value={{
        favourites,
        addToFavourites,
        removeFromFavourites,
        isFavourite,
      }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};

export const useFavourites = () => {
  const context = useContext(FavouritesContext);
  if (context === undefined) {
    throw new Error("useFavourites must be used within a FavouritesProvider");
  }
  return context;
};
