import { useState, useEffect, useMemo } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip as RechartsTooltip } from "recharts";
import { Phone, Clock, CalendarCheck, LogOut, User, Shield, FileText } from "lucide-react";
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

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navbar */}
      <header className="border-b border-border/30 sticky top-0 z-50 bg-background/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-14">
          <Link to="/"><img src={stratixLogo} alt="StratixOS" className="h-7" /></Link>
          <div className="flex items-center gap-1">
            {isAdmin && (
              <Button variant="ghost" size="sm" onClick={() => navigate("/admin")} className="text-xs gap-1.5 text-muted-foreground hover:text-foreground">
                <Shield className="h-3.5 w-3.5" /> Admin
              </Button>
            )}
            <Button variant="ghost" size="sm" onClick={() => navigate("/profile")} className="text-xs gap-1.5 text-muted-foreground hover:text-foreground">
              <User className="h-3.5 w-3.5" /> Profile
            </Button>
            <Button variant="ghost" size="sm" onClick={handleSignOut} className="text-xs gap-1.5 text-muted-foreground hover:text-foreground">
              <LogOut className="h-3.5 w-3.5" /> Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold tracking-tight">
              {viewingLabel ? `${viewingLabel}` : "Overview"}
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">Your AI agent performance</p>
          </div>
          <div className="flex items-center gap-2">
            {isAdmin && clients.length > 0 && (
              <Select value={viewingUserId || "all"} onValueChange={handleClientChange}>
                <SelectTrigger className="h-8 w-[180px] text-xs border-border/30 bg-transparent"><SelectValue placeholder="Select client" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Clients</SelectItem>
                  {clients.map((c) => <SelectItem key={c.id} value={c.id}>{c.display_name || c.email || c.id.slice(0, 8)}</SelectItem>)}
                </SelectContent>
              </Select>
            )}
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="h-8 w-[130px] text-xs border-border/30 bg-transparent"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="7">Last 7 days</SelectItem>
                <SelectItem value="30">Last 30 days</SelectItem>
                <SelectItem value="90">Last 90 days</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Stat cards — clean, flat */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: "Calls", value: metrics.totalCalls.toLocaleString(), icon: Phone },
            { label: "Total Duration", value: formatDuration(metrics.totalDuration), icon: Clock },
            { label: "Appointments Booked", value: metrics.appointmentsBooked.toLocaleString(), icon: CalendarCheck },
          ].map((s) => (
            <Card key={s.label} className="border-border/10">
              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <s.icon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-xs font-medium text-muted-foreground">{s.label}</span>
                </div>
                <p className="text-3xl font-semibold tracking-tight">{s.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call volume chart */}
        <Card className="border-border/10">
          <CardContent className="p-5">
            <div className="mb-4">
              <h3 className="text-sm font-medium">Call Volume</h3>
              <p className="text-xs text-muted-foreground">Daily call counts</p>
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
                    <XAxis
                      dataKey="date"
                      tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }}
                      axisLine={false}
                      tickLine={false}
                      interval="preserveStartEnd"
                    />
                    <YAxis
                      tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }}
                      axisLine={false}
                      tickLine={false}
                      allowDecimals={false}
                      width={28}
                    />
                    <RechartsTooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--popover))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "6px",
                        color: "hsl(var(--popover-foreground))",
                        fontSize: 12,
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="calls"
                      stroke="hsl(var(--primary))"
                      fill="url(#callGrad)"
                      strokeWidth={1.5}
                      dot={false}
                      name="Calls"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground text-sm">No data yet</div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Heatmap + Sentiment side by side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <PeakHoursHeatmap calls={calls} />
          <SentimentChart calls={calls} />
        </div>

        {/* Calls table */}
        <Card className="border-border/10">
          <CardContent className="p-5">
            <h3 className="text-sm font-medium mb-4">Recent Calls</h3>
            {loading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary" />
              </div>
            ) : calls.length === 0 ? (
              <p className="text-center text-muted-foreground py-12 text-sm">No calls yet. Configure your agent to start.</p>
            ) : (
              <div className="overflow-x-auto -mx-5">
                <Table>
                  <TableHeader>
                    <TableRow className="border-border/10 hover:bg-transparent">
                      <TableHead className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider pl-5">Date</TableHead>
                      <TableHead className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Agent</TableHead>
                      <TableHead className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Customer</TableHead>
                      <TableHead className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Duration</TableHead>
                      <TableHead className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Sentiment</TableHead>
                      <TableHead className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Appt</TableHead>
                      <TableHead className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Outcome</TableHead>
                      <TableHead className="text-[11px] pr-5"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {calls.map((call) => (
                      <TableRow key={call.call_id} className="border-border/5 hover:bg-muted/30 transition-colors">
                        <TableCell className="text-sm pl-5 text-muted-foreground">
                          {call.start_time ? new Date(call.start_time).toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }) : "—"}
                        </TableCell>
                        <TableCell className="text-sm">{call.assistant_name || "—"}</TableCell>
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
                        <TableCell className="text-sm">{call.appointment_booked ? <span className="text-primary">✓</span> : <span className="text-muted-foreground/50">—</span>}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{call.ended_reason || "—"}</TableCell>
                        <TableCell className="pr-5">
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
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;
