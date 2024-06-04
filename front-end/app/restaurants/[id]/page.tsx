"use client";
import {
  useFetchCategoriesRestaurant,
  useFetchProducts,
  useFetchRestaurants,
} from "@/app/_hooks/useFetch";
import { notFound } from "next/navigation";
import RestaurantImage from "./_components/restaurant-image";
import Image from "next/image";
import { StarIcon } from "lucide-react";
import DeliveryInfo from "@/app/_components/delivery-info";
import ProductList from "@/app/_components/product-list";

interface RestaurantPageProps {
  params: {
    id: string;
  };
}

const RestaurantPage = ({ params: { id } }: RestaurantPageProps) => {
  const { restaurants, loading, error } = useFetchRestaurants();
  const { categories } = useFetchCategoriesRestaurant();
  const { products } = useFetchProducts();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const restaurant = restaurants.find((restaurant) => restaurant.ID === id);
  const categorie = categories.filter((categories) => categories.RestaurantID === id);
  const product = products.filter((product) => product.RestaurantID === id);

  if (!restaurant) {
    return notFound();
  }

  return (
    <div>
      <RestaurantImage restaurant={restaurant} />

      <div className="flex justify-between itens-center px-5 pt-5">
        {/*TITULO*/}
        <div className="flex items-center gap-[0.375rem]">
          <div className="relative h-8 w-8">
            <Image
              src={restaurant.ImageUrl}
              alt={restaurant.Name}
              fill
              className="rounded-full object-cover"
            />
          </div>
          <h1 className="font-semibold text-xl">{restaurant.Name}</h1>
        </div>

        <div className="py-[2px] px-2 rounded-full bg-foreground text-white flex items-center gap-[3px]">
          <StarIcon size={12} className=" fill-yellow-400 text-yellow-400" />
          <span className="font-semibold text-xs">5.0</span>
        </div>
      </div>

      <div className="px-5">
        <DeliveryInfo restaurant={restaurant} />
      </div>

      <div className="mt-3 flex gap-4 overflow-x-scroll px-5 [&::-webkit-scrollbar]:hidden">
        {categorie.map((categorie) => (
          <div
            key={categorie.CategoryID}
            className="min-w-[167px] rounded-lg bg-[#F4F4F4] text-center"
          >
            <span className="text-xs text-muted-foreground">
              {categorie.Category.Name}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-6 space-y-4">
        {/* TODO: mostrar produtos mais pedidos quando implementarmos realização de pedido */}
        <h2 className="px-5  font-semibold">Mais Pedidos</h2>
        <ProductList products={product} />
      </div>

      {product.map((product) => (
        <div className="mt-6 space-y-4" key={product.CategoryID}>
          {product?.Category?.Name}
        </div>
      ))}
    </div>
  );
};

export default RestaurantPage;
