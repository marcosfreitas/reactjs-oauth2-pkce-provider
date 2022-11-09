import { AuthService } from '@app/domain/services/AuthService';
export interface AuthContextInterface {
  authService?: AuthService;
  isAuthenticated?: () => boolean;
  isLoading?: () => boolean;
  user?: object;
  login?: object;
  logout?: object;
}
