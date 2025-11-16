import LoginForm from "@/sections/LoginForm";
import { Box, Center } from "@chakra-ui/react";
import { ReactNode, useEffect, useState } from "react";
import { HashLoader } from "react-spinners";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [isLogin, setLisLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("isLogin")) {
      setIsLoading(false);
      setLisLogin(true);
    } else {
      setIsLoading(false);
    }
  }, []);

  if (isLoading)
    return (
      <Center px={3} w={"full"} h={"90vh"}>
        <Box>
          <HashLoader
            color={"green"}
            style={{
              opacity: 0.5,
            }}
            loading={true}
            size={50}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </Box>
      </Center>
    );

  if (!isLogin) {
    return (
      <Center px={3} w={"full"} h={"95vh"}>
        <LoginForm
          handleSuccess={() => {
            setLisLogin(true);
            localStorage.setItem("isLogin", "1");
          }}
        />
      </Center>
    );
  }
  return <>{children}</>;
}
