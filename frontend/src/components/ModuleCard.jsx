export default function ModuleCard({ mod, onOpen }) {
  return (
    <div
      className="card hover:scale-[1.02] transition-transform cursor-pointer"
      onClick={() => onOpen(mod)}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg neon">{mod.title}</h3>
        <span className="text-sm px-2 py-1 rounded bg-[#001c26]">
          {mod.difficulty}
        </span>
      </div>
      <p className="mt-2 text-sm text-[#bfeefcaa]">{mod.description}</p>
      <div className="mt-3 flex gap-2 text-xs">
        {mod.tags?.slice(0, 3).map((t) => (
          <span key={t} className="text-[#89f3ff]">
            #{t}
          </span>
        ))}
      </div>
    </div>
  );
}
