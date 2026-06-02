// Import high-quality local photography assets
import soyaDishLocal from '../assets/soya_dish.png';
import paneerDishLocal from '../assets/paneer_dish.png';
import chickenDishLocal from '../assets/chicken_dish.png';
import eggDishLocal from '../assets/egg_dish.png';
import healthyPizzaLocal from '../assets/healthy_pizza.png';
import freshJuiceLocal from '../assets/fresh_juice.png';
import herbalRemedyLocal from '../assets/herbal_remedy.png';
import superfoodSeedsLocal from '../assets/superfood_seeds.png';
import detoxDrinkLocal from '../assets/detox_drink.png';
import fitnessMealLocal from '../assets/fitness_meal.png';

// Comprehensive database of 52 premium curated food photography images optimized for quick loading
const categoryImages = {
  // Main Recipes & Proteins
  soya: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800', // Sesame tofu stir fry
  paneer: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&q=80&w=800', // Searing paneer tikka
  chicken: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80&w=800', // Sliced grilled chicken breast
  egg: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=800', // Fresh egg salad breakfast bowl
  pizza: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=800', // Sourdough rustic veggie pizza
  fish: 'https://images.unsplash.com/photo-1485921325814-a5341826fb8e?auto=format&fit=crop&q=80&w=800', // Pan-seared salmon fillet
  legumes: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800', // Lentils & sprout garden salad
  grains: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=800', // Nutritious quinoa bowl with avocado
  airfry: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&q=80&w=800', // Crunchy airfried potato wedges
  fitness: 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&q=80&w=800', // Balanced fitness meal prep container
  beef: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800', // High-protein beef bowl
  turkey: 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?auto=format&fit=crop&q=80&w=800', // Sliced turkey breast salad
  shrimp: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=800', // Garlic butter seared shrimp

  // Juices & Beverages
  immunityJuice: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&q=80&w=800', // Carrot ginger immunity splash
  bloodJuice: 'https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&q=80&w=800', // Beetroot ruby-red skin juice
  skinJuice: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=800', // Green celery cucumber hydration juice
  digestionJuice: 'https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&q=80&w=800', // Golden pineapple mint infusion
  coolingJuice: 'https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?auto=format&fit=crop&q=80&w=800', // Cold sliced watermelon lime splash
  detoxWater: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&q=80&w=800', // Mint lemon cucumber infused detox jar
  lemonade: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=800', // Healthy mint lemonade
  matcha: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&q=80&w=800', // Fresh green matcha latte
  coffee: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=800', // Black coffee cold brew

  // Remedies & Herbs
  herbalTea: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=800', // Steaming herbal tea remedy
  coldFlu: 'https://images.unsplash.com/photo-1564844534712-4c9e76cb04c4?auto=format&fit=crop&q=80&w=800', // Lemon honey ginger warm remedy
  nightRemedy: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&q=80&w=800', // Soothing chamomile bedtime tea
  honey: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=800', // Raw golden honey jar

  // Seeds & Nutrition
  seeds: 'https://images.unsplash.com/photo-1511124690914-b4be93b3c7d6?auto=format&fit=crop&q=80&w=800', // Almonds, chia, pumpkin seeds
  essentialFats: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&q=80&w=800', // Sliced fresh avocado toast
  avocado: 'https://images.unsplash.com/photo-1603052875302-d376b7c0638a?auto=format&fit=crop&q=80&w=800', // Sliced avocado halves
  microNutrition: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800', // Leafy greens & fresh organic salad
  chia: 'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?auto=format&fit=crop&q=80&w=800', // Creamy chia seed pudding
  spinach: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&q=80&w=800', // Sautéed baby spinach greens

  // Healthy Meals & Grains
  salad: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=800', // Mixed garden greens
  soup: 'https://images.unsplash.com/photo-1547592165-e1d17fed6005?auto=format&fit=crop&q=80&w=800', // Hearty vegetable broth soup
  smoothie: 'https://images.unsplash.com/photo-1553530979-7ee52a2670c4?auto=format&fit=crop&q=80&w=800', // Berry banana protein smoothie
  oats: 'https://images.unsplash.com/photo-1517881917430-e70dfb3610aa?auto=format&fit=crop&q=80&w=800', // Healthy steel-cut oats bowl
  rice: 'https://images.unsplash.com/photo-1536304997881-a372c179924b?auto=format&fit=crop&q=80&w=800', // Steamed brown rice
  pasta: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&q=80&w=800', // Whole grain pesto pasta salad
  curry: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&q=80&w=800', // Healthy yellow chickpea curry
  wrap: 'https://images.unsplash.com/photo-1562607348-77dec2d48807?auto=format&fit=crop&q=80&w=800', // Whole wheat grilled chicken wrap
  sandwich: 'https://images.unsplash.com/photo-1541532713592-79a0317b6b77?auto=format&fit=crop&q=80&w=800', // Avocado turkey sandwich toast
  pancake: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&q=80&w=800', // Stack of protein pancakes
  waffle: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&q=80&w=800', // Multi-grain waffle with berries
  yogurt: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&q=80&w=800', // Creamy greek yogurt cup
  nuts: 'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&q=80&w=800', // Sliced almonds and walnuts
  broccoli: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&q=80&w=800', // Steamed green broccoli bowl
  sweetpotato: 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&q=80&w=800', // Roasted sweet potato wedges
  berries: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&q=80&w=800', // Bowl of strawberries and blueberries
  tofu: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&q=80&w=800', // Crispy baked tofu blocks
  mushroom: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&q=80&w=800', // Sautéed baby button mushrooms
  lentil: 'https://images.unsplash.com/photo-1547592165-e1d17fed6005?auto=format&fit=crop&q=80&w=800', // Hearty green lentil soup
  shake: 'https://images.unsplash.com/photo-1579954115545-a95591f28bec?auto=format&fit=crop&q=80&w=800'  // Double chocolate whey shake
};

/**
 * Returns a premium food photography asset URL matching the recipe's category, subcategory, type, and name.
 * Supports both getRecipeImage(recipeObject) and backward-compatible positional arguments.
 * @param {object|string} recipe - The complete recipe object, or primary type string (for backward compatibility)
 * @returns {string} - The dynamic image source URL
 */
export function getRecipeImage(recipe = {}) {
  let type = 'recipe';
  let category = '';
  let subcategory = '';
  let name = '';
  let isVeg = true;

  // Support backward compatibility for positional signatures: getRecipeImage(type, category, isVeg)
  if (typeof recipe === 'string') {
    type = recipe;
    category = arguments[1] || '';
    isVeg = arguments[2] !== undefined ? arguments[2] : true;
  } else if (recipe && typeof recipe === 'object') {
    type = recipe.type || 'recipe';
    category = recipe.category || '';
    subcategory = recipe.subcategory || '';
    name = recipe.name || '';
    isVeg = recipe.isVeg !== undefined ? recipe.isVeg : true;
  }

  const normType = String(type || '').toLowerCase().trim();
  const normCat = String(category || '').toLowerCase().trim();
  const normSub = String(subcategory || '').toLowerCase().trim();
  const normName = String(name || '').toLowerCase().trim();

  // --- LAYER 1: Dynamic Dish Style Mapping for Recipes (Checks Name & Subcategory first for perfect variety) ---
  if (normType === 'recipe' || normType === 'schedule') {
    // 1. Sandwiches, Burgers, and Toast
    if (
      normName.includes('sandwich') || normSub.includes('sandwich') ||
      normName.includes('burger') || normSub.includes('burger') ||
      normName.includes('bread') || normSub.includes('bread')
    ) {
      return categoryImages.sandwich;
    }

    // 2. Pizza
    if (normName.includes('pizza') || normSub.includes('pizza')) {
      return categoryImages.pizza;
    }

    // 3. Wraps, Rolls, Tacos, Burritos, Quesadillas, and Shawarmas
    if (
      normName.includes('wrap') || normSub.includes('wrap') ||
      normName.includes('roll') || normSub.includes('roll') ||
      normName.includes('shawarma') || normSub.includes('shawarma') ||
      normName.includes('taco') || normSub.includes('taco') ||
      normName.includes('burrito') || normSub.includes('burrito') ||
      normName.includes('quesadilla') || normSub.includes('quesadilla') ||
      normName.includes('parcel') || normSub.includes('parcel') ||
      normName.includes('frankie') || normSub.includes('frankie')
    ) {
      return categoryImages.wrap;
    }

    // 4. Pasta & Macaroni
    if (normName.includes('pasta') || normSub.includes('pasta') || normName.includes('macaroni')) {
      return categoryImages.pasta;
    }

    // 5. Rice, Pulav, Biryani, and Tawa Rice
    if (
      normName.includes('rice') || normSub.includes('rice') ||
      normName.includes('pulav') || normSub.includes('pulav') ||
      normName.includes('biryani') || normSub.includes('biryani')
    ) {
      return categoryImages.rice;
    }

    // 6. Salads & Bowls
    if (normName.includes('salad') || normSub.includes('salad') || normName.includes('bowl') || normSub.includes('bowl')) {
      return categoryImages.salad;
    }

    // 7. Soups & Hearty Broths
    if (normName.includes('soup') || normSub.includes('soup') || normName.includes('broth')) {
      return categoryImages.soup;
    }

    // 8. Curry, Gravy, Bhurji, Bhaji, and Dal
    if (
      normName.includes('curry') || normSub.includes('curry') ||
      normName.includes('gravy') || normSub.includes('gravy') ||
      normName.includes('bhurji') || normSub.includes('bhurji') ||
      normName.includes('bhaji') || normSub.includes('bhaji') ||
      normName.includes('dhal') || normSub.includes('dhal') ||
      normName.includes('dal') || normSub.includes('dal') ||
      normName.includes('masala') || normSub.includes('masala') ||
      normName.includes('ghotala') || normSub.includes('ghotala')
    ) {
      return categoryImages.curry;
    }

    // 9. Snacks, Kebabs, Tikki, Vada, Pakora, Cutlets, Momos, Fingers, Popcorn, Nuggets
    if (
      normName.includes('tikki') || normSub.includes('tikki') ||
      normName.includes('kebab') || normSub.includes('kebab') ||
      normName.includes('kabab') || normSub.includes('kabab') ||
      normName.includes('vada') || normSub.includes('vada') ||
      normName.includes('pakora') || normSub.includes('pakora') ||
      normName.includes('cutlet') || normSub.includes('cutlet') ||
      normName.includes('momo') || normSub.includes('momo') ||
      normName.includes('nugget') || normSub.includes('nugget') ||
      normName.includes('popcorn') || normSub.includes('popcorn') ||
      normName.includes('finger') || normSub.includes('finger') ||
      normName.includes('wing') || normSub.includes('wing') ||
      normName.includes('snack') || normSub.includes('snack') ||
      normName.includes('patties') || normSub.includes('patties') ||
      normName.includes('samosa') || normSub.includes('samosa') ||
      normName.includes('kachori') || normSub.includes('kachori') ||
      normName.includes('dhokla') || normSub.includes('dhokla') ||
      normName.includes('bite') || normSub.includes('bite') ||
      normName.includes('skewer') || normSub.includes('skewer')
    ) {
      return categoryImages.airfry;
    }

    // 10. Pancakes, Waffles, Parathas, and Crepes
    if (
      normName.includes('pancake') || normName.includes('waffle') ||
      normName.includes('brownie') || normName.includes('dessert') ||
      normName.includes('paratha') || normName.includes('roti')
    ) {
      return categoryImages.pancake;
    }

    // 11. Shakes, Smoothies, and High-Protein Shakes
    if (normName.includes('shake') || normName.includes('smoothie')) {
      return categoryImages.shake;
    }
  }

  // --- LAYER 2: Specific keyword mappings by Category (for all item types) ---
  
  // Recipes & Proteins
  if (normCat.includes('soya')) return categoryImages.soya;
  if (normCat.includes('paneer')) return categoryImages.paneer;
  if (normCat.includes('chicken') || normCat.includes('poultry')) return categoryImages.chicken;
  if (normCat.includes('egg')) return categoryImages.egg;
  if (normCat.includes('pizza')) return categoryImages.pizza;
  if (normCat.includes('fish') || normCat.includes('seafood') || normCat.includes('salmon')) return categoryImages.fish;
  if (normCat.includes('beef')) return categoryImages.beef;
  if (normCat.includes('turkey')) return categoryImages.turkey;
  if (normCat.includes('shrimp')) return categoryImages.shrimp;
  
  // Grains, Veggies, & Seeds
  if (normCat.includes('sprout') || normCat.includes('legume') || normCat.includes('bean') || normCat.includes('chana') || normCat.includes('rajma')) return categoryImages.legumes;
  if (normCat.includes('quinoa') || normCat.includes('grain') || normCat.includes('millet')) return categoryImages.grains;
  if (normCat.includes('airfry') || normCat.includes('fry') || normCat.includes('chip')) return categoryImages.airfry;
  if (normCat.includes('salad')) return categoryImages.salad;
  if (normCat.includes('soup') || normCat.includes('broth')) return categoryImages.soup;
  if (normCat.includes('oat') || normCat.includes('porridge')) return categoryImages.oats;
  if (normCat.includes('rice')) return categoryImages.rice;
  if (normCat.includes('pasta')) return categoryImages.pasta;
  if (normCat.includes('curry')) return categoryImages.curry;
  if (normCat.includes('wrap') || normCat.includes('tortilla')) return categoryImages.wrap;
  if (normCat.includes('sandwich') || normCat.includes('toast')) return categoryImages.sandwich;
  
  // Juices & Beverages
  if (normCat.includes('immunity')) return categoryImages.immunityJuice;
  if (normCat.includes('blood') || normCat.includes('beet')) return categoryImages.bloodJuice;
  if (normCat.includes('skin') || normCat.includes('glow')) return categoryImages.skinJuice;
  if (normCat.includes('digest')) return categoryImages.digestionJuice;
  if (normCat.includes('cooling') || normCat.includes('melon')) return categoryImages.coolingJuice;
  if (normCat.includes('detox') || normCat.includes('gut') || normCat.includes('liver') || normCat.includes('drink')) return categoryImages.detoxWater;
  if (normCat.includes('lemonade')) return categoryImages.lemonade;
  if (normCat.includes('matcha')) return categoryImages.matcha;
  if (normCat.includes('coffee')) return categoryImages.coffee;
  
  // Remedies & Sweeteners
  if (normCat.includes('cold') || normCat.includes('flu') || normCat.includes('cough')) return categoryImages.coldFlu;
  if (normCat.includes('night') || normCat.includes('sleep') || normCat.includes('bed')) return categoryImages.nightRemedy;
  if (normCat.includes('remedy') || normCat.includes('herbal') || normCat.includes('tea')) return categoryImages.herbalTea;
  if (normCat.includes('honey')) return categoryImages.honey;

  // Seeds & Vegetables
  if (normCat.includes('chia')) return categoryImages.chia;
  if (normCat.includes('spinach')) return categoryImages.spinach;
  if (normCat.includes('seed') || normCat.includes('flax') || normCat.includes('pumpkin')) return categoryImages.seeds;
  if (normCat.includes('essential fat') || normCat.includes('oil')) return categoryImages.essentialFats;
  if (normCat.includes('avocado')) return categoryImages.avocado;
  if (normCat.includes('micro') || normCat.includes('vitamin') || normCat.includes('mineral') || normCat.includes('hair') || normCat.includes('leaf')) return categoryImages.microNutrition;
  if (normCat.includes('broccoli')) return categoryImages.broccoli;
  if (normCat.includes('sweetpotato') || normCat.includes('sweet potato')) return categoryImages.sweetpotato;
  if (normCat.includes('berry') || normCat.includes('berries') || normCat.includes('strawberry') || normCat.includes('blueberry')) return categoryImages.berries;
  if (normCat.includes('tofu')) return categoryImages.tofu;
  if (normCat.includes('mushroom')) return categoryImages.mushroom;
  if (normCat.includes('lentil')) return categoryImages.lentil;
  
  // Breakfasts & Snacks
  if (normCat.includes('pancake')) return categoryImages.pancake;
  if (normCat.includes('waffle')) return categoryImages.waffle;
  if (normCat.includes('yogurt') || normCat.includes('parfait')) return categoryImages.yogurt;
  if (normCat.includes('nuts') || normCat.includes('almond') || normCat.includes('walnut')) return categoryImages.nuts;
  if (normCat.includes('shake') || normCat.includes('smoothie')) return categoryImages.smoothie;
  if (normCat.includes('fitness') || normCat.includes('meal') || normCat.includes('macro') || normCat.includes('weight loss')) return categoryImages.fitness;

  // --- LAYER 3: Fallback checking by primary Type ---
  if (normType === 'juice') return freshJuiceLocal; // High-speed local fallback
  if (normType === 'remedy') return herbalRemedyLocal;
  if (normType === 'seed') return superfoodSeedsLocal;
  if (normType === 'detox') return detoxDrinkLocal;
  if (normType === 'schedule') {
    if (normCat.includes('morning')) return categoryImages.detoxWater;
    if (normCat.includes('night')) return categoryImages.nightRemedy;
    if (normCat.includes('snack')) return categoryImages.pizza;
    return fitnessMealLocal;
  }
  if (normType === 'vitals' || normType === 'nutrition') return superfoodSeedsLocal;

  // --- LAYER 4: Standard Local Image Fallbacks based on Dietary Preference ---
  if (normType === 'recipe') {
    if (isVeg) {
      return paneerDishLocal;
    } else {
      return chickenDishLocal;
    }
  }

  return fitnessMealLocal;
}
