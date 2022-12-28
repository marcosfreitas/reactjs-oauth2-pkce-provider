import { AuthService } from '@app/domain/services/AuthService';

// @todo to be update, define object available via context
export interface AuthContextInterface {
  authService?: AuthService;
  //isAuthenticated?: () => boolean;
  //user?: object;
  isLoading?: () => boolean;
  //login?: object;
  //logout?: object;
}
