import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

const data = [
  { name: "Engineering", value: 45, color: "hsl(173, 58%, 39%)" },
  { name: "Marketing", value: 20, color: "hsl(217, 91%, 60%)" },
  { name: "Sales", value: 25, color: "hsl(142, 76%, 36%)" },
  { name: "HR", value: 10, color: "hsl(38, 92%, 50%)" },
  { name: "Finance", value: 15, color: "hsl(280, 65%, 60%)" },
];

export function DepartmentChart() {
  return (
    <div className="stat-card">
      <h3 className="text-lg font-semibold text-foreground mb-4">
        Employees by Department
      </h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
            />
            <Legend
              verticalAlign="bottom"
              height={36}
              formatter={(value) => (
                <span className="text-sm text-foreground">{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
