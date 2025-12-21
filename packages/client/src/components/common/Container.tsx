type Props = {
  children: React.ReactNode;
};

export default function Container({ children }: Props) {
  return (
    <div className="flex -my-4 container">
      { children }
    </div>
  );
}
