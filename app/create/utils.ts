import { readStreamableValue, StreamableValue } from "ai/rsc";
import { Dispatch, SetStateAction } from "react";

export async function handleStream<T>(
  getStream: () => Promise<StreamableValue<T>>,
  setStream: Dispatch<SetStateAction<T>>,
) {
  for await (const content of readStreamableValue(await getStream())) {
    setStream(content as T);
  }
}
