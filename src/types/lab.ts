export type LabContentType =
  | "ARCHITECTURE_DECISION"
  | "DEBUGGING_DISCOVERY"
  | "ENGINEERING_NOTE"
  | "EXPERIMENT"
  | "POST_MORTEM"
  | "TECHNICAL_DESIGN"
  | "SYSTEM_DESIGN"
  | "BUILD_LOG";

export type LabCategoryGroup =
  | "All"
  | "Architecture"
  | "Debugging"
  | "Engineering Notes"
  | "Experiments"
  | "Post-Mortems"
  | "System Design"
  | "Build Logs";

export interface LabSection {
  title: string;
  content: string;
}

export interface EvolutionaryFlow {
  what_i_thought: string;
  what_happened: string;
  what_i_learned: string;
  what_i_do_differently_now: string;
}

export interface FailureSequence {
  attempt: string;
  failure: string;
  diagnosis: string;
  lesson: string;
  next_iteration: string;
}

export interface LabPiece {
  slug: string;
  order: number;
  title: string;
  project: string;
  project_slug: "ashi" | "leo" | "vani" | string;
  content_type: LabContentType;
  content_type_display: string;
  category_group: string;
  status: string;
  date: string | null;
  topics: string[];
  evidence_level: string;
  publishable: boolean;
  one_line_summary: string;
  source_file: string;
  source_file_basename: string;
  technical_references: string[];
  source_confidence: string;
  evolutionary_flow: EvolutionaryFlow;
  failure_sequence: FailureSequence | null;
  sections: LabSection[];
  raw_body: string;
}

export interface DocumentedMilestone {
  date: string;
  label: string;
  detail: string;
}

export interface SequenceStep {
  step: string;
  title: string;
  desc: string;
}

export interface LabProject {
  id: "ashi" | "leo" | "vani" | string;
  number: string;
  short_name: string;
  name: string;
  status: string;
  documented_period: string;
  technologies: string[];
  one_line_summary: string;
  problem_statement: string;
  project_story: string;
  documented_milestones: DocumentedMilestone[];
  logical_sequence: SequenceStep[];
  evolutionary_flow: EvolutionaryFlow;
  cross_project_connections: string[];
  pieces_count: number;
  type_counts: Record<string, number>;
  pieces_slugs: string[];
}

export interface TopicMetric {
  topic: string;
  count: number;
}

export interface LabMetrics {
  total_pieces: number;
  total_projects: number;
  by_project: Record<string, number>;
  by_type: Record<string, number>;
  by_category: Record<string, number>;
  topics: TopicMetric[];
  generated_at: string;
}

export interface LabPayload {
  metrics: LabMetrics;
  projects: LabProject[];
  pieces: LabPiece[];
}
