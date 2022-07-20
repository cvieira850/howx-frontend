import { useQuery } from "react-query";
import { api } from "../services/apiClient";

type Request = {
  id: string;
  name: string;
  value: string;
  type_payment: string;
  createdAt: string;
}

type GetRequestsResponse = {
  requests: Request[];
}

export async function getRequests(): Promise<GetRequestsResponse> {
  const { data, headers } = await api.get('requests')
  console.log(data)
  // const totalCount = Number(headers['x-total-count']);

  const requests = data.map(request => {
    return {
      id: request.id,
      name: request.client.name,
      value: request.value / 100,
      type_payment: request.type_payment,
      createdAt: new Date(request.created_at).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }),
    }
  });
  return {
    requests
  }
}

export function useRequests ()  {
  return useQuery(['requests'], () => getRequests(), {
    staleTime: 1000 * 60 * 10,
  })
}
