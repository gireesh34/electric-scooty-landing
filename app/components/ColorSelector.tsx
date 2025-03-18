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
      <div className="w-full py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-12">
            {/* Image Section */}
            <div className="flex-1 flex justify-center items-center pl-16 pt-12 relative">
              <div 
                onClick={handleFlip} 
                className="relative cursor-pointer"
                style={{ 
                  transform: `rotateY(${flipRotation}deg)`,
                  transition: 'transform 1000ms',
                  transformStyle: 'preserve-3d'
                }}
              >
                <Image
                  src={selectedColor.image}
                  alt={`REZERO Scooter in ${selectedColor.id}`}
                  width={900}
                  height={900}
                  className="w-auto h-full object-contain max-w-[900px]"
                  style={{ 
                    backfaceVisibility: 'hidden'
                  }}
                  priority
                />
                <Image
                  src={selectedColor.image}
                  alt={`REZERO Scooter in ${selectedColor.id} - Back`}
                  width={900}
                  height={900}
                  className="w-auto h-full object-contain max-w-[900px] absolute top-0 left-0"
                  style={{ 
                    transform: 'rotateY(180deg) scaleX(-1)',
                    backfaceVisibility: 'hidden'
                  }}
                  priority
                />
              </div>
              {/* Floor Shadow */}
              <div className="absolute bottom-0 w-[50%] h-4 bg-black/80 blur-xl rounded-full" />
            </div>
            
            {/* Color Selection Section */}
            <div 
              ref={containerRef}
              className="flex flex-col items-center gap-6 relative ml-8 flex-shrink-0"
            >
              {/* Color Buttons with Enhanced Animation */}
              {colors.map((color, index) => (
                <button
                  key={color.id}
                  ref={el => circleRefs.current[index] = el}
                  onClick={() => handleColorChange(color)}
                  className={`relative w-16 h-16 transition-all duration-300 cursor-pointer border-2 border-white
                    ${selectedColor.id === color.id ? 'scale-110 ring-4 ring-primary ' : 'hover:scale-125'}`}
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