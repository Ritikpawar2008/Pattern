import React, { useState, useRef, useEffect } from 'react';
import { CameraModal } from './CameraModal';
import { SAMPLE_IMAGES, SampleImage } from '../../data/sampleImages';
import {
  Upload,
  Camera,
  Clipboard,
  Sparkles,
  Layers,
  ArrowRight,
  AlertCircle,
  Plus,
  Trash2,
  Image as ImageIcon,
  Check
} from 'lucide-react';

export interface UploadedFileItem {
  id: string;
  dataUrl: string;
  file?: File;
  name: string;
  mimeType: string;
  size: number;
}

interface ImageUploaderProps {
  onImagesReady: (images: UploadedFileItem[], mode: 'single' | 'compare') => void;
  isComparingInitial?: boolean;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  onImagesReady,
  isComparingInitial = false
}) => {
  const [isComparing, setIsComparing] = useState<boolean>(isComparingInitial);
  const [images, setImages] = useState<UploadedFileItem[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pasteSuccess, setPasteSuccess] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Global Clipboard paste listener
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;

      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
          const file = items[i].getAsFile();
          if (file) {
            processFile(file);
            setPasteSuccess(true);
            setTimeout(() => setPasteSuccess(false), 2500);
          }
        }
      }
    };

    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, [images, isComparing]);

  const processFile = (file: File) => {
    setError(null);

    // Validate size (max 25MB)
    if (file.size > 25 * 1024 * 1024) {
      setError('Image is too large (maximum size is 25MB). Please upload a smaller image.');
      return;
    }

    // Supported formats
    const validMimes = ['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif', 'image/svg+xml'];
    if (!validMimes.includes(file.type) && !file.name.match(/\.(jpg|jpeg|png|webp|heic|svg)$/i)) {
      setError('Unsupported file format. Please upload JPG, PNG, WEBP, or HEIC.');
      return;
    }

    const reader = new FileReader();
    reader.onload = e => {
      const dataUrl = e.target?.result as string;
      const newItem: UploadedFileItem = {
        id: 'img-' + Math.random().toString(36).substring(2, 9),
        dataUrl,
        file,
        name: file.name || 'Pasted Image',
        mimeType: file.type || 'image/jpeg',
        size: file.size
      };

      setImages(prev => {
        if (!isComparing) {
          return [newItem];
        }
        if (prev.length >= 3) {
          setError('Maximum of 3 images can be compared simultaneously.');
          return prev;
        }
        return [...prev, newItem];
      });
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    for (let i = 0; i < files.length; i++) {
      processFile(files[i]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (!files || files.length === 0) return;

    for (let i = 0; i < files.length; i++) {
      processFile(files[i]);
    }
  };

  const handleCameraCapture = (dataUrl: string) => {
    const newItem: UploadedFileItem = {
      id: 'cam-' + Math.random().toString(36).substring(2, 9),
      dataUrl,
      name: 'Camera Capture',
      mimeType: 'image/jpeg',
      size: Math.round(dataUrl.length * 0.75)
    };

    setImages(prev => {
      if (!isComparing) {
        return [newItem];
      }
      if (prev.length >= 3) return prev;
      return [...prev, newItem];
    });
  };

  const handleLoadSample = (sample: SampleImage) => {
    const newItem: UploadedFileItem = {
      id: 'sample-' + sample.id,
      dataUrl: sample.dataUrl,
      name: sample.title,
      mimeType: 'image/svg+xml',
      size: 24000
    };

    setImages(prev => {
      if (!isComparing) {
        return [newItem];
      }
      if (prev.length >= 3) return prev;
      return [...prev, newItem];
    });
  };

  const removeImage = (id: string) => {
    setImages(prev => prev.filter(img => img.id !== id));
  };

  const handleProceed = () => {
    if (images.length === 0) {
      setError('Please upload or capture at least one image to analyze.');
      return;
    }
    onImagesReady(images, isComparing ? 'compare' : 'single');
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-10">
      {/* 1. Header Section */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F26522]/15 border border-[#F26522]/30 text-[#F26522] text-xs font-mono font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Multimodal Vision Intelligence</span>
        </div>

        <h1 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-[#F1EBE6] tracking-tight">
          WHAT DO YOU SEE?
        </h1>

        <p className="font-mono text-base sm:text-lg text-[#8A8582] max-w-2xl mx-auto">
          Upload an image. Let <span className="text-[#F26522] font-semibold">PATTERN</span> look deeper.
        </p>

        {/* Mode Selector Tabs */}
        <div className="flex items-center justify-center gap-2 pt-4">
          <div className="p-1 rounded-2xl bg-[#111] border border-white/10 flex items-center">
            <button
              onClick={() => {
                setIsComparing(false);
                if (images.length > 1) setImages([images[0]]);
              }}
              className={`px-5 py-2 rounded-xl text-xs font-mono transition-all flex items-center gap-2 ${
                !isComparing
                  ? 'bg-white/10 text-[#F1EBE6] shadow-sm font-semibold border border-white/10'
                  : 'text-[#8A8582] hover:text-[#F1EBE6]'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5 text-[#F26522]" />
              <span>Single Scan</span>
            </button>

            <button
              onClick={() => setIsComparing(true)}
              className={`px-5 py-2 rounded-xl text-xs font-mono transition-all flex items-center gap-2 ${
                isComparing
                  ? 'bg-[#F26522]/20 text-[#F26522] shadow-sm font-semibold border border-[#F26522]/40'
                  : 'text-[#8A8582] hover:text-[#F1EBE6]'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Compare Patterns (Up to 3)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="p-4 rounded-2xl bg-red-950/60 border border-red-500/40 text-xs font-mono text-red-300 flex items-center justify-between animate-in fade-in">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{error}</span>
          </div>
          <button onClick={() => setError(null)} className="text-red-400 hover:text-white font-bold ml-4">
            Dismiss
          </button>
        </div>
      )}

      {/* 2. Drag-and-Drop Vision Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative group cursor-pointer p-10 sm:p-14 rounded-3xl border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center text-center overflow-hidden ${
          isDragging
            ? 'border-[#F26522] bg-[#F26522]/10 scale-[1.01]'
            : 'border-white/15 bg-[#090909] hover:border-white/30 hover:bg-[#0D0D0D]'
        }`}
      >
        {/* Technical Reticle Corner Brackets */}
        <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-white/20 group-hover:border-[#F26522] transition-colors" />
        <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-white/20 group-hover:border-[#F26522] transition-colors" />
        <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-white/20 group-hover:border-[#F26522] transition-colors" />
        <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-white/20 group-hover:border-[#F26522] transition-colors" />

        {/* Ambient Grid Effect */}
        <div className="absolute inset-0 bg-[radial-gradient(#F26522_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center space-y-4 max-w-md">
          <div className="w-16 h-16 rounded-2xl bg-[#141414] border border-white/10 group-hover:border-[#F26522]/60 flex items-center justify-center text-[#F26522] shadow-[0_0_20px_rgba(242,101,34,0.1)] group-hover:scale-110 transition-all">
            <Upload className="w-7 h-7" />
          </div>

          <div className="space-y-1.5">
            <h3 className="font-display font-bold text-xl sm:text-2xl text-[#F1EBE6]">
              Drop an image here
            </h3>
            <p className="text-xs font-mono text-[#8A8582]">
              or <span className="text-[#F26522] font-semibold underline underline-offset-4">browse files</span> from your device
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-[10px] font-mono text-[#8A8582]">
            <span className="px-2.5 py-1 rounded bg-white/5 border border-white/5">JPG</span>
            <span className="px-2.5 py-1 rounded bg-white/5 border border-white/5">PNG</span>
            <span className="px-2.5 py-1 rounded bg-white/5 border border-white/5">WEBP</span>
            <span className="px-2.5 py-1 rounded bg-white/5 border border-white/5">HEIC</span>
            <span className="px-2.5 py-1 rounded bg-white/5 border border-white/5">SVG</span>
          </div>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,.heic,.heif"
          multiple={isComparing}
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {/* 3. Fast Input Secondary Actions (Camera + Paste) */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={() => setIsCameraOpen(true)}
          className="px-5 py-3 rounded-2xl bg-[#111] hover:bg-[#1A1A1A] border border-white/10 text-xs font-mono text-[#F1EBE6] hover:border-[#F26522]/50 flex items-center gap-2.5 transition-all shadow-sm group"
        >
          <Camera className="w-4 h-4 text-[#F26522] group-hover:scale-110 transition-transform" />
          <span>Use Camera</span>
        </button>

        <button
          onClick={async () => {
            try {
              const clipboardItems = await navigator.clipboard.read();
              for (const item of clipboardItems) {
                const imageType = item.types.find(t => t.startsWith('image/'));
                if (imageType) {
                  const blob = await item.getType(imageType);
                  const file = new File([blob], 'clipboard-image.png', { type: imageType });
                  processFile(file);
                  setPasteSuccess(true);
                  setTimeout(() => setPasteSuccess(false), 2500);
                  return;
                }
              }
              setError('No image found on clipboard. Copy an image first (Ctrl+C / Cmd+C).');
            } catch (err) {
              setError('To paste an image, click anywhere on this page and press Ctrl+V / Cmd+V.');
            }
          }}
          className="px-5 py-3 rounded-2xl bg-[#111] hover:bg-[#1A1A1A] border border-white/10 text-xs font-mono text-[#F1EBE6] hover:border-[#F26522]/50 flex items-center gap-2.5 transition-all shadow-sm group"
        >
          {pasteSuccess ? (
            <>
              <Check className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-400">Pasted Image!</span>
            </>
          ) : (
            <>
              <Clipboard className="w-4 h-4 text-[#8A8582] group-hover:text-[#F26522] transition-colors" />
              <span>Paste Image (⌘V)</span>
            </>
          )}
        </button>
      </div>

      {/* 4. Uploaded Items Tray & Quick Preview */}
      {images.length > 0 && (
        <div className="p-6 rounded-3xl bg-[#0E0E0E] border border-white/10 space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <h3 className="font-mono text-xs uppercase font-bold text-[#F1EBE6] tracking-wider">
                {isComparing ? `Images Ready For Comparison (${images.length}/3)` : 'Image Selected'}
              </h3>
            </div>
            {isComparing && images.length < 3 && (
              <button
                onClick={() => fileInputRef.current?.click()}
                className="text-xs font-mono text-[#F26522] hover:underline flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Image #{images.length + 1}</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {images.map((img, idx) => (
              <div
                key={img.id}
                className="relative rounded-2xl bg-black border border-white/10 overflow-hidden group aspect-video flex items-center justify-center p-2"
              >
                <img
                  src={img.dataUrl}
                  alt={img.name}
                  className="w-full h-full object-contain"
                />
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/80 border border-white/10 text-[10px] font-mono text-[#F1EBE6]">
                  Image {String.fromCharCode(65 + idx)}
                </div>
                <button
                  onClick={e => {
                    e.stopPropagation();
                    removeImage(img.id);
                  }}
                  className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/80 hover:bg-red-950 text-[#8A8582] hover:text-red-400 transition-colors border border-white/10"
                  title="Remove image"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

          <div className="pt-2 flex justify-end">
            <button
              onClick={handleProceed}
              className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[#F26522] to-[#b3400a] text-white font-mono font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-[0_0_20px_rgba(242,101,34,0.4)] hover:brightness-110 active:scale-95 transition-all"
            >
              <span>Inspect &amp; Guide Analysis</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* 5. One-Click Sample Patterns Strip */}
      <div className="space-y-4 pt-6 border-t border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#F26522]" />
            <h3 className="font-mono text-xs uppercase tracking-wider font-semibold text-[#F1EBE6]">
              Instant Sample Images (1-Click Test)
            </h3>
          </div>
          <span className="text-[11px] font-mono text-[#8A8582]">Select to scan instantly</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3.5">
          {SAMPLE_IMAGES.map(sample => (
            <div
              key={sample.id}
              onClick={() => handleLoadSample(sample)}
              className="p-3.5 rounded-2xl bg-[#0E0E0E] border border-white/10 hover:border-[#F26522]/60 cursor-pointer transition-all flex flex-col justify-between group hover:scale-[1.02]"
            >
              <div className="space-y-2">
                <div className="w-full aspect-video rounded-xl bg-black border border-white/5 overflow-hidden flex items-center justify-center p-1">
                  <img
                    src={sample.dataUrl}
                    alt={sample.title}
                    className="w-full h-full object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                  />
                </div>
                <div>
                  <span className="text-[9px] font-mono uppercase text-[#F26522] font-semibold block">
                    {sample.category}
                  </span>
                  <h4 className="font-display font-bold text-xs text-[#F1EBE6] group-hover:text-[#F26522] transition-colors line-clamp-1">
                    {sample.title}
                  </h4>
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-[#8A8582] group-hover:text-white">
                <span>Load Visual</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Camera Live Modal */}
      <CameraModal
        isOpen={isCameraOpen}
        onClose={() => setIsCameraOpen(false)}
        onCapture={handleCameraCapture}
      />
    </div>
  );
};
