    console.log('Pear app is ready!');

    // --- Vzorové dáta (Mock Data) ---

    const mockRecipes = [
        {
            id: 1,
            title: "Kuracie Curry",
            image: "https://via.placeholder.com/300x200.png?text=Kuracie+Curry",
            description: "Rýchle a chutné kuracie curry s kokosovým mliekom.",
            ingredients: ["kuracie prsia", "kokosové mlieko", "curry pasta", "cibuľa", "ryža"]
        },
        {
            id: 2,
            title: "Špagety Carbonara",
            image: "https://via.placeholder.com/300x200.png?text=Špagety+Carbonara",
            description: "Klasické talianske špagety so slaninou, vajíčkom a parmezánom.",
            ingredients: ["špagety", "slanina", "vajíčka", "parmezán", "čierne korenie"]
        },
        {
            id: 3,
            title: "Zeleninové Tacos",
            image: "https://via.placeholder.com/300x200.png?text=Zeleninové+Tacos",
            description: "Zdravé a farebné tacos plnené čerstvou zeleninou a fazuľou.",
            ingredients: ["taco placky", "fazuľa", "kukurica", "paradajky", "šalát", "syr"]
        },
        {
            id: 4,
            title: "Hovädzí Guláš",
            image: "https://via.placeholder.com/300x200.png?text=Hovädzí+Guláš",
            description: "Tradičný hovädzí guláš, ideálny na chladné večery.",
            ingredients: ["hovädzie mäso", "cibuľa", "paprika", "zemiaky", "rasca"]
        }
    ];

    const mealPlan = [mockRecipes[0], mockRecipes[2]]; // Plánujeme Kuracie Curry a Zeleninové Tacos
    const pantryItems = ["ryža", "cibuľa", "čierne korenie", "soľ", "olej"];

    // --- Elementy ---
    const recipeContainer = document.getElementById('recipe-container');
    const generateListBtn = document.getElementById('generate-list-btn');
    const shoppingListContainer = document.getElementById('shopping-list-container');


    // --- Funkcie ---

    // Funkcia na zobrazenie receptov
    function displayRecipes() {
        if (!recipeContainer) return;
        recipeContainer.innerHTML = '';
        mockRecipes.forEach(recipe => {
            const recipeCard = `
                <div class="recipe-card">
                    <img src="${recipe.image}" alt="${recipe.title}">
                    <div class="recipe-card-content">
                        <h3>${recipe.title}</h3>
                        <p>${recipe.description}</p>
                    </div>
                </div>
            `;
            recipeContainer.innerHTML += recipeCard;
        });
    }

    // Funkcia na generovanie a zobrazenie nákupného zoznamu
    function generateAndDisplayShoppingList() {
        // 1. Zozbierať všetky potrebné ingrediencie z jedálnička
        const neededIngredients = mealPlan.flatMap(recipe => recipe.ingredients);
        
        // 2. Odstrániť duplicity
        const uniqueIngredients = [...new Set(neededIngredients)];

        // 3. Zistiť, ktoré ingrediencie chýbajú (nie sú v špajzi)
        const shoppingList = uniqueIngredients.filter(ingredient => !pantryItems.includes(ingredient));

        // 4. Zobraziť nákupný zoznam
        displayShoppingList(shoppingList);
    }

    // Funkcia na zobrazenie položiek v nákupnom zozname
    function displayShoppingList(list) {
        if (!shoppingListContainer) return;
        shoppingListContainer.innerHTML = '';

        if (list.length === 0) {
            shoppingListContainer.innerHTML = '<li>Všetky potrebné suroviny máte doma! 🎉</li>';
            return;
        }

        list.forEach((item, index) => {
            const listItem = `
                <li>
                    <input type="checkbox" id="item-${index}" name="item-${index}">
                    <label for="item-${index}">${item}</label>
                </li>
            `;
            shoppingListContainer.innerHTML += listItem;
        });
    }

    // --- Event Listeners ---
    if (generateListBtn) {
        generateListBtn.addEventListener('click', generateAndDisplayShoppingList);
    }

    // Počiatočné zobrazenie
    displayRecipes();
});
