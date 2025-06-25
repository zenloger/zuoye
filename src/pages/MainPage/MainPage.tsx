import React from 'react';
import { useFeatures } from '../../app/providers/FeatureProvider';
import { FeatureToggle } from '../../shared/ui';

// Import existing main page component
import Main from '../../container/main';

export const MainPage: React.FC = () => {
  const { features } = useFeatures();

  return (
    <div className="main-page">
      <FeatureToggle feature="artGeneration">
        <Main />
      </FeatureToggle>
      
      {/* Feature status indicator for development */}
      {process.env.NODE_ENV === 'development' && (
        <div className="feature-debug" style={{ 
          position: 'fixed', 
          bottom: '10px', 
          right: '10px', 
          background: 'rgba(0,0,0,0.8)', 
          color: 'white', 
          padding: '10px',
          borderRadius: '5px',
          fontSize: '12px'
        }}>
          <h4>Feature Flags:</h4>
          {Object.entries(features).map(([key, value]) => (
            <div key={key}>
              {key}: {value ? '✅' : '❌'}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
