import FlashSale from "@/components/FlashSale";
import Input from "@/components/form/Input";
import ProductCard from "@/components/ProductCard";
import clientPromise from "@/lib/mongodb";
import { updateAccess } from "@/requests/accesses";
import { deleteProduct, getProducts } from "@/requests/products";
import { revalidateHome } from "@/requests/revalidate";
import {
  Box,
  Center,
  Grid,
  Image,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { GoSearch } from "react-icons/go";
import { toast } from "react-toastify";

export default function index({ initialProducts }: { initialProducts: any }) {
  const [isDelete, setIsDelete] = useState(false);
  const [deleteIds, setDeleteIds] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const queryClient = useQueryClient();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: searchQuery ? ["products", searchQuery] : ["products"],
      queryFn: ({ pageParam = 1, queryKey }) => {
        const [_key, search] = queryKey; // lấy searchQuery từ queryKey
        return getProducts({ pageParam, search }); // truyền vào API
      },
      getNextPageParam: (lastPage) => {
        if (lastPage.page < lastPage.totalPages) {
          return lastPage.page + 1;
        }
        return undefined; // hết page
      },
      initialPageParam: 1,
      placeholderData: { pages: [initialProducts], pageParams: [1] },
    });
  const revalidateHomeMutation = useMutation({
    mutationFn: revalidateHome,
  });

  const deleteProductMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      toast.success("Xoá sản phẩm thành công");
      queryClient.invalidateQueries({ queryKey: ["products"],  });
      revalidateHomeMutation.mutate();
    },
  });

  const updateAccessMutation = useMutation({
    mutationFn: updateAccess
  });

  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1 } // Khi toàn bộ element hiển thị
    );

    const current = loadMoreRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  useEffect(() => {
    if (localStorage.getItem("isLogin")) {
      setIsDelete(true);
    } else if(!localStorage.getItem("counted")) {
       updateAccessMutation.mutate()
       localStorage.setItem("counted", '1')
    }
  }, []);

  useEffect(() => {
    const searchTimeout = setTimeout(() => {
      setSearchQuery(search);
    }, 300);
    return () => {
      clearTimeout(searchTimeout);
    };
  }, [search]);

  return (
    <VStack mb={5} spaceY={10} py={5} pb={0} pt={[10, 20]} px={[2, 5]}>
      <Stack
        shadow={"sm"}
        bg={"white"}
        zIndex={4}
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
            value: search,
            onChange: (e) => {
              setSearch(e.target.value || "");
            },
            placeholder: "Nhập tên hoặc mã sản phẩm ...",
          }}
        />
      </Stack>
      <Box width={"full"}>
        <FlashSale mb={5} display={["flex", "none"]} />
        {status == "success" &&
        (!data?.pages ||
          data?.pages.flatMap((item) => item?.data).length == 0) ? (
          <Center h={"50vh"}>
            <VStack w={"full"}>
              <Image w={"full"} maxW={450} src={"/not-found.png"} />
              <Text
                color={"gray.500"}
                fontWeight={[600, 700]}
                fontSize={["md", "lg"]}
              >
                Không tồn tại sản phẩm!
              </Text>
            </VStack>
          </Center>
        ) : (
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
            {data?.pages
              .flatMap((item) => item.data)
              .filter((item) => !deleteIds.includes(item._id))
              .map((item) => (
                <ProductCard
                  handleDelete={() => {
                    setDeleteIds((state) => [...state, item._id]);
                    deleteProductMutation.mutate(item._id);
                  }}
                  isDelete={isDelete}
                  data={item}
                  key={item._id}
                />
              ))}
          </Grid>
        )}

        <Box h={20} ref={loadMoreRef} />
      </Box>
    </VStack>
  );
}

export async function getStaticProps() {
  const client = await clientPromise;
  const db = client.db("myShop");

  const pageNum = 1;
  const limitNum = 12;
  const skip = (pageNum - 1) * limitNum;

  // Lấy tổng số products
  const total = await db.collection("products").countDocuments();

  // Lấy danh sách products với pagination
  const products = await db
    .collection("products")
    .find({ deleted: { $ne: true } })
    .sort({ _id: -1 })
    .skip(skip)
    .limit(limitNum)
    .toArray();

  // Convert _id thành string
  const serializedProducts = products.map((product) => ({
    ...product,
    _id: product._id.toString(),
  }));

  return {
    props: {
      initialProducts: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum),
        data: serializedProducts,
      },
    },
    revalidate: false,
  };
}
