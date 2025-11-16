import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html suppressHydrationWarning lang="vi">
      <Head>
        <link rel="icon" href="/logo.ico" />
        <title>Siêu sale sản phẩm chất lượng – Giá rẻ, Deal hôm nay!</title>
        <meta
          name="description"
          content="Mua các sản phẩm chất lượng với giá rẻ nhất hôm nay. Đồng hồ, giày, túi xách và nhiều sản phẩm khác, ưu đãi cực hot, giao hàng nhanh."
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
