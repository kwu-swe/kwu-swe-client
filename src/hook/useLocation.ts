import locationApi from "@/connection/api/location";
import { CreateLocation, UpdateLocation } from "@/types/Location";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function useLocation() {
  const [isCreateMode, setIsCreateMode] = useState<boolean>(false);
  const { mutate: post, isSuccess: postSuccess } = useMutation({
    mutationFn: (createLocation: CreateLocation) =>
      locationApi.post(createLocation),
    onSuccess: () => setIsCreateMode(false)
  });

  // const { mutate: patch, isSuccess: patchSuccess } = useMutation({
  //   mutationFn: ({ id, data }: { id: number; data: UpdateLocation }) =>
  //     locationApi.patch(id, data)
  // });

  // const { mutate: remove, isSuccess: deleteSuccess } = useMutation({
  //   mutationFn: (id: number) => locationApi.delete(id)
  // });

  const { data, isLoading } = useQuery({
    queryKey: ["getLocations", postSuccess],
    queryFn: locationApi.get,
  });

  return {
    post, locations: data ?? [], isLoading, isCreateMode,
    setIsCreateMode
  };
}
