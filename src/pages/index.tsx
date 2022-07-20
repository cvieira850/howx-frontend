import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react'
import type { NextPage } from 'next'
import { useContext } from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { Sidebar } from '../components/Sidebar'
import { AuthContext } from '../contexts/AuthContext'

const Home: NextPage = () => {
  const { signOut } = useContext(AuthContext)
  return (
    <Flex direction="column" >
      <Flex direction="column" h="100vh" minHeight="100%">
        <Header />
        <Sidebar />
        <Flex w="100%" my="6" justifyContent={"center"} maxWidth={1480} mx="auto" px="6">
            <Heading as='h3'>Bem vindo ao HowXX</Heading>

        </Flex>
      </Flex>
    </Flex>
  )
}

export default Home
