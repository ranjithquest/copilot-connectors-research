import type { adoPlanningItems } from "@/data/research";

type AdoItem = (typeof adoPlanningItems)[number];

const priorityColors = {
  HIGH: "bg-red-100 text-red-700 border-red-200",
  MEDIUM: "bg-amber-100 text-amber-700 border-amber-200",
  LOW: "bg-slate-100 text-slate-600 border-slate-200",
  INFO: "bg-slate-100 text-slate-600 border-slate-200",
};

function AdoCard({ item }: { item: AdoItem }) {
  const isPlaceholder = item.adoUrl.startsWith("PLACEHOLDER");
  const colors = priorityColors[item.priority];

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 hover:border-[#0078D4] hover:shadow-md transition-all duration-200">
      <div className="flex items-start justify-between gap-2 mb-3 min-w-0">
        <span className={`inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full border shrink-0 ${colors}`}>
          {item.priority}
        </span>
        {isPlaceholder && (
          <span className="text-xs bg-slate-100 text-slate-500 border border-slate-200 rounded px-2 py-0.5 font-mono shrink-0">
            TODO: Add URL
          </span>
        )}
      </div>

      <h3 className="text-sm font-bold text-[#1a2a3a] leading-snug mb-1.5">{item.label}</h3>
      <p className="text-xs text-slate-500 leading-relaxed mb-4">{item.description}</p>

      {isPlaceholder ? (
        <div className="flex items-center gap-2 text-slate-400 text-xs border border-dashed border-slate-300 rounded-lg px-3 py-2 min-w-0">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
            <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
          </svg>
          <span className="font-mono text-xs truncate">{item.adoUrl}</span>
        </div>
      ) : (
        <a
          href={item.adoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-[#0078D4] text-xs font-medium hover:underline"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
            <path d="M15 3h6v6" />
            <path d="M10 14L21 3" />
          </svg>
          Open in Azure DevOps
        </a>
      )}
    </div>
  );
}

interface AdoSectionProps {
  items: AdoItem[];
}

export function AdoSection({ items }: AdoSectionProps) {
  return (
    <div>
      <div className="mb-5 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-[#0078D4] font-medium">
          <strong>Note:</strong> Replace <code className="font-mono text-xs bg-blue-100 px-1.5 py-0.5 rounded">PLACEHOLDER_ADO_URL_*</code> values in{" "}
          <code className="font-mono text-xs bg-blue-100 px-1.5 py-0.5 rounded">data/research.ts</code> with real Azure DevOps work item URLs.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <AdoCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
