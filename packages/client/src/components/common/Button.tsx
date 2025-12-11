export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 'link' | 'primary' | 'close';
  className?: string;
  full?: boolean;
}

function Button({ children, variant, full = false, className = '', ...props }: ButtonProps) {
  const defaultClass = `b-none m-0 p-4 w-auto overflow-visible bg-transparent color-inherit font-inherit line-height-normal cursor-pointer rounded-md ${full ? 'w-full' : ''}`;

  switch (variant) {
    case 'link':
      return (
        <button className={`${defaultClass} color-text p-0 hover:brightness-90 active:brightness-90 ${className}`} {...props}>
          { children }
        </button>
      );

    case 'primary':
      return (
        <button className={`${defaultClass} transition-all duration-100 ease-in-out bg-primary! color-text hover:brightness-90 active:brightness-90 ${className}`} {...props}>
          { children }
        </button>
      );

    case 'close':
      return (
        <button className={`${defaultClass} color-inverse hover:brightness-90 active:brightness-90 ${className}`} {...props}>
          { children }
        </button>
      );

    default:
      return null;
  }
}

export default Button;
