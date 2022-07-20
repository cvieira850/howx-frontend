import { Button, Flex, Stack } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
import { useQuery } from "react-query";

import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../../components/Form/Input";
import { PasswordInput } from "../../components/Form/PasswordInput";
import FormHeader from "../../components/Form/FormHeader";
import LoginHelpList from "./LoginHelpList";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { queryClient } from "../../services/queryClient";

type SignInFormData = {
  email: string;
  password: string;
}

const signInFormSchema = yup.object().shape({
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: yup.string().required('Senha obrigatória'),
});

export function  LoginForm() {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signInFormSchema),
  });
  const { signIn } = useContext(AuthContext)

  const { errors } = formState;

  const handleSignIn: SubmitHandler<SignInFormData> = async (values) => {
    await new Promise(resolve => setTimeout(resolve,2000))
    await queryClient.prefetchQuery('me',() => signIn(values))
    // useQuery('me', ()=> signIn(values))
    console.log(values);
  }

  return (
    <Flex w="100vw" h="50vh" align="center" justify="center">
      <Flex
        as="form"
        width="100%"
        maxWidth={360}
        bg="white"
        mt={["32"]}
        
        borderRadius={8}
        flexDirection="column"
        onSubmit={handleSubmit(handleSignIn)}
      >
        <FormHeader label="LOGIN" />
        <Stack spacing={4} padding={8}>
          <Input
            name="email"
            label="E-mail"
            type="email"
            error={errors.email}
            {...register("email")}
          />
          <PasswordInput
            name="password"
            label="Password"
            error={errors.password}
            {...register("password")}
          />
        </Stack>
        <LoginHelpList />
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
          Entrar{" "}
        </Button>
      </Flex>
    </Flex>
  )
}
