import React, { useState } from 'react';
import { useFeatures } from '../../../../app/providers/FeatureProvider';
import { FeatureFlags } from '../../../../shared/config/features';

interface FeaturePanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const FeaturePanel: React.FC<FeaturePanelProps> = ({ isOpen, onClose }) => {
  const { features, updateFeatures, isFeatureEnabled } = useFeatures();
  const [localFeatures, setLocalFeatures] = useState<FeatureFlags>(features);

  const featureDescriptions: Record<keyof FeatureFlags, string> = {
    auth: '用户认证系统 - 登录、注册、登出功能',
    userCenter: '用户中心 - 个人资料管理和设置',
    artGeneration: 'AI艺术生成 - 使用GigaChat生成艺术作品',
    collection: '作品集 - 浏览和管理艺术作品',
    contact: '联系页面 - 联系信息和反馈',
    navigation: '导航系统 - 页面导航和菜单',
  };

  const handleFeatureToggle = (feature: keyof FeatureFlags) => {
    const newFeatures = {
      ...localFeatures,
      [feature]: !localFeatures[feature],
    };
    setLocalFeatures(newFeatures);
  };

  const handleApply = () => {
    updateFeatures(localFeatures);
    onClose();
  };

  const handleReset = () => {
    setLocalFeatures(features);
  };

  const handleResetToDefaults = () => {
    const defaultFeatures: FeatureFlags = {
      auth: true,
      userCenter: true,
      artGeneration: true,
      collection: true,
      contact: true,
      navigation: true,
    };
    setLocalFeatures(defaultFeatures);
  };

  if (!isOpen) return null;

  const panelStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    right: 0,
    width: '400px',
    height: '100vh',
    background: 'white',
    boxShadow: '-2px 0 10px rgba(0,0,0,0.1)',
    zIndex: 1000,
    padding: '20px',
    overflowY: 'auto',
  };

  const overlayStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    background: 'rgba(0,0,0,0.5)',
    zIndex: 999,
  };

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    paddingBottom: '10px',
    borderBottom: '1px solid #eee',
  };

  const featureItemStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    padding: '15px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    marginBottom: '10px',
  };

  const toggleStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const buttonStyle: React.CSSProperties = {
    padding: '8px 16px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
  };

  const primaryButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    background: '#007bff',
    color: 'white',
  };

  const secondaryButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    background: '#6c757d',
    color: 'white',
  };

  const dangerButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    background: '#dc3545',
    color: 'white',
  };

  return (
    <>
      <div style={overlayStyle} onClick={onClose} />
      <div style={panelStyle}>
        <div style={headerStyle}>
          <h2>功能管理面板</h2>
          <button onClick={onClose} style={buttonStyle}>✕</button>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <p style={{ color: '#666', fontSize: '14px' }}>
            通过此面板可以动态启用或禁用应用功能。更改将立即生效。
          </p>
        </div>

        <div style={{ marginBottom: '20px' }}>
          {Object.entries(localFeatures).map(([key, enabled]) => {
            const featureKey = key as keyof FeatureFlags;
            return (
              <div key={key} style={featureItemStyle}>
                <div style={toggleStyle}>
                  <div>
                    <strong>{featureKey}</strong>
                    <div style={{ 
                      fontSize: '12px', 
                      color: enabled ? '#28a745' : '#dc3545',
                      fontWeight: 'bold'
                    }}>
                      {enabled ? '✅ 已启用' : '❌ 已禁用'}
                    </div>
                  </div>
                  <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={enabled}
                      onChange={() => handleFeatureToggle(featureKey)}
                      style={{ marginRight: '8px' }}
                    />
                    <span style={{ fontSize: '14px' }}>
                      {enabled ? '禁用' : '启用'}
                    </span>
                  </label>
                </div>
                <div style={{ fontSize: '12px', color: '#666' }}>
                  {featureDescriptions[featureKey]}
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ 
          display: 'flex', 
          gap: '10px', 
          flexDirection: 'column',
          borderTop: '1px solid #eee',
          paddingTop: '20px'
        }}>
          <button onClick={handleApply} style={primaryButtonStyle}>
            应用更改
          </button>
          <button onClick={handleReset} style={secondaryButtonStyle}>
            重置为当前设置
          </button>
          <button onClick={handleResetToDefaults} style={dangerButtonStyle}>
            恢复默认设置
          </button>
        </div>

        <div style={{ 
          marginTop: '20px', 
          padding: '15px', 
          background: '#f8f9fa', 
          borderRadius: '8px',
          fontSize: '12px',
          color: '#666'
        }}>
          <h4 style={{ margin: '0 0 10px 0' }}>功能依赖关系：</h4>
          <ul style={{ margin: 0, paddingLeft: '20px' }}>
            <li>用户中心需要认证系统启用</li>
            <li>禁用导航将隐藏所有导航元素</li>
            <li>功能状态会保存在本地存储中</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default FeaturePanel;
export { FeaturePanel };
