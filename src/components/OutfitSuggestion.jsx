import { Shirt, Shield, Umbrella, Sun, Snowflake } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

// Local image imports
import bootsImg from '../assets/outfits/boots.png';
import cardiganImg from '../assets/outfits/cardigan.png';
import hatImg from '../assets/outfits/hat.png';
import jacketImg from '../assets/outfits/jacket.png';
import jeansImg from '../assets/outfits/jeans.png';
import lightSweaterImg from '../assets/outfits/light-sweater.png';
import longSleeveImg from '../assets/outfits/long-sleeve.png';
import raincoatImg from '../assets/outfits/raincoat.png';
import sandalsImg from '../assets/outfits/sandals.png';
import shoesImg from '../assets/outfits/shoes.png';
import shortsImg from '../assets/outfits/shorts.png';
import sunglassesImg from '../assets/outfits/sunglasses.png';
import sunscreenImg from '../assets/outfits/sunscreen.png';
import thermalUnderwearImg from '../assets/outfits/thermal-underwear.png';
import tshirtImg from '../assets/outfits/tshirt.png';
import winterCoatImg from '../assets/outfits/winter-coat.png';

const imageMap = {
  // clothes
  jeans: jeansImg,
  pants: jeansImg,

  jacket: jacketImg,
  raincoat: raincoatImg,

  coat: winterCoatImg,
  'winter coat': winterCoatImg,
  'heavy winter coat': winterCoatImg,

  sweater: lightSweaterImg,
  cardigan: cardiganImg,
  'light sweater': lightSweaterImg,

  tshirt: tshirtImg,
  't-shirt': tshirtImg,
  't shirt': tshirtImg,

  'long-sleeve': longSleeveImg,
  'long sleeve': longSleeveImg,

  shorts: shortsImg,

  boots: bootsImg,
  'winter boots': bootsImg,

  sandals: sandalsImg,
  shoes: shoesImg,
  sneakers: shoesImg,
  'closed shoes': shoesImg,

  // accessories
  umbrella: raincoatImg, // reuse raincoat image if you don’t have umbrella.png anymore
  sunglasses: sunglassesImg,
  hat: hatImg,
  sunscreen: sunscreenImg,

  // special
  'thermal underwear': thermalUnderwearImg,
};


// Pick an image if any keyword matches in the phrase
const getImageForItem = (item) => {
  const lower = item.toLowerCase();

  // Split into words (keep full string too for multi-word keys)
  const words = lower.split(/[\s,/-]+/); // split by space, comma, slash, hyphen
  const candidates = [lower, ...words];

  // Prioritize by order of appearance in imageMap
  for (const key in imageMap) {
    if (candidates.some(c => c.includes(key))) {
      return imageMap[key];
    }
  }

  return null;
};


const getOutfitSuggestion = (temp, condition, humidity) => {
  const isRainy = condition.toLowerCase().includes('rain') || condition.toLowerCase().includes('storm');
  const isWindy = condition.toLowerCase().includes('wind');
  
  let outfit = {
    clothes: [],
    accessories: [],
    icon: Shirt,
    color: 'bg-blue-500'
  };

  // Temperature-based clothing
  if (temp < 5) {
    outfit.clothes = ['Heavy winter coat', 'Warm sweater', 'Thick jeans', 'Winter boots', 'Thermal underwear'];
    outfit.icon = Snowflake;
    outfit.color = 'bg-blue-600';
  } else if (temp < 15) {
    outfit.clothes = ['Jacket or light coat', 'Long-sleeve shirt', 'Jeans or pants', 'Closed shoes'];
    outfit.icon = Shield;
    outfit.color = 'bg-blue-500';
  } else if (temp < 25) {
    outfit.clothes = ['Light sweater or cardigan', 'T-shirt', 'Jeans or casual pants', 'Sneakers'];
    outfit.icon = Shirt;
    outfit.color = 'bg-green-500';
  } else {
    outfit.clothes = ['Light t-shirt or tank top', 'Shorts or light pants', 'Sandals or breathable shoes'];
    outfit.icon = Sun;
    outfit.color = 'bg-orange-500';
  }

  // Weather-specific accessories
  if (isRainy) {
    outfit.accessories.push('Umbrella', 'Waterproof jacket', 'Water-resistant shoes');
  }
  
  if (temp > 25 && condition.toLowerCase().includes('sun')) {
    outfit.accessories.push('Sunglasses', 'Hat', 'Sunscreen');
  }
  
  if (humidity > 70) {
    outfit.accessories.push('Light, breathable fabrics');
  }
  
  if (isWindy) {
    outfit.accessories.push('Light jacket (for wind protection)');
  }

  return outfit;
};

const getMotivationalQuote = (condition) => {
  const cond = condition.toLowerCase();
  if (cond.includes('sun') || cond.includes('clear')) {
    return "Sunny days are perfect for new beginnings! ☀️";
  }
  if (cond.includes('rain')) {
    return "Let the rain wash away yesterday's worries. 🌧️";
  }
  if (cond.includes('cloud')) {
    return "Every cloud has a silver lining. Stay positive! ☁️";
  }
  return "Make today amazing, regardless of the weather! 🌟";
};

export function OutfitSuggestion({ temperature, condition, humidity }) {
  const outfit = getOutfitSuggestion(temperature, condition, humidity);
  const quote = getMotivationalQuote(condition);
  const OutfitIcon = outfit.icon;

  return (
    <Card className="p-6">
      {/* Header */}
      <div className="flex items-center space-x-3 mb-4">
        <div className={`p-2 rounded-full ${outfit.color} text-white`}>
          <OutfitIcon className="w-5 h-5" />
        </div>
        <h3 className="text-xl font-semibold">Perfect Outfit</h3>
      </div>

      <div className="space-y-6">
        {/* Clothing */}
        <div>
          <h4 className="font-medium mb-2">Recommended Clothing:</h4>
          <div className="flex space-x-4 overflow-x-auto pb-2">
            {outfit.clothes.map((item, index) => {
              const img = getImageForItem(item);
              return (
                <div
                  key={index}
                  className="flex-shrink-0 flex flex-col items-center bg-gray-50 dark:bg-gray-800 p-3 rounded-lg w-28"
                >
                  {img && (
                    <img
                      src={img}
                      alt={item}
                      className="w-16 h-16 object-contain"
                    />
                  )}
                  <span className="text-xs mt-2 text-center">{item}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Accessories */}
        {outfit.accessories.length > 0 && (
          <div>
            <h4 className="font-medium mb-2">Don't Forget:</h4>
            <div className="flex space-x-4 overflow-x-auto pb-2">
              {outfit.accessories.map((item, index) => {
                const img = getImageForItem(item);
                return (
                  <div
                    key={index}
                    className="flex-shrink-0 flex flex-col items-center bg-gray-50 dark:bg-gray-800 p-3 rounded-lg w-28"
                  >
                    {img && (
                      <img
                        src={img}
                        alt={item}
                        className="w-14 h-14 object-contain"
                      />
                    )}
                    <span className="text-xs mt-2 text-center">{item}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Quote */}
        <div className="pt-2 border-t">
          <p className="text-sm text-muted-foreground italic">{quote}</p>
        </div>
      </div>
    </Card>
  );
}
