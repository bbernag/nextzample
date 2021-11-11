import React from "react";
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import Image from "next/image";
import Head from "next/head";

const api = new WooCommerceRestApi({
  url: "http://www.ennovicosmetics.com/",
  consumerKey: "ck_f24e64c1abea55ecac1b233262ae594c72d9a1c6",
  consumerSecret: "cs_096baed0712fa62f82caba4aec02995e256be170",
  version: "wc/v3",
});

function User({ product }) {
  console.log(`product`, product);
  if (!product) {
    return <div>Loading product...</div>;
  }
  const image = Array.isArray(product.images) ? product.images[0] : "";
  return (
    <>
      <Head>
        <title>{product.name}</title>
        <meta property="og:title" content={product.name} key="title" />
        <meta name="description" content={product.short_description}></meta>
      </Head>
      <div>
        <h1>{product.name}</h1>
        <h2>{product.regular_price}</h2>
        <Image src={image.src} alt={image.name} width={100} height={100} />
      </div>
    </>
  );
}

export async function getStaticProps({ params, preview = false, previewData }) {
  const id = params.id;

  const product = await api
    .get(`products/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return null;
    });

  if (product) {
    return {
      props: {
        product,
      },
    };
  }

  return {
    props: {
      product: {},
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

User.propTypes = {};

export default User;
