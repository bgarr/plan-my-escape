import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { StrictMode, useRef } from "react";
import * as THREE from "three";

// import { CameraControlPanel } from "three/addons/controls/TrackballControls.js";

import { CameraControlPanel } from "./controls/CameraControlPanel";
import { MyCameraControl } from "./controls/MyCameraControl";
import { Viewer } from "./Viewer";

export const App = () => {
  return (
    <StrictMode>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Scene />
        {/* <Canvas
          style={{ width: 800, height: 400 }}
          camera={{ rotation: [0, Math.PI / 2, 0], position: [0, 0, 0] }}
        >
          {/* <PerspectiveCamera
            far={1000}
            fov={35}
            makeDefault
            near={0.1}
            position={[0, 0, 0]}
            rotation={[0, Math.PI / 2, 0]}
          /> */}
          <Viewer modelName="PrivateJet" />
          <OrbitControls />
        </Canvas> */}
      </div>
    </StrictMode>
  );
};
