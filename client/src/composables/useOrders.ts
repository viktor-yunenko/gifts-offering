import { useQuery } from "@vue/apollo-composable";
import { gql } from "#graphql";

export function useOrders() {
	const { result, error, loading, onResult } = useQuery(GIFT_ORDERS_PENDING);
	return {
		ordersPendingCount: (): number => result?.value?.gift_orders?.length ?? 0,
		error,
		loading,
		onResult,
	};
}

export const GIFT_ORDERS_PENDING = gql(`
	query GiftOrdersPending {
		gift_orders(filters: { status: PENDING }) {
			id
		}
	}
`);
