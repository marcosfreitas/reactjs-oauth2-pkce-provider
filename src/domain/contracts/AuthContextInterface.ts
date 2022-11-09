import { AuthService } from '@app/domain/services/AuthService';

/**
 * @deprecated
 */
export interface AuthContextInterface {
  authService: AuthService;
  isAuthenticated: () => boolean;
  user?: object;
  isLoading?: boolean;
  login?: object;
  logout?: object;
}
