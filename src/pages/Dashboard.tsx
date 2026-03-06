import { useState, useEffect, useMemo } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip as RechartsTooltip } from "recharts";
import {
  Phone, Clock, CalendarCheck, LogOut, User, Shield, FileText,
  LayoutDashboard, MessageSquare, BarChart2, Settings,
  TrendingUp, Bell, Search, Users, ChevronLeft, ChevronRight,
} from "lucide-react";
import { toast } from "sonner";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import stratixLogo from "@/assets/stratixos-logo.png";
import PeakHoursHeatmap from "@/components/dashboard/PeakHoursHeatmap";
import SentimentChart from "@/components/dashboard/SentimentChart";

interface Call {
  call_id: string;
  user_id: string;
  assistant_name: string | null;
  customer_phone_number: string | null;
  transcript: string | null;
  call_type: string | null;
  ended_reason: string | null;
  start_time: string | null;
  duration_seconds: number | null;
  cost_usd: number | null;
  created_at: string;
  user_sentiment: string | null;
  appointment_booked: boolean;
}

interface ClientOption {
  id: string;
  email: string | null;
  display_name: string | null;
}

const SENTIMENT_COLORS: Record<string, string> = {
  Positive: "hsl(200, 80%, 55%)",
  Negative: "hsl(250, 60%, 55%)",
  Neutral: "hsl(45, 90%, 55%)",
  Unknown: "hsl(210, 15%, 65%)",
};

const Dashboard = () => {
  const { user, signOut, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [calls, setCalls] = useState<Call[]>([]);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState("30");

  const [clients, setClients] = useState<ClientOption[]>([]);
  const viewingUserId = searchParams.get("user") || user?.id || "";
  const viewingClient = clients.find((c) => c.id === viewingUserId);

  useEffect(() => {
    if (!isAdmin) return;
    const fetchClients = async () => {
      const { data } = await supabase.from("profiles").select("id, email, display_name");
      if (data) setClients(data);
    };
    fetchClients();
  }, [isAdmin]);

  const fetchCalls = async () => {
    setLoading(true);
    const daysAgo = new Date();
    daysAgo.setDate(daysAgo.getDate() - parseInt(dateRange));

    let query = supabase
      .from("calls")
      .select("*")
      .gte("created_at", daysAgo.toISOString())
      .order("created_at", { ascending: false });

    if (isAdmin && viewingUserId && viewingUserId !== "all") {
      query = query.eq("user_id", viewingUserId);
    }

    const { data, error } = await query;
    if (error) {
      toast.error("Failed to load calls");
    } else {
      setCalls((data as Call[]) || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!user) return;
    fetchCalls();

    const channel = supabase
      .channel("calls-realtime")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "calls" }, (payload) => {
        const newCall = payload.new as Call;
        if (!isAdmin || viewingUserId === "all" || newCall.user_id === viewingUserId) {
          setCalls((prev) => [newCall, ...prev]);
          toast.success("New call received!");
        }
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [dateRange, viewingUserId, user]);

  const formatDuration = (seconds: number) => {
    if (seconds < 60) return `${seconds}s`;
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return s > 0 ? `${m}m ${s}s` : `${m}m`;
  };

  const metrics = useMemo(() => {
    const totalCalls = calls.length;
    const totalDuration = calls.reduce((sum, c) => sum + (c.duration_seconds || 0), 0);
    const appointmentsBooked = calls.filter((c) => c.appointment_booked).length;
    return { totalCalls, totalDuration, appointmentsBooked };
  }, [calls]);

  const chartData = useMemo(() => {
    const days = parseInt(dateRange);
    const now = new Date();
    const dateMap: Record<string, number> = {};
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      dateMap[d.toLocaleDateString("en-US", { month: "short", day: "numeric" })] = 0;
    }
    calls.forEach((c) => {
      const label = new Date(c.start_time || c.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" });
      if (label in dateMap) dateMap[label]++;
    });
    return Object.entries(dateMap).map(([date, calls]) => ({ date, calls }));
  }, [calls, dateRange]);

  const handleSignOut = async () => { await signOut(); navigate("/auth"); };

  const handleClientChange = (value: string) => {
    if (value === user?.id) { searchParams.delete("user"); setSearchParams(searchParams); }
    else setSearchParams({ user: value });
  };

  const viewingLabel = isAdmin && viewingUserId !== user?.id
    ? viewingClient?.display_name || viewingClient?.email || "All Clients"
    : null;

  // ── Frontend-only state ──────────────────────────────────────────────────────
  const [activePage, setActivePage] = useState<"overview" | "calls" | "conversations" | "analytics" | "settings">("overview");
  const [callSearch, setCallSearch] = useState("");
  const [callPage, setCallPage] = useState(1);
  const [txPage, setTxPage] = useState(1);
  const [txPageSize, setTxPageSize] = useState(10);

  // ── Frontend-only computed ───────────────────────────────────────────────────
  const conversionFunnel = useMemo(() => {
    const qualified = calls.filter((c) => c.user_sentiment === "Positive").length;
    return [
      { label: "Total Calls", value: metrics.totalCalls },
      { label: "Positive Sentiment", value: qualified },
      { label: "Appointments Booked", value: metrics.appointmentsBooked },
    ];
  }, [calls, metrics]);

  const conversionRate = metrics.totalCalls > 0
    ? ((metrics.appointmentsBooked / metrics.totalCalls) * 100).toFixed(1)
    : "0.0";

  // Per-client stats for admin god view (computed from already-fetched calls)
  const clientStats = useMemo(() => {
    if (!isAdmin) return [];
    return clients.map((client) => {
      const cc = calls.filter((c) => c.user_id === client.id);
      const appts = cc.filter((c) => c.appointment_booked).length;
      const dur = cc.reduce((s, c) => s + (c.duration_seconds || 0), 0);
      const rate = cc.length > 0 ? ((appts / cc.length) * 100).toFixed(1) : "0.0";
      return { ...client, totalCalls: cc.length, appointments: appts, totalDuration: dur, conversionRate: rate };
    });
  }, [calls, clients, isAdmin]);

  // Filtered + paginated calls
  const filteredCalls = useMemo(() => {
    if (!callSearch.trim()) return calls;
    const q = callSearch.toLowerCase();
    return calls.filter((c) =>
      (c.customer_phone_number || "").includes(q) ||
      (c.assistant_name || "").toLowerCase().includes(q) ||
      (c.ended_reason || "").toLowerCase().includes(q)
    );
  }, [calls, callSearch]);
  const CALLS_PER_PAGE = 25;
  const callTotalPages = Math.ceil(filteredCalls.length / CALLS_PER_PAGE);
  const pagedCalls = filteredCalls.slice((callPage - 1) * CALLS_PER_PAGE, callPage * CALLS_PER_PAGE);

  // Paginated conversations (calls with transcripts)
  const callsWithTx = useMemo(() => calls.filter((c) => c.transcript), [calls]);
  const txTotalPages = Math.ceil(callsWithTx.length / txPageSize);
  const pagedTx = callsWithTx.slice((txPage - 1) * txPageSize, txPage * txPageSize);

  // Page title per section
  const PAGE_TITLES: Record<string, { title: string; sub: string }> = {
    overview:      { title: isAdmin && !viewingLabel ? "All Clients Overview" : viewingLabel || "Overview", sub: "AI agent performance across all accounts" },
    calls:         { title: "Calls", sub: "All inbound call records" },
    conversations: { title: "Conversations", sub: "Call transcripts and chat logs" },
    analytics:     { title: "Analytics", sub: "Charts and performance insights" },
    settings:      { title: "Settings", sub: "Account and agent configuration" },
  };

  const NAV_ITEMS: { icon: React.ElementType; label: string; page: typeof activePage }[] = [
    { icon: LayoutDashboard, label: "Overview",       page: "overview" },
    { icon: Phone,           label: "Calls",          page: "calls" },
    { icon: MessageSquare,   label: "Conversations",  page: "conversations" },
    { icon: BarChart2,       label: "Analytics",      page: "analytics" },
    { icon: Settings,        label: "Settings",       page: "settings" },
  ];

  const navBtn = (active: boolean): React.CSSProperties => ({
    display: "flex", alignItems: "center", gap: 10,
    padding: "8px 12px", borderRadius: 8, marginBottom: 2,
    fontSize: 13, fontWeight: active ? 600 : 400,
    color: active ? "#0f172a" : "#64748b",
    backgroundColor: active ? "#f1f5f9" : "transparent",
    background: active ? "#f1f5f9" : "none",
    border: "none", cursor: "pointer",
    width: "100%", textAlign: "left" as const,
    transition: "background 0.15s ease, color 0.15s ease",
  });

  // ── Shared sub-components (inline, purely visual) ────────────────────────────

  const CallsTable = ({ rows, showClient }: { rows: Call[]; showClient?: boolean }) => (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="border-border/50 hover:bg-transparent" style={{ backgroundColor: "#f8fafc" }}>
            <TableHead className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider pl-4">Date</TableHead>
            {showClient && <TableHead className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Client</TableHead>}
            <TableHead className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Agent</TableHead>
            <TableHead className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Customer</TableHead>
            <TableHead className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Duration</TableHead>
            <TableHead className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Sentiment</TableHead>
            <TableHead className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Appt</TableHead>
            <TableHead className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Outcome</TableHead>
            <TableHead className="text-[11px] pr-4"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((call) => {
            const clientName = showClient
              ? clients.find((c) => c.id === call.user_id)?.display_name || clients.find((c) => c.id === call.user_id)?.email || "—"
              : null;
            return (
              <TableRow key={call.call_id} className="border-border/30 hover:bg-muted/30 transition-colors">
                <TableCell className="text-sm pl-4 text-muted-foreground">
                  {call.start_time ? new Date(call.start_time).toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }) : "—"}
                </TableCell>
                {showClient && <TableCell className="text-sm font-medium">{clientName}</TableCell>}
                <TableCell className="text-sm font-medium">{call.assistant_name || "—"}</TableCell>
                <TableCell className="text-sm font-mono text-muted-foreground">{call.customer_phone_number || "—"}</TableCell>
                <TableCell className="text-sm">{call.duration_seconds ? formatDuration(call.duration_seconds) : "—"}</TableCell>
                <TableCell className="text-sm">
                  {call.user_sentiment ? (
                    <span className="inline-flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: SENTIMENT_COLORS[call.user_sentiment] || SENTIMENT_COLORS.Unknown }} />
                      <span className="text-muted-foreground">{call.user_sentiment}</span>
                    </span>
                  ) : <span className="text-muted-foreground/50">—</span>}
                </TableCell>
                <TableCell className="text-sm">
                  {call.appointment_booked ? <span style={{ color: "#10b981", fontWeight: 600 }}>✓</span> : <span className="text-muted-foreground/50">—</span>}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">{call.ended_reason || "—"}</TableCell>
                <TableCell className="pr-4">
                  {call.transcript && (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-muted-foreground hover:text-foreground">
                          <FileText className="h-3.5 w-3.5" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl max-h-[70vh] overflow-y-auto">
                        <DialogHeader><DialogTitle>Call Transcript</DialogTitle></DialogHeader>
                        <pre className="whitespace-pre-wrap text-sm text-muted-foreground leading-relaxed">{call.transcript}</pre>
                      </DialogContent>
                    </Dialog>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );

  const Pagination = ({ page, totalPages, onPage }: { page: number; totalPages: number; onPage: (p: number) => void }) => (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 16 }}>
      <span style={{ fontSize: 12, color: "#94a3b8" }}>Page {page} of {totalPages}</span>
      <div style={{ display: "flex", gap: 6 }}>
        <button
          onClick={() => onPage(Math.max(1, page - 1))} disabled={page === 1}
          style={{ display: "flex", alignItems: "center", gap: 4, padding: "5px 10px", borderRadius: 6, border: "1px solid #e8edf3", backgroundColor: page === 1 ? "#f8fafc" : "#fff", fontSize: 12, color: page === 1 ? "#cbd5e1" : "#374151", cursor: page === 1 ? "not-allowed" : "pointer" }}
        ><ChevronLeft size={13} /> Prev</button>
        <button
          onClick={() => onPage(Math.min(totalPages, page + 1))} disabled={page === totalPages}
          style={{ display: "flex", alignItems: "center", gap: 4, padding: "5px 10px", borderRadius: 6, border: "1px solid #e8edf3", backgroundColor: page === totalPages ? "#f8fafc" : "#fff", fontSize: 12, color: page === totalPages ? "#cbd5e1" : "#374151", cursor: page === totalPages ? "not-allowed" : "pointer" }}
        >Next <ChevronRight size={13} /></button>
      </div>
    </div>
  );

  const KpiCards = () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
      {[
        { label: "Total Calls",         value: metrics.totalCalls.toLocaleString(),         icon: Phone,        color: "#6366f1" },
        { label: "Total Duration",       value: formatDuration(metrics.totalDuration),       icon: Clock,        color: "#0ea5e9" },
        { label: "Appointments Booked",  value: metrics.appointmentsBooked.toLocaleString(), icon: CalendarCheck, color: "#10b981" },
        { label: "Lead Conversion",      value: `${conversionRate}%`,                        icon: TrendingUp,   color: "#f59e0b" },
      ].map((s) => (
        <Card key={s.label} className="border-border/50" style={{ backgroundColor: "#fff", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
          <CardContent className="p-5">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
              <span style={{ fontSize: 12, fontWeight: 500, color: "#64748b" }}>{s.label}</span>
              <div style={{ width: 32, height: 32, borderRadius: 8, backgroundColor: s.color + "14", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <s.icon size={15} style={{ color: s.color }} />
              </div>
            </div>
            <p style={{ fontSize: 26, fontWeight: 700, color: "#0f172a", margin: 0, letterSpacing: "-0.02em" }}>{s.value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const VolumeChart = () => (
    <Card className="border-border/50" style={{ backgroundColor: "#fff", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
      <CardContent className="p-6">
        <div style={{ marginBottom: 16 }}>
          <h3 style={{ fontSize: 13, fontWeight: 600, color: "#0f172a", margin: 0 }}>Call Volume</h3>
          <p style={{ fontSize: 12, color: "#94a3b8", margin: "2px 0 0" }}>Daily call counts over selected period</p>
        </div>
        <div className="h-56">
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="callGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.12} />
                    <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }} axisLine={false} tickLine={false} interval="preserveStartEnd" />
                <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }} axisLine={false} tickLine={false} allowDecimals={false} width={28} />
                <RechartsTooltip contentStyle={{ backgroundColor: "hsl(var(--popover))", border: "1px solid hsl(var(--border))", borderRadius: "6px", color: "hsl(var(--popover-foreground))", fontSize: 12, boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }} />
                <Area type="monotone" dataKey="calls" stroke="hsl(var(--primary))" fill="url(#callGrad)" strokeWidth={1.5} dot={false} name="Calls" />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground text-sm">No data yet</div>
          )}
        </div>
      </CardContent>
    </Card>
  );

  const FunnelCard = () => (
    <Card className="border-border/50" style={{ backgroundColor: "#fff", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
      <CardContent className="p-6">
        <div style={{ marginBottom: 20 }}>
          <h3 style={{ fontSize: 13, fontWeight: 600, color: "#0f172a", margin: 0 }}>Conversion Funnel</h3>
          <p style={{ fontSize: 12, color: "#94a3b8", margin: "2px 0 0" }}>Call pipeline performance</p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {conversionFunnel.map((step, i) => {
            const pct = conversionFunnel[0].value > 0 ? (step.value / conversionFunnel[0].value) * 100 : 0;
            const colors = ["#6366f1", "#0ea5e9", "#10b981"];
            return (
              <div key={step.label}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ fontSize: 12, color: "#64748b", fontWeight: 500 }}>{step.label}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: "#0f172a" }}>
                    {step.value.toLocaleString()} <span style={{ color: "#94a3b8", fontWeight: 400 }}>({pct.toFixed(0)}%)</span>
                  </span>
                </div>
                <div style={{ height: 8, borderRadius: 4, backgroundColor: "#f1f5f9" }}>
                  <div style={{ height: 8, borderRadius: 4, width: `${pct}%`, backgroundColor: colors[i], transition: "width 0.6s ease" }} />
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );

  // ── Page renderers ────────────────────────────────────────────────────────────

  const renderOverview = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Admin god view — per-client breakdown */}
      {isAdmin && !viewingLabel && clientStats.length > 0 && (
        <Card className="border-border/50" style={{ backgroundColor: "#fff", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
          <CardContent className="p-6">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
              <div>
                <h3 style={{ fontSize: 13, fontWeight: 600, color: "#0f172a", margin: 0 }}>Client Overview</h3>
                <p style={{ fontSize: 12, color: "#94a3b8", margin: "2px 0 0" }}>All accounts — click a row to drill in</p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#94a3b8" }}>
                <Users size={13} /> {clientStats.length} clients
              </div>
            </div>
            <Table>
              <TableHeader>
                <TableRow className="border-border/50 hover:bg-transparent" style={{ backgroundColor: "#f8fafc" }}>
                  <TableHead className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider pl-4">Client</TableHead>
                  <TableHead className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Calls</TableHead>
                  <TableHead className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Duration</TableHead>
                  <TableHead className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Appts</TableHead>
                  <TableHead className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Conversion</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {clientStats.map((c) => (
                  <TableRow
                    key={c.id}
                    className="border-border/30 hover:bg-muted/40 transition-colors"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleClientChange(c.id)}
                  >
                    <TableCell className="text-sm font-medium pl-4">{c.display_name || c.email || c.id.slice(0, 8)}</TableCell>
                    <TableCell className="text-sm">{c.totalCalls}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{formatDuration(c.totalDuration)}</TableCell>
                    <TableCell className="text-sm">{c.appointments}</TableCell>
                    <TableCell className="text-sm">
                      <span style={{
                        display: "inline-block", fontSize: 11, fontWeight: 600,
                        color: parseFloat(c.conversionRate) > 20 ? "#10b981" : "#64748b",
                        backgroundColor: parseFloat(c.conversionRate) > 20 ? "#f0fdf4" : "#f8fafc",
                        border: `1px solid ${parseFloat(c.conversionRate) > 20 ? "#bbf7d0" : "#e8edf3"}`,
                        borderRadius: 6, padding: "2px 8px",
                      }}>{c.conversionRate}%</span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Currently viewing a specific client — show back button */}
      {isAdmin && viewingLabel && (
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button
            onClick={() => handleClientChange(user?.id || "")}
            style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#6366f1", background: "none", border: "none", cursor: "pointer", fontWeight: 500 }}
          >
            <ChevronLeft size={14} /> Back to All Clients
          </button>
          <span style={{ fontSize: 12, color: "#94a3b8" }}>Viewing: <strong style={{ color: "#0f172a" }}>{viewingLabel}</strong></span>
        </div>
      )}

      <KpiCards />
      <VolumeChart />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <PeakHoursHeatmap calls={calls} />
        <SentimentChart calls={calls} />
      </div>
      <FunnelCard />
      {/* Recent calls preview — last 10 */}
      <Card className="border-border/50" style={{ backgroundColor: "#fff", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
        <CardContent className="p-6">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
            <h3 style={{ fontSize: 13, fontWeight: 600, color: "#0f172a", margin: 0 }}>Recent Calls</h3>
            <button
              onClick={() => setActivePage("calls")}
              style={{ fontSize: 12, color: "#6366f1", background: "none", border: "none", cursor: "pointer", fontWeight: 500 }}
            >View all →</button>
          </div>
          {loading ? (
            <div className="flex justify-center py-8"><div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary" /></div>
          ) : calls.length === 0 ? (
            <p className="text-center text-muted-foreground py-8 text-sm">No calls yet.</p>
          ) : (
            <CallsTable rows={calls.slice(0, 10)} showClient={isAdmin && !viewingLabel} />
          )}
        </CardContent>
      </Card>
    </div>
  );

  const renderCalls = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <KpiCards />
      <Card className="border-border/50" style={{ backgroundColor: "#fff", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
        <CardContent className="p-6">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
            <div>
              <h3 style={{ fontSize: 13, fontWeight: 600, color: "#0f172a", margin: 0 }}>All Calls</h3>
              <p style={{ fontSize: 12, color: "#94a3b8", margin: "2px 0 0" }}>{filteredCalls.length} records</p>
            </div>
            <div style={{ position: "relative" }}>
              <Search size={13} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />
              <input
                value={callSearch}
                onChange={(e) => { setCallSearch(e.target.value); setCallPage(1); }}
                placeholder="Search by phone or agent…"
                style={{ paddingLeft: 30, paddingRight: 12, height: 32, borderRadius: 8, border: "1px solid #e8edf3", fontSize: 12, color: "#374151", outline: "none", width: 220, backgroundColor: "#fff" }}
              />
            </div>
          </div>
          {loading ? (
            <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary" /></div>
          ) : pagedCalls.length === 0 ? (
            <p className="text-center text-muted-foreground py-12 text-sm">No calls match your search.</p>
          ) : (
            <>
              <CallsTable rows={pagedCalls} showClient={isAdmin && !viewingLabel} />
              {callTotalPages > 1 && <Pagination page={callPage} totalPages={callTotalPages} onPage={(p) => setCallPage(p)} />}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );

  const renderConversations = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Card className="border-border/50" style={{ backgroundColor: "#fff", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
        <CardContent className="p-6">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
            <div>
              <h3 style={{ fontSize: 13, fontWeight: 600, color: "#0f172a", margin: 0 }}>Conversations</h3>
              <p style={{ fontSize: 12, color: "#94a3b8", margin: "2px 0 0" }}>{callsWithTx.length} calls with transcripts</p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 12, color: "#64748b" }}>Per page:</span>
              <Select value={String(txPageSize)} onValueChange={(v) => { setTxPageSize(Number(v)); setTxPage(1); }}>
                <SelectTrigger className="h-8 w-[72px] text-xs"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="25">25</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary" /></div>
          ) : pagedTx.length === 0 ? (
            <p className="text-center text-muted-foreground py-12 text-sm">No transcripts available yet.</p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {pagedTx.map((call) => (
                <div key={call.call_id} style={{ border: "1px solid #e8edf3", borderRadius: 10, padding: "16px 18px", backgroundColor: "#fafbfc" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div>
                        <p style={{ fontSize: 13, fontWeight: 600, color: "#0f172a", margin: 0 }}>
                          {call.customer_phone_number || "Unknown caller"}
                        </p>
                        <p style={{ fontSize: 11, color: "#94a3b8", margin: "2px 0 0" }}>
                          {call.start_time ? new Date(call.start_time).toLocaleString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" }) : "—"}
                          {call.assistant_name ? ` · ${call.assistant_name}` : ""}
                          {call.duration_seconds ? ` · ${formatDuration(call.duration_seconds)}` : ""}
                        </p>
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      {call.user_sentiment && (
                        <span style={{
                          fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 6,
                          backgroundColor: SENTIMENT_COLORS[call.user_sentiment] + "18",
                          color: SENTIMENT_COLORS[call.user_sentiment],
                          border: `1px solid ${SENTIMENT_COLORS[call.user_sentiment]}30`,
                        }}>{call.user_sentiment}</span>
                      )}
                      {call.appointment_booked && (
                        <span style={{ fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 6, backgroundColor: "#f0fdf4", color: "#10b981", border: "1px solid #bbf7d0" }}>Appt Booked</span>
                      )}
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" className="h-7 text-xs gap-1.5">
                            <FileText className="h-3 w-3" /> View Transcript
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl max-h-[70vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>
                              {call.customer_phone_number || "Call"} — {call.start_time ? new Date(call.start_time).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : ""}
                            </DialogTitle>
                          </DialogHeader>
                          <pre className="whitespace-pre-wrap text-sm text-muted-foreground leading-relaxed">{call.transcript}</pre>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                  {/* Transcript preview */}
                  <p style={{ fontSize: 12, color: "#64748b", lineHeight: 1.6, margin: 0, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as const }}>
                    {call.transcript?.slice(0, 200)}…
                  </p>
                </div>
              ))}
              {txTotalPages > 1 && <Pagination page={txPage} totalPages={txTotalPages} onPage={(p) => setTxPage(p)} />}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );

  const renderAnalytics = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <KpiCards />
      <VolumeChart />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <PeakHoursHeatmap calls={calls} />
        <SentimentChart calls={calls} />
      </div>
      <FunnelCard />
    </div>
  );

  const renderSettings = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 560 }}>
      <Card className="border-border/50" style={{ backgroundColor: "#fff", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
        <CardContent className="p-6">
          <h3 style={{ fontSize: 13, fontWeight: 600, color: "#0f172a", margin: "0 0 16px" }}>Account</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #f1f5f9" }}>
              <span style={{ fontSize: 13, color: "#64748b" }}>Email</span>
              <span style={{ fontSize: 13, fontWeight: 500, color: "#0f172a" }}>{user?.email || "—"}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #f1f5f9" }}>
              <span style={{ fontSize: 13, color: "#64748b" }}>Role</span>
              <span style={{ fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 6, backgroundColor: isAdmin ? "#eff6ff" : "#f8fafc", color: isAdmin ? "#6366f1" : "#64748b", border: `1px solid ${isAdmin ? "#c7d2fe" : "#e8edf3"}` }}>
                {isAdmin ? "Admin" : "Client"}
              </span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0" }}>
              <span style={{ fontSize: 13, color: "#64748b" }}>User ID</span>
              <span style={{ fontSize: 11, fontFamily: "monospace", color: "#94a3b8" }}>{user?.id?.slice(0, 16)}…</span>
            </div>
          </div>
        </CardContent>
      </Card>
      <div style={{ display: "flex", gap: 10 }}>
        <Button variant="outline" size="sm" onClick={() => navigate("/profile")} className="gap-1.5 text-xs">
          <User className="h-3.5 w-3.5" /> Edit Profile
        </Button>
        {isAdmin && (
          <Button variant="outline" size="sm" onClick={() => navigate("/admin")} className="gap-1.5 text-xs">
            <Shield className="h-3.5 w-3.5" /> Admin Panel
          </Button>
        )}
        <Button variant="outline" size="sm" onClick={handleSignOut} className="gap-1.5 text-xs text-red-500 hover:text-red-600">
          <LogOut className="h-3.5 w-3.5" /> Sign Out
        </Button>
      </div>
    </div>
  );

  return (
    <div className="dashboard-light" style={{ minHeight: "100vh", display: "flex", backgroundColor: "#f8fafc" }}>

      {/* ── Left Sidebar ── */}
      <aside style={{
        width: 220, flexShrink: 0,
        position: "fixed", top: 0, bottom: 0, left: 0, zIndex: 40,
        backgroundColor: "#ffffff", borderRight: "1px solid #e8edf3",
        display: "flex", flexDirection: "column",
      }}>
        <div style={{ padding: "18px 20px 14px", borderBottom: "1px solid #f1f5f9" }}>
          <Link to="/"><img src={stratixLogo} alt="StratixOS" style={{ height: 26 }} /></Link>
        </div>

        <nav style={{ flex: 1, padding: "10px 8px", overflowY: "auto" }}>
          {NAV_ITEMS.map(({ icon: Icon, label, page }) => (
            <button key={label} onClick={() => setActivePage(page)} style={navBtn(activePage === page)}>
              <Icon size={15} />
              {label}
            </button>
          ))}
        </nav>

        <div style={{ padding: "12px 8px", borderTop: "1px solid #f1f5f9" }}>
          {isAdmin && (
            <button onClick={() => navigate("/admin")} style={navBtn(false)}>
              <Shield size={15} /> Admin Panel
            </button>
          )}
          <button onClick={() => navigate("/profile")} style={navBtn(false)}>
            <User size={15} /> Profile
          </button>
          <button onClick={() => navigate("/")} style={navBtn(false)}>
            <ChevronLeft size={15} /> Back to Website
          </button>
          <button onClick={handleSignOut} style={{ ...navBtn(false), color: "#ef4444" }}>
            <LogOut size={15} /> Sign Out
          </button>
        </div>
      </aside>

      {/* ── Right panel ── */}
      <div style={{ marginLeft: 220, flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>

        {/* Top header */}
        <header style={{
          position: "sticky", top: 0, zIndex: 30,
          backgroundColor: "#ffffff", borderBottom: "1px solid #e8edf3",
          padding: "0 28px", height: 60,
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <div>
            <h1 style={{ fontSize: 15, fontWeight: 600, color: "#0f172a", margin: 0 }}>
              {PAGE_TITLES[activePage].title}
            </h1>
            <p style={{ fontSize: 12, color: "#94a3b8", margin: 0 }}>{PAGE_TITLES[activePage].sub}</p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {isAdmin && clients.length > 0 && (
              <Select value={viewingUserId || "all"} onValueChange={handleClientChange}>
                <SelectTrigger className="h-8 w-[180px] text-xs"><SelectValue placeholder="Select client" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Clients</SelectItem>
                  {clients.map((c) => <SelectItem key={c.id} value={c.id}>{c.display_name || c.email || c.id.slice(0, 8)}</SelectItem>)}
                </SelectContent>
              </Select>
            )}
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="h-8 w-[130px] text-xs"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="7">Last 7 days</SelectItem>
                <SelectItem value="30">Last 30 days</SelectItem>
                <SelectItem value="90">Last 90 days</SelectItem>
              </SelectContent>
            </Select>
            <button style={{ width: 32, height: 32, borderRadius: 8, border: "1px solid #e8edf3", backgroundColor: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#94a3b8" }}>
              <Bell size={15} />
            </button>
          </div>
        </header>

        <main style={{ padding: "28px" }}>
          {activePage === "overview"      && renderOverview()}
          {activePage === "calls"         && renderCalls()}
          {activePage === "conversations" && renderConversations()}
          {activePage === "analytics"     && renderAnalytics()}
          {activePage === "settings"      && renderSettings()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
