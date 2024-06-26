import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/store/useAuth";
import axiosClient from "@/api/config/axios-client";
import { generateHeaders } from "@/api/utils/HeaderEncoder";
import { usePaginationStore } from "@/store/usePagination";
import { tournamentGetAllPaginated } from "@/api/endpoints/tournament/endpoints";
import { ITournamentGetAllPaginatedResponse } from "@/api/endpoints/tournament/types";

export function GetTournaments(page: number, pageSize: number) {
  const { setTotalPages, setTotalRecords } = usePaginationStore();
  const { sessionId, userId, wallet } = useAuth();

  const headers = generateHeaders({
    method: tournamentGetAllPaginated(userId as string, page, pageSize).method,
    endpoint: tournamentGetAllPaginated(userId as string, page, pageSize)
      .endpoint,
    payload: undefined,
    wallet,
    sessionId,
    userId,
  });

  const handleGetTournaments =
    async (): Promise<ITournamentGetAllPaginatedResponse> => {
      if (!userId) throw new Error("User ID is required");
      const data = await axiosClient
        .get(tournamentGetAllPaginated(userId, page, pageSize).endpoint, {
          headers,
        })
        .then((res) => res.data as ITournamentGetAllPaginatedResponse);
      setTotalPages(data.totalPages);
      setTotalRecords(data.totalRecords);
      return data;
    };

  return useQuery({
    queryKey: ["get-tournaments", page, pageSize],
    queryFn: handleGetTournaments,
    refetchOnWindowFocus: false,
    //enabled: !!userId,
  });
}
