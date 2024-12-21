import EditableTable from "@/components/editableDatatable";
import ClientWrapper from "@/components/clientWrapper";
import { FOOD_CATEGORIES } from '@/enums/foodCategories';

export default function Home() {
  const initialData = [
    { id: 1, name: "Apple", quantity: 10, expiry/best-before-date: 11/12/2025, category: FOOD_CATEGORIES.FRUITS, refrigerated: True},
    { id: 2, name: "Banana", quantity: 5, price: 0.9 },
    { id: 3, name: "Cherry", quantity: 20, price: 2.0 },
    { id: 4, name: "Milk", quantity: 20, price: 2.0 },
    { id: 5, name: "Coke Zero", quantity: 20, price: 2.0 },
    { id: 6, name: "Mcdonald", quantity: 20, price: 2.0 },
    const initialData = [
      { id: 1, name: "Apple", quantity: 10, price: 1.5, category: "FRUIT" },
      { id: 2, name: "Broccoli", quantity: 5, price: 2.5, category: "VEGETABLE" },
    ];
  ];

  const columns = [
    { label: "ID", field: "id", width: "10%" },
    { label: "Name", field: "name", width: "30%" },
    { label: "Quantity", field: "quantity", width: "20%", type: "number" },
    { label: "Price", field: "price", width: "20%", type: "number" },
    {
      label: "Category",
      field: "category",
      width: "20%",
      enumOptions: Object.entries(FOOD_CATEGORIES).map(([key, value]) => ({
        label: value,
        value: key,
      })),
    },
  ];
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
