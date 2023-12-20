import { useToast } from '@/components/ui/use-toast';
import Loader from '@/components/shared/Loader';
import { useGetUsers } from '@/lib/react-query/queriesAndMutations';
import UserCard from '@/components/shared/UserCard';

const AllUsers = () => {
  const { toast } = useToast();
  const {
    data: creators,
    isLoading,
    isError: isErrorCreators,
  } = useGetUsers(10);

  if (isErrorCreators) {
    toast({ title: 'Something went wrong.' });
    return;
  }

  return (
    <section className="common-container">
      <div className="user-container">
        <div className="max-w-5xl flex-start gap-3 justify-start w-full">
          <img
            src="/assets/icons/people.svg"
            alt="people"
            width={36}
            height={36}
          />
          <h3 className="h3-bold md:h2-bold w-full text-left"> All Users</h3>
        </div>
        {isLoading && !creators ? (
          <Loader />
        ) : (
          <ul className="user-grid">
            {creators?.documents.map(creator => (
              <li key={creator?.$id}>
                <UserCard user={creator} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default AllUsers;
