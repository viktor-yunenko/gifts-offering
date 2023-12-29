import type { CodegenConfig } from "@graphql-codegen/cli";

export default ({
	schema: "graphql/schema.graphql",
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
