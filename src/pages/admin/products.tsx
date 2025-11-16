import AdminLayout from "@/components/layouts/AdminLayout";
import CreateProductForm from "@/sections/CreateProductForm";
import {
    Center
} from "@chakra-ui/react";
import { NextPageWithLayout } from "../_app";

const Products: NextPageWithLayout = () => {
  return (
    <Center h={"95vh"} px={2}>
      <CreateProductForm />
    </Center>
  );
};

Products.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;

export default Products;
