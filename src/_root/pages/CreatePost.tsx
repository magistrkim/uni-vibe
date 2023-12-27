import PostForm from '@/components/forms/PostForm';
import UserCard from '@/components/shared/UserCard';
import { useUserContext } from '@/context/AuthContext';
import GridPostList from '@/components/shared/GridPostList';
import Loader from '@/components/shared/Loader';
import { useGetUserPosts } from '@/lib/react-query/queriesAndMutations';

const CreatePost = () => {
  const { user } = useUserContext();
  const { data: userPosts, isLoading: isLoadingUserPosts } = useGetUserPosts(
    user.id
  );

  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="max-w-5xl flex-start gap-3 justify-start w-full">
          <img
            src="/assets/icons/add-post.svg"
            width={36}
            height={36}
            alt="app post"
          />
          <h2 className="h3-bold md:h2-bold w-full text-left">Create post</h2>
        </div>
        <PostForm action="Create" />
      </div>
      <div className="home-creators">
        <UserCard user={user} />
        <h3 className="body-bold text-light-1">Top posts by you</h3>
        <div className="flex flex-col">
          {isLoadingUserPosts && !userPosts ? (
            <div className="flex-center w-full h-full">
              <Loader />
            </div>
          ) : (
            <GridPostList
              posts={userPosts?.documents}
              showUser={false}
              customContainerClass="update-col"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
