import type { ZoomRegion } from './types.ts'

export const WAREHOUSE_ZOOM_REGIONS: ZoomRegion[] = [
  {
    id: 'hq-glass',
    start: 0.08,
    end: 0.42,
    depth: 3,
    focus: { cx: 0.28, cy: 0.42 },
  },
  {
    id: 'branch-cell',
    start: 0.36,
    end: 0.72,
    depth: 4,
    focus: { cx: 0.72, cy: 0.38 },
  },
  {
    id: 'agent-rail',
    start: 0.66,
    end: 0.96,
    depth: 5,
    focus: { cx: 0.55, cy: 0.7 },
  },
]

export const CRM_ZOOM_REGIONS: ZoomRegion[] = [
  {
    id: 'match-rail',
    start: 0,
    end: 0.38,
    depth: 3,
    focus: { cx: 0.18, cy: 0.42 },
  },
  {
    id: 'whatsapp-chat',
    start: 0.22,
    end: 1,
    depth: 6,
    focus: { cx: 0.5, cy: 0.48 },
  },
]

export const CONSULTING_ZOOM_REGIONS: ZoomRegion[] = [
  {
    id: 'table-enter',
    start: 0,
    end: 0.45,
    depth: 3,
    focus: { cx: 0.52, cy: 0.4 },
  },
  {
    id: 'row-focus',
    start: 0.32,
    end: 1,
    depth: 5,
    focus: { cx: 0.48, cy: 0.58 },
  },
]

export const INTAKE_ZOOM_REGIONS: ZoomRegion[] = [
  {
    id: 'file',
    start: 0,
    end: 0.45,
    depth: 3,
    focus: { cx: 0.62, cy: 0.32 },
  },
  {
    id: 'branch-assign',
    start: 0.3,
    end: 1,
    depth: 5,
    focus: { cx: 0.68, cy: 0.62 },
  },
]
