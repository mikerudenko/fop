import { Loadable } from '../components/loadable';

export const AdminProfile = Loadable(() =>
  import('./admin-profile').then((module: any) => ({
    default: module.AdminProfile,
  })),
);
