'use client';

import { faCog, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';

import routes from 'constants/routes';

import Button from 'components/common/Button';
import Icon from 'components/common/Icon';
import Link from 'next/link';
import { logout } from 'app/actions/auth';
import { useTransition } from 'react';

export default function UserMenu() {
  const [_, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(() => {
      logout({ apiError: '' });
    })
  }

  return (
    <div className="my-22 mx-0 mt-auto py-0 px-8">
      <ul className="m-0 p-0 list-none">
        <li className="py-4 px-0">
          <Link href={routes.settings} className="p-4">
            <Icon icon={faCog} />
            Settings
          </Link>
        </li>
        <li className="py-4 px-0">
          <Button
            variant="link"
            onClick={handleLogout}
          >
            <Icon icon={faArrowRightFromBracket} />
            Log out
          </Button>
        </li>
      </ul>
    </div>
  );
}
