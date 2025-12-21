'use client';

import { faMoon } from '@fortawesome/free-solid-svg-icons';
import { faSun } from '@fortawesome/free-regular-svg-icons';
import Button from 'components/common/Button';
import Icon from 'components/common/Icon';

export default function ThemeSwitch() {
  const theme = 'dark';

  const handleToggle = () => {

  };

  return (
    <Button variant="link" type="button" onClick={handleToggle}>
      {
        theme === 'dark'
          ? (
            <>
              <Icon icon={faSun} />
              Light mode
            </>
          )
          : (
            <>
              <Icon icon={faMoon} />
              Dark mode
            </>
          )
      }
    </Button>
  );
}
