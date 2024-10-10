import { useCallback } from 'react';
import { toast } from 'react-hot-toast';

export const useToast = () => {
  const showToast = useCallback((message, type = 'default') => {
    switch (type) {
      case 'success':
        toast.success(message);
        break;
      case 'error':
        toast.error(message);
        break;
      default:
        toast(message);
    }
  }, []);

  return showToast;
};