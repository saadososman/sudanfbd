import {
  BadgeDollarSign,
  Banknote,
  Blocks,
  Bolt,
  Building2,
  ClipboardCheck,
  Droplet,
  Factory,
  Fuel,
  Globe2,
  GraduationCap,
  Handshake,
  HeartPulse,
  Landmark,
  Leaf,
  MonitorCog,
  Network,
  Palette,
  Scale,
  ShieldAlert,
  ShieldCheck,
  Sprout,
  Route,
  Waves
} from "lucide-react";

const iconMap = {
  bank: Banknote,
  blocks: Blocks,
  bolt: Bolt,
  building: Building2,
  chart: BadgeDollarSign,
  clipboard: ClipboardCheck,
  droplet: Droplet,
  factory: Factory,
  fuel: Fuel,
  globe: Globe2,
  graduation: GraduationCap,
  handshake: Handshake,
  heart: HeartPulse,
  landmark: Landmark,
  leaf: Leaf,
  monitor: MonitorCog,
  network: Network,
  palette: Palette,
  road: Route,
  scale: Scale,
  shield: ShieldAlert,
  "shield-check": ShieldCheck,
  sprout: Sprout,
  waves: Waves
};

export function SectorIcon({ name, size = 24 }: { name: string; size?: number }) {
  const Icon = iconMap[name as keyof typeof iconMap] || Blocks;
  return <Icon size={size} />;
}
