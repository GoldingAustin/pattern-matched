## Pattern Match

A pattern matching library that supports primitives, objects and arrays.

```typescript
const value = 1;
match(value)
  .when(0, () => 1) // Similar to if (value === 0) return 1;
  .when(1, 2) // This is also valid
  .when(2, (matched) => console.log(matched)) // Access the matched value, this would log 2
  .else(); // Runs the match, infers result type to be 1, 2 or undefined. Can also be passed a default value.
```
