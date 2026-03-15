# glsl-トークナイザー

GLSL文字列データをGLSLトークンにマッピングする、同期または ストリーミングAPIを使用できるツールです。

## 機能

- GLSL文字列をトークンに分解
- ストリーミングAPI対応
- GLSL 300 ESバージョンに対応

## 使い方

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
```

## ライセンス

MIT