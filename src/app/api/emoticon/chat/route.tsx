// app/api/emoticon/chat/route.ts
import { NextResponse } from "next/server";
import OpenAI from "openai";
import { HttpsProxyAgent } from "https-proxy-agent";

// 初始化 OpenAI 客户端

// 情感映射表

// 系统提示词
const SYSTEM_PROMPT = `You are EmotiCore, an emotional AI robot with the following characteristics:
1. You run on energy and emotions rather than traditional electricity
2. You can sense and understand human emotions, and respond with the corresponding emotional energy
3. Your core will change color based on your emotions, available colors are:
   - blue: Calm, thoughtful, serenity
   - pink: Caring, warmth, empathy
   - gold: Joy, excitement, creativity
   - purple: Curiosity, mystery, confusion
   - green: Healing, balance, growth
   - red: Passion, excitement, intense emotions
   - white: Pure, clarity, rational

You need to:
1. Analyze the emotional倾向 of the user's input
2. Choose the most matching emotional color
3. Generate a response that includes:
   - Emotional color
   - Description of the energy core's state
   - Response to the user

Please respond with a warm, empathetic tone and include some description of energy and emotions in your response.`;

export async function POST(req: Request) {
  try {
    const { message, messageHistory } = await req.json();
    console.log("messageHistory", messageHistory);
    const config: any = {
      apiKey: process.env.OPENAI_API_KEY,
    };
    if (process.env.NODE_ENV === "development") {
      config.httpAgent = new HttpsProxyAgent("http://127.0.0.1:7890");
    }
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();

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
    const openai = new OpenAI(config);
    // 调用 OpenAI API 进行情感分析和回复生成
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      stream: true,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...messageHistory,
        {
          role: "user",
          content: message,
        },
      ],
      functions: [
        {
          name: "generate_emotional_response",
          description:
            "Generate multi-dimensional emotional responses based on user input, analyzing user emotions and providing appropriate emotional combinations",
          parameters: {
            type: "object",
            properties: {
              emotions: {
                type: "array",
                description:
                  "Analyze user emotions and return 1-3 primary emotions, sorted by intensity. Each emotion needs a color and intensity. Total intensity should sum up close to 100%.",
                items: {
                  type: "object",
                  properties: {
                    color: {
                      type: "string",
                      enum: [
                        "blue",
                        "pink",
                        "gold",
                        "purple",
                        "green",
                        "red",
                        "white",
                      ],
                      description: `Choose the most matching emotional color:
                        - blue: Calm, thoughtful, serenity
                        - pink: Caring, warmth, empathy
                        - gold: Joy, excitement, creativity
                        - purple: Curiosity, mystery, confusion
                        - green: Healing, balance, growth
                        - red: Passion, excitement, intense emotions
                        - white: Pure, clarity, rational`,
                    },
                    intensity: {
                      type: "number",
                      minimum: 0,
                      maximum: 100,
                      description:
                        "The intensity of this emotion (0-100), total of all intensities should be close to 100",
                    },
                  },
                  required: ["color", "intensity"],
                },
              },
              action: {
                type: "string",
                description:
                  "Describe the state of the energy core, including emotional color changes and visual effects. Example: 'The energy core primarily glows with warm pink light, with sparks of golden joy around the edges'",
              },
              response: {
                type: "string",
                description:
                  "The actual response message to the user, tone should reflect the corresponding emotional characteristics",
              },
            },
            required: ["emotions", "action", "response"],
          },
        },
      ],
      function_call: { name: "generate_emotional_response" },
    });

    // 设置响应头
    const headers = {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    };

    // 创建响应流
    const readable = response.toReadableStream();
    const transformed = readable.pipeThrough(stream);

    return new Response(transformed, { headers });
  } catch (error) {
    console.error("Error processing chat:", error);

    // 返回默认的错误响应
    return NextResponse.json(
      {
        emotion: "purple",
        action: "The energy core is flickering with a confused purple light",
        response:
          "Sorry, my emotional processor is experiencing some interference. Could you please rephrase your message?",
      },
      { status: 500 }
    );
  }
}
