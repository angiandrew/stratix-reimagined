import { useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tooltip } from "@/components/ui/tooltip";
import { TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface Call {
  start_time: string | null;
  created_at: string;
}

const HOURS = Array.from({ length: 24 }, (_, i) => i);
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function PeakHoursHeatmap({ calls }: { calls: Call[] }) {
  const grid = useMemo(() => {
    // 7 days x 24 hours
    const counts: number[][] = Array.from({ length: 7 }, () => Array(24).fill(0));
    let max = 0;

    calls.forEach((c) => {
      const d = new Date(c.start_time || c.created_at);
      const day = d.getDay();
      const hour = d.getHours();
      counts[day][hour]++;
      if (counts[day][hour] > max) max = counts[day][hour];
    });

    return { counts, max };
  }, [calls]);

  const getOpacity = (count: number) => {
    if (grid.max === 0 || count === 0) return 0;
    return 0.15 + (count / grid.max) * 0.85;
  };

  return (
    <Card className="border-border/10">
      <CardContent className="p-5">
        <div className="mb-4">
          <h3 className="text-sm font-medium">Peak Hours</h3>
          <p className="text-xs text-muted-foreground">When calls come in most</p>
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-[500px]">
            {/* Hour labels */}
            <div className="flex ml-10 mb-1">
              {HOURS.filter((_, i) => i % 3 === 0).map((h) => (
                <span
                  key={h}
                  className="text-[10px] text-muted-foreground"
                  style={{ width: `${(3 / 24) * 100}%` }}
                >
                  {h === 0 ? "12a" : h < 12 ? `${h}a` : h === 12 ? "12p" : `${h - 12}p`}
                </span>
              ))}
            </div>

            {/* Grid */}
            {DAYS.map((day, dayIdx) => (
              <div key={day} className="flex items-center gap-1 mb-[3px]">
                <span className="text-[10px] text-muted-foreground w-8 text-right pr-1.5 shrink-0">{day}</span>
                <div className="flex gap-[2px] flex-1">
                  {HOURS.map((hour) => {
                    const count = grid.counts[dayIdx][hour];
                    return (
                      <Tooltip key={hour}>
                        <TooltipTrigger asChild>
                          <div
                            className="flex-1 h-4 rounded-[3px] transition-colors"
                            style={{
                              backgroundColor: count > 0
                                ? `hsla(220, 70%, 55%, ${getOpacity(count)})`
                                : "hsl(var(--muted) / 0.3)",
                            }}
                          />
                        </TooltipTrigger>
                        <TooltipContent side="top" className="text-xs">
                          {day} {hour === 0 ? "12 AM" : hour < 12 ? `${hour} AM` : hour === 12 ? "12 PM" : `${hour - 12} PM`} — {count} call{count !== 1 ? "s" : ""}
                        </TooltipContent>
                      </Tooltip>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Legend */}
            <div className="flex items-center justify-end gap-1.5 mt-3">
              <span className="text-[10px] text-muted-foreground">Less</span>
              {[0, 0.25, 0.5, 0.75, 1].map((o) => (
                <div
                  key={o}
                  className="h-3 w-3 rounded-[2px]"
                  style={{
                    backgroundColor: o === 0 ? "hsl(var(--muted) / 0.3)" : `hsla(220, 70%, 55%, ${0.15 + o * 0.85})`,
                  }}
                />
              ))}
              <span className="text-[10px] text-muted-foreground">More</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
