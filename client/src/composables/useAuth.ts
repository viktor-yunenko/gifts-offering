import { useQuery } from "@vue/apollo-composable";
import { gql } from "#graphql";

export function useAuth() {
	const { result, error, loading, onResult } = useQuery(USER_QUERY);
	return {
		// todo export as computed() instead of function
		user: () => result?.value?.user_current,
		error,
		loading,
		onResult,
	};
}

export const USER_QUERY = gql(`
	query UserCurrent {
		user_current {
			id
			first_name
			points
		}
	}
`);
