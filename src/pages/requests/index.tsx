import {Link, Box, Button, Flex, Heading, Icon, Spinner, Table, Tbody, Td, Text, Th, Thead, Tr, useBreakpointValue} from "@chakra-ui/react";
import NextLink from 'next/link'
import { RiAddLine } from "react-icons/ri";
import Header from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { useRequests } from "../../hooks/useRequests";
import { setupAPIClient } from "../../services/api";
import { withSSRAuth } from "../../utils/withSSRAuth";
import { queryClient } from '../../services/queryClient'
import { api } from "../../services/apiClient";

export default function Pedido() {
  const {data, isLoading, isFetching, error } = useRequests()
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  })
  async function handlePrefetchRequest(requestId: string) {
    await queryClient.prefetchQuery(['request', requestId], async () => {
      const response = await api.get(`requests/${requestId}`)

      return response.data;
    }, {
      staleTime: 1000 * 60 * 10
    })
  }
  return (
    <Flex direction="column" h="100vh">
      <Header />
      <Sidebar />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <Box flex="1" borderRadius={8} bg="gray.300" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Pedidos
              {!isLoading && isFetching && <Spinner size="sm" color="gray.500" ml="4" />}
            </Heading>
            <NextLink href="/requests/create" passHref>
              <Button
                as="a"
                size="sm"
                fontSize="sm"
                colorScheme="orange"
                leftIcon={<Icon as={RiAddLine} fontSize="20" />}
              >
                Criar novo pedido
              </Button>
            </NextLink>
          </Flex>

          { isLoading ? (
            <Flex justify="center">
              <Spinner/>
            </Flex>
          ): error ? ( 
            <Flex justify="center">
              <Text>Falha ao obter dados do pedido</Text>
            </Flex>
          ) : (
            <>
              <Table colorScheme="gray">
              <Thead>
                <Tr>
                  <Th px={["0","4","6"]} color="gray.300" width="8">
                  </Th>
                  <Th>Cliente</Th>
                  <Th>Valor</Th>
                  { isWideVersion && <Th>Data de cadastro</Th> }
                  <Th>Tipo de Pagamento</Th>
                </Tr>
              </Thead>
              <Tbody>
                { data.requests.map(request => {
                  return (
                    <Tr key={request.id}>
                      <Td px={["0","4","6"]}>
                      </Td>
                      <Td>
                          <Box>
                            <NextLink href={`/requests/${request.id}`} passHref>
                              <Link color="blue.700" onMouseEnter={() => handlePrefetchRequest(request.id)}>
                                <Text fontWeight="bold">{request.name}</Text>
                              </Link>
                            </NextLink>
                            {/* <Text fontSize="small" color="gray.300">{request.value}</Text> */}
                          </Box>
                      </Td>
                      <Td>
                      <Text fontSize="sm" color="blue.700">{ new Intl.NumberFormat('pt-BR',{style: 'currency', currency:'BRL'}).format(request.value)}</Text>
                      </Td>
                      { isWideVersion && <Td>
                        <Text fontSize="sm" color="blue.700">{request.createdAt}</Text>
                      </Td> }
                      <Td paddingRight="0">
                      <Text fontSize="sm" color="blue.700">{request.type_payment}</Text>
                        {/* <HStack spacing={4} flex="1" justify="flex-end">
                          <ButtonGroup size='sm'>
                            { isWideVersion && (
                              <Button 
                                mr="-5"
                                as="a" 
                                size="sm"
                                fontSize="sm" 
                                colorScheme="orange"
                                >
                                Editar
                              </Button>
                            )}
                            <IconButton aria-label='Editar' colorScheme="orange" icon={<Icon as={RiPencilLine} fontSize="16" />} />
                          </ButtonGroup> */}
                          {/* <ButtonGroup size='sm'>
                            { isWideVersion && (
                              <Button
                                mr="-5"
                                as="a"
                                size="sm"
                                fontSize="sm"
                                colorScheme="red"
                              >
                                Deletar
                              </Button>
                            )}
                            <IconButton aria-label='Deletar' colorScheme="red" icon={<Icon as={RiDeleteBinLine} fontSize="16" />} />
                          </ButtonGroup> */}
                        {/* </HStack> */}
                      </Td>
                    </Tr>
                  )
                })}
              </Tbody>
              </Table>

            </>
          )}
        </Box>
      </Flex>
    </Flex>
  )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx);
    const response = await apiClient.get("/me");
    return {
      props: {
        pedidos: response.data
      }
    }
} )
