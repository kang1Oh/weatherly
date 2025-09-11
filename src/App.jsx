import { useState, useEffect } from 'react';
import { WeatherHeader } from './components/WeatherHeader';
import { OutfitSuggestion } from './components/OutfitSuggestion';
import { ActivitySuggestion } from './components/ActivitySuggestion';
import { CitySearch } from './components/CitySearch';
import { WeeklyForecast } from './components/WeeklyForecast';
import { HealthIndex } from './components/HealthIndex';
import { LifestyleToggle } from './components/LifestyleToggle';

// API Services
import { fetchWeather } from './services/weatherService';
import { geocodeCity } from './services/geocodingService';

export default function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [weeklyForecast, setWeeklyForecast] = useState([]);
  const [lifestyleMode, setLifestyleMode] = useState('both');
  const [favoriteCities, setFavoriteCities] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load favorites
  useEffect(() => {
    const saved = localStorage.getItem('weatherly-favorites');
    if (saved) setFavoriteCities(JSON.parse(saved));
  }, []);

  // Save favorites
  useEffect(() => {
    localStorage.setItem('weatherly-favorites', JSON.stringify(favoriteCities));
  }, [favoriteCities]);

  // Default load (London)
  useEffect(() => {
    handleCitySelect("London");
  }, []);

  const handleCitySelect = async (city) => {
    try {
      setLoading(true);
      const results = await geocodeCity(city);
      if (results.length === 0) throw new Error("City not found");

      const { lat, lon, city: resolvedCity, country } = results[0];
      const { current, forecast } = await fetchWeather(lat, lon, resolvedCity, country);

      setCurrentWeather(current);
      setWeeklyForecast(forecast);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
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

        {loading && <p className="text-center">Loading weather...</p>}

        {currentWeather && (
          <>
            <div className="mb-8">
              <WeatherHeader weather={currentWeather} />
            </div>

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
                lat={currentWeather.lat}
                lon={currentWeather.lon}
              />
            </div>

            <WeeklyForecast forecast={weeklyForecast} mode={lifestyleMode} />
          </>
        )}

        {/* Footer */}
        <div className="text-center mt-12 text-sm text-gray-500 dark:text-gray-400">
          <p>Weatherly helps you dress smart and plan better based on weather conditions</p>
          <p className="mt-1">Built with ❤️ for weather-conscious lifestyle planning</p>
        </div>
      </div>
    </div>
  );
}
