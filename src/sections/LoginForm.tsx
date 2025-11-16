import Input from "@/components/form/Input";
import { checkEmail } from "@/requests/check-email";
import { Box, Button, HStack, Text, VStack } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { MdOutlineMail } from "react-icons/md";
import * as yup from "yup";

interface LoginFormType {
  email: string;
}

const schema = yup.object({
  email: yup
    .string()
    .required("Không được để trống")
    .email("Email không hợp lệ"),
});

interface LoginFormProps {
  handleSuccess: () => void;
}

export default function LoginForm({ handleSuccess }: LoginFormProps) {
  const methods = useForm<LoginFormType>({
    defaultValues: {
      email: "",
    },
    resolver: yupResolver(schema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = methods;

  const mutation = useMutation({
    mutationFn: checkEmail,
    onSuccess: () => {
      handleSuccess();
    },
    onError: (data) => {
      setError("email", {
        type: "required",
        message: data.message,
      });
    },
  });

  const onSubmit = (data: LoginFormType) => {
    mutation.mutate(data.email);
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
        <HStack w={"full"}>
          <Input
            startElement={
              <Box pl={3.5}>
                <MdOutlineMail />
              </Box>
            }
            outline={"none"}
            borderRadius={100}
            inputProps={{
              bg: "gray.100",
              border: "none",
              borderRadius: 50,
              pr: 4,
              placeholder: "Nhập email ...",
              ...register("email"),
            }}
          />
          <Button
            loading={mutation.isPending}
            type="submit"
            bg={"blue.200"}
            color={"blue.600"}
            px={2}
          >
            Nhập
          </Button>
        </HStack>
        <Text fontSize={"sm"} color={"red.600"}>
          {errors.email?.message}
        </Text>
      </VStack>
    </form>
  );
}
