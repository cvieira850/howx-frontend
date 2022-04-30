import { useContext } from "react";

type User = {
  id?: string;
  name?: string;
  email: string;
  role?: 'admin' | 'user' | 'sysAdmin';
}

type ValidateUserPermissionsParams = {
  user: User;
  roles?: string[];
}

export function validateUserPermissions({ user,roles}: ValidateUserPermissionsParams) {

  if(roles?.length > 0) {
    return roles.includes(user?.role)
  }

  return true
}


