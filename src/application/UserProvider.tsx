import { ReactNode, useState } from 'react';
import { UserContext } from '@app/application/UserContext';

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState({});

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
