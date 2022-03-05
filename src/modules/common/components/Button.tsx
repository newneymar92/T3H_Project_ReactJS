import React, { useRef, useState } from 'react'

type Props = {
  styles: React.CSSProperties,
  content?: string,
  class?: string,
  handleClick?: () => void
}

const Button = (props: Props) => {
  const btnRef = useRef<HTMLButtonElement>(null);
  const { styles, content, ...other } = props

  return (
    <button
      ref={btnRef}
      type="button"
      className={`btn ${other?.class ? other?.class : ''}`}
      style={styles} {...other}
      onClick={other.handleClick}
      // hover thì đổi màu theo từng button
      onMouseOver={() => {
        if (btnRef.current) {
          btnRef.current.style.backgroundColor = btnRef.current.style.color;

          btnRef.current.style.color = '#fff'
        }
      }}
      onMouseLeave={() => {
        if (btnRef.current) {
          btnRef.current.style.color = btnRef.current.style.backgroundColor
          btnRef.current.style.backgroundColor = 'transparent'

        }
      }}
    >
      {content}
    </button>
  )
}

export default Button