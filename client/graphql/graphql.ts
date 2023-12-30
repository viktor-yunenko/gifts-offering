/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** Date with time (isoformat) */
  DateTime: { input: any; output: any; }
  /** Decimal (fixed-point) */
  Decimal: { input: any; output: any; }
};

export type DjangoImageType = {
  __typename?: 'DjangoImageType';
  height: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  path: Scalars['String']['output'];
  size: Scalars['Int']['output'];
  url: Scalars['String']['output'];
  width: Scalars['Int']['output'];
};

export type DjangoModelType = {
  __typename?: 'DjangoModelType';
  pk: Scalars['ID']['output'];
};

export type GiftImageType = {
  __typename?: 'GiftImageType';
  caption: Scalars['String']['output'];
  created_at: Scalars['DateTime']['output'];
  gift: GiftType;
  id: Scalars['ID']['output'];
  image: DjangoImageType;
  updated_at: Scalars['DateTime']['output'];
};

export type GiftOrderType = {
  __typename?: 'GiftOrderType';
  created_at: Scalars['DateTime']['output'];
  gift: GiftType;
  id: Scalars['ID']['output'];
  status: OrderStatus;
  updated_at: Scalars['DateTime']['output'];
  user: UserType;
};

export type GiftType = {
  __typename?: 'GiftType';
  created_at: Scalars['DateTime']['output'];
  description_full: Scalars['String']['output'];
  description_short: Scalars['String']['output'];
  fit_confidence: Scalars['Decimal']['output'];
  id: Scalars['ID']['output'];
  image_card: DjangoImageType;
  is_published: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  order?: Maybe<GiftOrderType>;
  points: Scalars['Decimal']['output'];
  updated_at: Scalars['DateTime']['output'];
  user: DjangoModelType;
};

export type Mutation = {
  __typename?: 'Mutation';
  gift_order_submit: GiftOrderType;
  gift_order_withdraw: GiftOrderType;
};


export type MutationGift_Order_SubmitArgs = {
  gift_id: Scalars['ID']['input'];
  is_ignore_points_balance?: Scalars['Boolean']['input'];
};


export type MutationGift_Order_WithdrawArgs = {
  gift_id: Scalars['ID']['input'];
  is_ignore_points_balance?: Scalars['Boolean']['input'];
};

export enum OrderStatus {
  Confirmed = 'CONFIRMED',
  Pending = 'PENDING',
  Withdrawn = 'WITHDRAWN'
}

export type Query = {
  __typename?: 'Query';
  gift: GiftType;
  gift_image: GiftImageType;
  gift_images: Array<GiftImageType>;
  gift_order: GiftOrderType;
  gift_orders: Array<GiftOrderType>;
  gifts: Array<GiftType>;
  user_current?: Maybe<UserType>;
};

export type UserType = {
  __typename?: 'UserType';
  date_joined: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  first_name: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  is_active: Scalars['Boolean']['output'];
  is_staff: Scalars['Boolean']['output'];
  is_superuser: Scalars['Boolean']['output'];
  last_login?: Maybe<Scalars['DateTime']['output']>;
  last_name: Scalars['String']['output'];
  password: Scalars['String']['output'];
  points: Scalars['Decimal']['output'];
};

export type GiftsQueryVariables = Exact<{ [key: string]: never; }>;


export type GiftsQuery = { __typename?: 'Query', gifts: Array<{ __typename?: 'GiftType', id: string, name: string, description_short: string, points: any, fit_confidence: any, image_card: { __typename?: 'DjangoImageType', path: string, url: string }, order?: { __typename?: 'GiftOrderType', id: string, status: OrderStatus } | null }> };

export type GiftOrderSubmitMutationVariables = Exact<{
  giftId: Scalars['ID']['input'];
  isIgnorePointsBalance?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type GiftOrderSubmitMutation = { __typename?: 'Mutation', gift_order_submit: { __typename?: 'GiftOrderType', id: string } };

export type GiftOrderWithdrawMutationVariables = Exact<{
  giftId: Scalars['ID']['input'];
  isIgnorePointsBalance?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type GiftOrderWithdrawMutation = { __typename?: 'Mutation', gift_order_withdraw: { __typename?: 'GiftOrderType', id: string } };

export type UserCurrentQueryVariables = Exact<{ [key: string]: never; }>;


export type UserCurrentQuery = { __typename?: 'Query', user_current?: { __typename?: 'UserType', id: string, first_name: string, points: any } | null };


export const GiftsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Gifts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"gifts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image_card"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"description_short"}},{"kind":"Field","name":{"kind":"Name","value":"points"}},{"kind":"Field","name":{"kind":"Name","value":"fit_confidence"}},{"kind":"Field","name":{"kind":"Name","value":"order"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]}}]} as unknown as DocumentNode<GiftsQuery, GiftsQueryVariables>;
export const GiftOrderSubmitDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"GiftOrderSubmit"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"giftId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"isIgnorePointsBalance"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}},"defaultValue":{"kind":"BooleanValue","value":false}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"gift_order_submit"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"gift_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"giftId"}}},{"kind":"Argument","name":{"kind":"Name","value":"is_ignore_points_balance"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isIgnorePointsBalance"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<GiftOrderSubmitMutation, GiftOrderSubmitMutationVariables>;
export const GiftOrderWithdrawDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"GiftOrderWithdraw"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"giftId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"isIgnorePointsBalance"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}},"defaultValue":{"kind":"BooleanValue","value":false}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"gift_order_withdraw"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"gift_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"giftId"}}},{"kind":"Argument","name":{"kind":"Name","value":"is_ignore_points_balance"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isIgnorePointsBalance"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<GiftOrderWithdrawMutation, GiftOrderWithdrawMutationVariables>;
export const UserCurrentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserCurrent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user_current"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"first_name"}},{"kind":"Field","name":{"kind":"Name","value":"points"}}]}}]}}]} as unknown as DocumentNode<UserCurrentQuery, UserCurrentQueryVariables>;