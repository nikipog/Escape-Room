import { AuthorizationStatus } from '../const';
import { userSelector } from '../store/slices/user';
import { useAppSelector } from './store';

export function useAuth() {
  const status = useAppSelector(userSelector.userStatus);
  return status === AuthorizationStatus.Auth;
}
