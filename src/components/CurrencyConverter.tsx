import { useState, useEffect } from "react";
import { ArrowDownUp, TrendingUp, RefreshCw } from "lucide-react";
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
    <div className="w-full max-w-2xl mx-auto animate-slide-up">
      <Card className="p-8 shadow-elegant backdrop-blur-sm bg-card/95 border-border/50">
        <div className="space-y-6">
          {/* From Currency Section */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-muted-foreground">
              From
            </label>
            <div className="flex gap-4">
              <Select value={fromCurrency} onValueChange={setFromCurrency}>
                <SelectTrigger className="w-[180px] bg-background border-border">
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
              <Input
                type="text"
                value={amount}
                onChange={(e) => handleAmountChange(e.target.value)}
                className="flex-1 text-2xl font-semibold bg-background border-border"
                placeholder="0.00"
              />
            </div>
          </div>

          {/* Swap Button */}
          <div className="flex justify-center">
            <Button
              onClick={handleSwapCurrencies}
              variant="outline"
              size="icon"
              className="rounded-full w-12 h-12 bg-gradient-primary text-primary-foreground hover:shadow-glow transition-all duration-300 border-0"
            >
              <ArrowDownUp className="h-5 w-5" />
            </Button>
          </div>

          {/* To Currency Section */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-muted-foreground">
              To
            </label>
            <div className="flex gap-4">
              <Select value={toCurrency} onValueChange={setToCurrency}>
                <SelectTrigger className="w-[180px] bg-background border-border">
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
              <div className="flex-1 px-4 py-3 rounded-lg bg-gradient-primary text-primary-foreground text-2xl font-semibold flex items-center">
                {isLoading ? (
                  <span className="animate-pulse-glow">Loading...</span>
                ) : (
                  formatCurrency(convertedAmount, toCurrency)
                )}
              </div>
            </div>
          </div>

          {/* Exchange Rate Info */}
          <div className="pt-6 border-t border-border">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <TrendingUp className="h-4 w-4" />
                <span>
                  1 {fromCurrency} = {formatCurrency(getExchangeRate(), toCurrency)} {toCurrency}
                </span>
              </div>
              <Button
                onClick={fetchExchangeRates}
                variant="ghost"
                size="sm"
                disabled={isLoading}
                className="text-muted-foreground hover:text-foreground"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
                {lastUpdated ? `Updated ${lastUpdated}` : "Refresh"}
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Info Card */}
      <Card className="mt-4 p-4 bg-muted/50 border-border/50">
        <p className="text-sm text-muted-foreground text-center">
          Exchange rates are updated in real-time using live market data
        </p>
      </Card>
    </div>
  );
};
