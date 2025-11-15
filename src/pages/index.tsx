import CountDown from "@/components/CountDown";
import Input from "@/components/form/Input";
import { Box, HStack, Text, VStack, Grid } from "@chakra-ui/react";
import { GoSearch } from "react-icons/go";

export default function index() {
  return (
    <VStack py={5} px={5} border={"1px solid red"}>
      <HStack w={"full"} alignItems={"center"} justifyContent={"space-between"}>
        <HStack
          spaceX={2}
          w={"100%"}
          alignItems={"center"}
          justifyContent={"start"}
        >
          <Text w={"fit-content"} fontWeight={700} fontSize={"2xl"}>
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
        <Input
          maxW={300}
          startElement={
            <Box pl={3.5}>
              <GoSearch />
            </Box>
          }
          outline={"none"}
          borderRadius={100}
          inputProps={{
            bg: "gray.100",
            border: "none",
            borderRadius: 50,
            pr: 4,
            placeholder: "Nhập tên hoặc mã sản phẩm ...",
          }}
        />
      </HStack>
      <Grid
        border={'1px solid red'}
        w={'full'}
        templateColumns={[
          "repeat(1, 1fr)",
          "repeat(2, 1fr)",
          "repeat(2, 1fr)",
          "repeat(3, 1fr)",
          "repeat(4, 1fr)"
        ]}
      >
        <Box h="20" bg="red.200" />
        <Box h="20" bg="blue.200" />
        <Box h="20" bg="green.200" />
        <Box h="20" bg="red.200" />
        <Box h="20" bg="blue.200" />
        <Box h="20" bg="green.200" />
      </Grid>
    </VStack>
  );
}
