'use client'

import { useEffect, useRef } from 'react'

import {
  type MediaCanPlayDetail,
  type MediaCanPlayEvent,
  MediaPlayer,
  type MediaPlayerInstance,
  MediaProvider,
  type MediaProviderAdapter,
  type MediaProviderChangeEvent,
  Poster,
  isHLSProvider,
} from '@vidstack/react'

import { VideoLayout } from './layouts/video-layout'

export function Player({
  src,
  thumbnail,
  thumbnails,
  title,
}: { src: string; thumbnail: string; thumbnails: string; title: string }) {
  let player = useRef<MediaPlayerInstance>(null)

  useEffect(() => {
    // Subscribe to state updates.
    return player.current!.subscribe(({ paused, viewType }) => {
      // console.log('is paused?', '->', state.paused);
      // console.log('is audio view?', '->', state.viewType === 'audio');
    })
  }, [])

  function onProviderChange(
    provider: MediaProviderAdapter | null,
    nativeEvent: MediaProviderChangeEvent,
  ) {
    // We can configure provider's here.
    if (isHLSProvider(provider)) {
      provider.config = {}
    }
  }

  // We can listen for the `can-play` event to be notified when the player is ready.
  function onCanPlay(
    detail: MediaCanPlayDetail,
    nativeEvent: MediaCanPlayEvent,
  ) {
    // ...
  }

  return (
    <MediaPlayer
      className="w-full aspect-video bg-slate-900 text-white font-sans overflow-hidden rounded-md ring-media-focus data-[focus]:ring-4"
      title="Sprite Fight"
      src={src}
      onProviderChange={onProviderChange}
      onCanPlay={onCanPlay}
      ref={player}
    >
      <MediaProvider>
        <Poster
          className="absolute inset-0 block h-full w-full rounded-md opacity-0 transition-opacity data-[visible]:opacity-100 object-cover"
          src={thumbnail}
          alt={title}
        />
      </MediaProvider>

      <VideoLayout thumbnails={thumbnails} />
    </MediaPlayer>
  )
}
