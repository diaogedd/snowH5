import React from 'react';
import { Popup, Button, Space } from 'antd-mobile';

interface ConfirmPopupProps {
  visible: boolean;
  title?: string;
  content?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
}

const ConfirmPopup: React.FC<ConfirmPopupProps> = ({
  visible,
  title = '确认',
  content = '确定要执行此操作吗？',
  confirmText = '确定',
  cancelText = '取消',
  onConfirm,
  onCancel,
  loading = false,
}) => {
  return (
    <Popup
      visible={visible}
      onMaskClick={onCancel}
      bodyStyle={{
        borderTopLeftRadius: '8px',
        borderTopRightRadius: '8px',
        minHeight: '120px',
      }}
    >
      <div style={{ padding: '20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: '500' }}>{title}</h3>
          <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>{content}</p>
        </div>

        <Space style={{ width: '100%', justifyContent: 'center' }}>
          <Button
            color="default"
            onClick={onCancel}
            disabled={loading}
            style={{ minWidth: '80px' }}
          >
            {cancelText}
          </Button>
          <Button
            color="primary"
            onClick={onConfirm}
            loading={loading}
            style={{ minWidth: '80px' }}
          >
            {confirmText}
          </Button>
        </Space>
      </div>
    </Popup>
  );
};

export default ConfirmPopup;
