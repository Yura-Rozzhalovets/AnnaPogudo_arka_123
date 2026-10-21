import { useEffect, useRef, useState } from 'react'
import { storyPlaybackRate, storyScenes } from '../data/site.js'
import { BrandCharacter } from '../components/Brand.jsx'
import { RoomScene } from '../components/RoomScene.jsx'
import { createStoryInput } from './story/input.js'
import { createSegmentPlayer } from './story/player.js'

function publish(section, scene, state, direction) {
  const detail = { scene, state, direction }
  ;[document.documentElement, section].forEach((node) => {
    node.dataset.scene = String(scene)
    node.dataset.state = state
    node.dataset.direction = String(direction)
  })
  section.dispatchEvent(new CustomEvent(state === 'transition' ? 'transitionstart' : 'scenechange', { bubbles: true, detail }))
  if (state === 'rest') {
    section.dispatchEvent(new CustomEvent('transitionend', { bubbles: true, detail }))
  }
}

function ScrollStory() {
  const sectionRef = useRef(null)
  const videoRef = useRef(null)
  const sceneRef = useRef(-1)
  const busyRef = useRef(false)
  const engagedRef = useRef(false)
  const armedRef = useRef(true)
  const introRef = useRef(false)
  const failedRef = useRef(false)
  const [scene, setScene] = useState(-1)
  const [phase, setPhase] = useState('door')
  const [doorsOpen, setDoorsOpen] = useState(false)
  const [videoReady, setVideoReady] = useState(false)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    const section = sectionRef.current
    const video = videoRef.current
    if (!section || !video) return undefined
    let alive = true
    const player = createSegmentPlayer(video, storyPlaybackRate)

    const runTransition = async (direction, next) => {
      if (!alive || !Number.isFinite(video.duration)) return
      busyRef.current = true
      if (sceneRef.current < 0) setDoorsOpen(true)
      setPhase('transition')
      publish(section, next, 'transition', direction)
      const from = (sceneRef.current < 0 ? 0 : storyScenes[sceneRef.current].out) * video.duration
      const to = storyScenes[next].out * video.duration
      await player.playTo(from, to)
      if (!alive) return
      sceneRef.current = next
      busyRef.current = false
      setScene(next)
      setPhase('rest')
      publish(section, next, 'rest', direction)
    }

    const showDoor = () => {
      sceneRef.current = -1
      introRef.current = false
      video.pause()
      try {
        video.currentTime = 0
      } catch {
      }
      setDoorsOpen(false)
      setScene(-1)
      setPhase('door')
    }

    const returnToDoor = async () => {
      if (!alive || !Number.isFinite(video.duration) || sceneRef.current < 0) return
      busyRef.current = true
      setPhase('transition')
      publish(section, -1, 'transition', -1)
      const from = storyScenes[sceneRef.current].out * video.duration
      await player.playTo(from, 0)
      if (!alive) return
      sceneRef.current = -1
      introRef.current = false
      busyRef.current = false
      setDoorsOpen(false)
      setScene(-1)
      setPhase('door')
      publish(section, -1, 'rest', -1)
    }

    const startIntro = () => {
      if (introRef.current || !Number.isFinite(video.duration) || video.duration <= 0) return
      introRef.current = true
      setDoorsOpen(true)
      runTransition(1, 0)
    }

    const engage = () => {
      if (engagedRef.current || failedRef.current) return
      engagedRef.current = true
      const top = section.getBoundingClientRect().top + window.scrollY
      window.scrollTo({ top, behavior: 'auto' })
      startIntro()
    }

    const onStep = (direction) => {
      if (!engagedRef.current) return false
      if (busyRef.current) return true
      const next = sceneRef.current + direction
      if (next >= storyScenes.length || (next < 0 && sceneRef.current < 0)) {
        engagedRef.current = false
        armedRef.current = false
        return false
      }
      if (next < 0) {
        returnToDoor()
        return true
      }
      runTransition(direction, next)
      return true
    }

    const unbind = createStoryInput({
      onStep,
      isBusy: () => busyRef.current,
      isEngaged: () => engagedRef.current,
    })

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.intersectionRatio < 0.3) {
        armedRef.current = true
        if (!busyRef.current) {
          engagedRef.current = false
          if (sceneRef.current >= 0 && entry.boundingClientRect.top > 0) showDoor()
        }
      }
      if (entry.intersectionRatio >= 0.72 && armedRef.current) engage()
    }, { threshold: [0.3, 0.72] })
    observer.observe(section)

    const markFailed = () => {
      if (!alive) return
      failedRef.current = true
      engagedRef.current = false
      setFailed(true)
      setPhase('rest')
    }

    const loadTimer = window.setTimeout(() => {
      if (Number.isFinite(video.duration) && video.duration > 0) return
      markFailed()
    }, 4000)

    const onReady = () => {
      if (!Number.isFinite(video.duration) || video.duration <= 0) return
      window.clearTimeout(loadTimer)
      setVideoReady(true)
      if (engagedRef.current) startIntro()
    }

    const onError = () => {
      markFailed()
    }

    video.addEventListener('loadedmetadata', onReady)
    video.addEventListener('error', onError)
    if (video.readyState >= 1) onReady()

    return () => {
      alive = false
      player.stop()
      unbind()
      observer.disconnect()
      window.clearTimeout(loadTimer)
      video.removeEventListener('loadedmetadata', onReady)
      video.removeEventListener('error', onError)
      delete document.documentElement.dataset.scene
      delete document.documentElement.dataset.state
      delete document.documentElement.dataset.direction
    }
  }, [])

  const copy = storyScenes[Math.max(scene, 0)]

  return (
    <section
      className={`scroll-story ${videoReady ? 'scroll-story--video-ready' : ''} ${doorsOpen ? 'scroll-story--open' : ''} ${phase === 'rest' ? 'scroll-story--shown' : ''} ${phase === 'transition' ? 'scroll-story--transition' : ''}`}
      ref={sectionRef}
      id="hero-brand"
      data-scene={scene}
      data-state={phase}
      aria-label="История Анны"
    >
      <div className="scroll-story__sticky">
        <div className="scroll-story__backdrop"><RoomScene layout="masterclass" /></div>
        <video
          ref={videoRef}
          className="scroll-story__video"
          src="videos/anna-welcome.mp4"
          poster="images/anna-arka-interior.jpg"
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
        />
        <div className="scroll-story__shade" />
        <div className={`arch-doors ${doorsOpen ? 'arch-doors--open' : ''}`} aria-hidden="true">
          <span className="arch-doors__leaf arch-doors__leaf--left" />
          <span className="arch-doors__leaf arch-doors__leaf--right" />
          <span className="arch-doors__label">
            <strong>123</strong>
          </span>
        </div>
        <BrandCharacter className="scroll-story__character" />
        <div className="scroll-story__copy" key={failed ? 'failed' : scene} aria-live="polite">
          {failed && <p className="scroll-story__fallback note">Видео истории не загрузилось. Страницу можно листать дальше.</p>}
          <span className="eyebrow">{copy.eyebrow}</span>
          <h2>{copy.title}</h2>
          <p>{copy.body}</p>
        </div>
      </div>
    </section>
  )
}

export { ScrollStory }
