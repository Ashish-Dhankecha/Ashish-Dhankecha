export type ProjectStatus =
  | 'ACTIVE'
  | 'MAINTAINED'
  | 'EXPERIMENTAL'
  | 'ARCHIVED'
  | 'SUPERSEDED';

export type ClaimVerificationStatus =
  | 'IMPLEMENTED'
  | 'VERIFIED'
  | 'EXPERIMENTAL'
  | 'PARTIAL'
  | 'PLANNED'
  | 'FAILED'
  | 'DEPRECATED';

export interface ProjectLink {
  label: string;
  url: string;
  type: 'github' | 'demo' | 'docs' | 'notes' | 'paper';
}

export interface ProjectSnapshotData {
  type: string;
  started: string;
  status: string;
  primaryLanguage: string;
  stack: string[];
  domain: string;
  scale: string;
  architectureStyle: string;
  verificationRatio?: string;
}

export interface ProjectProblem {
  headline: string;
  coreQuestion: string;
  whyNotChatbot: string;
  existingLimitations: string[];
  originalHypothesis: string;
  contextSummary: string;
}

export interface ProjectConceptStep {
  step: string;
  title: string;
  description: string;
}

export interface ProjectConcept {
  headline: string;
  coreIdea: string;
  flowSteps: ProjectConceptStep[];
  diagramTitle?: string;
}

export interface ArchitectureComponent {
  id: string;
  name: string;
  status: ClaimVerificationStatus;
  purpose: string;
  howItWorks: string;
  tradeoff: string;
  keyFiles?: string[];
}

export interface ArchitectureLayer {
  layerId: string;
  name: string;
  description: string;
  components: ArchitectureComponent[];
}

export interface ProjectArchitecture {
  overview: string;
  layers: ArchitectureLayer[];
}

export interface ExecutionFlowStep {
  phase: string;
  subsystem: string;
  action: string;
  stateChange: string;
}

export interface ProjectExecutionFlow {
  title: string;
  description: string;
  concreteExample: {
    input: string;
    steps: ExecutionFlowStep[];
    output: string;
  };
}

export interface EngineeringOption {
  option: string;
  pros: string;
  cons: string;
}

export interface EngineeringDecision {
  id: string;
  adrNumber?: string;
  title: string;
  context: string;
  optionsConsidered: EngineeringOption[];
  choice: string;
  why: string;
  tradeoff: string;
  evidencePath?: string;
}

export interface HardProblem {
  id?: string;
  title: string;
  whyDifficult: string;
  initialApproach: string;
  whatFailed: string;
  finalApproach: string;
  currentState: string;
}

export interface FailureAndLesson {
  title: string;
  badge?: string;
  failure: string;
  rootCause: string;
  attemptedFix: string;
  finalFix: string;
  lesson: string;
  verifiedEvidence?: string;
}

export interface TimelineEvent {
  phase: string;
  date: string;
  title: string;
  whatChanged: string;
  why: string;
  implementation: string;
  result: string;
  status: 'VERIFIED' | 'COMPLETED' | 'PIVOT' | 'EXPERIMENTAL';
}

export interface VerificationMetric {
  label: string;
  value: string;
  context: string;
  status: 'pass' | 'fail' | 'partial' | 'audit';
}

export interface AuditResult {
  auditName: string;
  scoreOrVerdict: string;
  details: string;
  uncoveredFlaws?: string[];
}

export interface ProjectVerification {
  headline: string;
  testSuiteSummary: string;
  metrics: VerificationMetric[];
  methodology: string;
  auditResults: AuditResult[];
}

export interface PerformanceBenchmark {
  metric: string;
  before: string;
  after: string;
  unit: string;
  notes: string;
}

export interface ResourceFootprint {
  component: string;
  memory: string;
  cpuOrLatency: string;
  notes: string;
}

export interface ProjectPerformance {
  summary: string;
  benchmarks: PerformanceBenchmark[];
  resourceFootprint?: ResourceFootprint[];
}

export interface ProjectSecurity {
  threatModel: string;
  accessControls: {
    allowed: string[];
    disallowed: string[];
  };
  sandboxingMechanism: string;
}

export interface ProjectResearch {
  title: string;
  existingEngineering: string;
  experimentalDirections: string[];
  potentialContributions: string[];
  unimplementedClaimsNotes?: string;
}

export interface ProjectLesson {
  quote: string;
  takeaways: {
    title: string;
    insight: string;
  }[];
}

export interface ProjectCurrentState {
  status: ProjectStatus;
  summary: string;
  whatWorks: string[];
  whatIsIncomplete: string[];
  whatRemains: string[];
  whatIWouldChangeToday: string[];
}

export interface NextPlanItem {
  title: string;
  type: 'PLANNED' | 'RESEARCH_DIRECTION' | 'REPRESENTATIONAL';
  description: string;
}

export interface ProjectNext {
  statusNotice: string;
  items: NextPlanItem[];
}

export interface CodeSnippet {
  title: string;
  filename: string;
  language: string;
  code: string;
  explanation: string;
}

export interface ProjectCodeExploration {
  githubUrl?: string;
  localSnippets: CodeSnippet[];
}

export interface ProjectLineage {
  predecessor?: { slug: string; name: string; relationship: string };
  successor?: { slug: string; name: string; relationship: string };
  roleInEvolution: string;
}

export interface ProjectCaseStudy {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  tagline: string;
  startDate: string;
  endDate: string;
  status: ProjectStatus;
  statusLabel: string;
  isFlagship?: boolean;
  accentColor?: string;
  summary: string;
  links: ProjectLink[];
  snapshot: ProjectSnapshotData;
  problem: ProjectProblem;
  concept: ProjectConcept;
  architecture: ProjectArchitecture;
  executionFlow: ProjectExecutionFlow;
  engineeringDecisions: EngineeringDecision[];
  hardProblems: HardProblem[];
  failuresAndLessons: FailureAndLesson[];
  timeline: TimelineEvent[];
  verification: ProjectVerification;
  performance?: ProjectPerformance;
  security?: ProjectSecurity;
  research: ProjectResearch;
  lessons: ProjectLesson;
  currentState: ProjectCurrentState;
  next: ProjectNext;
  codeExploration?: ProjectCodeExploration;
  lineage: ProjectLineage;
}
