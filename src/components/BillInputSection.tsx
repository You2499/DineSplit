import React from "react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Slider } from "./ui/slider";
import { Button } from "./ui/button";
import { Plus, Minus } from "lucide-react";

interface BillInputSectionProps {
  billTotal?: number;
  taxAmount?: number;
  tipAmount?: number;
  numberOfDiners?: number;
  onBillTotalChange?: (value: number) => void;
  onTaxAmountChange?: (value: number) => void;
  onTipAmountChange?: (value: number) => void;
  onNumberOfDinersChange?: () => void;
  onRemoveDiner?: () => void;
}

const BillInputSection = ({
  billTotal,
  taxAmount,
  tipAmount,
  numberOfDiners = 0,
  onBillTotalChange = () => {},
  onTaxAmountChange = () => {},
  onTipAmountChange = () => {},
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
              placeholder="Enter bill amount"
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
              value={taxAmount}
              onChange={(e) => onTaxAmountChange(Number(e.target.value))}
              className="pl-7"
              placeholder="Enter tax amount"
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
              value={tipAmount}
              onChange={(e) => onTipAmountChange(Number(e.target.value))}
              className="pl-7"
              placeholder="Enter tip amount"
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
            <span>${(billTotal || 0).toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm mt-1">
            <span>Tax:</span>
            <span>${(taxAmount || 0).toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm mt-1">
            <span>Tip:</span>
            <span>${(tipAmount || 0).toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-medium mt-2 pt-2 border-t">
            <span>Total:</span>
            <span>
              $
              {((billTotal || 0) + (taxAmount || 0) + (tipAmount || 0)).toFixed(
                2,
              )}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default BillInputSection;
