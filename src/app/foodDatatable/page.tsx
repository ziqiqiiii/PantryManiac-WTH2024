import EditableTable from "@/components/editableDatatable";
import ClientWrapper from "@/components/clientWrapper";
import { FOOD_CATEGORIES } from '@/enums/foodCategories';

export default function Home() {
  const initialData = [
    { id: 1, name: "Apple", quantity: 10, "expiry/best-before-date": "11/12/2025", category: FOOD_CATEGORIES.FRUITS, refrigerated: true },
    { id: 2, name: "Broccoli", quantity: 5, "expiry/best-before-date": "11/06/2024", category: FOOD_CATEGORIES.VEGETABLES, refrigerated: true },
  ];

  const columns = [
    { label: "ID", field: "id", width: "10%" },
    { label: "Name", field: "name", width: "30%" },
    { label: "Quantity", field: "quantity", width: "20%", type: "number" },
    { label: "Expiry Date", field: "expiry/best-before-date", width: "20%" },
    {
      label: "Category",
      field: "category",
      width: "20%",
      enumOptions: Object.values(FOOD_CATEGORIES).map((value) => ({
        label: value,
        value,
      })),
    },
    { label: "Refrigerated", field: "refrigerated", width: "20%", type: "boolean" },
  ];

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <ClientWrapper>
          <EditableTable initialData={initialData} columns={columns}/>
        </ClientWrapper>
      </main>
    </div>  
  );
}
