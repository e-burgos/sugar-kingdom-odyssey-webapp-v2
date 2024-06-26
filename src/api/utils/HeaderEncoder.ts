/* eslint-disable @typescript-eslint/no-explicit-any */
import sha256 from "@cryptography/sha256";

export type MethodType = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export interface HeadersGenerator {
  data?: any; // used for GET calls
  payload?: any; // used for POST/PUT calls (body)
  method: MethodType;
  endpoint: string;
  wallet: string | null;
  sessionId: string | null;
  userId: string | null;
}

const noonObject = {};

export const encodeMesage = (message: string) => {
  return sha256(message, "hex");
};

export const getStringifiedObject = (payload: any) => {
  if (!payload) return "";
  if (typeof payload === "string") {
    // it is already stringified, mostly it comes like this when calling from unity
    return payload;
  } else {
    return JSON.stringify(payload);
  }
};

export const getEncodedPayloadObj = (
  encodedPayload: string | null,
  payload: any
) => {
  if (encodedPayload) {
    return { "xxx-payload": encodedPayload, payload: JSON.stringify(payload) };
  } else {
    return noonObject;
  }
};

export const generateHeaders = ({
  method,
  endpoint,
  payload,
  wallet,
  sessionId,
  userId,
}: HeadersGenerator) => {
  if (!sessionId || !userId || !wallet) return {};

  const currentTime = new Date().getTime();

  const strPayload = getStringifiedObject(payload);

  const encodedEnpoint = encodeMesage(`${sessionId}_${method}_${endpoint}`);
  const encodedPayload = payload
    ? encodeMesage(`${sessionId}_${strPayload}`)
    : "";
  const encodedWallet = encodeMesage(`${sessionId}_${wallet}`);
  const encodedTimestamp = encodeMesage(`${sessionId}_${currentTime}`);
  const encodedHeaders = encodeMesage(
    `${sessionId}_${encodedEnpoint}_${encodedPayload}_${encodedWallet}_${encodedTimestamp}`
  );

  // we have this to handle the case the request doesn't have a payload
  const encodedPaylodObj = getEncodedPayloadObj(encodedPayload, payload);

  const headers = {
    "xxx-endpoint": encodedEnpoint,
    "xxx-wallet": encodedWallet,
    "xxx-timestamp": encodedTimestamp,
    "xxx-headers": encodedHeaders,
    timestamp: currentTime,
    version: "v1",
    sessionId: sessionId.slice(0, 6),
    userId,
    ...encodedPaylodObj,
  };

  return headers;
};
