import { useFocusOnPointerDown } from "@chakra-ui/react";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { validateUserPermissions } from "../utils/validateUserPermitions";

type UseCanParams = {
  roles?: string[];
}

export function useCan({ roles }: UseCanParams ) {
  const { user, isAuthenticated } = useContext(AuthContext) 

  if(!isAuthenticated){
    return false
  }

  return validateUserPermissions({ user, roles })
}
