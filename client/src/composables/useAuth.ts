import { useQuery } from "@vue/apollo-composable";
import { gql } from "#graphql";

export function useAuth() {
	const { result, error, loading } = useQuery(USER_QUERY);
	return {
		user: () => result?.value?.user_current,
		error,
		loading,
	};
}

const USER_QUERY = gql(`
	query UserCurrent {
		user_current {
			id
			first_name
			points
		}
	}
`);
