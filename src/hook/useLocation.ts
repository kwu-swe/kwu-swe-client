import locationApi from "@/connection/api/location";
import { CreateLocation } from "@/types/Location";
import { useMutation, useQuery } from "@tanstack/react-query";

export default function useLocation() {
  const { mutate, isSuccess } = useMutation({
    mutationFn: (createLocation: CreateLocation) =>
      locationApi.post(createLocation),
  });
  const { data: locations } = useQuery({
    queryKey: ["getLocations", isSuccess],
    queryFn: locationApi.get,
  });

  return { mutate, locations };
}
