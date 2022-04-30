import { Flex, Text } from "@chakra-ui/react";
import Link from "next/link";

interface LogoProps {
  isFooter?: boolean;
}

export function Logo({isFooter = false}: LogoProps) {
  return (
    <Link href="/" passHref>
      <Flex
        as="button"
        fontSize={["2xl", "3xl"]}
        fontWeight="bold"
        letterSpacing="tight"
        width={isFooter? "32" : "64"}
        color="white"
      >
        CVieira
        <Text  as="span" marginLeft="1" color="orange.500">.</Text>
      </Flex>
    </Link>
  );
}
