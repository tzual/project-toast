import React from "react";

export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setToasts(toasts.slice(1));
    }, 5000);
    return () => clearTimeout(timer);
  }, [toasts]);

  const addToast = React.useCallback((newToast) => {
    newToast.id = crypto.randomUUID();
    setToasts([...toasts, newToast]);
  }, [toasts]);

  const dismissToast = React.useCallback((toastIdToDismiss) => {
    setToasts(
      toasts.filter((i) => {
        return i.id !== toastIdToDismiss;
      })
    );
  }, [toasts]);

  return (
    <ToastContext.Provider value={{ toasts, addToast, dismissToast }}>
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
