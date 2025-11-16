import { HStack, IconButton, Text } from "@chakra-ui/react";
import { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";

interface LinkTiktokProps {
  url: string;
  handleDelete: () => void;
}

export default function LinkTiktok({ url, handleDelete }: LinkTiktokProps) {
  const [loading, setLoading] = useState(false);
  return (
    <HStack
      borderRadius={6}
      overflow={"hidden"}
      border={"1px solid"}
      borderColor={"green.600"}
      justifyContent={"space-between"}
      w={"full"}
      minH={"40px"}
    >
      <Text
        px={3}
        overflow={"hidden"}
        textOverflow={"ellipsis"}
        whiteSpace={"nowrap"}
      >
        {url}
      </Text>
      <IconButton
        loading={loading}
        bg={"red.200"}
        color={"red.600"}
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
    </HStack>
  );
}
