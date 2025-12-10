declare module "lenis/react" {
  import { ReactNode } from "react";
  import Lenis, { LenisOptions } from "lenis";

  export interface LenisProps {
    root?: boolean;
    options?: LenisOptions;
    autoRaf?: boolean;
    children?: ReactNode;
    className?: string;
  }

  export const ReactLenis: React.FC<LenisProps>;
  export function useLenis(
    callback?: (lenis: Lenis) => void,
    deps?: any[]
  ): Lenis | undefined;
}
