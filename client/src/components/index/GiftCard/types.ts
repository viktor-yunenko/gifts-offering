import type { GiftsQuery } from "#graphql/graphql";

export type Gift = GiftsQuery["gifts"][number];
