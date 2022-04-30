import { Button, Flex, Stack } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
import { useMutation } from 'react-query'

import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../../components/Form/Input";
import { PasswordInput } from "../../components/Form/PasswordInput";
import FormHeader from "../../components/Form/FormHeader";
import SignupHelpList from "./SignupHelpList";
import { api } from "../../services/apiClient";
import { queryClient } from "../../services/queryClient";
import { useRouter } from "next/router";
import { setCookie } from "nookies";

type SignUpFormData = {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

const signInFormSchema = yup.object().shape({
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  name: yup.string().required('Nome obrigatório'),
  password: yup.string().required('Senha obrigatória'),
  passwordConfirmation: yup.string().required('Confirmação de senha obrigatória').oneOf([yup.ref('password'), null], 'Senhas não conferem'),
});

export function  SignupForm() {
  const router = useRouter()

  const createUser = useMutation(async (user: SignUpFormData) => {
    const response = await api.post('/signup', {
        ...user
    })
    const { accessToken } = response.data;
    setCookie(undefined, 'nextauth.token', accessToken, {
        maxAge: 60 * 60 * 24 * 30, //30 dias
        path: '/'
    })

    console.log(response.data)
    api.defaults.headers['x-access-token'] = accessToken;
    return response.data;
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('users');
    }
  });

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signInFormSchema),
  });

  const { errors } = formState;

  const handleSignUp: SubmitHandler<SignUpFormData> = async (values) => {
    await createUser.mutateAsync(values)

    router.push('/')
  }

  return (
    <Flex h="70vh" align="center" justify="center">
      <Flex
        as="form"
        width="100%"
        maxWidth={360}
        bg="white"
        mt={{base: "52", md: "48", lg: "32" }}
        
        borderRadius={8}
        flexDirection="column"
        onSubmit={handleSubmit(handleSignUp)}
      >
        <FormHeader label="CADASTRE-SE" />
        <Stack spacing={4} padding={8}>
          <Input
            name="name"
            label="Nome"
            error={errors.name}
            {...register("name")}
          />
          <Input
            name="email"
            label="E-mail"
            type="email"
            error={errors.email}
            {...register("email")}
          />
          <PasswordInput
            name="password"
            label="Senha"
            error={errors.password}
            {...register("password")}
          />
          <PasswordInput
            name="passwordConfirmation"
            label="Confirmação de senha"
            error={errors.passwordConfirmation}
            {...register("passwordConfirmation")}
          />
        </Stack>
        <SignupHelpList />
        <Button
          type="submit"
          mt={6}
          bg="orange.500"
          color="white"
          _hover={{ bgColor: "gray.50",  }}
          size="lg"
          isLoading={formState.isSubmitting}
        >
          {" "}
          Cadastrar{" "}
        </Button>
      </Flex>
    </Flex>
  )
}
