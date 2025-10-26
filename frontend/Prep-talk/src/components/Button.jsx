import React from 'react';

const Button = ({ children, onClick, className = '', variant = 'primary', size = 'medium', ...props }) => {
  const classes = ['btn'];

  if (variant === 'primary') {
    classes.push('btn-primary');
  } else if (variant === 'secondary') {
    classes.push('btn-secondary');
  } else if (variant === 'outline') {
    classes.push('btn-outline');
  }

  if (size === 'small') {
    classes.push('btn-small');
  } else if (size === 'medium') {
    classes.push('btn-medium');
  } else if (size === 'large') {
    classes.push('btn-large');
  }

  if (className.includes('w-full')) {
    classes.push('btn-full');
  }

  return (
    <button
      className={`${classes.join(' ')} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
