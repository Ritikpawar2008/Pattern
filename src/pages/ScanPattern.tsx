import React, { useState } from 'react';
import { UserProgress, PatternScanAnalysis, ScanSavedPattern, ScanChatMessage } from '../types';
import { ImageUploader, UploadedFileItem } from '../components/scanner/ImageUploader';
import { ImagePreview } from '../components/scanner/ImagePreview';
import { ScanProgress } from '../components/scanner/ScanProgress';
import { PatternAnalysisView } from '../components/scanner/PatternAnalysisView';
import { ScanHistoryModal } from '../components/scanner/ScanHistoryModal';
import { geminiVisionService } from '../services/geminiVisionService';
import { recordActivity, checkAndUpdateAchievements, saveUserProgress } from '../utils/storage';
import { Bookmark, Sparkles, AlertCircle } from 'lucide-react';

interface ScanPatternProps {
  progress: UserProgress;
  onUpdateProgress: (newProgress: UserProgress) => void;
  onNavigateToPattern?: (patternIdOrName: string) => void;
}

type ScanViewState = 'upload' | 'preview' | 'scanning' | 'result';

export const ScanPattern: React.FC<ScanPatternProps> = ({
  progress,
  onUpdateProgress,
  onNavigateToPattern
}) => {
  const [viewState, setViewState] = useState<ScanViewState>('upload');
  const [selectedImages, setSelectedImages] = useState<UploadedFileItem[]>([]);
  const [scanMode, setScanMode] = useState<'single' | 'compare'>('single');
  const [userPrompt, setUserPrompt] = useState<string>('');
  const [currentAnalysis, setCurrentAnalysis] = useState<PatternScanAnalysis | null>(null);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [isCurrentSaved, setIsCurrentSaved] = useState(false);

  // 1. Triggered when files are uploaded or selected
  const handleImagesReady = (images: UploadedFileItem[], mode: 'single' | 'compare') => {
    setSelectedImages(images);
    setScanMode(mode);
    setViewState('preview');
  };

  // 2. Triggered when user clicks "Analyze Pattern"
  const handleStartAnalysis = async (prompt: string) => {
    setUserPrompt(prompt);
    setViewState('scanning');
    setIsCurrentSaved(false);

    try {
      const payloads = selectedImages.map(img => ({
        base64: img.dataUrl,
        mimeType: img.mimeType,
        name: img.name,
        size: img.size
      }));

      const result = await geminiVisionService.scanPattern(
        payloads,
        prompt,
        scanMode
      );

      setCurrentAnalysis(result);
      setViewState('result');

      // Record activity & update user score (+50 pts)
      let updatedProgress = recordActivity(progress, {
        type: 'image_scanned',
        title: `Scanned: ${result.primaryPattern.name}`,
        detail: `Analyzed ${selectedImages.length} visual target(s) with ${result.primaryPattern.confidence} confidence (+50 pts)`,
        pointsEarned: 50,
        success: true
      });

      updatedProgress = {
        ...updatedProgress,
        score: updatedProgress.score + 50
      };

      updatedProgress = checkAndUpdateAchievements(updatedProgress);
      onUpdateProgress(updatedProgress);
    } catch (err) {
      console.error('Scan execution error:', err);
      // Even if network drops, the fallback in service will ensure result is returned
      setViewState('upload');
    }
  };

  // 3. Save current scan to user progress library
  const handleSaveScan = (chatHistory: ScanChatMessage[]) => {
    if (!currentAnalysis || selectedImages.length === 0) return;

    const newSavedScan: ScanSavedPattern = {
      id: 'scan-' + Date.now().toString(36),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      timestamp: Date.now(),
      imageDataUrl: selectedImages[0].dataUrl,
      comparisonImages: selectedImages.slice(1).map(img => img.dataUrl),
      patternName: currentAnalysis.primaryPattern.name,
      category: currentAnalysis.primaryPattern.category,
      confidence: currentAnalysis.primaryPattern.confidence,
      confidenceScore: currentAnalysis.primaryPattern.confidenceScore,
      shortExplanation: currentAnalysis.reasoning.substring(0, 140) + '...',
      userPrompt: userPrompt || undefined,
      analysis: currentAnalysis,
      chatHistory: chatHistory || []
    };

    const existingScans = progress.savedScans || [];
    const updatedScans = [newSavedScan, ...existingScans];

    let updated = recordActivity(progress, {
      type: 'scan_saved',
      title: `Saved Scan: ${currentAnalysis.primaryPattern.name}`,
      detail: `Archived to personal pattern cognitive library`
    });

    updated = {
      ...updated,
      savedScans: updatedScans
    };

    updated = checkAndUpdateAchievements(updated);
    saveUserProgress(updated);
    onUpdateProgress(updated);
    setIsCurrentSaved(true);
  };

  // 4. Load a saved scan from history
  const handleSelectFromHistory = (savedScan: ScanSavedPattern) => {
    setSelectedImages([
      {
        id: 'saved-main',
        dataUrl: savedScan.imageDataUrl,
        name: savedScan.patternName,
        mimeType: 'image/jpeg',
        size: 20000
      },
      ...(savedScan.comparisonImages || []).map((url, idx) => ({
        id: `saved-comp-${idx}`,
        dataUrl: url,
        name: `Comparison Visual ${idx + 1}`,
        mimeType: 'image/jpeg',
        size: 20000
      }))
    ]);
    setScanMode(savedScan.comparisonImages && savedScan.comparisonImages.length > 0 ? 'compare' : 'single');
    setUserPrompt(savedScan.userPrompt || '');
    setCurrentAnalysis(savedScan.analysis);
    setIsCurrentSaved(true);
    setViewState('result');
  };

  // 5. Delete a saved scan from history
  const handleDeleteScan = (id: string) => {
    const updatedScans = (progress.savedScans || []).filter(s => s.id !== id);
    const updated = {
      ...progress,
      savedScans: updatedScans
    };
    saveUserProgress(updated);
    onUpdateProgress(updated);
  };

  return (
    <div className="min-h-[85vh] py-10 px-4 sm:px-6 lg:px-8 flex flex-col justify-start">
      {/* Top Banner Navigation: Saved Scans Library Button */}
      <div className="max-w-5xl w-full mx-auto flex items-center justify-end pb-6">
        <button
          onClick={() => setIsHistoryModalOpen(true)}
          className="px-4 py-2 rounded-2xl bg-[#111] hover:bg-[#1A1A1A] border border-white/10 text-xs font-mono text-[#F1EBE6] hover:border-[#F26522]/50 flex items-center gap-2 transition-all shadow-sm group"
        >
          <Bookmark className="w-3.5 h-3.5 text-[#F26522] group-hover:scale-110 transition-transform" />
          <span>Saved Scans Library</span>
          {(progress.savedScans?.length || 0) > 0 && (
            <span className="px-1.5 py-0.2 rounded-md bg-[#F26522]/20 border border-[#F26522]/40 text-[#F26522] text-[10px] font-bold">
              {progress.savedScans?.length}
            </span>
          )}
        </button>
      </div>

      {/* Main View Router */}
      <div className="w-full">
        {viewState === 'upload' && (
          <ImageUploader
            onImagesReady={handleImagesReady}
            isComparingInitial={scanMode === 'compare'}
          />
        )}

        {viewState === 'preview' && (
          <ImagePreview
            images={selectedImages}
            mode={scanMode}
            onAnalyze={handleStartAnalysis}
            onReplace={() => setViewState('upload')}
            onRemove={id => {
              const remaining = selectedImages.filter(img => img.id !== id);
              if (remaining.length === 0) {
                setViewState('upload');
              } else {
                setSelectedImages(remaining);
              }
            }}
            onBack={() => setViewState('upload')}
          />
        )}

        {viewState === 'scanning' && (
          <ScanProgress
            imageThumbnailUrl={selectedImages[0]?.dataUrl}
            isMultiImage={selectedImages.length > 1}
          />
        )}

        {viewState === 'result' && currentAnalysis && (
          <PatternAnalysisView
            analysis={currentAnalysis}
            images={selectedImages.map(img => ({
              base64: img.dataUrl,
              mimeType: img.mimeType,
              name: img.name,
              size: img.size
            }))}
            userPrompt={userPrompt}
            isSaved={isCurrentSaved}
            onSave={handleSaveScan}
            onNewScan={() => {
              setSelectedImages([]);
              setCurrentAnalysis(null);
              setUserPrompt('');
              setViewState('upload');
            }}
            onRescanWithPrompt={newPrompt => {
              handleStartAnalysis(newPrompt);
            }}
            onSelectPatternByName={name => {
              if (onNavigateToPattern) {
                onNavigateToPattern(name);
              }
            }}
          />
        )}
      </div>

      {/* Scan History Archive Modal */}
      <ScanHistoryModal
        isOpen={isHistoryModalOpen}
        onClose={() => setIsHistoryModalOpen(false)}
        savedScans={progress.savedScans || []}
        onSelectScan={handleSelectFromHistory}
        onDeleteScan={handleDeleteScan}
      />
    </div>
  );
};
