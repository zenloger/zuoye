import React, { useState } from 'react';
import { FeaturePanel } from '../FeaturePanel/FeaturePanel';

const FeatureToggleButton: React.FC = () => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  // Only show in development mode
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  const buttonStyle: React.CSSProperties = {
    position: 'fixed',
    bottom: '20px',
    left: '20px',
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    background: '#007bff',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    fontSize: '20px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
    zIndex: 998,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s ease',
  };

  const hoverStyle: React.CSSProperties = {
    ...buttonStyle,
    transform: 'scale(1.1)',
    background: '#0056b3',
  };

  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <button
        style={isHovered ? hoverStyle : buttonStyle}
        onClick={() => setIsPanelOpen(true)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        title="功能管理面板"
      >
        ⚙️
      </button>
      
      <FeaturePanel 
        isOpen={isPanelOpen} 
        onClose={() => setIsPanelOpen(false)} 
      />
    </>
  );
};

export default FeatureToggleButton;
