import { gql } from "@apollo/client";

export const wearsPathsQuery = gql`
  query WearsPaths {
    wears {
      slug
    }
  }
`;

export const GET_SLUG = gql`
  query WearsBySlug($slug: String!) {
    product(slug: $slug) {
      title
      image
      price
      description
      category
      subCategory
    }
  }
`;




export const GET_WEARS = gql`
  query wearByCategory($category: String!) {
    wearByCategory(category: $category) {
      title
      image
      price
      description
      category
      subCategory
      slug
    }
  }
`;

export const GET_WEARS_BY_CATEGORY_AND_SUBCATEGORY = gql`
  query wearByCategoryAndSubCategory(
    $category: String!
    $subCategory: String!
  ) {
    wearByCategoryAndSubCategory(
      category: $category
      subCategory: $subCategory
    ) {
      title
      image
      price
      description
      category
      subCategory
      slug
    }
  }
`;
