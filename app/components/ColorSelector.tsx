"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [flipRotation, setFlipRotation] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [flipCount, setFlipCount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const circleRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const linesRef = useRef(null);
  const centralCircleRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const tl = gsap.timeline();

    return () => {
      tl.kill();
    };
  }, []);

  const handleFlip = () => {
    setIsFlipped(prev => !prev);
    setFlipCount(prev => prev + 1);
    setFlipRotation(prev => (flipCount + 1) * 180);
  };

  const calculateImageStyles = (index: number) => {
    const position = index - selectedIndex;
    
    return {
      position: 'absolute',
      left: '50%',
      transform: isLoaded 
        ? `translateX(-50%) translateX(${position * 100}%) scale(${position === 0 ? 1 : 0.7})`
        : `translateX(-50%) translateX(0%) scale(${index === 0 ? 1 : 0})`,
      width: '100%',
      height: '100%',
      zIndex: position === 0 ? 10 : 5,
      opacity: isLoaded 
        ? (position === 0 ? 1 : Math.abs(position) > 1 ? 0 : 0.5)
        : (index === 0 ? 1 : 0),
      transition: isLoaded ? 'all 0.5s ease-out' : 'none',
      pointerEvents: isAnimating ? 'none' : 'auto',
      perspective: '2000px'
    } as const;
  };

  const handleColorChange = (color: typeof colors[0], index: number) => {
    if (index !== selectedIndex && !isAnimating) {
      setIsAnimating(true);
      setSelectedIndex(index);
      setSelectedColor(color);
      setIsFlipped(false); // Reset flip when color changes
      setFlipRotation(0);
      
      setTimeout(() => {
        setIsAnimating(false);
      }, 500);
    }
  };

  return (
    <div className="relative w-full flex items-center justify-center overflow-hidden [perspective:2000px] [transform-style:preserve-3d] z-50 p-0 m-0 mb-0 pb-0">
      <div className="w-full overflow-x-hidden lg:overflow-x-visible p-0 m-0 mb-0 pb-0">
        <div className="container h-full mx-auto relative p-0 m-0 mb-0 pb-0">
          <div className="flex flex-col lg:flex-row items-center justify-center h-full gap-4 lg:gap-16 mb-0 pb-0">
            {/* Image Carousel Section */}
            <div className="flex-1 flex justify-center items-center w-full h-full max-w-5xl [perspective:2000px]">
              <div className="relative w-full h-[75vh] md:h-[85vh] lg:h-[85vh] [transform-style:preserve-3d]">
                {colors.map((color, index) => (
                  <div
                    key={color.id}
                    className={`absolute w-full h-full cursor-pointer [transform-style:preserve-3d] select-none 
                    touch-none [-webkit-tap-highlight-color:transparent] ${
                      !isLoaded && index !== 0 ? 'invisible' : ''
                    }`}
                    style={{
                      ...calculateImageStyles(index),
                      WebkitTapHighlightColor: 'transparent',
                      touchAction: 'none'
                    }}
                    onClick={() => selectedIndex === index ? handleFlip() : handleColorChange(color, index)}
                  >
                    <div 
                      className="relative w-full h-full [transform-style:preserve-3d]"
                      style={{ 
                        transform: selectedIndex === index ? `rotateY(${flipRotation}deg)` : 'none',
                        transition: 'transform 1000ms cubic-bezier(0.4, 0, 0.2, 1)',
                        transformStyle: 'preserve-3d',
                        transformOrigin: 'center',
                        animation: selectedIndex === index ? 'float 3s ease-in-out infinite' : 'none'
                      }}
                    >
                      <div className="absolute inset-0 [transform-style:preserve-3d] [backface-visibility:hidden]">
                        <Image
                          src={color.image}
                          alt={`REZERO Scooter in ${color.id}`}
                          fill
                          className="object-contain"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                          priority={index === 0}
                          loading={index === 0 ? "eager" : "lazy"}
                        />
                      </div>
                      <div 
                        className="absolute inset-0 [transform-style:preserve-3d] [backface-visibility:hidden]"
                        style={{ transform: 'rotateY(180deg)' }}
                      >
                        <Image
                          src={color.image}
                          alt={`REZERO Scooter in ${color.id} - Back`}
                          fill
                          className="object-contain"
                          style={{ transform: 'scaleX(-1)' }}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                          priority={index === 0}
                          loading={index === 0 ? "eager" : "lazy"}
                        />
                      </div>
                    </div>
                    
                    {selectedIndex === index && (
                      <div 
                        className="absolute bottom-6 md:bottom-6 lg:bottom-8 left-1/2 -translate-x-1/2 w-[85%] md:w-[80%] lg:w-[50%] h-8 md:h-4 lg:h-4 bg-black/60 rounded-[50%]"
                        style={{
                          animation: 'shadowFloat 3s ease-in-out infinite',
                          filter: 'blur(12px)'
                        }}
                      />
                    )}
                  </div>
                ))}
              </div>
              
              {/* Navigation Arrows - Desktop only */}
              <button
                onClick={() => handleColorChange(colors[(selectedIndex - 1 + colors.length) % colors.length], (selectedIndex - 1 + colors.length) % colors.length)}
                className="hidden lg:block absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background/90 transition-colors"
                disabled={isAnimating}
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={() => handleColorChange(colors[(selectedIndex + 1) % colors.length], (selectedIndex + 1) % colors.length)}
                className="hidden lg:block absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background/90 transition-colors"
                disabled={isAnimating}
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Color Selection Section */}
            <div 
              ref={containerRef}
              className="absolute bottom-6 sm:bottom-8 md:bottom-10 lg:bottom-10 left-0 right-0
                flex flex-row justify-center items-center gap-3 sm:gap-4 md:gap-6 lg:gap-8
                p-0 sm:p-0 md:p-0 lg:p-0 z-20 mb-0 pb-0 translate-y-0">
              {colors.map((color, index) => (
                <button
                  key={color.id}
                  ref={el => circleRefs.current[index] = el}
                  onClick={() => handleColorChange(color, index)}
                  className={`relative w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 transition-all duration-300 cursor-pointer rounded-full
                    ${selectedIndex === index ? 'scale-110 ring-2 ring-primary' : 'hover:scale-125'}`}
                  style={{
                    background: color.id === 'green' ? 'radial-gradient(circle at 30% 30%, #a4cc78 0%, #658246 100%)' :
                              color.id === 'yellow' ? 'radial-gradient(circle at 30% 30%, #e6c447 0%, #ac942a 100%)' :
                              color.id === 'red' ? 'radial-gradient(circle at 30% 30%, #a04950 0%, #652c31 100%)' :
                              color.id === 'silver' ? 'radial-gradient(circle at 30% 30%, #d6d3d2 0%, #aba8a7 100%)' : 'transparent',
                    boxShadow: 'inset -3px -3px 6px rgba(0,0,0,0.3), inset 3px 3px 6px rgba(255,255,255,0.2)'
                  }}
                >
                  <div
                    className={`absolute inset-0 rounded-full transition-transform duration-300
                      ${selectedIndex === index ? 'scale-110' : 'scale-100'}`}
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
      <style jsx global>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) rotateY(${flipRotation}deg);
          }
          50% { 
            transform: translateY(-20px) rotateY(${flipRotation}deg);
          }
        }
        @keyframes shadowFloat {
          0%, 100% { 
            transform: translateX(-50%) scale(1);
            opacity: 0.4;
            filter: blur(12px);
          }
          50% { 
            transform: translateX(-50%) scale(0.85);
            opacity: 0.2;
            filter: blur(24px);
          }
        }
      `}</style>
    </div>
  );
}