"use client";

import React, { useState } from "react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    }).catch(() => null);
    if (res?.ok) {
      window.location.href = "/admin";
      return;
    }
    setError((await res?.json().catch(() => null))?.error || "Login nahi ho saka");
    setBusy(false);
  };

  return (
    <div className="min-h-screen bg-dark-950 flex items-center justify-center px-4">
      <form onSubmit={submit} className="w-full max-w-sm space-y-4 bg-dark-900 p-8 rounded-3xl border border-white/10 shadow-2xl">
        <h1 className="text-2xl font-black text-white text-center font-heading">Admin Login</h1>
        <input
          type="text"
          autoComplete="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full bg-dark-800 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-400"
        />
        <input
          type="password"
          autoComplete="current-password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-dark-800 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-400"
        />
        {error && <p className="text-xs text-rose-400">{error}</p>}
        <button
          type="submit"
          disabled={busy}
          className="w-full py-3.5 rounded-xl bg-brand-400 hover:bg-brand-300 disabled:opacity-60 text-dark-950 font-black text-sm font-heading"
        >
          {busy ? "Please wait..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}
