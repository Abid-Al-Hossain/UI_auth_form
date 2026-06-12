"use client";

import type { CSSProperties } from "react";
import type { AuthFormState } from "../types";

function shell(state: AuthFormState): CSSProperties {
  return {
    width: state.width,
    minHeight: state.height,
    padding: state.padding,
    display: "grid",
    gap: state.gap,
    borderRadius: state.radius,
    border: `${state.borderWidth}px solid ${state.border}`,
    boxShadow: `0 ${Math.round(state.shadow / 3)}px ${state.shadow}px rgba(0,0,0,.28)`,
    background: state.background,
    color: state.foreground,
    fontFamily: state.fontFamily,
    opacity: state.disabled ? 0.55 : 1,
  };
}

export default function LivePreview({ state }: { state: AuthFormState }) {
  const isLoading = state.previewState === "loading";
  const isError = state.previewState === "error";
  const isSuccess = state.previewState === "success";
  const disabled = state.disabled || isLoading;
  const includeName = state.mode !== "sign-in" || state.fieldCount >= 3;
  const includePassword = state.fieldCount >= 2;
  const helperId = `${state.id}-helper`;
  const messageId = `${state.id}-message`;
  const inputStyle: CSSProperties = { width: "100%", border: `1px solid ${isError ? "#ef4444" : state.border}`, borderRadius: Math.max(10, state.radius - 12), background: "rgba(255,255,255,.08)", color: state.foreground, padding: "11px 13px", outline: "none", transition: state.motion ? "border-color 0.2s ease, box-shadow 0.2s ease" : "none" };

  return (
    <form id={state.id} aria-label={state.ariaLabel} aria-describedby={`${helperId} ${messageId}`} onSubmit={(event) => event.preventDefault()} style={shell(state)}>
      <header style={{ display: "grid", gap: 6 }}>
        <span style={{ color: state.accent, fontSize: 12, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase" }}>{state.mode} form</span>
        <h3 style={{ margin: 0, fontSize: state.titleSize, fontWeight: state.fontWeight }}>{state.title}</h3>
        <p id={helperId} style={{ margin: 0, color: state.muted, fontSize: state.bodySize }}>{state.description}</p>
      </header>

      <div style={{ display: "grid", gap: Math.max(10, state.gap - 4) }}>
        {includeName && (
          <label style={{ display: "grid", gap: 6, fontSize: 13, fontWeight: 700 }}>
            Name
            <input name="name" type="text" autoComplete="name" required disabled={disabled} placeholder="Alex Morgan" style={inputStyle} />
          </label>
        )}
        <label style={{ display: "grid", gap: 6, fontSize: 13, fontWeight: 700 }}>
          Email
          <input name="email" type="email" autoComplete="email" required disabled={disabled} aria-invalid={isError} placeholder="alex@example.com" style={inputStyle} />
        </label>
        {includePassword && (
          <label style={{ display: "grid", gap: 6, fontSize: 13, fontWeight: 700 }}>
            Password
            <input name="password" type={state.revealPassword ? "text" : "password"} autoComplete={state.mode === "sign-up" ? "new-password" : "current-password"} required disabled={disabled} aria-invalid={isError} placeholder="********" style={inputStyle} />
          </label>
        )}
      </div>

      {state.rememberMe && (
        <label style={{ display: "flex", alignItems: "center", gap: 8, color: state.muted, fontSize: 13 }}>
          <input name="remember" type="checkbox" disabled={disabled} defaultChecked />
          Remember this device
        </label>
      )}

      <button type="submit" disabled={disabled} aria-busy={isLoading} style={{ border: 0, borderRadius: Math.max(12, state.radius - 8), background: state.accent, color: state.background, cursor: disabled ? "not-allowed" : "pointer", fontWeight: 800, padding: "12px 16px", transition: state.motion ? "opacity 0.2s ease, background 0.2s ease" : "none" }}>
        {isLoading ? "Submitting..." : state.label}
      </button>

      {state.showSocialLogin && <button type="button" disabled={disabled} style={{ border: `1px solid ${state.border}`, borderRadius: Math.max(12, state.radius - 8), background: "transparent", color: state.foreground, padding: "11px 16px", fontWeight: 700 }}>Continue with SSO</button>}

      <p id={messageId} role={isError ? "alert" : "status"} style={{ margin: 0, color: isError ? "#fca5a5" : isSuccess ? "#86efac" : state.muted, fontSize: 13 }}>
        {isError ? "Check your email and password before submitting." : isSuccess ? "Success. Your credentials are ready to submit." : state.helper}
      </p>
    </form>
  );
}
