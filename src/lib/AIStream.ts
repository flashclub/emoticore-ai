import { createParser } from "eventsource-parser";
import { OpenAIError } from "./errors";
import OpenAI from "openai";
import { HttpsProxyAgent } from "https-proxy-agent";
export const OpenAIStream = async ({
  addModelNameInResult,
  model,
  url,
  messages,
  apiKey,
  callback,
}: {
  addModelNameInResult?: boolean;
  model: string;
  url: string;
  messages: any[];
  apiKey?: string;
  callback?: (allText: string) => void | Promise<void>;
}) => {
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey || process.env.SILICONFLOW_KEY}`,
    },
    method: "POST",
    body: JSON.stringify({ model, messages, stream: true }),
  });

  if (!res.ok) {
    await handleErrorResponse(res);
  }

  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  const textChunks: string[] = [];

  const stream = new ReadableStream({
    async start(controller) {
      const onParse = createParseHandler(controller, encoder, textChunks);
      const parser = createParser(onParse);

      for await (const chunk of res.body as any) {
        parser.feed(decoder.decode(chunk));
      }

      // 流结束时，执行回调函数
      const allText = textChunks.join("");
      try {
        if (callback) {
          await Promise.resolve(callback(allText));
        }
      } catch (error) {
        console.error("Error in stream end callback:", error);
      }

      controller.close();
    },
  });

  return stream;
};

export const OpenAIStreamWithFunctionCall = async ({
  addModelNameInResult,
  model,
  url,
  messages,
  apiKey,
  callback,
}: {
  addModelNameInResult?: boolean;
  model: string;
  url: string;
  messages: any[];
  apiKey?: string;
  callback?: (allText: string) => void | Promise<void>;
}) => {
  const config: any = {
    apiKey: process.env.OPENAI_API_KEY,
  };
  if (process.env.NODE_ENV === "development") {
    config.httpAgent = new HttpsProxyAgent("http://127.0.0.1:7890");
  }
  const openai = new OpenAI(config);
  const res = await openai.chat.completions.create({
    model: "gpt-4",
    messages,
    functions: [
      {
        name: "generate_emotional_response",
        description:
          "Generate an emotional response with color, action and message",
        parameters: {
          type: "object",
          properties: {
            emotion: {
              type: "string",
              enum: ["blue", "pink", "gold", "purple", "green", "red", "white"],
              description: "The emotional color state",
            },
            action: {
              type: "string",
              description: "Description of the energy core's state and action",
            },
            response: {
              type: "string",
              description: "The actual response message",
            },
          },
          required: ["emotion", "action", "response"],
        },
      },
    ],
    function_call: { name: "generate_emotional_response" },
  });
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  const textChunks: string[] = [];
  let accumulatedJson = "";
  const stream = new TransformStream({
    async transform(chunk, controller) {
      // 将收到的 chunk 解码并累加
      accumulatedJson += decoder.decode(chunk);

      try {
        // 尝试解析累积的 JSON
        const parsedData = JSON.parse(accumulatedJson);
        // 如果解析成功，发送数据
        controller.enqueue(encoder.encode(JSON.stringify(parsedData) + "\n"));
        accumulatedJson = ""; // 重置累积的 JSON
      } catch (e) {
        // JSON 还不完整，继续累积
      }
    },
  });

  return stream;
};

const createParseHandler =
  (
    controller: ReadableStreamDefaultController,
    encoder: TextEncoder,
    textChunks: string[]
  ) =>
  (event: any) => {
    if (event.type === "event") {
      const data = event.data;
      if (data === "[DONE]") return;

      try {
        const json = JSON.parse(data);
        // console.log("aiStream json", json);
        if (json.choices[0].finish_reason != null) return;

        const text = json.choices[0].delta.content;
        textChunks.push(text);
        controller.enqueue(encoder.encode(text));
      } catch (e) {
        controller.error(e);
      }
    }
  };

const handleErrorResponse = async (res: Response) => {
  const result = await res.json();
  if (result.error) {
    throw new OpenAIError(
      result.error.message,
      result.error.type,
      result.error.param,
      result.error.code
    );
  } else {
    throw new Error(`API returned an error: ${result.statusText}`);
  }
};
