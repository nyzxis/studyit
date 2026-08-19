/* ============================================================
   LEARNING PORT — auth form handlers + session state
   ============================================================ */

(function () {
  "use strict";

  function showError(el, msg) {
    if (el) {
      el.textContent = msg;
      el.classList.add("show");
    }
  }

  function clearError(el) {
    if (el) {
      el.textContent = "";
      el.classList.remove("show");
    }
  }

  /* ---------------- login ---------------- */
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    const errEl = document.getElementById("loginError");
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      clearError(errEl);
      const email = document.getElementById("loginEmail").value.trim();
      const password = document.getElementById("loginPassword").value;
      const btn = loginForm.querySelector("button[type=submit]");
      btn.disabled = true;
      btn.textContent = "Signing in...";
      try {
        const { data, error } = await window.LPSupabase.signIn(email, password);
        if (error) throw error;
        if (!data.session) {
          showError(errEl, "Check your email to confirm your account before signing in.");
          btn.disabled = false;
          btn.textContent = "Sign in";
          return;
        }
        await window.LPSupabase.migrateFromLocalStorage();
        window.location.href = "index.html";
      } catch (err) {
        showError(errEl, err.message || "Sign in failed. Check your credentials.");
        btn.disabled = false;
        btn.textContent = "Sign in";
      }
    });
  }

  /* ---------------- signup ---------------- */
  const signupForm = document.getElementById("signupForm");
  if (signupForm) {
    const errEl = document.getElementById("signupError");
    signupForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      clearError(errEl);
      const email = document.getElementById("signupEmail").value.trim();
      const password = document.getElementById("signupPassword").value;
      const btn = signupForm.querySelector("button[type=submit]");
      btn.disabled = true;
      btn.textContent = "Creating account...";
      try {
        const { data, error } = await window.LPSupabase.signUp(email, password);
        if (error) throw error;
        // If session is null, email confirmation is required
        if (!data.session) {
          showError(errEl, "Account created! Check your email to confirm before signing in.");
          btn.disabled = false;
          btn.textContent = "Create account";
          return;
        }
        await window.LPSupabase.migrateFromLocalStorage();
        window.location.href = "index.html";
      } catch (err) {
        showError(errEl, err.message || "Sign up failed. Try a different email.");
        btn.disabled = false;
        btn.textContent = "Create account";
      }
    });
  }

  /* ---------------- session state for nav ---------------- */
  async function paintAuthState() {
    const nav = document.querySelector(".nav-row");
    if (!nav) return;

    // Remove existing auth element
    const existing = document.getElementById("authState");
    if (existing) existing.remove();

    const user = await window.LPSupabase.getUser();
    const el = document.createElement("div");
    el.id = "authState";
    el.className = "auth-state";

    if (user) {
      const email = user.email || "User";
      el.innerHTML = `
        <span class="auth-user">${email}</span>
        <button type="button" class="btn btn-ghost auth-logout" id="logoutBtn">Logout</button>
      `;
      nav.appendChild(el);
      document.getElementById("logoutBtn").addEventListener("click", async () => {
        await window.LPSupabase.signOut();
        window.location.href = "login.html";
      });
    } else {
      el.innerHTML = `<a href="login.html" class="btn btn-primary">Sign in</a>`;
      nav.appendChild(el);
    }
  }

  /* ---------------- redirect if no session (protected pages) ---------------- */
  async function requireAuth() {
    const user = await window.LPSupabase.getUser();
    if (!user) {
      window.location.href = "login.html";
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    if (document.body.dataset.requireAuth === "true") {
      requireAuth();
    }
    paintAuthState();
  });

  window.LPAuth = {
    paintAuthState,
    requireAuth
  };
})();