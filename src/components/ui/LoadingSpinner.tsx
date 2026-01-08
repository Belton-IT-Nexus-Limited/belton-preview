export function LoadingSpinner(): JSX.Element {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="w-8 h-8 border-4 border-border border-t-accent rounded-full animate-spin" />
    </div>
  )
}
