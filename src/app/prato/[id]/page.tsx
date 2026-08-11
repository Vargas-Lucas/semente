import { notFound } from "next/navigation";
import { DishDetail } from "@/components/menu/dish-detail";
import { getCategories, getDishById } from "@/lib/menu-api";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function DishPage({ params }: PageProps) {
  const { id } = await params;
  const [dish, categories] = await Promise.all([
    getDishById(id),
    getCategories(),
  ]);

  if (!dish) notFound();

  const categoryName = categories.find((c) => c.id === dish.category_id)?.name;

  return <DishDetail dish={dish} categoryName={categoryName} />;
}
