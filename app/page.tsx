'use client';

import { useState } from 'react';
import DomeGallery from '@/components/DomeGallery';
import InteractionFlow from '@/components/InteractionFlow';

export default function Home() {
  const [showGallery, setShowGallery] = useState(false);

  const userImages = [
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
  ];

  return (
    <main className="w-screen h-screen bg-[#060010]">
      {!showGallery ? (
        <InteractionFlow onFlowComplete={() => setShowGallery(true)} />
      ) : (
        <>
          <audio src="/pretty.mp3" autoPlay loop className="hidden" />
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
