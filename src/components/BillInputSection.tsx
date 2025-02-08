import React from "react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Slider } from "./ui/slider";
import { Button } from "./ui/button";
import { Plus, Minus } from "lucide-react";

interface BillInputSectionProps {
  billTotal?: number;
  taxPercentage?: number;
  tipPercentage?: number;
  numberOfDiners?: number;
  onBillTotalChange?: (value: number) => void;
  onTaxPercentageChange?: (value: number) => void;
  onTipPercentageChange?: (value: number) => void;
  onNumberOfDinersChange?: () => void;
  onRemoveDiner?: () => void;
}

const BillInputSection = ({
  billTotal = 0,
  taxPercentage = 10,
  tipPercentage = 15,
  numberOfDiners = 0,
  onBillTotalChange = () => {},
  onTaxPercentageChange = () => {},
  onTipPercentageChange = () => {},
  onNumberOfDinersChange = () => {},
  onRemoveDiner = () => {},
}: BillInputSectionProps) => {
  return (
    <Card className="p-4 sm:p-6">
      <div className="space-y-6">
        {/* Bill Total Input */}
        <div className="space-y-2">
          <Label htmlFor="billTotal">Bill Total</Label>
          <div className="relative">
            <span className="absolute left-3 top-2.5">$</span>
            <Input
              id="billTotal"
              type="number"
              value={billTotal}
              onChange={(e) => onBillTotalChange(Number(e.target.value))}
              className="pl-7"
              placeholder="0.00"
            />
          </div>
        </div>

        {/* Tax Input */}
        <div className="space-y-2">
          <Label htmlFor="tax">Tax Amount</Label>
          <div className="relative">
            <span className="absolute left-3 top-2.5">$</span>
            <Input
              id="tax"
              type="number"
              value={taxPercentage}
              onChange={(e) => onTaxPercentageChange(Number(e.target.value))}
              className="pl-7"
              placeholder="0.00"
            />
          </div>
        </div>

        {/* Tip Input */}
        <div className="space-y-2">
          <Label htmlFor="tip">Tip Amount</Label>
          <div className="relative">
            <span className="absolute left-3 top-2.5">$</span>
            <Input
              id="tip"
              type="number"
              value={tipPercentage}
              onChange={(e) => onTipPercentageChange(Number(e.target.value))}
              className="pl-7"
              placeholder="0.00"
            />
          </div>
        </div>

        {/* Number of Diners Input */}
        <div className="space-y-2">
          <Label>Number of Diners</Label>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="icon" onClick={onRemoveDiner}>
              <Minus className="h-4 w-4" />
            </Button>
            <span className="text-xl font-medium w-8 text-center">
              {numberOfDiners}
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => onNumberOfDinersChange(numberOfDiners + 1)}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Summary */}
        <div className="pt-4 border-t">
          <div className="flex justify-between text-sm">
            <span>Subtotal:</span>
            <span>${billTotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm mt-1">
            <span>Tax ({taxPercentage}%):</span>
            <span>${((billTotal * taxPercentage) / 100).toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm mt-1">
            <span>Tip ({tipPercentage}%):</span>
            <span>${((billTotal * tipPercentage) / 100).toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-medium mt-2 pt-2 border-t">
            <span>Total:</span>
            <span>
              $
              {(
                billTotal +
                (billTotal * taxPercentage) / 100 +
                (billTotal * tipPercentage) / 100
              ).toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default BillInputSection;
