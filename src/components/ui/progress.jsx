export function Progress({ value, className = "" }) {
  return (
    <div className={`w-full bg-gray-200 rounded-full h-4 ${className}`}>
      <div
        className="bg-green-500 h-4 rounded-full transition-all"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}
