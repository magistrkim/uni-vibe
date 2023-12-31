import * as z from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { SignupValidationSchema } from '@/lib/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Loader from '@/components/shared/Loader';
import { useToast } from '@/components/ui/use-toast';
import {
  useCreateUserAccount,
  useSigninAccount,
} from '@/lib/react-query/queriesAndMutations';
import { useUserContext } from '@/context/AuthContext';

const SignupForm = () => {
  const { toast } = useToast();
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof SignupValidationSchema>>({
    resolver: zodResolver(SignupValidationSchema),
    defaultValues: {
      username: '',
      name: '',
      email: '',
      password: '',
    },
  });

  const { mutateAsync: createUserAccount, isPending: isCreatingAccount } =
    useCreateUserAccount();
  const { mutateAsync: signinAccount, isPending: isSigningIn } =
    useSigninAccount();

  const onSubmit = async (values: z.infer<typeof SignupValidationSchema>) => {
    const newUser = await createUserAccount(values);
    if (!newUser) {
      return toast({ title: 'Sign up failed. Please try again' });
    }
    const session = await signinAccount({
      email: values.email,
      password: values.password,
    });
    if (!session) {
      return toast({ title: 'Sign in failed. Please try again' });
    }
    const isLoggedIn = await checkAuthUser();
    if (isLoggedIn) {
      form.reset();
      navigate('/');
    } else {
      return toast({ title: 'Sign up failed. Please try again' });
    }
  };

  return (
    <Form {...form}>
      <div className="sm:w-400 flex-center flex-col">
        <div className="flex flex-row gap-4">
          <img
            src="/assets/images/logo-form.png"
            alt="logo"
            width={48}
            height={48}
          />
          <p className="h1-medium font-fingerPaint">UniVibe</p>
        </div>
        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-10">
          Create a new account
        </h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">
          To use UniVibe, please enter your details
        </p>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 w-full mt-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="shad-button_primary">
            {isCreatingAccount || isSigningIn || isUserLoading ? (
              <div className="flex-center gap-2">
                <Loader /> Loading...
              </div>
            ) : (
              'Sign up'
            )}
          </Button>
          <p className="text-small-regular text-light-2 text-center mt-2">
            Already have an account?
            <Link
              to="/sign-in"
              className="text-primary-500 ml-2 text-small-semibold"
            >
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
};

export default SignupForm;
