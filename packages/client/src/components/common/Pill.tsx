export type PillVariant = 'primary' | 'success' | 'info' | 'error' | 'default';

type Props = {
  children: React.ReactNode;
  variant?: PillVariant;
};

const decidePillColor = (variant: PillVariant) => {
  switch (variant) {
    case 'primary':
      return 'bg-primary';

    case 'success':
      return 'bg-success';

    case 'info':
      return 'bg-info';

    case 'error':
      return 'bg-error';

    default:
      return 'bg-text';
  }
};

export default function Pill({ children, variant = 'default' }: Props) {
  return (
    <div className={`pill inline-block text-sm text-primary-bg font-bold rounded-sm py-2 px-4 ${decidePillColor(variant)}`}>
      { children }
    </div>
  );
}
