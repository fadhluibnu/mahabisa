import React from 'react';
import { Link } from '@inertiajs/react';

const Button = ({
  children,
  type = 'button',
  className = '',
  processing = false,
  as = 'button',
  href = null,
  method = 'get',
  ...props
}) => {
  const baseClasses = `inline-flex items-center justify-center ${processing ? 'opacity-70 cursor-not-allowed' : ''}`;
  const classes = `${baseClasses} ${className}`;

  if (as === 'a' || href) {
    return (
      <Link href={href} className={classes} method={method} as={as} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} disabled={processing} {...props}>
      {children}
    </button>
  );
};

export default Button;
