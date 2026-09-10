import { LIVE_URL } from '@/i18n/copy.ts'
import { useLocale } from '@/i18n/LocaleContext.tsx'
import { Player } from '@remotion/player'
import { CTA_DURATION, CTA_FPS, CTA_HEIGHT, CTA_WIDTH, LiveCtaFilm } from './LiveCtaFilm.tsx'
import { MAP_DURATION, MAP_FPS, MAP_HEIGHT, MAP_WIDTH, MapFilm } from './MapFilm.tsx'

export function MapPlayer() {
  const { t } = useLocale()

  return (
    <div className="relative h-full w-full overflow-hidden rounded-[28px]">
      <Player
        component={MapFilm}
        inputProps={{ liveLabel: t.live, prompt: t.mapPrompt, here: t.mapHere }}
        durationInFrames={MAP_DURATION}
        fps={MAP_FPS}
        compositionWidth={MAP_WIDTH}
        compositionHeight={MAP_HEIGHT}
        autoPlay
        loop
        clickToPlay={false}
        spaceKeyToPlayOrPause={false}
        acknowledgeRemotionLicense
        style={{ width: '100%', height: '100%' }}
      />
      <a
        href={LIVE_URL}
        target="_blank"
        rel="noreferrer"
        className="absolute bottom-5 left-1/2 z-10 -translate-x-1/2 rounded-full px-8 py-3 text-sm font-bold text-transparent"
      >
        {t.live}
      </a>
    </div>
  )
}

export function LiveCtaPlayer() {
  const { t } = useLocale()

  return (
    <div className="relative mx-auto h-[120px] w-full max-w-md">
      <Player
        component={LiveCtaFilm}
        inputProps={{ label: t.live }}
        durationInFrames={CTA_DURATION}
        fps={CTA_FPS}
        compositionWidth={CTA_WIDTH}
        compositionHeight={CTA_HEIGHT}
        autoPlay
        loop
        clickToPlay={false}
        spaceKeyToPlayOrPause={false}
        acknowledgeRemotionLicense
        style={{ width: '100%', height: '100%' }}
      />
      <a
        href={LIVE_URL}
        target="_blank"
        rel="noreferrer"
        className="absolute inset-0 z-10"
        aria-label={t.live}
      />
    </div>
  )
}
