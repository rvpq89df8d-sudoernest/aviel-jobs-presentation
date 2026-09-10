export type ZoomDepth = 1 | 2 | 3 | 4 | 5 | 6

export type ZoomFocus = {
  cx: number
  cy: number
}

export type ZoomRegion = {
  id: string
  start: number
  end: number
  depth: ZoomDepth
  focus: ZoomFocus
}

export const ZOOM_DEPTH_SCALES: Record<ZoomDepth, number> = {
  1: 1.25,
  2: 1.5,
  3: 1.8,
  4: 2.2,
  5: 3.5,
  6: 5,
}

export type CameraTransform = {
  scale: number
  x: number
  y: number
  progress: number
  focusX: number
  focusY: number
}

export type MaskRect = {
  x: number
  y: number
  width: number
  height: number
}
