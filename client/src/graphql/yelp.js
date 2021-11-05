import { gql } from "@apollo/client";

const BUSINESS_FRAGMENT = gql`
    fragment businessFragment on Business {
        id
        name
        price
        rating
        photos
        distance
        price
        phone
        display_phone
        hours {
            is_open_now
            open {
                end
                start
                day
            }
        }
        categories {
            title
            parent_categories {
                title
            }
        }
        coordinates {
            latitude
            longitude
        }
        location {
            address1
            city
            state
            country
        }
        review_count
        reviews {
            text
            rating
            time_created
            user {
                name
                image_url
            }
        }
        messaging {
            url
            use_case_text
        }
    }
`;

const GET_ALL = gql`
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
                id
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
                id
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

const SEARCH_SERVICE = gql`
    ${BUSINESS_FRAGMENT}
    query search_service($term: String!, $location: String!) {
        search(term: $term, location: $location) {
            business {
                ...businessFragment
            }
        }
    }
`;

export default {
    GET_ALL,
    SEARCH_SERVICE,
};
