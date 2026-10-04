import React from "react";
import { ProjectCaseStudy } from "@/types/project-case-study";
import { ProjectHero } from "./project-hero";
import { ProjectSnapshot } from "./project-snapshot";
import { ProblemConcept } from "./problem-concept";
import { InteractiveArchitecture } from "./interactive-architecture";
import { ExecutionFlow } from "./execution-flow";
import { EngineeringDecisions } from "./engineering-decisions";
import { DifficultProblems } from "./difficult-problems";
import { FailuresLessons } from "./failures-lessons";
import { ProjectTimeline } from "./project-timeline";
import { VerificationMetrics } from "./verification-metrics";
import { ResearchLessons } from "./research-lessons";
import { CurrentStateNext } from "./current-state-next";
import { CodeExploration } from "./code-exploration";
import { BuildEvolutionGraph } from "./build-evolution-graph";
import { ProjectNav } from "./project-nav";

interface ProjectPageViewProps {
  project: ProjectCaseStudy;
  previousProject: ProjectCaseStudy | null;
  nextProject: ProjectCaseStudy | null;
}

export function ProjectPageView({
  project,
  previousProject,
  nextProject,
}: ProjectPageViewProps) {
  return (
    <article className="min-h-screen bg-[var(--bg)] text-[var(--ink)] selection:bg-[var(--accent-brass)] selection:text-[var(--bg)]">
      {/* 01 — PROJECT HERO */}
      <ProjectHero project={project} />

      {/* 02 — PROJECT SNAPSHOT */}
      <ProjectSnapshot snapshot={project.snapshot} />

      {/* 03 & 04 — PROBLEM & CONCEPT */}
      <ProblemConcept problem={project.problem} concept={project.concept} />

      {/* 05 — INTERACTIVE ARCHITECTURE */}
      <InteractiveArchitecture architecture={project.architecture} />

      {/* 06 — HOW IT WORKS / EXECUTION FLOW */}
      <ExecutionFlow executionFlow={project.executionFlow} />

      {/* 08 — KEY ENGINEERING DECISIONS (ADRs) */}
      <EngineeringDecisions decisions={project.engineeringDecisions} />

      {/* 09 — DIFFICULT PROBLEMS */}
      <DifficultProblems problems={project.hardProblems} />

      {/* 10 — FAILURES & LESSONS (WHAT BROKE) */}
      <FailuresLessons failures={project.failuresAndLessons} />

      {/* 11 — EVOLUTION / TIMELINE */}
      <ProjectTimeline timeline={project.timeline} />

      {/* 12, 13, 14 — VERIFICATION, PERFORMANCE & SECURITY */}
      <VerificationMetrics
        verification={project.verification}
        performance={project.performance}
        security={project.security}
      />

      {/* 15 & 16 — RESEARCH & LESSONS */}
      <ResearchLessons research={project.research} lessons={project.lessons} />

      {/* 17 & 18 — CURRENT STATE & WHAT'S NEXT */}
      <CurrentStateNext
        currentState={project.currentState}
        next={project.next}
      />

      {/* 19 — CODE EXPLORATION (IF AVAILABLE) */}
      {project.codeExploration && (
        <CodeExploration exploration={project.codeExploration} />
      )}

      {/* 21 — SYSTEM BUILD EVOLUTION */}
      <BuildEvolutionGraph />

      {/* 22 — PROJECT NAVIGATION & RELATED SYSTEMS */}
      <ProjectNav
        currentProject={project}
        previousProject={previousProject}
        nextProject={nextProject}
      />
    </article>
  );
}
