// hooks/use-interval.ts

import { useEffect, useRef, useCallback } from "react";

export function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef<() => void>();

  // 记住最新的回调函数
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // 设置定时器
  useEffect(() => {
    function tick() {
      savedCallback.current?.();
    }

    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }

    return undefined;
  }, [delay]);
}
export const processChunk = (
  chunk: string,
  setData: any,
  bufferRef: any,
  setParsedData: (prevData: any) => void
) => {
  bufferRef.current += chunk;

  setData((prevData: any) => {
    const newData = prevData + chunk;
    // console.log("newData: ", newData);
    return newData;
  });

  const currentBuffer = bufferRef.current;
  let lastValidIndex = 0;

  const parseNextProperty = (startIndex: number): number | null => {
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

  while (true) {
    // console.log("currentBuffer: ", currentBuffer);
    const nextIndex = parseNextProperty(lastValidIndex);
    if (nextIndex === null) break;
    lastValidIndex = nextIndex;
  }

  bufferRef.current = currentBuffer.slice(lastValidIndex);
};
