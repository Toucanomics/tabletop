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
    [0, 0, 0], // Front
    [0, Math.PI/2, 0], // Right
    [0, Math.PI, 0], // Back
    [0, -Math.PI/2, 0], // Left
    [-Math.PI/2, 0, 0], // Top
    [Math.PI/2, 0, 0], // Bottom
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

// Loading component
function LoadingFallback() {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-blue-50">
      <div className="text-[#0066cc] text-xl">Loading 3D Dice...</div>
    </div>
  );
}

// Main component
export default function DiceCube() {
  const [currentFace, setCurrentFace] = useState(0);
  // Properly type the ref
  const cubeRef = useRef<Group>(null);
  
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
    <div className="h-screen w-screen flex items-center justify-center bg-blue-50">
      <div className="text-[#0066cc] text-xl">Loading 3D Dice...</div>
    </div>
  );
} 