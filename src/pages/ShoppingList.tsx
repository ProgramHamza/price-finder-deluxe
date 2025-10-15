import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Plus, Search, Loader2, ShoppingCart } from "lucide-react";
import Header from "@/components/Header";
import ShoppingListItem, { ShoppingItem } from "@/components/ShoppingListItem";
import StoreCard from "@/components/StoreCard";
import products from "@/data/products.json";
import lidlData from "@/data/stores/lidl.json";
import tescoData from "@/data/stores/tesco.json";
import kauflandData from "@/data/stores/kaufland.json";
import billaData from "@/data/stores/billa.json";
import { toast } from "sonner";

const storeData = [lidlData, tescoData, kauflandData, billaData];

const ShoppingList = () => {
  const [shoppingList, setShoppingList] = useState<ShoppingItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedChains, setSelectedChains] = useState<string[]>(["Lidl", "Tesco", "Kaufland", "Billa"]);
  const [maxDistance, setMaxDistance] = useState([10]);
  const [isComparing, setIsComparing] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const filteredProducts = useMemo(() => {
    if (!searchQuery) return [];
    return products.filter(p =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const addItem = (product: typeof products[0]) => {
    if (shoppingList.find(item => item.productId === product.id)) {
      toast.error("Táto položka už je v zozname");
      return;
    }

    const newItem: ShoppingItem = {
      id: `${product.id}-${Date.now()}`,
      productId: product.id,
      name: product.name,
      category: product.category,
      quantity: 1,
      unit: product.unit,
      completed: false,
    };

    setShoppingList([...shoppingList, newItem]);
    setSearchQuery("");
    setShowSuggestions(false);
    toast.success(`Pridané: ${product.name}`);
  };

  const toggleItem = (id: string) => {
    setShoppingList(shoppingList.map(item =>
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const removeItem = (id: string) => {
    setShoppingList(shoppingList.filter(item => item.id !== id));
    toast.success("Položka odstránená");
  };

  const toggleChain = (chain: string) => {
    setSelectedChains(prev =>
      prev.includes(chain)
        ? prev.filter(c => c !== chain)
        : [...prev, chain]
    );
  };

  const compareProces = () => {
    if (shoppingList.length === 0) {
      toast.error("Pridajte aspoň jednu položku do zoznamu");
      return;
    }
    if (selectedChains.length === 0) {
      toast.error("Vyberte aspoň jeden obchodný reťazec");
      return;
    }

    setIsComparing(true);
    setTimeout(() => {
      setIsComparing(false);
      setShowResults(true);
      document.getElementById("results")?.scrollIntoView({ behavior: "smooth" });
    }, 1500);
  };

  const storeResults = useMemo(() => {
    if (!showResults) return [];

    const allStores = storeData
      .filter(data => selectedChains.includes(data.chain))
      .flatMap(data =>
        data.stores
          .filter(store => parseFloat(store.distance) <= maxDistance[0])
          .map(store => {
            const total = shoppingList.reduce((sum, item) => {
              const price = data.prices[item.productId as keyof typeof data.prices] || 0;
              return sum + price * item.quantity;
            }, 0);

            return {
              ...store,
              chain: data.chain,
              logo: data.logo,
              total,
            };
          })
      )
      .sort((a, b) => a.total - b.total);

    const maxPrice = Math.max(...allStores.map(s => s.total));
    return allStores.map((store, index) => ({
      ...store,
      savings: maxPrice - store.total,
      isBest: index === 0,
    }));
  }, [showResults, shoppingList, selectedChains, maxDistance]);

  const completedCount = shoppingList.filter(item => item.completed).length;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Shopping List */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Nákupný zoznam</CardTitle>
                <CardDescription>
                  Pridajte produkty, ktoré potrebujete nakúpiť
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Hľadať produkt..."
                        value={searchQuery}
                        onChange={(e) => {
                          setSearchQuery(e.target.value);
                          setShowSuggestions(true);
                        }}
                        onFocus={() => setShowSuggestions(true)}
                        className="pl-9"
                      />
                    </div>
                  </div>
                  
                  {showSuggestions && searchQuery && filteredProducts.length > 0 && (
                    <Card className="absolute top-full mt-1 w-full z-50 max-h-60 overflow-auto">
                      <CardContent className="p-2">
                        {filteredProducts.map(product => (
                          <button
                            key={product.id}
                            onClick={() => addItem(product)}
                            className="w-full text-left px-3 py-2 hover:bg-accent rounded-md transition-colors"
                          >
                            <div className="font-medium">{product.name}</div>
                            <div className="text-sm text-muted-foreground">{product.category}</div>
                          </button>
                        ))}
                      </CardContent>
                    </Card>
                  )}
                </div>

                {shoppingList.length > 0 ? (
                  <>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{completedCount}/{shoppingList.length} položiek</span>
                    </div>
                    <div className="space-y-1">
                      {shoppingList.map(item => (
                        <ShoppingListItem
                          key={item.id}
                          item={item}
                          onToggle={toggleItem}
                          onRemove={removeItem}
                        />
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    <ShoppingCart className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Váš nákupný zoznam je prázdny</p>
                    <p className="text-sm">Začnite pridávaním produktov</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Nastavenia</CardTitle>
                <CardDescription>Vyberte obchody a vzdialenosť</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label className="text-sm font-semibold">Obchodné reťazce</Label>
                  {storeData.map(data => (
                    <div key={data.chain} className="flex items-center space-x-2">
                      <Checkbox
                        id={data.chain}
                        checked={selectedChains.includes(data.chain)}
                        onCheckedChange={() => toggleChain(data.chain)}
                      />
                      <label
                        htmlFor={data.chain}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex items-center gap-2"
                      >
                        <span>{data.logo}</span>
                        <span>{data.chain}</span>
                      </label>
                    </div>
                  ))}
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <Label className="text-sm font-semibold">Maximálna vzdialenosť</Label>
                    <span className="text-sm text-muted-foreground">{maxDistance[0]} km</span>
                  </div>
                  <Slider
                    value={maxDistance}
                    onValueChange={setMaxDistance}
                    min={1}
                    max={20}
                    step={0.5}
                    className="w-full"
                  />
                </div>

                <Button
                  onClick={compareProces}
                  disabled={isComparing || shoppingList.length === 0}
                  className="w-full"
                  size="lg"
                >
                  {isComparing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Porovnávam ceny...
                    </>
                  ) : (
                    <>
                      <Search className="mr-2 h-4 w-4" />
                      Porovnať ceny
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Results */}
        {showResults && (
          <div id="results" className="mt-12">
            <Card>
              <CardHeader>
                <CardTitle>Výsledky porovnania</CardTitle>
                <CardDescription>
                  Našli sme {storeResults.length} obchodov v okolí
                </CardDescription>
              </CardHeader>
              <CardContent>
                {storeResults.length > 0 ? (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {storeResults.map(store => (
                      <StoreCard
                        key={store.id}
                        name={store.name}
                        location={store.location}
                        distance={store.distance}
                        total={store.total}
                        savings={store.savings}
                        isBest={store.isBest}
                        logo={store.logo}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    <p>Žiadne obchody nenájdené</p>
                    <p className="text-sm">Skúste zväčšiť vzdialenosť alebo pridať viac reťazcov</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
};

export default ShoppingList;
