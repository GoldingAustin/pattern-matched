import { patternMatching } from './pattern-matching';
import type { When, WhenReturn } from './types';

/**
 * Helper function to produce chained pattern matching functions.
 * @param condition
 * @param patterns
 */
const patternMatcher = <Match = unknown, Return = undefined>(
  condition: Match,
  patterns: Array<WhenReturn<Match, Return>> = []
): When<Match, Return> => {
  return {
    else: (defaultValue) => {
      for (const [patternMatch, callback] of patterns) {
        if (patternMatching(condition, patternMatch))
          return callback instanceof Function ? callback(condition) : callback;
      }
      return defaultValue;
    },
    when: (pattern, product) =>
      patternMatcher(condition, [...patterns, [pattern, product] as WhenReturn<Match, Return>]),
  };
};

/**
 * Match a condition against a pattern.
 * @param {Match} condition a condition to match against a pattern. Can any primitive, array or object.
 */
export const match = <Match>(condition: Match) => {
  return patternMatcher<Match>(condition);
};
