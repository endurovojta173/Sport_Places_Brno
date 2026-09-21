import LoadingState from "@/components/LoadingState";

export default function Loading() {
  return (
    <LoadingState
      title="Načítám sportoviště..."
      testId="map-loading"
    />
  );
}