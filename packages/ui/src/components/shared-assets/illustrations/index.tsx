import type { HTMLAttributes, ReactElement } from "react";
import { BoxIllustration } from "./box";
import { CloudIllustration } from "./cloud";
import { CreditCardIllustration } from "./credit-card";
import { DocumentsIllustration } from "./documents";

export interface IllustrationProps extends HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg";
  svgClassName?: string;
  childrenClassName?: string;
}

type IllustrationType = "box" | "cloud" | "documents" | "credit-card";
type IllustrationComponent = (props: IllustrationProps) => ReactElement;

const types: Record<IllustrationType, IllustrationComponent> = {
  box: BoxIllustration,
  cloud: CloudIllustration,
  documents: DocumentsIllustration,
  "credit-card": CreditCardIllustration,
};

export const Illustration = (props: IllustrationProps & { type: IllustrationType }) => {
  const { type } = props;

  const Component = types[type];

  return <Component {...props} />;
};
