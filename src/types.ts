/**
 * Output Pattern found here
 * {@link https://gist.githubusercontent.com/WimJongeneel/5a62b73ff6e1aa6dab7cbf51ba7d3581/raw/37e8a6d7e30574a0078a45d52eafd7d7e2678f9e/match-13.ts}
 * {@link https://medium.com/swlh/pattern-matching-in-typescript-with-record-and-wildcard-patterns-6097dd4e471d}
 */
export type OutputPattern<Pattern> = Pattern extends NumberConstructor
  ? number
  : Pattern extends StringConstructor
  ? string
  : Pattern extends BooleanConstructor
  ? boolean
  : Pattern extends Array<infer PatternArray>
  ? OutputPattern<PatternArray>[]
  : Pattern extends object
  ? { [Key in keyof Pattern]: OutputPattern<Pattern[Key]> }
  : Pattern;

export type Product<
  Match,
  Pattern,
  Return = unknown,
  MatchPattern extends Extract<Match, OutputPattern<Pattern>> = Extract<Match, OutputPattern<Pattern>>
> = ((match: MatchPattern) => Return) | Return;

export type ByReturn<Match, Return> = [Match | Partial<Match>, Product<Match, Return>];

export interface ByProduct<Match, Return> {
  end: () => Return | undefined;
  by: <Pattern, PatternReturn = unknown>(
    pattern: Pattern,
    product: Product<Match, Pattern, PatternReturn>
  ) => ByProduct<Match, PatternReturn | Return>;
}
