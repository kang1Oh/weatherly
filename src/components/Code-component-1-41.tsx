import { Shirt, Activity, MoreHorizontal } from 'lucide-react';
import { Button } from './ui/button';

interface LifestyleToggleProps {
  mode: 'outfit' | 'activity' | 'both';
  onModeChange: (mode: 'outfit' | 'activity' | 'both') => void;
}

export function LifestyleToggle({ mode, onModeChange }: LifestyleToggleProps) {
  return (
    <div className="flex items-center space-x-2 bg-muted p-1 rounded-lg">
      <Button
        variant={mode === 'outfit' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onModeChange('outfit')}
        className="flex items-center space-x-2"
      >
        <Shirt className="w-4 h-4" />
        <span>Outfits</span>
      </Button>
      
      <Button
        variant={mode === 'activity' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onModeChange('activity')}
        className="flex items-center space-x-2"
      >
        <Activity className="w-4 h-4" />
        <span>Activities</span>
      </Button>
      
      <Button
        variant={mode === 'both' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onModeChange('both')}
        className="flex items-center space-x-2"
      >
        <MoreHorizontal className="w-4 h-4" />
        <span>Both</span>
      </Button>
    </div>
  );
}