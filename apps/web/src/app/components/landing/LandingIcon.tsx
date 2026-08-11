import {
  ArrowLeft,
  ArrowRight,
  Building2,
  ChartNoAxesCombined,
  CheckCircle2,
  ChevronRight,
  CloudRain,
  Compass,
  Database,
  Eye,
  EyeOff,
  HeartHandshake,
  History,
  Info,
  Layers3,
  Leaf,
  Link2,
  LoaderCircle,
  LockKeyhole,
  Map,
  MapPin,
  Menu,
  Settings2,
  ShieldAlert,
  ShieldCheck,
  Trophy,
  UserRound,
  UsersRound,
  Waves,
  X,
  type LucideIcon,
} from "lucide-react";

const icons: Record<string, LucideIcon> = {
  "solar:arrow-right-linear": ArrowRight,
  "solar:buildings-2-linear": Building2,
  "solar:chart-2-linear": ChartNoAxesCombined,
  "solar:check-circle-linear": CheckCircle2,
  "solar:compass-square-linear": Compass,
  "solar:database-linear": Database,
  "solar:eye-closed-linear": EyeOff,
  "solar:history-linear": History,
  "solar:info-circle-linear": Info,
  "solar:layers-minimalistic-linear": Layers3,
  "solar:leaf-linear": Leaf,
  "solar:link-round-angle-linear": Link2,
  "solar:map-arrow-square-linear": Map,
  "solar:map-point-wave-linear": MapPin,
  "solar:ranking-linear": Trophy,
  "solar:settings-minimalistic-linear": Settings2,
  "solar:shield-check-linear": ShieldCheck,
  "solar:shield-warning-linear": ShieldAlert,
  "solar:user-heart-rounded-linear": HeartHandshake,
  "solar:users-group-rounded-linear": UsersRound,
  "solar:users-group-two-rounded-linear": UsersRound,
  "solar:waterdrops-linear": CloudRain,
  "tabler:arrow-left": ArrowLeft,
  "tabler:chevron-right": ChevronRight,
  "tabler:eye": Eye,
  "tabler:eye-off": EyeOff,
  "tabler:loader-2": LoaderCircle,
  "tabler:lock-check": LockKeyhole,
  "tabler:menu-2": Menu,
  "tabler:x": X,
  fallback: Waves,
  user: UserRound,
};

export function Icon({
  icon,
  width = 20,
  className,
  ...props
}: {
  icon: string;
  width?: number | string;
  height?: number | string;
  className?: string;
  "aria-hidden"?: boolean | "true" | "false";
}) {
  const Component = icons[icon] ?? icons.fallback;
  return <Component size={width} className={className} {...props} />;
}
