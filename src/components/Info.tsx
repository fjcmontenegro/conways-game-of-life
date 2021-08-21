import React from 'react'

interface Props {
  onClick: () => void
}

const Info = ({ onClick }: Props): React.ReactElement => {
  return (
    <div style={style}>
      <button onClick={onClick}>asfsaf</button>
    </div>
  )
}

const style: React.CSSProperties = {
  flex: 1,
  backgroundColor: 'palevioletred',
}

export default Info
