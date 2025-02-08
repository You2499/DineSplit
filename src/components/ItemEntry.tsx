import React from "react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Avatar } from "./ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { X } from "lucide-react";

interface Diner {
  id: string;
  name: string;
  selected: boolean;
}

interface ItemEntryProps {
  itemName?: string;
  price?: number;
  diners?: Diner[];
  onDelete?: () => void;
  onDinerToggle?: (dinerId: string) => void;
  onItemNameChange?: (name: string) => void;
  onPriceChange?: (price: number) => void;
}

const ItemEntry = ({
  itemName = "",
  price = 0,
  diners = [
    { id: "1", name: "Person 1", selected: true },
    { id: "2", name: "Person 2", selected: false },
    { id: "3", name: "Person 3", selected: true },
  ],
  onDelete = () => {},
  onDinerToggle = () => {},
  onItemNameChange = () => {},
  onPriceChange = () => {},
}: ItemEntryProps) => {
  return (
    <Card className="p-3 sm:p-4 mb-4">
      <div className="flex items-center gap-2 sm:gap-4">
        <div className="flex-1">
          <Input
            placeholder="Item name"
            value={itemName}
            onChange={(e) => onItemNameChange(e.target.value)}
            className="mb-2"
          />
        </div>
        <div className="w-32">
          <Input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => onPriceChange(Number(e.target.value))}
            className="mb-2"
          />
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onDelete}
          className="h-10 w-10"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex gap-2 mt-2 overflow-x-auto pb-2 max-w-full scrollbar-thin scrollbar-thumb-primary/10 scrollbar-track-transparent">
        <TooltipProvider>
          {diners.map((diner) => (
            <Tooltip key={diner.id}>
              <TooltipTrigger>
                <Avatar
                  className={`cursor-pointer transition-opacity hover:opacity-80 ${
                    diner.selected ? "opacity-100" : "opacity-40"
                  }`}
                  onClick={() => onDinerToggle(diner.id)}
                >
                  <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                    {diner.name[0]}
                  </div>
                </Avatar>
              </TooltipTrigger>
              <TooltipContent>
                <p>{diner.name}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </div>
    </Card>
  );
};

export default ItemEntry;
