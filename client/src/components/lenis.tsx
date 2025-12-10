import React, { createContext, useContext, useEffect, useRef } from "react";
import Lenis from "@/lib/lenis";

interface LenisContextValue {
  lenis: Lenis | null;
}

const LenisContext = createContext<LenisContextValue | null>(null);

export const useLenis = () => {
  const context = useContext(LenisContext);
  if (!context) {
    throw new Error("useLenis must be used within a ReactLenis component");
  }
  return context.lenis;
};

interface ReactLenisProps {
  root?: boolean;
  options?: any;
  children: React.ReactNode;
}

export const ReactLenis: React.FC<ReactLenisProps> = ({
  root,
  options,
  children,
}) => {
  const [lenis, setLenis] = React.useState<Lenis | null>(null);

  useEffect(() => {
    const lenisInstance = new Lenis({
      ...options,
    });
    setLenis(lenisInstance);

    function raf(time: number) {
      lenisInstance.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenisInstance.destroy();
      setLenis(null);
    };
  }, [options]);

  return (
    <LenisContext.Provider value={{ lenis }}>{children}</LenisContext.Provider>
  );
};
