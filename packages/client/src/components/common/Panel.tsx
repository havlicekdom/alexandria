type Props = {
  children: React.ReactNode;
  portion: number;
  header?: string | React.ReactNode;
};

function Panel({ header, children, portion }: Props) {
  const portions = {
    1: 'w-full',
    2: 'w-1/2',
    3: 'w-1/3',
    4: 'w-1/4',
  }

  return (
    <div className={`my-0 mx-4 ${portions[portion as keyof typeof portions]}`}>
      <div className="border-2 border-secondary-bg rounded-sm p-4 height-full">
        {header && (
          <h3 className="mt-0 mb-8">
            { header }
          </h3>
        )}
        <div>
          { children }
        </div>
      </div>
    </div>
  );
}

export default Panel;
