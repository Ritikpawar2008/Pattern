import React, { useRef, useState, useEffect } from 'react';
import { Camera, RefreshCw, X, AlertCircle, Sparkles } from 'lucide-react';

interface CameraModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCapture: (dataUrl: string) => void;
}

export const CameraModal: React.FC<CameraModalProps> = ({
  isOpen,
  onClose,
  onCapture
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');
  const [isCapturing, setIsCapturing] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      stopStream();
      return;
    }

    startCamera();

    return () => {
      stopStream();
    };
  }, [isOpen, facingMode]);

  const startCamera = async () => {
    setError(null);
    stopStream();

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera access is not supported by your browser environment.');
      }

      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode,
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        },
        audio: false
      });

      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err: any) {
      console.error('Camera access error:', err);
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setError('Camera permission was denied. Please allow camera access in your browser settings to scan live objects.');
      } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
        setError('No camera device detected on this system.');
      } else {
        setError(err.message || 'Unable to initialize video stream. Please upload an image instead.');
      }
    }
  };

  const stopStream = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const handleCapture = () => {
    if (!videoRef.current || !canvasRef.current) return;
    setIsCapturing(true);

    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth || 1280;
    canvas.height = video.videoHeight || 720;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
      stopStream();
      onCapture(dataUrl);
      onClose();
    }
    setIsCapturing(false);
  };

  const toggleFacingMode = () => {
    setFacingMode(prev => (prev === 'environment' ? 'user' : 'environment'));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-[#0B0B0B] border border-white/15 rounded-3xl overflow-hidden shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#111]">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#F26522] animate-pulse" />
            <h3 className="font-display font-bold text-base text-[#F1EBE6]">
              Real-World Pattern Viewfinder
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#8A8582] hover:text-[#F1EBE6] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Viewfinder Video Container */}
        <div className="relative w-full bg-black aspect-video flex items-center justify-center overflow-hidden">
          {error ? (
            <div className="p-8 text-center max-w-md space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-red-900/30 border border-red-500/30 flex items-center justify-center mx-auto text-red-400">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h4 className="font-display font-bold text-base text-[#F1EBE6]">Camera Unavailable</h4>
              <p className="text-xs font-mono text-[#8A8582] leading-relaxed">{error}</p>
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-mono text-[#F1EBE6] transition-all"
              >
                Return to File Upload
              </button>
            </div>
          ) : (
            <>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />

              {/* Reticle Scanner Overlay */}
              <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-6">
                <div className="flex justify-between">
                  <div className="w-8 h-8 border-t-2 border-l-2 border-[#F26522]" />
                  <div className="w-8 h-8 border-t-2 border-r-2 border-[#F26522]" />
                </div>
                <div className="flex items-center justify-center">
                  <div className="w-24 h-24 border border-white/20 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-[#F26522] animate-ping" />
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="w-8 h-8 border-b-2 border-l-2 border-[#F26522]" />
                  <div className="w-8 h-8 border-b-2 border-r-2 border-[#F26522]" />
                </div>
              </div>

              {/* Scanning Light sweep */}
              <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#F26522] to-transparent animate-pulse opacity-75" />
            </>
          )}

          {/* Hidden Canvas for snapshot extraction */}
          <canvas ref={canvasRef} className="hidden" />
        </div>

        {/* Action Controls */}
        {!error && (
          <div className="p-6 bg-[#0E0E0E] border-t border-white/10 flex items-center justify-between">
            <button
              onClick={toggleFacingMode}
              className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-[#8A8582] hover:text-[#F1EBE6] border border-white/5 text-xs font-mono flex items-center gap-2 transition-all"
              title="Switch Camera"
            >
              <RefreshCw className="w-4 h-4" />
              <span className="hidden sm:inline">Flip Camera</span>
            </button>

            <button
              onClick={handleCapture}
              disabled={isCapturing || !stream}
              className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[#F26522] to-[#b3400a] text-white font-mono font-bold text-xs uppercase tracking-wider flex items-center gap-2.5 shadow-[0_0_20px_rgba(242,101,34,0.4)] hover:brightness-110 active:scale-95 transition-all disabled:opacity-50"
            >
              <Camera className="w-4 h-4" />
              <span>Capture &amp; Scan</span>
            </button>

            <div className="text-[11px] font-mono text-[#8A8582] hidden sm:block">
              Center diagram or object in frame
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
