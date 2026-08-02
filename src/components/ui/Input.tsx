import React, { useId } from 'react';
import styles from './Input.module.css';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  multiline?: boolean;
}

export default function Input({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  multiline = false,
  className = '',
  id,
  ...props
}: InputProps) {
  const defaultId = useId();
  const inputId = id || defaultId;
  const isTextarea = multiline || props.type === 'textarea';

  const containerClasses = [
    styles.container,
    error ? styles.hasError : '',
    className
  ].filter(Boolean).join(' ');

  const inputClasses = [
    styles.input,
    leftIcon ? styles.hasLeftIcon : '',
    rightIcon ? styles.hasRightIcon : '',
    isTextarea ? styles.textarea : '',
  ].filter(Boolean).join(' ');

  const InputElement = isTextarea ? 'textarea' : 'input';

  return (
    <div className={containerClasses}>
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
        </label>
      )}
      <div className={styles.inputWrapper}>
        {leftIcon && <span className={styles.leftIcon}>{leftIcon}</span>}
        <InputElement
          id={inputId}
          className={inputClasses}
          {...(props as any)}
        />
        {rightIcon && <span className={styles.rightIcon}>{rightIcon}</span>}
      </div>
      {(error || helperText) && (
        <span className={error ? styles.errorText : styles.helperText}>
          {error || helperText}
        </span>
      )}
    </div>
  );
}
