import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { useSignOutAccount } from '@/lib/react-query/queriesAndMutations';
import { useEffect } from 'react';
import { useUserContext } from '@/context/AuthContext';
import { sidebarLinks } from '@/constants';
import { INavLink } from '@/types';

const LeftSidebar = () => {
  const { mutate: signOut, isSuccess } = useSignOutAccount();
  const navigate = useNavigate();
  const { user } = useUserContext();
  useEffect(() => {
    if (isSuccess) navigate(0);
  }, [isSuccess]);
  return (
    <nav className="leftsidebar">
      <div className="flex flex-col gap-11">
        <Link to="/" className="flex gap-3 items-center">
          <div className="flex flex-row gap-4">
            <img
              src="/assets/images/logo-form.png"
              alt="logo"
              width={48}
              height={48}
            />
            <p className="h1-medium font-fingerPaint">UniVibe</p>
          </div>
        </Link>
        <Link to={`/profile/${user.id}`} className="flex gap-3 items-center">
          <img
            src={user.imageUrl || '/assets/icons/profile-placeholder.svg'}
            alt="profile image"
            className="h-14 w-14 rounded-full"
          />
          <div className="flex flex-col">
            <p className="body-bold">{user.name}</p>
            <p className="small-regular text-light-3">@{user.username}</p>
          </div>
        </Link>
        <ul className="flex flex-col gap-6">
          {sidebarLinks.map((link: INavLink) => {
            return (
              <li key={link.label} className="leftsidebar-link">
                <NavLink
                  to={link.route}
                  className="flex gap-4 p-4 items-center"
                >
                  <img
                    src={link.imgURL}
                    alt={link.label}
                    className='group-hover:invert-white'
                  />
                  {link.label}
                </NavLink>
              </li>
            );
          })}
        </ul>
        <Button
          variant="ghost"
          className="shad-button_ghost"
          onClick={() => signOut()}
        >
          <img src="/assets/icons/logout.svg" alt="logout" />
        </Button>
      </div>
    </nav>
  );
};

export default LeftSidebar;
