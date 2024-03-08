"use client";

import Loading from "@/components/atoms/Loading";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const [dataPokmenon, setDataPokemon] = useState<any>([]);
  const [loadingStatus, setLoadingStatus] = useState<Boolean>(true);

  useEffect(() => {
    async function fetchIP() {
      try {
        const response = await fetch("/api/" + params.slug);
        const data = await response.json();
        setDataPokemon(data);
        setLoadingStatus(false);
      } catch (error) {
        console.error("Error fetching API", error);
      }
    }
    fetchIP();
  }, []);

  return (
    <div className="p-24 flex justify-center items-center gap-5 relative min-h-screen">
      {loadingStatus ? (
        <Loading />
      ) : (
        <>
          <div className="h-full">
            <img
              src={dataPokmenon?.sprites?.other.dream_world.front_default}
              alt={dataPokmenon?.name}
            />
          </div>
          <div className="">
            <h2 className="text-[80px]">{dataPokmenon.name}</h2>
            <div className="flex flex-row gap-4">
              <h4 className="text-2xl">Types :</h4>
              <div className="flex flex-row gap-3">
                {dataPokmenon?.types?.map((item: any, index: number) => {
                  return (
                    <span
                      key={index}
                      className="ring-2 ring-slate-500 text-sm p-2"
                    >
                      {item.type.name}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      )}

      <button
        onClick={() => router.push("/")}
        className="px-5 py-2 rounded-md bg-slate-800 text-white hover:bg-slate-500 absolute top-10 left-10"
      >
        Back
      </button>
    </div>
  );
}
