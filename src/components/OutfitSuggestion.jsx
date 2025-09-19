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
import umbrellaImg from '../assets/outfits/umbrella.jpg';
import winterCoatImg from '../assets/outfits/winter-coat.png';

import { Shirt, Shield, Umbrella, Sun, Snowflake } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

// Image mapping for different clothing items
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
  umbrella: umbrellaImg,
  sunglasses: sunglassesImg,
  hat: hatImg,
  sunscreen: sunscreenImg,

  // special
  'thermal underwear': thermalUnderwearImg,
};

// Function to get image for clothing item
const getImageForItem = (itemName) => {
  const lowerName = itemName.toLowerCase();

  if (imageMap[lowerName]) {
    return imageMap[lowerName];
  }

  for (const [key, value] of Object.entries(imageMap)) {
    if (lowerName.includes(key) || key.includes(lowerName)) {
      return value;
    }
  }

  return imageMap.tshirt;
};

const getOutfitSuggestion = (temp, condition, humidity) => {
  const isRainy = condition.toLowerCase().includes('rain') || condition.toLowerCase().includes('storm');
  const isWindy = condition.toLowerCase().includes('wind');

  let outfit = {
    clothes: [],
    accessories: [],
    icon: Shirt,
    color: '#3b82f6'
  };

  if (temp < 5) {
    const items = ['Heavy winter coat', 'Warm sweater', 'Thick jeans', 'Winter boots', 'Thermal underwear'];
    outfit.clothes = items.map(name => ({ name, image: getImageForItem(name) }));
    outfit.icon = Snowflake;
    outfit.color = '#2563eb';
  } else if (temp < 15) {
    const items = ['Jacket or light coat', 'Long-sleeve shirt', 'Jeans or pants', 'Closed shoes'];
    outfit.clothes = items.map(name => ({ name, image: getImageForItem(name) }));
    outfit.icon = Shield;
    outfit.color = '#3b82f6';
  } else if (temp < 25) {
    const items = ['Light sweater or cardigan', 'T-shirt', 'Jeans or casual pants', 'Sneakers'];
    outfit.clothes = items.map(name => ({ name, image: getImageForItem(name) }));
    outfit.icon = Shirt;
    outfit.color = '#10b981';
  } else {
    const items = ['Light t-shirt or tank top', 'Shorts or light pants', 'Sandals or breathable shoes'];
    outfit.clothes = items.map(name => ({ name, image: getImageForItem(name) }));
    outfit.icon = Sun;
    outfit.color = '#f59e0b';
  }

  if (isRainy) {
    outfit.accessories.push(
      { name: 'Umbrella', image: getImageForItem('Umbrella') },
      { name: 'Waterproof jacket', image: getImageForItem('raincoat') },
      { name: 'Water-resistant shoes', image: getImageForItem('boots') }
    );
  }

  if (temp > 25 && condition.toLowerCase().includes('sun')) {
    outfit.accessories.push(
      { name: 'Sunglasses', image: getImageForItem('Sunglasses') },
      { name: 'Hat', image: getImageForItem('Hat') },
      { name: 'Sunscreen', image: getImageForItem('Sunscreen') }
    );
  }

  if (humidity > 70) {
    outfit.accessories.push({ name: 'Light, breathable fabrics', image: getImageForItem('t-shirt') });
  }

  if (isWindy) {
    outfit.accessories.push({ name: 'Light jacket (for wind protection)', image: getImageForItem('jacket') });
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
    <div className="p-6 bg-white/25 backdrop-blur-xl rounded-2xl shadow-xl border border-white/30 dark:bg-black/20 dark:border-white/20">
      
      {/* Section Title */}
      <div className="flex items-center gap-3 mb-4">
        <div
          className="p-2 rounded-full text-white"
          style={{ backgroundColor: outfit.color }}
        >
          <OutfitIcon className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-white drop-shadow-md">
            Perfect Outfit
          </h3>
          <p className="text-sm text-white/80">
            Stay comfy at {temperature}°C
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col gap-6">
        <div>
          <h4 className="font-medium mb-3 text-white drop-shadow-sm">
            Recommended Clothing:
          </h4>
          <div className="flex gap-4 overflow-x-auto pb-2 scroll-smooth">
            {outfit.clothes.map((item, index) => (
              <div
                key={index}
                className="relative group cursor-pointer overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 flex-shrink-0"
              >
                <div className="aspect-[4/5] w-32 sm:w-36 relative">
                  <ImageWithFallback
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-2 text-white">
                    <h5 className="font-semibold text-xs leading-tight">
                      {item.name}
                    </h5>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Accessories */}
        {outfit.accessories.length > 0 && (
          <div>
            <h4 className="font-medium mb-3 text-white drop-shadow-sm">
              Don't Forget:
            </h4>
            <div className="flex gap-4 overflow-x-auto pb-2 scroll-smooth">
              {outfit.accessories.map((item, index) => (
                <div
                  key={index}
                  className="relative group cursor-pointer overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 flex-shrink-0"
                >
                  <div className="aspect-[4/5] w-32 sm:w-36 relative">
                    <ImageWithFallback
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-2 text-white">
                      <h5 className="font-semibold text-xs leading-tight">
                        {item.name}
                      </h5>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Motivational Quote */}
        <div className="pt-2 border-t border-white/20 dark:border-white/10">
          <p className="text-sm text-white italic drop-shadow-sm">{quote}</p>
        </div>
      </div>
    </div>
  );
}
