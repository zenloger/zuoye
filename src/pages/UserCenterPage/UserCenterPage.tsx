import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../app/store';
import { logoutUser } from '../../features/auth/model/authStore';
import { UserProfile } from '../../features/user-center/ui/UserProfile/UserProfile';

export const UserCenterPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);

  const handleLogout = async () => {
    await dispatch(logoutUser() as any);
    navigate('/');
  };

  return (
    <div className="user-center-page" style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <div className="page-header" style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '30px',
        paddingBottom: '20px',
        borderBottom: '1px solid #eee'
      }}>
        <h1>Личный кабинет</h1>
        <button
          onClick={handleLogout}
          style={{
            padding: '10px 20px',
            background: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Выйти
        </button>
      </div>

      <div className="user-center-content">
        <UserProfile />
      </div>
    </div>
  );
};
