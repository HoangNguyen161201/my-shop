import { HStack, Text, StackProps} from "@chakra-ui/react";
import CountDown from "./CountDown";

interface FlashSaleProps extends StackProps {

}

const FlashSale = ({...others}: FlashSaleProps) => (
  <HStack
    spaceX={2}
    w={"100%"}
    alignItems={"center"}
    justifyContent={"start"}
    {...others}
  >
    <Text
      whiteSpace={"nowrap"}
      w={"fit-content"}
      fontWeight={700}
      fontSize={["lg", "xl", "2xl"]}
    >
      Flash Sale
    </Text>
    <CountDown
      timeExtra={23 * 55 * 60 * 1000}
      px={2}
      fontSize={"sm"}
      borderRadius={5}
      py={1}
      fontWeight={600}
      bg={"green.200"}
    />
  </HStack>
);

export default FlashSale