import type { CSSProperties } from "react";
import type { LucideIcon, LucideProps } from "lucide-react";
import {
  Activity,
  Apple,
  ArrowLeft,
  ArrowRight,
  Blend,
  BookOpen,
  Bot,
  Brain,
  BrainCircuit,
  Calculator,
  Calendar,
  CalendarCheck,
  CalendarDays,
  CalendarSync,
  ChartLine,
  ChartPie,
  Check,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  ChevronsDown,
  Circle,
  CircleCheck,
  CircleHelp,
  CircleUser,
  CircleX,
  ClipboardList,
  ClipboardPlus,
  Clock,
  Columns2,
  Dumbbell,
  EyeOff,
  FileText,
  FlaskConical,
  Flower2,
  FolderX,
  Gauge,
  Hand,
  Heart,
  HeartPulse,
  History,
  House,
  Info,
  Library,
  Link,
  ListChecks,
  Lock,
  Menu,
  MessageCircle,
  MessagesSquare,
  Minus,
  Moon,
  MoonStar,
  MoveDown,
  MoveRight,
  NotebookPen,
  Repeat,
  Rocket,
  Route,
  Scissors,
  Search,
  SearchX,
  Shield,
  Siren,
  SlidersHorizontal,
  Sparkles,
  Stethoscope,
  Timer,
  TrendingUp,
  Triangle,
  TriangleAlert,
  Unlink,
  Upload,
  Utensils,
  UtensilsCrossed,
  Waypoints,
  X,
} from "lucide-react";

/**
 * Site icon set.
 *
 * Phase 1 of the redesign replaced the 1.16 MB MaterialSymbolsRounded font
 * with inline SVG from Lucide (the set the xHeal app uses). Data files,
 * messages and feature pages still carry the Material glyph names they were
 * written with, so this component maps those names onto Lucide glyphs. New
 * code should pass Lucide-idiom names from `ICONS` directly; the Material
 * aliases exist so the migration can happen file by file.
 */
export const ICONS = {
  // Navigation and controls
  arrow_back: ArrowLeft,
  arrow_forward: ArrowRight,
  chevron_right: ChevronRight,
  expand_more: ChevronDown,
  keyboard_arrow_down: ChevronDown,
  keyboard_arrow_up: ChevronUp,
  keyboard_double_arrow_down: ChevronsDown,
  close: X,
  menu: Menu,
  menu_book: BookOpen,
  home: House,
  swipe: Hand,
  swipe_down: MoveDown,
  check: Check,
  check_circle: CircleCheck,
  cancel: CircleX,
  remove: Minus,
  horizontal_rule: Minus,
  info: Info,
  help: CircleHelp,
  question_mark: CircleHelp,

  // Content and documents
  article: FileText,
  description: FileText,
  edit_note: NotebookPen,
  add_notes: ClipboardPlus,
  clinical_notes: Stethoscope,
  medical_information: ClipboardList,
  library_books: Library,
  checklist: ListChecks,
  quiz: ClipboardList,
  upload_file: Upload,
  folder_off: FolderX,

  // Time
  schedule: Clock,
  timer: Timer,
  calendar_today: Calendar,
  event_note: CalendarDays,
  event_repeat: CalendarSync,
  routine: CalendarCheck,
  history_toggle_off: History,
  timeline: Route,

  // Health domains
  fitness_center: Dumbbell,
  nutrition: Apple,
  restaurant: Utensils,
  no_meals: UtensilsCrossed,
  self_improvement: Flower2,
  bedtime: Moon,
  nights_stay: MoonStar,
  vital_signs: HeartPulse,
  health_metrics: Activity,
  favorite: Heart,
  emergency: Siren,
  content_cut: Scissors,

  // Data and analysis
  monitoring: ChartLine,
  show_chart: TrendingUp,
  trending_up: TrendingUp,
  trending_flat: MoveRight,
  pie_chart: ChartPie,
  speed: Gauge,
  calculate: Calculator,
  splitscreen: Columns2,
  tune: SlidersHorizontal,
  change_history: Triangle,
  blur_on: Blend,
  hub: Waypoints,
  link: Link,
  link_off: Unlink,
  repeat: Repeat,

  // Intelligence and trust
  psychology: Brain,
  psychology_alt: BrainCircuit,
  smart_toy: Bot,
  auto_awesome: Sparkles,
  science: FlaskConical,
  mystery: Search,
  search_off: SearchX,
  shield: Shield,
  lock: Lock,
  visibility_off: EyeOff,
  account_circle: CircleUser,
  warning: TriangleAlert,
  rocket_launch: Rocket,
  chat_bubble: MessageCircle,
  forum: MessagesSquare,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof ICONS;

type IconProps = Omit<LucideProps, "ref" | "size"> & {
  /** A key of ICONS. Unknown names render a circle and warn in development. */
  name: IconName | string;
  /** Pixel size; matches the font-size the Material glyph used to be set at. */
  size?: number | string;
  className?: string;
  style?: CSSProperties;
};

export default function Icon({
  name,
  size = 18,
  strokeWidth = 1.75,
  className,
  style,
  ...rest
}: IconProps) {
  const Glyph = (ICONS as Record<string, LucideIcon>)[name];
  if (!Glyph && process.env.NODE_ENV !== "production") {
    console.warn(`Icon: no glyph mapped for "${name}"`);
  }
  const Component = Glyph ?? Circle;
  return (
    <Component
      aria-hidden="true"
      focusable="false"
      size={size}
      strokeWidth={strokeWidth}
      className={className ? `xi ${className}` : "xi"}
      style={{ flexShrink: 0, ...style }}
      {...rest}
    />
  );
}
