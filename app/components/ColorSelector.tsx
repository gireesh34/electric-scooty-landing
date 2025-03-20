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
                className="relative cursor-pointer w-[140%] h-full flex items-center justify-center select-none"
                style={{ 
                  transformStyle: 'preserve-3d',
                  transform: `rotateY(${flipRotation}deg)`,
                  transition: 'transform 1000ms',
                  WebkitTapHighlightColor: 'transparent'
                }}
              >
                <div className="relative w-full h-full" style={{ animation: 'float 3s ease-in-out infinite' }}>
                  <style jsx global>{`
                    @keyframes float {
                      0% {
                        transform: translateY(0px);
                      }
                      50% {
                        transform: translateY(-20px);
                      }
                      100% {
                        transform: translateY(0px);
                      }
                    }
                  `}</style>
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
                  className={`relative w-12 h-12 lg:w-16 lg:h-16 transition-all duration-300 cursor-pointer rounded-full
                    ${selectedColor.id === color.id ? 'scale-110 ring-4 ring-primary' : 'hover:scale-125'}`}
                  style={{
                    background: color.id === 'green' ? 'radial-gradient(circle at 30% 30%,rgb(154, 199, 107) 0%, #658246 100%)' :
                              color.id === 'yellow' ? 'radial-gradient(circle at 30% 30%, #e6c447 0%, #ac942a 100%)' :
                              color.id === 'red' ? 'radial-gradient(circle at 30% 30%, #a04950 0%, #652c31 100%)' :
                              color.id === 'silver' ? 'radial-gradient(circle at 30% 30%, #d6d3d2 0%, #aba8a7 100%)' : 'transparent',
                    boxShadow: 'inset -4px -4px 8px rgba(0,0,0,0.3), inset 4px 4px 8px rgba(255,255,255,0.2)'
                  }}
                >
                  <div
                    className={`absolute inset-0 rounded-full transition-transform duration-300
                      ${selectedColor.id === color.id ? 'scale-110' : 'scale-100'}`}
                    style={{
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 50%, rgba(0,0,0,0.2) 100%)'
                    }}
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