declare module 'react-input-mask' {
  import * as React from 'react';

  export interface InputMaskProps extends React.InputHTMLAttributes<HTMLInputElement> {
    mask: string;
    maskChar?: string;
    alwaysShowMask?: boolean;
    formatChars?: { [key: string]: string };
    inputRef?: (ref: HTMLInputElement | null) => void;
  }

  const InputMask: React.FC<InputMaskProps>;
  export default InputMask;
} 