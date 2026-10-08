/**
 * Measured repository facts for each specification.
 * Every value here was read from the project's git repository on
 * 7 October 2026 (git log, git ls-files, grep for `def test_`).
 * Update by re-measuring, never by estimating.
 */

export interface SpecFact {
  value: string;
  label: string;
}

export interface ProjectSpec {
  specNo: string;
  /** One line set under the giant title in the first viewport. */
  claim: string;
  measuredOn: string;
  method: string;
  facts: SpecFact[];
  /** Short public repository note when the source is private. */
  sourceNote?: string;
  /**
   * Where each verification metric (keyed by its label) is documented.
   * With an href it is a claim with evidence; without one it is shown as
   * reported in the project record and not re-measured.
   */
  evidence: Record<string, { source: string; href?: string }>;
}

const lab = (project: string, slug: string, ref: string) => ({
  source: `Lab note ${ref}`,
  href: `/lab/${project}/${slug}`,
});

export const MEASURED_ON = "7 Oct 2026";

export const projectSpecs: Record<string, ProjectSpec> = {
  aeon: {
    specNo: "AL-0004",
    claim:
      "A cognitive operating system for one person, built to remember, plan, act and check its own work for years.",
    measuredOn: MEASURED_ON,
    method:
      "git rev-list, git ls-files over packages/ and tests/, docs/decisions/ count",
    facts: [
      { value: "951", label: "commits" },
      { value: "34", label: "workspace packages" },
      { value: "6,458", label: "test functions" },
      { value: "200", label: "architecture decision records" },
      { value: "16 Jul 2026", label: "first commit" },
    ],
    evidence: {
      "Substrate Invariants": { source: "ÆON project record (invariant test suite); not re-measured" },
      "End-to-End Turn Latency": lab("ashi", "latency-reduction-32s-to-5s-ashi", "A015"),
      "Initial Behavioral Audit": lab("ashi", "behavioral-integrity-audit-ashi", "A002"),
      "Schema Validity vs Action": lab("ashi", "no-action-failure-investigation-ashi", "A004"),
      "Post-Freeze Certification": { source: "ÆON soak reports; not re-measured" },
    },
    sourceNote: "Called Ashi until October 2026; the code namespace is still ashi. The implementation repository is private; architecture and decisions are public in the Lab.",
  },
  sih: {
    specNo: "AL-0003",
    claim:
      "An air-gapped agentic workbench for confidential plants: no byte leaves the building, every answer carries its evidence.",
    measuredOn: MEASURED_ON,
    method: "git rev-list, git ls-files over backend/ and frontend/src/; build length from the hackathon record",
    facts: [
      { value: "16", label: "commits" },
      { value: "80,407", label: "lines of backend Python" },
      { value: "148", label: "test functions" },
      { value: "6,926", label: "lines of frontend source" },
      { value: "30 Aug 2026", label: "first commit" },
      { value: "1 day", label: "hackathon build" },
    ],
    evidence: {
      "Air-Gap Enforcement": { source: "SIH26117 technical report in the repository; not re-measured" },
      "Repository Scale": { source: "SIH26117 repository inventory, whole tree; the measured figures above count backend and frontend source only" },
      "Artifact Schema Conformance": { source: "SIH26117 technical report; not re-measured" },
      "Cancellation Latency": { source: "SIH26117 technical report; not re-measured" },
    },
  },
  vani: {
    specNo: "AL-0002",
    claim:
      "A local-first cognitive OS designed to still boot in fifty years, with its architecture enforced by a static-analysis guardian.",
    measuredOn: MEASURED_ON,
    method: "git rev-list, git ls-files over src/; note count from the Lab",
    facts: [
      { value: "4", label: "commits" },
      { value: "13,772", label: "lines of source Python" },
      { value: "21", label: "lab notes" },
      { value: "10 Jul 2026", label: "first commit" },
      { value: "15 Jul 2026", label: "last commit" },
    ],
    evidence: {
      "AST Architecture Violations": lab("vani", "architecture-guardian-ast-analysis", "V009"),
      "External Runtime Daemons": lab("vani", "zero-infrastructure-technology-strategy", "V007"),
      "Type Safety (Mypy Strict)": { source: "Vani project record; not re-measured" },
      "Database Longevity Score": { source: "A design target, not a measurement" },
    },
  },
  leo: {
    specNo: "AL-0001",
    claim:
      "Agent cognition run as an operating-system workload, and the audit that found 281 ways the architecture was being bypassed.",
    measuredOn: MEASURED_ON,
    method: "git rev-list, git ls-files over backend/; audit and subsystem counts from Lab notes L004 and L017",
    facts: [
      { value: "152", label: "commits" },
      { value: "130,098", label: "lines of backend Python" },
      { value: "370", label: "test functions" },
      { value: "281", label: "violations found by audit" },
      { value: "18 Jun 2026", label: "first commit" },
      { value: "43", label: "subsystems specified" },
    ],
    evidence: {
      "Subsystems Defined": lab("leo", "43-cognition-subsystems-ai-cognitive-layer", "L017"),
      "Database Engines Managed": lab("leo", "four-tier-cognitive-memory-model", "L009"),
      "Architectural Violations": lab("leo", "281-architectural-violations-phase-28", "L004"),
      "Direct SQLAlchemy Sessions": lab("leo", "281-architectural-violations-phase-28", "L004"),
    },
  },
};

projectSpecs.ashi = projectSpecs.aeon;

export function getProjectSpec(slug: string): ProjectSpec | undefined {
  return projectSpecs[slug];
}
