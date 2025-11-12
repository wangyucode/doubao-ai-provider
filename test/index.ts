// @ts-nocheck not check for this test file

import { doubao } from "../src/index";
import { generateText, streamText } from "ai";
import dotenv from "dotenv";


async function testGenerateText() {
  const model = doubao("doubao-seed-1-6-251015");

  const result = await generateText({
    model,
    prompt: "say hello."
  });

  console.log("result:",JSON.stringify(result, null, 2));
}

async function testStreamText() {
  const model = doubao("doubao-seed-1-6-251015");

  const result = await streamText({
    model,
    prompt: "say hello.",

    onFinish: (output) => {
      console.log("onFinish:", JSON.stringify(output, null, 2));
    }
  });

  console.log("result:", JSON.stringify(result, null, 2));
  console.log("result.usage:", JSON.stringify(result.usage, null, 2));

  for await (const textPart of result.textStream) {
    console.log(textPart);
  }
}



dotenv.config();
testStreamText();
