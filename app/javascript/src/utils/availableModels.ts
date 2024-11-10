import { CanvasProps } from "@react-three/fiber";
import { PrivateJet } from "../private_jet/PrivateJet";

type ModelProps = CanvasProps & Record<string, any>;
type Model = (props: ModelProps) => React.JSX.Element;

export const availableModels: Record<string, Model> = {
  'PrivateJet': PrivateJet
}