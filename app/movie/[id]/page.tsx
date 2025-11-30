"use client";
import { useParams } from "next/navigation";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { useFavourites } from "@/context/FavouritesContext";

import Skeleton from "@/components/Skeleton/page";

type MovieDetailsType = {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  runtime: number;
  genres: { id: number; name: string }[];
  status: string;
};

const Page = () => {
  const params = useParams();
  const id = params.id || "";
  const key = `${process.env.NEXT_PUBLIC_TMDB_KEY}`;
  const [movieDetails, setMovieDetails] = useState<MovieDetailsType | null>(
    null
  );
  const { addToFavourites, removeFromFavourites, isFavourite } =
    useFavourites();

  useEffect(() => {
    async function fetchMovieDetails() {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${key}&language=en-US`
        );
        const data = await response.json();
        setMovieDetails(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchMovieDetails();
  }, [id]);

  if (!movieDetails) {
    return <Skeleton />;
  }
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto bg-gray-800 rounded-lg shadow-lg overflow-hidden md:flex">
        <div className="md:flex-shrink-0 relative">
          <img
            src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
            alt={movieDetails.title}
            className="w-full h-96 object-cover md:w-64"
          />
          <Heart
            width={30}
            height={30}
            className={`absolute top-4 right-4 z-10 cursor-pointer hover:text-red-400 transition-colors ${
              isFavourite(movieDetails.id) ? "text-red-500" : "text-white"
            }`}
            onClick={(e) => {
              e.preventDefault();
              if (isFavourite(movieDetails.id)) {
                removeFromFavourites(movieDetails.id);
              } else {
                addToFavourites(movieDetails.id);
              }
            }}
          />
        </div>
        <div className="p-8 flex flex-col justify-center">
          <h1 className="text-4xl font-bold mb-4">{movieDetails.title}</h1>
          <p className="text-gray-300 text-lg mb-6">{movieDetails.overview}</p>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-gray-400">Release Date:</p>
              <p className="text-white font-semibold">
                {movieDetails.release_date}
              </p>
            </div>
            <div>
              <p className="text-gray-400">Vote Average:</p>
              <p className="text-white font-semibold">
                {movieDetails.vote_average.toFixed(1)} / 10
              </p>
            </div>
            <div>
              <p className="text-gray-400">Runtime:</p>
              <p className="text-white font-semibold">
                {movieDetails.runtime} minutes
              </p>
            </div>
            <div>
              <p className="text-gray-400">Genres:</p>
              <p className="text-white font-semibold">
                {movieDetails.genres.map((genre) => genre.name).join(", ")}
              </p>
            </div>
          </div>
          <p className="text-gray-400">
            Status:{" "}
            <span className="text-white font-semibold">
              {movieDetails.status}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
