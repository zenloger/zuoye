import React from 'react';
import { ProtectedRoute } from '../../shared/ui/ProtectedRoute/ProtectedRoute';
import { AuthRequired } from '../../shared/ui/AuthRequired/AuthRequired';

const CreateNFTContent: React.FC = () => {
  return (
    <div style={{
      padding: '40px 20px',
      maxWidth: '800px',
      margin: '0 auto'
    }}>
      <div style={{
        background: 'white',
        padding: '40px',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}>
        <h1 style={{
          fontSize: '32px',
          marginBottom: '20px',
          color: '#343a40',
          textAlign: 'center'
        }}>
          Создать цифровое искусство
        </h1>
        
        <p style={{
          fontSize: '16px',
          color: '#6c757d',
          textAlign: 'center',
          marginBottom: '40px',
          lineHeight: '1.6'
        }}>
          Добро пожаловать в студию создания цифрового искусства! Здесь вы можете создавать уникальные произведения искусства.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px',
          marginBottom: '40px'
        }}>
          <div style={{
            padding: '30px',
            background: '#f8f9fa',
            borderRadius: '8px',
            textAlign: 'center',
            border: '2px dashed #dee2e6',
            cursor: 'pointer',
            transition: 'all 0.3s'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '15px' }}>🎨</div>
            <h3 style={{ fontSize: '18px', marginBottom: '10px', color: '#343a40' }}>
              Загрузить изображение
            </h3>
            <p style={{ fontSize: '14px', color: '#6c757d' }}>
              Загрузите свое произведение искусства
            </p>
          </div>

          <div style={{
            padding: '30px',
            background: '#f8f9fa',
            borderRadius: '8px',
            textAlign: 'center',
            border: '2px dashed #dee2e6',
            cursor: 'pointer',
            transition: 'all 0.3s'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '15px' }}>✨</div>
            <h3 style={{ fontSize: '18px', marginBottom: '10px', color: '#343a40' }}>
              ИИ-генерация
            </h3>
            <p style={{ fontSize: '14px', color: '#6c757d' }}>
              Создайте искусство с помощью ИИ
            </p>
          </div>

          <div style={{
            padding: '30px',
            background: '#f8f9fa',
            borderRadius: '8px',
            textAlign: 'center',
            border: '2px dashed #dee2e6',
            cursor: 'pointer',
            transition: 'all 0.3s'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '15px' }}>🖼️</div>
            <h3 style={{ fontSize: '18px', marginBottom: '10px', color: '#343a40' }}>
              Из галереи
            </h3>
            <p style={{ fontSize: '14px', color: '#6c757d' }}>
              Выберите из готовых шаблонов
            </p>
          </div>
        </div>

        <div style={{
          background: '#e8f5e8',
          padding: '20px',
          borderRadius: '8px',
          border: '1px solid #c3e6c3'
        }}>
          <h4 style={{
            fontSize: '16px',
            marginBottom: '10px',
            color: '#155724'
          }}>
            💡 Советы для создания:
          </h4>
          <ul style={{
            color: '#155724',
            fontSize: '14px',
            lineHeight: '1.6',
            margin: 0,
            paddingLeft: '20px'
          }}>
            <li>Используйте высококачественные изображения (минимум 1000x1000 пикселей)</li>
            <li>Убедитесь, что у вас есть права на использование изображения</li>
            <li>Добавьте описательные метаданные для лучшей видимости</li>
            <li>Рассмотрите возможность создания серии связанных работ</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export const CreateNFTPage: React.FC = () => {
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
      <CreateNFTContent />
    </ProtectedRoute>
  );
};
