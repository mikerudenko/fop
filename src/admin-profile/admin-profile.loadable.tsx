import { Loadable } from '../components/loadable';

export const AdminProfile = Loadable(() =>
  import('./invoice-form/admin-profile').then((module: any) => ({
    default: module.AdminProfile,
  })),
);
