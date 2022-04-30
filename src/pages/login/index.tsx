import { Flex } from "@chakra-ui/react";

import Header from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import Footer from "../../components/Footer";
import { LoginForm } from "./loginForm";
import { withSSRGuest } from "../../utils/withSSRGuest";



export default function Login() {
  

  return (
    <>
    <Flex direction="column"  h="100vh">
      <Header />
      <Sidebar />
      <LoginForm />
    </Flex>
    {/* <Footer/> */}
    </>
  );
}

export const getServerSideProps = withSSRGuest(async (ctx) => {
  return {
    props: {}
  }
});
