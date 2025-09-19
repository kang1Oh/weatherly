import { Cloud, Sun, CloudRain, Wind, Droplets, Thermometer } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const weatherBackgrounds = {
  sunny: "https://images.unsplash.com/photo-1553775556-a5b1a88abb54?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW5ueSUyMHdlYXRoZXIlMjBiYWNrZ3JvdW5kJTIwZ3JhZGllbnQlMjBza3l8ZW58MXx8fHwxNzU3NDY2NDc5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  rainy: "https://images.unsplash.com/photo-1599806112354-67f8b5425a06?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYWlueSUyMHdlYXRoZXIlMjBjbG91ZHMlMjBkYXJrJTIwc2t5fGVufDF8fHx8MTc1NzQ2NjQ4Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  cloudy: "https://images.unsplash.com/photo-1553775556-a5b1a88abb54?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW5ueSUyMHdlYXRoZXIlMjBiYWNrZ3JvdW5kJTIwZ3JhZGllbnQlMjBza3l8ZW58MXx8fHwxNzU3NDY2NDc5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
};

const getWeatherIcon = (condition) => {
  const cond = condition.toLowerCase();
  if (cond.includes('sun') || cond.includes('clear')) return Sun;
  if (cond.includes('rain') || cond.includes('storm')) return CloudRain;
  if (cond.includes('cloud')) return Cloud;
  return Sun;
};

const getBackgroundImage = (condition) => {
  const cond = condition.toLowerCase();
  if (cond.includes('sun') || cond.includes('clear')) return weatherBackgrounds.sunny;
  if (cond.includes('rain') || cond.includes('storm')) return weatherBackgrounds.rainy;
  return weatherBackgrounds.cloudy;
};

export function WeatherHeader({ weather }) {
  const WeatherIcon = getWeatherIcon(weather.condition);
  const backgroundImage = getBackgroundImage(weather.condition);

  return (
    <div className="relative overflow-hidden rounded-3xl h-80 bg-white/20 backdrop-blur-xl border border-white/30 shadow-xl">
      <div className="absolute inset-0">
        <ImageWithFallback
          src={backgroundImage}
          alt="Weather background"
          className="w-full h-full object-cover opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/30 via-blue-500/20 to-emerald-500/30" />
      </div>
      
      <div className="relative z-10 p-8 h-full flex flex-col justify-between text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold drop-shadow-lg">{weather.city}</h1>
            <p className="text-white/90 drop-shadow-md">{weather.country}</p>
          </div>
          <WeatherIcon className="w-12 h-12 drop-shadow-lg" />
        </div>
        
        <div className="flex flex-col gap-4">
          <div className="flex items-baseline gap-2">
            <span className="text-6xl font-light drop-shadow-lg">{weather.temperature}°</span>
            <span className="text-xl text-white/90 drop-shadow-md">C</span>
          </div>
          
          <div>
            <p className="text-xl drop-shadow-md">{weather.condition}</p>
            <p className="text-white/90 drop-shadow-sm">{weather.description}</p>
          </div>
          
          <div className="flex gap-6 text-sm">
            <div className="flex items-center gap-1">
              <Thermometer className="w-4 h-4 drop-shadow-sm" />
              <span className="drop-shadow-sm">Feels like {weather.feelsLike}°</span>
            </div>
            <div className="flex items-center gap-1">
              <Droplets className="w-4 h-4 drop-shadow-sm" />
              <span className="drop-shadow-sm">{weather.humidity}%</span>
            </div>
            <div className="flex items-center gap-1">
              <Wind className="w-4 h-4 drop-shadow-sm" />
              <span className="drop-shadow-sm">{weather.windSpeed} km/h</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
