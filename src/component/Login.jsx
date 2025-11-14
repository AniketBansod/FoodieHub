import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { setAuth, apiFetch } from "../utils/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const next = new URLSearchParams(location.search).get("next") || "/";

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setMsg("Please enter email and password");
      return;
    }
    try {
      setLoading(true);
      const data = await apiFetch(`/api/auth/login`, {
        method: "POST",
        body: { email, password },
      });
      if (!data?.ok) throw new Error(data?.error || "Login failed");
      setAuth(data.token, data.user);
      navigate(next);
    } catch (err) {
      setMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[50vh] flex items-center justify-center bg-gradient-to-b from-white to-orange-50 py-10">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-md bg-white p-6 rounded-xl shadow-md border border-orange-100"
      >
        <h2 className="text-2xl font-bold text-slate-900">Log in</h2>
        <p className="mt-1 text-slate-600">Welcome back to FoodieHub</p>

        <label className="block mt-6 text-sm font-medium text-slate-700">
          Email
        </label>
        <input
          className="mt-1 w-full rounded-md border border-slate-300 p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
        />

        <label className="block mt-4 text-sm font-medium text-slate-700">
          Password
        </label>
        <input
          className="mt-1 w-full rounded-md border border-slate-300 p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
        />

        {msg ? (
          <div className="mt-4 text-sm text-orange-700 bg-orange-50 border border-orange-200 p-2 rounded">
            {msg}
          </div>
        ) : null}

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full bg-orange-600 hover:bg-orange-500 disabled:opacity-60 text-white rounded-md py-2"
        >
          {loading ? "Signing in..." : "Continue"}
        </button>
      </form>
    </div>
  );
};

export default Login;
