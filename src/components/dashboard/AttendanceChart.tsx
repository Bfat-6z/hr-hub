import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { day: "T2", present: 92, absent: 8 },
  { day: "T3", present: 88, absent: 12 },
  { day: "T4", present: 95, absent: 5 },
  { day: "T5", present: 90, absent: 10 },
  { day: "T6", present: 85, absent: 15 },
  { day: "T7", present: 40, absent: 60 },
  { day: "CN", present: 20, absent: 80 },
];

export function AttendanceChart() {
  return (
    <div className="stat-card">
      <h3 className="text-lg font-semibold text-foreground mb-4">
        Chấm công tuần này
      </h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorPresent" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="hsl(173, 58%, 39%)"
                  stopOpacity={0.3}
                />
                <stop
                  offset="95%"
                  stopColor="hsl(173, 58%, 39%)"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="hsl(var(--border))"
              vertical={false}
            />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
              domain={[0, 100]}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
              formatter={(value: number) => [`${value}%`, "Attendance"]}
            />
            <Area
              type="monotone"
              dataKey="present"
              stroke="hsl(173, 58%, 39%)"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorPresent)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
