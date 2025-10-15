import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCart, TrendingDown, Clock, MapPin } from "lucide-react";
import Header from "@/components/Header";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/20">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="container mx-auto px-4 pt-20 pb-16 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="text-6xl mb-6 animate-bounce">🍐</div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-success bg-clip-text text-transparent">
              Vaša kuchyňa, dokonale organizovaná
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Vytvorte si nákupný zoznam a porovnajte ceny v obchodoch vo vašom okolí. 
              Ušetrite čas aj peniaze s inteligentným nákupným asistentom.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button size="lg" asChild className="text-lg px-8">
                <Link to="/shopping-list">Začať nakupovať</Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8">
                Zistiť viac
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center mb-12">Prečo Pear?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-2 hover:border-primary transition-colors">
              <CardHeader>
                <ShoppingCart className="h-12 w-12 mb-4 text-primary" />
                <CardTitle>Inteligentný zoznam</CardTitle>
                <CardDescription>
                  Vytvorte si nákupný zoznam s automatickými návrhmi a kategorizáciou produktov
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-primary transition-colors">
              <CardHeader>
                <TrendingDown className="h-12 w-12 mb-4 text-primary" />
                <CardTitle>Porovnanie cien</CardTitle>
                <CardDescription>
                  Porovnajte ceny vo všetkých obchodoch a zistite, kde nakúpite najlacnejšie
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-primary transition-colors">
              <CardHeader>
                <MapPin className="h-12 w-12 mb-4 text-primary" />
                <CardTitle>Obchody v okolí</CardTitle>
                <CardDescription>
                  Nájdite najbližšie obchody a zoraďte ich podľa vzdialenosti od vášho bydliska
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-primary transition-colors">
              <CardHeader>
                <Clock className="h-12 w-12 mb-4 text-primary" />
                <CardTitle>Úspora času</CardTitle>
                <CardDescription>
                  Ušetrite čas plánovaním nákupov a optimalizáciou ciest do obchodov
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-primary/5 py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-primary mb-2">4+</div>
                <div className="text-muted-foreground">Obchodné reťazce</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">35+</div>
                <div className="text-muted-foreground">Produktov v databáze</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">15+</div>
                <div className="text-muted-foreground">Obchodov v Bratislave</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-20 text-center">
          <Card className="max-w-2xl mx-auto border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-success/5">
            <CardHeader>
              <CardTitle className="text-3xl mb-4">Pripravení začať šetriť?</CardTitle>
              <CardDescription className="text-lg">
                Vytvorte si svoj prvý nákupný zoznam a zistite, koľko môžete ušetriť
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button size="lg" asChild className="text-lg px-8">
                <Link to="/shopping-list">Vytvoriť nákupný zoznam</Link>
              </Button>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="border-t py-8 mt-20">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2025 Pear. Všetky práva vyhradené.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
