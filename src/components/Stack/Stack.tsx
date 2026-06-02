import { animate } from 'animejs'
import { useEffect, useRef } from 'react'

import './Stack.css'
import { Snapshot, Frame } from '../../engine/types'

interface StackProps {
  snapshot: Snapshot | null
  renderCardItem: any
  stackHeight: number
  gap: number
}
export default function Stack({
  snapshot,
  renderCardItem,
  stackHeight = 500,
  gap = 10,
}: StackProps) {
  const refs = useRef(new Map())

  const STACK_PADDING = 10

  const availableHeight = stackHeight - STACK_PADDING * 2

  const items: Frame[] = snapshot?.stack || []

  const cardHeight =
    items.length > 0
      ? Math.max(50, (availableHeight - gap * (items.length - 1)) / items.length)
      : stackHeight

  useEffect(() => {
    if (!refs.current.size) return

    const elements = items.map((item) => refs.current.get(item.id)).filter(Boolean)

    animate(elements, {
      translateY: (_: any, i: number) => i * (cardHeight + gap),
      scale: [0.95, 1],
      duration: 400,
      ease: 'outBack',
    })
  }, [items, cardHeight, gap])

  return (
    <div className="stack">
      {items.map((item, index) => (
        <div
          key={index}
          ref={(el) => {
            if (el) {
              refs.current.set(item.id, el)
            } else {
              refs.current.delete(item.id)
            }
          }}
          className="stack-item"
          style={{
            height: `${cardHeight}px`,
          }}
        >
          {renderCardItem(item)}
        </div>
      ))}
    </div>
  )
}
