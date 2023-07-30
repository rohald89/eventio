import { useParam } from "@blitzjs/next";
import { useRouter } from "next/router";

export const useStringParam = (name: string) => useParam(name, "string");
export const useStringQueryParam = (name: string) => {
  const { query } = useRouter();
  return query[name] as string | undefined;
};
