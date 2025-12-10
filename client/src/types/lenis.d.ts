declare module "lenis" {
  export interface LenisOptions {
    wrapper?: Window | HTMLElement;
    content?: HTMLElement;
    wheelEventsTarget?: Window | HTMLElement;
    eventsTarget?: Window | HTMLElement;
    smoothWheel?: boolean;
    syncTouch?: boolean;
    syncTouchLerp?: number;
    touchInertiaExponent?: number;
    duration?: number;
    easing?: (t: number) => number;
    lerp?: number;
    infinite?: boolean;
    orientation?: "vertical" | "horizontal";
    gestureOrientation?: "vertical" | "horizontal" | "both";
    touchMultiplier?: number;
    wheelMultiplier?: number;
    autoResize?: boolean;
    prevent?: (node: Element) => boolean;
    virtualScroll?: (t: any) => void;
    overscroll?: boolean;
    autoRaf?: boolean;
    anchors?: boolean;
    autoToggle?: boolean;
  }

  export default class Lenis {
    constructor(options?: LenisOptions);
    raf(time: number): void;
    destroy(): void;
    scrollTo(target: any, options?: any): void;
    on(event: string, callback: (args: any) => void): void;
    stop(): void;
    start(): void;
    resize(): void;
  }
}
