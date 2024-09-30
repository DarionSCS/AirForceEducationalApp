import React, { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRotation } from "./RotationContext";

export default function EarthModel(props) {
  const { nodes, materials } = useGLTF("/FunctionalGlobe/NewCustomSphere.gltf");
  const { rotation, isPopupVisible } = useRotation();

  // Define refs for the group and meshes
  const group = useRef();
  const globe = useRef();
  const raster = useRef();

  // Store the current rotation and scale in refs for smooth interpolation
  const currentRotation = useRef([2, 10, 2]);
  const currentScale = useRef([1.7, 1.7, 1.7]);
  const targetRotation = useRef(rotation);
  const defaultScale = [2, 2, 2];
  const zoomScale = [3, 3, 3];
  const targetScale = useRef(defaultScale); // Initial target scale is the default
  const interpolationSpeed = 0.05; // Adjust this value to control the speed of interpolation

  useEffect(() => {
    // Update the target rotation and scale when the rotation or popup visibility changes
    targetRotation.current = rotation;
    targetScale.current = isPopupVisible ? zoomScale : defaultScale;
  }, [rotation, isPopupVisible]);

  useFrame(() => {
    // Interpolate rotation and scale for the globe mesh
    if (globe.current) {
      const delta = interpolationSpeed;

      // Rotation interpolation
      globe.current.rotation.x +=
        (targetRotation.current[0] - globe.current.rotation.x) * delta;
      globe.current.rotation.y +=
        (targetRotation.current[1] - globe.current.rotation.y) * delta;
      globe.current.rotation.z +=
        (targetRotation.current[2] - globe.current.rotation.z) * delta;

      // Scaling interpolation
      globe.current.scale.x +=
        (targetScale.current[0] - globe.current.scale.x) * delta;
      globe.current.scale.y +=
        (targetScale.current[1] - globe.current.scale.y) * delta;
      globe.current.scale.z +=
        (targetScale.current[2] - globe.current.scale.z) * delta;

      // Update current rotation and scale refs
      currentRotation.current = [
        globe.current.rotation.x,
        globe.current.rotation.y,
        globe.current.rotation.z,
      ];
      currentScale.current = [
        globe.current.scale.x,
        globe.current.scale.y,
        globe.current.scale.z,
      ];
    }

    // Interpolate rotation and scale for the raster mesh
    if (raster.current) {
      const delta = interpolationSpeed;

      // Rotation interpolation
      raster.current.rotation.x +=
        (targetRotation.current[0] - raster.current.rotation.x) * delta;
      raster.current.rotation.y +=
        (targetRotation.current[1] - raster.current.rotation.y) * delta;
      raster.current.rotation.z +=
        (targetRotation.current[2] - raster.current.rotation.z) * delta;

      // Scaling interpolation
      raster.current.scale.x +=
        (targetScale.current[0] - raster.current.scale.x) * delta;
      raster.current.scale.y +=
        (targetScale.current[1] - raster.current.scale.y) * delta;
      raster.current.scale.z +=
        (targetScale.current[2] - raster.current.scale.z) * delta;
    }
  });

  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        ref={globe}
        geometry={nodes.Sphere.geometry}
        material={materials["UV1"]}
        scale={currentScale.current}
        rotation={currentRotation.current}
      />
      <mesh
        ref={raster}
        geometry={nodes.Sphere_001.geometry}
        material={materials["WF"]}
        scale={currentScale.current}
        rotation={currentRotation.current}
      />
    </group>
  );
}

useGLTF.preload("/FunctionalGlobe/NewCustomSphere.gltf");
