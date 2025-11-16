import AdminLayout from "@/components/layouts/AdminLayout";
import LinkTiktok from "@/components/LinkTiktok";
import { deleteTiktokUrl, getTiktokUrls } from "@/requests/tiktok";
import CreateTiktokUrlForm from "@/sections/CreateLinkTiktok";
import { Center, Image, Text, VStack } from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";
import { NextPageWithLayout } from "../_app";

const VideoTiktoks: NextPageWithLayout = () => {
  const [deleteIds, setDeleteIds] = useState<string[]>([]);

  const { data, refetch, status } = useQuery<{
    total: number;
    data: {
      url: string;
      _id: string;
    }[];
  }>({
    queryKey: ["tiktoks"],
    queryFn: getTiktokUrls,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTiktokUrl,

  });

  return (
    <Center px={2} h={"95vh"}>
      <VStack spaceY={5} w={"full"} maxW={320}>
        <CreateTiktokUrlForm handleSuccess={refetch} />
        <VStack
          w={"full"}
          borderRadius={6}
          border={"2px dashed"}
          borderColor={"green.300"}
          overflow={"auto"}
          px={1}
          py={1}
          maxH={300}
          h={"100vh"}
        >
          {
            data?.data.filter(item => !deleteIds.includes(item._id)).length == 0 && status == 'success' &&
            <Center flexDir={'column'} h={'full'}>
              <Image src={'/not-found.png'}/>
              <Text fontWeight={[600, 700]} fontSize={['sm', 'md']} color={'gray.500'}>Chưa có link tiktok</Text>
            </Center>
          }
          {data?.data.filter(item => !deleteIds.includes(item._id)).map((item) => (
            <LinkTiktok
              handleDelete={() => {
                deleteMutation.mutate(item._id);
                setDeleteIds((state) => [...state, item._id]);
                toast.success("Xoá link tiktok thành công");
              }}
              url={item.url}
              key={item._id}
            />
          ))}
        </VStack>
      </VStack>
    </Center>
  );
};

VideoTiktoks.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;

export default VideoTiktoks;
