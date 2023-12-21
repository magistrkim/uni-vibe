import {
  Route,
  Routes,
  Link,
  Outlet,
  useLocation,
  useParams,
} from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { useGetUserById } from '@/lib/react-query/queriesAndMutations';
import { useUserContext } from '@/context/AuthContext';
import GridPostList from '@/components/shared/GridPostList';
import Loader from '@/components/shared/Loader';
import LikedPosts from '@/_root/pages/LikedPosts';

type StatBlockProps = {
  value: string | number;
  label: string;
};

const StatBlock = ({ value, label }: StatBlockProps) => (
  <div className="flex-center gap-2">
    <p className="small-semibold lg:body-bold text-primary-500">{value}</p>
    <p className="small-medium lg:base-medium text-light-2">{label}</p>
  </div>
);

const Profile = () => {
  const { id } = useParams();
  const { user } = useUserContext();
  const { pathname } = useLocation();

  const { data: currentUser } = useGetUserById(id || '');

  if (!currentUser)
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );
  return (
    <section className="profile-container">
      <div className="profile-inner_container">
        <div className="flex xl:flex-row flex-col max-xl:items-center flex-1 gap-7">
          <img
            src={
              currentUser.imageUrl || '/assets/icons/profile-placeholder.svg'
            }
            alt="user image"
            className="w-28 h-28 lg:w-36 lg:h-36 rounded-full"
          />
          <div className="flex flex-col flex-1 justify-between md:mt-2">
            <div className="flex flex-col w-full">
              <h1 className="text-center xl:text-left w-full h3-bold md:h1-semibold">
                {currentUser.name}
              </h1>
              <p className="text-center xl:text-left text-light-3 small-regular md:body-medium">
                @{currentUser.username}
              </p>
            </div>
            <div className="flex gap-8 mt-10 items-center justify-center xl:justify-start flex-wrap z-20">
              <StatBlock value={currentUser.posts.length} label="Posts" />
              <StatBlock value={270} label="Followers" />
              <StatBlock value={362} label="Followings" />
            </div>
            <p className=""></p>
          </div>

          <div className="">
            <div className="">
              <Link to={`/update-profile/`}>
                <img src="" alt="" />
                <p className=""></p>
              </Link>
            </div>
            <div className="">
              <Button>Follow</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
