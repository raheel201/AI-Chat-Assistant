import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { TrendingUp, TrendingDown, DollarSign, Calendar, ArrowUp, ArrowDown } from "lucide-react";

interface StockData {
  symbol: string;
  price: number;
  change: number;
  changePercent: string;
  timestamp: string;
}

export default function PriceCard({ data }: { data: StockData }) {
  const isPositive = data.change >= 0;
  const changeColor = isPositive ? "from-emerald-500 to-emerald-600" : "from-red-500 to-red-600";
  const badgeColor = isPositive ? "bg-emerald-100 text-emerald-800 border-emerald-200" : "bg-red-100 text-red-800 border-red-200";
  const trendIcon = isPositive ? <TrendingUp className="h-5 w-5" /> : <TrendingDown className="h-5 w-5" />;
  const arrowIcon = isPositive ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />;

  const formattedPrice = data.price.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const formattedChange = data.change.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <Card className="w-full max-w-sm border-0 shadow-xl overflow-hidden">
      <CardHeader className="p-6 pb-4 bg-gradient-to-r from-slate-50 to-slate-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <DollarSign className="h-7 w-7 text-slate-600" />
            <CardTitle className="text-xl font-black tracking-wide">
              {data.symbol}
            </CardTitle>
          </div>
          <Badge 
            className={`font-bold px-3 py-1 ${badgeColor}`}
            variant="secondary"
          >
            {arrowIcon}
            <span className="font-mono">{data.changePercent}</span>
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-6 space-y-6">
        {/* Price */}
        <div className="text-center space-y-2">
          <div className="text-4xl lg:text-5xl font-black bg-gradient-to-r bg-clip-text text-transparent bg-gradient-to-r from-foreground to-muted-foreground">
            ${formattedPrice}
          </div>
          <div className={`flex items-center justify-center gap-1 text-lg font-bold ${isPositive ? 'text-emerald-600' : 'text-red-600'}`}>
            {trendIcon}
            {isPositive ? '+' : ''}${formattedChange}
          </div>
        </div>

        {/* Last Updated */}
        <div className="flex items-center justify-center gap-2 p-3 bg-muted/50 rounded-lg">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground font-mono">
            {new Date(data.timestamp).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
