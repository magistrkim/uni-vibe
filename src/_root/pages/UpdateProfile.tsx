import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useParams } from 'react-router-dom';
import { ProfileValidationSchema } from '@/lib/validation';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import Loader from '@/components/shared/Loader';
import ProfileUploader from '@/components/shared/ProfileUploader';
import { useUserContext } from '@/context/AuthContext';
import {
  useGetUserById,
  useUpdateUser,
} from '@/lib/react-query/queriesAndMutations';

const UpdateProfile = () => {
  return <div>UpdateProfile</div>;
};

export default UpdateProfile;
