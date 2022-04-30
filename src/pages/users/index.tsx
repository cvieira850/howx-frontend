import { Flex, Text } from "@chakra-ui/react";
import Header from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";

export default function UsersList() {
  return (
    <Flex direction="column" h="100vh">
      <Header />
      <Sidebar />

      <Text>Users Page</Text>
    </Flex>
  )
}
