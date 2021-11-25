import { gql } from "@apollo/client";

export const BUSINESS_FRAGMENT = gql`
    fragment businessFragment on Business {
        id
        name
        rating
        photos
        phone
        display_phone
        is_closed
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
            zip_code
        }
        review_count
    }
`;
