import { UserProgress, ActivityItem, Achievement } from '../types';
import { INITIAL_USER_PROGRESS } from '../data/achievements';

const STORAGE_KEY = 'pattern_app_user_progress_v2';

export const loadUserProgress = (): UserProgress => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return INITIAL_USER_PROGRESS;
    const parsed = JSON.parse(raw);
    return {
      ...INITIAL_USER_PROGRESS,
      ...parsed,
      savedScans: parsed.savedScans || [],
      radarScores: {
        ...INITIAL_USER_PROGRESS.radarScores,
        ...(parsed.radarScores || {})
      },
      categoryAccuracy: {
        ...INITIAL_USER_PROGRESS.categoryAccuracy,
        ...(parsed.categoryAccuracy || {})
      }
    };
  } catch (e) {
    console.error('Failed to load user progress', e);
    return INITIAL_USER_PROGRESS;
  }
};

export const saveUserProgress = (progress: UserProgress): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error('Failed to save user progress', e);
  }
};

export const recordActivity = (
  progress: UserProgress,
  activity: Omit<ActivityItem, 'id' | 'timestamp'>
): UserProgress => {
  const newActivity: ActivityItem = {
    id: 'act-' + Math.random().toString(36).substring(2, 9),
    timestamp: Date.now(),
    ...activity
  };

  const updatedHistory = [newActivity, ...progress.history].slice(0, 30);
  const updatedProgress: UserProgress = {
    ...progress,
    history: updatedHistory
  };

  saveUserProgress(updatedProgress);
  return updatedProgress;
};

export const checkAndUpdateAchievements = (progress: UserProgress): UserProgress => {
  const updatedAchievements = progress.achievements.map((ach): Achievement => {
    if (ach.unlockedAt) return ach;
    let newProgress = ach.progress;
    let isUnlocked = false;

    if (ach.id === 'ach-first-pattern') {
      newProgress = progress.discoveredPatternIds.length;
      isUnlocked = newProgress >= ach.target;
    } else if (ach.id === 'ach-pattern-hunter') {
      newProgress = progress.discoveredPatternIds.length;
      isUnlocked = newProgress >= ach.target;
    } else if (ach.id === 'ach-10-patterns') {
      newProgress = progress.discoveredPatternIds.length;
      isUnlocked = newProgress >= ach.target;
    } else if (ach.id === 'ach-perfect-round') {
      newProgress = progress.completedChallengeIds.length;
      isUnlocked = newProgress >= ach.target;
    } else if (ach.id === 'ach-first-scan') {
      const scanActivities = progress.history.filter(h => h.type === 'image_scanned');
      newProgress = scanActivities.length;
      isUnlocked = newProgress >= ach.target;
    } else if (ach.id === 'ach-scan-archivist') {
      newProgress = progress.savedScans?.length || 0;
      isUnlocked = newProgress >= ach.target;
    } else if (ach.id === 'ach-7-streak') {
      newProgress = progress.score;
      isUnlocked = progress.score >= ach.target;
    }

    if (isUnlocked && !ach.unlockedAt) {
      return {
        ...ach,
        progress: newProgress,
        unlockedAt: Date.now()
      };
    }

    return {
      ...ach,
      progress: Math.min(newProgress, ach.target)
    };
  });

  return {
    ...progress,
    achievements: updatedAchievements
  };
};
