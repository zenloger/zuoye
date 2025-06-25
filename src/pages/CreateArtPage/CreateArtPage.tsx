import React from 'react';
import { ProtectedRoute } from '../../shared/ui/ProtectedRoute/ProtectedRoute';
import { AuthRequired } from '../../shared/ui/AuthRequired/AuthRequired';
// Import existing create-nft component
import CreateNft from '../../container/create-nft';

const CreateArtContent: React.FC = () => {
  return (
    <div className="create-art-page">
      <CreateNft />
    </div>
  );
};

export const CreateArtPage: React.FC = () => {
  return (
    <ProtectedRoute
      requireAuth={true}
      fallback={
        <AuthRequired
          title="Требуется авторизация для создания"
          message="Для создания цифрового искусства необходимо войти в систему. Это позволит сохранить ваши работы и управлять коллекцией."
          feature="создание искусства"
        />
      }
    >
      <CreateArtContent />
    </ProtectedRoute>
  );
};
