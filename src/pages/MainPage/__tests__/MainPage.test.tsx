import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MainPage } from '../MainPage';
import authReducer from '../../../features/auth/model/authStore';

// Mock the Main container
jest.mock('../../../container/main', () => {
  return function MockMain() {
    return <div data-testid="main-container">Main Container</div>;
  };
});

// Mock the FeatureToggle component
jest.mock('../../../shared/ui/FeatureToggle/FeatureToggle', () => {
  return function MockFeatureToggle({ children, feature }: { children: React.ReactNode; feature: string }) {
    return <div data-testid={`feature-toggle-${feature}`}>{children}</div>;
  };
});

const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      auth: authReducer,
    },
    preloadedState: {
      auth: {
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
        ...initialState,
      },
    },
  });
};

// Mock the FeatureProvider
jest.mock('../../../app/providers/FeatureProvider', () => ({
  FeatureProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="feature-provider">{children}</div>
  ),
  useFeatures: () => ({
    features: {
      artGeneration: true,
      auth: false,
      userCenter: true,
      collection: false,
      navigation: true,
      contact: true,
    },
    toggleFeature: jest.fn(),
  }),
}));

const renderWithProviders = (component: React.ReactElement, store = createMockStore()) => {
  return render(
    <Provider store={store}>
      <BrowserRouter>
        {component}
      </BrowserRouter>
    </Provider>
  );
};

describe('MainPage', () => {
  it('renders main page correctly', () => {
    renderWithProviders(<MainPage />);
    
    expect(screen.getByTestId('main-container')).toBeInTheDocument();
  });

  it('wraps main component with FeatureToggle', () => {
    renderWithProviders(<MainPage />);
    
    const featureToggle = screen.getByTestId('feature-toggle-artGeneration');
    expect(featureToggle).toBeInTheDocument();
    expect(featureToggle).toContainElement(screen.getByTestId('main-container'));
  });

  it('has correct CSS classes', () => {
    const { container } = renderWithProviders(<MainPage />);
    
    expect(container.firstChild).toHaveClass('main-page');
  });

  it('renders without crashing', () => {
    expect(() => {
      renderWithProviders(<MainPage />);
    }).not.toThrow();
  });

  it('contains main container component', () => {
    renderWithProviders(<MainPage />);
    
    const mainContainer = screen.getByTestId('main-container');
    expect(mainContainer).toBeInTheDocument();
    expect(mainContainer).toHaveTextContent('Main Container');
  });

  it('renders with different auth states', () => {
    const authenticatedStore = createMockStore({
      isAuthenticated: true,
      user: { id: 1, username: 'testuser' },
    });
    
    renderWithProviders(<MainPage />, authenticatedStore);
    
    expect(screen.getByTestId('main-container')).toBeInTheDocument();
  });
});
