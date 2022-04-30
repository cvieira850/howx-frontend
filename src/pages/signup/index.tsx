import { Flex } from "@chakra-ui/react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { withSSRGuest } from "../../utils/withSSRGuest";
import { SignupForm } from "./SignupForm";

export default function Signup() {
  return (
    <>
      <Flex direction="column"  h="100vh">
        <Header />
        <Sidebar />
        <SignupForm />
      </Flex>
      {/* <Footer isBig/> */}
    </>
  )
}

export const getServerSideProps = withSSRGuest(async (ctx) => {
  return {
    props: {}
  }
});
