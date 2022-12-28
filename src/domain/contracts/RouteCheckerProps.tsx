import { ReactElement } from 'react';

export interface RouteCheckerProps {
  children: ReactElement;
  errorCallback: () => any;
  loadingCallback: () => any;
}
