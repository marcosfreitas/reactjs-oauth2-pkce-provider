import { createContext } from 'react';
import { AuthContextInterface } from '@app/domain/contracts/AuthContextInterface';

/**
 * Authentication Context
 */
export const AuthContext = createContext<AuthContextInterface>({});
