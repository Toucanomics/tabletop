"use client";

import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react';

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
  { name: "Home", content: "TABLETOP", description: "The world's first board game hackathon", dots: 1, index: 0 },
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

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-blue-50 to-white flex flex-col items-center justify-center py-8 px-4">
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
            <div className="dice-face dice-red" style={{ transform: `translateZ(${cubeSize}px)` }}>
              {renderDots(1)}
              <div className="dice-content">
                <h2 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-white mb-2`}>TABLETOP</h2>
                <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-white/90`}>The world's first board game hackathon</p>
              </div>
            </div>
            
            {/* Back face - 6 */}
            <div className="dice-face dice-red" style={{ transform: `rotateY(180deg) translateZ(${cubeSize}px)` }}>
              {renderDots(6)}
              <div className="dice-content">
                <h2 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-white mb-2`}>REGISTER</h2>
                <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-white/90`}>Join the adventure today!</p>
                <Link href="https://partiful.com/e/z8kr0NvaiMls9JBhnq0B" target="_blank">
                <button className={`mt-3 px-4 py-1.5 ${isMobile ? 'text-xs' : 'text-sm'} bg-white text-red-600 rounded-md hover:bg-white/90 transition-colors font-bold`}>
                  Register Now
                </button>
                </Link>
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

      {/* Navigation */}
      <div className={`flex flex-wrap justify-center gap-2 p-3 bg-white/80 backdrop-blur-sm rounded-full shadow-md border border-red-600/20 ${isMobile ? 'max-w-full' : ''}`}>
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
    </div>
  );
}