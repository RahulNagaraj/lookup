import { gql } from "@apollo/client";

const BUSINESS_FRAGMENT = gql`
    fragment businessFragment on Business {
        id
        name
        rating
        photos
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
            alias
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
        messaging {
            url
            use_case_text
        }
    }
`;

const GET_SERVICES = gql`
    query services {
        services: getServices {
            alias
            title
        }
    }
`;

const GET_BUSINESS_DEALS = gql`
    ${BUSINESS_FRAGMENT}
    query businessDeals {
        deals: getBusinessDeals {
            ...businessFragment
        }
    }
`;

const GET_ALL_BUSINESSES = gql`
    ${BUSINESS_FRAGMENT}
    query businesses {
        businesses: getAllBusiness {
            ...businessFragment
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
    query search_service(
        $term: String!
        $location: String!
        $categories: String
        $limit: Int
    ) {
        search(
            term: $term
            location: $location
            categories: $categories
            limit: $limit
        ) {
            business {
                ...businessFragment
            }
        }
    }
`;

export default {
    GET_ALL,
    SEARCH_SERVICE,
    GET_SERVICES,
    GET_BUSINESS_DEALS,
    GET_ALL_BUSINESSES,
};
