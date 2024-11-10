import { AccumulativeShadows, CameraControls, Center, Environment, Grid, RandomizedLight, useGLTF } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { button, buttonGroup, folder, useControls } from "leva";
import React from "react";
import { forwardRef, memo, useRef } from "react";
import { suspend } from "suspend-react";
import * as THREE from "three";

const city = import("@pmndrs/assets/hdri/city.exr");
const suzi = import("@pmndrs/assets/models/suzi.glb");

const { DEG2RAD } = THREE.MathUtils;

export default function App2() {
  return (
    <Canvas shadows camera={{ position: [0, 0, 5], fov: 60 }}>
      <Scene />
    </Canvas>
  );
}

function Scene() {
  const meshRef = useRef<THREE.Mesh>(null);
  const cameraControlsRef = useRef<CameraControls>(null);

  const { camera } = useThree();

  // All same options as the original "basic" example: https://yomotsu.github.io/camera-controls/examples/basic.html
  const {
    minDistance,
    enabled,
    verticalDragToForward,
    dollyToCursor,
    infinityDolly,
  } = useControls({
    thetaGrp: buttonGroup({
      label: "rotate theta",
      opts: {
        "+45º": () => cameraControlsRef.current?.rotate(45 * DEG2RAD, 0, true),
        "-90º": () => cameraControlsRef.current?.rotate(-90 * DEG2RAD, 0, true),
        "+360º": () =>
          cameraControlsRef.current?.rotate(360 * DEG2RAD, 0, true),
      },
    }),
    phiGrp: buttonGroup({
      label: "rotate phi",
      opts: {
        "+20º": () => cameraControlsRef.current?.rotate(0, 20 * DEG2RAD, true),
        "-40º": () => cameraControlsRef.current?.rotate(0, -40 * DEG2RAD, true),
      },
    }),
    truckGrp: buttonGroup({
      label: "truck",
      opts: {
        "(1,0)": () => cameraControlsRef.current?.truck(1, 0, true),
        "(0,1)": () => cameraControlsRef.current?.truck(0, 1, true),
        "(-1,-1)": () => cameraControlsRef.current?.truck(-1, -1, true),
      },
    }),
    dollyGrp: buttonGroup({
      label: "dolly",
      opts: {
        "1": () => cameraControlsRef.current?.dolly(1, true),
        "-1": () => cameraControlsRef.current?.dolly(-1, true),
      },
    }),
    zoomGrp: buttonGroup({
      label: "zoom",
      opts: {
        "/2": () => cameraControlsRef.current?.zoom(camera.zoom / 2, true),
        "/-2": () => cameraControlsRef.current?.zoom(-camera.zoom / 2, true),
      },
    }),
    minDistance: { value: 0 },
    moveTo: folder(
      {
        vec1: { value: [3, 5, 2], label: "vec" },
        "moveTo(…vec)": button((get) => {
          const { x, y, z } = get("moveTo.vec1");
          cameraControlsRef.current?.moveTo(x, y, z, true);
        }),
      },
      { collapsed: true }
    ),
    "fitToBox(mesh)": button(
      () =>
        cameraControlsRef.current?.fitToBox(
          meshRef.current || new THREE.Mesh(),
          true
        )
    ),
    setPosition: folder(
      {
        vec2: { value: [-5, 2, 1], label: "vec" },
        "setPosition(…vec)": button((get) => {
          const { x, y, z } = get("setPosition.vec2");
          cameraControlsRef.current?.setPosition(x, y, z, true);
        }),
      },
      { collapsed: true }
    ),
    setTarget: folder(
      {
        vec3: { value: [3, 0, -3], label: "vec" },
        "setTarget(…vec)": button((get) => {
          const { x, y, z } = get("setTarget.vec3");
          cameraControlsRef.current?.setTarget(x, y, z, true);
        }),
      },
      { collapsed: true }
    ),
    setLookAt: folder(
      {
        vec4: { value: [1, 2, 3], label: "position" },
        vec5: { value: [1, 1, 0], label: "target" },
        "setLookAt(…position, …target)": button((get) => {
          const { x1, y1, z1 } = get("setLookAt.vec4");
          const { x2, y2, z2 } = get("setLookAt.vec4");
          cameraControlsRef.current?.setLookAt(x1, y1, z1, x2, y2, z2, true);
        }),
      },
      { collapsed: true }
    ),
    // lerpLookAt: folder(
    //   {
    //     vec6: { value: [-2, 0, 0], label: "posA" },
    //     vec7: { value: [1, 1, 0], label: "tgtA" },
    //     vec8: { value: [0, 2, 5], label: "posB" },
    //     vec9: { value: [-1, 0, 0], label: "tgtB" },
    //     t: { value: Math.random(), label: "t", min: 0, max: 1 },
    //     "f(…posA,…tgtA,…posB,…tgtB,t)": button((get) => {
    //       return cameraControlsRef.current?.lerpLookAt(
    //         ...get("lerpLookAt.vec6"),
    //         ...get("lerpLookAt.vec7"),
    //         ...get("lerpLookAt.vec8"),
    //         ...get("lerpLookAt.vec9"),
    //         get("lerpLookAt.t"),
    //         true
    //       );
    //     }),
    //   },
    //   { collapsed: true }
    // ),
    saveState: button(() => cameraControlsRef.current?.saveState()),
    reset: button(() => cameraControlsRef.current?.reset(true)),
    enabled: { value: true, label: "controls on" },
    verticalDragToForward: {
      value: false,
      label: "vert. drag to move forward",
    },
    dollyToCursor: { value: false, label: "dolly to cursor" },
    infinityDolly: { value: false, label: "infinity dolly" },
  });

  //rotation={[-0.63, 0, 0]}
  return (
    <>
      <group position-y={-0.5}>
        <Center top>
          <Suzi ref={meshRef} />
        </Center>
        <Ground />
        <Shadows />
        <CameraControls
          ref={cameraControlsRef}
          minDistance={minDistance}
          enabled={enabled}
          verticalDragToForward={verticalDragToForward}
          dollyToCursor={dollyToCursor}
          infinityDolly={infinityDolly}
        />
      </group>
    </>
  );
}

function Ground() {
  const gridConfig = {
    cellSize: 0.5,
    cellThickness: 0.5,
    cellColor: "#6f6f6f",
    sectionSize: 3,
    sectionThickness: 1,
    sectionColor: "#9d4b4b",
    fadeDistance: 30,
    fadeStrength: 1,
    followCamera: false,
    infiniteGrid: true,
  };
  return <Grid position={[0, -0.01, 0]} args={[10.5, 10.5]} {...gridConfig} />;
}

const Shadows = memo(() => (
  <AccumulativeShadows
    temporal
    frames={100}
    color="#9d4b4b"
    colorBlend={0.5}
    alphaTest={0.9}
    scale={20}
  >
    <RandomizedLight amount={8} radius={4} position={[5, 5, -10]} />
  </AccumulativeShadows>
));

const Suzi = forwardRef<THREE.Mesh>((props, ref) => {
  const { nodes } = useGLTF(
    suspend<any, (...keys: string[]) => Promise<{ default: any }>>(suzi).default
  ) as any;
  return (
    <>
      <mesh
        ref={ref}
        castShadow
        receiveShadow
        geometry={nodes.mesh.geometry}
        {...props}
      >
        <meshStandardMaterial color="#9d4b4b" />
      </mesh>
    </>
  );
});
