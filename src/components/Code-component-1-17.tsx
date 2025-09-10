import { Cloud, Sun, CloudRain, Wind, Droplets, Thermometer } from 'lucide-react';
import { Card } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface WeatherData {
  city: string;
  country: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  feelsLike: number;
  description: string;
}

interface WeatherHeaderProps {
  weather: WeatherData;
}

const weatherBackgrounds = {
  sunny: "https://images.unsplash.com/photo-1553775556-a5b1a88abb54?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW5ueSUyMHdlYXRoZXIlMjBiYWNrZ3JvdW5kJTIwZ3JhZGllbnQlMjBza3l8ZW58MXx8fHwxNzU3NDY2NDc5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  rainy: "https://images.unsplash.com/photo-1599806112354-67f8b5425a06?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYWlueSUyMHdlYXRoZXIlMjBjbG91ZHMlMjBkYXJrJTIwc2t5fGVufDF8fHx8MTc1NzQ2NjQ4Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  cloudy: "https://images.unsplash.com/photo-1553775556-a5b1a88abb54?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW5ueSUyMHdlYXRoZXIlMjBiYWNrZ3JvdW5kJTIwZ3JhZGllbnQlMjBza3l8ZW58MXx8fHwxNzU3NDY2NDc5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
};

const getWeatherIcon = (condition: string) => {
  const cond = condition.toLowerCase();
  if (cond.includes('sun') || cond.includes('clear')) return Sun;
  if (cond.includes('rain') || cond.includes('storm')) return CloudRain;
  if (cond.includes('cloud')) return Cloud;
  return Sun;
};

const getBackgroundImage = (condition: string) => {
  const cond = condition.toLowerCase();
  if (cond.includes('sun') || cond.includes('clear')) return weatherBackgrounds.sunny;
  if (cond.includes('rain') || cond.includes('storm')) return weatherBackgrounds.rainy;
  return weatherBackgrounds.cloudy;
};

export function WeatherHeader({ weather }: WeatherHeaderProps) {
  const WeatherIcon = getWeatherIcon(weather.condition);
  const backgroundImage = getBackgroundImage(weather.condition);

  return (
    <Card className="relative overflow-hidden border-0 rounded-3xl h-80">
      <div className="absolute inset-0">
        <ImageWithFallback
          src={backgroundImage}
          alt="Weather background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/20 to-transparent" />
      </div>
      
      <div className="relative z-10 p-8 h-full flex flex-col justify-between text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold">{weather.city}</h1>
            <p className="text-white/80">{weather.country}</p>
          </div>
          <WeatherIcon className="w-12 h-12" />
        </div>
        
        <div className="space-y-4">
          <div className="flex items-baseline space-x-2">
            <span className="text-6xl font-light">{weather.temperature}°</span>
            <span className="text-xl text-white/80">C</span>
          </div>
          
          <div>
            <p className="text-xl">{weather.condition}</p>
            <p className="text-white/80">{weather.description}</p>
          </div>
          
          <div className="flex space-x-6 text-sm">
            <div className="flex items-center space-x-1">
              <Thermometer className="w-4 h-4" />
              <span>Feels like {weather.feelsLike}°</span>
            </div>
            <div className="flex items-center space-x-1">
              <Droplets className="w-4 h-4" />
              <span>{weather.humidity}%</span>
            </div>
            <div className="flex items-center space-x-1">
              <Wind className="w-4 h-4" />
              <span>{weather.windSpeed} km/h</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}