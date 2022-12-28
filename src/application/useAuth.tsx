import { useContext } from 'react';

import { AuthContext } from '@app/application/AuthContext';
import { AuthContextInterface } from '@app/domain/contracts/AuthContextInterface';

/**
 * @bug triggering a Invalid hook call when used on Routes.
 */
export function useAuth(): AuthContextInterface {
  const context = useContext<AuthContextInterface>(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }

  return context;
}
