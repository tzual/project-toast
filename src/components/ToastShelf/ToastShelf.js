import React from 'react';

import Toast from '../Toast';

import styles from './ToastShelf.module.css';
import { ToastContext } from "../ToastProvider";

function ToastShelf() {
  const {toasts, dismissToast} = React.useContext(ToastContext);

  return (
    <ol className={styles.wrapper}>
      {toasts.map(({ variant, message, id }) => (
        <li key={id} className={styles.toastWrapper}>
          <Toast variant={variant} handleDismiss={() => dismissToast(id)}>
            {message}
          </Toast>
        </li>
      ))}
    </ol>
  );
}

export default ToastShelf;
