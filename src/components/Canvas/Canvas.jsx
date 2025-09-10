import React, {
  useEffect,
  Suspense,
  forwardRef,
  useImperativeHandle,
} from "react";

import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  PerspectiveCamera,
  Environment,
  useGLTF,
  ContactShadows,
  Center,
  Html,
} from "@react-three/drei";
import { Paper } from "@mui/material";
import { motion } from "framer-motion";

function Model({ hoodieColors }) {
  const { scene } = useGLTF("/models/oversized-hoodie.glb");

  useEffect(() => {
    if (!hoodieColors) return;

    scene.traverse((child) => {
      if (child.isMesh && child.material) {
        const name = child.name.toLowerCase();

        if (name.includes("_1")) {
          child.material.color.set(hoodieColors.part1);
        } else if (name.includes("_2")) {
          child.material.color.set(hoodieColors.part2);
        } else if (name.includes("_3")) {
          child.material.color.set(hoodieColors.part3);
        } else if (name.includes("_4")) {
          child.material.color.set(hoodieColors.part4);
        }
        child.material.needsUpdate = true;
      }
    });
  }, [scene, hoodieColors]);

  return (
    <group>
      <Center>
        <primitive object={scene} scale={2} />
      </Center>
      <ContactShadows
        position={[0, -1.2, 0]}
        opacity={0.5}
        scale={10}
        blur={1.5}
        far={5}
      />
    </group>
  );
}

const Customizer = forwardRef(function Customizer(
  { zoom, fullscreen, hoodieColors },
  ref
) {
  const controlsRef = React.useRef();

  const handleResetCamera = () => {
    if (!controlsRef.current) return;
    controlsRef.current.object.position.set(0, 0, 250);
    controlsRef.current.target.set(0, 0, 0);
    controlsRef.current.update();
  };
  const handleZoomIn = () => zoom.set((prev) => Math.max(prev - 1, 2));
  const handleZoomOut = () => zoom.set((prev) => Math.min(prev + 1, 10));
  const toggleFullscreen = () => fullscreen.set((prev) => !prev);

  const setCameraDirection = (direction) => {
    if (!controlsRef.current) return;
    const azimuthMap = {
      F: 0,
      B: Math.PI,
      L: -Math.PI / 2,
      R: Math.PI / 2,
    };
    controlsRef.current.setAzimuthalAngle(azimuthMap[direction]);
    controlsRef.current.update();
  };

  useImperativeHandle(ref, () => ({
    reset: handleResetCamera,
    zoomIn: handleZoomIn,
    zoomOut: handleZoomOut,
    toggleFullscreen,
    setDirection: setCameraDirection,
  }));

  return (
    <motion.div
      className={`relative flex-1 ${
        fullscreen.value ? "fixed inset-0 z-50" : ""
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <Canvas
        shadows
        style={{
          height: fullscreen.value ? "100vh" : "600px",
          background: "transparent",
        }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 250]} />
        <ambientLight intensity={0.5} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          intensity={0.5}
          castShadow
        />
        <Suspense
          fallback={
            <Html center>
              <div>Loading...</div>
            </Html>
          }
        >
          <Model hoodieColors={hoodieColors} />
          <Environment preset="studio" />
        </Suspense>
        <OrbitControls
          ref={controlsRef}
          enablePan={false}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>
      <Paper
        elevation={3}
        sx={{
          position: "absolute",
          top: 16,
          left: 16,
          padding: "8px 12px",
          borderRadius: 2,
          backdropFilter: "blur(8px)",
          backgroundColor: "rgba(255,255,255,0.6)",
          fontSize: "0.875rem",
        }}
      >
        <p style={{ color: "rgba(0,0,0,0.7)", margin: 0 }}>
          Tip: Click and drag to rotate the hoodie
        </p>
      </Paper>
    </motion.div>
  );
});

export default Customizer;
