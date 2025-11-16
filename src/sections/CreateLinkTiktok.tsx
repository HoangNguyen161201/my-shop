import Input from "@/components/form/Input";
import { createTiktokUrl } from "@/requests/tiktok";
import { Box, Button, InputProps, Text, VStack } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { ReactNode } from "react";
import { useForm } from "react-hook-form";
import { IoMdLink } from "react-icons/io";
import { MdOutlineMail } from "react-icons/md";
import { toast } from "react-toastify";
import * as yup from "yup";

const schema = yup.object({
  url: yup.string().required("Không được để trống"),
});

const ElementForm = ({
  options,
  error,
  icon,
}: {
  icon?: ReactNode;
  options?: InputProps;
  error?: string;
}) => (
  <VStack alignItems={"start"} w={"full"}>
    <Input
      startElement={<Box pl={3.5}>{icon || <MdOutlineMail />}</Box>}
      outline={"none"}
      borderRadius={100}
      inputProps={{
        bg: "gray.100",
        border: "none",
        borderRadius: 50,
        pr: 4,
        placeholder: "Nhập url hình ảnh ...",
        ...options,
      }}
    />

    <Text fontSize={"sm"} color={"red.600"}>
      {error}
    </Text>
  </VStack>
);

export default function CreateTiktokUrlForm({
  handleSuccess,
}: {
  handleSuccess: () => void;
}) {
  const methods = useForm<{
    url: string;
  }>({
    resolver: yupResolver(schema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const createLinkTiktokMutation = useMutation({
    mutationFn: createTiktokUrl,
    onSuccess: () => {
      methods.setValue('url', '');
      toast.success("Tạo mới sản phẩm thành công");
      handleSuccess()
    },
  });

  const onSubmit = (data: { url: string }) => {
    createLinkTiktokMutation.mutate(data);
  };

  return (
    <form
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <VStack alignItems={"start"} spaceY={0.5} w={"full"} maxW={["full", 320]}>
        <ElementForm
          icon={<IoMdLink />}
          options={{
            ...register("url"),
            placeholder: "Nhập link video tiktok ...",
          }}
          error={errors.url?.message}
        />

        <Button
          borderRadius={8}
          mt={"10px !important"}
          w={"full"}
          type="submit"
          loading={createLinkTiktokMutation.isPending}
        >
          Tạo link tiktok{" "}
        </Button>
      </VStack>
    </form>
  );
}
