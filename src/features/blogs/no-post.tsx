export default function NoPost() {
  return (
    <div className="flex flex-col items-center py-12 justify-center">
      <img
        src="/no-post.svg"
        alt="No post illustrator"
        className="w-72 h-auto"
      />
      <p className="text-muted-foreground">No articles found.</p>
    </div>
  );
}
