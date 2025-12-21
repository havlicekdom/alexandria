/* eslint-disable react/jsx-props-no-spreading */
type Props = {
  children: React.ReactNode;
};

export default function ListItem(props: Props) {
  const { children } = props;

  return (
    <div className="flex mb-8 pb-8 border-b-2 border-secondary-bg last:border-b-0 last:mb-0 last:pb-0" {...props}>
      { children }
    </div>
  );
}
