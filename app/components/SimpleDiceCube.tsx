"use client";

import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import AtriaLockup from '../../public/AtriaLockup.png';
import FacadeGames from '../../public/FacadeGames.png';

// Define types for the FACES array items
interface FaceData {
  name: string;
  content: string;
  description: string;
  dots: number;
  index: number;
}

// Define the faces of the dice with their dot patterns and correct mapping
const FACES: FaceData[] = [
  { name: "Home", content: "TABLETOP", description: "NYC's first board game hackathon", dots: 1, index: 0 },
  { name: "Create", content: "CREATE", description: "Design & Demo innovative board games in 48 hours", dots: 2, index: 1 },
  { name: "Discover", content: "DISCOVER", description: "Access to premium materials and printing services", dots: 3, index: 4 }, // Top face
  { name: "Launch", content: "LAUNCH", description: "Win publishing partnerships and cash prizes", dots: 4, index: 5 }, // Bottom face
  { name: "Schedule", content: "SCHEDULE", description: "March 15-16, 2025 in New York City", dots: 5, index: 3 }, // Left face
  { name: "Register", content: "REGISTER", description: "Join the adventure today!", dots: 6, index: 2 } // Back face
];

// Function to render dice dots based on the number
const renderDots = (number: number) => {
  switch(number) {
    case 1:
      return (
        <div className="dice-dots dice-dots-1">
          <div className="dice-dot center"></div>
        </div>
      );
    case 2:
      return (
        <div className="dice-dots dice-dots-2">
          <div className="dice-dot top-left"></div>
          <div className="dice-dot bottom-right"></div>
        </div>
      );
    case 3:
      return (
        <div className="dice-dots dice-dots-3">
          <div className="dice-dot top-left"></div>
          <div className="dice-dot center"></div>
          <div className="dice-dot bottom-right"></div>
        </div>
      );
    case 4:
      return (
        <div className="dice-dots dice-dots-4">
          <div className="dice-dot top-left"></div>
          <div className="dice-dot top-right"></div>
          <div className="dice-dot bottom-left"></div>
          <div className="dice-dot bottom-right"></div>
        </div>
      );
    case 5:
      return (
        <div className="dice-dots dice-dots-5">
          <div className="dice-dot top-left"></div>
          <div className="dice-dot top-right"></div>
          <div className="dice-dot center"></div>
          <div className="dice-dot bottom-left"></div>
          <div className="dice-dot bottom-right"></div>
        </div>
      );
    case 6:
      return (
        <div className="dice-dots dice-dots-6">
          <div className="dice-dot top-left"></div>
          <div className="dice-dot top-right"></div>
          <div className="dice-dot middle-left"></div>
          <div className="dice-dot middle-right"></div>
          <div className="dice-dot bottom-left"></div>
          <div className="dice-dot bottom-right"></div>
        </div>
      );
    default:
      return null;
  }
};

export default function SimpleDiceCube() {
  const [currentFace, setCurrentFace] = useState(0);
  const [isRotating, setIsRotating] = useState(false);
  const [manualRotation, setManualRotation] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);
  
  // Update the cube size based on screen size
  const cubeSize = isMobile ? 130 : 170; // Smaller on mobile
  
  // Add a subtle hover effect
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (isRotating || isDragging) return;
      
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      // Subtle tilt effect
      setManualRotation({
        x: y * 0.02,
        y: -x * 0.02
      });
    };
    
    const handleMouseLeave = () => {
      if (!isDragging) {
        // Smoothly reset rotation
        setManualRotation({ x: 0, y: 0 });
      }
    };
    
    container.addEventListener('mousemove', handleMouseMove as EventListener);
    container.addEventListener('mouseleave', handleMouseLeave as EventListener);
    
    return () => {
      container.removeEventListener('mousemove', handleMouseMove as EventListener);
      container.removeEventListener('mouseleave', handleMouseLeave as EventListener);
    };
  }, [isRotating, isDragging]);
  
  // Handle face change
  const changeFace = (index: number) => {
    // Find the actual face index from the FACES array
    const targetFaceIndex = FACES.find(face => face.index === index)?.index || index;
    
    if (currentFace === targetFaceIndex || isRotating) return;
    setIsRotating(true);
    setCurrentFace(targetFaceIndex);
    
    // Reset rotating state after animation completes
    setTimeout(() => {
      setIsRotating(false);
    }, 1000);
  };

  // Calculate cube rotation based on current face and manual rotation
  const getCubeRotation = () => {
    let baseRotation;
    
    switch(currentFace) {
      case 0: // Front
        baseRotation = 'rotateX(0deg) rotateY(0deg)';
        break;
      case 1: // Right
        baseRotation = 'rotateX(0deg) rotateY(-90deg)';
        break;
      case 2: // Back
        baseRotation = 'rotateX(0deg) rotateY(-180deg)';
        break;
      case 3: // Left
        baseRotation = 'rotateX(0deg) rotateY(90deg)';
        break;
      case 4: // Top
        baseRotation = 'rotateX(-90deg) rotateY(0deg)';
        break;
      case 5: // Bottom
        baseRotation = 'rotateX(90deg) rotateY(0deg)';
        break;
      default:
        baseRotation = 'rotateX(0deg) rotateY(0deg)';
    }
    
    // Add manual rotation if not transitioning between faces
    if (!isRotating) {
      return `${baseRotation} rotateX(${manualRotation.x}deg) rotateY(${manualRotation.y}deg)`;
    }
    
    return baseRotation;
  };
  
  // Mouse/touch event handlers for manual rotation
  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    if (isRotating) return;
    
    setIsDragging(true);
    
    // Get the starting position
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    setDragStart({ x: clientX, y: clientY });
    setManualRotation({ x: 0, y: 0 });
  };
  
  const handleMouseMove = (e: MouseEvent | TouchEvent) => {
    if (!isDragging || isRotating) return;
    
    // Get the current position
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    // Calculate the delta
    const deltaX = clientX - dragStart.x;
    const deltaY = clientY - dragStart.y;
    
    // Update manual rotation based on drag
    setManualRotation({
      x: deltaY * 0.01,
      y: -deltaX * 0.01
    });
  };
  
  const handleMouseUp = () => {
    if (!isDragging) return;
    
    // Determine which face is most visible
    if (Math.abs(manualRotation.x) > 0.3 || Math.abs(manualRotation.y) > 0.3) {
      // Find the closest face based on rotation
      let newFace = currentFace;
      
      // Simplified face detection based on rotation angles
      if (Math.abs(manualRotation.x) > Math.abs(manualRotation.y)) {
        // Rotation is primarily around X axis
        if (manualRotation.x > 0.3) {
          newFace = 5; // Bottom face
        } else if (manualRotation.x < -0.3) {
          newFace = 4; // Top face
        }
      } else {
        // Rotation is primarily around Y axis
        if (manualRotation.y > 0.3) {
          newFace = 3; // Left face
        } else if (manualRotation.y < -0.3) {
          newFace = 1; // Right face
        } else if (Math.abs(manualRotation.y) > 0.6) {
          newFace = 2; // Back face
        } else {
          newFace = 0; // Front face
        }
      }
      
      // Update current face if it changed
      if (newFace !== currentFace) {
        setCurrentFace(newFace);
      }
    }
    
    setIsDragging(false);
  };
  
  // Add and remove event listeners
  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchmove', handleMouseMove, { passive: false });
    document.addEventListener('touchend', handleMouseUp);
    
    // Prevent page scrolling when interacting with the dice on mobile
    const preventScroll = (e: TouchEvent) => {
      if (isDragging) {
        e.preventDefault();
      }
    };
    
    document.addEventListener('touchmove', preventScroll, { passive: false });
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleMouseMove);
      document.removeEventListener('touchend', handleMouseUp);
      document.removeEventListener('touchmove', preventScroll);
    };
  }, [isDragging, dragStart, manualRotation, isRotating]);

  // Get the active button index based on the current face
  const getActiveButtonIndex = () => {
    const activeButton = FACES.findIndex(face => face.index === currentFace);
    return activeButton >= 0 ? activeButton : currentFace;
  };

  // Update the dice face styles for mobile to be completely solid
  const faceStyle = (transformValue: string) => ({
    transform: transformValue,
    backgroundColor: isMobile ? '#e53e3e' : undefined,
    opacity: isMobile ? 1 : undefined,
    boxShadow: isMobile ? 'inset 0 0 40px rgba(0, 0, 0, 0.4), 0 10px 30px rgba(0, 0, 0, 0.4)' : undefined,
    border: isMobile ? '8px solid #c53030' : undefined,
  });

  const contentStyle = {
    backgroundColor: isMobile ? '#e53e3e' : undefined,
    border: isMobile ? '1px solid rgba(255, 255, 255, 0.6)' : undefined,
    boxShadow: isMobile ? '0 4px 12px rgba(0, 0, 0, 0.25)' : undefined,
    backdropFilter: isMobile ? 'none' : undefined,
  };

  return (
    <div className={`min-h-screen w-full ${isMobile ? 'bg-white' : 'bg-gradient-to-b from-blue-50 to-white'} flex flex-col items-center justify-center py-8 px-4`}>
      {/* Dice cube container */}
      <div 
        ref={containerRef}
        className={`relative ${isMobile ? 'w-72 h-72' : 'w-96 h-96'} mb-12 dice-container`}
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Add a shadow beneath the dice */}
        <div className="dice-shadow"></div>
        
        {/* 3D perspective container */}
        <div className="dice-scene w-full h-full">
          {/* Cube */}
          <div 
            className="dice-cube w-full h-full"
            style={{ 
              transform: getCubeRotation(),
              transformStyle: 'preserve-3d'
            }}
          >
            {/* Front face - 1 */}
            <div 
              className="dice-face dice-red" 
              style={faceStyle(`translateZ(${cubeSize}px)`)}
            >
              {renderDots(1)}
              <div className="dice-content" style={contentStyle}>
                <h2 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-white mb-2`}>TABLETOP</h2>
                <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-white/90`}>NYC's first board game hackathon</p>
              </div>
            </div>
            
            {/* Back face - 6 */}
            <div className="dice-face dice-red" style={{ transform: `rotateY(180deg) translateZ(${cubeSize}px)` }}>
              {renderDots(6)}
              <div className="dice-content">
                <h2 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-white mb-2`}>REGISTER</h2>
                <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-white/90`}>Join the adventure today!</p>
                <div className="flex flex-col space-y-2 mt-3">
                  <Link href="https://partiful.com/e/z8kr0NvaiMls9JBhnq0B" target="_blank">
                    <button className={`w-full px-4 py-1.5 ${isMobile ? 'text-xs' : 'text-sm'} bg-white text-red-600 rounded-md hover:bg-white/90 transition-colors font-bold`}>
                      Register Now
                    </button>
                  </Link>
                  <Link href="https://discord.gg/qgrJb94Z" target="_blank">
                    <button className={`w-full px-4 py-1.5 ${isMobile ? 'text-xs' : 'text-sm'} bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors font-bold flex items-center justify-center`}>
                      <svg className="w-4 h-4 mr-2" viewBox="0 0 71 55" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M60.1045 4.8978C55.5792 2.8214 50.7265 1.2916 45.6527 0.41542C45.5603 0.39851 45.468 0.440769 45.4204 0.525289C44.7963 1.6353 44.105 3.0834 43.6209 4.2216C38.1637 3.4046 32.7345 3.4046 27.3892 4.2216C26.905 3.0581 26.1886 1.6353 25.5617 0.525289C25.5141 0.443589 25.4218 0.40133 25.3294 0.41542C20.2584 1.2888 15.4057 2.8186 10.8776 4.8978C10.8384 4.9147 10.8048 4.9429 10.7825 4.9795C1.57795 18.7309 -0.943561 32.1443 0.293408 45.3914C0.299005 45.4562 0.335386 45.5182 0.385761 45.5576C6.45866 50.0174 12.3413 52.7249 18.1147 54.5195C18.2071 54.5477 18.305 54.5139 18.3638 54.4378C19.7295 52.5728 20.9469 50.6063 21.9907 48.5383C22.0523 48.4172 21.9935 48.2735 21.8676 48.2256C19.9366 47.4931 18.0979 46.6 16.3292 45.5858C16.1893 45.5041 16.1781 45.304 16.3068 45.2082C16.679 44.9293 17.0513 44.6391 17.4067 44.3461C17.471 44.2926 17.5606 44.2813 17.6362 44.3151C29.2558 49.6202 41.8354 49.6202 53.3179 44.3151C53.3935 44.2785 53.4831 44.2898 53.5502 44.3433C53.9057 44.6363 54.2779 44.9293 54.6529 45.2082C54.7816 45.304 54.7732 45.5041 54.6333 45.5858C52.8646 46.6197 51.0259 47.4931 49.0921 48.2228C48.9662 48.2707 48.9102 48.4172 48.9718 48.5383C50.038 50.6034 51.2554 52.5699 52.5959 54.435C52.6519 54.5139 52.7526 54.5477 52.845 54.5195C58.6464 52.7249 64.529 50.0174 70.6019 45.5576C70.6551 45.5182 70.6887 45.459 70.6943 45.3942C72.1747 30.0791 68.2147 16.7757 60.1968 4.9823C60.1772 4.9429 60.1437 4.9147 60.1045 4.8978ZM23.7259 37.3253C20.2276 37.3253 17.3451 34.1136 17.3451 30.1693C17.3451 26.225 20.1717 23.0133 23.7259 23.0133C27.308 23.0133 30.1626 26.2532 30.1066 30.1693C30.1066 34.1136 27.28 37.3253 23.7259 37.3253ZM47.3178 37.3253C43.8196 37.3253 40.9371 34.1136 40.9371 30.1693C40.9371 26.225 43.7636 23.0133 47.3178 23.0133C50.9 23.0133 53.7545 26.2532 53.6986 30.1693C53.6986 34.1136 50.9 37.3253 47.3178 37.3253Z" fill="currentColor"/>
                      </svg>
                      Join Discord
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Right face - 2 */}
            <div className="dice-face dice-red" style={{ transform: `rotateY(90deg) translateZ(${cubeSize}px)` }}>
              {renderDots(2)}
              <div className="dice-content">
                <h2 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-white mb-2`}>CREATE</h2>
                <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-white/90`}>Design & Demo innovative board games in 48 hours</p>
              </div>
            </div>
            
            {/* Left face - 5 */}
            <div className="dice-face dice-red" style={{ transform: `rotateY(-90deg) translateZ(${cubeSize}px)` }}>
              {renderDots(5)}
              <div className="dice-content">
                <h2 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-white mb-2`}>SCHEDULE</h2>
                <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-white/90`}>March 15-16, 2025 in New York City</p>
              </div>
            </div>
            
            {/* Top face - 3 */}
            <div className="dice-face dice-red" style={{ transform: `rotateX(90deg) translateZ(${cubeSize}px)` }}>
              {renderDots(3)}
              <div className="dice-content">
                <h2 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-white mb-2`}>DISCOVER</h2>
                <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-white/90`}>Access to premium materials and printing services</p>
              </div>
            </div>
            
            {/* Bottom face - 4 */}
            <div className="dice-face dice-red" style={{ transform: `rotateX(-90deg) translateZ(${cubeSize}px)` }}>
              {renderDots(4)}
              <div className="dice-content">
                <h2 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-white mb-2`}>LAUNCH</h2>
                <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-white/90`}>Win publishing partnerships and cash prizes</p>
              </div>
            </div>
            
            {/* Remove the side panels if they're causing issues */}
            {/* <div className="dice-side dice-side-top"></div>
            <div className="dice-side dice-side-bottom"></div>
            <div className="dice-side dice-side-left"></div>
            <div className="dice-side dice-side-right"></div>
            <div className="dice-side dice-side-front"></div>
            <div className="dice-side dice-side-back"></div> */}
            
            {/* Cube edges for better visibility */}
            <div className="dice-edge" style={{ transform: `translateZ(${cubeSize}px)` }}></div>
            <div className="dice-edge" style={{ transform: `rotateY(180deg) translateZ(${cubeSize}px)` }}></div>
            <div className="dice-edge" style={{ transform: `rotateY(90deg) translateZ(${cubeSize}px)` }}></div>
            <div className="dice-edge" style={{ transform: `rotateY(-90deg) translateZ(${cubeSize}px)` }}></div>
            <div className="dice-edge" style={{ transform: `rotateX(90deg) translateZ(${cubeSize}px)` }}></div>
            <div className="dice-edge" style={{ transform: `rotateX(-90deg) translateZ(${cubeSize}px)` }}></div>
          </div>
        </div>
      </div>

      {/* Navigation with solid background on mobile */}
      <div className={`flex flex-wrap justify-center gap-2 p-3 ${isMobile ? 'bg-white' : 'bg-white/80'} backdrop-blur-sm rounded-full shadow-md border border-red-600/20 ${isMobile ? 'max-w-full' : ''}`}>
        {FACES.map((face, index) => (
          <button
            key={index}
            className={`${isMobile ? 'px-2 py-1 text-sm' : 'px-3 py-1'} rounded-full transition-all ${
              getActiveButtonIndex() === index 
                ? 'bg-red-600 text-white' 
                : 'bg-white text-red-600 hover:bg-red-600/10'
            }`}
            onClick={() => changeFace(face.index)}
            disabled={isRotating}
          >
            {face.name}
          </button>
        ))}
      </div>

      {/* Instructions */}
      <div className={`mt-6 text-red-600/70 text-center ${isMobile ? 'text-xs' : 'text-xs'}`}>
        Drag to rotate • Click buttons to navigate
      </div>
      
      {/* Sponsor logos */}
      <div className="mt-8 text-center">
        <p className={`text-red-600/70 ${isMobile ? 'text-xs' : 'text-sm'} mb-4`}>Sponsored by</p>
        <div className="flex justify-center items-center space-x-6 flex-wrap gap-y-4">
          <div className={`${isMobile ? 'w-20 h-10' : 'w-32 h-16'} relative`}>
            <Link href="https://facadegames.com/" target="_blank">
              <Image 
                src={FacadeGames}
                alt="Facade Games" 
                className="object-contain w-full h-full filter grayscale hover:grayscale-0 transition-all duration-300"
              />
            </Link>
          </div>
          <div className={`${isMobile ? 'w-20 h-10' : 'w-32 h-16'} relative`}>
            <Link href="https://askatria.ai" target="_blank">
              <Image 
                src={AtriaLockup}
              alt="Atria" 
                className="object-contain w-full h-full filter grayscale hover:grayscale-0 transition-all duration-300"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}