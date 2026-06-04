"use client";

import { SectionCard } from "@/components/shared/layout/SectionCard";
import type { AuthFormState } from "../types";

type Props = { state: AuthFormState; update: <K extends keyof AuthFormState>(key: K, value: AuthFormState[K]) => void };

export default function ItemsSection({ state, update }: Props) {
  return <SectionCard title="Items" subtitle="Items controls for native auth generation."><div className="rounded-2xl border p-4 text-sm" style={{ borderColor: "var(--border)", color: "var(--muted)" }}>No separate native controls are needed for this section in this component.</div></SectionCard>;
}
