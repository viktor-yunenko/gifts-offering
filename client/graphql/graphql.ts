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

export type GiftOrderInput = {
  created_at?: InputMaybe<Scalars['DateTime']['input']>;
  gift: OneToManyInput;
  id?: InputMaybe<Scalars['ID']['input']>;
  is_confirmed_by_admin?: InputMaybe<Scalars['Boolean']['input']>;
  updated_at?: InputMaybe<Scalars['DateTime']['input']>;
  user: OneToManyInput;
};

export type GiftOrderType = {
  __typename?: 'GiftOrderType';
  created_at: Scalars['DateTime']['output'];
  gift: GiftType;
  id: Scalars['ID']['output'];
  is_confirmed_by_admin: Scalars['Boolean']['output'];
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
  image_card_url: Scalars['String']['output'];
  is_accepted: Scalars['Boolean']['output'];
  is_published: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  points: Scalars['Decimal']['output'];
  updated_at: Scalars['DateTime']['output'];
  user: DjangoModelType;
};

export type Mutation = {
  __typename?: 'Mutation';
  gift_order_create: GiftOrderType;
};


export type MutationGift_Order_CreateArgs = {
  data: GiftOrderInput;
};

export type OneToManyInput = {
  set?: InputMaybe<Scalars['ID']['input']>;
};

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


export type QueryGiftArgs = {
  pk: Scalars['ID']['input'];
};


export type QueryGift_ImageArgs = {
  pk: Scalars['ID']['input'];
};


export type QueryGift_OrderArgs = {
  pk: Scalars['ID']['input'];
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


export type GiftsQuery = { __typename?: 'Query', gifts: Array<{ __typename?: 'GiftType', id: string, name: string, image_card_url: string, description_short: string, points: any, fit_confidence: any, is_accepted: boolean, image_card: { __typename?: 'DjangoImageType', path: string, url: string } }> };

export type GiftOrderMutationVariables = Exact<{
  giftId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
}>;


export type GiftOrderMutation = { __typename?: 'Mutation', gift_order_create: { __typename?: 'GiftOrderType', id: string } };

export type UserCurrentQueryVariables = Exact<{ [key: string]: never; }>;


export type UserCurrentQuery = { __typename?: 'Query', user_current?: { __typename?: 'UserType', id: string, first_name: string, points: any } | null };


export const GiftsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Gifts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"gifts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image_card"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"image_card_url"}},{"kind":"Field","name":{"kind":"Name","value":"description_short"}},{"kind":"Field","name":{"kind":"Name","value":"points"}},{"kind":"Field","name":{"kind":"Name","value":"fit_confidence"}},{"kind":"Field","name":{"kind":"Name","value":"is_accepted"}}]}}]}}]} as unknown as DocumentNode<GiftsQuery, GiftsQueryVariables>;
export const GiftOrderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"GiftOrder"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"giftId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"gift_order_create"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"gift"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"set"},"value":{"kind":"Variable","name":{"kind":"Name","value":"giftId"}}}]}},{"kind":"ObjectField","name":{"kind":"Name","value":"user"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"set"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<GiftOrderMutation, GiftOrderMutationVariables>;
export const UserCurrentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserCurrent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user_current"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"first_name"}},{"kind":"Field","name":{"kind":"Name","value":"points"}}]}}]}}]} as unknown as DocumentNode<UserCurrentQuery, UserCurrentQueryVariables>;