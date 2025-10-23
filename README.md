# AI SDK - Doubao Provider

Community-built **[Doubao provider](https://ai-sdk.dev/providers/community-providers/doubao)** for the [AI SDK](https://ai-sdk.dev/docs) contains language model support for the Bytedance's [Doubao](https://www.volcengine.com/product/doubao) models.

## Setup

The Doubao provider is available in the `doubao-ai-provider` module. You can install it with

```bash
npm i doubao-ai-provider
```

## Provider Instance

You can import the default provider instance `doubao` from `doubao-ai-provider`:

```ts
import { doubao } from "doubao-ai-provider";
```

## Example

```ts
import { doubao } from "doubao-ai-provider";
import { generateText } from "ai";

const { text } = await generateText({
  model: doubao("doubao-seed-1-6-251015"),
  prompt: "Introduce Doubao",
});
```

## Documentation

Please check out the **[Doubao provider](https://ai-sdk.dev/providers/community-providers/doubao)** for more information.
