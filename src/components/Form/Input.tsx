import { FormControl, FormErrorMessage, FormLabel, Input as ChakraInput, InputProps as ChakraInputProps } from "@chakra-ui/react";
import { forwardRef, ForwardRefRenderFunction } from "react";
import { FieldError } from 'react-hook-form'

interface InputProps extends ChakraInputProps{
  name: string;
  label?: string;
  error?: FieldError;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement,InputProps> 
  = ({name, label, error = null, ...rest}, ref) => {
    return (
      <FormControl isInvalid={!!error}>
        {!!label && <FormLabel color="blue.700" htmlFor={name}>{label}</FormLabel> }
        <ChakraInput
          id={name}
          name={name}
          focusBorderColor="blue.700"
          bgColor="white"
          variant={"filled"}
          borderColor={error ? 'red.500' : 'gray.200'}
          _hover={{ bgColor: "gray.50" }}
          _focus={{ bgColor: "gray.50" }}
          size="lg"
          ref={ref}
          {...rest}
        />

        {error && (
          <FormErrorMessage>
            {error.message}
          </FormErrorMessage>
        )}
      </FormControl>
    );
  }

export const Input = forwardRef(InputBase);
