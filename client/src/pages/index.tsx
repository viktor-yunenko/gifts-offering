import { CBox, CVStack } from "@chakra-ui/vue-next";
import { useQuery } from "@vue/apollo-composable";
import { defineComponent } from "vue";
import { gql } from "#graphql";

export default defineComponent({
	setup() {
		const { result, error, loading } = useQuery(USER_QUERY);
		return () => (
			<CVStack>
				{loading.value && <CBox>loading...</CBox>}
				{result.value && <CBox>result: {result.value?.user_current?.id}</CBox>}
				{error.value && <CBox>error: {error.value}</CBox>}
			</CVStack>
		);
	},
});

const USER_QUERY = gql(`
	query UserCurrent {
		user_current {
			id
			first_name
		}
	}
`);
