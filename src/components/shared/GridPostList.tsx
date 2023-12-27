import { Models } from 'appwrite';
import { Link } from 'react-router-dom';
import { useUserContext } from '@/context/AuthContext';
import PostStats from './PostStats';

type GridPostListProps = {
  posts: Models.Document[];
  showUser?: boolean;
  showStats?: boolean;
  customContainerClass?: string;
};

const GridPostList = ({
  posts = [],
  showUser = true,
  showStats = true,
  customContainerClass = 'grid-container',
}: GridPostListProps) => {
  const { user } = useUserContext();
  return (
    <ul className={customContainerClass}>
      {posts.map(post => (
        <li key={post.$id} className="relative min-w-80 h-80">
          <Link to={`/posts/${post.$id}`} className="grid-post_link">
            <img
              src={post.imageUrl}
              alt="post image"
              className="w-full h-full object-cover"
            />
          </Link>
          <div className="grid-post_user">
            {showUser && (
              <div className="flex gap-2 justify-start items-center flex-1">
                <img
                  src={post.creator.imageUrl}
                  alt="user image"
                  className="h-8 w-8 rounded-full"
                />
                <p className="line-clamp-1">{post.creator.name}</p>
              </div>
            )}
            {showStats && <PostStats post={post} userId={user.id} />}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default GridPostList;
