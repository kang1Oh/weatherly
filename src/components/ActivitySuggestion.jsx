import React from 'react';
import { 
  Bike, Home, BookOpen, Gamepad2, Coffee, Mountain, Waves, TreePine,
  Camera, ShoppingBag, Utensils, Dumbbell, Music, Palette, MapPin,
  Clock, Star, TrendingUp, Sunrise, Sun, Moon
} from 'lucide-react';
import { Badge } from './ui/badge';

const getActivitySuggestions = (temp, condition, windSpeed) => {
  const isRainy = condition.toLowerCase().includes('rain') || condition.toLowerCase().includes('storm');
  const isSunny = condition.toLowerCase().includes('sun') || condition.toLowerCase().includes('clear');
  const isWindy = windSpeed > 20;
  const isCloudy = condition.toLowerCase().includes('cloud');
  
  let activities = {
    outdoor: [],
    indoor: [],
    featured: null,
    weatherCondition: condition
  };

  if (isRainy) {
    activities.indoor = [
      { name: 'Cozy Reading Session', icon: BookOpen, reason: 'Perfect ambiance with rain sounds', duration: '2-3 hours', energyLevel: 'Low', timeOfDay: 'Any', category: 'Relaxation' },
      { name: 'Creative Art Project', icon: Palette, reason: 'Inspiring indoor creativity', duration: '1-4 hours', energyLevel: 'Medium', timeOfDay: 'Afternoon', category: 'Creative' },
      { name: 'Home Cooking Adventure', icon: Utensils, reason: 'Warm comfort food preparation', duration: '1-2 hours', energyLevel: 'Medium', timeOfDay: 'Any', category: 'Culinary' },
      { name: 'Movie Marathon', icon: Home, reason: 'Perfect rainy day entertainment', duration: '3-6 hours', energyLevel: 'Low', timeOfDay: 'Any', category: 'Entertainment' },
      { name: 'Board Game Night', icon: Gamepad2, reason: 'Social fun while staying dry', duration: '2-4 hours', energyLevel: 'Medium', timeOfDay: 'Evening', category: 'Social' }
    ];
    activities.featured = activities.indoor[0];
  } else if (temp < 5) {
    activities.indoor = [
      { name: 'Hot Yoga Session', icon: Dumbbell, reason: 'Warm up your body and mind', duration: '45-90 min', energyLevel: 'High', timeOfDay: 'Morning', category: 'Fitness' },
      { name: 'Baking Workshop', icon: Utensils, reason: 'Heat up the kitchen naturally', duration: '2-3 hours', energyLevel: 'Medium', timeOfDay: 'Afternoon', category: 'Culinary' },
      { name: 'Museum Visit', icon: Camera, reason: 'Cultural warmth and learning', duration: '2-4 hours', energyLevel: 'Low', timeOfDay: 'Any', category: 'Cultural' }
    ];
    activities.outdoor = [
      { name: 'Winter Photography', icon: Camera, reason: 'Capture stunning frost and ice', duration: '1-2 hours', energyLevel: 'Medium', timeOfDay: 'Morning', category: 'Creative' },
      { name: 'Ice Skating', icon: Mountain, reason: 'Embrace the winter season', duration: '1-2 hours', energyLevel: 'High', timeOfDay: 'Any', category: 'Sport' }
    ];
    activities.featured = activities.indoor[0];
  } else if (temp < 15) {
    activities.outdoor = [
      { name: 'Nature Photography Walk', icon: Camera, reason: 'Crisp air, clear visibility', duration: '1-3 hours', energyLevel: 'Medium', timeOfDay: 'Morning', category: 'Creative' },
      { name: 'Scenic Hiking Trail', icon: Mountain, reason: 'Comfortable temperature for long walks', duration: '2-4 hours', energyLevel: 'High', timeOfDay: 'Morning', category: 'Adventure' },
      { name: 'Outdoor Market Visit', icon: ShoppingBag, reason: 'Pleasant temperature for browsing', duration: '1-2 hours', energyLevel: 'Low', timeOfDay: 'Any', category: 'Shopping' }
    ];
    activities.indoor = [
      { name: 'Café Work Session', icon: Coffee, reason: 'Warm, productive atmosphere', duration: '2-4 hours', energyLevel: 'Low', timeOfDay: 'Any', category: 'Productivity' },
      { name: 'Art Gallery Tour', icon: Palette, reason: 'Cultural indoor exploration', duration: '1-3 hours', energyLevel: 'Low', timeOfDay: 'Afternoon', category: 'Cultural' }
    ];
    activities.featured = activities.outdoor[0];
  } else if (temp < 25) {
    activities.outdoor = [
      { name: 'Cycling Adventure', icon: Bike, reason: 'Perfect temperature for long rides', duration: '1-3 hours', energyLevel: 'High', timeOfDay: 'Morning', category: 'Sport' },
      { name: 'Outdoor Dining', icon: Utensils, reason: 'Ideal weather for al fresco meals', duration: '1-2 hours', energyLevel: 'Low', timeOfDay: 'Any', category: 'Culinary' },
      { name: 'Park Picnic', icon: TreePine, reason: 'Comfortable for outdoor relaxation', duration: '2-4 hours', energyLevel: 'Low', timeOfDay: 'Afternoon', category: 'Social' },
      { name: 'Outdoor Concert', icon: Music, reason: 'Pleasant atmosphere for events', duration: '2-4 hours', energyLevel: 'Medium', timeOfDay: 'Evening', category: 'Entertainment' }
    ];
    activities.indoor = [
      { name: 'Shopping Trip', icon: ShoppingBag, reason: 'Comfortable for extended browsing', duration: '2-4 hours', energyLevel: 'Medium', timeOfDay: 'Any', category: 'Shopping' }
    ];
    activities.featured = activities.outdoor[0];
  } else {
    activities.outdoor = [
      { name: 'Beach Day', icon: Waves, reason: 'Perfect for swimming and sunbathing', duration: '4-8 hours', energyLevel: 'Medium', timeOfDay: 'Any', category: 'Recreation' },
      { name: 'Early Morning Run', icon: Sunrise, reason: 'Beat the heat with dawn exercise', duration: '30-60 min', energyLevel: 'High', timeOfDay: 'Morning', category: 'Fitness' },
      { name: 'Water Sports', icon: Waves, reason: 'Cool off with aquatic activities', duration: '2-4 hours', energyLevel: 'High', timeOfDay: 'Any', category: 'Sport' },
      { name: 'Sunset Photography', icon: Camera, reason: 'Golden hour magic in warm weather', duration: '1-2 hours', energyLevel: 'Low', timeOfDay: 'Evening', category: 'Creative' }
    ];
    activities.indoor = [
      { name: 'Mall Shopping', icon: ShoppingBag, reason: 'Air-conditioned comfort', duration: '2-4 hours', energyLevel: 'Low', timeOfDay: 'Any', category: 'Shopping' },
      { name: 'Cinema Experience', icon: Home, reason: 'Cool, comfortable entertainment', duration: '2-3 hours', energyLevel: 'Low', timeOfDay: 'Any', category: 'Entertainment' },
      { name: 'Spa Day', icon: Dumbbell, reason: 'Rejuvenating indoor relaxation', duration: '2-6 hours', energyLevel: 'Low', timeOfDay: 'Any', category: 'Wellness' }
    ];
    activities.featured = activities.outdoor[0];
  }

  if (isWindy && !isRainy) {
    activities.indoor.push({
      name: 'Indoor Rock Climbing', 
      icon: Mountain, 
      reason: 'Avoid gusty outdoor conditions',
      duration: '1-2 hours',
      energyLevel: 'High',
      timeOfDay: 'Any',
      category: 'Sport'
    });
  }

  return activities;
};

const getEnergyColor = (level) => {
  switch (level) {
    case 'High': return 'bg-red-500/20 text-red-800 border-red-300/30';
    case 'Medium': return 'bg-amber-500/20 text-amber-800 border-amber-300/30';
    case 'Low': return 'bg-green-500/20 text-green-800 border-green-300/30';
    default: return 'bg-gray-500/20 text-gray-800 border-gray-300/30';
  }
};

const getTimeIcon = (timeOfDay) => {
  switch (timeOfDay) {
    case 'Morning': return Sunrise;
    case 'Afternoon': return Sun;
    case 'Evening': return Moon;
    default: return Clock;
  }
};

export function ActivitySuggestion({ temperature, condition, windSpeed }) {
  const activities = getActivitySuggestions(temperature, condition, windSpeed);

  return (
    <div className="p-6 bg-white/25 backdrop-blur-xl rounded-2xl shadow-xl border border-white/30 dark:bg-black/20 dark:border-white/20">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-full bg-gradient-to-r from-violet-500 to-purple-600 text-white drop-shadow-md">
          <Star className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-900 drop-shadow-md">Activity Ideas</h3>
          <p className="text-sm text-gray-700 drop-shadow-sm">Perfect activities for {temperature}°C</p>
        </div>
      </div>

      {/* Featured Activity */}
      {activities.featured && (
        <div className="mb-6 p-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl border border-blue-300/30 backdrop-blur-sm">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-blue-500 text-white">
              <activities.featured.icon className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h4 className="font-semibold text-gray-900">🌟 Featured: {activities.featured.name}</h4>
                <Badge variant="secondary" className="text-xs">
                  {activities.featured.category}
                </Badge>
              </div>
              <p className="text-sm text-gray-800 mb-2">{activities.featured.reason}</p>
              <div className="flex items-center gap-4 text-xs text-gray-700">
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {activities.featured.duration}
                </div>
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  {activities.featured.energyLevel} energy
                </div>
                <div className="flex items-center gap-1">
                  {React.createElement(getTimeIcon(activities.featured.timeOfDay), { className: "w-3 h-3" })}
                  {activities.featured.timeOfDay}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6">
        {/* Outdoor Activities */}
        {activities.outdoor.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <TreePine className="w-4 h-4 text-emerald-600" />
              <h4 className="font-semibold text-gray-900">Outdoor Adventures</h4>
              <Badge variant="outline" className="text-xs text-emerald-600 border-emerald-400/30">
                {activities.outdoor.length} options
              </Badge>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {activities.outdoor.map((activity, index) => {
                const TimeIcon = getTimeIcon(activity.timeOfDay);
                return (
                  <div key={index} className="p-3 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 hover:bg-white/15 transition-colors">
                    <div className="flex items-start gap-3">
                      <div className="p-1.5 rounded-md bg-emerald-500/20 text-emerald-600">
                        <activity.icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h5 className="font-medium text-gray-900 text-sm mb-1 truncate">{activity.name}</h5>
                        <p className="text-xs text-gray-700 mb-2 leading-relaxed">{activity.reason}</p>
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge className={`text-xs px-2 py-0.5 ${getEnergyColor(activity.energyLevel)}`}>
                            {activity.energyLevel}
                          </Badge>
                          <div className="flex items-center gap-1 text-xs text-gray-600">
                            <TimeIcon className="w-3 h-3" />
                            {activity.timeOfDay}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Indoor Activities */}
        {activities.indoor.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Home className="w-4 h-4 text-blue-600" />
              <h4 className="font-semibold text-gray-900">Indoor Comfort</h4>
              <Badge variant="outline" className="text-xs text-blue-600 border-blue-400/30">
                {activities.indoor.length} options
              </Badge>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {activities.indoor.map((activity, index) => {
                const TimeIcon = getTimeIcon(activity.timeOfDay);
                return (
                  <div key={index} className="p-3 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 hover:bg-white/15 transition-colors">
                    <div className="flex items-start gap-3">
                      <div className="p-1.5 rounded-md bg-blue-500/20 text-blue-600">
                        <activity.icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h5 className="font-medium text-gray-900 text-sm mb-1 truncate">{activity.name}</h5>
                        <p className="text-xs text-gray-700 mb-2 leading-relaxed">{activity.reason}</p>
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge className={`text-xs px-2 py-0.5 ${getEnergyColor(activity.energyLevel)}`}>
                            {activity.energyLevel}
                          </Badge>
                          <div className="flex items-center gap-1 text-xs text-gray-600">
                            <TimeIcon className="w-3 h-3" />
                            {activity.timeOfDay}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

