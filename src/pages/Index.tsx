import { CurrencyConverter } from "@/components/CurrencyConverter";
import { Briefcase, Globe, Shield, Zap, Calculator } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogoutButton } from "@/components/LogoutButton";
import { UserStats } from "@/components/UserStats";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        {/* Logout Button */}
        <div className="flex justify-end mb-4">
          <LogoutButton />
        </div>
        
        {/* Header */}
        <header className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-secondary mb-6 shadow-glow">
            <Briefcase className="h-10 w-10 text-secondary-foreground" />
          </div>
          <h1 className="text-6xl font-black mb-4 text-primary font-heading">
            Currency Converter
          </h1>
          <p className="text-xl text-foreground font-medium max-w-3xl mx-auto">
            Professional Currency Exchange Solutions for Global Business
          </p>
        </header>

        {/* Main Converter */}
        <main>
          <CurrencyConverter />
          
          {/* Salary Calculator Link */}
          <div className="mt-12 text-center">
            <Link to="/salary-calculator">
              <Button size="lg" className="gap-2 text-lg px-8 py-6 shadow-glow hover:shadow-xl transition-all">
                <Calculator className="h-6 w-6" />
                Merchant Navy Salary Calculator
              </Button>
            </Link>
          </div>
        </main>

        {/* Features */}
        <section className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="text-center p-8 rounded-2xl bg-card border-2 border-primary/20 shadow-elegant animate-slide-up hover:shadow-glow transition-all duration-300" style={{ animationDelay: "0.1s" }}>
            <div className="w-16 h-16 rounded-full bg-gradient-secondary flex items-center justify-center mx-auto mb-5 shadow-lg">
              <Zap className="h-8 w-8 text-secondary-foreground" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-primary">Real-Time Rates</h3>
            <p className="text-base text-foreground font-medium">
              Live exchange rates updated continuously from global financial markets
            </p>
          </div>
          
          <div className="text-center p-8 rounded-2xl bg-card border-2 border-primary/20 shadow-elegant animate-slide-up hover:shadow-glow transition-all duration-300" style={{ animationDelay: "0.2s" }}>
            <div className="w-16 h-16 rounded-full bg-gradient-secondary flex items-center justify-center mx-auto mb-5 shadow-lg">
              <Globe className="h-8 w-8 text-secondary-foreground" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-primary">150+ Currencies</h3>
            <p className="text-base text-foreground font-medium">
              Complete support for all major world currencies and international exchange
            </p>
          </div>
          
          <div className="text-center p-8 rounded-2xl bg-card border-2 border-primary/20 shadow-elegant animate-slide-up hover:shadow-glow transition-all duration-300" style={{ animationDelay: "0.3s" }}>
            <div className="w-16 h-16 rounded-full bg-gradient-secondary flex items-center justify-center mx-auto mb-5 shadow-lg">
              <Shield className="h-8 w-8 text-secondary-foreground" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-primary">Fast & Secure</h3>
            <p className="text-base text-foreground font-medium">
              Enterprise-grade security with instant conversion calculations
            </p>
          </div>
        </section>

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

export default Index;
