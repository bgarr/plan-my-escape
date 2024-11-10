import { CameraControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useControls } from "leva";
import React, { useRef } from "react";
import * as THREE from "three";

type MyCameraControlProps = {
  cameraRef: React.RefObject<THREE.PerspectiveCamera>;
};

export const MyCameraControl = ({ cameraRef }: MyCameraControlProps) => {
  const cameraControlsRef = useRef(null);
  useControls({
    orientation: {
      value: { theta: 0, phi: 0 },

      onChange: (value) => {
        debugger;
        cameraControlsRef.current?.rotate(value.theta, value.phi, true);
      },
    },
  });

  return (
    <CameraControls
      ref={cameraControlsRef}
      camera={cameraRef.current || undefined}
      verticalDragToForward={true}
    />
  );
};
