import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../../store/useAuth";
import axiosClient from "../../config/axios-client";
import { ITournamentResponse } from "../../endpoints/tournament/types";
import { tournamentGetById } from "../../endpoints/tournament/endpoints";
import { generateHeaders } from "@/api/utils/HeaderEncoder";

export function GetTournamentById(tournamentId: string) {
  const { sessionId, userId, wallet } = useAuth();

  const headers = generateHeaders({
    method: tournamentGetById(userId as string, tournamentId).method,
    endpoint: tournamentGetById(userId as string, tournamentId).endpoint,
    payload: undefined,
    wallet,
    sessionId,
    userId,
  });

  const handleGetTournamentById = async (): Promise<ITournamentResponse> => {
    if (!userId) throw new Error("User ID is required");
    if (!tournamentId) throw new Error("TournamentId ID is required");
    const data = await axiosClient
      .get(tournamentGetById(userId, tournamentId).endpoint, { headers })
      .then((res) => res.data as ITournamentResponse);
    return data;
  };

  return useQuery({
    queryKey: ["get-tournament-by-id", tournamentId],
    queryFn: handleGetTournamentById,
    refetchOnWindowFocus: false,
    //enabled: !!userId && !!tournamentId,
  });
}
