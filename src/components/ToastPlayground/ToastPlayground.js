import React from 'react';

import Button from '../Button';
import ToastShelf from "../ToastShelf";

import styles from "./ToastPlayground.module.css";

const VARIANT_OPTIONS = ["notice", "warning", "success", "error"];

function ToastPlayground() {
  const [message, setMessage] = React.useState("");
  const [variant, setVariant] = React.useState("notice");
  const [toasts, setToasts] = React.useState([]);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setToasts(toasts.slice(1));
    }, 5000);
    return () => clearTimeout(timer);
  }, [toasts]);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        setMessage("");
        setVariant("notice");
        setToasts([
          ...toasts,
          {
            variant,
            message,
            id: crypto.randomUUID(),
          },
        ]);
      }}
      className={styles.wrapper}
    >
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>

      <ToastShelf
        toasts={toasts}
        handleDismiss={(toastIdToDismiss) => {
          setToasts(
            toasts.filter((i) => {
              return i.id !== toastIdToDismiss;
            })
          );
        }}
      />

      <div className={styles.controlsWrapper}>
        <div className={styles.row}>
          <label
            htmlFor="message"
            className={styles.label}
            style={{ alignSelf: "baseline" }}
          >
            Message
          </label>
          <div className={styles.inputWrapper}>
            <textarea
              id="message"
              value={message}
              onChange={(event) => {
                setMessage(event.target.value);
              }}
              className={styles.messageInput}
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Variant</div>
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            {VARIANT_OPTIONS.map((value) => (
              <label htmlFor={`variant-${value}`}>
                <input
                  key={value}
                  id={`variant-${value.toLowerCase()}`}
                  type="radio"
                  name="variant"
                  value={value}
                  checked={variant === value}
                  onChange={(event) => {
                    setVariant(event.target.value);
                  }}
                />
                {value}
              </label>
            ))}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label} />
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            <Button>Pop Toast!</Button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default ToastPlayground;
