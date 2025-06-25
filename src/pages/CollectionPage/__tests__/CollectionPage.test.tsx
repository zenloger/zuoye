import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { CollectionPage } from '../CollectionPage';

// Mock the Collection container
jest.mock('../../../container/collection', () => {
  return function MockCollection() {
    return <div data-testid="collection-container">Collection Container</div>;
  };
});

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('CollectionPage', () => {
  it('renders collection page correctly', () => {
    renderWithRouter(<CollectionPage />);
    
    expect(screen.getByTestId('collection-container')).toBeInTheDocument();
  });

  it('has correct page structure', () => {
    const { container } = renderWithRouter(<CollectionPage />);
    
    expect(container.firstChild).toHaveClass('collection-page');
  });

  it('renders without crashing', () => {
    expect(() => {
      renderWithRouter(<CollectionPage />);
    }).not.toThrow();
  });

  it('contains collection container component', () => {
    renderWithRouter(<CollectionPage />);
    
    const collectionContainer = screen.getByTestId('collection-container');
    expect(collectionContainer).toBeInTheDocument();
    expect(collectionContainer).toHaveTextContent('Collection Container');
  });
});
