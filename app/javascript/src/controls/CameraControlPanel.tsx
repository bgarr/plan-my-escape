import { LevaPanel, useControls } from "leva";
import { createPlugin, useInputContext } from 'leva/plugin';
import React from "react";
import * as THREE from 'three';
import { EightBallProps, EightBallView } from "./EightBall";

// essentially no-ops. We don't need to do anything to the value
const normalize = (input: THREE.Euler) => ({ value: input, settings: undefined })
const sanitize = (value: any) => value;

export const eightBallPlugin = createPlugin<any, any, any>({
  normalize,
  sanitize,
  component: EightBallView,
})

type CameraControlPanelProps = {
  cameraRef: React.RefObject<THREE.PerspectiveCamera>
}

export const CameraControlPanel = ({ cameraRef }: CameraControlPanelProps) => {

  const onRoll = (value: number) => {
    if (!cameraRef.current) return;
    
    const camera = cameraRef.current;
    camera.rotation.z = value;
  } 
  useControls(():any => {
    return {
      roll: { value: 0, min: -Math.PI, max: Math.PI, onChange: onRoll },
      orientation: eightBallPlugin({ orientation: new THREE.Euler(0, 0, 0) })
    }
  });

  return (
    <div style={{ width: 800, height: 400 }}>
      <LevaPanel fill flat titleBar={false} />
    </div>
  );
}