import { DishForm } from "@/components/admin/dish-form";

export default function NewDishPage() {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="font-display text-2xl">Novo prato</h2>
        <p className="text-sm text-muted">Adicione um item ao cardápio</p>
      </div>
      <DishForm />
    </div>
  );
}
