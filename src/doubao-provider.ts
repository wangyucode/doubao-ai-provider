import { OpenAICompatibleChatLanguageModel } from "@ai-sdk/openai-compatible";
import {
  LanguageModelV2,
  NoSuchModelError,
  ProviderV2,
} from "@ai-sdk/provider";
import {
  FetchFunction,
  loadApiKey,
  withoutTrailingSlash,
} from "@ai-sdk/provider-utils";
import { DoubaoChatModelId } from "./doubao-chat-options";

export interface DoubaoProviderSettings {
  /**
   Doubao API key.
   */
  apiKey?: string;
  /**
   Base URL for the API calls.
   */
  baseURL?: string;
  /**
   Custom headers to include in the requests.
   */
  headers?: Record<string, string>;
  /**
   Custom fetch implementation. You can use it as a middleware to intercept requests,
   or to provide a custom fetch implementation for e.g. testing.
   */
  fetch?: FetchFunction;
}

export interface DoubaoProvider extends ProviderV2 {
  /**
   Creates a Doubao model for text generation.
   */
  (modelId: DoubaoChatModelId): LanguageModelV2;

  /**
   Creates a Doubao model for text generation.
   */
  languageModel(modelId: DoubaoChatModelId): LanguageModelV2;

  /**
   Creates a Doubao chat model for text generation.
   */
  chat(modelId: DoubaoChatModelId): LanguageModelV2;
}

export function createDoubao(
  options: DoubaoProviderSettings = {}
): DoubaoProvider {
  const baseURL = withoutTrailingSlash(
    options.baseURL ?? "https://ark.cn-beijing.volces.com/api/v3"
  );
  const getHeaders = () => ({
    Authorization: `Bearer ${loadApiKey({
      apiKey: options.apiKey,
      environmentVariableName: "DOUBAO_API_KEY",
      description: "Doubao API key",
    })}`,
    ...options.headers,
  });

  const createLanguageModel = (modelId: DoubaoChatModelId) => {
    return new OpenAICompatibleChatLanguageModel(modelId, {
      provider: `doubao.chat`,
      url: ({ path }) => `${baseURL}${path}`,
      headers: getHeaders,
      fetch: options.fetch,
      includeUsage: true,
      // metadataExtractor will be added later
    });
  };

  const provider = (modelId: DoubaoChatModelId) => createLanguageModel(modelId);

  provider.languageModel = createLanguageModel;
  provider.chat = createLanguageModel;

  provider.textEmbeddingModel = (modelId: string) => {
    throw new NoSuchModelError({ modelId, modelType: "textEmbeddingModel" });
  };
  provider.imageModel = (modelId: string) => {
    throw new NoSuchModelError({ modelId, modelType: "imageModel" });
  };

  return provider;
}

export const doubao = createDoubao();
