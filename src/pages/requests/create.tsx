import { Box,Button,Divider,Flex, Heading, HStack, SimpleGrid, VStack } from '@chakra-ui/react'
import Link from 'next/link'
import { Input } from '../../components/Form/Input'
import { Sidebar } from '../../components/Sidebar'
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from 'react-query'
import { api } from '../../services/apiClient'
import { queryClient } from '../../services/queryClient'
import { useRouter } from 'next/router'
import Header from '../../components/Header';

type CreateRequestFormData = {
  name: string;
  value: number;
  type_payment: string;
}

const createRequestFormSchema = yup.object().shape({
  name: yup.string().required('Nome obrigatório'),
  value: yup.number().required('Valor obrigatório'),
  type_payment: yup.string().required('Tipo de pagamento obrigatório').min(6, 'Tipo de pagamento inválido'),
});

export default function CreateRequest() {
  const router = useRouter()

  const createRequest = useMutation(async (pedido: CreateRequestFormData) => {
    console.log(pedido)
    const response = await api.post('/requests', {
      ...pedido, client_id: null
    })
    console.log(response)
    return response.data;
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('requests');
    }
  });
  const { register, handleSubmit, formState } = useForm<CreateRequestFormData>({
    resolver: yupResolver(createRequestFormSchema)
  });

  const { errors } = formState;

  const handleCreateUser: SubmitHandler<CreateRequestFormData> = async (values) => {
    await createRequest.mutateAsync(values)

    router.push('/requests')
  }
  return (
    <Box>
      <Header />
      <Sidebar />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">

        <Box
          as="form"
          flex="1"
          borderRadius={8}
          bg="gray.300"
          p={["6","8"]}
          onSubmit={handleSubmit(handleCreateUser)}
        >
          <Heading size="lg" fontWeight="normal">Criar Pedido</Heading>

          <Divider my="6" borderColor="gray.700" />

          <VStack spacing="8">
            <SimpleGrid  w="100%" flex={1} justifyContent="flex-start">
              <Input  name="name" label="Nome do cliente" error={errors.name} {...register('name')}/>
            </SimpleGrid>
            <SimpleGrid minChildWidth="240px" spacing={["6","8"]} w="100%">
              <Input  type="number" name="value" label="Valor" error={errors.value} {...register('value')}/>
              <Input  name="type_payment" label="Tipo de pagamento" error={errors.type_payment} {...register('type_payment')}/>
            </SimpleGrid>
          </VStack>
          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Link href="/requests" passHref>
                <Button colorScheme="red">Cancelar</Button>
              </Link>
              <Button
                type="submit"
                colorScheme="orange"
                isLoading={formState.isSubmitting}
              >
                Salvar
              </Button>
            </HStack>

          </Flex>
        </Box>
      </Flex>
    </Box>
  )
}
