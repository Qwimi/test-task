
type CreateUnion<Max extends number, Accumulator extends number[] = []> = Accumulator["length"] extends Max
    ? Accumulator[number]
    : CreateUnion<Max, [...Accumulator, Accumulator["length"]]>;

export type Range<Min extends number, Max extends number> = Exclude<CreateUnion<Max>, CreateUnion<Min>>;