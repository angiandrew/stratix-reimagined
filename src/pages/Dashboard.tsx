import { useState, useEffect, useMemo } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, AreaChart, Area } from "recharts";
import { Phone, Clock, DollarSign, TrendingUp, LogOut, User, Shield, FileText } from "lucide-react";
import { toast } from "sonner";
import { useNavigate, Link } from "react-router-dom";
import stratixLogo from "@/assets/stratixos-logo.png";

interface Call {
  call_id: string;
  assistant_name: string | null;
  customer_phone_number: string | null;
  transcript: string | null;
  call_type: string | null;
  ended_reason: string | null;
  start_time: string | null;
  duration_seconds: number | null;
  cost_usd: number | null;
  created_at: string;
}

const Dashboard = () => {
  const { user, signOut, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [calls, setCalls] = useState<Call[]>([]);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState("30");

  const fetchCalls = async () => {
    setLoading(true);
    const daysAgo = new Date();
    daysAgo.setDate(daysAgo.getDate() - parseInt(dateRange));

    const { data, error } = await supabase
      .from("calls")
      .select("*")
      .gte("created_at", daysAgo.toISOString())
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Failed to load calls");
      console.error(error);
    } else {
      setCalls(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCalls();

    const channel = supabase
      .channel("calls-realtime")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "calls" }, (payload) => {
        setCalls((prev) => [payload.new as Call, ...prev]);
        toast.success("New call received!");
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [dateRange]);

  const metrics = useMemo(() => {
    const totalMinutes = calls.reduce((sum, c) => sum + (c.duration_seconds || 0), 0) / 60;
    const totalCost = calls.reduce((sum, c) => sum + (c.cost_usd ? Number(c.cost_usd) : 0), 0);
    const avgCost = calls.length > 0 ? totalCost / calls.length : 0;
    return { totalMinutes, totalCalls: calls.length, totalCost, avgCost };
  }, [calls]);

  const chartData = useMemo(() => {
    const grouped: Record<string, { date: string; calls: number; minutes: number; cost: number }> = {};
    calls.forEach((c) => {
      const date = new Date(c.start_time || c.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" });
      if (!grouped[date]) grouped[date] = { date, calls: 0, minutes: 0, cost: 0 };
      grouped[date].calls++;
      grouped[date].minutes += (c.duration_seconds || 0) / 60;
      grouped[date].cost += c.cost_usd ? Number(c.cost_usd) : 0;
    });
    return Object.values(grouped).reverse();
  }, [calls]);

  const handleSignOut = async () => {
    await signOut();
    navigate("/auth");
  };

  const statCards = [
    { title: "Total Call Minutes", value: metrics.totalMinutes.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }), icon: Clock, color: "text-emerald-400", bg: "bg-emerald-500/10", dataKey: "minutes" },
    { title: "Number of Calls", value: metrics.totalCalls.toLocaleString(), icon: Phone, color: "text-orange-400", bg: "bg-orange-500/10", dataKey: "calls" },
    { title: "Total Spent", value: `$${metrics.totalCost.toFixed(2)}`, icon: DollarSign, color: "text-purple-400", bg: "bg-purple-500/10", dataKey: "cost" },
    { title: "Avg Cost / Call", value: `$${metrics.avgCost.toFixed(2)}`, icon: TrendingUp, color: "text-blue-400", bg: "bg-blue-500/10", dataKey: "cost" },
  ];

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
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Call Dashboard</h1>
            <p className="text-muted-foreground text-sm">Track your AI agent call performance</p>
          </div>
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[180px] bg-secondary/50 border-border/30">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {statCards.map((stat) => (
            <Card key={stat.title} className="border-border/10 bg-card/60 hover:-translate-y-0.5 transition-all duration-300 hover:shadow-lg">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{stat.title}</p>
                  <div className={`p-2 rounded-lg ${stat.bg}`}>
                    <stat.icon className={`h-4 w-4 ${stat.color}`} />
                  </div>
                </div>
                <p className="text-2xl font-bold mb-3">{stat.value}</p>
                <div className="h-12">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                      <defs>
                        <linearGradient id={`grad-${stat.dataKey}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                          <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <Area type="monotone" dataKey={stat.dataKey} stroke="hsl(var(--primary))" fill={`url(#grad-${stat.dataKey})`} strokeWidth={1.5} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Chart */}
        <Card className="border-border/10 bg-card/60">
          <CardHeader>
            <CardTitle className="text-base">Calls Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <XAxis dataKey="date" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", color: "hsl(var(--foreground))" }} />
                  <Bar dataKey="calls" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Calls Table */}
        <Card className="border-border/10 bg-card/60">
          <CardHeader>
            <CardTitle className="text-base">Recent Calls</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
              </div>
            ) : calls.length === 0 ? (
              <p className="text-center text-muted-foreground py-12">No calls yet. Set your Org ID in your profile and start receiving calls.</p>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-border/10">
                      <TableHead>Date</TableHead>
                      <TableHead>Assistant</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Cost</TableHead>
                      <TableHead>Reason</TableHead>
                      <TableHead></TableHead>
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
                        <TableCell className="text-sm">{call.duration_seconds ? `${Math.floor(call.duration_seconds / 60)}m ${call.duration_seconds % 60}s` : "—"}</TableCell>
                        <TableCell className="text-sm">{call.cost_usd != null ? `$${Number(call.cost_usd).toFixed(4)}` : "—"}</TableCell>
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

export default Dashboard;
