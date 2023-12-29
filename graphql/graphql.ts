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
	/** A high precision floating point value represented as a string */
	BigFloat: { input: any; output: any };
	/** An arbitrary size integer represented as a string */
	BigInt: { input: any; output: any };
	/** An opaque string using for tracking a position in results during pagination */
	Cursor: { input: any; output: any };
	/** A date wihout time information */
	Date: { input: any; output: any };
	/** A date and time */
	Datetime: { input: any; output: any };
	/** A Javascript Object Notation value serialized as a string */
	JSON: { input: any; output: any };
	/** Any type not handled by the type system */
	Opaque: { input: any; output: any };
	/** A time without date information */
	Time: { input: any; output: any };
	/** A universally unique identifier */
	UUID: { input: any; output: any };
};

/** Boolean expression comparing fields on type "BigFloat" */
export type BigFloatFilter = {
	eq?: InputMaybe<Scalars["BigFloat"]["input"]>;
	gt?: InputMaybe<Scalars["BigFloat"]["input"]>;
	gte?: InputMaybe<Scalars["BigFloat"]["input"]>;
	in?: InputMaybe<Array<Scalars["BigFloat"]["input"]>>;
	is?: InputMaybe<FilterIs>;
	lt?: InputMaybe<Scalars["BigFloat"]["input"]>;
	lte?: InputMaybe<Scalars["BigFloat"]["input"]>;
	neq?: InputMaybe<Scalars["BigFloat"]["input"]>;
};

/** Boolean expression comparing fields on type "BigInt" */
export type BigIntFilter = {
	eq?: InputMaybe<Scalars["BigInt"]["input"]>;
	gt?: InputMaybe<Scalars["BigInt"]["input"]>;
	gte?: InputMaybe<Scalars["BigInt"]["input"]>;
	in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
	is?: InputMaybe<FilterIs>;
	lt?: InputMaybe<Scalars["BigInt"]["input"]>;
	lte?: InputMaybe<Scalars["BigInt"]["input"]>;
	neq?: InputMaybe<Scalars["BigInt"]["input"]>;
};

/** Boolean expression comparing fields on type "Boolean" */
export type BooleanFilter = {
	eq?: InputMaybe<Scalars["Boolean"]["input"]>;
	is?: InputMaybe<FilterIs>;
};

/** Boolean expression comparing fields on type "Date" */
export type DateFilter = {
	eq?: InputMaybe<Scalars["Date"]["input"]>;
	gt?: InputMaybe<Scalars["Date"]["input"]>;
	gte?: InputMaybe<Scalars["Date"]["input"]>;
	in?: InputMaybe<Array<Scalars["Date"]["input"]>>;
	is?: InputMaybe<FilterIs>;
	lt?: InputMaybe<Scalars["Date"]["input"]>;
	lte?: InputMaybe<Scalars["Date"]["input"]>;
	neq?: InputMaybe<Scalars["Date"]["input"]>;
};

/** Boolean expression comparing fields on type "Datetime" */
export type DatetimeFilter = {
	eq?: InputMaybe<Scalars["Datetime"]["input"]>;
	gt?: InputMaybe<Scalars["Datetime"]["input"]>;
	gte?: InputMaybe<Scalars["Datetime"]["input"]>;
	in?: InputMaybe<Array<Scalars["Datetime"]["input"]>>;
	is?: InputMaybe<FilterIs>;
	lt?: InputMaybe<Scalars["Datetime"]["input"]>;
	lte?: InputMaybe<Scalars["Datetime"]["input"]>;
	neq?: InputMaybe<Scalars["Datetime"]["input"]>;
};

export enum FilterIs {
	NotNull = "NOT_NULL",
	Null = "NULL",
}

/** Boolean expression comparing fields on type "Float" */
export type FloatFilter = {
	eq?: InputMaybe<Scalars["Float"]["input"]>;
	gt?: InputMaybe<Scalars["Float"]["input"]>;
	gte?: InputMaybe<Scalars["Float"]["input"]>;
	in?: InputMaybe<Array<Scalars["Float"]["input"]>>;
	is?: InputMaybe<FilterIs>;
	lt?: InputMaybe<Scalars["Float"]["input"]>;
	lte?: InputMaybe<Scalars["Float"]["input"]>;
	neq?: InputMaybe<Scalars["Float"]["input"]>;
};

/** Boolean expression comparing fields on type "ID" */
export type IdFilter = {
	eq?: InputMaybe<Scalars["ID"]["input"]>;
};

/** Boolean expression comparing fields on type "Int" */
export type IntFilter = {
	eq?: InputMaybe<Scalars["Int"]["input"]>;
	gt?: InputMaybe<Scalars["Int"]["input"]>;
	gte?: InputMaybe<Scalars["Int"]["input"]>;
	in?: InputMaybe<Array<Scalars["Int"]["input"]>>;
	is?: InputMaybe<FilterIs>;
	lt?: InputMaybe<Scalars["Int"]["input"]>;
	lte?: InputMaybe<Scalars["Int"]["input"]>;
	neq?: InputMaybe<Scalars["Int"]["input"]>;
};

/** The root type for creating and mutating data */
export type Mutation = {
	__typename?: "Mutation";
	/** Deletes zero or more records from the `profiles` collection */
	deleteFromprofilesCollection: ProfilesDeleteResponse;
	/** Adds one or more `profiles` records to the collection */
	insertIntoprofilesCollection?: Maybe<ProfilesInsertResponse>;
	/** Updates zero or more records in the `profiles` collection */
	updateprofilesCollection: ProfilesUpdateResponse;
};

/** The root type for creating and mutating data */
export type MutationDeleteFromprofilesCollectionArgs = {
	atMost?: Scalars["Int"]["input"];
	filter?: InputMaybe<ProfilesFilter>;
};

/** The root type for creating and mutating data */
export type MutationInsertIntoprofilesCollectionArgs = {
	objects: Array<ProfilesInsertInput>;
};

/** The root type for creating and mutating data */
export type MutationUpdateprofilesCollectionArgs = {
	atMost?: Scalars["Int"]["input"];
	filter?: InputMaybe<ProfilesFilter>;
	set: ProfilesUpdateInput;
};

export type Node = {
	/** Retrieves a record by `ID` */
	nodeId: Scalars["ID"]["output"];
};

/** Boolean expression comparing fields on type "Opaque" */
export type OpaqueFilter = {
	eq?: InputMaybe<Scalars["Opaque"]["input"]>;
	is?: InputMaybe<FilterIs>;
};

/** Defines a per-field sorting order */
export enum OrderByDirection {
	/** Ascending order, nulls first */
	AscNullsFirst = "AscNullsFirst",
	/** Ascending order, nulls last */
	AscNullsLast = "AscNullsLast",
	/** Descending order, nulls first */
	DescNullsFirst = "DescNullsFirst",
	/** Descending order, nulls last */
	DescNullsLast = "DescNullsLast",
}

export type PageInfo = {
	__typename?: "PageInfo";
	endCursor?: Maybe<Scalars["String"]["output"]>;
	hasNextPage: Scalars["Boolean"]["output"];
	hasPreviousPage: Scalars["Boolean"]["output"];
	startCursor?: Maybe<Scalars["String"]["output"]>;
};

/** The root type for querying data */
export type Query = {
	__typename?: "Query";
	/** Retrieve a record by its `ID` */
	node?: Maybe<Node>;
	/** A pagable collection of type `profiles` */
	profilesCollection?: Maybe<ProfilesConnection>;
};

/** The root type for querying data */
export type QueryNodeArgs = {
	nodeId: Scalars["ID"]["input"];
};

/** The root type for querying data */
export type QueryProfilesCollectionArgs = {
	after?: InputMaybe<Scalars["Cursor"]["input"]>;
	before?: InputMaybe<Scalars["Cursor"]["input"]>;
	filter?: InputMaybe<ProfilesFilter>;
	first?: InputMaybe<Scalars["Int"]["input"]>;
	last?: InputMaybe<Scalars["Int"]["input"]>;
	orderBy?: InputMaybe<Array<ProfilesOrderBy>>;
};

/** Boolean expression comparing fields on type "String" */
export type StringFilter = {
	eq?: InputMaybe<Scalars["String"]["input"]>;
	gt?: InputMaybe<Scalars["String"]["input"]>;
	gte?: InputMaybe<Scalars["String"]["input"]>;
	ilike?: InputMaybe<Scalars["String"]["input"]>;
	in?: InputMaybe<Array<Scalars["String"]["input"]>>;
	iregex?: InputMaybe<Scalars["String"]["input"]>;
	is?: InputMaybe<FilterIs>;
	like?: InputMaybe<Scalars["String"]["input"]>;
	lt?: InputMaybe<Scalars["String"]["input"]>;
	lte?: InputMaybe<Scalars["String"]["input"]>;
	neq?: InputMaybe<Scalars["String"]["input"]>;
	regex?: InputMaybe<Scalars["String"]["input"]>;
	startsWith?: InputMaybe<Scalars["String"]["input"]>;
};

/** Boolean expression comparing fields on type "Time" */
export type TimeFilter = {
	eq?: InputMaybe<Scalars["Time"]["input"]>;
	gt?: InputMaybe<Scalars["Time"]["input"]>;
	gte?: InputMaybe<Scalars["Time"]["input"]>;
	in?: InputMaybe<Array<Scalars["Time"]["input"]>>;
	is?: InputMaybe<FilterIs>;
	lt?: InputMaybe<Scalars["Time"]["input"]>;
	lte?: InputMaybe<Scalars["Time"]["input"]>;
	neq?: InputMaybe<Scalars["Time"]["input"]>;
};

/** Boolean expression comparing fields on type "UUID" */
export type UuidFilter = {
	eq?: InputMaybe<Scalars["UUID"]["input"]>;
	in?: InputMaybe<Array<Scalars["UUID"]["input"]>>;
	is?: InputMaybe<FilterIs>;
	neq?: InputMaybe<Scalars["UUID"]["input"]>;
};

export type Profiles = Node & {
	__typename?: "profiles";
	created_at: Scalars["Datetime"]["output"];
	id: Scalars["BigInt"]["output"];
	/** Globally Unique Record Identifier */
	nodeId: Scalars["ID"]["output"];
	points: Scalars["BigInt"]["output"];
	user_id: Scalars["UUID"]["output"];
};

export type ProfilesConnection = {
	__typename?: "profilesConnection";
	edges: Array<ProfilesEdge>;
	pageInfo: PageInfo;
};

export type ProfilesDeleteResponse = {
	__typename?: "profilesDeleteResponse";
	/** Count of the records impacted by the mutation */
	affectedCount: Scalars["Int"]["output"];
	/** Array of records impacted by the mutation */
	records: Array<Profiles>;
};

export type ProfilesEdge = {
	__typename?: "profilesEdge";
	cursor: Scalars["String"]["output"];
	node: Profiles;
};

export type ProfilesFilter = {
	/** Returns true only if all its inner filters are true, otherwise returns false */
	and?: InputMaybe<Array<ProfilesFilter>>;
	created_at?: InputMaybe<DatetimeFilter>;
	id?: InputMaybe<BigIntFilter>;
	nodeId?: InputMaybe<IdFilter>;
	/** Negates a filter */
	not?: InputMaybe<ProfilesFilter>;
	/** Returns true if at least one of its inner filters is true, otherwise returns false */
	or?: InputMaybe<Array<ProfilesFilter>>;
	points?: InputMaybe<BigIntFilter>;
	user_id?: InputMaybe<UuidFilter>;
};

export type ProfilesInsertInput = {
	created_at?: InputMaybe<Scalars["Datetime"]["input"]>;
	points?: InputMaybe<Scalars["BigInt"]["input"]>;
	user_id?: InputMaybe<Scalars["UUID"]["input"]>;
};

export type ProfilesInsertResponse = {
	__typename?: "profilesInsertResponse";
	/** Count of the records impacted by the mutation */
	affectedCount: Scalars["Int"]["output"];
	/** Array of records impacted by the mutation */
	records: Array<Profiles>;
};

export type ProfilesOrderBy = {
	created_at?: InputMaybe<OrderByDirection>;
	id?: InputMaybe<OrderByDirection>;
	points?: InputMaybe<OrderByDirection>;
	user_id?: InputMaybe<OrderByDirection>;
};

export type ProfilesUpdateInput = {
	created_at?: InputMaybe<Scalars["Datetime"]["input"]>;
	points?: InputMaybe<Scalars["BigInt"]["input"]>;
	user_id?: InputMaybe<Scalars["UUID"]["input"]>;
};

export type ProfilesUpdateResponse = {
	__typename?: "profilesUpdateResponse";
	/** Count of the records impacted by the mutation */
	affectedCount: Scalars["Int"]["output"];
	/** Array of records impacted by the mutation */
	records: Array<Profiles>;
};

export type ProfileQueryVariables = Exact<{
	userId: Scalars["UUID"]["input"];
}>;

export type ProfileQuery = {
	__typename?: "Query";
	profilesCollection?: {
		__typename?: "profilesConnection";
		edges: Array<{
			__typename?: "profilesEdge";
			node: { __typename?: "profiles"; id: any; user_id: any; points: any };
		}>;
	} | null;
};

export const ProfileDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "query",
			name: { kind: "Name", value: "Profile" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: {
						kind: "Variable",
						name: { kind: "Name", value: "userId" },
					},
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } },
					},
				},
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "profilesCollection" },
						arguments: [
							{
								kind: "Argument",
								name: { kind: "Name", value: "filter" },
								value: {
									kind: "ObjectValue",
									fields: [
										{
											kind: "ObjectField",
											name: { kind: "Name", value: "user_id" },
											value: {
												kind: "ObjectValue",
												fields: [
													{
														kind: "ObjectField",
														name: { kind: "Name", value: "eq" },
														value: {
															kind: "Variable",
															name: { kind: "Name", value: "userId" },
														},
													},
												],
											},
										},
									],
								},
							},
						],
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "edges" },
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{
												kind: "Field",
												name: { kind: "Name", value: "node" },
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{
															kind: "Field",
															name: { kind: "Name", value: "id" },
														},
														{
															kind: "Field",
															name: { kind: "Name", value: "user_id" },
														},
														{
															kind: "Field",
															name: { kind: "Name", value: "points" },
														},
													],
												},
											},
										],
									},
								},
							],
						},
					},
				],
			},
		},
	],
} as unknown as DocumentNode<ProfileQuery, ProfileQueryVariables>;
