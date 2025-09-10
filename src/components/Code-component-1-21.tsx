import { Shirt, Coat, Umbrella, Sun, Snowflake } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

interface OutfitSuggestionProps {
  temperature: number;
  condition: string;
  humidity: number;
}

const getOutfitSuggestion = (temp: number, condition: string, humidity: number) => {
  const isRainy = condition.toLowerCase().includes('rain') || condition.toLowerCase().includes('storm');
  const isWindy = condition.toLowerCase().includes('wind');
  
  let outfit = {
    clothes: [] as string[],
    accessories: [] as string[],
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
    outfit.icon = Coat;
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

const getMotivationalQuote = (condition: string) => {
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

export function OutfitSuggestion({ temperature, condition, humidity }: OutfitSuggestionProps) {
  const outfit = getOutfitSuggestion(temperature, condition, humidity);
  const quote = getMotivationalQuote(condition);
  const OutfitIcon = outfit.icon;

  return (
    <Card className="p-6">
      <div className="flex items-center space-x-3 mb-4">
        <div className={`p-2 rounded-full ${outfit.color} text-white`}>
          <OutfitIcon className="w-5 h-5" />
        </div>
        <h3 className="text-xl font-semibold">Perfect Outfit</h3>
      </div>
      
      <div className="space-y-4">
        <div>
          <h4 className="font-medium mb-2">Recommended Clothing:</h4>
          <div className="flex flex-wrap gap-2">
            {outfit.clothes.map((item, index) => (
              <Badge key={index} variant="secondary" className="text-sm">
                {item}
              </Badge>
            ))}
          </div>
        </div>
        
        {outfit.accessories.length > 0 && (
          <div>
            <h4 className="font-medium mb-2">Don't Forget:</h4>
            <div className="flex flex-wrap gap-2">
              {outfit.accessories.map((item, index) => (
                <Badge key={index} variant="outline" className="text-sm">
                  {item}
                </Badge>
              ))}
            </div>
          </div>
        )}
        
        <div className="pt-2 border-t">
          <p className="text-sm text-muted-foreground italic">{quote}</p>
        </div>
      </div>
    </Card>
  );
}