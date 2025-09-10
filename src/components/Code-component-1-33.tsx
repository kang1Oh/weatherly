import { Sun, Cloud, CloudRain, Wind } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

interface DailyForecast {
  day: string;
  date: string;
  temperature: { high: number; low: number };
  condition: string;
  precipitation: number;
  windSpeed: number;
}

interface WeeklyForecastProps {
  forecast: DailyForecast[];
  mode: 'outfit' | 'activity' | 'both';
}

const getWeatherIcon = (condition: string) => {
  const cond = condition.toLowerCase();
  if (cond.includes('sun') || cond.includes('clear')) return Sun;
  if (cond.includes('rain') || cond.includes('storm')) return CloudRain;
  if (cond.includes('cloud')) return Cloud;
  return Sun;
};

const getOutfitSuggestion = (temp: number, condition: string) => {
  const isRainy = condition.toLowerCase().includes('rain');
  
  if (temp < 10) return isRainy ? '🧥 Heavy coat + umbrella' : '🧥 Winter coat';
  if (temp < 20) return isRainy ? '🧥 Jacket + umbrella' : '👕 Light jacket';
  if (temp < 28) return isRainy ? '☂️ Light layer + umbrella' : '👕 T-shirt & pants';
  return isRainy ? '☂️ Light clothes + umbrella' : '🩳 Shorts & t-shirt';
};

const getActivitySuggestion = (temp: number, condition: string, windSpeed: number) => {
  const isRainy = condition.toLowerCase().includes('rain');
  const isWindy = windSpeed > 20;
  
  if (isRainy) return '📚 Indoor activities';
  if (temp < 5) return '🏠 Stay warm inside';
  if (temp < 15) return '🚶 Brisk walk';
  if (temp < 25) return isWindy ? '🏃 Sheltered exercise' : '🚴 Cycling';
  return '🏊 Swimming or beach';
};

export function WeeklyForecast({ forecast, mode }: WeeklyForecastProps) {
  return (
    <Card className="p-6">
      <h3 className="text-xl font-semibold mb-4">7-Day Forecast</h3>
      
      <div className="space-y-3">
        {forecast.map((day, index) => {
          const WeatherIcon = getWeatherIcon(day.condition);
          const avgTemp = Math.round((day.temperature.high + day.temperature.low) / 2);
          
          return (
            <div key={index} className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent/50 transition-colors">
              <div className="flex items-center space-x-4 flex-1">
                <div className="text-center min-w-16">
                  <div className="font-medium">{day.day}</div>
                  <div className="text-xs text-muted-foreground">{day.date}</div>
                </div>
                
                <WeatherIcon className="w-5 h-5 text-muted-foreground" />
                
                <div className="flex-1">
                  <div className="font-medium">{day.condition}</div>
                  <div className="text-sm text-muted-foreground">
                    {day.temperature.high}° / {day.temperature.low}°
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col space-y-1 items-end min-w-48">
                {(mode === 'outfit' || mode === 'both') && (
                  <Badge variant="secondary" className="text-xs">
                    {getOutfitSuggestion(avgTemp, day.condition)}
                  </Badge>
                )}
                {(mode === 'activity' || mode === 'both') && (
                  <Badge variant="outline" className="text-xs">
                    {getActivitySuggestion(avgTemp, day.condition, day.windSpeed)}
                  </Badge>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}