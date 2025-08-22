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

function Model({ baseColor = "#000000", accentColor = "#FFFFFF" }) {
  const { scene } = useGLTF("/models/hoodie.glb");

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh && child.material) {
        const name = child.name.toLowerCase();
        if (name.includes("hoodie") || name.includes("body")) {
          child.material.color.set(baseColor);
          child.material.needsUpdate = true;
        }
      }
    });
  }, [scene, baseColor]);

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
  { zoom, fullscreen, baseColor, accentColor },
  ref
) {
  const controlsRef = React.useRef();

  const handleResetCamera = () => controlsRef.current?.reset();
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
          background:
            "linear-gradient(to bottom, #f0f0f0, rgba(240,240,240,0.5))",
        }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, zoom.value]} />
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
          <Model baseColor={baseColor} accentColor={accentColor} />
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
