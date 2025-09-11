import { useState, useEffect } from "react";
import { Search, MapPin, Star, StarOff } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";

// API Services
import { geocodeCity } from "../services/geocodingService";

/**
 * @typedef {Object} CitySearchProps
 * @property {(city: string, country: string, lat?: number, lon?: number) => void} onCitySelect
 * @property {string[]} favoriteCities
 * @property {(cityCountry: string) => void} onToggleFavorite
 */

export function CitySearch({ onCitySelect, favoriteCities, onToggleFavorite }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch city suggestions as user types
  useEffect(() => {
    if (searchTerm.length < 2) {
      setSuggestions([]);
      return;
    }

    const timeout = setTimeout(async () => {
      setLoading(true);
      try {
        const results = await geocodeCity(searchTerm, 5);
        setSuggestions(results);
      } catch (err) {
        console.error(err);
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    }, 400); // debounce typing

    return () => clearTimeout(timeout);
  }, [searchTerm]);

  const handleCitySelect = (city, country, lat, lon) => {
    onCitySelect(city, country, lat, lon);
    setSearchTerm("");
    setShowSuggestions(false);
  };

  const handleToggleFavorite = (city, country) => {
    const cityCountry = `${city}, ${country}`;
    onToggleFavorite(cityCountry);
  };

  const getFavoriteCityList = () =>
    favoriteCities.map((cityCountry) => {
      const [city, country] = cityCountry.split(", ");
      return { city, country };
    });

  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            type="text"
            placeholder="Search for a city..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            className="pl-10"
          />
        </div>

        {showSuggestions && searchTerm && (
          <Card className="absolute top-full left-0 right-0 z-20 mt-1 max-h-60 overflow-y-auto">
            <div className="p-2">
              {loading ? (
                <div className="p-4 text-center text-muted-foreground">Loading...</div>
              ) : suggestions.length > 0 ? (
                suggestions.map(({ city, country, lat, lon }, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 hover:bg-accent rounded-md cursor-pointer group"
                    onClick={() => handleCitySelect(city, country, lat, lon)}
                  >
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span>
                        {city}, {country}
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleFavorite(city, country);
                      }}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      {favoriteCities.includes(`${city}, ${country}`) ? (
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ) : (
                        <StarOff className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-muted-foreground">No cities found</div>
              )}
            </div>
          </Card>
        )}
      </div>

      {favoriteCities.length > 0 && (
        <div>
          <h4 className="font-medium mb-2 text-sm text-muted-foreground">Favorite Cities</h4>
          <div className="flex flex-wrap gap-2">
            {getFavoriteCityList().map(({ city, country }, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="cursor-pointer hover:bg-accent-foreground hover:text-accent transition-colors"
                onClick={() => handleCitySelect(city, country)}
              >
                <Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" />
                {city}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
