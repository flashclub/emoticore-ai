import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}

export function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // 将空格替换为连字符
    .replace(/[^\w\-]+/g, "") // 移除非单词字符（除了连字符）
    .replace(/\-\-+/g, "-"); // 将多个连字符替换为单个连字符
}

export const parseNextProperty = (
  startIndex: number,
  currentBuffer: string,
  setParsedData: any
): number | null => {
  // Skip any leading whitespace or commas
  let currentIndex = startIndex;
  while (
    currentIndex < currentBuffer.length &&
    (currentBuffer[currentIndex] === "," ||
      /\s/.test(currentBuffer[currentIndex]))
  ) {
    currentIndex++;
  }

  if (currentIndex >= currentBuffer.length) return null;

  // Check if we're at the end of the object
  if (currentBuffer[currentIndex] === "}") {
    // console.log("done 00: ", parsedData);
    return currentIndex + 1;
  }

  const keyStart = currentBuffer.indexOf('"', currentIndex);
  if (keyStart === -1) return null;

  const keyEnd = currentBuffer.indexOf('"', keyStart + 1);
  if (keyEnd === -1) return null;

  const colonIndex = currentBuffer.indexOf(":", keyEnd);
  if (colonIndex === -1) return null;

  let valueStart = colonIndex + 1;
  while (
    valueStart < currentBuffer.length &&
    /\s/.test(currentBuffer[valueStart])
  ) {
    valueStart++;
  }

  if (valueStart >= currentBuffer.length) return null;
  let valueEnd: number;
  let value: unknown;

  if (currentBuffer[valueStart] === '"') {
    valueEnd = currentBuffer.indexOf('"', valueStart + 1);
    if (valueEnd === -1) return null;
    value = currentBuffer.slice(valueStart + 1, valueEnd);
    valueEnd++; // Move past the closing quote
  } else if (
    currentBuffer[valueStart] === "{" ||
    currentBuffer[valueStart] === "["
  ) {
    let depth = 1;
    valueEnd = valueStart + 1;
    while (depth > 0 && valueEnd < currentBuffer.length) {
      if (currentBuffer[valueEnd] === "{" || currentBuffer[valueEnd] === "[")
        depth++;
      if (currentBuffer[valueEnd] === "}" || currentBuffer[valueEnd] === "]")
        depth--;
      valueEnd++;
    }
    if (depth !== 0) return null;
    try {
      value = JSON.parse(currentBuffer.slice(valueStart, valueEnd));
    } catch {
      return null;
    }
  } else {
    valueEnd = currentBuffer.indexOf(",", valueStart);
    if (valueEnd === -1) valueEnd = currentBuffer.indexOf("}", valueStart);
    if (valueEnd === -1) return null;
    const rawValue = currentBuffer.slice(valueStart, valueEnd).trim();
    if (rawValue === "true") value = true;
    else if (rawValue === "false") value = false;
    else if (rawValue === "null") value = null;
    else if (!isNaN(Number(rawValue))) value = Number(rawValue);
    else return null;
  }

  const key = currentBuffer.slice(keyStart + 1, keyEnd);
  setParsedData((prevData: object) => ({ ...prevData, [key]: value }));

  return valueEnd;
};

// 流式解析
export const parseNextPropertyStream = (
  startIndex: number,
  currentBuffer: string,
  setParsedData: any
): number | null => {
  // 跳过空白字符和逗号
  let currentIndex = startIndex;
  while (
    currentIndex < currentBuffer.length &&
    (currentBuffer[currentIndex] === "," ||
      /\s/.test(currentBuffer[currentIndex]))
  ) {
    currentIndex++;
  }

  if (currentIndex >= currentBuffer.length) return null;

  // 检查对象是否结束
  if (currentBuffer[currentIndex] === "}") {
    return currentIndex + 1;
  }

  // 解析键
  const keyStart = currentBuffer.indexOf('"', currentIndex);
  if (keyStart === -1) return null;

  const keyEnd = currentBuffer.indexOf('"', keyStart + 1);
  if (keyEnd === -1) return null;

  const colonIndex = currentBuffer.indexOf(":", keyEnd);
  if (colonIndex === -1) return null;

  let valueStart = colonIndex + 1;
  while (
    valueStart < currentBuffer.length &&
    /\s/.test(currentBuffer[valueStart])
  ) {
    valueStart++;
  }

  if (valueStart >= currentBuffer.length) return null;
  let valueEnd: number;
  let value: unknown;

  if (currentBuffer[valueStart] === '"') {
    // 字符串值的流式解析
    let currentValueEnd = valueStart + 1;
    let partialValue = "";
    valueEnd = currentValueEnd; // 初始化 valueEnd

    while (currentValueEnd < currentBuffer.length) {
      if (
        currentBuffer[currentValueEnd] === '"' &&
        currentBuffer[currentValueEnd - 1] !== "\\"
      ) {
        valueEnd = currentValueEnd;
        value = partialValue;
        valueEnd++; // 移过结束引号
        break;
      }

      partialValue += currentBuffer[currentValueEnd];
      // 每解析一个字符就更新数据
      const key = currentBuffer.slice(keyStart + 1, keyEnd);
      setParsedData((prevData: object) => ({
        ...prevData,
        [key]: partialValue,
      }));
      currentValueEnd++;
    }

    if (currentValueEnd >= currentBuffer.length) return null;
  } else if (
    currentBuffer[valueStart] === "{" ||
    currentBuffer[valueStart] === "["
  ) {
    // 对象或数组的处理
    let depth = 1;
    valueEnd = valueStart + 1;
    while (depth > 0 && valueEnd < currentBuffer.length) {
      if (currentBuffer[valueEnd] === "{" || currentBuffer[valueEnd] === "[")
        depth++;
      if (currentBuffer[valueEnd] === "}" || currentBuffer[valueEnd] === "]")
        depth--;
      valueEnd++;
    }
    if (depth !== 0) return null;
    try {
      value = JSON.parse(currentBuffer.slice(valueStart, valueEnd));
    } catch {
      return null;
    }
  } else {
    // 其他值类型的处理
    valueEnd = currentBuffer.indexOf(",", valueStart);
    if (valueEnd === -1) valueEnd = currentBuffer.indexOf("}", valueStart);
    if (valueEnd === -1) return null;
    const rawValue = currentBuffer.slice(valueStart, valueEnd).trim();
    if (rawValue === "true") value = true;
    else if (rawValue === "false") value = false;
    else if (rawValue === "null") value = null;
    else if (!isNaN(Number(rawValue))) value = Number(rawValue);
    else return null;
  }

  // 最终更新完整值
  const key = currentBuffer.slice(keyStart + 1, keyEnd);
  setParsedData((prevData: object) => ({ ...prevData, [key]: value }));

  return valueEnd;
};

// 添加新的工具函数
export function formatMessageText(text: string) {
  return text
    .replace(/\\n/g, "\n") // 将 \n 字符串转换为实际的换行符
    .replace(/\n/g, "  \n"); // 确保每行末尾有两个空格，这是 Markdown 的换行语法
}
