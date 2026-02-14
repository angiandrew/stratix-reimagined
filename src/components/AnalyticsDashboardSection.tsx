import { BarChart3, TrendingUp, Users, PhoneIncoming } from "lucide-react";

const miniChartPath = "M0,40 Q15,35 30,28 T60,20 T90,15 T120,8 T150,5 T180,2";
const miniChartPath2 = "M0,38 Q20,30 40,25 T80,18 T120,10 T160,6 T180,3";

const AnalyticsDashboardSection = () => (
  <section className="section-light py-24">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[hsl(var(--primary))] mb-4">
          Transparency & Analytics
        </span>
        <h2 className="text-3xl md:text-5xl font-bold mb-4" style={{ color: "hsl(var(--light-fg))" }}>
          Insights that drive decisions
        </h2>
        <p className="text-light-muted max-w-xl mx-auto">
          Real-time dashboards and AI-generated insights so you always know what's working.
        </p>
      </div>

      {/* Dashboard mockup */}
      <div className="max-w-5xl mx-auto rounded-2xl border overflow-hidden shadow-xl" style={{ borderColor: "hsl(var(--light-border))", background: "hsl(var(--light-card))" }}>
        {/* Top bar */}
        <div className="flex items-center gap-2 px-6 py-4 border-b" style={{ borderColor: "hsl(var(--light-border))" }}>
          <div className="h-3 w-3 rounded-full" style={{ background: "hsl(0, 70%, 65%)" }} />
          <div className="h-3 w-3 rounded-full" style={{ background: "hsl(40, 80%, 60%)" }} />
          <div className="h-3 w-3 rounded-full" style={{ background: "hsl(var(--success))" }} />
          <span className="ml-4 text-xs font-medium text-light-muted">StratixOS Analytics Dashboard</span>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px" style={{ background: "hsl(var(--light-border))" }}>
          {[
            { label: "Calls Handled", value: "2,847", change: "+23%", icon: PhoneIncoming },
            { label: "Leads Captured", value: "1,204", change: "+31%", icon: Users },
            { label: "Conversion Rate", value: "34.2%", change: "+8.4%", icon: TrendingUp },
            { label: "Revenue Impact", value: "$184K", change: "+41%", icon: BarChart3 },
          ].map((stat) => (
            <div key={stat.label} className="p-6" style={{ background: "hsl(var(--light-card))" }}>
              <div className="flex items-center gap-2 mb-2">
                <stat.icon size={16} className="text-light-muted" style={{ color: "hsl(var(--light-muted))" }} />
                <span className="text-xs text-light-muted">{stat.label}</span>
              </div>
              <div className="text-2xl font-bold" style={{ color: "hsl(var(--light-fg))" }}>{stat.value}</div>
              <span className="text-xs font-medium" style={{ color: "hsl(var(--success))" }}>{stat.change}</span>
            </div>
          ))}
        </div>

        {/* Charts area */}
        <div className="grid md:grid-cols-2 gap-px" style={{ background: "hsl(var(--light-border))" }}>
          {/* Chart 1 */}
          <div className="p-6" style={{ background: "hsl(var(--light-card))" }}>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold" style={{ color: "hsl(var(--light-fg))" }}>Call Volume</span>
              <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: "hsl(var(--success-light))", color: "hsl(var(--success))" }}>
                Last 30 days
              </span>
            </div>
            <div className="h-32 relative">
              <svg viewBox="0 0 180 45" className="w-full h-full" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="greenGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(152, 60%, 45%)" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="hsl(152, 60%, 45%)" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d={miniChartPath + " L180,45 L0,45 Z"} fill="url(#greenGrad)" />
                <path d={miniChartPath} fill="none" stroke="hsl(152, 60%, 45%)" strokeWidth="2" />
              </svg>
            </div>
          </div>

          {/* Chart 2 */}
          <div className="p-6" style={{ background: "hsl(var(--light-card))" }}>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold" style={{ color: "hsl(var(--light-fg))" }}>Lead Conversion</span>
              <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: "hsl(var(--success-light))", color: "hsl(var(--success))" }}>
                Trending up
              </span>
            </div>
            <div className="h-32 relative">
              <svg viewBox="0 0 180 45" className="w-full h-full" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="greenGrad2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(152, 60%, 45%)" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="hsl(152, 60%, 45%)" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d={miniChartPath2 + " L180,45 L0,45 Z"} fill="url(#greenGrad2)" />
                <path d={miniChartPath2} fill="none" stroke="hsl(152, 60%, 45%)" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </div>

        {/* Bar chart row */}
        <div className="p-6" style={{ background: "hsl(var(--light-card))" }}>
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-semibold" style={{ color: "hsl(var(--light-fg))" }}>Weekly Performance</span>
          </div>
          <div className="flex items-end gap-2 h-24">
            {[65, 78, 55, 88, 72, 95, 82].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full rounded-t-md transition-all"
                  style={{ height: `${h}%`, background: `hsl(152, 60%, ${40 + i * 3}%)` }}
                />
                <span className="text-[10px] text-light-muted">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default AnalyticsDashboardSection;
