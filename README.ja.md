# glsl-tokenizer

[
![npm version](https://badge.fury.io/js/glsl-tokenizer.svg)
](https://badge.fury.io/js/glsl-tokenizer)
[
![build status](https://secure.travis-ci.org/gl-modules/glsl-tokenizer.png)
](http://travis-ci.org/gl-modules/glsl-tokenizer)

GLSLソースコードを同期的に、またはNode.jsストリームを介してトークンに変換します。GLSL 100 (WebGL 1) および 300 es (WebGL 2) をサポートしています。

## インストール

```bash
npm install glsl-tokenizer
```

## 使い方

### ブラウザ / Deno (ES Modules)

同期的な `tokenizeString` 関数は、ブラウザおよびDeno環境に適しています。

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

### Node.js (ストリーム)

Node.jsでは、ストリームAPIを使用して大規模なファイルを効率的に処理できます。

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

GLSLソース文字列 `src` からトークンオブジェクトの配列を返します。

-   `options.version`: `'300 es'` を指定すると、WebGL 2用のGLSL 300 esのキーワードとビルトインを使用します。デフォルトはWebGL 1用のGLSL 100です。

### `createStream([options])`

解析された各トークンオブジェクトに対して `data` イベントを発火する、Node.jsのReadableストリームを返します。

-   `options.version`: `tokenizeString` と同じです。

## トークンオブジェクト

各トークンは以下の構造を持つオブジェクトです:

```javascript
{
  "type": "keyword",
  "data": "precision",
  "position": 1,
  "line": 2,
  "column": 9
}
```

利用可能なトークンタイプは以下の通りです:

-   `block-comment`: `/* ... */`
-   `line-comment`: `// ...`
-   `preprocessor`: `# ...`
-   `operator`: 句読点および演算子 (例: `*`, `;`, `++`)
-   `float`: 浮動小数点数。オプションで接尾辞 `f` が付きます。
-   `integer`: 整数または16進数リテラル
-   `ident`: ユーザー定義の識別子
-   `builtin`: GLSLのビルトイン関数や変数 (例: `gl_Position`, `texture`)
-   `keyword`: GLSLキーワード (例: `precision`, `vec4`, `if`)
-   `whitespace`: 任意の空白文字の連続
-   `eof`: ファイル終端 (EOF) マーカー

## ライセンス

MIT License — 詳細は [LICENSE](LICENSE) を参照してください。
