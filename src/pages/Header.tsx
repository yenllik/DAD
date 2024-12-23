export default function Header() {
  const title = "Figure Skating Insights 2014-2022";
  const description =
    "Interactive insights into championships, skaters, scores, and participation trends";
  return (
    <div className="flex justify-between items-center mb-4">
      <div className="bg-white rounded-[14px] px-4 pt-2 pb-4">
        <h2 className="text-sm font-bold">{title}</h2>
        <p className="text-xs text-gray-500">{description}</p>
      </div>
      {/* load logo from public/icons/logo.svg */}
      <img src="/icons/logo.svg" alt="logo" className="w-16 h-16" />
    </div>
  );
}
