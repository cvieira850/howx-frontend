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

type CreateUserFormData = {
  name: string;
  email: string;
  password: string;
}

const createUserFormSchema = yup.object().shape({
  name: yup.string().required('Nome obrigatório'),
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: yup.string().required('Senha obrigatória').min(6, 'Senha deve ter no mínimo 6 caracteres'),
});

export default function CreateUser() {
  const router = useRouter()

  const createUser = useMutation(async (user: CreateUserFormData) => {
    const response = await api.post('/users', {
      ...user
    })
    return response.data;
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('users');
    }
  });
  const { register, handleSubmit, formState } = useForm<CreateUserFormData>({
    resolver: yupResolver(createUserFormSchema)
  });

  const { errors } = formState;

  const handleCreateUser: SubmitHandler<CreateUserFormData> = async (values) => {
    await createUser.mutateAsync(values)

    router.push('/users')
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
          <Heading size="lg" fontWeight="normal">Criar Usuário</Heading>

          <Divider my="6" borderColor="gray.700" />

          <VStack spacing="8">
            <SimpleGrid  w="100%" flex={1} justifyContent="flex-start">
              <Input  name="name" label="Nome" error={errors.name} {...register('name')}/>
            </SimpleGrid>
            <SimpleGrid minChildWidth="240px" spacing={["6","8"]} w="100%">
              <Input  name="email" label="E-mail" type="email" error={errors.email} {...register('email')}/>
              <Input  name="password" label="Senha" type="password" error={errors.password} {...register('password')}/>
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
