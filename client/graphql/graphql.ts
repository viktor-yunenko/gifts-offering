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
	/** Decimal (fixed-point) */
	Decimal: { input: any; output: any };
};

export type DjangoImageType = {
	__typename?: "DjangoImageType";
	height: Scalars["Int"]["output"];
	name: Scalars["String"]["output"];
	path: Scalars["String"]["output"];
	size: Scalars["Int"]["output"];
	url: Scalars["String"]["output"];
	width: Scalars["Int"]["output"];
};

export type DjangoModelType = {
	__typename?: "DjangoModelType";
	pk: Scalars["ID"]["output"];
};

export type GiftImageType = {
	__typename?: "GiftImageType";
	caption: Scalars["String"]["output"];
	created_at: Scalars["DateTime"]["output"];
	gift: GiftType;
	id: Scalars["ID"]["output"];
	image: DjangoImageType;
	order: Scalars["Int"]["output"];
	updated_at: Scalars["DateTime"]["output"];
};

export type GiftOrderFilter = {
	AND?: InputMaybe<GiftOrderFilter>;
	NOT?: InputMaybe<GiftOrderFilter>;
	OR?: InputMaybe<GiftOrderFilter>;
	status?: InputMaybe<OrderStatus>;
};

export type GiftOrderInput = {
	amount?: InputMaybe<Scalars["Int"]["input"]>;
	created_at?: InputMaybe<Scalars["DateTime"]["input"]>;
	gift?: InputMaybe<OneToOneInput>;
	id?: InputMaybe<Scalars["ID"]["input"]>;
	status?: InputMaybe<OrderStatus>;
	updated_at?: InputMaybe<Scalars["DateTime"]["input"]>;
	user: OneToManyInput;
};

export type GiftOrderType = {
	__typename?: "GiftOrderType";
	amount: Scalars["Int"]["output"];
	created_at: Scalars["DateTime"]["output"];
	gift: GiftType;
	id: Scalars["ID"]["output"];
	status: OrderStatus;
	updated_at: Scalars["DateTime"]["output"];
	user: UserType;
};

export type GiftType = {
	__typename?: "GiftType";
	created_at: Scalars["DateTime"]["output"];
	description_full: Scalars["String"]["output"];
	description_short: Scalars["String"]["output"];
	fit_confidence: Scalars["Decimal"]["output"];
	id: Scalars["ID"]["output"];
	images: Array<GiftImageType>;
	is_published: Scalars["Boolean"]["output"];
	name: Scalars["String"]["output"];
	order?: Maybe<GiftOrderType>;
	order_amount_default: Scalars["Int"]["output"];
	points: Scalars["Decimal"]["output"];
	updated_at: Scalars["DateTime"]["output"];
	user: DjangoModelType;
};

export type Mutation = {
	__typename?: "Mutation";
	gift_order_submit_or_withdraw: GiftOrderType;
	gift_order_update: GiftOrderType;
	gift_order_update_amount: GiftOrderType;
};

export type MutationGift_Order_Submit_Or_WithdrawArgs = {
	gift_id: Scalars["ID"]["input"];
	is_ignore_points_balance?: Scalars["Boolean"]["input"];
	status: OrderStatus;
};

export type MutationGift_Order_UpdateArgs = {
	data: GiftOrderInput;
};

export type MutationGift_Order_Update_AmountArgs = {
	amount: Scalars["Int"]["input"];
	is_ignore_points_balance?: Scalars["Boolean"]["input"];
	order_id: Scalars["ID"]["input"];
};

export type OneToManyInput = {
	set?: InputMaybe<Scalars["ID"]["input"]>;
};

export type OneToOneInput = {
	set?: InputMaybe<Scalars["ID"]["input"]>;
};

export enum OrderStatus {
	Confirmed = "CONFIRMED",
	Submitted = "SUBMITTED",
	Withdrawn = "WITHDRAWN",
}

export type Query = {
	__typename?: "Query";
	gift: GiftType;
	gift_image: GiftImageType;
	gift_images: Array<GiftImageType>;
	gift_order: GiftOrderType;
	gift_orders: Array<GiftOrderType>;
	gifts: Array<GiftType>;
	user_current?: Maybe<UserType>;
};

export type QueryGift_OrdersArgs = {
	filters?: InputMaybe<GiftOrderFilter>;
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
	points: Scalars["Decimal"]["output"];
};

export type GiftsQueryVariables = Exact<{ [key: string]: never }>;

export type GiftsQuery = {
	__typename?: "Query";
	gifts: Array<{
		__typename?: "GiftType";
		id: string;
		name: string;
		description_short: string;
		points: any;
		fit_confidence: any;
		images: Array<{
			__typename?: "GiftImageType";
			id: string;
			order: number;
			image: { __typename?: "DjangoImageType"; url: string; path: string };
		}>;
		order?: {
			__typename?: "GiftOrderType";
			id: string;
			status: OrderStatus;
			amount: number;
		} | null;
	}>;
};

export type GiftOrderSubmitOrWithdrawMutationVariables = Exact<{
	giftId: Scalars["ID"]["input"];
	status: OrderStatus;
	isIgnorePointsBalance?: InputMaybe<Scalars["Boolean"]["input"]>;
}>;

export type GiftOrderSubmitOrWithdrawMutation = {
	__typename?: "Mutation";
	gift_order_submit_or_withdraw: { __typename?: "GiftOrderType"; id: string };
};

export type GiftOrderUpdateAmountMutationVariables = Exact<{
	orderId: Scalars["ID"]["input"];
	amount: Scalars["Int"]["input"];
	isIgnorePointsBalance?: InputMaybe<Scalars["Boolean"]["input"]>;
}>;

export type GiftOrderUpdateAmountMutation = {
	__typename?: "Mutation";
	gift_order_update_amount: { __typename?: "GiftOrderType"; id: string };
};

export type UserCurrentQueryVariables = Exact<{ [key: string]: never }>;

export type UserCurrentQuery = {
	__typename?: "Query";
	user_current?: {
		__typename?: "UserType";
		id: string;
		first_name: string;
		points: any;
	} | null;
};

export type GiftOrdersPendingQueryVariables = Exact<{ [key: string]: never }>;

export type GiftOrdersPendingQuery = {
	__typename?: "Query";
	gift_orders: Array<{ __typename?: "GiftOrderType"; id: string }>;
};

export const GiftsDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "query",
			name: { kind: "Name", value: "Gifts" },
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "gifts" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{ kind: "Field", name: { kind: "Name", value: "id" } },
								{ kind: "Field", name: { kind: "Name", value: "name" } },
								{
									kind: "Field",
									name: { kind: "Name", value: "images" },
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{ kind: "Field", name: { kind: "Name", value: "id" } },
											{ kind: "Field", name: { kind: "Name", value: "order" } },
											{
												kind: "Field",
												name: { kind: "Name", value: "image" },
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{
															kind: "Field",
															name: { kind: "Name", value: "url" },
														},
														{
															kind: "Field",
															name: { kind: "Name", value: "path" },
														},
													],
												},
											},
										],
									},
								},
								{
									kind: "Field",
									name: { kind: "Name", value: "description_short" },
								},
								{ kind: "Field", name: { kind: "Name", value: "points" } },
								{
									kind: "Field",
									name: { kind: "Name", value: "fit_confidence" },
								},
								{
									kind: "Field",
									name: { kind: "Name", value: "order" },
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{ kind: "Field", name: { kind: "Name", value: "id" } },
											{
												kind: "Field",
												name: { kind: "Name", value: "status" },
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "amount" },
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
} as unknown as DocumentNode<GiftsQuery, GiftsQueryVariables>;
export const GiftOrderSubmitOrWithdrawDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "GiftOrderSubmitOrWithdraw" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: {
						kind: "Variable",
						name: { kind: "Name", value: "giftId" },
					},
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
					},
				},
				{
					kind: "VariableDefinition",
					variable: {
						kind: "Variable",
						name: { kind: "Name", value: "status" },
					},
					type: {
						kind: "NonNullType",
						type: {
							kind: "NamedType",
							name: { kind: "Name", value: "OrderStatus" },
						},
					},
				},
				{
					kind: "VariableDefinition",
					variable: {
						kind: "Variable",
						name: { kind: "Name", value: "isIgnorePointsBalance" },
					},
					type: { kind: "NamedType", name: { kind: "Name", value: "Boolean" } },
					defaultValue: { kind: "BooleanValue", value: false },
				},
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "gift_order_submit_or_withdraw" },
						arguments: [
							{
								kind: "Argument",
								name: { kind: "Name", value: "gift_id" },
								value: {
									kind: "Variable",
									name: { kind: "Name", value: "giftId" },
								},
							},
							{
								kind: "Argument",
								name: { kind: "Name", value: "status" },
								value: {
									kind: "Variable",
									name: { kind: "Name", value: "status" },
								},
							},
							{
								kind: "Argument",
								name: { kind: "Name", value: "is_ignore_points_balance" },
								value: {
									kind: "Variable",
									name: { kind: "Name", value: "isIgnorePointsBalance" },
								},
							},
						],
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{ kind: "Field", name: { kind: "Name", value: "id" } },
							],
						},
					},
				],
			},
		},
	],
} as unknown as DocumentNode<
	GiftOrderSubmitOrWithdrawMutation,
	GiftOrderSubmitOrWithdrawMutationVariables
>;
export const GiftOrderUpdateAmountDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "GiftOrderUpdateAmount" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: {
						kind: "Variable",
						name: { kind: "Name", value: "orderId" },
					},
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
					},
				},
				{
					kind: "VariableDefinition",
					variable: {
						kind: "Variable",
						name: { kind: "Name", value: "amount" },
					},
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
					},
				},
				{
					kind: "VariableDefinition",
					variable: {
						kind: "Variable",
						name: { kind: "Name", value: "isIgnorePointsBalance" },
					},
					type: { kind: "NamedType", name: { kind: "Name", value: "Boolean" } },
					defaultValue: { kind: "BooleanValue", value: false },
				},
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "gift_order_update_amount" },
						arguments: [
							{
								kind: "Argument",
								name: { kind: "Name", value: "order_id" },
								value: {
									kind: "Variable",
									name: { kind: "Name", value: "orderId" },
								},
							},
							{
								kind: "Argument",
								name: { kind: "Name", value: "amount" },
								value: {
									kind: "Variable",
									name: { kind: "Name", value: "amount" },
								},
							},
							{
								kind: "Argument",
								name: { kind: "Name", value: "is_ignore_points_balance" },
								value: {
									kind: "Variable",
									name: { kind: "Name", value: "isIgnorePointsBalance" },
								},
							},
						],
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{ kind: "Field", name: { kind: "Name", value: "id" } },
							],
						},
					},
				],
			},
		},
	],
} as unknown as DocumentNode<
	GiftOrderUpdateAmountMutation,
	GiftOrderUpdateAmountMutationVariables
>;
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
								{ kind: "Field", name: { kind: "Name", value: "points" } },
							],
						},
					},
				],
			},
		},
	],
} as unknown as DocumentNode<UserCurrentQuery, UserCurrentQueryVariables>;
export const GiftOrdersPendingDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "query",
			name: { kind: "Name", value: "GiftOrdersPending" },
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "gift_orders" },
						arguments: [
							{
								kind: "Argument",
								name: { kind: "Name", value: "filters" },
								value: {
									kind: "ObjectValue",
									fields: [
										{
											kind: "ObjectField",
											name: { kind: "Name", value: "status" },
											value: { kind: "EnumValue", value: "SUBMITTED" },
										},
									],
								},
							},
						],
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{ kind: "Field", name: { kind: "Name", value: "id" } },
							],
						},
					},
				],
			},
		},
	],
} as unknown as DocumentNode<
	GiftOrdersPendingQuery,
	GiftOrdersPendingQueryVariables
>;
