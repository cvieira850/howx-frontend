import { Flex, ListItem, Text } from "@chakra-ui/react";
import Link from "next/link";

type HelpListItemProps = {
  href: string;
  label: string;
}

export default function HelpListItem({href, label}: HelpListItemProps) {
  return (
    <ListItem>
      <Link href={href} passHref>
        <Flex as="button">
          <Text fontSize="14" color="blue.700" fontWeight="bold">
            {label}
          </Text>
        </Flex>
      </Link>
    </ListItem>
  )
}
