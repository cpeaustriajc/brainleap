'use client'

import {
  DropZone as RACDropZone,
  DropZoneProps as AriaDropZoneProps,
  Text,
  FileTrigger,
} from 'react-aria-components'
import { Button } from './button'

interface DropZoneProps extends AriaDropZoneProps {
  label: string
  buttonText: string
}

export function DropZone(props: DropZoneProps) {
  return (
    <RACDropZone
      className={({ isDropTarget }) =>
        `${isDropTarget ? 'bg-zinc-100 dark:bg-zinc-800' : 'bg-white dark:bg-zinc-900'} bg-white border-2 border-zinc-300  dark:border-zinc-500 h-48 flex flex-col justify-center items-center rounded-lg transition-colors`
      }
      {...props}
    >
      <Text slot="label">{props.label}</Text>
      <FileTrigger>
        <Button type="button">{props.buttonText}</Button>
      </FileTrigger>
    </RACDropZone>
  )
}
