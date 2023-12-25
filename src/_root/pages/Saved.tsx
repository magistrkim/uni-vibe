import { Models } from 'appwrite';
import { useGetCurrentUser } from '@/lib/react-query/queriesAndMutations';
import GridPostList from '@/components/shared/GridPostList';
import Loader from '@/components/shared/Loader';

const Saved = () => {
  const { data: currentUser } = useGetCurrentUser();
  const savePosts = currentUser?.save
    .map((savePost: Models.Document) => ({
      ...savePost.post,
      creator: {
        imageUrl: currentUser.imageUrl,
      },
    }))
    .reverse();
  return (
    <div className="saved-container">
      <div className="flex w-full gap-2 max-w-5xl">
        <img src="/assets/icons/save.svg" alt="save" width={36} height={36} />
        <h2 className="h3-bold md:h2-bold text-left w-full">Saved Posts</h2>
      </div>
      {!currentUser ? (
        <Loader />
      ) : (
        <ul className="w-full flex justify-center max-w-5xl gap-9">
          {savePosts.length === 0 ? (
            <p className="text-light-4">No available posts</p>
          ) : (
            <GridPostList posts={savePosts} showStats={false} />
          )}
        </ul>
      )}
    </div>
  );
};

export default Saved;
