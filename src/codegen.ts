import type { CodegenConfig } from "@graphql-codegen/cli";

export default ({
	schema: "http://127.0.0.1:54321/graphql/v1",
	documents: ["src/**/*.tsx"],
	generates: {
		"./graphql/": {
			preset: "client",
			documents: ["./**/*.tsx"],
			config: {
				useTypeImports: true,
			},
			presetConfig: {
				gqlTagName: "gql",
			},
		},
		"./graphql/schema.graphql": {
			plugins: ["schema-ast"],
		},
	},
	hooks: {
		afterAllFileWrite: ["bun run format"],
	},
} as CodegenConfig);
