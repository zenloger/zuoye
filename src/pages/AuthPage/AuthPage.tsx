import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginForm } from '../../features/auth/ui/LoginForm/LoginForm';
import { RegisterForm } from '../../features/auth/ui/RegisterForm/RegisterForm';

export const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleAuthSuccess = () => {
    navigate('/user-center');
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="auth-page" style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '80vh',
      padding: '20px'
    }}>
      <div className="auth-container" style={{
        background: 'white',
        padding: '40px',
        borderRadius: '10px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '400px'
      }}>
        <div className="auth-tabs" style={{ 
          display: 'flex', 
          marginBottom: '30px',
          borderBottom: '1px solid #eee'
        }}>
          <button
            onClick={() => setIsLogin(true)}
            style={{
              flex: 1,
              padding: '10px',
              border: 'none',
              background: isLogin ? '#007bff' : 'transparent',
              color: isLogin ? 'white' : '#666',
              cursor: 'pointer',
              borderRadius: '5px 5px 0 0'
            }}
          >
            Вход
          </button>
          <button
            onClick={() => setIsLogin(false)}
            style={{
              flex: 1,
              padding: '10px',
              border: 'none',
              background: !isLogin ? '#007bff' : 'transparent',
              color: !isLogin ? 'white' : '#666',
              cursor: 'pointer',
              borderRadius: '5px 5px 0 0'
            }}
          >
            Регистрация
          </button>
        </div>

        {isLogin ? (
          <LoginForm onSuccess={handleAuthSuccess} onCancel={handleCancel} />
        ) : (
          <RegisterForm onSuccess={handleAuthSuccess} onCancel={handleCancel} />
        )}
      </div>
    </div>
  );
};
