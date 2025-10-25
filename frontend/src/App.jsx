import React, { useState, useEffect } from "react";
import {
  getModules,
  createModule,
  deleteModule,
  registerUser,
  loginUser,
} from "./api";

function App() {
  const [modules, setModules] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [authForm, setAuthForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [moduleForm, setModuleForm] = useState({ title: "", description: "" });
  const [isLogin, setIsLogin] = useState(true);

  // Fetch modules whenever token changes (login/logout)
  useEffect(() => {
    if (token) fetchModules();
    else setModules([]); // Clear modules on logout
  }, [token]);

  const fetchModules = async () => {
    try {
      const res = await getModules();
      setModules(res.data);
    } catch (err) {
      console.error("Failed to fetch modules", err);
    }
  };

  // Auth
  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const res = await loginUser(authForm.email, authForm.password);
        setToken(res.data.token);
        localStorage.setItem("token", res.data.token);
      } else {
        const res = await registerUser(
          authForm.name,
          authForm.email,
          authForm.password
        );
        setToken(res.data.token);
        localStorage.setItem("token", res.data.token);
      }
      setAuthForm({ name: "", email: "", password: "" });
    } catch (err) {
      alert(err.response?.data?.msg || "Auth failed");
    }
  };

  // Create module
  const handleCreateModule = async (e) => {
    e.preventDefault();
    if (!token) return alert("Login first");
    try {
      await createModule(moduleForm, token);
      setModuleForm({ title: "", description: "" });
      fetchModules();
    } catch (err) {
      alert("Failed to create module");
    }
  };

  // Delete module
  const handleDelete = async (id) => {
    if (!token) return alert("Login first");
    try {
      await deleteModule(id, token);
      fetchModules();
    } catch (err) {
      alert("Failed to delete module");
    }
  };

  // Logout
  const handleLogout = () => {
    setToken("");
    localStorage.removeItem("token");
    setModules([]); // Clear modules when logging out
  };

  return (
    <div className="min-h-screen p-4 bg-gray-900 text-white font-sans">
      <h1 className="text-4xl font-bold text-blue-400 mb-4">PeerPrep</h1>

      {/* Auth form */}
      {!token && (
        <div className="mb-6 p-4 border border-blue-400 rounded-md">
          <h2 className="text-xl font-bold mb-2">
            {isLogin ? "Login" : "Register"}
          </h2>
          <form onSubmit={handleAuth} className="flex flex-col gap-2">
            {!isLogin && (
              <input
                type="text"
                placeholder="Name"
                value={authForm.name}
                onChange={(e) =>
                  setAuthForm({ ...authForm, name: e.target.value })
                }
                className="p-2 rounded bg-gray-800 border border-blue-400"
                required
              />
            )}
            <input
              type="email"
              placeholder="Email"
              value={authForm.email}
              onChange={(e) =>
                setAuthForm({ ...authForm, email: e.target.value })
              }
              className="p-2 rounded bg-gray-800 border border-blue-400"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={authForm.password}
              onChange={(e) =>
                setAuthForm({ ...authForm, password: e.target.value })
              }
              className="p-2 rounded bg-gray-800 border border-blue-400"
              required
            />
            <button
              className="p-2 bg-blue-400 text-black font-bold rounded mt-2"
              type="submit"
            >
              {isLogin ? "Login" : "Register"}
            </button>
          </form>
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="mt-2 text-sm text-blue-300 underline"
          >
            {isLogin ? "Switch to Register" : "Switch to Login"}
          </button>
        </div>
      )}

      {/* Module form */}
      {token && (
        <div className="mb-6 p-4 border border-blue-400 rounded-md">
          <h2 className="text-xl font-bold mb-2">Create Module</h2>
          <form onSubmit={handleCreateModule} className="flex flex-col gap-2">
            <input
              type="text"
              placeholder="Title"
              value={moduleForm.title}
              onChange={(e) =>
                setModuleForm({ ...moduleForm, title: e.target.value })
              }
              className="p-2 rounded bg-gray-800 border border-blue-400"
              required
            />
            <textarea
              placeholder="Description"
              value={moduleForm.description}
              onChange={(e) =>
                setModuleForm({ ...moduleForm, description: e.target.value })
              }
              className="p-2 rounded bg-gray-800 border border-blue-400"
            />
            <button
              className="p-2 bg-blue-400 text-black font-bold rounded mt-2"
              type="submit"
            >
              Create
            </button>
          </form>
          <button
            onClick={handleLogout}
            className="mt-2 text-sm text-blue-300 underline"
          >
            Logout
          </button>
        </div>
      )}

      {/* Modules list */}
      <div>
        <h2 className="text-2xl font-bold mb-2">Modules</h2>
        <ul className="space-y-2">
          {modules.map((m) => (
            <li
              key={m._id}
              className="p-2 bg-gray-800 border border-blue-400 rounded flex justify-between items-center"
            >
              <div>
                <strong>{m.title}</strong>
                <p className="text-sm text-gray-300">{m.description}</p>
              </div>
              {token && (
                <button
                  onClick={() => handleDelete(m._id)}
                  className="px-2 py-1 bg-red-600 rounded text-sm"
                >
                  Delete
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
