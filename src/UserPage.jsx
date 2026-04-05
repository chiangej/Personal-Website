import { useState } from "react";

const year = new Date().getFullYear();
const USERS_KEY = "registered-users";

function loadUsers() {
  try {
    const data = localStorage.getItem(USERS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveUsers(users) {
  try {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  } catch {
    /* ignore */
  }
}

function SectionHead({ title, kicker }) {
  return (
    <div className="section-head">
      <h2>{title}</h2>
      <span className="section-head__kicker" aria-hidden="true">
        {kicker}
      </span>
      <span className="section-head__line" aria-hidden="true" />
    </div>
  );
}

const AVATAR_COLORS = [
  "#c45c6a",
  "#7a9faf",
  "#7d9a7e",
  "#b07d5c",
  "#7a7aaf",
  "#af7a9f",
];

function avatarColor(username) {
  let h = 0;
  for (let i = 0; i < username.length; i++) h = username.charCodeAt(i) + ((h << 5) - h);
  return AVATAR_COLORS[Math.abs(h) % AVATAR_COLORS.length];
}

export default function UserPage({ onNavigate }) {
  const [users, setUsers] = useState(loadUsers);
  const [form, setForm] = useState({ username: "", email: "", password: "", confirm: "" });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.username.trim()) {
      e.username = "Username is required.";
    } else if (!/^[A-Za-z0-9_]{3,20}$/.test(form.username.trim())) {
      e.username = "3–20 characters; letters, numbers, and underscores only.";
    } else if (users.some((u) => u.username.toLowerCase() === form.username.trim().toLowerCase())) {
      e.username = "Username already taken.";
    }

    if (!form.email.trim()) {
      e.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      e.email = "Invalid email format.";
    } else if (users.some((u) => u.email.toLowerCase() === form.email.trim().toLowerCase())) {
      e.email = "Email already registered.";
    }

    if (!form.password) {
      e.password = "Password is required.";
    } else if (form.password.length < 6) {
      e.password = "Password must be at least 6 characters.";
    }

    if (!form.confirm) {
      e.confirm = "Please confirm your password.";
    } else if (form.password !== form.confirm) {
      e.confirm = "Passwords do not match.";
    }

    return e;
  };

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setErrors((err) => ({ ...err, [e.target.name]: undefined }));
    setSuccess(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    const newUser = {
      id: typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : Date.now().toString(),
      username: form.username.trim(),
      email: form.email.trim(),
      joinedAt: new Date().toISOString(),
    };
    const updated = [...users, newUser];
    setUsers(updated);
    saveUsers(updated);
    setForm({ username: "", email: "", password: "", confirm: "" });
    setErrors({});
    setSuccess(true);
  };

  return (
    <div className="page">
      <span className="page__motif page__motif--1" aria-hidden="true" />
      <span className="page__motif page__motif--2" aria-hidden="true" />
      <span className="page__grain" aria-hidden="true" />

      {/* ── Header ── */}
      <header className="site-header">
        <div className="wrap header-inner">
          <div className="brand">
            <button
              className="logo logo--btn"
              onClick={() => onNavigate("home")}
              aria-label="Back to home"
            >
              <span className="logo__inner">AC</span>
            </button>
            <p className="brand__tag">
              <span className="brand__welcome">Welcome</span>
              <span className="brand__dot" aria-hidden="true" />
              <span className="brand__sub">personal studio</span>
            </p>
          </div>
          <nav className="nav" aria-label="Primary">
            <button className="nav-text-btn" onClick={() => onNavigate("home")}>
              Home
            </button>
            <span className="nav-current" aria-current="page">Users</span>
          </nav>
        </div>
      </header>

      <main>
        {/* ── Page hero ── */}
        <section className="hero-mini wrap" aria-labelledby="up-title">
          <div className="hero-mini__copy">
            <p className="eyebrow">
              <span className="eyebrow__en">Community</span>
              <span className="eyebrow__slash" aria-hidden="true">/</span>
              <span className="eyebrow__sub">Visitor registry</span>
            </p>
            <h1 id="up-title">
              User <span className="h1-accent">Registry</span>
            </h1>
            <p className="lede">
              Browse everyone who has joined this small corner of the web, or
              register your own account to appear on the list.
            </p>
          </div>
          <div className="hero-mini__badge" aria-hidden="true">
            <span className="hero-mini__count">{users.length}</span>
            <span className="hero-mini__label">members</span>
          </div>
        </section>

        {/* ── Main content grid ── */}
        <div className="wrap up-grid">

          {/* ── Registration form ── */}
          <section className="section" aria-labelledby="register-heading">
            <SectionHead title="Create Account" kicker="Register" />
            <div className="card up-register-card">
              <span className="card__corner" aria-hidden="true" />
              <h3 id="register-heading">Join the list</h3>
              <p className="card-subtext">
                Fill in the form below to add your name to the registry.
              </p>

              {success && (
                <div className="up-success" role="status" aria-live="polite">
                  <span className="up-success__icon" aria-hidden="true">✓</span>
                  Account created successfully — welcome aboard!
                </div>
              )}

              <form className="up-form" onSubmit={handleSubmit} noValidate>
                <div className="up-field">
                  <label className="up-label" htmlFor="username">Username</label>
                  <input
                    id="username"
                    className={`up-input${errors.username ? " up-input--err" : ""}`}
                    type="text"
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                    placeholder="e.g. sakura_dev"
                    autoComplete="username"
                    spellCheck="false"
                  />
                  {errors.username && (
                    <span className="up-field-err" role="alert">{errors.username}</span>
                  )}
                </div>

                <div className="up-field">
                  <label className="up-label" htmlFor="email">Email</label>
                  <input
                    id="email"
                    className={`up-input${errors.email ? " up-input--err" : ""}`}
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="e.g. hello@example.com"
                    autoComplete="email"
                  />
                  {errors.email && (
                    <span className="up-field-err" role="alert">{errors.email}</span>
                  )}
                </div>

                <div className="up-field">
                  <label className="up-label" htmlFor="password">Password</label>
                  <input
                    id="password"
                    className={`up-input${errors.password ? " up-input--err" : ""}`}
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="At least 6 characters"
                    autoComplete="new-password"
                  />
                  {errors.password && (
                    <span className="up-field-err" role="alert">{errors.password}</span>
                  )}
                </div>

                <div className="up-field">
                  <label className="up-label" htmlFor="confirm">Confirm Password</label>
                  <input
                    id="confirm"
                    className={`up-input${errors.confirm ? " up-input--err" : ""}`}
                    type="password"
                    name="confirm"
                    value={form.confirm}
                    onChange={handleChange}
                    placeholder="Re-enter password"
                    autoComplete="new-password"
                  />
                  {errors.confirm && (
                    <span className="up-field-err" role="alert">{errors.confirm}</span>
                  )}
                </div>

                <button type="submit" className="btn btn-primary up-submit-btn">
                  <span>Create Account</span>
                  <span className="btn__glyph" aria-hidden="true">→</span>
                </button>
              </form>
            </div>
          </section>

          {/* ── User list ── */}
          <section className="section" aria-labelledby="users-heading">
            <SectionHead
              title="Registered Users"
              kicker={users.length === 0 ? "0 members" : `${users.length} member${users.length > 1 ? "s" : ""}`}
            />

            {users.length === 0 ? (
              <div className="card up-empty">
                <div className="up-empty__icon" aria-hidden="true">⛩</div>
                <p className="up-empty__text">No visitors yet.</p>
                <p className="up-empty__hint">Be the first to register and leave your mark.</p>
              </div>
            ) : (
              <ul className="up-user-list" aria-label="Registered users">
                {[...users].reverse().map((u) => (
                  <li key={u.id} className="up-user-card card">
                    <div
                      className="up-user-avatar"
                      style={{ background: avatarColor(u.username) }}
                      aria-hidden="true"
                    >
                      {u.username.charAt(0).toUpperCase()}
                    </div>
                    <div className="up-user-info">
                      <p className="up-user-name">{u.username}</p>
                      <p className="up-user-email">{u.email}</p>
                    </div>
                    <time
                      className="up-user-time"
                      dateTime={u.joinedAt}
                      title={new Date(u.joinedAt).toLocaleString()}
                    >
                      {new Date(u.joinedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </time>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </main>

      <footer className="site-footer">
        <div className="wrap footer-inner">
          <p className="footer__main">
            © {year} Yi Jie Chiang · React &amp; Vite · GitHub Pages
          </p>
          <p className="footer__whisper" aria-hidden="true">
            One quiet step at a time.
          </p>
        </div>
      </footer>
    </div>
  );
}
