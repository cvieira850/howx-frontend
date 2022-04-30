import { Button, FormControl, FormErrorMessage, FormLabel, Icon, Input as ChakraInput, InputGroup, InputProps as ChakraInputProps, InputRightElement } from "@chakra-ui/react";
import { forwardRef, ForwardRefRenderFunction, useState } from "react";
import { FieldError } from 'react-hook-form'
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";

interface InputProps extends ChakraInputProps{
  name: string;
  label?: string;
  error?: FieldError;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement,InputProps> 
  = ({name, label, error = null, ...rest}, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const handlePasswordVisibility = () => setShowPassword(!showPassword);

    return (
      <FormControl isInvalid={!!error}>
        {!!label && <FormLabel color="blue.700" htmlFor={name}>{label}</FormLabel> }
        <InputGroup>
          <ChakraInput
            id={name}
            name={name}
            focusBorderColor="blue.700"
            bgColor="white"
            type={showPassword ? 'text' : 'password'}
            variant={"filled"}
            borderColor={error ? 'red.500' : 'gray.200'}
            _hover={{ bgColor: "gray.50" }}
            _focus={{ bgColor: "gray.50" }}
            size="lg"
            ref={ref}
            {...rest}
          />
          <InputRightElement width="3rem">
            <Button h="1.5rem" size="sm" onClick={handlePasswordVisibility}>
              {showPassword ? <Icon  as={RiEyeLine} /> : <Icon as={RiEyeOffLine} />}
            </Button>
          </InputRightElement>
        </InputGroup>
        {error && (
          <FormErrorMessage>
            {error.message}
          </FormErrorMessage>
        )}
      </FormControl>
    );
  }

export const PasswordInput = forwardRef(InputBase);
