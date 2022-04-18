import { useQuery } from "react-query";

async function useReactQuery(refrence, api) {
  const { data, error, isLoading } = await useQuery(refrence, api);

  return { data: data.data, error, isLoading };
}
export { useReactQuery };
