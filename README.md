# glsl-tokenizer

Maps GLSL string data into GLSL tokens, either synchronously or using a streaming API.

## Usage

```javascript
import { tokenString } from "https://code4fukui.github.io/glsl-tokenizer/string.js";

const glsl = "const src = `#version 300 es\nprecision highp float;\n\nout vec4 outColor;\n\nvoid main() {\n  outColor = vec4(0.0, 0.0, 0.0, 1.0);\n}";

const tokens = tokenString(glsl, { version: "300 es" });
```

## API

### `tokens = require('glsl-tokenizer/string')(src, [opt])`

Returns an array of `tokens` given the GLSL source string `src`.

You can specify `opt.version` string to use different keywords/builtins, such as `'300 es'` for WebGL2. Otherwise, will assume GLSL 100 (WebGL1).

### `stream = require('glsl-tokenizer/stream')([opt])`

Emits 'data' events whenever a token is parsed with a token object as output.

As above, you can specify `opt.version`.

## Tokens

```javascript
{ 'type': TOKEN_TYPE
, 'data': "string of constituent data"
, 'position': integer position within the GLSL source
, 'line': line number within the GLSL source
, 'column': column number within the GLSL source }
```

The available token types are:

* `block-comment`: `/* ... */`
* `line-comment`: `// ... \n`
* `preprocessor`: `# ... \n`
* `operator`: Any operator. If it looks like punctuation, it's an operator.
* `float`: Optionally suffixed with `f`
* `ident`: User defined identifier.
* `builtin`: Builtin function.
* `eof`: Emitted on `end`; data will === `'(eof)'`.
* `integer`
* `whitespace`
* `keyword`

## License

MIT