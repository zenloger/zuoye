import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { FeatureToggle } from '../../shared/ui';

// Pages
import { MainPage } from '../../pages/MainPage';
import { AuthPage } from '../../pages/AuthPage';
import { UserCenterPage } from '../../pages/UserCenterPage';
import { CreateArtPage } from '../../pages/CreateArtPage';
import { CollectionPage } from '../../pages/CollectionPage';
import { ContactPage } from '../../pages/ContactPage';


// Layout
import { Layout } from '../../shared/ui/Layout/Layout';

export const AppRouter: React.FC = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  return (
    <Router>
      <Layout>
        <Routes>
          {/* Main page */}
          <Route path="/" element={<MainPage />} />
          <Route path="/artcollab" element={<MainPage />} />
          
          {/* Authentication routes */}
          <Route
            path="/auth"
            element={
              <FeatureToggle
                feature="auth"
                fallback={<Navigate to="/" />}
              >
                {isAuthenticated ? <Navigate to="/user-center" /> : <AuthPage />}
              </FeatureToggle>
            }
          />

          {/* User center - protected route */}
          <Route
            path="/user-center"
            element={
              <FeatureToggle
                feature="userCenter"
                fallback={<Navigate to="/" />}
              >
                {isAuthenticated ? <UserCenterPage /> : <Navigate to="/auth" />}
              </FeatureToggle>
            }
          />

          {/* Art creation - allow guests but show login prompt when needed */}
          <Route
            path="/create-nft"
            element={
              <FeatureToggle
                feature="artGeneration"
                fallback={<Navigate to="/" />}
              >
                <CreateArtPage />
              </FeatureToggle>
            }
          />
          <Route
            path="/artcollab/create-nft"
            element={
              <FeatureToggle
                feature="artGeneration"
                fallback={<Navigate to="/" />}
              >
                <CreateArtPage />
              </FeatureToggle>
            }
          />

          {/* Collection */}
          <Route
            path="/collection"
            element={
              <FeatureToggle
                feature="collection"
                fallback={<Navigate to="/" />}
              >
                <CollectionPage />
              </FeatureToggle>
            }
          />
          <Route
            path="/artcollab/collection"
            element={
              <FeatureToggle
                feature="collection"
                fallback={<Navigate to="/" />}
              >
                <CollectionPage />
              </FeatureToggle>
            }
          />

          {/* Contact */}
          <Route
            path="/contact"
            element={
              <FeatureToggle
                feature="contact"
                fallback={<Navigate to="/" />}
              >
                <ContactPage />
              </FeatureToggle>
            }
          />
          <Route
            path="/artcollab/contact"
            element={
              <FeatureToggle
                feature="contact"
                fallback={<Navigate to="/" />}
              >
                <ContactPage />
              </FeatureToggle>
            }
          />

          {/* Feature Demo - always available in development */}
          {process.env.NODE_ENV === 'development' && (
            <></>
          )}
          
          {/* Legacy routes for backward compatibility */}
          <Route path="/artcollab/detail-kaban" element={<Navigate to="/collection" />} />
          <Route path="/artcollab/detail-monkey" element={<Navigate to="/collection" />} />
          <Route path="/artcollab/detail-hero" element={<Navigate to="/collection" />} />

          {/* Project Monday route - redirect to main */}
          <Route path="/project-monday" element={<Navigate to="/artcollab" />} />

          {/* 404 fallback */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </Router>
  );
};
