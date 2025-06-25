import React, { createContext, useContext, useState, useEffect } from 'react';
import { FeatureFlags, featureManager } from '../../shared/config/features';
import { apiClient } from '../../shared/api/base';

interface FeatureContextType {
  features: FeatureFlags;
  updateFeatures: (newFeatures: Partial<FeatureFlags>) => void;
  isFeatureEnabled: (feature: keyof FeatureFlags) => boolean;
}

const FeatureContext = createContext<FeatureContextType | undefined>(undefined);

interface FeatureProviderProps {
  children: React.ReactNode;
}

export const FeatureProvider: React.FC<FeatureProviderProps> = ({ children }) => {
  const [features, setFeatures] = useState<FeatureFlags>(featureManager.getAllFeatures());

  useEffect(() => {
    // Load feature flags from API on app start
    loadFeatureFlags();
  }, []);

  const loadFeatureFlags = async () => {
    try {
      const response = await apiClient.get('/api/');
      if (response._meta?.features) {
        const serverFeatures = response._meta.features;
        featureManager.updateFeatures(serverFeatures);
        setFeatures(featureManager.getAllFeatures());
      }
    } catch (error) {
      console.warn('Failed to load feature flags from server:', error);
    }
  };

  const updateFeatures = (newFeatures: Partial<FeatureFlags>) => {
    featureManager.updateFeatures(newFeatures);
    setFeatures(featureManager.getAllFeatures());
  };

  const isFeatureEnabled = (feature: keyof FeatureFlags) => {
    return featureManager.isEnabled(feature);
  };

  return (
    <FeatureContext.Provider value={{ features, updateFeatures, isFeatureEnabled }}>
      {children}
    </FeatureContext.Provider>
  );
};

export const useFeatures = () => {
  const context = useContext(FeatureContext);
  if (context === undefined) {
    throw new Error('useFeatures must be used within a FeatureProvider');
  }
  return context;
};
