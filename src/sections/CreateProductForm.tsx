import Input from "@/components/form/Input";
import { createProduct } from "@/requests/products";
import { revalidateHome } from "@/requests/revalidate";
import { productResponse } from "@/types/product";
import { Box, Button, InputProps, Text, VStack } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { ReactNode } from "react";
import { useForm } from "react-hook-form";
import { FaRegImage } from "react-icons/fa";
import { IoMdLink } from "react-icons/io";
import { MdOutlineMail, MdOutlineTitle } from "react-icons/md";
import { RiPriceTag3Line } from "react-icons/ri";
import { toast } from "react-toastify";
import * as yup from "yup";

const schema = yup.object({
  imgUrl: yup.string().required("Không được để trống"),
  adsUrl: yup.string().required("Không được để trống"),
  title: yup.string().required("Không được để trống"),
  oldPrice: yup
    .number()
    .typeError("Giá cũ phải là số")
    .required("Không được để trống"),
  newPrice: yup
    .number()
    .typeError("Giá mới phải là số")
    .required("Không được để trống"),
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

export default function CreateProductForm() {
  const methods = useForm<productResponse>({
    resolver: yupResolver(schema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const revalidateHomeMutation = useMutation({
    mutationFn: revalidateHome,
  });

  const createProductMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      methods.setValue('adsUrl', '');
      methods.setValue('imgUrl', '');
      methods.setValue('newPrice', 0);
      methods.setValue('oldPrice', 0);
      methods.setValue('title', '');
      toast.success("Tạo mới sản phẩm thành công");
      revalidateHomeMutation.mutate()
    },
  });

  const onSubmit = (data: productResponse) => {
    createProductMutation.mutate(data);
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
          icon={<FaRegImage />}
          options={{
            ...register("imgUrl"),
          }}
          error={errors.imgUrl?.message}
        />
        <ElementForm
          icon={<IoMdLink />}
          options={{
            ...register("adsUrl"),
            placeholder: "Nhập link affiliate ...",
          }}
          error={errors.adsUrl?.message}
        />
        <ElementForm
          icon={<MdOutlineTitle />}
          options={{
            ...register("title"),
            placeholder: "Nhập tên sản phẩm ...",
          }}
          error={errors.title?.message}
        />
        <ElementForm
          icon={<RiPriceTag3Line />}
          options={{
            ...register("oldPrice"),
            placeholder: "Nhập giá cũ ...",
            type: "number",
          }}
          error={errors.oldPrice?.message}
        />
        <ElementForm
          icon={<RiPriceTag3Line />}
          options={{
            ...register("newPrice"),
            placeholder: "Nhập giá mới ...",
            type: "number",
          }}
          error={errors.newPrice?.message}
        />
        <Button
          borderRadius={8}
          mt={"10px !important"}
          w={"full"}
          type="submit"
          loading={createProductMutation.isPending}
        >
          Tạo sản phẩm{" "}
        </Button>
      </VStack>
    </form>
  );
}
