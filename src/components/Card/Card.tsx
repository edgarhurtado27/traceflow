import './Card.css'
import { Frame } from '../../engine/types'

interface CardProps {
  item: Frame
}

const backgroundDictionary = {
  active: 'active-bg',
  base_case: 'bc-bg',
  returned: 'returned-bg',
  waiting: 'waiting-bg',
}

export default function Card({ item }: CardProps) {
  return (
    <div className={`card  ${backgroundDictionary[item.status]}`}>
      <div>{item.fnLabel}</div>
      <div>Status: {item.status}</div>
      <div>{!!item.returnValue ? 'Returns: ' + item.returnValue : ''}</div>
    </div>
  )
}
