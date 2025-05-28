import locationApi from "@/service/api/location";
import { LocationCreate } from "@/types/Location";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export default function useLocation() {
  const [isCreateMode, setIsCreateMode] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const { mutate: post, } = useMutation({
    mutationKey: ['locationPost'],
    mutationFn: (locationCreate: LocationCreate) =>
      locationApi.post(locationCreate),
    onSuccess: () => {
      setIsCreateMode(false);
      queryClient.invalidateQueries({ queryKey: ['locationGet'] });
    }
  });
  const { data, isLoading } = useQuery({
    queryKey: ['locationGet'],
    queryFn: locationApi.get,
    staleTime: 0,
  });

  return {
    post, locations: data ?? [], isLoading, isCreateMode,
    setIsCreateMode
  };
}
