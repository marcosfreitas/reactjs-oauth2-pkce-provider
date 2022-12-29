import { ReactNode } from 'react';

export interface RouteCheckerProps {
  children: ReactNode;
  errorCallback: () => any;
  loadingCallback: () => any;
}
