import { useState, useEffect, useMemo } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip, PieChart, Pie, Cell, Legend } from "recharts";
import { Phone, Clock, CalendarCheck, LogOut, User, Shield, FileText } from "lucide-react";
import { toast } from "sonner";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import stratixLogo from "@/assets/stratixos-logo.png";

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
  Unknown: "hsl(210, 15%, 70%)",
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
      console.error(error);
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

  // ── Metrics ──
  const metrics = useMemo(() => {
    const totalCalls = calls.length;
    const totalDuration = calls.reduce((sum, c) => sum + (c.duration_seconds || 0), 0);
    const appointmentsBooked = calls.filter((c) => c.appointment_booked).length;
    return { totalCalls, totalDuration, appointmentsBooked };
  }, [calls]);

  const formatDuration = (seconds: number) => {
    if (seconds < 60) return `${seconds}s`;
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return s > 0 ? `${m}m ${s}s` : `${m}m`;
  };

  // ── Chart data ──
  const chartData = useMemo(() => {
    const grouped: Record<string, { date: string; calls: number }> = {};
    calls.forEach((c) => {
      const date = new Date(c.start_time || c.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" });
      if (!grouped[date]) grouped[date] = { date, calls: 0 };
      grouped[date].calls++;
    });
    return Object.values(grouped).reverse();
  }, [calls]);

  // ── Sentiment data ──
  const sentimentData = useMemo(() => {
    const counts: Record<string, number> = {};
    calls.forEach((c) => {
      const s = c.user_sentiment || "Unknown";
      counts[s] = (counts[s] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [calls]);

  const handleSignOut = async () => {
    await signOut();
    navigate("/auth");
  };

  const handleClientChange = (value: string) => {
    if (value === user?.id) {
      searchParams.delete("user");
      setSearchParams(searchParams);
    } else {
      setSearchParams({ user: value });
    }
  };

  const viewingLabel = isAdmin && viewingUserId !== user?.id
    ? viewingClient?.display_name || viewingClient?.email || "All Clients"
    : null;

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <header className="border-b border-border/40 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <Link to="/">
            <img src={stratixLogo} alt="StratixOS" className="h-8" />
          </Link>
          <div className="flex items-center gap-3">
            {isAdmin && (
              <Button variant="ghost" size="sm" onClick={() => navigate("/admin")} className="gap-2">
                <Shield className="h-4 w-4" /> Admin
              </Button>
            )}
            <Button variant="ghost" size="sm" onClick={() => navigate("/profile")} className="gap-2">
              <User className="h-4 w-4" /> Profile
            </Button>
            <Button variant="ghost" size="sm" onClick={handleSignOut} className="gap-2">
              <LogOut className="h-4 w-4" /> Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Header + controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">
              {viewingLabel ? `${viewingLabel}'s Dashboard` : "Dashboard"}
            </h1>
            <p className="text-muted-foreground text-sm">Your AI agent performance at a glance</p>
          </div>
          <div className="flex items-center gap-3">
            {isAdmin && clients.length > 0 && (
              <Select value={viewingUserId || "all"} onValueChange={handleClientChange}>
                <SelectTrigger className="w-[200px] bg-secondary/50 border-border/30">
                  <SelectValue placeholder="Select client" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Clients</SelectItem>
                  {clients.map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.display_name || c.email || c.id.slice(0, 8)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-[160px] bg-secondary/50 border-border/30">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">Last 7 days</SelectItem>
                <SelectItem value="30">Last 30 days</SelectItem>
                <SelectItem value="90">Last 90 days</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard label="Call Counts" sublabel="All agents" value={metrics.totalCalls.toLocaleString()} icon={Phone} />
          <StatCard label="Call Duration" sublabel="Total" value={formatDuration(metrics.totalDuration)} icon={Clock} />
          <StatCard label="Appointments Booked" sublabel="From calls" value={metrics.appointmentsBooked.toLocaleString()} icon={CalendarCheck} />
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Call volume chart */}
          <Card className="lg:col-span-2 border-border/20 bg-card/60">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-sm font-semibold">Call Counts</CardTitle>
                  <p className="text-xs text-muted-foreground">All agents</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                {chartData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                      <defs>
                        <linearGradient id="callGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="hsl(220, 70%, 55%)" stopOpacity={0.15} />
                          <stop offset="100%" stopColor="hsl(220, 70%, 55%)" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="date" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} axisLine={false} tickLine={false} allowDecimals={false} />
                      <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "6px", color: "hsl(var(--foreground))", fontSize: 12 }} />
                      <Area type="monotone" dataKey="calls" stroke="hsl(220, 70%, 55%)" fill="url(#callGrad)" strokeWidth={2} name="Call counts" />
                    </AreaChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex items-center justify-center h-full text-muted-foreground text-sm">No call data yet</div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Sentiment donut */}
          <Card className="border-border/20 bg-card/60">
            <CardHeader className="pb-2">
              <div>
                <CardTitle className="text-sm font-semibold">User Sentiment</CardTitle>
                <p className="text-xs text-muted-foreground">All agents</p>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center">
                {sentimentData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={sentimentData}
                        cx="50%"
                        cy="45%"
                        innerRadius={55}
                        outerRadius={85}
                        paddingAngle={3}
                        dataKey="value"
                      >
                        {sentimentData.map((entry) => (
                          <Cell key={entry.name} fill={SENTIMENT_COLORS[entry.name] || SENTIMENT_COLORS.Unknown} />
                        ))}
                      </Pie>
                      <Legend
                        verticalAlign="bottom"
                        iconType="circle"
                        iconSize={8}
                        formatter={(value: string, entry: any) => {
                          const item = sentimentData.find((d) => d.name === value);
                          const total = sentimentData.reduce((s, d) => s + d.value, 0);
                          const pct = total > 0 ? ((item?.value || 0) / total * 100).toFixed(1) : "0";
                          return <span className="text-xs text-muted-foreground">{value}: {item?.value} ({pct}%)</span>;
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <p className="text-muted-foreground text-sm">No sentiment data yet</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Calls table */}
        <Card className="border-border/20 bg-card/60">
          <CardHeader>
            <CardTitle className="text-sm font-semibold">Recent Calls</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
              </div>
            ) : calls.length === 0 ? (
              <p className="text-center text-muted-foreground py-12">No calls yet. Configure your agent and start receiving calls.</p>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-border/10">
                      <TableHead className="text-xs">Date</TableHead>
                      <TableHead className="text-xs">Assistant</TableHead>
                      <TableHead className="text-xs">Customer</TableHead>
                      <TableHead className="text-xs">Duration</TableHead>
                      <TableHead className="text-xs">Sentiment</TableHead>
                      <TableHead className="text-xs">Appt</TableHead>
                      <TableHead className="text-xs">Reason</TableHead>
                      <TableHead className="text-xs"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {calls.map((call) => (
                      <TableRow key={call.call_id} className="border-border/10 hover:bg-secondary/30 transition-colors">
                        <TableCell className="text-sm">
                          {call.start_time ? new Date(call.start_time).toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }) : "—"}
                        </TableCell>
                        <TableCell className="text-sm">{call.assistant_name || "—"}</TableCell>
                        <TableCell className="text-sm font-mono">{call.customer_phone_number || "—"}</TableCell>
                        <TableCell className="text-sm">{call.duration_seconds ? formatDuration(call.duration_seconds) : "—"}</TableCell>
                        <TableCell className="text-sm">
                          {call.user_sentiment ? (
                            <span className="inline-flex items-center gap-1.5">
                              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: SENTIMENT_COLORS[call.user_sentiment] || SENTIMENT_COLORS.Unknown }} />
                              {call.user_sentiment}
                            </span>
                          ) : "—"}
                        </TableCell>
                        <TableCell className="text-sm">{call.appointment_booked ? "✓" : "—"}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{call.ended_reason || "—"}</TableCell>
                        <TableCell>
                          {call.transcript && (
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="ghost" size="sm"><FileText className="h-4 w-4" /></Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl max-h-[70vh] overflow-y-auto">
                                <DialogHeader>
                                  <DialogTitle>Call Transcript</DialogTitle>
                                </DialogHeader>
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

// ── Stat Card ──
function StatCard({ label, sublabel, value, icon: Icon }: { label: string; sublabel: string; value: string; icon: React.ElementType }) {
  return (
    <Card className="border-border/20 bg-card/60">
      <CardContent className="p-5">
        <div className="flex items-center gap-1.5 mb-1">
          <Icon className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="text-xs font-medium text-foreground">{label}</span>
        </div>
        <p className="text-xs text-muted-foreground mb-2">{sublabel}</p>
        <p className="text-3xl font-bold tracking-tight">{value}</p>
      </CardContent>
    </Card>
  );
}

export default Dashboard;
