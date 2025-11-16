import { productResponse } from "@/types/product";
import {
    Box,
    Center,
    HStack,
    IconButton,
    Image,
    Stack,
    Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
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

interface ProductCardProps {
  data: productResponse;
  isDelete?: boolean;
  handleDelete: () => void;
}

export default function ProductCard({
  data,
  isDelete = false,
  handleDelete,
}: ProductCardProps) {
  const [loading, setLoading] = useState(false);
  const percent = -(((data.oldPrice - data.newPrice) / data.oldPrice) * 100).toFixed(0) + "%"
  return (
    <Stack pos={"relative"}>
      {isDelete && (
        <IconButton
          loading={loading}
          bg={"red.200"}
          color={"red.600"}
          pos={"absolute"}
          top={0}
          left={0}
          zIndex={1}
          onClick={() => {
            setLoading(true);
            handleDelete();
          }}
        >
          <FaRegTrashAlt
            style={{
              transform: "scale(0.7)",
            }}
          />
        </IconButton>
      )}
      <Link
        style={{
          height: "100%",
        }}
        href={data.adsUrl}
        target="_blank"
      >
        <Box
          cursor={"pointer"}
          h={"full"}
          _hover={{
            border: "3px solid",
            borderRadius: 10,
            borderColor: "green.200",
            p: [0.5, 1, 1.5, 2],
            transition: "0.2s",
          }}
        >
          <Box position={"relative"} borderRadius={10} overflow={"hidden"}>
            <Image
              src={data.imgUrl}
              alt={data.title}
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
              <Percent percent={percent} />
            </Box>
            <Box position={"absolute"} bottom={0} right={0}>
              <Percent percent={percent} />
            </Box>
          </Box>
          <Text
            mt={2}
            fontSize={["small", "sm", "md"]}
            display={"-webkit-box"}
            overflow={"hidden"}
            WebkitLineClamp={2}
            style={{
              WebkitBoxOrient: "vertical",
            }}
            fontWeight={600}
          >
            {data.title}
          </Text>
          <HStack alignItems={"center"} mt={1}>
            <Text
              whiteSpace={"nowrap"}
              fontSize={["10px", "small", "sm"]}
              color={"gray.400"}
              textDecor={"line-through"}
            >
              {new Intl.NumberFormat("vi-VN").format(data.oldPrice) + " VND"}
            </Text>
            <Text
              whiteSpace={"nowrap"}
              color={"red.600"}
              fontSize={["12px", "sm", "md"]}
              fontWeight={600}
            >
              {new Intl.NumberFormat("vi-VN").format(data.newPrice) + " VND"}
            </Text>
          </HStack>
        </Box>
      </Link>
    </Stack>
  );
}
