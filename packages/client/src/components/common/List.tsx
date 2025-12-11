type Props = {
  children: React.ReactNode;
};

function List({ children }: Props) {
  return (
    <div>
      { children }
    </div>
  );
}

export default List;
