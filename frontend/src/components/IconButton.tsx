import React from 'react'

const IconButton = ({ Icon, isActive, color, children, ...props }) => {
  return (
    <button className={`btn icon-btn ${isActive ? "icon-btn-active" : null} ${color || null}`} 
    {...props}
    
    >
      <span className={`${children != null ? "mr-1" : null}`}>
        <Icon />
      </span>
      {children}
    </button>
  )
}

export default IconButton