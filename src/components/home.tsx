import React, { useState } from "react";
import BillInputSection from "./BillInputSection";
import ItemsList from "./ItemsList";
import SplitSummary from "./SplitSummary";
import { ThemeToggle } from "./ThemeToggle";

interface Item {
  id: string;
  name: string;
  price: number;
  sharedBy: string[];
}

const Home = () => {
  const [billTotal, setBillTotal] = useState<number>();
  const [taxAmount, setTaxAmount] = useState<number>();
  const [tipAmount, setTipAmount] = useState<number>();
  const [numberOfDiners, setNumberOfDiners] = useState(0);
  const [names, setNames] = useState<string[]>([]);
  const [items, setItems] = useState<Item[]>([]);

  const handleAddDiner = () => {
    const newName = `Person ${numberOfDiners + 1}`;
    setNames([...names, newName]);
    setNumberOfDiners((prev) => prev + 1);
  };

  const handleRemoveDiner = () => {
    if (numberOfDiners > 0) {
      const lastDinerId = String(numberOfDiners);
      setNames(names.slice(0, -1));
      setNumberOfDiners((prev) => prev - 1);
      // Remove this person from any shared items
      setItems(
        items.map((item) => ({
          ...item,
          sharedBy: item.sharedBy.filter((id) => id !== lastDinerId),
        })),
      );
    }
  };

  const handleAddItem = () => {
    const newItem: Item = {
      id: String(items.length + 1),
      name: "",
      price: 0,
      sharedBy: [],
    };
    setItems([...items, newItem]);
  };

  const handleDeleteItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleUpdateItem = (id: string, updates: Partial<Item>) => {
    setItems(
      items.map((item) => (item.id === id ? { ...item, ...updates } : item)),
    );
  };

  const calculateTotals = () => {
    const subtotal = items.reduce((sum, item) => sum + item.price, 0);
    const tax = taxAmount || 0;
    const tip = tipAmount || 0;
    const total = subtotal + tax + tip;

    const people = Array.from({ length: numberOfDiners }, (_, i) => {
      const personId = String(i + 1);
      const personItems = items.filter((item) =>
        item.sharedBy.includes(personId),
      );
      const itemsWithShares = personItems.map((item) => ({
        name: item.name,
        price: item.price,
        sharedCount: item.sharedBy.length,
      }));
      const itemsTotal = personItems.reduce(
        (sum, item) => sum + item.price / item.sharedBy.length,
        0,
      );
      const taxShare = (itemsTotal / subtotal) * tax || 0;
      const tipShare = (itemsTotal / subtotal) * tip || 0;

      return {
        name: names[i] || `Person ${i + 1}`,
        items: itemsWithShares,
        itemsTotal,
        taxShare,
        tipShare,
        total: itemsTotal + taxShare + tipShare,
      };
    });

    return { subtotal, tax, tip, total, people };
  };

  const totals = calculateTotals();

  return (
    <div className="min-h-screen bg-background p-4 sm:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-center mb-8">
          Bill Splitting Calculator
        </h1>

        <div className="flex justify-end absolute top-4 right-4">
          <ThemeToggle />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
          <div className="space-y-8">
            <BillInputSection
              billTotal={billTotal}
              taxAmount={taxAmount}
              tipAmount={tipAmount}
              numberOfDiners={numberOfDiners}
              onBillTotalChange={setBillTotal}
              onTaxAmountChange={setTaxAmount}
              onTipAmountChange={setTipAmount}
              onNumberOfDinersChange={handleAddDiner}
              onRemoveDiner={handleRemoveDiner}
            />

            <ItemsList
              items={items}
              numberOfDiners={numberOfDiners}
              onAddItem={handleAddItem}
              onDeleteItem={handleDeleteItem}
              onUpdateItem={handleUpdateItem}
            />
          </div>

          <div>
            <SplitSummary
              subtotal={totals.subtotal}
              tax={totals.tax}
              tip={totals.tip}
              total={totals.total}
              people={totals.people}
              onUpdateName={(index, newName) => {
                const newNames = [...names];
                newNames[index] = newName;
                setNames(newNames);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
