/* eslint-disable react/jsx-props-no-spreading */



import { Icon as IconStyled } from './Icon.styled';

function Icon(props: any) {
  return (
    <IconStyled {...props} />
  );
}

export default Icon;
