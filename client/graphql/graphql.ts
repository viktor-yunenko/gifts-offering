/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
	[K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
	[SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
	[SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
	T extends { [key: string]: unknown },
	K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
	| T
	| {
			[P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
	  };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
	ID: { input: string; output: string };
	String: { input: string; output: string };
	Boolean: { input: boolean; output: boolean };
	Int: { input: number; output: number };
	Float: { input: number; output: number };
	/** Date with time (isoformat) */
	DateTime: { input: any; output: any };
};

export type Query = {
	__typename?: "Query";
	user_current?: Maybe<UserType>;
};

export type UserType = {
	__typename?: "UserType";
	date_joined: Scalars["DateTime"]["output"];
	email: Scalars["String"]["output"];
	first_name: Scalars["String"]["output"];
	id: Scalars["ID"]["output"];
	is_active: Scalars["Boolean"]["output"];
	is_staff: Scalars["Boolean"]["output"];
	is_superuser: Scalars["Boolean"]["output"];
	last_login?: Maybe<Scalars["DateTime"]["output"]>;
	last_name: Scalars["String"]["output"];
	password: Scalars["String"]["output"];
};

export type UserCurrentQueryVariables = Exact<{ [key: string]: never }>;

export type UserCurrentQuery = {
	__typename?: "Query";
	user_current?: {
		__typename?: "UserType";
		id: string;
		first_name: string;
	} | null;
};

export const UserCurrentDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "query",
			name: { kind: "Name", value: "UserCurrent" },
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "user_current" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{ kind: "Field", name: { kind: "Name", value: "id" } },
								{ kind: "Field", name: { kind: "Name", value: "first_name" } },
							],
						},
					},
				],
			},
		},
	],
} as unknown as DocumentNode<UserCurrentQuery, UserCurrentQueryVariables>;
