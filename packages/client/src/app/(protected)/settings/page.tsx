import SettingsForm from "./SettingsForm";
import { Metadata } from "next";
import { User } from "types/user";
import documentTitle from "utils/documentTitle";
import { fetchApi } from "utils/fetch";
import API from 'constants/api';

export const metadata: Metadata = {
  title: documentTitle("Settings"),
};

export default async function SettingsPage() {
  const user = await fetchApi<User>(API.user.profile, 'GET');

  return <SettingsForm user={user} />;
}
