import { ArrowRight, Phone, GitBranch, CalendarCheck, MessageSquare, Zap, MoreHorizontal, Bot } from "lucide-react";

const CategoryLabel = ({ label }: { label: string }) => (
  <p className="text-[10px] font-semibold text-gray-400 mb-1 pl-0.5">{label}</p>
);

const NodeArrow = () => (
  <div className="flex justify-center my-0.5">
    <div className="flex flex-col items-center">
      <div className="w-px h-5 bg-emerald-300" />
      <div className="w-2 h-2 rotate-45 -mt-1.5 border-b-2 border-r-2 border-emerald-300" />
    </div>
  </div>
);

const WorkflowNode = ({ icon: Icon, title, sub }: { icon: React.ElementType; title: string; sub: string }) => (
  <div className="bg-white rounded-lg border border-gray-200 px-3.5 py-2.5 flex items-center justify-between shadow-sm w-full">
    <div className="flex items-center gap-2.5">
      <div className="w-7 h-7 rounded-md bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0">
        <Icon size={13} className="text-gray-500" />
      </div>
      <div>
        <p className="text-xs font-semibold text-gray-900 leading-tight">{title}</p>
        <p className="text-[10px] text-gray-400 mt-0.5">{sub}</p>
      </div>
    </div>
    <MoreHorizontal size={12} className="text-gray-300 shrink-0 ml-3" />
  </div>
);

const WorkflowDiagram = () => (
  <div className="flex flex-col items-center w-72">
    <CategoryLabel label="⚡  Trigger" />
    <WorkflowNode icon={Phone} title="Inbound call received" sub="Customer reached your line" />
    <NodeArrow />
    <CategoryLabel label="🤖  AI Agent" />
    <WorkflowNode icon={Bot} title="Qualify the lead" sub="AI asks intent, urgency & fit" />
    <NodeArrow />
    <CategoryLabel label="⑂  Branch" />
    <WorkflowNode icon={GitBranch} title="Appointment eligible?" sub="Check if prospect qualifies" />

    <div className="flex items-start gap-3 mt-1 w-full justify-center">
      <div className="flex flex-col items-center gap-0.5">
        <div className="w-px h-4 bg-emerald-300" />
        <span className="text-[9px] font-semibold text-emerald-600 bg-emerald-50 rounded px-1.5 py-0.5">✓ True</span>
        <div className="w-px h-3 bg-emerald-300" />
        <WorkflowNode icon={CalendarCheck} title="Book appointment" sub="Sync to calendar" />
      </div>
      <div className="flex flex-col items-center gap-0.5">
        <div className="w-px h-4 bg-gray-200" />
        <span className="text-[9px] font-semibold text-gray-400 bg-gray-100 rounded px-1.5 py-0.5">✗ False</span>
        <div className="w-px h-3 bg-gray-200" />
        <WorkflowNode icon={MessageSquare} title="SMS follow-up" sub="Nurture sequence triggered" />
      </div>
    </div>

    <NodeArrow />
    <CategoryLabel label="🤖  AI Agent" />
    <WorkflowNode icon={Zap} title="Confirmation & reminder" sub="Call confirmed, SMS sent" />
    <NodeArrow />
    <CategoryLabel label="📋  CRM" />
    <WorkflowNode icon={Phone} title="Update contact record" sub="Lead marked as booked" />
  </div>
);

const DefineProcessesSection = () => (
  <section className="bg-white">
    <div className="mx-auto max-w-6xl border-l border-r border-gray-200 bg-[#F5F5F4] overflow-hidden">
      <div className="flex flex-col lg:flex-row" style={{ minHeight: 580 }}>

        {/* Left — copy */}
        <div className="w-full lg:w-5/12 flex flex-col justify-center px-10 sm:px-14 py-20 shrink-0">
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">
            Automated Workflows
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.1] mb-5" style={{ color: "#0f172a" }}>
            Define your<br />processes.
          </h2>
          <p className="text-base leading-relaxed mb-8" style={{ color: "#64748b" }}>
            Map how every lead should be handled — from first contact to
            booked appointment — and let StratixOS execute it automatically,
            every time.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold text-white w-fit hover:opacity-90 transition-opacity"
            style={{ backgroundColor: "#0f172a" }}
          >
            Book Demo <ArrowRight size={13} />
          </a>
        </div>

        {/* Right — workflow panel, flush to top */}
        <div className="w-full lg:w-7/12 flex items-start overflow-hidden">
          <div className="w-full rounded-none lg:rounded-tl-xl overflow-hidden border-l border-gray-200 shadow-sm" style={{ marginTop: -1 }}>
            <div className="bg-white border-b border-gray-200 px-5 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3 text-xs text-gray-500">
                <span className="text-gray-400">←</span>
                <span className="font-medium text-gray-700">Editor</span>
                <span className="text-gray-300">|</span>
                <span>Runs</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-600 font-medium">Inbound lead → booking</span>
                <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 border border-emerald-200 rounded-full px-2 py-0.5">Active</span>
              </div>
            </div>
            <div className="p-8 flex justify-center" style={{ backgroundColor: "#fafafa" }}>
              <WorkflowDiagram />
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
);

export default DefineProcessesSection;
