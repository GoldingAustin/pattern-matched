/**
 * {@link https://stackoverflow.com/questions/69037829/constraining-a-generic-parameter-to-be-a-union-type-in-typescript}
 */
type IsUnion<T> = [T] extends [UnionToIntersection<T>] ? false : true;
type UnionToIntersection<U> = (U extends unknown ? (k: U) => void : never) extends (k: infer I) => void ? I : never;
/**
 * Pattern inspired from here - additional modifications made to support unions and matching property names
 * {@link https://gist.githubusercontent.com/WimJongeneel/5a62b73ff6e1aa6dab7cbf51ba7d3581/raw/37e8a6d7e30574a0078a45d52eafd7d7e2678f9e/match-13.ts}
 * {@link https://medium.com/swlh/pattern-matching-in-typescript-with-record-and-wildcard-patterns-6097dd4e471d}
 */
export type InputOutputPattern<Pattern> = Pattern extends NumberConstructor
  ? number
  : Pattern extends StringConstructor
  ? string
  : Pattern extends BooleanConstructor
  ? boolean
  : Pattern extends readonly (infer i)[]
  ? InputOutputPattern<i>
  : Pattern extends Array<infer PatternArray>
  ? InputOutputPattern<PatternArray>[]
  : Pattern extends object
  ? {
      [Key in keyof Pattern]?: InputOutputPattern<
        IsUnion<Pattern[Key]> extends true ? UnionToIntersection<Pattern[Key]> : Pattern[Key]
      >;
    }
  : Pattern;

export type Product<
  Match,
  Pattern,
  Return = unknown,
  MatchPattern extends Extract<Match, InputOutputPattern<Pattern>> = Extract<Match, InputOutputPattern<Pattern>>
> = ((matched: MatchPattern) => Return) | Return;

export type WhenReturn<Match, Return> = [Partial<Match>, Product<Match, Return>];

export interface When<Match, Return> {
  else: <DefaultValue = undefined>(defaultValue?: DefaultValue) => Return | DefaultValue;
  when: <Pattern extends InputOutputPattern<Match> | object, PatternReturn = unknown>(
    pattern: Pattern,
    product: Product<Match, Pattern, PatternReturn>
  ) => When<Match, Return>;
}
