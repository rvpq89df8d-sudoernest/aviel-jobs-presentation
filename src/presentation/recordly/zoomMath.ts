import { ZOOM_DEPTH_SCALES, type CameraTransform, type MaskRect, type ZoomRegion } from './types.ts'

export function clamp01(value: number) {
  return Math.min(1, Math.max(0, value))
}

export function easeOutCubic(t: number) {
  const x = clamp01(t)
  return 1 - (1 - x) ** 3
}

export function sampleZoom(regions: ZoomRegion[], t: number): CameraTransform {
  const time = clamp01(t)
  let best: { region: ZoomRegion; local: number } | null = null

  for (const region of regions) {
    if (time < region.start || time > region.end) {
      continue
    }
    const span = Math.max(0.0001, region.end - region.start)
    const local = (time - region.start) / span
    if (!best || region.depth >= best.region.depth) {
      best = { region, local }
    }
  }

  if (!best) {
    return {
      scale: 1,
      x: 0,
      y: 0,
      progress: 0,
      focusX: 0.5,
      focusY: 0.5,
    }
  }

  const { region, local } = best
  const peak = local < 0.22 ? easeOutCubic(local / 0.22) : local > 0.82 ? 1 - easeOutCubic((local - 0.82) / 0.18) : 1

  return {
    scale: ZOOM_DEPTH_SCALES[region.depth],
    x: 0,
    y: 0,
    progress: peak,
    focusX: region.focus.cx,
    focusY: region.focus.cy,
  }
}

export function cameraFromZoom(
  stage: { width: number; height: number },
  mask: MaskRect,
  zoom: CameraTransform,
): CameraTransform {
  const progress = clamp01(zoom.progress)
  const scale = 1 + (zoom.scale - 1) * progress
  const focusPxX = mask.x + zoom.focusX * mask.width
  const focusPxY = mask.y + zoom.focusY * mask.height
  const x = (stage.width / 2 - focusPxX * zoom.scale) * progress
  const y = (stage.height / 2 - focusPxY * zoom.scale) * progress

  return {
    ...zoom,
    scale,
    x,
    y,
    progress,
  }
}
