import React from 'react'

type TContainer = {
  className?: string
  className2?: string
  children: React.ReactNode
}
const Container: React.FC<TContainer> = ({
  className,
  className2,
  children,
}) => {
  return (
    <section className={`container ${className}`}>
      <div className={`wrapper__container ${className2}`}>{children}</div>
    </section>
  )
}

export default Container
