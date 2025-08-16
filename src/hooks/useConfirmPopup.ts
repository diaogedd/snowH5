import { useState, useCallback } from 'react';

interface ConfirmPopupOptions {
  title?: string;
  content?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void | Promise<void>;
  onCancel?: () => void;
}

interface ConfirmPopupState {
  visible: boolean;
  title: string;
  content: string;
  confirmText: string;
  cancelText: string;
  loading: boolean;
  onConfirm?: () => void | Promise<void>;
  onCancel?: () => void;
}

export const useConfirmPopup = () => {
  const [state, setState] = useState<ConfirmPopupState>({
    visible: false,
    title: '确认',
    content: '确定要执行此操作吗？',
    confirmText: '确定',
    cancelText: '取消',
    loading: false,
  });

  const showConfirm = useCallback((options: ConfirmPopupOptions) => {
    setState((prev) => ({
      ...prev,
      visible: true,
      title: options.title || '确认',
      content: options.content || '确定要执行此操作吗？',
      confirmText: options.confirmText || '确定',
      cancelText: options.cancelText || '取消',
      loading: false,
      onConfirm: options.onConfirm,
      onCancel: options.onCancel,
    }));
  }, []);

  const hideConfirm = useCallback(() => {
    setState((prev) => ({
      ...prev,
      visible: false,
      loading: false,
      onConfirm: undefined,
      onCancel: undefined,
    }));
  }, []);

  const handleConfirm = useCallback(async () => {
    if (state.onConfirm) {
      setState((prev) => ({ ...prev, loading: true }));
      try {
        await state.onConfirm();
        hideConfirm();
      } catch (error) {
        console.error('确认操作失败:', error);
      } finally {
        setState((prev) => ({ ...prev, loading: false }));
      }
    } else {
      hideConfirm();
    }
  }, [state.onConfirm, hideConfirm]);

  const handleCancel = useCallback(() => {
    if (state.onCancel) {
      state.onCancel();
    }
    hideConfirm();
  }, [state.onCancel, hideConfirm]);

  return {
    ...state,
    showConfirm,
    hideConfirm,
    handleConfirm,
    handleCancel,
  };
};
