export interface Question {
  id: number;
  text: string;
}

export interface Dimension {
  id: string;
  name: string;
  subtitle: string;
  questions: Question[];
  threshold: number;
  reflection: string;
  reflectionPrompt: string;
}

export type Status = "green" | "amber" | "red";

export interface DimensionResult {
  dimension: Dimension;
  score: number;
  maxScore: number;
  status: Status;
  percentage: number;
}

export interface PatternInterpretation {
  id: string;
  label: string;
  description: string;
  condition: (results: DimensionResult[]) => boolean;
}

export const DIMENSIONS: Dimension[] = [
  {
    id: "budget-permanence",
    name: "Budget Permanence",
    subtitle:
      "Is the innovation funded from a permanent operational budget — or still structurally temporary?",
    questions: [
      {
        id: 1,
        text: "Is this innovation funded from a permanent operational budget — not a project budget, innovation fund, or time-limited allocation?",
      },
      {
        id: 2,
        text: "Has the innovation's funding survived at least one annual budget review without requiring re-justification of its existence?",
      },
      {
        id: 3,
        text: "Is there a named person in the line organisation — not the innovation team — who owns the budget for this initiative?",
      },
    ],
    threshold: 1,
    reflection:
      "Your innovation is structurally temporary. Project budgets expire by design. Innovation funds are discretionary. If the funding hasn't moved into the operational budget of a line organisation, the initiative is auditioning for permanence — and auditions have expiry dates. BCG's 2024 data: 83% of companies rank innovation as a top-three priority, only 3% are innovation-ready. The gap between priority and readiness is a funding structure gap.",
    reflectionPrompt:
      "Who in the line organisation would notice — and object — if this initiative's funding were quietly removed in the next budget cycle? If you can't name that person, funding permanence hasn't been achieved.",
  },
  {
    id: "metric-health",
    name: "Metric Health",
    subtitle:
      "Are the innovation's metrics being tracked — or has organisational forgetting already begun?",
    questions: [
      {
        id: 4,
        text: "Are the innovation's key performance metrics currently being tracked and reported — not just defined, but actively measured and reviewed?",
      },
      {
        id: 5,
        text: "Are those metrics stable or improving — not declining in a way that wasn't anticipated or explained?",
      },
      {
        id: 6,
        text: "Would someone new to the organisation be able to find, read, and understand the innovation's current performance data without asking the original team?",
      },
    ],
    threshold: 1,
    reflection:
      "If you are not measuring, you are already forgetting. Linda Argote's research found that only 3.2% of accumulated knowledge in WWII shipyards persisted after one year. Arthur et al.'s meta-analysis of 189 data sets shows that cognitive skill loss after 365 days of non-use is severe — and innovation practices are in the fastest-decaying category. The practical half-life for organisational knowledge without active reinforcement is one to six months. Your metrics are not a reporting obligation. They are an early warning system for decay.",
    reflectionPrompt:
      "When was the last time someone outside the initiative team asked for the innovation's performance data? If no one is asking, no one is watching. And unmonitored knowledge decays fastest.",
  },
  {
    id: "personnel-survival",
    name: "Personnel Survival",
    subtitle:
      "Would this innovation survive if its champion left tomorrow?",
    questions: [
      {
        id: 7,
        text: "If the initiative's primary champion left the organisation tomorrow, would the innovation continue to operate without interruption?",
      },
      {
        id: 8,
        text: "Is there more than one person who can explain why this innovation matters, defend its budget, and navigate the political landscape it operates in?",
      },
      {
        id: 9,
        text: "Has ownership of this innovation been formally transferred from the initiative team to the line organisation — with documented handover, training, and accepted accountability?",
      },
    ],
    threshold: 1,
    reflection:
      "Your innovation is at habitualisation — it exists because specific people maintain it. CDOs average 31 months in the role. CEO tenure averages 7.6 years. Innovation programmes require 5-10 years to mature. Champions typically depart in 2-3. Strebulaev's research at Stanford found that corporate venture units rarely survive the first change in CEO or make it to their 10th birthday. Not because they underperformed, but because structural survival was tied to one person's sponsorship. If the answer to the personnel survival test is habitualisation, the champion's next career move is the innovation's expiry date.",
    reflectionPrompt:
      "Name everyone in the organisation who could — and would — defend this innovation's existence in a resource review. If the list has fewer than three people, survivability is a single point of failure.",
  },
  {
    id: "mechanism-match",
    name: "Mechanism Match",
    subtitle:
      "Is the embedding mechanism matched to the innovation type?",
    questions: [
      {
        id: 10,
        text: "Have you classified this innovation — optimisation, adjacency, or transformation — and does that classification determine how you are embedding it?",
      },
      {
        id: 11,
        text: "If this is an adjacency or transformation innovation, is there an active community of practice — people across the organisation who share expertise, adapt the practice, and sustain knowledge transfer beyond formal documentation?",
      },
      {
        id: 12,
        text: "Is the innovation reflected in the organisation's formal processes — SOPs, planning cycles, performance management, vendor agreements — so that a new joiner would encounter it as the standard way of working?",
      },
    ],
    threshold: 1,
    reflection:
      "The embedding mechanism doesn't match the innovation type. Organisations instinctively over-reify innovation — they produce the documentation, update the procedures, build the training programme, and assume the innovation is embedded. But reification without participation produces a paper graveyard. Workers are five times more likely to turn to a colleague than a manual. Optimisation innovations embed through revised SOPs and updated metrics. Adjacency and transformation innovations require communities of practice plus institutional structures. A mismatch between mechanism and innovation type explains why the innovation is fading despite everyone's best efforts.",
    reflectionPrompt:
      "Has anyone been trained on the innovation in the last six months who wasn't part of the original team? If not, the embedding mechanism isn't working — regardless of how much documentation exists.",
  },
];

export const PATTERN_INTERPRETATIONS: PatternInterpretation[] = [
  {
    id: "structural-temporariness",
    label: "Structural temporariness",
    description:
      "The innovation is funded temporarily and depends on a single champion. This is the evaporation pattern. When the champion leaves — and the tenure data says they will — the funding leaves with them. The innovation doesn't fail. It ceases to exist. There is no budget review that catches this because there is no operational budget to review. There is no succession plan because ownership was never formally transferred. The initiative was always structurally temporary. The results made it look permanent.",
    condition: (results) => {
      const budget = results.find((r) => r.dimension.id === "budget-permanence");
      const personnel = results.find((r) => r.dimension.id === "personnel-survival");
      return (
        budget !== undefined &&
        personnel !== undefined &&
        budget.status === "red" &&
        personnel.status === "red"
      );
    },
  },
  {
    id: "paper-graveyard",
    label: "The paper graveyard",
    description:
      "Some embedding work has been done — funding, measurement, or personnel resilience exists. But the embedding mechanism doesn't match the innovation type. The documentation exists. The training was delivered. Nobody follows either, because the social infrastructure that gives artefacts meaning was never built. This is reification without participation. The procedures exist. The community of practice doesn't. Workers are five times more likely to turn to a colleague than a manual — and the colleagues who understood the innovation have moved on.",
    condition: (results) => {
      const mechanism = results.find((r) => r.dimension.id === "mechanism-match");
      const others = results.filter((r) => r.dimension.id !== "mechanism-match");
      const anyOtherOk = others.some(
        (r) => r.status === "green" || r.status === "amber"
      );
      return (
        mechanism !== undefined &&
        mechanism.status === "red" &&
        anyOtherOk
      );
    },
  },
  {
    id: "silent-decay",
    label: "Silent decay",
    description:
      "The budget is in place. The innovation is still funded. But nobody is measuring whether it's working. Organisational forgetting has already begun — the metrics stopped being reported, the performance tracking lapsed, the dashboards went dark. By the time someone notices, the decay will be advanced. The practical half-life for unmonitored organisational knowledge is one to six months. The innovation is not failing visibly. It is fading quietly. And the funding that sustains it is paying for an increasingly hollow shell.",
    condition: (results) => {
      const metrics = results.find((r) => r.dimension.id === "metric-health");
      const budget = results.find((r) => r.dimension.id === "budget-permanence");
      return (
        metrics !== undefined &&
        budget !== undefined &&
        metrics.status === "red" &&
        (budget.status === "green" || budget.status === "amber")
      );
    },
  },
];

export const COI_COPY = {
  heading: "The Cost of Evaporation",
  intro:
    "The initiative didn't fail. Nobody cancelled it. It just stopped being anyone's job.",
  body: "Budget permanence, metric health, personnel survival, and mechanism match are the four tests that distinguish innovations that endure from innovations that evaporate. By the time someone asks 'whatever happened to that project?' the answer has been forming for months. The pilot that succeeded is no longer measured. The champion who held it together has rotated. The budget was quietly reallocated. The documentation exists but nobody reads it. Each gap on its own looks manageable. Together, they are a compounding decay pattern that most organisations only recognise after the innovation has already disappeared.",
};

export const CTA_COPY = {
  heading: "What This Diagnostic Reveals — and What It Cannot Fix",
  body: `This tool identifies structural gaps in institutional embedding. It does not create the embedding — because embedding requires governance transfers, budget negotiations, community building, and process integration that depend on your organisation's specific politics, structure, and culture.

Institutional embedding is not a documentation exercise. It is an organisational change effort. The documentation, the metrics, the governance structures — they are artefacts of a transition that someone has to lead. If your profile shows gaps in two or more dimensions, the innovation is at risk of evaporation regardless of its performance.`,
  callout:
    "If your profile shows structural temporariness or silent decay patterns, a facilitated embedding review can identify whether this is a governance problem, a funding problem, a knowledge transfer problem, or all three — and what to address first.",
  triangleReminder:
    "Institutional embedding is Layer 4 of the Critical Path Layers framework for corporate innovation. If you haven't assessed Layers 1-3 (internal market clarity, organisational feasibility, scaling mechanisms), gaps at those layers may be contributing to embedding failures.",
  contact: {
    name: "Alexandra N.",
    title: "Founder, Aieutics",
    subtitle: "Executive coaching & strategic transformation",
    website: "aieutics.com",
    email: "hello@aieutics.com",
  },
};

export const ATTRIBUTION =
  "Developed by Aieutics from the Critical Path Layers framework. Based on the four institutional embedding tests from 'Why Innovation Gets Forgotten' and patterns observed across corporate innovation consulting engagements.";
