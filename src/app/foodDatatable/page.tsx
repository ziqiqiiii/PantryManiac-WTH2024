"use client";

import EditableTable from "@/components/editableTable";
import ClientWrapper from "@/components/clientWrapper";
import { FOOD_CATEGORIES } from "@/enums/foodCategories";

import { useEffect, useState } from "react";

export default function Home() {
  const [initialData, setInitialData] = useState([]);

  const columns = [
    { label: "ID", field: "id", width: "15%" },
    { label: "Name", field: "name", width: "30%" },
    { label: "Quantity", field: "quantity", width: "20%", type: "number" },
    { label: "Expiry Date", field: "expiry/best-before-date", width: "20%" },
    {
      label: "Category",
      field: "category",
      width: "30%",
      type: "select",
      options: Object.entries(FOOD_CATEGORIES).map(([key, value]) => ({
        label: value,
        value: value,
      })),
    },
    {
      label: "Refrigerated",
      field: "refrigerated",
      width: "20%",
      type: "select",
      options: [
        { label: "True", value: true },
        { label: "False", value: false },
      ],
    },
  ];


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/dummy_food_data.json");
        const data = await response.json();
        setInitialData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSave = async (updatedData) => {
    try {
      const response = await fetch("api/saveDataTable", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        alert("Data saved successfully!");
      } else {
        alert("Failed to save data.");
      }
    } catch (error) {
      console.error("Error saving data:", error);
      alert("An error occurred while saving.");
    }
  };


  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <ClientWrapper>
          <EditableTable columns={columns} initialData={initialData} onSave={handleSave}/>
        </ClientWrapper>
      </main>
    </div>
  );
}
