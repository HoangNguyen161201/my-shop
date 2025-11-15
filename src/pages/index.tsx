import CountDown from "@/components/CountDown";
import FlashSale from "@/components/FlashSale";
import Input from "@/components/form/Input";
import ProductCard from "@/components/ProductCard";
import { Box, Grid, HStack, Stack, Text, VStack } from "@chakra-ui/react";
import { GoSearch } from "react-icons/go";

export default function index() {
  return (
    <VStack mb={5} spaceY={10} py={5} pt={[10, 20]} px={[2, 5]}>
      <Stack
        shadow={"sm"}
        bg={"white"}
        zIndex={1}
        py={[2, 5]}
        px={[2, 5]}
        pos={"fixed"}
        top={0}
        spaceY={[0, 0]}
        direction={["column", "row"]}
        w={"full"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <FlashSale display={["none", "flex"]} />
        <Input
          maxW={["full", 300]}
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
      </Stack>
      <Box>
        <FlashSale mb={5} display={["flex", "none"]} />
        <Grid
          gapX={5}
          gapY={[5, 7, 9]}
          w={"full"}
          templateColumns={[
            "repeat(2, 1fr)",
            "repeat(2, 1fr)",
            "repeat(3, 1fr)",
            "repeat(3, 1fr)",
            "repeat(4, 1fr)",
          ]}
        >
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </Grid>
      </Box>
    </VStack>
  );
}
