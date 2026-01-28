type CreateUnion<
  Max extends number,
  Accumulator extends number[] = [],
> = Accumulator['length'] extends Max
  ? Accumulator[number]
  : CreateUnion<Max, [...Accumulator, Accumulator['length']]>

export type Range<Min extends number, Max extends number> = Exclude<
  CreateUnion<Max>,
  CreateUnion<Min>
>

export interface PieSector {
  id?: string
  label: string
  value: number | null
  backgroundColor: string | null
}

export interface Option {
  label: string | null
  value: string
}

export interface ColorPreset extends Option {}