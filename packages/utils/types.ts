export type CheckPermissionFn = (permission: any) => boolean;

export interface PermissionOptions {
  checkFunc: CheckPermissionFn;
}

export interface WatermarkPluginOptions {
  defaultWatermark: string;
  font?: string;
  fontColor?: string | CanvasGradient | CanvasPattern; // 文字颜色
  width: number;
  height: number;
  angle: number;
}

export interface WatermarkObject {
  text?: string;
  font?: string;
  fontColor?: string | CanvasGradient | CanvasPattern; // 文字颜色
  width?: number;
  height?: number;
  angle?: number;
}

export type WatermarkOption = string | WatermarkObject;

export interface LongClickOption {
  delay: number;
  interval: number;
}

export interface ResizeTextOption {
  delay: number;
  ratio: number;
  minFontSize: string;
  maxFontSize: string;
}
