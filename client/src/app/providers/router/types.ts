import { RouteObject } from 'react-router-dom';

export type AppRouteObject = RouteObject & { authRequire: boolean };