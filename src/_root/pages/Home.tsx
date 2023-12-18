import Loader from '@/components/shared/Loader';
import { useEffect } from 'react';
import {
  useGetRecentPosts,
  useGetPosts,
} from '@/lib/react-query/queriesAndMutations';
import { Models } from 'appwrite';
import PostCard from '@/components/shared/PostCard';
import { useInView } from 'react-intersection-observer';

const Home = () => {
  const { ref, inView } = useInView();
  const {
    data: posts,
    isPending: isPostLoading,
    isError: isErrorPosts,
  } = useGetRecentPosts();
  const { fetchNextPage, hasNextPage } = useGetPosts();

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView]);

  return (
    <div className="flex flex-1">
      <div className="home-container">
        <div className="home-posts">
          <h2 className="h3-bold md:h2-bold text-left w-full">Home feed</h2>
          {isPostLoading && !posts ? (
            <Loader />
          ) : (
            <ul className="flex flex-col flex-1 w-full gap-9">
              {posts?.documents.map((post: Models.Document) => (
                <PostCard post={post} key={post.caption} />
              ))}
            </ul>
          )}
        </div>
        {hasNextPage && (
          <div ref={ref} className="mt-10">
            <Loader />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
