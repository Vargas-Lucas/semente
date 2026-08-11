import { DishForm } from "@/components/admin/dish-form";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditDishPage({ params }: PageProps) {
  const { id } = await params;

  return (
    <div className="space-y-4">
      <div>
        <h2 className="font-display text-2xl">Editar prato</h2>
        <p className="text-sm text-muted">Atualize preço, disponibilidade e detalhes</p>
      </div>
      <DishForm dishId={id} />
    </div>
  );
}
