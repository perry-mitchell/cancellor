# Cancellor
> Cancel token generator

Generate super-simple cancel "tokens" that can be used to flag the cancellation of sync and async tasks. Use tokens to detect the need to exit early or throw an exception in one line if a token has been cancelled.

## Why?

There's a good number of cancel token libraries out there, but many of the maintained ones make use of classes and the like which transpile poorly. I needed something simple and that leaves a very small footprint.

## Installation

Simply install using `npm install cancellor --save`.

## Usage

**Cancellor** exports a `createToken` method:

```typescript
import { CancelToken, createToken } from "cancellor";

const token: CancelToken = createToken();

token.isCancelled(); // false

token.cancel();

token.isCancelled(); // true

token.throwIfCancelled(); // Error: Token was cancelled
```

Cancel tokens also emit events:

```typescript
const removeListener = token.onCancel(() => {
    // Fired when `token.cancel()` is called
});

// later

token.cancel();
```

## Development

The library is written in typescript and should be developed against NodeJS 14 or newer.

Make sure to install all dependencies (`npm install`) before running any other command. You can build the final source using `npm run build`. Run tests with `npm test`.
