import React, { useContext } from 'react';
import { faMoon } from '@fortawesome/free-solid-svg-icons';
import { faSun } from '@fortawesome/free-regular-svg-icons';
import Button from 'components/common/Button';
import { ThemeContext } from 'context/ThemeContext';
import { ThemeVariants } from 'constants/styles/theme';
import { isDarkTheme } from 'utils/styles';
import Icon from 'components/common/Icon';

function ThemeSwitch() {
  const { theme, setTheme } = useContext(ThemeContext);

  const handleToggle = () => {
    if (isDarkTheme(theme)) {
      setTheme(ThemeVariants.Light);
    } else {
      setTheme(ThemeVariants.Dark);
    }
  };

  return (
    <Button variant="link" type="button" onClick={() => handleToggle()}>
      {
        isDarkTheme(theme)
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

export default ThemeSwitch;
