import { gsap, registerGsap } from '@/lib/motion/gsapRuntime.ts'
import { Application, Container, Graphics, Text, TextStyle } from 'pixi.js'
import { MotionBlurFilter } from 'pixi-filters/motion-blur'
import { ZoomBlurFilter } from 'pixi-filters/zoom-blur'
import { useEffect, useRef } from 'react'
import { CONSULTING_ZOOM_REGIONS, CRM_ZOOM_REGIONS, INTAKE_ZOOM_REGIONS, WAREHOUSE_ZOOM_REGIONS } from './demoRegions.ts'
import { cameraFromZoom, sampleZoom } from './zoomMath.ts'
import type { ZoomRegion } from './types.ts'

export type RecordlyVariant = 'warehouse' | 'crm' | 'consulting' | 'intake'

type RecordlyStageProps = {
  active?: boolean
  variant?: RecordlyVariant
  className?: string
  caption?: string
}

function regionsFor(variant: RecordlyVariant): ZoomRegion[] {
  if (variant === 'crm') {
    return CRM_ZOOM_REGIONS
  }
  if (variant === 'consulting') {
    return CONSULTING_ZOOM_REGIONS
  }
  if (variant === 'intake') {
    return INTAKE_ZOOM_REGIONS
  }
  return WAREHOUSE_ZOOM_REGIONS
}

function drawWarehouse(layer: Graphics, width: number, height: number) {
  layer.roundRect(0, 0, width, height, 18)
  layer.fill({ color: 0x0c1018 })

  const rail = Math.max(64, Math.min(88, width * 0.07))
  layer.rect(0, 0, rail, height)
  layer.fill({ color: 0x07090f })

  for (let i = 0; i < 7; i += 1) {
    layer.roundRect(rail * 0.18, 28 + i * (height * 0.11), rail * 0.64, 10, 4)
    layer.fill({ color: i === 1 ? 0xc4a574 : 0x1c2433 })
  }

  const contentX = rail + 24
  const contentW = width - contentX - 24
  layer.roundRect(contentX, 18, contentW, 42, 12)
  layer.fill({ color: 0x121826 })
  layer.roundRect(contentX + 16, 30, Math.min(180, contentW * 0.2), 18, 6)
  layer.fill({ color: 0x7ee0f2 })
  layer.roundRect(contentX + contentW - 120, 30, 88, 18, 6)
  layer.fill({ color: 0xc4a574 })

  const cols = 3
  const rows = 2
  const gap = 16
  const gridY = 78
  const gridH = height - gridY - 24
  const cardW = (contentW - gap * (cols - 1)) / cols
  const cardH = (gridH - gap) / rows
  const accents = [0x2a3eb8, 0xc4a574, 0x7ee0f2, 0xff5c7a, 0x9aa3b5, 0x2a3eb8]

  for (let index = 0; index < cols * rows; index += 1) {
    const col = index % cols
    const row = Math.floor(index / cols)
    const x = contentX + col * (cardW + gap)
    const y = gridY + row * (cardH + gap)
    layer.roundRect(x, y, cardW, cardH, 16)
    layer.fill({ color: 0x151b27 })
    layer.roundRect(x + 16, y + 18, Math.min(96, cardW * 0.28), 10, 4)
    layer.fill({ color: accents[index] })
    layer.roundRect(x + 16, y + 42, cardW * 0.72, 8, 4)
    layer.fill({ color: 0x2a3344 })
    layer.roundRect(x + 16, y + 58, cardW * 0.48, 8, 4)
    layer.fill({ color: 0x2a3344 })
    layer.roundRect(x + 16, y + cardH - 38, 56, 20, 8)
    layer.fill({ color: 0x1c2433 })
  }
}

function drawCrm(layer: Graphics, width: number, height: number) {
  layer.roundRect(0, 0, width, height, 18)
  layer.fill({ color: 0x12151c })

  const gap = 14
  const colW = (width - 40 - gap * 2) / 3
  const y = 56
  const h = height - y - 28

  layer.roundRect(16, 14, 160, 28, 8)
  layer.fill({ color: 0x1c2230 })
  layer.roundRect(width - 120, 18, 88, 18, 8)
  layer.fill({ color: 0x25d366 })

  const columns = [16, 16 + colW + gap, 16 + (colW + gap) * 2]
  for (const [index, x] of columns.entries()) {
    layer.roundRect(x, y, colW, h, 16)
    layer.fill({ color: index === 1 ? 0x0e1116 : 0x1a1f29 })
  }

  for (let i = 0; i < 3; i += 1) {
    const cardY = y + 18 + i * (h * 0.28)
    layer.roundRect(columns[0] + 14, cardY, colW - 28, h * 0.22, 12)
    layer.fill({ color: 0x222833 })
    layer.circle(columns[0] + 40, cardY + h * 0.11, 16)
    layer.fill({ color: 0x7ee0f2 })
  }

  const chatX = columns[1] + 18
  const bubbles = [
    { x: chatX, w: colW * 0.62, y: y + 24, color: 0x2a3344 },
    { x: chatX + colW * 0.18, w: colW * 0.58, y: y + 78, color: 0x075e54 },
    { x: chatX, w: colW * 0.7, y: y + 132, color: 0x2a3344 },
    { x: chatX + colW * 0.12, w: colW * 0.64, y: y + 186, color: 0x075e54 },
  ]
  for (const bubble of bubbles) {
    layer.roundRect(bubble.x, bubble.y, bubble.w, 42, 14)
    layer.fill({ color: bubble.color })
  }

  layer.roundRect(columns[1] + 12, y + h - 52, colW - 24, 36, 18)
  layer.fill({ color: 0x252b36 })

  layer.circle(columns[2] + colW / 2, y + 70, 36)
  layer.fill({ color: 0x3b82f6 })
  layer.roundRect(columns[2] + 24, y + 124, colW - 48, 10, 4)
  layer.fill({ color: 0x3a4458 })
  layer.roundRect(columns[2] + 36, y + 146, colW - 72, 8, 4)
  layer.fill({ color: 0x2a3344 })
  for (let i = 0; i < 3; i += 1) {
    layer.roundRect(columns[2] + 22, y + 180 + i * 36, colW - 44, 28, 10)
    layer.fill({ color: 0x222833 })
  }
}

function drawConsulting(layer: Graphics, width: number, height: number) {
  layer.roundRect(0, 0, width, height, 18)
  layer.fill({ color: 0xf3f6fb })

  const rail = Math.max(72, width * 0.16)
  layer.rect(width - rail, 0, rail, height)
  layer.fill({ color: 0xe8eef8 })

  for (let i = 0; i < 8; i += 1) {
    layer.roundRect(width - rail + 16, 28 + i * 36, rail - 32, 22, 8)
    layer.fill({ color: i === 3 ? 0xbfdbfe : 0xffffff })
  }

  layer.roundRect(24, 18, 200, 16, 6)
  layer.fill({ color: 0x1d4ed8 })
  layer.roundRect(24, 48, Math.min(360, width - rail - 80), 28, 8)
  layer.fill({ color: 0x2563eb })

  const tableX = 24
  const tableW = width - rail - 48
  const tableY = 96
  layer.roundRect(tableX, tableY, tableW, height - tableY - 24, 14)
  layer.fill({ color: 0xffffff })

  for (let i = 0; i < 7; i += 1) {
    const rowY = tableY + 18 + i * 42
    layer.roundRect(tableX + 16, rowY, 28, 12, 4)
    layer.fill({ color: 0xcbd5e1 })
    layer.roundRect(tableX + 56, rowY, tableW * 0.18, 12, 4)
    layer.fill({ color: 0xe2e8f0 })
    layer.roundRect(tableX + tableW * 0.28, rowY, tableW * 0.32, 12, 4)
    layer.fill({ color: 0xdbeafe })
    layer.roundRect(tableX + tableW * 0.64, rowY, tableW * 0.22, 12, 4)
    layer.fill({ color: 0xe2e8f0 })
  }
}

function drawIntake(layer: Graphics, width: number, height: number) {
  layer.roundRect(0, 0, width, height, 18)
  layer.fill({ color: 0x0c1018 })
  layer.roundRect(28, 28, width * 0.32, height - 56, 36)
  layer.fill({ color: 0x111827 })
  layer.roundRect(width * 0.42, 48, width * 0.5, 120, 18)
  layer.fill({ color: 0x1e293b })
  layer.roundRect(width * 0.42, 188, width * 0.5, 140, 18)
  layer.fill({ color: 0x16325c })
}

function drawScene(layer: Graphics, variant: RecordlyVariant, width: number, height: number) {
  layer.clear()
  if (variant === 'crm') {
    drawCrm(layer, width, height)
    return
  }
  if (variant === 'consulting') {
    drawConsulting(layer, width, height)
    return
  }
  if (variant === 'intake') {
    drawIntake(layer, width, height)
    return
  }
  drawWarehouse(layer, width, height)
}

export default function RecordlyStage({
  active = false,
  variant = 'warehouse',
  className,
  caption,
}: RecordlyStageProps) {
  const hostRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef(0)
  const variantRef = useRef(variant)
  variantRef.current = variant

  useEffect(() => {
    registerGsap()
    const state = { v: 0 }
    if (!active) {
      progressRef.current = 0
      return
    }
    const tween = gsap.fromTo(
      state,
      { v: 0 },
      {
        v: 1,
        duration: 2.8,
        ease: 'power2.inOut',
        onUpdate: () => {
          progressRef.current = state.v
        },
      },
    )
    return () => {
      tween.kill()
    }
  }, [active, variant])

  useEffect(() => {
    const host = hostRef.current
    if (!host) {
      return
    }

    let disposed = false
    let app: Application | null = null
    let tickerFn: (() => void) | null = null

    const boot = async () => {
      const pixi = new Application()
      await pixi.init({
        backgroundAlpha: 0,
        antialias: true,
        preference: 'webgl',
        autoDensity: true,
        resolution: Math.min(window.devicePixelRatio, 2),
        resizeTo: host,
      })

      if (disposed) {
        pixi.destroy(true)
        return
      }

      host.appendChild(pixi.canvas)
      app = pixi

      const wallpaper = new Graphics()
      const frame = new Graphics()
      const clip = new Container()
      const mask = new Graphics()
      const camera = new Container()
      const scene = new Graphics()
      const labels = new Container()
      const zoomBlur = new ZoomBlurFilter({ strength: 0, innerRadius: 0, radius: -1 })
      const motionBlur = new MotionBlurFilter({
        velocity: { x: 0, y: 0 },
        kernelSize: 9,
        offset: 0,
      })
      camera.filters = [zoomBlur, motionBlur]
      clip.mask = mask

      pixi.stage.addChild(wallpaper)
      pixi.stage.addChild(clip)
      clip.addChild(camera)
      camera.addChild(scene)
      camera.addChild(labels)
      pixi.stage.addChild(mask)
      pixi.stage.addChild(frame)

      let prevScale = 1
      let prevX = 0
      let prevY = 0
      const maskRect = { x: 0, y: 0, width: 1, height: 1 }

      const layout = () => {
        const width = pixi.screen.width
        const height = pixi.screen.height
        const pad = Math.min(width, height) * 0.06
        maskRect.x = pad
        maskRect.y = pad
        maskRect.width = width - pad * 2
        maskRect.height = height - pad * 2

        wallpaper.clear()
        wallpaper.rect(0, 0, width, height)
        wallpaper.fill({ color: variantRef.current === 'consulting' ? 0xe8eef8 : 0x07090f })

        mask.clear()
        mask.roundRect(maskRect.x, maskRect.y, maskRect.width, maskRect.height, 22)
        mask.fill({ color: 0xffffff })

        frame.clear()
        frame.roundRect(maskRect.x - 8, maskRect.y - 8, maskRect.width + 16, maskRect.height + 16, 26)
        frame.stroke({ color: 0xc4a574, width: 1.2, alpha: 0.4 })

        drawScene(scene, variantRef.current, maskRect.width, maskRect.height)
        scene.position.set(maskRect.x, maskRect.y)
        labels.removeChildren()
        const style = new TextStyle({
          fontFamily: 'Heebo, Arial, sans-serif',
          fontSize: 16,
          fill: variantRef.current === 'consulting' ? '#1d4ed8' : '#e8e4d9',
          fontWeight: '700',
        })
        const captionText =
          variantRef.current === 'consulting'
            ? 'כל ראיונות/ייעוץ הווידאו'
            : variantRef.current === 'crm'
              ? 'צ׳אט וואטסאפ · ליד חדש'
              : variantRef.current === 'intake'
                ? 'תיק מועמד · לונדון → סניף'
                : 'משרות סניפים'
        const title = new Text({ text: captionText, style })
        title.position.set(maskRect.x + 36, maskRect.y + 28)
        labels.addChild(title)
      }

      layout()
      pixi.renderer.on('resize', layout)

      tickerFn = () => {
        const zoom = sampleZoom(regionsFor(variantRef.current), progressRef.current)
        const cameraState = cameraFromZoom(
          { width: pixi.screen.width, height: pixi.screen.height },
          maskRect,
          zoom,
        )
        camera.scale.set(cameraState.scale)
        camera.position.set(cameraState.x, cameraState.y)

        const dScale = cameraState.scale - prevScale
        zoomBlur.strength = Math.min(10, Math.abs(dScale) * 40)
        zoomBlur.center = { x: pixi.screen.width / 2, y: pixi.screen.height / 2 }
        const moving = Math.abs(dScale) > 0.002 || Math.abs(cameraState.x - prevX) > 0.4
        motionBlur.velocity = moving
          ? {
              x: (cameraState.x - prevX) * 0.28,
              y: (cameraState.y - prevY) * 0.28,
            }
          : { x: 0, y: 0 }
        if (!moving) {
          zoomBlur.strength = 0
        }
        prevScale = cameraState.scale
        prevX = cameraState.x
        prevY = cameraState.y
      }

      pixi.ticker.add(tickerFn)
    }

    void boot()

    return () => {
      disposed = true
      if (app && tickerFn) {
        app.ticker.remove(tickerFn)
      }
      app?.destroy(true, { children: true })
      app = null
      host.replaceChildren()
    }
  }, [variant])

  return (
    <figure className={className}>
      <div ref={hostRef} className="h-full min-h-[280px] w-full overflow-hidden rounded-[28px]" />
      {caption ? (
        <figcaption className="mt-3 font-mono text-[11px] tracking-[0.18em] text-muted uppercase">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  )
}
