"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

// Floating Rocket Component
function FloatingRocket(props) {
  const group = useRef();
  const { scene } = useGLTF("/rocket.glb");

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    group.current.rotation.y = t * 0.3;
    group.current.position.y = Math.sin(t * 2) * 0.1 + 0.3;
  });

  return <primitive ref={group} object={scene} scale={1.2} {...props} />;
}

// Rocket Flame
function Flame() {
  const meshRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    meshRef.current.scale.y = 0.8 + Math.sin(t * 20) * 0.1;
  });

  return (
    <mesh ref={meshRef} position={[0, 0.05, 0]}>
      <coneGeometry args={[0.1, 0.3, 16]} />
      <meshStandardMaterial
        emissive={"orange"}
        emissiveIntensity={2}
        color="yellow"
      />
    </mesh>
  );
}

export default function PaymentPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0b0e1b] text-white">
      <h1 className="text-4xl font-bold mb-6">Launching Soon...</h1>

      <div className="w-full h-[500px]">
        <Canvas camera={{ position: [2, 2, 5], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <spotLight
            position={[5, 5, 5]}
            angle={0.3}
            penumbra={1}
            intensity={2}
          />
          <OrbitControls enableZoom={false} />
          <group position={[0, -0.5, 0]}>
            <FloatingRocket />
            <Flame />
          </group>
        </Canvas>
      </div>

      <p className="mt-6 text-gray-400">Premium content is in the works! 🚀</p>
    </div>
  );
}
