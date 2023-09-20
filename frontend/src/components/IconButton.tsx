import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
interface Props {
  Icon: IconDefinition;
  isActive?: boolean;
  color?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  ariaLabel?: string;
}


const IconButton: React.FC<Props> = ({ 
  Icon,
  isActive,
  color,
  children,
  onClick,
  disabled,
  ariaLabel,
}) => {
  return (
    <button     
      className={`btn icon-btn ${isActive ? 'icon-btn-active' : ''} ${color || ''}`}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      <span className={`${children != null ? "mr-1" : null}`}>
        <FontAwesomeIcon icon={Icon} />
      </span>
      {children}
    </button>
  )
}

export default IconButton