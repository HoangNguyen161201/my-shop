import { Box, Center, HStack, Image, Text } from "@chakra-ui/react";
import { LuShoppingCart } from "react-icons/lu";

const Percent = ({ percent }: { percent: string }) => (
  <Text
    zIndex={3}
    borderRadius={10}
    px={1}
    borderLeft={"4px solid white"}
    borderTop={"4px solid white"}
    bg={"red.100"}
    color={"red.500"}
  >
    {percent}
  </Text>
);

export default function ProductCard() {
  return (
    <Box
      cursor={"pointer"}
      _hover={{
        border: "3px solid",
        borderRadius: 10,
        borderColor: "green.200",
        p: [0.5,1, 1.5, 2],
        transition: "0.2s",
      }}
    >
      <Box position={"relative"} borderRadius={10} overflow={"hidden"}>
        <Image
          src="https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lxswkgjsed3v44"
          alt="Naruto vs Sasuke"
          aspectRatio={3.5 / 4}
          width="full"
          objectPosition={"top"}
        />
        <Center
          w={7}
          h={7}
          borderRadius={20}
          pos={"absolute"}
          top={2}
          right={2}
          bg={"white"}
        >
          <LuShoppingCart color="grey" />
        </Center>
        <Box position={"absolute"} bottom={0} right={0}>
          <Box
            pos={"absolute"}
            top={-5}
            right={0}
            w={5}
            h={5}
            boxShadow={"10px 10px 0px white"}
            bg={"transparent"}
            borderRadius={20}
          />
          <Box
            pos={"absolute"}
            bottom={0}
            left={-5}
            w={5}
            h={5}
            boxShadow={"10px 10px 0px white"}
            bg={"transparent"}
            borderRadius={20}
          />
          <Percent percent="-30%" />
        </Box>
        <Box position={"absolute"} bottom={0} right={0}>
          <Percent percent="-30%" />
        </Box>
      </Box>
      <Text
        mt={2}
        fontSize={['small', 'sm', 'md']}
        display={"-webkit-box"}
        overflow={"hidden"}
        WebkitLineClamp={2}
        style={{
          WebkitBoxOrient: "vertical",
        }}
        fontWeight={600}
      >
        Sản phẩm 1 Sản phẩm Sản phẩm 1 Sản phẩm Sản phẩm 1 Sản phẩm 1 Sản phẩm 1
        Sản phẩm 1 Sản phẩm 1
      </Text>
      <HStack alignItems={'center'} mt={1}>
        <Text whiteSpace={'nowrap'} fontSize={['10px', 'small', 'sm']} color={'gray.400'} textDecor={'line-through'}>200.000 VND</Text>
        <Text whiteSpace={'nowrap'} color={'red.600'} fontSize={['12px', 'sm', 'md']} fontWeight={600}>100.000 VND</Text>
      </HStack>
    </Box>
  );
}
