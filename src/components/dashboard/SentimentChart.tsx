import { useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const SENTIMENT_COLORS: Record<string, string> = {
  Positive: "hsl(200, 80%, 55%)",
  Negative: "hsl(250, 60%, 55%)",
  Neutral: "hsl(45, 90%, 55%)",
  Unknown: "hsl(210, 15%, 65%)",
};

interface Props {
  calls: { user_sentiment: string | null }[];
}

export default function SentimentChart({ calls }: Props) {
  const { data, total } = useMemo(() => {
    const counts: Record<string, number> = {};
    calls.forEach((c) => {
      const s = c.user_sentiment || "Unknown";
      counts[s] = (counts[s] || 0) + 1;
    });
    const data = Object.entries(counts).map(([name, value]) => ({ name, value }));
    const total = data.reduce((s, d) => s + d.value, 0);
    return { data, total };
  }, [calls]);

  if (data.length === 0) {
    return (
      <Card className="border-border/10">
        <CardContent className="p-5">
          <h3 className="text-sm font-medium mb-1">User Sentiment</h3>
          <p className="text-xs text-muted-foreground">No data yet</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-border/10">
      <CardContent className="p-5">
        <div className="mb-2">
          <h3 className="text-sm font-medium">User Sentiment</h3>
          <p className="text-xs text-muted-foreground">All agents</p>
        </div>

        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={75}
                paddingAngle={3}
                dataKey="value"
                strokeWidth={0}
              >
                {data.map((entry) => (
                  <Cell key={entry.name} fill={SENTIMENT_COLORS[entry.name] || SENTIMENT_COLORS.Unknown} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-2">
          {data.map((d) => {
            const pct = total > 0 ? ((d.value / total) * 100).toFixed(0) : "0";
            return (
              <div key={d.name} className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: SENTIMENT_COLORS[d.name] || SENTIMENT_COLORS.Unknown }} />
                <span className="text-xs text-muted-foreground">
                  {d.name}: {d.value} ({pct}%)
                </span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
