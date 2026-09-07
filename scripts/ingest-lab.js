#!/usr/bin/env node
/**
 * ingest-lab.js
 *
 * Authoritative Ingestion Pipeline for Ashish Dhankecha's Lab Archive.
 * Zero-dependency pure Node.js script that works across all CI/CD environments (Netlify, Vercel, etc.)
 * Reads 100% of the Markdown files in /lab-content/ (Ashi, Leo, Vani),
 * extracts YAML frontmatter and structural sections, computes all metrics
 * dynamically, and writes the reproducible build artifact to:
 *   src/content/lab-generated.json
 */

const fs = require("fs");
const path = require("path");

const WORKSPACE_ROOT = path.resolve(__dirname, "..");
const LAB_CONTENT_DIR = path.join(WORKSPACE_ROOT, "lab-content");
const OUTPUT_JSON_PATH = path.join(WORKSPACE_ROOT, "src", "content", "lab-generated.json");

const PROJECT_META = {
  Ashi: {
    id: "ashi",
    number: "01",
    short_name: "Ashi",
    name: "Ashi — Personal Cognitive Operating System",
    status: "Active / Production",
    documented_period: "2025–2026",
    technologies: ["Python", "uv Monorepo", "PostgreSQL", "llama.cpp", "Gemini API", "FastAPI"],
    one_line_summary: "A 28-package personal AI operating system built from first principles to think alongside one person, running locally with cloud fallback.",
    problem_statement: "Building an autonomous personal AI that operates persistently across days requires maintaining rigorous action integrity, avoiding silent empty completions, and executing local inference without destabilizing system latency.",
    project_story: "Ashi was developed as an independent research investigation toward an autonomous personal cognitive operating system. Built as a 28-package Python monorepo with an acyclic dependency graph, Ashi was subjected to intense empirical audits—including a 3/10 behavioral integrity scoring, discovery of the vacuous success bug where empty plans counted as completed achievements, and benchmarking six sub-2B models to find the real capability ceiling on consumer hardware.",
    documented_milestones: [
      { date: "2025-11", label: "Initial Monorepo Architecture", detail: "28 packages established in uv workspace with strict 6-layer dependency rules." },
      { date: "2026-03", label: "Inference Engine Benchmark", detail: "6 sub-2B models evaluated on consumer hardware; discovered llama.cpp cancellation segfault." },
      { date: "2026-05", label: "Latency Cascade Elimination", detail: "Turn latency reduced from 32.8s to 5.4s by removing Ollama and fixing provider timeout cascades." },
      { date: "2026-08", label: "Behavioral Integrity Audit & Phase T", detail: "Scored system 3/10; discovered Vacuous Success Bug; instituted strict action-integrity gates." }
    ],
    logical_sequence: [
      { step: "01", title: "Subsystem Proliferation", desc: "Built 28 modular subsystems with high test coverage and certified protocols." },
      { step: "02", title: "Empirical Audit Failure", desc: "Live execution revealed vacuous success (empty plans marked achieved) and silent cognition drops." },
      { step: "03", title: "Architecture Freeze", desc: "Locked substrate code to stop churn and force deep debugging of live behavioral bugs." },
      { step: "04", title: "Hardening & Truth Boundaries", desc: "Enforced execution evidence requirements, ambient world perception at 24µs, and acyclic invariant tests." }
    ],
    evolutionary_flow: {
      what_i_thought: "High unit test coverage across 28 decoupled packages would guarantee reliable autonomous behavior in live operation.",
      what_happened: "Ashi scored 3/10 in live audit: vacuous truth caused empty plans to be marked 'ACHIEVED' in 370ms, and initiative notes were calculated every turn but dropped before rendering.",
      what_i_learned: "Unit tests exercising subsystems in isolation cannot detect starvation by valid empty inputs. 'Doing nothing' must never evaluate to 'task succeeded.'",
      what_i_do_differently_now: "Enforce strict truth boundaries (execution evidence required for completion), architecture freezes during stabilization, and empirical audits against live system state."
    },
    cross_project_connections: [
      "Inherited the OS-first concept from LEO, but replaced dynamic multi-technology databases with an acyclic monorepo and single relational store.",
      "Adopted the lesson from VANI's AST Architecture Guardian by adding automated tests for package dependency cycle prevention (ADR 0148)."
    ]
  },
  Leo: {
    id: "leo",
    number: "02",
    short_name: "LEO",
    name: "LEO — AI Operating Companion",
    status: "Archived Research / Forensic Exploration",
    documented_period: "2025–2026",
    technologies: ["Python", "FastAPI", "PostgreSQL", "Neo4j", "Redis", "LangGraph", "Gemini"],
    one_line_summary: "An ambitious research exploration into modeling an AI companion as an operating system kernel with 43 cognitive subsystems.",
    problem_statement: "Can an intelligent companion be structured as an operating system—with a Kernel, CMMU (Cognitive Memory Management Unit), Interconnect, and Scheduler—without collapsing under architectural drift and integration debt?",
    project_story: "LEO represents an ambitious, conceptually deep exploration into treating AI companion software as a full operating system. It defined 43 granular cognitive subsystems, an atomic rollback boot sequence, and a multi-tier memory architecture. However, an exhaustive audit revealed an acute implementation reality gap: 281 direct-database violations bypassed the CMMU gatekeeper, test suites relied excessively on stubs, and interface over-engineering accumulated substantial technical debt.",
    documented_milestones: [
      { date: "2025-08", label: "Cognitive OS Architecture Vision", detail: "Drafted constitution for AI operating companion with CMMU and Interconnect Network-on-Chip." },
      { date: "2025-12", label: "43 Subsystems & Memory Hierarchy", detail: "Implemented multi-tier memory (working, episodic, semantic, procedural) across Postgres, Neo4j, and Redis." },
      { date: "2026-04", label: "Provider Failover & Router Debugging", detail: "Discovered Gemini JSON parsing anomalies and failover model-name injection bugs." },
      { date: "2026-06", label: "Phase 28 Architectural Violation Audit", detail: "Automated audit exposed 281 direct database violations bypassing the central CMMU gateway." }
    ],
    logical_sequence: [
      { step: "01", title: "Architectural Ambition", desc: "Specified an elaborate 43-subsystem OS architecture with multi-database persistence." },
      { step: "02", title: "Implementation Drift", desc: "Fast development bypassed memory gatekeepers, introducing 281 direct-database calls." },
      { step: "03", title: "Audit & Forensic Realization", desc: "Discovered test suite passing 297 tests while masking 11 broken real-world integrations via mocks." },
      { step: "04", title: "Architectural Archival", desc: "Preserved research insights and cataloged the divergence as foundational lessons for subsequent systems." }
    ],
    evolutionary_flow: {
      what_i_thought: "Granular decomposition into 43 subsystems and specialized databases (Postgres + Neo4j + Redis) would provide the ultimate cognitive flexibility.",
      what_happened: "Without automated compile-time enforcement, developers bypassed the CMMU 281 times; mocks proliferated to keep CI green while live integrations rotted.",
      what_i_learned: "Architecture without enforcement is just documentation. Complex multi-database topologies create massive friction unless governed by strict automated invariants.",
      what_i_do_differently_now: "Never build architectural abstraction layers without compile-time or AST enforcement. Minimize external database types; favor simple, auditable single-engine stores."
    },
    cross_project_connections: [
      "The 281 direct-database violations in LEO directly prompted VANI's strict 'Phase 0 Architecture Before Features' rule and AST Architecture Guardian.",
      "LEO's complex Neo4j + Redis + Postgres stack directly caused VANI and Ashi to reject dedicated graph databases in favor of simple SQLite/Postgres schemas."
    ]
  },
  Vani: {
    id: "vani",
    number: "03",
    short_name: "VANI",
    name: "VANI — Cognitive Operating System",
    status: "Phase 0 Complete / Phase 1 Active",
    documented_period: "2026",
    technologies: ["Python", "Strict Typing", "SQLite", "AST Static Analysis", "Custom Event Bus", "Zero Cloud Infra"],
    one_line_summary: "A 50-year personal AI operating system engineered with zero external infrastructure, strict AST certification, and complete local sovereignty.",
    problem_statement: "How to design a personal AI system intended to last 50 years without succumbing to vendor churn, graph database deprecation, or framework abstraction collapse?",
    project_story: "VANI was designed as a direct counter-reaction to fragile, hype-driven AI software patterns. In Phase 0, VANI completed an entire operating system kernel, deterministic boot sequence, event bus, and cognitive scheduler—with zero user-facing cognitive features. Every design decision was codified into formal ADRs: rejecting LangChain in favor of raw AIPort contracts, rejecting Neo4j/Kuzu in favor of plain SQLite tables, restricting the entire system to 15 dependencies, and building an AST Guardian to ensure architecture validates itself.",
    documented_milestones: [
      { date: "2026-06", label: "VANI Project Genesis & Governance", detail: "Drafted governance hierarchy, zero-infrastructure strategy, and 50-year longevity laws." },
      { date: "2026-07", label: "Database & Framework Rejections", detail: "Formally rejected LangChain (ADR) and dedicated graph databases (SQLite property graph selected)." },
      { date: "2026-08", label: "Kernel & Subsystem Layering", detail: "Implemented Foundation -> Context -> State Machine -> Engine layering pattern with Composition Root." },
      { date: "2026-09", label: "Phase 0 Certification & AST Guardian", detail: "100% strict typing, 0 lint warnings, automated AST architecture verification with zero placeholder modules." }
    ],
    logical_sequence: [
      { step: "01", title: "Philosophical Laws", desc: "Established AI models as 'fuel, not architecture' and set a 15-dependency maximum." },
      { step: "02", title: "Phase 0 Architecture-Only", desc: "Engineered kernel boot, event bus, and cognitive scheduler with zero user-facing chatbot features." },
      { step: "03", title: "AST Guardian", desc: "Created AST analysis tool to mechanically block imports that violate subsystem hierarchy." },
      { step: "04", title: "Self-Validating Substrate", desc: "Certified Phase 0 architecture as complete and immutable before writing any cognitive reasoning code." }
    ],
    evolutionary_flow: {
      what_i_thought: "Modern AI frameworks (LangChain) and specialized graph databases (Neo4j, Kuzu) would accelerate building a lifetime cognitive assistant.",
      what_happened: "Rapid abstraction churn, leaky protocols, and orphan risks (Kuzu acquisition) threatened long-term system sovereignty; 100K nodes is not big data.",
      what_i_learned: "External abstractions age poorly. Direct, minimal protocols (`AIPort`) and simple SQLite property tables provide vastly superior 50-year longevity.",
      what_i_do_differently_now: "Build architecture before implementation. Enforce strict AST guardians at CI time. Treat AI models as interchangeable fuel rather than system foundation."
    },
    cross_project_connections: [
      "Direct architectural evolution of LEO's lessons: LEO had 281 architecture violations; VANI built an AST Guardian to make violations syntactically impossible.",
      "VANI's model-independent AIPort protocol and SQLite strategy formed the conceptual blueprint for Ashi's local-first inference layer."
    ]
  }
};

const TYPE_NORMALIZATION = {
  "ARCHITECTURE DECISION": "ARCHITECTURE_DECISION",
  "ARCHITECTURE_DECISION": "ARCHITECTURE_DECISION",
  "ARCHITECTURAL_DECISION": "ARCHITECTURE_DECISION",
  "DEBUGGING_DISCOVERY": "DEBUGGING_DISCOVERY",
  "ENGINEERING NOTE": "ENGINEERING_NOTE",
  "ENGINEERING_NOTE": "ENGINEERING_NOTE",
  "EXPERIMENT": "EXPERIMENT",
  "POST-MORTEM": "POST_MORTEM",
  "POST_MORTEM": "POST_MORTEM",
  "TECHNICAL_DESIGN": "TECHNICAL_DESIGN",
  "SYSTEM DESIGN": "SYSTEM_DESIGN",
  "SYSTEM_DESIGN": "SYSTEM_DESIGN",
  "BUILD_LOG": "BUILD_LOG",
};

const TYPE_DISPLAY_NAMES = {
  "ARCHITECTURE_DECISION": "Architecture Decision",
  "DEBUGGING_DISCOVERY": "Debugging Discovery",
  "ENGINEERING_NOTE": "Engineering Note",
  "EXPERIMENT": "Experiment",
  "POST_MORTEM": "Post-Mortem",
  "TECHNICAL_DESIGN": "Technical Design",
  "SYSTEM_DESIGN": "System Design",
  "BUILD_LOG": "Build Log",
};

const CATEGORY_GROUPS = {
  "ARCHITECTURE_DECISION": "Architecture",
  "DEBUGGING_DISCOVERY": "Debugging",
  "ENGINEERING_NOTE": "Engineering Notes",
  "EXPERIMENT": "Experiments",
  "POST_MORTEM": "Post-Mortems",
  "TECHNICAL_DESIGN": "System Design",
  "SYSTEM_DESIGN": "System Design",
  "BUILD_LOG": "Build Logs",
};

function parseYamlFrontmatter(raw) {
  const result = {};
  const lines = raw.split("\n");
  let currentKey = null;
  let inArray = false;

  for (let line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    // Check for array item
    if (trimmed.startsWith("- ") && currentKey && inArray) {
      let item = trimmed.slice(2).trim();
      if ((item.startsWith('"') && item.endsWith('"')) || (item.startsWith("'") && item.endsWith("'"))) {
        item = item.slice(1, -1);
      }
      result[currentKey].push(item);
      continue;
    }

    // Check for key-value
    const colonIdx = line.indexOf(":");
    if (colonIdx !== -1) {
      const key = line.slice(0, colonIdx).trim();
      let val = line.slice(colonIdx + 1).trim();

      if (val === "" || val === "[]") {
        currentKey = key;
        inArray = true;
        result[key] = [];
      } else {
        inArray = false;
        currentKey = key;

        if (val.startsWith("[") && val.endsWith("]")) {
          // Inline array like [foo, bar]
          result[key] = val
            .slice(1, -1)
            .split(",")
            .map((s) => s.trim().replace(/^['"]|['"]$/g, ""))
            .filter(Boolean);
        } else if (val.toLowerCase() === "true") {
          result[key] = true;
        } else if (val.toLowerCase() === "false") {
          result[key] = false;
        } else if (!isNaN(val) && val !== "") {
          result[key] = Number(val);
        } else {
          if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
            val = val.slice(1, -1);
          }
          result[key] = val;
        }
      }
    }
  }

  return result;
}

function cleanMarkdownText(text) {
  if (!text) return "";
  return text.trim();
}

function parseMarkdownSections(body) {
  const sections = {};
  const lines = body.split("\n");
  let currentHeading = null;
  let currentLines = [];

  for (let line of lines) {
    const match = line.match(/^##\s+(.+)$/);
    if (match) {
      if (currentHeading) {
        sections[currentHeading] = currentLines.join("\n").trim();
      }
      currentHeading = match[1].trim();
      currentLines = [];
    } else {
      if (currentHeading !== null) {
        currentLines.push(line);
      }
    }
  }

  if (currentHeading) {
    sections[currentHeading] = currentLines.join("\n").trim();
  }

  return sections;
}

function extractFailureSequence(sections) {
  const attempt = sections["Initial Approach"] || sections["The Question"] || "";
  const failure = sections["What Happened"] || sections["Findings"] || "";
  const diagnosis = sections["Diagnosis"] || sections["Failure Analysis"] || "";
  const lesson = sections["What I Learned"] || "";
  const nextStep = sections["What Changed"] || sections["What I Would Do Differently"] || "";

  if (attempt || failure || diagnosis || lesson || nextStep) {
    return {
      attempt: cleanMarkdownText(attempt),
      failure: cleanMarkdownText(failure),
      diagnosis: cleanMarkdownText(diagnosis),
      lesson: cleanMarkdownText(lesson),
      next_iteration: cleanMarkdownText(nextStep),
    };
  }
  return null;
}

function extractEvolutionaryFlow(sections) {
  const whatIThought = sections["Initial Approach"] || sections["The Question"] || sections["Context"] || "";
  const whatHappened = sections["What Happened"] || sections["Diagnosis"] || "";
  const whatILearned = sections["What I Learned"] || sections["What Changed"] || "";
  const whatIDoDifferently = sections["What I Would Do Differently"] || sections["Broader Principle"] || "";

  return {
    what_i_thought: cleanMarkdownText(whatIThought),
    what_happened: cleanMarkdownText(whatHappened),
    what_i_learned: cleanMarkdownText(whatILearned),
    what_i_do_differently_now: cleanMarkdownText(whatIDoDifferently),
  };
}

function ingestAll() {
  console.log(`[*] Scanning Lab Content in ${LAB_CONTENT_DIR}...`);
  const projectDirs = ["Ashi", "Leo", "Vani"];
  const pieces = [];

  for (const projDir of projectDirs) {
    const projPath = path.join(LAB_CONTENT_DIR, projDir);
    if (!fs.existsSync(projPath)) {
      console.log(`[!] Warning: Directory not found: ${projPath}`);
      continue;
    }

    const files = fs
      .readdirSync(projPath)
      .filter((f) => f.endsWith(".md"))
      .sort();

    for (const basename of files) {
      if (basename === "INDEX.md" || basename === "EXTRACTION-REPORT.md") {
        continue;
      }

      const filePath = path.join(projPath, basename);
      const content = fs.readFileSync(filePath, "utf-8");

      if (!content.startsWith("---")) {
        console.log(`[!] Warning: File ${basename} does not have YAML frontmatter. Skipping.`);
        continue;
      }

      const parts = content.split("---");
      if (parts.length < 3) {
        console.log(`[!] Warning: Malformed frontmatter in ${basename}. Skipping.`);
        continue;
      }

      const frontmatterRaw = parts[1];
      const bodyRaw = parts.slice(2).join("---").trim();

      let fm;
      try {
        fm = parseYamlFrontmatter(frontmatterRaw);
      } catch (e) {
        console.log(`[!] YAML Error in ${basename}: ${e.message}`);
        continue;
      }

      const slug = fm.slug;
      const title = fm.title;
      const rawType = fm.content_type || fm.type || "ENGINEERING_NOTE";
      const normType = TYPE_NORMALIZATION[String(rawType).trim()] || "ENGINEERING_NOTE";
      const projName = fm.project || projDir;

      let projectId;
      let projectDisplay;
      if (/ashi/i.test(projName)) {
        projectId = "ashi";
        projectDisplay = "Ashi";
      } else if (/leo/i.test(projName)) {
        projectId = "leo";
        projectDisplay = "LEO";
      } else if (/vani/i.test(projName)) {
        projectId = "vani";
        projectDisplay = "VANI";
      } else {
        projectId = projDir.toLowerCase();
        projectDisplay = projDir;
      }

      const status = fm.status || "Published";
      const dateVal = fm.date;
      const dateStr = dateVal !== undefined && dateVal !== null ? String(dateVal).trim() : null;
      const topics = Array.isArray(fm.topics) ? fm.topics : [];
      const evidenceLevel = String(fm.evidence_level || "high").trim().toLowerCase();
      const publishable = fm.publishable !== undefined ? Boolean(fm.publishable) : true;

      const orderMatch = basename.match(/^(\d+)-/);
      const orderNum = orderMatch ? parseInt(orderMatch[1], 10) : 999;

      const sections = parseMarkdownSections(bodyRaw);

      let oneLineSummary = cleanMarkdownText(sections["One-Line Summary"] || "");
      if (!oneLineSummary) {
        oneLineSummary = fm.description || "";
      }

      const techRefsRaw = sections["Technical References"] || "";
      const techRefs = [];
      for (const line of techRefsRaw.split("\n")) {
        const stripped = line.trim();
        if (stripped.startsWith("- ") || stripped.startsWith("* ")) {
          const refText = stripped.slice(2).trim().replace(/^`|`$/g, "");
          if (refText) techRefs.push(refText);
        } else if (stripped && !stripped.startsWith("#")) {
          techRefs.push(stripped.replace(/^`|`$/g, ""));
        }
      }

      const sourceConfidence = cleanMarkdownText(sections["Source Confidence"] || "");
      const evolutionaryFlow = extractEvolutionaryFlow(sections);
      const failureSequence = extractFailureSequence(sections);
      const relSourcePath = path.join("lab-content", projDir, basename);

      const excludedSectionTitles = new Set([
        "Content Type", "Project", "Date", "Status", "One-Line Summary",
        "Source Confidence", "Content Value", "Publication Notes"
      ]);

      const customSections = [];
      for (const [hTitle, hBody] of Object.entries(sections)) {
        if (!excludedSectionTitles.has(hTitle) && hBody) {
          customSections.push({
            title: hTitle,
            content: hBody,
          });
        }
      }

      const pieceData = {
        slug: slug,
        order: orderNum,
        title: title,
        project: projectDisplay,
        project_slug: projectId,
        content_type: normType,
        content_type_display: TYPE_DISPLAY_NAMES[normType] || normType,
        category_group: CATEGORY_GROUPS[normType] || "Engineering Notes",
        status: status,
        date: dateStr,
        topics: topics,
        evidence_level: evidenceLevel,
        publishable: publishable,
        one_line_summary: oneLineSummary,
        source_file: relSourcePath,
        source_file_basename: basename,
        technical_references: techRefs,
        source_confidence: sourceConfidence,
        evolutionary_flow: evolutionaryFlow,
        failure_sequence: failureSequence,
        sections: customSections,
        raw_body: bodyRaw,
      };

      pieces.push(pieceData);
    }
  }

  console.log(`[*] Successfully parsed ${pieces.length} content pieces.`);

  const totalPieces = pieces.length;
  const byProject = {};
  const byType = {};
  const byCategory = {};
  const allTopicsMap = {};

  for (const piece of pieces) {
    const pSlug = piece.project_slug;
    byProject[pSlug] = (byProject[pSlug] || 0) + 1;

    const cType = piece.content_type;
    byType[cType] = (byType[cType] || 0) + 1;

    const catGrp = piece.category_group;
    byCategory[catGrp] = (byCategory[catGrp] || 0) + 1;

    for (const t of piece.topics || []) {
      allTopicsMap[t] = (allTopicsMap[t] || 0) + 1;
    }
  }

  const sortedTopics = Object.entries(allTopicsMap)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([topic, count]) => ({ topic, count }));

  const projectsList = [];
  for (const [pKey, meta] of Object.entries(PROJECT_META)) {
    const pId = meta.id;
    const projPieces = pieces.filter((p) => p.project_slug === pId);
    const projTypes = {};
    for (const p of projPieces) {
      const t = p.content_type;
      projTypes[t] = (projTypes[t] || 0) + 1;
    }

    projectsList.push({
      ...meta,
      pieces_count: projPieces.length,
      type_counts: projTypes,
      pieces_slugs: projPieces.map((p) => p.slug),
    });
  }

  const metrics = {
    total_pieces: totalPieces,
    total_projects: projectsList.length,
    by_project: byProject,
    by_type: byType,
    by_category: byCategory,
    topics: sortedTopics,
    generated_at: new Date().toISOString(),
  };

  const finalPayload = {
    metrics: metrics,
    projects: projectsList,
    pieces: pieces,
  };

  fs.mkdirSync(path.dirname(OUTPUT_JSON_PATH), { recursive: true });
  fs.writeFileSync(OUTPUT_JSON_PATH, JSON.stringify(finalPayload, null, 2), "utf-8");

  console.log(`[✓] Successfully generated ${OUTPUT_JSON_PATH}`);
  console.log(`    - Total Pieces: ${totalPieces}`);
  console.log(`    - Ashi: ${byProject.ashi || 0}`);
  console.log(`    - LEO: ${byProject.leo || 0}`);
  console.log(`    - VANI: ${byProject.vani || 0}`);
  console.log(`    - Content Types:`, JSON.stringify(byType, null, 4));
}

if (require.main === module) {
  ingestAll();
}

module.exports = { ingestAll };
