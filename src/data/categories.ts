import { Category } from '../types';

export const CATEGORIES: Category[] = [
  {
    id: 'human',
    name: 'Human Behavior',
    tagline: 'Habits, biases, emotions & social loops',
    description: 'The recurring mental models, psychological feedback loops, and cognitive biases that drive human decisions and relationship dynamics.',
    iconName: 'UserCheck',
    accentColor: '#F26522',
    patternCount: 6
  },
  {
    id: 'business',
    name: 'Business',
    tagline: 'Growth cycles, market dynamics & scaling laws',
    description: 'How companies scale, compete, plateau, and collapse under unit economics, moats, and operational bottlenecks.',
    iconName: 'TrendingUp',
    accentColor: '#E65100',
    patternCount: 8
  },
  {
    id: 'technology',
    name: 'Technology',
    tagline: 'Network effects, adoption curves & lock-ins',
    description: 'How protocols, platforms, and hardware proliferate via S-curves, standards competition, and digital compounding.',
    iconName: 'Cpu',
    accentColor: '#FF7A00',
    patternCount: 7
  },
  {
    id: 'nature',
    name: 'Nature & Biology',
    tagline: 'Cycles, adaptation, symmetry & emergence',
    description: 'Evolutionary arms races, predatory equilibrium, metabolic scaling, and self-organizing organic structures.',
    iconName: 'Leaf',
    accentColor: '#D97706',
    patternCount: 5
  },
  {
    id: 'history',
    name: 'History',
    tagline: 'Civilization arcs, recurring wars & structural shifts',
    description: 'Long-term secular cycles, institutional decay, pendulum swings between centralization and decentralization.',
    iconName: 'Hourglass',
    accentColor: '#B45309',
    patternCount: 4
  },
  {
    id: 'society',
    name: 'Society & Culture',
    tagline: 'Memetics, polarization, cascades & tribalism',
    description: 'How information cascades, cultural norms, status games, and social contagion propagate through human networks.',
    iconName: 'Users',
    accentColor: '#EA580C',
    patternCount: 5
  },
  {
    id: 'markets',
    name: 'Markets & Finance',
    tagline: 'Boom, bubbles, panic, reflexivity & cycles',
    description: 'The interplay between liquidity, sentiment, leverage, and price discovery in open financial systems.',
    iconName: 'Activity',
    accentColor: '#F97316',
    patternCount: 6
  },
  {
    id: 'everyday',
    name: 'Everyday Life',
    tagline: 'Routines, micro-compounding & time allocation',
    description: 'The invisible micro-patterns shaping your daily productivity, energy levels, personal finances, and relationships.',
    iconName: 'Clock',
    accentColor: '#FB923C',
    patternCount: 5
  }
];

export const getCategoryById = (id: string): Category => {
  return CATEGORIES.find(c => c.id === id) || CATEGORIES[0];
};
