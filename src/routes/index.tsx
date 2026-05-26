import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Upload,
  Database,
  ShieldCheck,
  Code2,
  ClipboardCheck,
  CircleCheck,
  ArrowLeft,
  Zap,
  Info,
  Pencil,
  FileCode2,
  Layers,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Activity,
  PackageCheck,
  PieChart as PieIcon,
  ListChecks,
  FileWarning,
  Settings2,
  FolderOpen,
  ChevronRight,
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const Route = createFileRoute("/")({ component: Index });

/* ---------- Pipeline sidebar ---------- */
const pipeline = [
  { id: "intake", label: "Specification Intake", icon: Upload },
  { id: "blueprint", label: "Architecture Blueprint", icon: Database },
  { id: "coverage", label: "Coverage Verification", icon: ShieldCheck },
  { id: "synthesis", label: "Source Code Synthesis", icon: Code2 },
  { id: "audit", label: "Build Quality Audit", icon: ClipboardCheck },
  { id: "delivery", label: "Delivery Readiness", icon: CircleCheck },
];

/* ---------- Donut ---------- */
function Donut({ value, size = 180, stroke = 16, color = "#7c5cff" }: { value: number; size?: number; stroke?: number; color?: string }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (value / 100) * c;
  return (
    <svg width={size} height={size} className="-rotate-90">
      <circle cx={size / 2} cy={size / 2} r={r} stroke="#eceaf5" strokeWidth={stroke} fill="none" />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        stroke={color}
        strokeWidth={stroke}
        fill="none"
        strokeDasharray={c}
        strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: "stroke-dashoffset .7s ease" }}
      />
    </svg>
  );
}

/* ---------- Base Validation screen ---------- */
const categoryBreakdown = [
  { name: "Business Rules", total: 37, covered: 37, missed: 0, pct: 100 },
  { name: "Technical Validations", total: 20, covered: 20, missed: 0, pct: 100 },
  { name: "Exceptions", total: 18, covered: 14, missed: 4, pct: 77.8 },
  { name: "Functionalities", total: 22, covered: 17, missed: 5, pct: 77.3 },
  { name: "Record Types", total: 14, covered: 11, missed: 3, pct: 78.6 },
];

function ValidationScreen() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <button className="text-muted-foreground hover:text-foreground"><ArrowLeft className="h-4 w-4" /></button>
        <h1 className="text-xl font-semibold">Validation</h1>
      </div>

      <Card>
        <div className="p-8 flex flex-col items-center">
          <div className="text-xs tracking-widest text-muted-foreground flex items-center gap-1.5 mb-4">
            SPECIFICATION COVERAGE <Info className="h-3 w-3" />
          </div>
          <div className="relative">
            <Donut value={81.05} />
            <div className="absolute inset-0 grid place-content-center">
              <div className="text-3xl font-bold">81.05%</div>
            </div>
          </div>
          <div className="flex items-center gap-6 mt-4 text-sm">
            <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-emerald-500" />Covered: 81.05%</span>
            <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-rose-500" />Missing: 18.95%</span>
          </div>
          <Button variant="outline" className="mt-6 text-violet-600 border-violet-200 hover:bg-violet-50">
            <Pencil className="h-4 w-4" /> Edit Metadata
          </Button>
        </div>
      </Card>

      <Card>
        <div className="px-6 py-4 border-b text-xs tracking-widest text-muted-foreground flex items-center gap-1.5">
          CATEGORY BREAKDOWN <Info className="h-3 w-3" />
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>NAME</TableHead>
              <TableHead>TOTAL</TableHead>
              <TableHead>COVERED</TableHead>
              <TableHead>MISSED</TableHead>
              <TableHead>COVERAGE %</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categoryBreakdown.map((r) => (
              <TableRow key={r.name}>
                <TableCell className="text-violet-600 font-medium">{r.name}</TableCell>
                <TableCell>{r.total}</TableCell>
                <TableCell className="text-emerald-600">{r.covered}</TableCell>
                <TableCell className="text-rose-500">{r.missed}</TableCell>
                <TableCell>{r.pct}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}

/* ---------- Card helper ---------- */
function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`bg-white rounded-xl border border-border shadow-sm ${className}`}>{children}</div>;
}

function StatTile({ icon: Icon, label, value, tone = "violet" }: any) {
  const tones: Record<string, string> = {
    violet: "bg-violet-50 text-violet-600",
    emerald: "bg-emerald-50 text-emerald-600",
    amber: "bg-amber-50 text-amber-600",
    rose: "bg-rose-50 text-rose-600",
  };
  return (
    <div className="flex items-center gap-3 rounded-lg border bg-white p-4">
      <div className={`h-10 w-10 rounded-lg grid place-content-center ${tones[tone]}`}><Icon className="h-5 w-5" /></div>
      <div>
        <div className="text-xs text-muted-foreground uppercase tracking-wider">{label}</div>
        <div className="text-xl font-semibold">{value}</div>
      </div>
    </div>
  );
}

/* ---------- Code Coverage ---------- */
const codeCategoryBars = [
  { name: "Business Rules", pct: 92.5 },
  { name: "Total", pct: 95 },
  { name: "Exceptions", pct: 100 },
  { name: "Functionalities", pct: 100 },
];
const codePartialItems = ["BR-20"];
const codeMissingItems = [
  "BR-19",
  "InvalidFileAssignment",
  "HeaderMissingError",
  "RecipientMismatchError",
  "InvalidDateError",
  "TrailerCountMismatch",
  "WorkCommitFailure",
];

function CodeCoverageView() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-lg bg-blue-50 text-blue-600 grid place-content-center">
          <FileCode2 className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-lg font-semibold">Python Business Coverage Report</h2>
          <p className="text-sm text-muted-foreground">Source code analysis · Computed Successfully</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="p-6 flex flex-col items-center justify-center">
          <div className="relative">
            <Donut value={80.26} color="#3b82f6" size={160} />
            <div className="absolute inset-0 grid place-content-center text-center">
              <div className="text-2xl font-bold">80.26%</div>
              <div className="text-xs text-muted-foreground">Coverage</div>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-2 gap-3 lg:col-span-2">
          <StatTile icon={Layers} label="Overall" value="38" tone="violet" />
          <StatTile icon={CheckCircle2} label="Fully Covered" value="30" tone="emerald" />
          <StatTile icon={AlertTriangle} label="Partially Covered" value="1" tone="amber" />
          <StatTile icon={XCircle} label="Missing" value="7" tone="rose" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="h-4 w-4 text-blue-600" />
            <h3 className="font-semibold">Category Coverage</h3>
          </div>
          <div className="space-y-4">
            {codeCategoryBars.map((c) => (
              <div key={c.name}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span>{c.name}</span>
                  <span className="font-medium">{c.pct}%</span>
                </div>
                <Progress value={c.pct} className="h-2 [&>div]:bg-blue-500" />
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-4 w-4 text-amber-500" />
              <h3 className="font-semibold">Partial Items</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {codePartialItems.map((i) => <Badge key={i} variant="secondary" className="bg-amber-50 text-amber-700 hover:bg-amber-50">{i}</Badge>)}
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <XCircle className="h-4 w-4 text-rose-500" />
              <h3 className="font-semibold">Missing Items</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {codeMissingItems.map((i) => <Badge key={i} variant="secondary" className="bg-rose-50 text-rose-700 hover:bg-rose-50">{i}</Badge>)}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

/* ---------- Meta Coverage ---------- */
const metaSections = [
  { id: "business", name: "Business Rules", icon: ListChecks, pct: 100, covered: 20, total: 20 },
  { id: "exceptions", name: "Exceptions", icon: AlertTriangle, pct: 67, covered: 6, total: 11 },
  { id: "functionalities", name: "Functionalities", icon: Activity, pct: 34, covered: 20, total: 20 },
  { id: "records", name: "Record Types", icon: PackageCheck, pct: 90, covered: 20, total: 20 },
  { id: "startup", name: "Startup Parameters", icon: Settings2, pct: 4, covered: 20, total: 20 },
  { id: "files", name: "File Handling", icon: FolderOpen, pct: 16, covered: 20, total: 20 },
];

const coveredItems = [
  { id: "Rule 1", description: "Monthly Run Type Validation — For a standard (non-Inception-to-Date) run, the start date must align with first business day.", matched: "BR-01" },
  { id: "Rule 2", description: "Recipient ID must match approved registry before dispatch.", matched: "BR-03" },
  { id: "Rule 3", description: "Trailer record count must equal detail line count.", matched: "BR-07" },
];
const uncoveredItems = [
  { id: "Rule 1", description: "Monthly Run Type Validation — For a standard (non-Inception-to-Date) run, the start date st...", matched: "BR-01" },
  { id: "Rule 4", description: "Inception-to-Date reconciliation tolerance window not enforced.", matched: "BR-09" },
];

function SectionDetail({ section, onBack }: { section: typeof metaSections[number]; onBack: () => void }) {
  const Icon = section.icon;
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="text-muted-foreground hover:text-foreground"><ArrowLeft className="h-4 w-4" /></button>
        <div className="h-9 w-9 rounded-lg bg-violet-50 text-violet-600 grid place-content-center"><Icon className="h-4 w-4" /></div>
        <h2 className="text-lg font-semibold">{section.name}</h2>
        <Badge variant="secondary" className="ml-2">{section.covered}/{section.total} · {section.pct}%</Badge>
      </div>

      <Tabs defaultValue="covered">
        <TabsList>
          <TabsTrigger value="covered" className="gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600" />Covered</TabsTrigger>
          <TabsTrigger value="uncovered" className="gap-2"><XCircle className="h-4 w-4 text-rose-500" />Uncovered</TabsTrigger>
        </TabsList>

        <TabsContent value="covered">
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Matched By</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {coveredItems.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell className="font-medium">{r.id}</TableCell>
                    <TableCell className="text-muted-foreground">{r.description}</TableCell>
                    <TableCell><Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">{r.matched}</Badge></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="uncovered">
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Matched By</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {uncoveredItems.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell className="font-medium">{r.id}</TableCell>
                    <TableCell className="text-muted-foreground">{r.description}</TableCell>
                    <TableCell><Badge className="bg-rose-100 text-rose-700 hover:bg-rose-100">{r.matched}</Badge></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function MetaCoverageView() {
  const [active, setActive] = useState<typeof metaSections[number] | null>(null);
  if (active) return <SectionDetail section={active} onBack={() => setActive(null)} />;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-lg bg-violet-50 text-violet-600 grid place-content-center">
          <PieIcon className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-lg font-semibold">Metadata Coverage Analysis Report</h2>
          <p className="text-sm text-muted-foreground">Click any section to inspect covered & uncovered items</p>
        </div>
        <div className="ml-auto">
          <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 text-sm">Overall · 85% (53/62)</Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {metaSections.map((s) => {
          const Icon = s.icon;
          const tone = s.pct >= 80 ? "emerald" : s.pct >= 50 ? "amber" : "rose";
          const barColor = tone === "emerald" ? "[&>div]:bg-emerald-500" : tone === "amber" ? "[&>div]:bg-amber-500" : "[&>div]:bg-rose-500";
          return (
            <button
              key={s.id}
              onClick={() => setActive(s)}
              className="group text-left bg-white rounded-xl border p-5 hover:border-violet-300 hover:shadow-md transition"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-violet-50 text-violet-600 grid place-content-center"><Icon className="h-5 w-5" /></div>
                  <div>
                    <div className="font-semibold">{s.name}</div>
                    <div className="text-xs text-muted-foreground">{s.covered} / {s.total} items</div>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-violet-600 group-hover:translate-x-1 transition" />
              </div>
              <div className="flex items-baseline justify-between mb-1.5">
                <span className="text-xs text-muted-foreground">Coverage</span>
                <span className="text-lg font-semibold">{s.pct}%</span>
              </div>
              <Progress value={s.pct} className={`h-2 ${barColor}`} />
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- Coverage Verification tabs (Code / Meta) ---------- */
function CoverageVerification() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <button className="text-muted-foreground hover:text-foreground"><ArrowLeft className="h-4 w-4" /></button>
        <h1 className="text-xl font-semibold">Coverage Verification</h1>
      </div>

      <Tabs defaultValue="code">
        <TabsList className="bg-white border">
          <TabsTrigger value="code" className="gap-2"><FileCode2 className="h-4 w-4" />Code Coverage</TabsTrigger>
          <TabsTrigger value="meta" className="gap-2"><PieIcon className="h-4 w-4" />Meta Coverage</TabsTrigger>
        </TabsList>
        <TabsContent value="code" className="mt-4"><CodeCoverageView /></TabsContent>
        <TabsContent value="meta" className="mt-4"><MetaCoverageView /></TabsContent>
      </Tabs>
    </div>
  );
}

/* ---------- Generic placeholder for other pipeline items ---------- */
function PlaceholderStage({ title }: { title: string }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <button className="text-muted-foreground hover:text-foreground"><ArrowLeft className="h-4 w-4" /></button>
        <h1 className="text-xl font-semibold">{title}</h1>
      </div>
      <Card className="p-12 text-center text-muted-foreground">
        <FileWarning className="h-8 w-8 mx-auto mb-3 opacity-60" />
        This stage is part of the Forward Engineering pipeline preview.
      </Card>
    </div>
  );
}

/* ---------- Main ---------- */
function Index() {
  const [active, setActive] = useState("blueprint");

  return (
    <div className="min-h-screen flex bg-[#f6f5fa]">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r p-5 flex flex-col">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-10 w-10 rounded-xl bg-violet-600 grid place-content-center text-white shadow-sm">
            <Zap className="h-5 w-5" />
          </div>
          <div>
            <div className="font-semibold leading-tight">Forward Engineering</div>
            <div className="text-[11px] tracking-widest text-muted-foreground">CODEGENIE</div>
          </div>
        </div>

        <div className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Pipeline</div>
        <nav className="space-y-1">
          {pipeline.map((p) => {
            const Icon = p.icon;
            const isActive = active === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setActive(p.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition ${
                  isActive
                    ? "bg-violet-50 text-violet-700 font-medium"
                    : "text-foreground/70 hover:bg-muted"
                }`}
              >
                <Icon className="h-4 w-4" />
                {p.label}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 p-8 overflow-x-hidden">
        <div className="max-w-6xl mx-auto">
          {active === "coverage" ? (
            <CoverageVerification />
          ) : active === "blueprint" ? (
            <ValidationScreen />
          ) : (
            <PlaceholderStage title={pipeline.find((p) => p.id === active)?.label ?? ""} />
          )}
        </div>
      </main>
    </div>
  );
}
