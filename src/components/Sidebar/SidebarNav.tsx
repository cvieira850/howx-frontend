import { Icon, Stack, Text, Link as ChakraLink } from "@chakra-ui/react";
import { useContext } from "react";
import { RiContactsLine,  RiGamepadLine, RiLoginBoxLine, RiLogoutBoxLine, RiRegisteredLine, RiSortAsc } from "react-icons/ri";
import { AuthContext } from "../../contexts/AuthContext";
import { Can } from "../Can";
import { NavLink } from "./NavLink";
import { NavSection } from "./NavSection";

export function SidebarNav() {
  const { isAuthenticated, signOut } = useContext(AuthContext);
  return (
    <Stack spacing="12" alignItems="flex-start">
      <NavSection title="CONTA">
        {isAuthenticated ? (
          <ChakraLink display="flex" as="button" onClick={signOut} alignItems="center" >
            <Icon color="white" as={RiLogoutBoxLine} fontSize="20"/>
            <Text color="white" marginLeft="4" fontWeight="medium"> Logout</Text>
          </ChakraLink>
        ) : ( 
          <>
            <NavLink href="/login" icon={RiLoginBoxLine}>Logar</NavLink>
            <NavLink href="/signup" icon={RiRegisteredLine}>Cadastrar</NavLink>
          </>
        )}
        
      </NavSection>
      <Can>
        <NavSection title="GERAL">
          <NavLink href="/requests" icon={RiGamepadLine}>Pedidos</NavLink>
        </NavSection>
      </Can>
      <Can >
        <NavSection title="ADMINISTRATIVO">
          <NavLink href="/users" icon={RiContactsLine}>Usuários</NavLink>
        </NavSection>
      </Can>
    </Stack>
  )
}
