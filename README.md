## Pattern Match

A pattern matching library that supports primitives, objects and arrays. 

```typescript
      const value = 1;
      match(value)
        .by(0, () => 1) // Similar to if (value === 0) return 1;
        .by(1, () => 2)
        .end() // Runs the match, infers result type to be 1, 2 or undefined.
```