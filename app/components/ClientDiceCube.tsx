"use client";

import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, PerspectiveCamera, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { Group } from 'three';

// The dice cube component
function Dice({ currentFace }) {
  const cubeRef = useRef<Group>(null);
  
  // Target rotations for each face
  const faceRotations = [
    [0, 0], // Front
    [0, Math.PI/2], // Right
    [0, Math.PI], // Back
    [0, -Math.PI/2], // Left
    [-Math.PI/2, 0], // Top
    [Math.PI/2, 0], // Bottom
  ];
  
  useFrame(() => {
    if (cubeRef.current) {
      // Smooth rotation to target face
      cubeRef.current.rotation.x = THREE.MathUtils.lerp(
        cubeRef.current.rotation.x,
        faceRotations[currentFace][0],
        0.05
      );
      cubeRef.current.rotation.y = THREE.MathUtils.lerp(
        cubeRef.current.rotation.y,
        faceRotations[currentFace][1],
        0.05
      );
    }
  });

  return (
    <group ref={cubeRef}>
      {/* Cube */}
      <mesh>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color="#ffffff" transparent opacity={0.8} />
      </mesh>
      
      {/* Wireframe */}
      <mesh>
        <boxGeometry args={[2.01, 2.01, 2.01]} />
        <meshBasicMaterial color="#0066cc" wireframe={true} />
      </mesh>
      
      {/* Front face */}
      <Text 
        position={[0, 0, 1.01]} 
        color="#0066cc"
        fontSize={0.3}
        anchorX="center"
        anchorY="middle"
      >
        TABLETOP
      </Text>
      
      {/* Right face */}
      <Text 
        position={[1.01, 0, 0]} 
        rotation={[0, Math.PI/2, 0]}
        color="#0066cc"
        fontSize={0.3}
        anchorX="center"
        anchorY="middle"
      >
        CREATE
      </Text>
      
      {/* Back face */}
      <Text 
        position={[0, 0, -1.01]} 
        rotation={[0, Math.PI, 0]}
        color="#0066cc"
        fontSize={0.3}
        anchorX="center"
        anchorY="middle"
      >
        DISCOVER
      </Text>
      
      {/* Left face */}
      <Text 
        position={[-1.01, 0, 0]} 
        rotation={[0, -Math.PI/2, 0]}
        color="#0066cc"
        fontSize={0.3}
        anchorX="center"
        anchorY="middle"
      >
        LAUNCH
      </Text>
      
      {/* Top face */}
      <Text 
        position={[0, 1.01, 0]} 
        rotation={[-Math.PI/2, 0, 0]}
        color="#0066cc"
        fontSize={0.3}
        anchorX="center"
        anchorY="middle"
      >
        SCHEDULE
      </Text>
      
      {/* Bottom face */}
      <Text 
        position={[0, -1.01, 0]} 
        rotation={[Math.PI/2, 0, 0]}
        color="#0066cc"
        fontSize={0.3}
        anchorX="center"
        anchorY="middle"
      >
        Register
      </Text>
    </group>
  );
}

// Main component
export default function ClientDiceCube() {
  const [currentFace, setCurrentFace] = useState(0);
  const cubeRef = useRef<Group>(null);
  const faceNames = ["Home", "Create", "Discover", "Launch", "Schedule", "Register"];

  // Define face rotations
  const faceRotations = [
    [0, 0], // Front
    [0, Math.PI / 2], // Right
    [0, Math.PI], // Back
    [0, -Math.PI / 2], // Left
    [-Math.PI / 2, 0], // Top
    [Math.PI / 2, 0] // Bottom
  ];
  
  // Animate rotation
  useEffect(() => {
    const animate = () => {
      if (cubeRef.current) {
        // Smooth rotation to target face
        cubeRef.current.rotation.x = THREE.MathUtils.lerp(
          cubeRef.current.rotation.x,
          faceRotations[currentFace][0],
          0.05
        );
        cubeRef.current.rotation.y = THREE.MathUtils.lerp(
          cubeRef.current.rotation.y,
          faceRotations[currentFace][1],
          0.05
        );
      }
      requestAnimationFrame(animate);
    };
    
    animate();
  }, [currentFace]);

  return (
    <div className="h-screen w-screen bg-gradient-to-b from-blue-50 to-white">
      <Canvas>
        <ambientLight intensity={0.7} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <Dice currentFace={currentFace} />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          enableRotate={true}
        />
      </Canvas>
      
      {/* Navigation controls */}
      <div className="fixed bottom-8 left-0 right-0 flex justify-center z-10">
        <div className="bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-md border border-[#0066cc]/20 flex space-x-4">
          {faceNames.map((name, index) => (
            <button
              key={index}
              className={`px-3 py-1 rounded-full transition-all ${
                currentFace === index 
                  ? 'bg-[#0066cc] text-white' 
                  : 'bg-white text-[#0066cc] hover:bg-[#0066cc]/10'
              }`}
              onClick={() => setCurrentFace(index)}
            >
              {name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
} 