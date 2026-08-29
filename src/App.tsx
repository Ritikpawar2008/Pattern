import React, { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { AuthModal } from './components/auth/AuthModal';
import { Home } from './pages/Home';
import { Explore } from './pages/Explore';
import { PatternDetail } from './pages/PatternDetail';
import { PatternMapPage } from './pages/PatternMapPage';
import { SpotThePattern } from './pages/SpotThePattern';
import { SituationAnalyzer } from './pages/SituationAnalyzer';
import { ScanPattern } from './pages/ScanPattern';
import { CaseStudiesPage } from './pages/CaseStudiesPage';
import { MyProgress } from './pages/MyProgress';
import { AboutPage } from './pages/AboutPage';
import { AuthPage } from './pages/AuthPage';
import { PATTERNS } from './data/patterns';
import { UserProgress } from './types';
import { authService, AuthUser } from './services/supabaseClient';
import {
  loadUserProgress,
  saveUserProgress,
  recordActivity,
  checkAndUpdateAchievements
} from './utils/storage';

export function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [selectedPatternId, setSelectedPatternId] = useState<string | null>(null);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [userProgress, setUserProgress] = useState<UserProgress>(loadUserProgress());

  // Check existing Supabase session on startup
  useEffect(() => {
    authService.getCurrentUser().then(user => {
      if (user) {
        setCurrentUser(user);
      }
    });
  }, []);

  // Save progress changes locally and sync to cloud if authenticated
  useEffect(() => {
    saveUserProgress(userProgress);
    if (currentUser?.id) {
      authService.syncProgress(currentUser.id, userProgress);
    }
  }, [userProgress, currentUser]);

  // Global keyboard shortcut for search (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Navigation handler
  const handleNavigate = (tab: string, extraId?: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (tab === 'explore' && extraId) {
      setSelectedCategoryFilter(extraId);
    }
    setCurrentTab(tab);
    setSelectedPatternId(null);
  };

  // Direct Pattern inspection handler
  const handleSelectPattern = (patternId: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setSelectedPatternId(patternId);
    setCurrentTab('detail');

    // Record pattern discovery in user progress
    if (!userProgress.discoveredPatternIds.includes(patternId)) {
      setUserProgress(prev => {
        const updated = {
          ...prev,
          discoveredPatternIds: [...prev.discoveredPatternIds, patternId]
        };
        const withAct = recordActivity(updated, {
          type: 'pattern_discovered',
          title: `Discovered new pattern`,
          detail: `Explored pattern details`
        });
        return checkAndUpdateAchievements(withAct);
      });
    }
  };

  // Toggle bookmark handler
  const handleToggleBookmark = (patternId: string) => {
    setUserProgress(prev => {
      const isAlready = prev.bookmarkedPatternIds.includes(patternId);
      const updatedList = isAlready
        ? prev.bookmarkedPatternIds.filter(id => id !== patternId)
        : [...prev.bookmarkedPatternIds, patternId];

      const updated: UserProgress = {
        ...prev,
        bookmarkedPatternIds: updatedList
      };

      const withAct = recordActivity(updated, {
        type: 'pattern_discovered',
        title: isAlready ? 'Removed bookmark' : 'Saved pattern bookmark',
        detail: `Updated your study list`
      });

      return checkAndUpdateAchievements(withAct);
    });
  };

  // Update challenge score handler
  const handleUpdateScore = (
    points: number,
    challengeId: string,
    isCorrect: boolean,
    category: string
  ) => {
    setUserProgress(prev => {
      const prevAcc = prev.categoryAccuracy[category] || { correct: 0, total: 0 };
      const newAcc = {
        ...prev.categoryAccuracy,
        [category]: {
          correct: prevAcc.correct + (isCorrect ? 1 : 0),
          total: prevAcc.total + 1
        }
      };

      const completedIds = isCorrect && !prev.completedChallengeIds.includes(challengeId)
        ? [...prev.completedChallengeIds, challengeId]
        : prev.completedChallengeIds;

      const newScore = prev.score + points;

      const updated: UserProgress = {
        ...prev,
        score: newScore,
        completedChallengeIds: completedIds,
        categoryAccuracy: newAcc
      };

      const withAct = recordActivity(updated, {
        type: 'challenge_completed',
        title: isCorrect ? 'Solved challenge' : 'Attempted challenge',
        detail: isCorrect ? `Earned +${points} pts in ${category}` : `Reviewed diagnosis in ${category}`,
        pointsEarned: points,
        success: isCorrect
      });

      return checkAndUpdateAchievements(withAct);
    });
  };

  // Record Situation Analysis in History
  const handleRecordAnalysis = (patternName: string) => {
    setUserProgress(prev => {
      const withAct = recordActivity(prev, {
        type: 'situation_analyzed',
        title: `Analyzed situation`,
        detail: `Detected ${patternName}`
      });
      return checkAndUpdateAchievements(withAct);
    });
  };

  // Complete prediction scenario inside pattern detail
  const handleCompletePrediction = (patternId: string, isCorrect: boolean) => {
    setUserProgress(prev => {
      const points = isCorrect ? 100 : 25;
      const updated: UserProgress = {
        ...prev,
        score: prev.score + points
      };
      const withAct = recordActivity(updated, {
        type: 'challenge_completed',
        title: isCorrect ? 'Correct Outcome Prediction' : 'Prediction Attempt',
        detail: isCorrect ? `+100 pts earned` : `Reviewed outcome mechanics`,
        pointsEarned: points,
        success: isCorrect
      });
      return checkAndUpdateAchievements(withAct);
    });
  };

  const handleAuthSuccess = (user: AuthUser) => {
    setCurrentUser(user);
    setIsAuthModalOpen(false);
  };

  const handleSignOut = async () => {
    await authService.signOut();
    setCurrentUser(null);
    if (currentTab === 'auth') {
      setCurrentTab('home');
    }
  };

  return (
    <div className="min-h-screen bg-[#090908] text-[#F7F4EE] flex flex-col font-sans selection:bg-[#E4572E] selection:text-white">
      {/* Top Floating Glassmorphic Header */}
      <Navbar
        currentTab={currentTab}
        onNavigate={handleNavigate}
        userProgress={userProgress}
        onOpenSearch={() => setIsSearchOpen(true)}
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onSignOut={handleSignOut}
      />

      {/* Main Page Routing Container */}
      <main className="flex-1 w-full">
        {currentTab === 'home' && (
          <Home onNavigate={handleNavigate} onSelectPattern={handleSelectPattern} />
        )}

        {currentTab === 'auth' && (
          <AuthPage
            currentUser={currentUser}
            onAuthSuccess={handleAuthSuccess}
            onSignOut={handleSignOut}
            userProgress={userProgress}
            onNavigate={handleNavigate}
          />
        )}

        {currentTab === 'explore' && (
          <Explore
            initialCategory={selectedCategoryFilter}
            onSelectPattern={handleSelectPattern}
            userProgress={userProgress}
            onToggleBookmark={handleToggleBookmark}
          />
        )}

        {currentTab === 'detail' && selectedPatternId && (
          <PatternDetail
            patternId={selectedPatternId}
            onBack={() => setCurrentTab('explore')}
            onSelectPattern={handleSelectPattern}
            userProgress={userProgress}
            onToggleBookmark={handleToggleBookmark}
            onCompletePrediction={handleCompletePrediction}
          />
        )}

        {currentTab === 'map' && (
          <PatternMapPage onSelectPattern={handleSelectPattern} />
        )}

        {currentTab === 'spot' && (
          <SpotThePattern
            userProgress={userProgress}
            onUpdateScore={handleUpdateScore}
            onSelectPattern={handleSelectPattern}
          />
        )}

        {currentTab === 'scan' && (
          <ScanPattern
            progress={userProgress}
            onUpdateProgress={setUserProgress}
            onNavigateToPattern={patternIdOrName => {
              const matched = PATTERNS.find(
                p =>
                  p.id === patternIdOrName ||
                  p.title.toLowerCase() === patternIdOrName.toLowerCase() ||
                  p.title.toLowerCase().includes(patternIdOrName.toLowerCase())
              );
              if (matched) {
                handleSelectPattern(matched.id);
              } else {
                handleNavigate('explore');
              }
            }}
          />
        )}

        {currentTab === 'analyze' && (
          <SituationAnalyzer
            onSelectPattern={handleSelectPattern}
            userProgress={userProgress}
            onRecordAnalysis={handleRecordAnalysis}
          />
        )}

        {currentTab === 'cases' && (
          <CaseStudiesPage onSelectPattern={handleSelectPattern} />
        )}

        {currentTab === 'progress' && (
          <MyProgress
            userProgress={userProgress}
            onNavigate={handleNavigate}
            onSelectPattern={handleSelectPattern}
          />
        )}

        {currentTab === 'about' && (
          <AboutPage onNavigate={handleNavigate} />
        )}
      </main>

      {/* Global Search Dialog Modal */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectPattern={handleSelectPattern}
        onSelectCase={caseId => {
          handleNavigate('cases');
          setIsSearchOpen(false);
        }}
        onSelectCategory={catId => {
          handleNavigate('explore', catId);
          setIsSearchOpen(false);
        }}
      />

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthSuccess={handleAuthSuccess}
      />

      {/* Global Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
export default App;
