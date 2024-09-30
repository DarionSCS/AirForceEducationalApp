import React, { Suspense } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { useGLTF, OrbitControls, Environment } from "@react-three/drei";
import Loader from "../Loader";
import EarthModel from "./NewCustomSphereTween"; // for tweening

export function Model(props) {
  const { nodes, materials } = useGLTF("/NewCustomSphere.gltf");
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Sphere001.geometry}
        material={materials.WF}
        rotation={[0, -1.571, 0]}
        scale={1.637}
        userData={{ name: "Sphere.001" }}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Sphere.geometry}
        material={materials.UV1}
        rotation={[0, -1.571, 0]}
        scale={1.612}
        userData={{ name: "Sphere" }}
      />
    </group>
  );
}

export default function Earth() {
  return (
    <Canvas>
      <ambientLight intensity={2} />
      <hemisphereLight
        skyColor={0xffffff}
        groundColor={0x000000}
        intensity={0.5}
      />
      <directionalLight position={[0, 15, 0]} intensity={5} />
      <directionalLight position={[0, -15, 0]} intensity={0.3} />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} />
      <Suspense fallback={<Loader />}>
        <EarthModel /> {/*for tweening */}
      </Suspense>
    </Canvas>
  );
}

useGLTF.preload("/NewCustomSphere.gltf");
