"use client";

import Card from "@/components/atoms/Card";
import Loading from "@/components/atoms/Loading";
import { useEffect, useState } from "react";

export default function Home() {
  const [dataPokemon, setDataPokemon] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage: number = 21;
  const [loadingStatus, setLoadingStatus] = useState<Boolean>(true);

  useEffect(() => {
    setLoadingStatus(true);
    fetchPokemonData();
  }, [currentPage]); // Reload data when currentPage changes

  async function fetchPokemonData() {
    try {
      const response = await fetch(
        `/api/?offset=${(currentPage - 1) * itemsPerPage}`
      );
      const data = await response.json();
      setDataPokemon(data);
      setLoadingStatus(false);
    } catch (error) {
      console.error("Error fetching API", error);
    }
  }

  function handleNextPage() {
    setCurrentPage((prevPage) => prevPage + 1);
  }

  function handlePrevPage() {
    setCurrentPage((prevPage) => prevPage - 1);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 lg:p-24">
      <h1 className="text-xl pb-8">Pokemon List</h1>
      {loadingStatus ? (
        <Loading />
      ) : (
        <div className="w-full grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {dataPokemon.map((item: any) => (
            <Card
              key={item.id}
              id={item.id}
              name={item.name}
              imageSrc={item.sprites.other.dream_world.front_default}
            />
          ))}
        </div>
      )}

      <div className="flex justify-center mt-4">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="mr-4 px-4 py-2 bg-gray-200 rounded cursor-pointer"
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          disabled={dataPokemon.length < itemsPerPage}
          className="px-4 py-2 bg-gray-200 rounded cursor-pointer"
        >
          Next
        </button>
      </div>
    </main>
  );
}
