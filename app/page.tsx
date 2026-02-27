'use client';

import { useState, useRef, useEffect } from 'react';
import DomeGallery from '@/components/DomeGallery';
import InteractionFlow from '@/components/InteractionFlow';

// Fungsi untuk mengacak array
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export default function Home() {
  const [showGallery, setShowGallery] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  useEffect(() => {
    // Permit autoplay setelah user pertama kali interact dengan page
    const handleUserInteraction = async () => {
      if (audioRef.current && showGallery && !isAudioPlaying) {
        try {
          audioRef.current.muted = false;
          await audioRef.current.play();
          setIsAudioPlaying(true);
        } catch (error) {
          console.log('Autoplay failed:', error);
        }
      }
    };

    if (showGallery) {
      // Auto unmute dan play setelah gallery ditampilkan
      const timer = setTimeout(() => {
        handleUserInteraction();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [showGallery, isAudioPlaying]);

  const toggleAudio = async () => {
    if (audioRef.current) {
      if (isAudioPlaying) {
        audioRef.current.pause();
        setIsAudioPlaying(false);
      } else {
        try {
          audioRef.current.muted = false;
          await audioRef.current.play();
          setIsAudioPlaying(true);
        } catch (error) {
          console.log('Play failed:', error);
        }
      }
    }
  };

  const initialImages = [
    '/image3.jpeg',
    '/image4.jpeg',
    '/image5.jpeg',
    '/image6.jpeg',
    '/image7.jpeg',
    '/image8.jpeg',
    '/image9.jpeg',
    '/image10.jpeg',
    '/image11.jpeg',
    '/image12.jpeg',
    '/image13.jpeg',
    '/image14.jpeg',
    '/image15.jpeg',
    '/image16.jpeg',
    '/image17.jpeg',
    '/image18.jpeg',
    '/image19.jpeg',
    '/image20.jpeg',
    '/image21.jpeg',
    '/image22.jpeg',
    '/image23.jpeg',
    '/image24.jpeg',
    '/image25.jpeg',
    '/image26.jpeg',
    '/image27.jpeg',
    '/image28.jpeg',
    '/image29.jpeg',
    '/image30.jpeg',
    '/image31.jpeg',
    '/image32.jpeg',
    '/image33.jpeg',
    '/image34.jpeg',
    '/image35.jpeg',
    '/image36.jpeg',
    '/image37.jpeg',
    '/image38.jpeg',
    '/image39.jpeg',
  ];
  const [userImages, setUserImages] = useState<string[]>([]);

  // Shuffle once on the client after mount to avoid hydration mismatches
  useEffect(() => {
    setUserImages(shuffleArray(initialImages));
  }, []);

  return (
    <main className="w-screen h-screen bg-[#060010]">
      <audio 
        ref={audioRef}
        src="/pretty.mp3" 
        loop 
        muted
        onPlay={() => setIsAudioPlaying(true)}
        onPause={() => setIsAudioPlaying(false)}
      />
      {!showGallery ? (
        <InteractionFlow onFlowComplete={() => setShowGallery(true)} />
      ) : (
        <>
          {/* Audio Control Button */}
          <button
            onClick={toggleAudio}
            className="fixed top-6 right-6 z-50 w-12 h-12 rounded-full bg-pink-500/20 hover:bg-pink-500/40 border border-pink-500/50 flex items-center justify-center transition-all duration-300"
            title={isAudioPlaying ? 'Mute audio' : 'Play audio'}
          >
            {isAudioPlaying ? (
              <svg className="w-6 h-6 text-pink-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 3a1 1 0 00-1 1v5a1 1 0 002 0V4a1 1 0 00-1-1zm0 10a1 1 0 00-1 1v1a1 1 0 002 0v-1a1 1 0 00-1-1zm4-3a1 1 0 011-1 7 7 0 000-14 1 1 0 010-2 9 9 0 010 18 1 1 0 010-2 7 7 0 000-2 1 1 0 01-1-1zm0 6a1 1 0 011-1 5 5 0 000-10 1 1 0 010-2 7 7 0 010 14 1 1 0 01-1-1z" />
              </svg>
            ) : (
              <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M13.414 1.707a2 2 0 012.828 0l2.121 2.121a2 2 0 010 2.828l-2.121 2.121a2 2 0 11-2.828-2.828L15.414 4l-2.828-2.293a2 2 0 010-2.828zM9 5a4 4 0 00-4 4v6a4 4 0 008 0V9a4 4 0 00-4-4z" clipRule="evenodd" />
              </svg>
            )}
          </button>
          <DomeGallery
            images={userImages}
            fit={0.8}
            minRadius={600}
            maxVerticalRotationDeg={0}
            segments={34}
            dragDampening={2}
            grayscale={false}
            autoRotationSpeed={0.1}
          />
        </>
      )}
    </main>
  );
}
