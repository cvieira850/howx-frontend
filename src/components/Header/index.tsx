import { Flex, Icon, IconButton, useBreakpointValue } from "@chakra-ui/react";
import { Logo } from "./Logo";
import { RiMenuLine } from 'react-icons/ri'
import { Navegation } from "./Navegation";
import { Profile } from "./Profile";
import { useSidebarDrawer } from "../../contexts/SidebarDrawerContext";

export default function Header() {
  const { onOpen } = useSidebarDrawer()

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  })

  return (
    <Flex
      as="header"
      w="100%"
      maxWidth={1480}
      h="28"
      mx="auto"
      bg="blue.700"
      px={["4","6"]}
      align="center"
      // justify="space-between"
    >
      { !isWideVersion && (
        <IconButton
          aria-label="Open navigation"
          icon={<Icon
          as={RiMenuLine}
          />}
          fontSize="24"
          color="white"
          variant="unstyled"
          onClick={onOpen}
          mr="2"
        >

        </IconButton>
      )}
      <Logo />
      {isWideVersion && <Navegation/> }
      <Flex alignItems="center" marginLeft="auto" >
        <Profile showProfileData={isWideVersion} />
      </Flex>
    </Flex>
  )
}
