import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import React from "react";
import * as THREE from "three";

import { availableModels } from "./utils/availableModels";

type ViewerProps = {
  modelName: string;
};

export const Viewer = ({ modelName }: ViewerProps) => {
  const Model = availableModels[modelName];
  if (!Model) return null;

  const { camera } = useThree();

  return (
    <>
      <Model children={undefined} />
      {/* <MyCameraControl cameraRef={cameraRef} /> */}
    </>
  );
};
