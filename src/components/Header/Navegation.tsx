import { Flex, HStack, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { ActiveLink } from "../ActiveLink";

export function Navegation() {
  return (
    <Flex
      flex="1"
      paddingY="4"
      paddingX="8"
      marginLeft="6"
      alignSelf="center"
      color="gray.200"
      position="relative"
      mr={["0", "64"]}
    >
      <HStack spacing="6">
        <ActiveLink href="/crossword" passHref>
          <Flex as="button" fontSize="md" color="white">
            Crossword
          </Flex>
        </ActiveLink>
        <ActiveLink href="/ranking" passHref>
          <Flex as="button" fontSize="md" color="white">
            Ranking
          </Flex>
        </ActiveLink>
        <Menu>
          <MenuButton>
            Administrativo
          </MenuButton>
          <MenuList>
            <MenuItem
              as="a"
              href="/dashboard"
              padding="5"
              color="blue.700"
              fontWeight="500"
              _hover={
                {
                  bg: "gray.200",
                }
              }
            >
              Dashboard
            </MenuItem>
            <MenuItem
              as="a"
              href="/users"
              padding="5"
              color="blue.700"
              fontWeight="500"
              _hover={
                {
                  bg: "gray.200",
                }
              }
            >
              Usuários
            </MenuItem>
          </MenuList>
        </Menu>
      
      </HStack>
    </Flex>
  );
}
