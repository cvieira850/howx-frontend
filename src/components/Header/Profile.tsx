import { Avatar, Box, Flex, HStack, Menu, MenuButton, MenuItem, MenuList, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { ActiveLink } from "../ActiveLink";

interface ProfileProps {
  showProfileData: boolean;
}

export function Profile({ showProfileData = true} : ProfileProps) {
  const { user, isAuthenticated, signOut } = useContext(AuthContext);
  if(!isAuthenticated) {
    return (
      <Flex align="center" >
        <HStack spacing="6">
          <ActiveLink href="/login" passHref>
            <Flex as="button" fontSize="md" color="white">
              Login
            </Flex>
          </ActiveLink>
          <ActiveLink href="/signup" passHref>
            <Flex as="button" fontSize="md" color="white">
              Singup
            </Flex>
          </ActiveLink>
        </HStack>
      </Flex>
    );
  }
  return (
    <Flex align="center">
      { showProfileData && (
        <Box marginRight="4" textAlign="right">
          <Text color="white">{user?.name}</Text>
          <Text color="white" fontSize="small">{user.email}</Text>
        </Box>
      )}
        <Menu>
          <MenuButton>
            <Avatar size="md" bg="green.500" color="white" name={user?.name} src={null}/>
          </MenuButton>
          <MenuList>
            <MenuItem
              as="button"
              onClick={signOut}
              padding="5"
              color="blue.700"
              fontWeight="500"
              _hover={
                {
                  bg: "gray.200",
                }
              }
            >
              Signout
            </MenuItem>
          </MenuList>
        </Menu>
    </Flex>
  );
}
