import { Flex, Heading, Text } from "@chakra-ui/react";

type formHeaderProps = {
  label: string
}
export default function FormHeader({ label }: formHeaderProps) {
  return (
    <Flex borderTopRightRadius={8} borderTopLeftRadius={8}  h="16" align="center" justify="center"  bg="blue.700" color="white">
      <Heading>
        <Text fontSize="24">{label}</Text>
      </Heading>
    </Flex >
  )
}
