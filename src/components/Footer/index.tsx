import { Box, Flex, List, ListItem, Text, useBreakpointValue } from "@chakra-ui/react";
import { RiInformationLine, RiQuestionLine } from "react-icons/ri";
import { Logo } from "../Header/Logo";
import { NavLink } from "../Sidebar/NavLink";

type FooterProps = {
  isBig?: boolean;
}
export default function Footer({isBig = false}: FooterProps) {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  })
  let mt = isBig ? "10" : "-28";
  return (
    <Flex
      direction="column"
      as="footer"
      h="28"
      mt={mt}
      bg="blue.700"
      align="center"
      justify="center"
      color="white"
      // my="100%"
    >
      <Flex direction="row" justify="space-between" w={["50%","70%"]}>
        <Flex direction={isWideVersion ? "row" : "column"} >
          <List spacing="3">
            <ListItem>
              <NavLink href="/faq" fontSize="16" icon={RiQuestionLine}> Faq </NavLink>
            </ListItem>
            <ListItem>
              <NavLink href="/us" icon={RiInformationLine}> Quem somos </NavLink>
            </ListItem>
          </List>
        </Flex>
        <Logo isFooter/>
      </Flex>
      { isWideVersion && <Text>Criado por AppSolver</Text> }
    </Flex>
  )
}
