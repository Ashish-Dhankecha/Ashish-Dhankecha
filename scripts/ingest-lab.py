#!/usr/bin/env python3
"""
ingest-lab.py

Authoritative Ingestion Pipeline for Ashish Dhankecha's Lab Archive.
Reads 100% of the Markdown files in /lab-content/ (Ashi, Leo, Vani),
extracts YAML frontmatter and structural sections, computes all metrics
dynamically, and writes the reproducible build artifact to:
  src/content/lab-generated.json

RULES:
1. /lab-content/*.md is the SOLE source of truth.
2. Never manually edit lab-generated.json.
3. All metrics and counts are computed dynamically from ingested data.
4. Distinguish between documented calendar dates (DOCUMENTED) and logical experiment sequences (SEQUENCE).
5. Extract the "What Changed" evolutionary flow:
   WHAT I THOUGHT -> WHAT HAPPENED -> WHAT I LEARNED -> WHAT I DO DIFFERENTLY NOW
"""

import os
import re
import json
import glob
from datetime import datetime, timezone
import yaml

WORKSPACE_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LAB_CONTENT_DIR = os.path.join(WORKSPACE_ROOT, "lab-content")
OUTPUT_JSON_PATH = os.path.join(WORKSPACE_ROOT, "src", "content", "lab-generated.json")

PROJECT_META = {
    "Ashi": {
        "id": "ashi",
        "number": "01",
        "short_name": "Ashi",
        "name": "Ashi — Personal Cognitive Operating System",
        "status": "Active / Production",
        "documented_period": "2025–2026",
        "technologies": ["Python", "uv Monorepo", "PostgreSQL", "llama.cpp", "Gemini API", "FastAPI"],
        "one_line_summary": "A 28-package personal AI operating system built from first principles to think alongside one person, running locally with cloud fallback.",
        "problem_statement": "Building an autonomous personal AI that operates persistently across days requires maintaining rigorous action integrity, avoiding silent empty completions, and executing local inference without destabilizing system latency.",
        "project_story": "Ashi was developed as an independent research investigation toward an autonomous personal cognitive operating system. Built as a 28-package Python monorepo with an acyclic dependency graph, Ashi was subjected to intense empirical audits—including a 3/10 behavioral integrity scoring, discovery of the vacuous success bug where empty plans counted as completed achievements, and benchmarking six sub-2B models to find the real capability ceiling on consumer hardware.",
        "documented_milestones": [
            {"date": "2025-11", "label": "Initial Monorepo Architecture", "detail": "28 packages established in uv workspace with strict 6-layer dependency rules."},
            {"date": "2026-03", "label": "Inference Engine Benchmark", "detail": "6 sub-2B models evaluated on consumer hardware; discovered llama.cpp cancellation segfault."},
            {"date": "2026-05", "label": "Latency Cascade Elimination", "detail": "Turn latency reduced from 32.8s to 5.4s by removing Ollama and fixing provider timeout cascades."},
            {"date": "2026-08", "label": "Behavioral Integrity Audit & Phase T", "detail": "Scored system 3/10; discovered Vacuous Success Bug; instituted strict action-integrity gates."}
        ],
        "logical_sequence": [
            {"step": "01", "title": "Subsystem Proliferation", "desc": "Built 28 modular subsystems with high test coverage and certified protocols."},
            {"step": "02", "title": "Empirical Audit Failure", "desc": "Live execution revealed vacuous success (empty plans marked achieved) and silent cognition drops."},
            {"step": "03", "title": "Architecture Freeze", "desc": "Locked substrate code to stop churn and force deep debugging of live behavioral bugs."},
            {"step": "04", "title": "Hardening & Truth Boundaries", "desc": "Enforced execution evidence requirements, ambient world perception at 24µs, and acyclic invariant tests."}
        ],
        "evolutionary_flow": {
            "what_i_thought": "High unit test coverage across 28 decoupled packages would guarantee reliable autonomous behavior in live operation.",
            "what_happened": "Ashi scored 3/10 in live audit: vacuous truth caused empty plans to be marked 'ACHIEVED' in 370ms, and initiative notes were calculated every turn but dropped before rendering.",
            "what_i_learned": "Unit tests exercising subsystems in isolation cannot detect starvation by valid empty inputs. 'Doing nothing' must never evaluate to 'task succeeded.'",
            "what_i_do_differently_now": "Enforce strict truth boundaries (execution evidence required for completion), architecture freezes during stabilization, and empirical audits against live system state."
        },
        "cross_project_connections": [
            "Inherited the OS-first concept from LEO, but replaced dynamic multi-technology databases with an acyclic monorepo and single relational store.",
            "Adopted the lesson from VANI's AST Architecture Guardian by adding automated tests for package dependency cycle prevention (ADR 0148)."
        ]
    },
    "Leo": {
        "id": "leo",
        "number": "02",
        "short_name": "LEO",
        "name": "LEO — AI Operating Companion",
        "status": "Archived Research / Forensic Exploration",
        "documented_period": "2025–2026",
        "technologies": ["Python", "FastAPI", "PostgreSQL", "Neo4j", "Redis", "LangGraph", "Gemini"],
        "one_line_summary": "An ambitious research exploration into modeling an AI companion as an operating system kernel with 43 cognitive subsystems.",
        "problem_statement": "Can an intelligent companion be structured as an operating system—with a Kernel, CMMU (Cognitive Memory Management Unit), Interconnect, and Scheduler—without collapsing under architectural drift and integration debt?",
        "project_story": "LEO represents an ambitious, conceptually deep exploration into treating AI companion software as a full operating system. It defined 43 granular cognitive subsystems, an atomic rollback boot sequence, and a multi-tier memory architecture. However, an exhaustive audit revealed an acute implementation reality gap: 281 direct-database violations bypassed the CMMU gatekeeper, test suites relied excessively on stubs, and interface over-engineering accumulated substantial technical debt.",
        "documented_milestones": [
            {"date": "2025-08", "label": "Cognitive OS Architecture Vision", "detail": "Drafted constitution for AI operating companion with CMMU and Interconnect Network-on-Chip."},
            {"date": "2025-12", "label": "43 Subsystems & Memory Hierarchy", "detail": "Implemented multi-tier memory (working, episodic, semantic, procedural) across Postgres, Neo4j, and Redis."},
            {"date": "2026-04", "label": "Provider Failover & Router Debugging", "detail": "Discovered Gemini JSON parsing anomalies and failover model-name injection bugs."},
            {"date": "2026-06", "label": "Phase 28 Architectural Violation Audit", "detail": "Automated audit exposed 281 direct database violations bypassing the central CMMU gateway."}
        ],
        "logical_sequence": [
            {"step": "01", "title": "Architectural Ambition", "desc": "Specified an elaborate 43-subsystem OS architecture with multi-database persistence."},
            {"step": "02", "title": "Implementation Drift", "desc": "Fast development bypassed memory gatekeepers, introducing 281 direct-database calls."},
            {"step": "03", "title": "Audit & Forensic Realization", "desc": "Discovered test suite passing 297 tests while masking 11 broken real-world integrations via mocks."},
            {"step": "04", "title": "Architectural Archival", "desc": "Preserved research insights and cataloged the divergence as foundational lessons for subsequent systems."}
        ],
        "evolutionary_flow": {
            "what_i_thought": "Granular decomposition into 43 subsystems and specialized databases (Postgres + Neo4j + Redis) would provide the ultimate cognitive flexibility.",
            "what_happened": "Without automated compile-time enforcement, developers bypassed the CMMU 281 times; mocks proliferated to keep CI green while live integrations rotted.",
            "what_i_learned": "Architecture without enforcement is just documentation. Complex multi-database topologies create massive friction unless governed by strict automated invariants.",
            "what_i_do_differently_now": "Never build architectural abstraction layers without compile-time or AST enforcement. Minimize external database types; favor simple, auditable single-engine stores."
        },
        "cross_project_connections": [
            "The 281 direct-database violations in LEO directly prompted VANI's strict 'Phase 0 Architecture Before Features' rule and AST Architecture Guardian.",
            "LEO's complex Neo4j + Redis + Postgres stack directly caused VANI and Ashi to reject dedicated graph databases in favor of simple SQLite/Postgres schemas."
        ]
    },
    "Vani": {
        "id": "vani",
        "number": "03",
        "short_name": "VANI",
        "name": "VANI — Cognitive Operating System",
        "status": "Phase 0 Complete / Phase 1 Active",
        "documented_period": "2026",
        "technologies": ["Python", "Strict Typing", "SQLite", "AST Static Analysis", "Custom Event Bus", "Zero Cloud Infra"],
        "one_line_summary": "A 50-year personal AI operating system engineered with zero external infrastructure, strict AST certification, and complete local sovereignty.",
        "problem_statement": "How to design a personal AI system intended to last 50 years without succumbing to vendor churn, graph database deprecation, or framework abstraction collapse?",
        "project_story": "VANI was designed as a direct counter-reaction to fragile, hype-driven AI software patterns. In Phase 0, VANI completed an entire operating system kernel, deterministic boot sequence, event bus, and cognitive scheduler—with zero user-facing cognitive features. Every design decision was codified into formal ADRs: rejecting LangChain in favor of raw AIPort contracts, rejecting Neo4j/Kuzu in favor of plain SQLite tables, restricting the entire system to 15 dependencies, and building an AST Guardian to ensure architecture validates itself.",
        "documented_milestones": [
            {"date": "2026-06", "label": "VANI Project Genesis & Governance", "detail": "Drafted governance hierarchy, zero-infrastructure strategy, and 50-year longevity laws."},
            {"date": "2026-07", "label": "Database & Framework Rejections", "detail": "Formally rejected LangChain (ADR) and dedicated graph databases (SQLite property graph selected)."},
            {"date": "2026-08", "label": "Kernel & Subsystem Layering", "detail": "Implemented Foundation -> Context -> State Machine -> Engine layering pattern with Composition Root."},
            {"date": "2026-09", "label": "Phase 0 Certification & AST Guardian", "detail": "100% strict typing, 0 lint warnings, automated AST architecture verification with zero placeholder modules."}
        ],
        "logical_sequence": [
            {"step": "01", "title": "Philosophical Laws", "desc": "Established AI models as 'fuel, not architecture' and set a 15-dependency maximum."},
            {"step": "02", "title": "Phase 0 Architecture-Only", "desc": "Engineered kernel boot, event bus, and cognitive scheduler with zero user-facing chatbot features."},
            {"step": "03", "title": "AST Guardian", "desc": "Created AST analysis tool to mechanically block imports that violate subsystem hierarchy."},
            {"step": "04", "title": "Self-Validating Substrate", "desc": "Certified Phase 0 architecture as complete and immutable before writing any cognitive reasoning code."}
        ],
        "evolutionary_flow": {
            "what_i_thought": "Modern AI frameworks (LangChain) and specialized graph databases (Neo4j, Kuzu) would accelerate building a lifetime cognitive assistant.",
            "what_happened": "Rapid abstraction churn, leaky protocols, and orphan risks (Kuzu acquisition) threatened long-term system sovereignty; 100K nodes is not big data.",
            "what_i_learned": "External abstractions age poorly. Direct, minimal protocols (`AIPort`) and simple SQLite property tables provide vastly superior 50-year longevity.",
            "what_i_do_differently_now": "Build architecture before implementation. Enforce strict AST guardians at CI time. Treat AI models as interchangeable fuel rather than system foundation."
        },
        "cross_project_connections": [
            "Direct architectural evolution of LEO's lessons: LEO had 281 architecture violations; VANI built an AST Guardian to make violations syntactically impossible.",
            "VANI's model-independent AIPort protocol and SQLite strategy formed the conceptual blueprint for Ashi's local-first inference layer."
        ]
    }
}

TYPE_NORMALIZATION = {
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
}

TYPE_DISPLAY_NAMES = {
    "ARCHITECTURE_DECISION": "Architecture Decision",
    "DEBUGGING_DISCOVERY": "Debugging Discovery",
    "ENGINEERING_NOTE": "Engineering Note",
    "EXPERIMENT": "Experiment",
    "POST_MORTEM": "Post-Mortem",
    "TECHNICAL_DESIGN": "Technical Design",
    "SYSTEM_DESIGN": "System Design",
    "BUILD_LOG": "Build Log",
}

CATEGORY_GROUPS = {
    "ARCHITECTURE_DECISION": "Architecture",
    "DEBUGGING_DISCOVERY": "Debugging",
    "ENGINEERING_NOTE": "Engineering Notes",
    "EXPERIMENT": "Experiments",
    "POST_MORTEM": "Post-Mortems",
    "TECHNICAL_DESIGN": "System Design",
    "SYSTEM_DESIGN": "System Design",
    "BUILD_LOG": "Build Logs",
}

def clean_markdown_text(text: str) -> str:
    """Strips leading/trailing whitespace while preserving markdown structure."""
    if not text:
        return ""
    return text.strip()

def parse_markdown_sections(body: str):
    """
    Parses a markdown body by level-2 headings (`## `).
    Returns a dictionary of heading_title -> raw_section_markdown.
    """
    sections = {}
    lines = body.splitlines()
    current_heading = None
    current_lines = []

    for line in lines:
        match = re.match(r"^##\s+(.+)$", line)
        if match:
            if current_heading:
                sections[current_heading] = "\n".join(current_lines).strip()
            current_heading = match.group(1).strip()
            current_lines = []
        else:
            if current_heading is not None:
                current_lines.append(line)

    if current_heading:
        sections[current_heading] = "\n".join(current_lines).strip()

    return sections

def extract_failure_sequence(sections: dict):
    """
    Extracts structured failure flow if sections exist:
    Attempt -> Failure -> Diagnosis -> Lesson -> Next Iteration
    """
    attempt = sections.get("Initial Approach") or sections.get("The Question") or ""
    failure = sections.get("What Happened") or sections.get("Findings") or ""
    diagnosis = sections.get("Diagnosis") or sections.get("Failure Analysis") or ""
    lesson = sections.get("What I Learned") or ""
    next_step = sections.get("What Changed") or sections.get("What I Would Do Differently") or ""

    if attempt or failure or diagnosis or lesson or next_step:
        return {
            "attempt": clean_markdown_text(attempt),
            "failure": clean_markdown_text(failure),
            "diagnosis": clean_markdown_text(diagnosis),
            "lesson": clean_markdown_text(lesson),
            "next_iteration": clean_markdown_text(next_step),
        }
    return None

def extract_evolutionary_flow(sections: dict):
    """
    Extracts the user-requested evolutionary flow:
    WHAT I THOUGHT -> WHAT HAPPENED -> WHAT I LEARNED -> WHAT I DO DIFFERENTLY NOW
    """
    what_i_thought = sections.get("Initial Approach") or sections.get("The Question") or sections.get("Context") or ""
    what_happened = sections.get("What Happened") or sections.get("Diagnosis") or ""
    what_i_learned = sections.get("What I Learned") or sections.get("What Changed") or ""
    what_i_do_differently = sections.get("What I Would Do Differently") or sections.get("Broader Principle") or ""

    return {
        "what_i_thought": clean_markdown_text(what_i_thought),
        "what_happened": clean_markdown_text(what_happened),
        "what_i_learned": clean_markdown_text(what_i_learned),
        "what_i_do_differently_now": clean_markdown_text(what_i_do_differently),
    }

def ingest_all():
    print(f"[*] Scanning Lab Content in {LAB_CONTENT_DIR}...")
    project_dirs = ["Ashi", "Leo", "Vani"]
    pieces = []

    for proj_dir in project_dirs:
        proj_path = os.path.join(LAB_CONTENT_DIR, proj_dir)
        if not os.path.exists(proj_path):
            print(f"[!] Warning: Directory not found: {proj_path}")
            continue

        md_files = sorted(glob.glob(os.path.join(proj_path, "*.md")))
        for file_path in md_files:
            basename = os.path.basename(file_path)
            # Skip index and extraction reports
            if basename in ["INDEX.md", "EXTRACTION-REPORT.md"]:
                continue

            with open(file_path, "r", encoding="utf-8") as f:
                content = f.read()

            if not content.startswith("---"):
                print(f"[!] Warning: File {basename} does not have YAML frontmatter. Skipping.")
                continue

            parts = content.split("---", 2)
            if len(parts) < 3:
                print(f"[!] Warning: Malformed frontmatter in {basename}. Skipping.")
                continue

            frontmatter_raw = parts[1]
            body_raw = parts[2].strip()

            try:
                fm = yaml.safe_load(frontmatter_raw)
            except Exception as e:
                print(f"[!] YAML Error in {basename}: {e}")
                continue

            slug = fm.get("slug")
            title = fm.get("title")
            raw_type = fm.get("content_type") or fm.get("type", "ENGINEERING_NOTE")
            norm_type = TYPE_NORMALIZATION.get(str(raw_type).strip(), "ENGINEERING_NOTE")
            proj_name = fm.get("project", proj_dir)
            
            # Map project name to standard canonical key
            if "ashi" in proj_name.lower():
                project_id = "ashi"
                project_display = "Ashi"
            elif "leo" in proj_name.lower():
                project_id = "leo"
                project_display = "LEO"
            elif "vani" in proj_name.lower():
                project_id = "vani"
                project_display = "VANI"
            else:
                project_id = proj_dir.lower()
                project_display = proj_dir

            status = fm.get("status", "Published")
            date_val = fm.get("date")
            date_str = str(date_val).strip() if date_val is not None else None
            topics = fm.get("topics", [])
            evidence_level = str(fm.get("evidence_level", "high")).strip().lower()
            publishable = bool(fm.get("publishable", True))

            # Extract order from filename (e.g. "001-vacuous-success-bug.md" -> 1)
            order_match = re.match(r"^(\d+)-", basename)
            order_num = int(order_match.group(1)) if order_match else 999

            # Parse sections
            sections = parse_markdown_sections(body_raw)

            # Extract key fields
            one_line_summary = clean_markdown_text(sections.get("One-Line Summary", ""))
            if not one_line_summary:
                # Fallback to description from frontmatter if present
                one_line_summary = fm.get("description", "")

            context = clean_markdown_text(sections.get("Context", ""))
            the_question = clean_markdown_text(sections.get("The Question", ""))
            initial_approach = clean_markdown_text(sections.get("Initial Approach", ""))
            what_happened = clean_markdown_text(sections.get("What Happened", "") or sections.get("Findings", ""))
            evidence = clean_markdown_text(sections.get("Evidence", ""))
            diagnosis = clean_markdown_text(sections.get("Diagnosis", "") or sections.get("Failure Analysis", ""))
            what_changed = clean_markdown_text(sections.get("What Changed", ""))
            what_learned = clean_markdown_text(sections.get("What I Learned", ""))
            what_would_do_differently = clean_markdown_text(sections.get("What I Would Do Differently", ""))
            broader_principle = clean_markdown_text(sections.get("Broader Principle", ""))
            
            # Technical references
            tech_refs_raw = sections.get("Technical References", "")
            tech_refs = []
            for line in tech_refs_raw.splitlines():
                stripped = line.strip()
                if stripped.startswith("- ") or stripped.startswith("* "):
                    ref_text = stripped[2:].strip().strip("`")
                    if ref_text:
                        tech_refs.append(ref_text)
                elif stripped and not stripped.startswith("#"):
                    tech_refs.append(stripped.strip("`"))

            source_confidence = clean_markdown_text(sections.get("Source Confidence", ""))

            # Construct evolutionary flow and failure sequence
            evolutionary_flow = extract_evolutionary_flow(sections)
            failure_sequence = extract_failure_sequence(sections)

            # Build relative source path
            rel_source_path = os.path.join("lab-content", proj_dir, basename)

            # Compile sections array for dynamic rendering in reader
            # We omit metadata-only sections like Content Type, Project, Date, Status, One-Line Summary
            # which are rendered in the reader header plate.
            excluded_section_titles = {
                "Content Type", "Project", "Date", "Status", "One-Line Summary",
                "Source Confidence", "Content Value", "Publication Notes"
            }
            custom_sections = []
            for h_title, h_body in sections.items():
                if h_title not in excluded_section_titles and h_body:
                    custom_sections.append({
                        "title": h_title,
                        "content": h_body
                    })

            piece_data = {
                "slug": slug,
                "order": order_num,
                "title": title,
                "project": project_display,
                "project_slug": project_id,
                "content_type": norm_type,
                "content_type_display": TYPE_DISPLAY_NAMES.get(norm_type, norm_type),
                "category_group": CATEGORY_GROUPS.get(norm_type, "Engineering Notes"),
                "status": status,
                "date": date_str,
                "topics": topics,
                "evidence_level": evidence_level,
                "publishable": publishable,
                "one_line_summary": one_line_summary,
                "source_file": rel_source_path,
                "source_file_basename": basename,
                "technical_references": tech_refs,
                "source_confidence": source_confidence,
                "evolutionary_flow": evolutionary_flow,
                "failure_sequence": failure_sequence,
                "sections": custom_sections,
                # Store full body markdown for comprehensive rendering
                "raw_body": body_raw,
            }
            pieces.append(piece_data)

    print(f"[*] Successfully parsed {len(pieces)} content pieces.")

    # Calculate dynamic metrics
    total_pieces = len(pieces)
    by_project = {}
    by_type = {}
    by_category = {}
    all_topics_map = {}

    for piece in pieces:
        p_slug = piece["project_slug"]
        by_project[p_slug] = by_project.get(p_slug, 0) + 1

        c_type = piece["content_type"]
        by_type[c_type] = by_type.get(c_type, 0) + 1

        cat_grp = piece["category_group"]
        by_category[cat_grp] = by_category.get(cat_grp, 0) + 1

        for t in piece.get("topics", []):
            all_topics_map[t] = all_topics_map.get(t, 0) + 1

    sorted_topics = [
        {"topic": k, "count": v}
        for k, v in sorted(all_topics_map.items(), key=lambda x: (-x[1], x[0]))
    ]

    # Build Project Dossiers
    projects_list = []
    for p_key, meta in PROJECT_META.items():
        p_id = meta["id"]
        proj_pieces = [p for p in pieces if p["project_slug"] == p_id]
        proj_types = {}
        for p in proj_pieces:
            t = p["content_type"]
            proj_types[t] = proj_types.get(t, 0) + 1

        project_obj = {
            **meta,
            "pieces_count": len(proj_pieces),
            "type_counts": proj_types,
            "pieces_slugs": [p["slug"] for p in proj_pieces]
        }
        projects_list.append(project_obj)

    metrics = {
        "total_pieces": total_pieces,
        "total_projects": len(projects_list),
        "by_project": by_project,
        "by_type": by_type,
        "by_category": by_category,
        "topics": sorted_topics,
        "generated_at": datetime.now(timezone.utc).isoformat(),
    }

    final_payload = {
        "metrics": metrics,
        "projects": projects_list,
        "pieces": pieces,
    }

    os.makedirs(os.path.dirname(OUTPUT_JSON_PATH), exist_ok=True)
    with open(OUTPUT_JSON_PATH, "w", encoding="utf-8") as f:
        json.dump(final_payload, f, indent=2, ensure_ascii=False)

    print(f"[✓] Successfully generated {OUTPUT_JSON_PATH}")
    print(f"    - Total Pieces: {total_pieces}")
    print(f"    - Ashi: {by_project.get('ashi', 0)}")
    print(f"    - LEO: {by_project.get('leo', 0)}")
    print(f"    - VANI: {by_project.get('vani', 0)}")
    print(f"    - Content Types: {json.dumps(by_type, indent=4)}")

if __name__ == "__main__":
    ingest_all()
