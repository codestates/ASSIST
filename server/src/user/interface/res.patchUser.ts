import { User } from '../user.entity';

export interface PatchUser {
  accessToken: string;
  user: User;
}
