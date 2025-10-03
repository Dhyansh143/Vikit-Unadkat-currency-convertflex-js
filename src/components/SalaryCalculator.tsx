import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format, differenceInDays } from "date-fns";
import { CalendarIcon, Plus, Trash2, Ship, DollarSign, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface SailingPeriod {
  id: string;
  fromDate: Date | undefined;
  toDate: Date | undefined;
  days: number;
}

export const SalaryCalculator = () => {
  const { toast } = useToast();
  const [periods, setPeriods] = useState<SailingPeriod[]>([
    { id: crypto.randomUUID(), fromDate: undefined, toDate: undefined, days: 0 }
  ]);
  const [monthlySalary, setMonthlySalary] = useState<string>("");
  const [exchangeRate, setExchangeRate] = useState<string>("");

  const addPeriod = () => {
    setPeriods([...periods, { id: crypto.randomUUID(), fromDate: undefined, toDate: undefined, days: 0 }]);
  };

  const removePeriod = (id: string) => {
    if (periods.length > 1) {
      setPeriods(periods.filter(p => p.id !== id));
    }
  };

  const updatePeriod = (id: string, field: 'fromDate' | 'toDate', value: Date | undefined) => {
    setPeriods(periods.map(p => {
      if (p.id === id) {
        const updated = { ...p, [field]: value };
        
        // Validate and calculate days
        if (updated.fromDate && updated.toDate) {
          if (updated.toDate < updated.fromDate) {
            toast({
              title: "Invalid Date Range",
              description: "End date must be after start date",
              variant: "destructive"
            });
            return p;
          }
          updated.days = differenceInDays(updated.toDate, updated.fromDate) + 1;
        } else {
          updated.days = 0;
        }
        
        return updated;
      }
      return p;
    }));
  };

  // Calculations
  const totalSailingDays = periods.reduce((sum, p) => sum + p.days, 0);
  const averageSailingDaysPerYear = totalSailingDays / 3;
  const averageSailingMonths = averageSailingDaysPerYear / 30;
  
  const monthlySalaryINR = Number(monthlySalary) * Number(exchangeRate);
  const averageMonthlySalaryINR = (monthlySalaryINR * averageSailingMonths) / 12;

  const isCalculationValid = monthlySalary && exchangeRate && totalSailingDays > 0;

  return (
    <div className="space-y-8">
      {/* Sailing Periods Section */}
      <Card className="border-2 border-primary/20 shadow-elegant">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-secondary flex items-center justify-center shadow-lg">
              <Ship className="h-6 w-6 text-secondary-foreground" />
            </div>
            <div>
              <CardTitle className="text-2xl text-primary">Sailing Periods</CardTitle>
              <CardDescription className="text-base">Enter your sailing periods over the last 3 years</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {periods.map((period, index) => (
            <div key={period.id} className="p-6 rounded-xl bg-card border-2 border-primary/10 space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-bold text-lg text-primary">Period {index + 1}</h4>
                {periods.length > 1 && (
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => removePeriod(period.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-base font-semibold text-foreground">From Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal border-2 border-primary/20 hover:border-primary/40",
                          !period.fromDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {period.fromDate ? format(period.fromDate, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={period.fromDate}
                        onSelect={(date) => updatePeriod(period.id, 'fromDate', date)}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label className="text-base font-semibold text-foreground">To Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal border-2 border-primary/20 hover:border-primary/40",
                          !period.toDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {period.toDate ? format(period.toDate, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={period.toDate}
                        onSelect={(date) => updatePeriod(period.id, 'toDate', date)}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              {period.days > 0 && (
                <div className="p-4 bg-gradient-secondary/10 rounded-lg border-2 border-secondary/20">
                  <p className="text-lg font-bold text-secondary">
                    Sailing Days: {period.days}
                  </p>
                </div>
              )}
            </div>
          ))}

          <Button
            onClick={addPeriod}
            variant="secondary"
            size="lg"
            className="w-full"
          >
            <Plus className="mr-2 h-5 w-5" />
            Add More Period
          </Button>
        </CardContent>
      </Card>

      {/* Salary Section */}
      <Card className="border-2 border-primary/20 shadow-elegant">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-secondary flex items-center justify-center shadow-lg">
              <DollarSign className="h-6 w-6 text-secondary-foreground" />
            </div>
            <div>
              <CardTitle className="text-2xl text-primary">Salary Information</CardTitle>
              <CardDescription className="text-base">Enter your monthly salary and exchange rate</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="salary" className="text-base font-semibold text-foreground">
              Current Monthly Net Salary (Foreign Currency)
            </Label>
            <Input
              id="salary"
              type="number"
              placeholder="Enter amount"
              value={monthlySalary}
              onChange={(e) => setMonthlySalary(e.target.value)}
              className="text-lg border-2 border-primary/20 focus:border-primary/40"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="exchange" className="text-base font-semibold text-foreground">
              Exchange Rate to INR
            </Label>
            <Input
              id="exchange"
              type="number"
              placeholder="Enter exchange rate"
              value={exchangeRate}
              onChange={(e) => setExchangeRate(e.target.value)}
              className="text-lg border-2 border-primary/20 focus:border-primary/40"
            />
          </div>
        </CardContent>
      </Card>

      {/* Results Section */}
      {isCalculationValid && (
        <Card className="border-2 border-secondary/30 shadow-glow bg-gradient-to-br from-card to-secondary/5">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-secondary flex items-center justify-center shadow-lg">
                <TrendingUp className="h-6 w-6 text-secondary-foreground" />
              </div>
              <div>
                <CardTitle className="text-2xl text-primary">Calculation Results</CardTitle>
                <CardDescription className="text-base">Your average monthly net salary breakdown</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-card rounded-xl border-2 border-primary/20 shadow-lg">
                <p className="text-sm text-muted-foreground mb-2">Total Sailing Days (3 years)</p>
                <p className="text-3xl font-black text-primary">{totalSailingDays}</p>
              </div>

              <div className="p-6 bg-card rounded-xl border-2 border-primary/20 shadow-lg">
                <p className="text-sm text-muted-foreground mb-2">Average Sailing Months (per year)</p>
                <p className="text-3xl font-black text-primary">{averageSailingMonths.toFixed(2)}</p>
              </div>

              <div className="p-6 bg-card rounded-xl border-2 border-secondary/20 shadow-lg">
                <p className="text-sm text-muted-foreground mb-2">Monthly Net Salary (INR)</p>
                <p className="text-3xl font-black text-secondary">₹{monthlySalaryINR.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
              </div>

              <div className="p-6 bg-gradient-secondary rounded-xl border-2 border-secondary shadow-glow">
                <p className="text-sm text-secondary-foreground/80 mb-2">Average Monthly Net Salary (INR)</p>
                <p className="text-3xl font-black text-secondary-foreground">₹{averageMonthlySalaryINR.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
              </div>
            </div>

            <div className="p-6 bg-primary/5 rounded-xl border-2 border-primary/20">
              <p className="text-sm font-semibold text-primary mb-2">📋 Important Note:</p>
              <p className="text-base text-foreground">
                This calculated average monthly income can be used under <strong>"Other Income"</strong> for income clubbing purposes in your tax filing.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
