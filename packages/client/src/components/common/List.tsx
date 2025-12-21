type Props = {
  children: React.ReactNode;
};

export default function List({ children }: Props) {
  return (
    <div>
      { children }
    </div>
  );
}
