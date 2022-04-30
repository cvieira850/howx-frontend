import { Flex, Text } from "@chakra-ui/react";
import { Can } from "../../components/Can";
import Header from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { useCan } from "../../hooks/useCan";

export default function Dashboard() {

  
  return (
    <Flex direction="column" h="100vh">
      <Header />
      <Sidebar />

      <Text>Dashboard Page</Text>
      <Can roles={['admin', 'sysAdmin']}>
        <Text>Métricas</Text>
      </Can>
    </Flex>
  )
}
