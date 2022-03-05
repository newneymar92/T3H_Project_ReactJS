import React from 'react'

type Props = {}

const Loading = (props: Props) => {
  return (
    <div className="spinner-border" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  )
}

export default Loading