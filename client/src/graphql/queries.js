import { gql } from "@apollo/client";

export const GET_ALL = gql`
    query getAll {
        categories {
            category {
                title
                alias
                parent_categories {
                    title
                }
            }
        }
        trending: search(
            term: "Home Services"
            location: "san fransicso"
            attributes: ["hot_and_new"]
        ) {
            business {
                name
                price
                photos
                categories {
                    title
                    parent_categories {
                        title
                    }
                }
            }
        }
        deals: search(
            term: "Home Services"
            location: "san fransicso"
            attributes: ["deals"]
        ) {
            business {
                name
                price
                photos
                categories {
                    title
                    parent_categories {
                        title
                    }
                }
            }
        }
    }
`;

export const SEARCH_SERVICE = gql`
    query search_service($term: String!, $location: String!) {
        search(term: $term, location: $location) {
            business {
                name
                price
                rating
                photos
                categories {
                    title
                }
            }
        }
    }
`;
