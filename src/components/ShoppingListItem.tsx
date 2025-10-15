import { Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";

export interface ShoppingItem {
  id: string;
  productId: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  completed: boolean;
}

interface ShoppingListItemProps {
  item: ShoppingItem;
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
}

const ShoppingListItem = ({ item, onToggle, onRemove }: ShoppingListItemProps) => {
  return (
    <div className="flex items-center gap-4 py-3 px-2 rounded-lg hover:bg-accent/50 transition-colors group">
      <Checkbox
        checked={item.completed}
        onCheckedChange={() => onToggle(item.id)}
        className="h-5 w-5"
      />
      
      <div className="flex-1 min-w-0">
        <p className={`font-medium ${item.completed ? "line-through text-muted-foreground" : "text-foreground"}`}>
          {item.name}
        </p>
        <p className="text-sm text-muted-foreground">{item.category}</p>
      </div>
      
      <div className="text-sm text-muted-foreground whitespace-nowrap">
        {item.quantity} {item.unit}
      </div>
      
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onRemove(item.id)}
        className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default ShoppingListItem;
