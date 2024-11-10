import React, { useRef } from "react";
import { PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

export const OrientatedCamera = () => {
  return (
    <>
      <PerspectiveCamera
          far={1000}
          fov={35}
          makeDefault
          near={0.1}
          position={[ 0, 0, 0 ]}
          rotation={[ 0, Math.PI / 2, 0 ]}
        />
    </>
  );
}