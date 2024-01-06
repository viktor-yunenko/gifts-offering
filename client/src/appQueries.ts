import { USER_QUERY } from "~/composables/useAuth";
import { GIFT_ORDERS_PENDING } from "~/composables/useOrders";
import { gql } from "#graphql";

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
			images {
				id
				order
				image {
					url
					path
				}
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
