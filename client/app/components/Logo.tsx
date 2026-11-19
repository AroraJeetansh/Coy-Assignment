export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-end leading-none ${className}`}>
      <span className="text-[1.7rem] font-black tracking-tight text-coy-ink">
        coy
      </span>
      <span
        aria-hidden
        className="mb-[0.38rem] ml-[1px] h-[0.42rem] w-[0.42rem] rounded-full bg-coy-pink"
      />
    </span>
  );
}
