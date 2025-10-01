import { CurrencyConverter } from "@/components/CurrencyConverter";
import { Coins } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <header className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-primary mb-4 shadow-glow">
            <Coins className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="text-5xl font-bold mb-3 bg-gradient-primary bg-clip-text text-transparent">
            Currency Converter
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Convert between 150+ currencies with live exchange rates
          </p>
        </header>

        {/* Main Converter */}
        <main>
          <CurrencyConverter />
        </main>

        {/* Features */}
        <section className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="text-center p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 animate-slide-up" style={{ animationDelay: "0.1s" }}>
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">⚡</span>
            </div>
            <h3 className="font-semibold mb-2 text-foreground">Real-Time Rates</h3>
            <p className="text-sm text-muted-foreground">
              Live exchange rates updated continuously from global markets
            </p>
          </div>
          
          <div className="text-center p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🌍</span>
            </div>
            <h3 className="font-semibold mb-2 text-foreground">150+ Currencies</h3>
            <p className="text-sm text-muted-foreground">
              Support for all major world currencies and popular crypto assets
            </p>
          </div>
          
          <div className="text-center p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 animate-slide-up" style={{ animationDelay: "0.3s" }}>
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🔒</span>
            </div>
            <h3 className="font-semibold mb-2 text-foreground">Fast & Secure</h3>
            <p className="text-sm text-muted-foreground">
              Instant conversions with enterprise-grade security standards
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Index;
