import React from 'react';
import useDocumentTitle from 'hooks/useDocumentTitle';
import SettingsForm from './SettingsForm';

function Settings() {
  useDocumentTitle('Settings');

  return (
    <SettingsForm />
  );
}

export default Settings;
