export default function BlogNotFound() {
  return (
    <div className="flex flex-col items-center py-12 justify-center">
      <img
        src="/not-found.svg"
        alt="No post illustrator"
        className="w-72 h-auto"
      />
      <p className="text-muted-foreground">
        The selected blog post is unavailable.
      </p>
    </div>
  );
}
