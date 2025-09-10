import { Sun, Shield, Droplets, Wind, Thermometer } from 'lucide-react';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';

interface HealthIndexProps {
  temperature: number;
  humidity: number;
  windSpeed: number;
  condition: string;
}

const getUVIndex = (condition: string, temperature: number) => {
  const isSunny = condition.toLowerCase().includes('sun') || condition.toLowerCase().includes('clear');
  if (!isSunny) return { level: 2, description: 'Low' };
  if (temperature > 25) return { level: 8, description: 'Very High' };
  if (temperature > 20) return { level: 6, description: 'High' };
  return { level: 4, description: 'Moderate' };
};

const getComfortIndex = (temperature: number, humidity: number) => {
  let score = 50; // Base comfort score
  
  // Temperature comfort (optimal around 20-25°C)
  if (temperature >= 20 && temperature <= 25) {
    score += 30;
  } else if (temperature >= 15 && temperature <= 30) {
    score += 15;
  } else if (temperature >= 10 && temperature <= 35) {
    score += 5;
  } else {
    score -= 20;
  }
  
  // Humidity comfort (optimal around 40-60%)
  if (humidity >= 40 && humidity <= 60) {
    score += 20;
  } else if (humidity >= 30 && humidity <= 70) {
    score += 10;
  } else {
    score -= 15;
  }
  
  return Math.max(0, Math.min(100, score));
};

const getAirQualityMock = (condition: string, windSpeed: number) => {
  const isRainy = condition.toLowerCase().includes('rain');
  const isWindy = windSpeed > 15;
  
  if (isRainy) return { aqi: 25, description: 'Good', color: 'text-green-600' };
  if (isWindy) return { aqi: 35, description: 'Good', color: 'text-green-600' };
  return { aqi: 55, description: 'Moderate', color: 'text-yellow-600' };
};

const getHealthTips = (temperature: number, humidity: number, condition: string) => {
  const tips = [];
  const isSunny = condition.toLowerCase().includes('sun');
  const isRainy = condition.toLowerCase().includes('rain');
  
  if (isSunny && temperature > 25) {
    tips.push('Apply sunscreen SPF 30+');
    tips.push('Stay hydrated - drink water regularly');
  }
  
  if (temperature > 30) {
    tips.push('Avoid outdoor activities during peak hours (10AM-4PM)');
  }
  
  if (temperature < 10) {
    tips.push('Keep extremities warm');
    tips.push('Layer clothing for better insulation');
  }
  
  if (humidity > 70) {
    tips.push('Choose breathable, moisture-wicking fabrics');
  }
  
  if (isRainy) {
    tips.push('Stay dry to avoid catching cold');
  }
  
  return tips;
};

export function HealthIndex({ temperature, humidity, windSpeed, condition }: HealthIndexProps) {
  const uvIndex = getUVIndex(condition, temperature);
  const comfortIndex = getComfortIndex(temperature, humidity);
  const airQuality = getAirQualityMock(condition, windSpeed);
  const healthTips = getHealthTips(temperature, humidity, condition);

  return (
    <Card className="p-6">
      <h3 className="text-xl font-semibold mb-4">Health & Comfort</h3>
      
      <div className="space-y-6">
        {/* Comfort Index */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Thermometer className="w-4 h-4 text-blue-500" />
              <span className="font-medium">Comfort Index</span>
            </div>
            <span className="text-sm font-medium">{comfortIndex}%</span>
          </div>
          <Progress value={comfortIndex} className="h-2" />
          <p className="text-xs text-muted-foreground">
            Based on temperature and humidity levels
          </p>
        </div>

        {/* UV Index */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Sun className="w-4 h-4 text-orange-500" />
              <span className="font-medium">UV Index</span>
            </div>
            <Badge variant={uvIndex.level > 6 ? "destructive" : uvIndex.level > 3 ? "default" : "secondary"}>
              {uvIndex.level} - {uvIndex.description}
            </Badge>
          </div>
          <Progress value={(uvIndex.level / 10) * 100} className="h-2" />
        </div>

        {/* Air Quality */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Wind className="w-4 h-4 text-green-500" />
              <span className="font-medium">Air Quality</span>
            </div>
            <span className={`text-sm font-medium ${airQuality.color}`}>
              AQI {airQuality.aqi} - {airQuality.description}
            </span>
          </div>
          <Progress value={100 - airQuality.aqi} className="h-2" />
        </div>

        {/* Health Tips */}
        {healthTips.length > 0 && (
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Shield className="w-4 h-4 text-blue-500" />
              <span className="font-medium">Health Tips</span>
            </div>
            <div className="space-y-1">
              {healthTips.map((tip, index) => (
                <div key={index} className="text-sm text-muted-foreground flex items-start space-x-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>{tip}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}