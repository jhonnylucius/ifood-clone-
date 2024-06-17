"use client";
import { Restaurant } from "@/services/service";
import { notFound, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useFetchRestaurants } from "../_hooks/useFetch";
import { filterRestaurants } from "./_actions/search";
import Header from "../_components/header";
import RestaurantItem from "../_components/restaurant/restaurant-item";
import Link from "next/link";

const Restaurants = () => {
  const { restaurants } = useFetchRestaurants();
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>(
    []
  );
  const searchParams = useSearchParams();

  useEffect(() => {
    const search = searchParams.get("search");

    if (!search) {
      return notFound();
    }

    const filtered = filterRestaurants(restaurants, search);
    setFilteredRestaurants(filtered);
  }, [restaurants, searchParams]);

  return (
    <>
      <Header />
      <div className="px-5 py-6">
        <h2 className="mb-6 text-lg font-semibold">Restaurantes Encontrados</h2>
        <div className="flex w-full flex-col gap-6">
          {filteredRestaurants.map((restaurant) => (
            <Link href={`/restaurants/${restaurant.ID}`}>
              <RestaurantItem key={restaurant.ID} restaurant={restaurant} />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Restaurants;
