"use client";
import { useState, useEffect } from "react";
import { useFavourites } from "@/context/FavouritesContext";
import Link from "next/link";
import { Heart } from "lucide-react";
import ConfirmationModal from "@/components/ConfirmationModal/page";

type movieType = {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
};

const FavouritesPage = () => {
  const { favourites, removeFromFavourites, isFavourite } = useFavourites();
  const [favouriteMovies, setFavouriteMovies] = useState<movieType[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [movieToRemove, setMovieToRemove] = useState<number | null>(null);
  const key = `${process.env.NEXT_PUBLIC_TMDB_KEY}`;

  useEffect(() => {
    async function fetchFavouriteMovies() {
      setLoading(true);
      const moviePromises = favourites.map((id) =>
        fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${key}&language=en-US`
        ).then((res) => res.json())
      );
      const movies = await Promise.all(moviePromises);
      setFavouriteMovies(movies);
      setLoading(false);
    }

    if (favourites.length > 0) {
      fetchFavouriteMovies();
    } else {
      setFavouriteMovies([]);
      setLoading(false);
    }
  }, [favourites]);

  const openModal = (movieId: number) => {
    setMovieToRemove(movieId);
    setIsModalOpen(true);
  };

  const handleConfirmRemove = () => {
    if (movieToRemove) {
      removeFromFavourites(movieToRemove);
    }
    setIsModalOpen(false);
    setMovieToRemove(null);
  };

  const handleCancelRemove = () => {
    setIsModalOpen(false);
    setMovieToRemove(null);
  };

  if (loading) {
    return <div className="text-center text-white">Loading favourites...</div>;
  }

  return (
    <div className="container p-4 mx-auto">
      <h1 className="text-3xl font-bold text-white mb-8">My Favourites</h1>
      {favouriteMovies.length === 0 ? (
        <p className="text-white">You have no favourite movies yet.</p>
      ) : (
        <div className="movies container flex flex-wrap justify-center gap-6 p-4 mx-auto">
          {favouriteMovies.map((movie: movieType, index) => (
            <div
              key={`${index}`}
              className="movie w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-4 bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <Link href={`/movie/${movie.id}`} key={`${movie.id}-${index}`}>
                <div className="movie-card relative">
                  <Heart
                    width={30}
                    height={30}
                    className={`absolute top-4 right-4 z-10 cursor-pointer hover:text-red-400 transition-colors ${
                      isFavourite(movie.id) ? "text-red-500" : "text-white"
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      openModal(movie.id);
                    }}
                  />
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full h-auto rounded-md mb-4"
                  />
                  <h2 className="text-xl font-bold text-white mb-2">
                    {movie.title}
                  </h2>
                  <p className="text-gray-300 text-sm mb-2">
                    {movie.overview.substring(0, 100) + "..."}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
      <ConfirmationModal
        open={isModalOpen}
        onConfirm={handleConfirmRemove}
        onCancel={handleCancelRemove}
      />
    </div>
  );
};

export default FavouritesPage;
