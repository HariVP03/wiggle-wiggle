import { Canvas, useFrame } from "@react-three/fiber";
import React, { Suspense, useRef } from "react";
import "./App.scss";
import { MeshWobbleMaterial, Stage, OrbitControls } from "@react-three/drei";

const Box: React.FC<{
  pos?: Array<number>;
  args?: Array<number>;
  color?: string;
}> = ({ pos = [0, 0, 0], args, color = "lightblue" }) => {
  const mesh = useRef<any>(null);
  useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01));
  return (
    <mesh ref={mesh} position={pos}>
      <boxBufferGeometry args={args} />
      {/* @ts-ignore */}
      <MeshWobbleMaterial
        attach="material"
        factor={1}
        speed={10}
        color={color}
      />
    </mesh>
  );
};

const App: React.FC = () => {
  return (
    <>
      <h1 style={{ width: "100vw", textAlign: "center" }}>
        Wiggle Wiggle Wiggle du du du duuu duuuu duuuuuuu
      </h1>
      <Suspense fallback="no">
        <Canvas camera={{ position: [-5, 2, 2], fov: 60 }}>
          <OrbitControls />
          <ambientLight intensity={0.5} />
          <Stage
            shadows
            adjustCamera
            intensity={1}
            environment="city"
            preset="rembrandt"
          >
            <Box pos={[4, -2, 3]} args={[2, 1, 1]} color="lime" />
            <Box pos={[0, -2, 3]} args={[1, 2, 1]} color="pink" />
            <Box pos={[-4, -2, 3]} args={[1, 1, 2]} color="yellow" />
          </Stage>
        </Canvas>
      </Suspense>
    </>
  );
};

export default App;
