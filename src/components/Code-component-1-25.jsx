import { Bike, Home, BookOpen, Gamepad2, Coffee, Mountain, Waves, TreePine } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

const getActivitySuggestions = (temp, condition, windSpeed) => {
  const isRainy = condition.toLowerCase().includes('rain') || condition.toLowerCase().includes('storm');
  const isSunny = condition.toLowerCase().includes('sun') || condition.toLowerCase().includes('clear');
  const isWindy = windSpeed > 20;
  
  let activities = {
    outdoor: [],
    indoor: [],
    primaryIcon: Home,
    primaryActivity: ''
  };

  if (isRainy) {
    activities.indoor = [
      { name: 'Read a good book', icon: BookOpen, reason: 'Perfect rainy day activity' },
      { name: 'Watch movies', icon: Home, reason: 'Cozy indoor time' },
      { name: 'Board games', icon: Gamepad2, reason: 'Fun with family/friends' },
      { name: 'Visit a café', icon: Coffee, reason: 'Warm and dry environment' }
    ];
    activities.primaryIcon = BookOpen;
    activities.primaryActivity = 'Perfect day for indoor activities';
  } else if (temp < 5) {
    activities.indoor = [
      { name: 'Home workout', icon: Home, reason: 'Stay warm and active' },
      { name: 'Cooking project', icon: Home, reason: 'Warm up the kitchen' },
      { name: 'Gaming session', icon: Gamepad2, reason: 'Stay cozy indoors' }
    ];
    activities.outdoor = [
      { name: 'Winter sports', icon: Mountain, reason: 'If you love the cold!' }
    ];
    activities.primaryIcon = Home;
    activities.primaryActivity = 'Stay warm indoors';
  } else if (temp < 15) {
    activities.outdoor = [
      { name: 'Brisk walk', icon: TreePine, reason: 'Fresh air, moderate temp' },
      { name: 'Photography', icon: Mountain, reason: 'Clear, crisp conditions' }
    ];
    activities.indoor = [
      { name: 'Visit museum', icon: BookOpen, reason: 'Cultural indoor activity' },
      { name: 'Coffee shop work', icon: Coffee, reason: 'Warm, productive space' }
    ];
    activities.primaryIcon = TreePine;
    activities.primaryActivity = 'Great for outdoor walks';
  } else if (temp < 25) {
    activities.outdoor = [
      { name: 'Cycling', icon: Bike, reason: 'Perfect temperature for biking' },
      { name: 'Hiking', icon: Mountain, reason: 'Comfortable for longer walks' },
      { name: 'Outdoor dining', icon: Coffee, reason: 'Pleasant weather for terraces' }
    ];
    activities.indoor = [
      { name: 'Shopping', icon: Home, reason: 'Comfortable temperature' }
    ];
    activities.primaryIcon = Bike;
    activities.primaryActivity = 'Perfect for outdoor activities';
  } else {
    activities.outdoor = [
      { name: 'Swimming', icon: Waves, reason: 'Cool off in the heat' },
      { name: 'Beach activities', icon: Waves, reason: 'Hot weather fun' },
      { name: 'Early morning jog', icon: Mountain, reason: 'Before it gets too hot' },
      { name: 'Outdoor sports', icon: Bike, reason: 'Great weather for activity' }
    ];
    activities.indoor = [
      { name: 'Air-conditioned mall', icon: Home, reason: 'Escape the heat' },
      { name: 'Movie theater', icon: Home, reason: 'Cool, comfortable environment' }
    ];
    activities.primaryIcon = Waves;
    activities.primaryActivity = 'Hot weather activities';
  }

  if (isWindy && !isRainy) {
    activities.indoor.push(
      { name: 'Indoor sports', icon: Home, reason: 'Avoid strong winds' }
    );
  }

  return activities;
};

export function ActivitySuggestion({ temperature, condition, windSpeed }) {
  const activities = getActivitySuggestions(temperature, condition, windSpeed);
  const PrimaryIcon = activities.primaryIcon;

  return (
    <Card className="p-6">
      <div className="flex items-center space-x-3 mb-4">
        <div className="p-2 rounded-full bg-purple-500 text-white">
          <PrimaryIcon className="w-5 h-5" />
        </div>
        <h3 className="text-xl font-semibold">Activity Ideas</h3>
      </div>
      
      <div className="space-y-4">
        <p className="text-muted-foreground">{activities.primaryActivity}</p>
        
        {activities.outdoor.length > 0 && (
          <div>
            <h4 className="font-medium mb-2 text-green-600">🌳 Outdoor Activities:</h4>
            <div className="space-y-2">
              {activities.outdoor.map((activity, index) => {
                const Icon = activity.icon;
                return (
                  <div key={index} className="flex items-center space-x-2">
                    <Icon className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium">{activity.name}</span>
                    <span className="text-xs text-muted-foreground">- {activity.reason}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        
        {activities.indoor.length > 0 && (
          <div>
            <h4 className="font-medium mb-2 text-blue-600">🏠 Indoor Activities:</h4>
            <div className="space-y-2">
              {activities.indoor.map((activity, index) => {
                const Icon = activity.icon;
                return (
                  <div key={index} className="flex items-center space-x-2">
                    <Icon className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium">{activity.name}</span>
                    <span className="text-xs text-muted-foreground">- {activity.reason}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
