import { useQuery } from "react-query";
import { api } from "../services/apiClient";

type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

type GetUsersResponse = {
  users: User[];
}

export async function getUsers(): Promise<GetUsersResponse> {
  const { data, headers } = await api.get('users', {})

  const users = data.map(user => {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: new Date(user.created_at).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }),
    }
  });
  return {
    users
  }
}

export function useUsers ()  {
  return useQuery(['users'], () => getUsers(), {
    staleTime: 1000 * 60 * 10,
  })
}
