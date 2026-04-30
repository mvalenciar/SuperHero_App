import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface HeroStatCardProps {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  value: string | number;
  valueClassName?: string;
  description?: string;
  footer?: React.ReactNode;
}

export const HeroStatCard = ({
  title,
  icon,
  value,
  valueClassName,
  description,
  footer,
}: HeroStatCardProps) => {
  const Icon = icon;
  return (
    <Card>
      <CardHeader className="flex justify-between items-center space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="size-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-1">
        <div className={cn("text-2xl font-bold", valueClassName)}>{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
        {footer}
      </CardContent>
    </Card>
  );
};
