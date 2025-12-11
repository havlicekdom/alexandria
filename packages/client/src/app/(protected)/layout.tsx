import Navigation from 'components/shell/Navigation';
import TopBar from 'components/shell/TopBar';
import UserDetails from 'components/shell/UserDetails';
import { ReactNode } from 'react';
import { fetchApi } from 'utils/fetch';
import API from 'constants/api';
import { User } from 'types/user';

export default async function ProtectedLayout({ children }: { children: ReactNode }) {
  const user = await fetchApi<User>(API.user.profile, 'GET');

  return (
    <>
      <Navigation />
      <div className='flex-[1_1_auto] p-8'>
        <TopBar>
          <UserDetails user={user} />
        </TopBar>
        {children}
      </div>
    </>
  );
}
