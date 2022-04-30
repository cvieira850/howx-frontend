import { List } from "@chakra-ui/react";

import HelpListItem from "../../components/HelpListItem";

export default function SignupHelpList() {
  return (
    <List spacing="1" mx="8" mt="-4">
      <HelpListItem href="/login" label="Login"/>
    </List>
  )
}
