type LoadingStateProps = {
  title: string;
  testId?: string;
};

//SSR component

export default function LoadingState({ title, testId }: LoadingStateProps) {
  return (
    <div
      className="flex flex-col items-center justify-center mt-12 min-h-500px w-full space-y-4"
      data-testid={testId}
    >
      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      <h2 className="text-xl font-medium text-muted-foreground">{title}</h2>
    </div>
  );
}
