const domain = process.env.SHOPIFY_STORE_DOMAIN;
const accessToken = process.env.SHOPIFY_STOREFRONT_ACCESSTOKEN;

async function ShopifyData(query) {
    const URL = `https://${domain}/api/2022-01/graphql.json`;


    const options = {
        endpoint: URL,
        method: "POST",
        headers: {
            "X-Shopify-Storefront-Access-Token": accessToken,
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ query })
    }

    try {
        const data = await fetch(URL, options).then(response => {
            return response.json()
        })

        return data
    } catch (error) {
        throw new Error("Products not fetched")
    }
}
export async function getAllProducts() {
    const query=`
    {
      products(first:6){
        edges{
          node{
            handle
            id
            title
            description
            featuredImage{
              url
            }
            images(first:3){
              edges{
                node{
                  url
                  altText
                }
              }
            }
            onlineStoreUrl
            priceRange{
              maxVariantPrice{
                amount
              }
              minVariantPrice{
                amount
              }
            }
           compareAtPriceRange{
            maxVariantPrice{
              amount
            }
            minVariantPrice{
              amount
            }
          }
          }
        }
      }
    }
      `

    const response = await ShopifyData(query)

    const allProducts = response.data.products.edges ? response.data.products.edges : []
  
    return allProducts
}

export async function getProduct(handle) {
  const query=`
  {
    product(handle: "${handle}") {
      id
      title
      handle
      description
      featuredImage {
        url
      }
      images(first: 5) {
        edges {
          node {
            altText
            url
          }
        }
      }
      options {
        id
        name
        values
      }
      variants(first: 20) {
        edges {
          node {
            title
            id
            priceV2 {
              amount
            }
            image {
              altText
              url
            }
            selectedOptions {
              name
              value
            }
          }
        }
      }
    }
  }
  `
  const response = await ShopifyData(query)

  const SingleProduct = response.data.product ? response.data.product : []

  return SingleProduct
}