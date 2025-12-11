type Props = {
  children: React.ReactNode;
};

function Container({ children }: Props) {
  return (
    <div className="flex -my-4 container">
      { children }
    </div>
  );
}

export default Container;
