import { useState, useEffect } from "react";
import { ArrowDownUp, TrendingUp, RefreshCw, DollarSign, Building2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface ExchangeRates {
  [key: string]: number;
}

const POPULAR_CURRENCIES = [
  { code: "USD", name: "US Dollar", symbol: "$" },
  { code: "EUR", name: "Euro", symbol: "€" },
  { code: "GBP", name: "British Pound", symbol: "£" },
  { code: "JPY", name: "Japanese Yen", symbol: "¥" },
  { code: "AUD", name: "Australian Dollar", symbol: "A$" },
  { code: "CAD", name: "Canadian Dollar", symbol: "C$" },
  { code: "CHF", name: "Swiss Franc", symbol: "Fr" },
  { code: "CNY", name: "Chinese Yuan", symbol: "¥" },
  { code: "INR", name: "Indian Rupee", symbol: "₹" },
  { code: "MXN", name: "Mexican Peso", symbol: "$" },
];

export const CurrencyConverter = () => {
  const [amount, setAmount] = useState<string>("1");
  const [fromCurrency, setFromCurrency] = useState<string>("USD");
  const [toCurrency, setToCurrency] = useState<string>("EUR");
  const [exchangeRates, setExchangeRates] = useState<ExchangeRates>({});
  const [convertedAmount, setConvertedAmount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [lastUpdated, setLastUpdated] = useState<string>("");
  const { toast } = useToast();

  const fetchExchangeRates = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`
      );
      const data = await response.json();
      setExchangeRates(data.rates);
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch exchange rates. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchExchangeRates();
  }, [fromCurrency]);

  useEffect(() => {
    if (exchangeRates[toCurrency] && amount) {
      const numAmount = parseFloat(amount);
      if (!isNaN(numAmount)) {
        setConvertedAmount(numAmount * exchangeRates[toCurrency]);
      }
    }
  }, [amount, toCurrency, exchangeRates]);

  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const handleAmountChange = (value: string) => {
    // Allow empty string, numbers, and decimal point
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setAmount(value);
    }
  };

  const formatCurrency = (value: number, currencyCode: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "decimal",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const getExchangeRate = () => {
    if (exchangeRates[toCurrency]) {
      return exchangeRates[toCurrency];
    }
    return 0;
  };

  return (
    <div className="w-full max-w-3xl mx-auto animate-slide-up">
      <Card className="p-8 shadow-elegant backdrop-blur-sm bg-card border-2 border-primary/10">
        <div className="space-y-6">
          {/* From Currency Section */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-primary flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              From
            </label>
            <div className="flex gap-4">
              <Select value={fromCurrency} onValueChange={setFromCurrency}>
                <SelectTrigger className="w-[200px] bg-background border-2 border-primary/20 font-medium">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {POPULAR_CURRENCIES.map((currency) => (
                    <SelectItem key={currency.code} value={currency.code}>
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{currency.symbol}</span>
                        <span>{currency.code}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex-1 relative">
                <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-muted-foreground" />
                <Input
                  type="text"
                  value={amount}
                  onChange={(e) => handleAmountChange(e.target.value)}
                  className="flex-1 text-2xl font-bold bg-background border-2 border-primary/20 pl-12"
                  placeholder="0.00"
                />
              </div>
            </div>
          </div>

          {/* Swap Button */}
          <div className="flex justify-center">
            <Button
              onClick={handleSwapCurrencies}
              variant="outline"
              size="icon"
              className="rounded-full w-14 h-14 bg-gradient-secondary text-secondary-foreground hover:shadow-glow transition-all duration-300 border-0 hover:scale-110"
            >
              <ArrowDownUp className="h-6 w-6" />
            </Button>
          </div>

          {/* To Currency Section */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-primary flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              To
            </label>
            <div className="flex gap-4">
              <Select value={toCurrency} onValueChange={setToCurrency}>
                <SelectTrigger className="w-[200px] bg-background border-2 border-primary/20 font-medium">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {POPULAR_CURRENCIES.map((currency) => (
                    <SelectItem key={currency.code} value={currency.code}>
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{currency.symbol}</span>
                        <span>{currency.code}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex-1 px-6 py-4 rounded-lg bg-gradient-secondary text-secondary-foreground text-3xl font-bold flex items-center justify-center shadow-glow">
                {isLoading ? (
                  <span className="animate-pulse-glow">Loading...</span>
                ) : (
                  formatCurrency(convertedAmount, toCurrency)
                )}
              </div>
            </div>
          </div>

          {/* Exchange Rate Info */}
          <div className="pt-6 border-t-2 border-primary/10">
            <div className="flex items-center justify-between text-sm flex-wrap gap-4">
              <div className="flex items-center gap-2 text-primary font-semibold">
                <TrendingUp className="h-5 w-5 text-secondary" />
                <span>
                  1 {fromCurrency} = {formatCurrency(getExchangeRate(), toCurrency)} {toCurrency}
                </span>
              </div>
              <Button
                onClick={fetchExchangeRates}
                variant="outline"
                size="sm"
                disabled={isLoading}
                className="text-primary border-primary/30 hover:bg-primary hover:text-primary-foreground font-medium"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
                {lastUpdated ? `Updated ${lastUpdated}` : "Refresh"}
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Info Card */}
      <Card className="mt-6 p-5 bg-primary/5 border-2 border-primary/20">
        <p className="text-sm text-primary font-medium text-center flex items-center justify-center gap-2">
          <TrendingUp className="h-4 w-4 text-secondary" />
          Exchange rates are updated in real-time using live market data
        </p>
      </Card>
    </div>
  );
};
