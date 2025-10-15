import { MapPin, Star } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

interface StoreCardProps {
  name: string;
  location: string;
  distance: string;
  total: number;
  savings?: number;
  isBest?: boolean;
  logo: string;
}

const StoreCard = ({ name, location, distance, total, savings, isBest, logo }: StoreCardProps) => {
  return (
    <Card className={`relative overflow-hidden transition-all hover:shadow-lg ${isBest ? "border-primary border-2" : ""}`}>
      {isBest && (
        <Badge className="absolute top-3 right-3 bg-primary">
          <Star className="h-3 w-3 mr-1 fill-current" />
          Najlacnejšie
        </Badge>
      )}
      
      <CardHeader className="pb-3">
        <div className="flex items-start gap-3">
          <div className="text-4xl">{logo}</div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg">{name}</h3>
            <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
              <MapPin className="h-3 w-3" />
              <span>{distance}</span>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pb-3">
        <p className="text-xs text-muted-foreground mb-3">{location}</p>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-primary">€{total.toFixed(2)}</span>
          {savings && savings > 0 && (
            <span className="text-sm text-success font-medium">
              Úspora €{savings.toFixed(2)}
            </span>
          )}
        </div>
      </CardContent>
      
      <CardFooter>
        <Button className="w-full" variant={isBest ? "default" : "outline"}>
          Vybrať obchod
        </Button>
      </CardFooter>
    </Card>
  );
};

export default StoreCard;
