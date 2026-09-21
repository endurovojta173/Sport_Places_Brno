import LoadingState from "@/components/LoadingState";

export default function Loading() {
  return (
    <LoadingState
      title="Načítám detail sportoviště..."
      testId="map-detail-loading"
    />
  );
}