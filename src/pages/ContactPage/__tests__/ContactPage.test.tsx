import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { ContactPage } from '../ContactPage';
import authReducer from '../../../features/auth/model/authStore';

// Mock the Contact container
jest.mock('../../../container/contact', () => {
  return function MockContact() {
    return <div data-testid="contact-container">Contact Container</div>;
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

const renderWithProviders = (component: React.ReactElement, store = createMockStore()) => {
  return render(
    <Provider store={store}>
      <BrowserRouter>
        {component}
      </BrowserRouter>
    </Provider>
  );
};

describe('ContactPage', () => {
  it('renders contact page correctly', () => {
    renderWithProviders(<ContactPage />);
    
    expect(screen.getByTestId('contact-container')).toBeInTheDocument();
  });

  it('renders contact container directly', () => {
    renderWithProviders(<ContactPage />);

    expect(screen.getByTestId('contact-container')).toBeInTheDocument();
  });

  it('has correct page structure', () => {
    const { container } = renderWithProviders(<ContactPage />);
    
    expect(container.firstChild).toHaveClass('contact-page');
  });

  it('renders without crashing', () => {
    expect(() => {
      renderWithProviders(<ContactPage />);
    }).not.toThrow();
  });

  it('contains contact container component', () => {
    renderWithProviders(<ContactPage />);
    
    const contactContainer = screen.getByTestId('contact-container');
    expect(contactContainer).toBeInTheDocument();
    expect(contactContainer).toHaveTextContent('Contact Container');
  });
});
