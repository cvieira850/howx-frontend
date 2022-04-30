import { Flex, Text } from "@chakra-ui/react";
import { redirect } from "next/dist/server/api-utils";
import { destroyCookie } from "nookies";
import Header from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { setupAPIClient } from "../../services/api";
import { AuthTokenError } from "../../services/errors/AuthTokenError";
import { withSSRAuth } from "../../utils/withSSRAuth";

export default function Crossword() {
  return (
    <Flex direction="column" h="100vh">
      <Header />
      <Sidebar />

      <Text>Crossword Page</Text>
    </Flex>
  )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx);
    const response = await apiClient.get("/me");
    return {
      props: {
        crossword: response.data
      }
    }
} )
