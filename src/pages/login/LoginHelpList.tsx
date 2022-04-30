import { List } from "@chakra-ui/react";
import HelpListItem from "../../components/HelpListItem";

export default function LoginHelpList() {
  return (
    <List spacing="1" mx="8" mt="-4">
      <HelpListItem href="/signup" label="Cadastre-se"/>
      {/* <HelpListItem href="/forgotpassword" label="Esqueci minha senha"/> */}
    </List>
  )
}
