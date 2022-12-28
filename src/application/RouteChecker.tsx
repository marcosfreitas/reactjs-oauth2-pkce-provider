import { ReactElement, useContext } from 'react';
import { redirect, Route, Routes } from 'react-router-dom';

import { AuthContextInterface } from '@app/domain/contracts/AuthContextInterface';
import { RouteCheckerProps } from '@app/domain/contracts/RouteCheckerProps';
import { AuthContext } from './AuthContext';

/**
 * @bug triggering a Invalid hook call when used.
 */
const RouteChecker: React.FC<RouteCheckerProps> = (props) => {
  const { children, errorCallback, loadingCallback } = props;
  const { authService, isLoading } =
    useContext<AuthContextInterface>(AuthContext);

  if (!authService || !isLoading) {
    return errorCallback();
  }

  if (isLoading()) {
    return loadingCallback();
  }

  if (!authService.isAuthenticated()) {
    return (
      <Routes>
        <Route element={redirect(authService.getAuthorizeUrl())} />;
      </Routes>
    );
  }

  return children;
};

export { RouteChecker };
