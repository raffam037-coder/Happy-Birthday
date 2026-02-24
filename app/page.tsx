'use client';

import { useState } from 'react';
import DomeGallery from '@/components/DomeGallery';
import InteractionFlow from '@/components/InteractionFlow';

export default function Home() {
  const [showGallery, setShowGallery] = useState(false);

  const userImages = [
    '/images/image3.jpeg',
    '/images/image4.jpeg',
    '/images/image5.jpeg',
    '/images/image6.jpeg',
    '/images/image7.jpeg',
    '/images/image8.jpeg',
    '/images/image9.jpeg',
    '/images/image10.jpeg',
    '/images/image11.jpeg',
    '/images/image12.jpeg',
    '/images/image13.jpeg',
    '/images/image14.jpeg',
    '/images/image15.jpeg',
    '/images/image16.jpeg',
    '/images/image17.jpeg',
    '/images/image18.jpeg',
    '/images/image19.jpeg',
    '/images/image20.jpeg',
    '/images/image21.jpeg',
    '/images/image22.jpeg',
    '/images/image23.jpeg',
    '/images/image24.jpeg',
    '/images/image25.jpeg',
    '/images/image26.jpeg',
    '/images/image27.jpeg',
    '/images/image28.jpeg',
    '/images/image29.jpeg',
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
