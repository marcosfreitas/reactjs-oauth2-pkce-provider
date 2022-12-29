import { UserContextInterface } from '@app/domain/contracts/UserContextInterface';
import { createContext } from 'react';

export const UserContext = createContext<UserContextInterface>({});
