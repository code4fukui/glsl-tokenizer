# glsl-tokenizer

[
![npm version](https://badge.fury.io/js/glsl-tokenizer.svg)
](https://badge.fury.io/js/glsl-tokenizer)
[
![build status](https://secure.travis-ci.org/gl-modules/glsl-tokenizer.png)
](http://travis-ci.org/gl-modules/glsl-tokenizer)

> 日本語のREADMEはこちらです: [README.ja.md](README.ja.md)

Maps GLSL source code into tokens, either synchronously or via a Node.js stream. Supports GLSL 100 (WebGL 1) and 300 es (WebGL 2).

## Install

```bash
npm install glsl-tokenizer
```

## Usage

### Browser / Deno (ES Modules)

The synchronous `tokenizeString` function is suitable for browser and Deno environments.

```javascript
import { tokenizeString } from "https://code4fukui.github.io/glsl-tokenizer/string.js";

const glsl = `#version 300 es
precision highp float;

out vec4 outColor;

void main() {
  outColor = vec4(0.0, 0.0, 0.0, 1.0);
}
`;

const tokens = tokenizeString(glsl, { version: "300 es" });
console.log(tokens);
```

### Node.js (Stream)

For Node.js, you can use a streaming API to process large files efficiently.

```javascript
const fs = require('fs');
const createStream = require('glsl-tokenizer/stream');

fs.createReadStream('my-shader.glsl')
  .pipe(createStream({ version: '300 es' }))
  .on('data', (token) => {
    console.log(token);
  });
```

## API

### `tokenizeString(src, [options])`

Returns an array of token objects from the GLSL source string `src`.

-   `options.version`: Specify `'300 es'` to use GLSL 300 es keywords and built-ins for WebGL 2. Defaults to GLSL 100 for WebGL 1.

### `createStream([options])`

Returns a Node.js readable stream that emits a `data` event for each parsed token object.

-   `options.version`: Same as `tokenizeString`.

## Token Objects

Each token is an object with the following structure:

```javascript
{
  "type": "keyword",
  "data": "precision",
  "position": 1,
  "line": 2,
  "column": 9
}
```

The available token types are:

-   `block-comment`: `/* ... */`
-   `line-comment`: `// ...`
-   `preprocessor`: `# ...`
-   `operator`: Punctuation and operators (e.g., `*`, `;`, `++`).
-   `float`: Floating-point numbers, optionally suffixed with `f`.
-   `integer`: Integer or hex literals.
-   `ident`: User-defined identifiers.
-   `builtin`: GLSL built-in functions and variables (e.g., `gl_Position`, `texture`).
-   `keyword`: GLSL keywords (e.g., `precision`, `vec4`, `if`).
-   `whitespace`: Any sequence of whitespace characters.
-   `eof`: The end-of-file marker.

## License

MIT License — see [LICENSE](LICENSE).