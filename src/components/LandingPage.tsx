import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full p-8 space-y-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight">
          Split bills effortlessly
        </h1>
        <p className="text-xl text-muted-foreground">
          Calculate shared expenses, tax, and tip with precision. Perfect for
          group dining and shared costs.
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="p-6 text-left space-y-2">
            <h3 className="font-semibold">Smart Splitting</h3>
            <p className="text-sm text-muted-foreground">
              Automatically calculate individual shares based on items selected
            </p>
          </Card>
          <Card className="p-6 text-left space-y-2">
            <h3 className="font-semibold">Custom Tax & Tip</h3>
            <p className="text-sm text-muted-foreground">
              Flexible tax and tip calculations with custom input options
            </p>
          </Card>
        </div>
        <Button asChild size="lg" className="w-full sm:w-auto">
          <Link to="/calculator">
            Get Started <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </Card>
    </div>
  );
};

export default LandingPage;
