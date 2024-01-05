import { gql } from "#graphql";
import { USER_QUERY } from "~/composables/useAuth";
import { GIFT_ORDERS_PENDING } from "~/composables/useOrders";

export const appQueries = () => [
	{ query: GIFTS_QUERY },
	{ query: USER_QUERY },
	{ query: GIFT_ORDERS_PENDING },
];

export const GIFTS_QUERY = gql(`
	query Gifts {
		gifts {
			id
			name
			image_card {
				path
				url
			}
			description_short
			points
			fit_confidence
			order {
				id
				status
				amount
			}
		}
	}
`);
