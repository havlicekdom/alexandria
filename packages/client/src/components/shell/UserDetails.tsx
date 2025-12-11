'use client';

import Jdenticon from 'react-jdenticon';
import { User } from 'types/user';

type Props = {
  user: User;
}

export default function UserDetails({ user }: Props) {
  const env = process.env.NODE_ENV;

  return (
    <div className='flex items-center ml-auto'>
      <div className="flex items-center justify-center rounded-full p-2.5 bg-text">
        {env !== 'test' && <Jdenticon size={25} value={user.username} className="h-[25px]" />}
      </div>
      <div className='flex flex-col ml-4 text-sm'>
        <div className='mb-0.5'>
          { user.username }
        </div>
        <div>
          { user.email }
        </div>
      </div>
    </div>
  );
}
