import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";

const Header = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-2xl text-primary hover:opacity-80 transition-opacity">
          <span className="text-3xl">🍐</span>
          <span>Pear</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8">
          <Link
            to="/"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive("/") ? "text-primary" : "text-muted-foreground"
            }`}
          >
            Domov
          </Link>
          <Link
            to="/shopping-list"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive("/shopping-list") ? "text-primary" : "text-muted-foreground"
            }`}
          >
            Nákupný zoznam
          </Link>
        </nav>
        
        <Button variant="default" size="sm" asChild>
          <Link to="/shopping-list">Začať</Link>
        </Button>
      </div>
    </header>
  );
};

export default Header;
