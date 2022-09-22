import React from 'react';

import * as S from './Panel.styled';

type Props = {
  children: React.ReactNode;
  portion: number;
  header?: string | React.ReactNode;
};

function Panel(props: Props) {
  const { header, children, portion } = props;

  return (
    <S.PanelWrapper portion={portion}>
      <S.Panel>
        {header && (
          <S.PanelHeader>
            { header }
          </S.PanelHeader>
        )}
        <S.PanelBody>
          { children }
        </S.PanelBody>
      </S.Panel>
    </S.PanelWrapper>
  );
}

Panel.defaultProps = {
  header: undefined,
};

export default Panel;
