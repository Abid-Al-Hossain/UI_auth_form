"use client";

import { SectionCard } from "@/components/shared/layout/SectionCard";
import Select from "@/components/shared/input/Select";
import type { AuthFormState } from "../types";

type Props = { state: AuthFormState; update: <K extends keyof AuthFormState>(key: K, value: AuthFormState[K]) => void };

export default function ContentSection({ state, update }: Props) {
  return <SectionCard title="Content" subtitle="Content controls for native auth generation."><Select label="Form mode" value={state.mode} options={["sign-in", "sign-up", "reset-password", "invite"]} onChange={(value) => update("mode", value)} /><Select label="Validation mode" value={state.validationMode} options={["inline", "on-blur", "on-submit"]} onChange={(value) => update("validationMode", value)} /></SectionCard>;
}
