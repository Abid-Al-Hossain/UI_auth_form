"use client";

import { SectionCard } from "@/components/shared/layout/SectionCard";
import Slider from "@/components/shared/input/Slider";
import Switch from "@/components/shared/input/Switch";
import type { AuthFormState } from "../types";

type Props = { state: AuthFormState; update: <K extends keyof AuthFormState>(key: K, value: AuthFormState[K]) => void };

export default function ItemsSection({ state, update }: Props) {
  return <SectionCard title="Items" subtitle="Items controls for native auth generation."><Slider label="Field count" value={state.fieldCount} min={1} max={3} step={1} onChange={(value) => update("fieldCount", value)} /><Switch label="Social login" checked={state.showSocialLogin} onChange={(value) => update("showSocialLogin", value)} /><Switch label="Remember me" checked={state.rememberMe} onChange={(value) => update("rememberMe", value)} /><Switch label="Reveal password" checked={state.revealPassword} onChange={(value) => update("revealPassword", value)} /></SectionCard>;
}
