import { GraphQLClient } from 'graphql-request';

const endpoint = process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT || '';
const token = process.env.HYGRAPH_QUERY_TOKEN || '';

export const hygraph = new GraphQLClient(endpoint, {
  headers: {
    authorization: `Bearer ${token}`,
  },
});

export const GET_ALL_PRODUCTS = `
  query GetAllProducts {
    products(first: 1000) {
      id
      name
      slug
      category
      subcategory
      price
      description
      shortDescription
      images {
        url
      }
      materials
      colors
      inStock
      featured
      customizable
      leadTime
      tags
      dimensions
    }
  }
`;

export const GET_PRODUCT_BY_SLUG = `
  query GetProductBySlug($slug: String!) {
    products(where: { slug: $slug }, first: 1) {
      id
      name
      slug
      category
      subcategory
      price
      description
      shortDescription
      images {
        url
      }
      materials
      colors
      inStock
      featured
      customizable
      leadTime
      tags
      dimensions
    }
  }
`;

export const GET_FEATURED_PRODUCTS = `
  query GetFeaturedProducts {
    products(where: { featured: true }, first: 10) {
      id
      name
      slug
      category
      subcategory
      price
      description
      shortDescription
      images {
        url
      }
      materials
      colors
      inStock
      featured
      customizable
      leadTime
      tags
      dimensions
    }
  }
`;
export const GET_GALLERY_ITEMS = `
  query GetGalleryItems {
    galleryItems(first: 100) {
      id
      title
      description
      category
      image {
        url
      }
    }
  }
`;
