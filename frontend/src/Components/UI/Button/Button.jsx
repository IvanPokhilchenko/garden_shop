import styles from './Button.module.css';

export const Button = ({ content, text, type, ...other }) => {
    return (
      <button
        className={`${styles.button} ${styles[content]}`}
        {...other}
        type={type}
      >
        {text}
      </button>
    );
  };
