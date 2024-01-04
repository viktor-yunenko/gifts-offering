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
    "\n\tmutation GiftOrderSubmit($giftId: ID!, $isIgnorePointsBalance: Boolean = false) {\n    gift_order_submit(gift_id: $giftId, is_ignore_points_balance: $isIgnorePointsBalance) {\n      id\n    }\n  }\n": types.GiftOrderSubmitDocument,
    "\n\tmutation GiftOrderWithdraw($giftId: ID!, $isIgnorePointsBalance: Boolean = false) {\n    gift_order_withdraw(gift_id: $giftId, is_ignore_points_balance: $isIgnorePointsBalance) {\n      id\n    }\n  }\n": types.GiftOrderWithdrawDocument,
    "\n\tquery Gifts {\n\t\tgifts {\n\t\t\tid\n\t\t\tname\n\t\t\timage_card {\n\t\t\t\tpath\n\t\t\t\turl\n\t\t\t}\n\t\t\tdescription_short\n\t\t\tpoints\n\t\t\tfit_confidence\n\t\t\torder {\n\t\t\t\tid\n\t\t\t\tstatus\n\t\t\t}\n\t\t}\n\t}\n": types.GiftsDocument,
    "\n\tquery UserCurrent {\n\t\tuser_current {\n\t\t\tid\n\t\t\tfirst_name\n\t\t\tpoints\n\t\t}\n\t}\n": types.UserCurrentDocument,
    "\n\tquery GiftOrdersPending {\n\t\tgift_orders(filters: { status: PENDING }) {\n\t\t\tid\n\t\t}\n\t}\n": types.GiftOrdersPendingDocument,
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
export function gql(source: "\n\tmutation GiftOrderSubmit($giftId: ID!, $isIgnorePointsBalance: Boolean = false) {\n    gift_order_submit(gift_id: $giftId, is_ignore_points_balance: $isIgnorePointsBalance) {\n      id\n    }\n  }\n"): (typeof documents)["\n\tmutation GiftOrderSubmit($giftId: ID!, $isIgnorePointsBalance: Boolean = false) {\n    gift_order_submit(gift_id: $giftId, is_ignore_points_balance: $isIgnorePointsBalance) {\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tmutation GiftOrderWithdraw($giftId: ID!, $isIgnorePointsBalance: Boolean = false) {\n    gift_order_withdraw(gift_id: $giftId, is_ignore_points_balance: $isIgnorePointsBalance) {\n      id\n    }\n  }\n"): (typeof documents)["\n\tmutation GiftOrderWithdraw($giftId: ID!, $isIgnorePointsBalance: Boolean = false) {\n    gift_order_withdraw(gift_id: $giftId, is_ignore_points_balance: $isIgnorePointsBalance) {\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tquery Gifts {\n\t\tgifts {\n\t\t\tid\n\t\t\tname\n\t\t\timage_card {\n\t\t\t\tpath\n\t\t\t\turl\n\t\t\t}\n\t\t\tdescription_short\n\t\t\tpoints\n\t\t\tfit_confidence\n\t\t\torder {\n\t\t\t\tid\n\t\t\t\tstatus\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery Gifts {\n\t\tgifts {\n\t\t\tid\n\t\t\tname\n\t\t\timage_card {\n\t\t\t\tpath\n\t\t\t\turl\n\t\t\t}\n\t\t\tdescription_short\n\t\t\tpoints\n\t\t\tfit_confidence\n\t\t\torder {\n\t\t\t\tid\n\t\t\t\tstatus\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tquery UserCurrent {\n\t\tuser_current {\n\t\t\tid\n\t\t\tfirst_name\n\t\t\tpoints\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery UserCurrent {\n\t\tuser_current {\n\t\t\tid\n\t\t\tfirst_name\n\t\t\tpoints\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tquery GiftOrdersPending {\n\t\tgift_orders(filters: { status: PENDING }) {\n\t\t\tid\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery GiftOrdersPending {\n\t\tgift_orders(filters: { status: PENDING }) {\n\t\t\tid\n\t\t}\n\t}\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;