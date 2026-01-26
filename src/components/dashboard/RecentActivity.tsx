import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

interface Activity {
  id: string;
  user: string;
  action: string;
  target: string;
  time: string;
  avatar: string;
}

const activities: Activity[] = [
  {
    id: "1",
    user: "Trần Thị Hương",
    action: "đã duyệt đơn nghỉ phép của",
    target: "Nguyễn Văn Minh",
    time: "2 phút trước",
    avatar: "TH",
  },
  {
    id: "2",
    user: "Lê Hoàng Nam",
    action: "đã thêm nhân viên mới",
    target: "Phạm Thị Lan",
    time: "15 phút trước",
    avatar: "LN",
  },
  {
    id: "3",
    user: "Nguyễn Thị Mai",
    action: "đã cập nhật bảng lương cho",
    target: "Phòng Kỹ thuật",
    time: "1 giờ trước",
    avatar: "NM",
  },
  {
    id: "4",
    user: "Hoàng Văn Đức",
    action: "đã hoàn thành đánh giá",
    target: "Hiệu suất Q4",
    time: "2 giờ trước",
    avatar: "HD",
  },
  {
    id: "5",
    user: "Vũ Thị Hằng",
    action: "đã lên lịch phỏng vấn với",
    target: "Trần Minh Tuấn",
    time: "3 giờ trước",
    avatar: "VH",
  },
];

const avatarColors = [
  "bg-primary/20 text-primary",
  "bg-info/20 text-info",
  "bg-success/20 text-success",
  "bg-warning/20 text-warning",
  "bg-chart-3/20 text-chart-3",
];

export function RecentActivity() {
  return (
    <div className="stat-card h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">
          Hoạt động gần đây
        </h3>
        <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div
            key={activity.id}
            className="flex items-start gap-3 p-3 rounded-xl hover:bg-muted/30 transition-all duration-300 hover:-translate-x-1 animate-slide-up"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div
              className={cn(
                "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl text-sm font-semibold transition-transform duration-300",
                avatarColors[index % avatarColors.length]
              )}
            >
              {activity.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-foreground leading-relaxed">
                <span className="font-semibold">{activity.user}</span>{" "}
                <span className="text-muted-foreground">{activity.action}</span>{" "}
                <span className="font-semibold">{activity.target}</span>
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {activity.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
