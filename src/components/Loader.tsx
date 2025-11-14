export default function Loader({ size = 32 }: { size?: number }) {
  return (
    <div className="flex justify-center items-center py-10">
      <div
        className="animate-spin rounded-full border-4 border-muted border-t-primary"
        style={{ width: size, height: size }}
      ></div>
    </div>
  );
}