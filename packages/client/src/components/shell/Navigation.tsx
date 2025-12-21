import {
  faClipboardList,
  faUserPen,
  faBook,
  faRectangleList,
  faBookOpen,
} from '@fortawesome/free-solid-svg-icons';

import routes from 'constants/routes';
import Icon from 'components/common/Icon';
import UserMenu from './UserMenu';

import NavLink from './NavLink';

export default function Navigation() {
  return (
    <nav className="w-1/4 max-w-[275px] flex flex-col border-r-2 border-secondaryBackgroundColor h-screen sticky top-0">
      <h1 className="py-0 px-8 my-16 mb-0 whitespace-nowrap">
        <Icon icon={faBookOpen} />
        Alexandria
      </h1>
      <ul className="list-none p-0 m-0">
        <li className="p-0 pr-8 pb-4">
          <NavLink href={routes.dashboard}>
            <Icon icon={faClipboardList} />
            Dashboard
          </NavLink>
        </li>
        <li className="p-0 pr-8 pb-4">
          <NavLink href={routes.authors}>
            <Icon icon={faUserPen} />
            Authors
          </NavLink>
        </li>
        <li className="p-0 pr-8 pb-4">
          <NavLink href={routes.books}>
            <Icon icon={faBook} />
            Books
          </NavLink>
        </li>
        <li className="p-0 pr-8 pb-4">
          <NavLink href={routes.genres}>
            <Icon icon={faRectangleList} />
            Genres
          </NavLink>
        </li>
      </ul>
      <UserMenu />
    </nav>
  );
}
