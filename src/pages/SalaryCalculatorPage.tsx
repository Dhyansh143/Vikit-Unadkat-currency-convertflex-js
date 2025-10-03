import { SalaryCalculator } from "@/components/SalaryCalculator";
import { Calculator, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogoutButton } from "@/components/LogoutButton";
import { UserStats } from "@/components/UserStats";

const SalaryCalculatorPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        {/* Navigation */}
        <div className="flex justify-between items-center mb-8">
          <Link to="/">
            <Button variant="ghost">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          <LogoutButton />
        </div>

        {/* Header */}
        <header className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-secondary mb-6 shadow-glow">
            <Calculator className="h-10 w-10 text-secondary-foreground" />
          </div>
          <h1 className="text-6xl font-black mb-4 text-primary font-heading">
            Merchant Navy Salary Calculator
          </h1>
          <p className="text-xl text-foreground font-medium max-w-3xl mx-auto">
            Calculate your average monthly net salary in INR based on sailing periods over the last 3 years
          </p>
        </header>

        {/* Calculator */}
        <main className="max-w-5xl mx-auto">
          <SalaryCalculator />
        </main>

        {/* Footer */}
        <footer className="mt-20 text-center pb-8 border-t-2 border-primary/10 pt-8 space-y-4">
          <UserStats />
          <p className="text-base text-primary font-bold">
            Created by <span className="text-secondary">Vikit Unadkat</span>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default SalaryCalculatorPage;
