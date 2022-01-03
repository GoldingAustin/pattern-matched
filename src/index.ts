import { patternMatching } from './pattern-matching';
import type { ByProduct, ByReturn } from './types';

/**
 * Helper function to produce chained pattern matching functions.
 * @param condition
 * @param patterns
 */
const patternMatcher = <Match = unknown, Return = undefined>(
  condition: Match,
  patterns: Array<ByReturn<Match, Return>> = []
): ByProduct<Match, Return> => {
  return {
    end: (): Return | undefined => {
      for (const [patternMatch, callback] of patterns) {
        if (patternMatching(condition, patternMatch))
          return callback instanceof Function ? callback(condition) : callback;
      }
      return undefined;
    },
    by: (pattern, product) => patternMatcher(condition, [...patterns, [pattern, product] as ByReturn<Match, Return>]),
  };
};

/**
 * Match a condition against a pattern.
 * @param {Match} condition a condition to match against a pattern. Can any primitive, array or object.
 */
export const match = <Match>(condition: Match) => {
  return patternMatcher<Match>(condition, []);
};
