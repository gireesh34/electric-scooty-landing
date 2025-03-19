"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Zap } from "lucide-react";
import gsap from "gsap";

const colors = [
  { id: "green", image: "/green.png" },
  { id: "yellow", image: "/yellow.png" },
  { id: "red", image: "/red.png" },
  { id: "silver", image: "/grey.png" },
];

interface ColorSelectorProps {
  showImageSection?: boolean;
}

export default function ColorSelector({ showImageSection = true }: ColorSelectorProps) {
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [rotation, setRotation] = useState(0);
  const [flipRotation, setFlipRotation] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [flipCount, setFlipCount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const circleRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const linesRef = useRef(null);
  const centralCircleRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const tl = gsap.timeline();

    return () => {
      tl.kill();
    };
  }, []);

  const handleColorChange = (color: typeof colors[0]) => {
    if (color.id !== selectedColor.id) {
      setSelectedColor(color);
      setRotation(rotation + 90);
    }
  };

  const handleFlip = () => {
    setIsFlipped(prev => !prev);
    setFlipCount(prev => prev + 1);
    setFlipRotation(prev => (flipCount + 1) * 180);
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center [&_.backface-hidden]:backface-visibility-hidden">
      <div className="w-full h-full py-2 md:py-4 lg:py-8">
        <div className="container h-full mx-auto px-2 sm:px-2 md:px-4">
          <div className="flex flex-col lg:flex-row items-center justify-center h-full gap-4 lg:gap-12">
            {/* Image Section */}
            <div className="flex-1 flex justify-center items-center w-full h-full max-w-3xl overflow-hidden"> 
              <div 
                onClick={handleFlip} 
                className="relative cursor-pointer w-[140%] h-full flex items-center justify-center"
                style={{ 
                  transform: `rotateY(${flipRotation}deg)`,
                  transition: 'transform 1000ms',
                  transformStyle: 'preserve-3d'
                }}
              >
                <Image
                  src={selectedColor.image}
                  alt={`REZERO Scooter in ${selectedColor.id}`}
                  width={1500}
                  height={930}
                  className="w-full h-auto object-contain max-h-[75vh] md:max-h-[80vh] lg:max-h-[85vh]"
                  style={{ 
                    backfaceVisibility: 'hidden',
                    transform: 'scale(0.9)'
                  }}
                  priority
                />
                <Image
                  src={selectedColor.image}
                  alt={`REZERO Scooter in ${selectedColor.id} - Back`}
                  width={1500}
                  height={930}
                  className="w-full h-auto object-contain max-h-[75vh] md:max-h-[80vh] lg:max-h-[85vh] absolute top-0 left-0"
                  style={{ 
                    transform: 'rotateY(180deg) scaleX(-1) scale(0.9)',
                    backfaceVisibility: 'hidden'
                  }}
                  priority
                />
              </div>
              {/* Floor Shadow */}
              <div className="absolute bottom-8 md:bottom-20 lg:bottom-24 w-[85%] md:w-[80%] lg:w-[50%] h-4 bg-black/80 blur-xl rounded-full" />
            </div>
            
            {/* Color Selection Section */}
            <div 
              ref={containerRef}
              className="fixed bottom-0 left-0 right-0 lg:relative lg:bottom-auto lg:left-auto lg:right-auto
                flex flex-row justify-center lg:flex-col items-center gap-3 lg:gap-6 lg:ml-6 flex-shrink-0 
                p-3 lg:p-0 translate-y-[-10vh] lg:translate-y-0"
            >
              {/* Color Buttons with Enhanced Animation */}
              {colors.map((color, index) => (
                <button
                  key={color.id}
                  ref={el => circleRefs.current[index] = el}
                  onClick={() => handleColorChange(color)}
                  className={`relative w-12 h-12 lg:w-16 lg:h-16 transition-all duration-300 cursor-pointer border-2 border-white
                    ${selectedColor.id === color.id ? 'scale-110 ring-4 ring-primary' : 'hover:scale-125'}`}
                >
                  <Image
                    src={color.image}
                    alt={`${color.id} variant`}
                    width={74}
                    height={74}
                    className="w-full h-full object-cover"
                  />
                  <div
                    className={`absolute inset-0 bg-primary/10 transition-transform duration-300
                      ${selectedColor.id === color.id ? 'scale-110' : 'scale-100'}`}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}