import React from "react";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { Plus } from "lucide-react";
import ItemEntry from "./ItemEntry";
import { Card } from "./ui/card";

interface Item {
  id: string;
  name: string;
  price: number;
  sharedBy: string[];
}

interface ItemsListProps {
  items?: Item[];
  numberOfDiners?: number;
  onAddItem?: () => void;
  onDeleteItem?: (id: string) => void;
  onUpdateItem?: (id: string, updates: Partial<Item>) => void;
}

const ItemsList = ({
  items = [],
  numberOfDiners = 0,
  onAddItem = () => {},
  onDeleteItem = () => {},
  onUpdateItem = () => {},
}: ItemsListProps) => {
  // Create diners based on the actual number of diners from sharedBy
  const defaultDiners = Array.from({ length: numberOfDiners }, (_, i) => ({
    id: String(i + 1),
    name: `Person ${i + 1}`,
    selected: false,
  }));

  return (
    <Card className="p-4 sm:p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Items</h2>
        <Button onClick={onAddItem} size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Item
        </Button>
      </div>

      <ScrollArea className="h-[300px] pr-4">
        {items.map((item) => (
          <ItemEntry
            key={item.id}
            itemName={item.name}
            price={item.price}
            diners={defaultDiners.map((diner) => ({
              ...diner,
              selected: item.sharedBy.includes(diner.id),
            }))}
            onDelete={() => onDeleteItem(item.id)}
            onDinerToggle={(dinerId) => {
              const updatedSharedBy = item.sharedBy.includes(dinerId)
                ? item.sharedBy.filter((id) => id !== dinerId)
                : [...item.sharedBy, dinerId];
              onUpdateItem(item.id, { sharedBy: updatedSharedBy });
            }}
            onItemNameChange={(name) => onUpdateItem(item.id, { name })}
            onPriceChange={(price) => onUpdateItem(item.id, { price })}
          />
        ))}
      </ScrollArea>
    </Card>
  );
};

export default ItemsList;
