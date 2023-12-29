/* eslint-disable */
import * as types from './graphql';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n\tquery Gifts {\n\t\tgifts {\n\t\t\tid\n\t\t\tname\n\t\t\timage_card {\n\t\t\t\tpath\n\t\t\t\turl\n\t\t\t}\n\t\t\timage_card_url\n\t\t\tdescription_short\n\t\t\tpoints\n\t\t\tfit_confidence\n\t\t\tis_accepted\n\t\t}\n\t}\n": types.GiftsDocument,
    "\n\tmutation GiftOrder($giftId: ID!, $userId: ID!) {\n    gift_order_create(data: { gift: { set: $giftId }, user: { set: $userId } }) {\n      id\n    }\n  }\n": types.GiftOrderDocument,
    "\n\tquery UserCurrent {\n\t\tuser_current {\n\t\t\tid\n\t\t\tfirst_name\n\t\t\tpoints\n\t\t}\n\t}\n": types.UserCurrentDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tquery Gifts {\n\t\tgifts {\n\t\t\tid\n\t\t\tname\n\t\t\timage_card {\n\t\t\t\tpath\n\t\t\t\turl\n\t\t\t}\n\t\t\timage_card_url\n\t\t\tdescription_short\n\t\t\tpoints\n\t\t\tfit_confidence\n\t\t\tis_accepted\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery Gifts {\n\t\tgifts {\n\t\t\tid\n\t\t\tname\n\t\t\timage_card {\n\t\t\t\tpath\n\t\t\t\turl\n\t\t\t}\n\t\t\timage_card_url\n\t\t\tdescription_short\n\t\t\tpoints\n\t\t\tfit_confidence\n\t\t\tis_accepted\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tmutation GiftOrder($giftId: ID!, $userId: ID!) {\n    gift_order_create(data: { gift: { set: $giftId }, user: { set: $userId } }) {\n      id\n    }\n  }\n"): (typeof documents)["\n\tmutation GiftOrder($giftId: ID!, $userId: ID!) {\n    gift_order_create(data: { gift: { set: $giftId }, user: { set: $userId } }) {\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tquery UserCurrent {\n\t\tuser_current {\n\t\t\tid\n\t\t\tfirst_name\n\t\t\tpoints\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery UserCurrent {\n\t\tuser_current {\n\t\t\tid\n\t\t\tfirst_name\n\t\t\tpoints\n\t\t}\n\t}\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;