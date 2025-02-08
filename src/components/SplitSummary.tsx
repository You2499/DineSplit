import React from "react";
import { Card } from "./ui/card";
import { Separator } from "./ui/separator";

interface PersonItem {
  name: string;
  price: number;
  sharedCount: number;
}

interface Person {
  name: string;
  items: PersonItem[];
  itemsTotal: number;
  taxShare: number;
  tipShare: number;
  total: number;
}

interface SplitSummaryProps {
  subtotal?: number;
  tax?: number;
  tip?: number;
  total?: number;
  people?: Person[];
  onUpdateName?: (index: number, newName: string) => void;
}

const SplitSummary = ({
  subtotal = 120.0,
  tax = 10.8,
  tip = 24.0,
  total = 154.8,
  people = [
    {
      name: "Person 1",
      items: [
        { name: "Pizza", price: 20, sharedCount: 2 },
        { name: "Drinks", price: 15, sharedCount: 3 },
      ],
      itemsTotal: 40.0,
      taxShare: 3.6,
      tipShare: 8.0,
      total: 51.6,
    },
    {
      name: "Person 2",
      items: [
        { name: "Pizza", price: 20, sharedCount: 2 },
        { name: "Salad", price: 12, sharedCount: 2 },
      ],
      itemsTotal: 35.0,
      taxShare: 3.15,
      tipShare: 7.0,
      total: 45.15,
    },
    {
      name: "Person 3",
      items: [
        { name: "Salad", price: 12, sharedCount: 2 },
        { name: "Drinks", price: 15, sharedCount: 3 },
      ],
      itemsTotal: 45.0,
      taxShare: 4.05,
      tipShare: 9.0,
      total: 58.05,
    },
  ],
}: SplitSummaryProps) => {
  return (
    <Card className="p-4 sm:p-6">
      <div className="space-y-6">
        {/* Bill Summary */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Bill Summary</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tip</span>
              <span>${tip.toFixed(2)}</span>
            </div>
            <Separator className="my-2" />
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Per Person Breakdown */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Per Person Breakdown</h3>
          <div className="space-y-4">
            {people.map((person, index) => (
              <Card key={index} className="p-4 bg-muted/50">
                <div className="space-y-2">
                  <div className="flex justify-between font-medium">
                    <input
                      type="text"
                      value={person.name}
                      onChange={(e) => onUpdateName?.(index, e.target.value)}
                      className="bg-transparent border-none p-0 focus:outline-none font-medium"
                    />
                    <span>${person.total.toFixed(2)}</span>
                  </div>
                  <div className="text-sm space-y-1">
                    {person.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex justify-between text-muted-foreground"
                      >
                        <span>{item.name}</span>
                        <span>
                          ${(item.price / item.sharedCount).toFixed(2)}
                        </span>
                      </div>
                    ))}
                    <div className="flex justify-between text-muted-foreground">
                      <span>Tax</span>
                      <span>${person.taxShare.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Tip</span>
                      <span>${person.tipShare.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default SplitSummary;
