import { useState, useEffect } from 'react';
import { WeatherHeader } from './components/WeatherHeader';
import { OutfitSuggestion } from './components/OutfitSuggestion';
import { ActivitySuggestion } from './components/ActivitySuggestion';
import { CitySearch } from './components/CitySearch';
import { WeeklyForecast } from './components/WeeklyForecast';
import { HealthIndex } from './components/HealthIndex';
import { LifestyleToggle } from './components/LifestyleToggle';

// Mock weather data generator
const generateWeatherData = (city, country) => {
  const conditions = ['Sunny', 'Partly Cloudy', 'Cloudy', 'Light Rain', 'Heavy Rain', 'Clear'];
  const descriptions = [
    'Perfect weather for outdoor activities',
    'A beautiful day with some clouds',
    'Overcast but pleasant',
    'Light showers expected',
    'Stay indoors, heavy rainfall',
    'Crystal clear skies'
  ];
  
  const condition = conditions[Math.floor(Math.random() * conditions.length)];
  const temp = Math.floor(Math.random() * 35) + 5; // 5-40°C
  
  return {
    city,
    country,
    temperature: temp,
    condition,
    humidity: Math.floor(Math.random() * 40) + 40, // 40-80%
    windSpeed: Math.floor(Math.random() * 30) + 5, // 5-35 km/h
    feelsLike: temp + Math.floor(Math.random() * 6) - 3, // ±3 degrees
    description: descriptions[conditions.indexOf(condition)]
  };
};

// Generate weekly forecast
const generateWeeklyForecast = () => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const conditions = ['Sunny', 'Partly Cloudy', 'Cloudy', 'Light Rain', 'Clear'];
  
  return days.map((day, index) => {
    const date = new Date();
    date.setDate(date.getDate() + index);
    const high = Math.floor(Math.random() * 20) + 15; // 15-35°C
    const low = high - Math.floor(Math.random() * 10) - 5; // 5-15°C lower
    
    return {
      day,
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      temperature: { high, low },
      condition: conditions[Math.floor(Math.random() * conditions.length)],
      precipitation: Math.floor(Math.random() * 100),
      windSpeed: Math.floor(Math.random() * 25) + 5
    };
  });
};

export default function App() {
  const [currentWeather, setCurrentWeather] = useState(generateWeatherData('London', 'United Kingdom'));
  const [weeklyForecast] = useState(generateWeeklyForecast());
  const [lifestyleMode, setLifestyleMode] = useState('both'); // removed union type
  const [favoriteCities, setFavoriteCities] = useState([]);

  // Load favorites from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('weatherly-favorites');
    if (saved) {
      setFavoriteCities(JSON.parse(saved));
    }
  }, []);

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem('weatherly-favorites', JSON.stringify(favoriteCities));
  }, [favoriteCities]);

  const handleCitySelect = (city, country) => {
    setCurrentWeather(generateWeatherData(city, country));
  };

  const handleToggleFavorite = (cityCountry) => {
    setFavoriteCities(prev => 
      prev.includes(cityCountry) 
        ? prev.filter(c => c !== cityCountry)
        : [...prev, cityCountry]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            🌦 Weatherly
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Your Smart Weather & Lifestyle Companion
          </p>
        </div>

        {/* Search & Toggle */}
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-8">
          <div className="w-full lg:w-96">
            <CitySearch
              onCitySelect={handleCitySelect}
              favoriteCities={favoriteCities}
              onToggleFavorite={handleToggleFavorite}
            />
          </div>
          <LifestyleToggle mode={lifestyleMode} onModeChange={setLifestyleMode} />
        </div>

        {/* Main Weather Display */}
        <div className="mb-8">
          <WeatherHeader weather={currentWeather} />
        </div>

        {/* Suggestions Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
          {(lifestyleMode === 'outfit' || lifestyleMode === 'both') && (
            <OutfitSuggestion
              temperature={currentWeather.temperature}
              condition={currentWeather.condition}
              humidity={currentWeather.humidity}
            />
          )}
          
          {(lifestyleMode === 'activity' || lifestyleMode === 'both') && (
            <ActivitySuggestion
              temperature={currentWeather.temperature}
              condition={currentWeather.condition}
              windSpeed={currentWeather.windSpeed}
            />
          )}
          
          <HealthIndex
            temperature={currentWeather.temperature}
            humidity={currentWeather.humidity}
            windSpeed={currentWeather.windSpeed}
            condition={currentWeather.condition}
          />
        </div>

        {/* Weekly Forecast */}
        <WeeklyForecast forecast={weeklyForecast} mode={lifestyleMode} />

        {/* Footer */}
        <div className="text-center mt-12 text-sm text-gray-500 dark:text-gray-400">
          <p>Weatherly helps you dress smart and plan better based on weather conditions</p>
          <p className="mt-1">Built with ❤️ for weather-conscious lifestyle planning</p>
        </div>
      </div>
    </div>
  );
}
