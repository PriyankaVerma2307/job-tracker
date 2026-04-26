import { useState, useRef } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";
import { Canvas, useFrame } from "@react-three/fiber";


// 3D BACKGROUND 
function AnimatedSphere() {
  const meshRef = useRef();

  
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.002;
      meshRef.current.rotation.y += 0.003;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[2.5, 64, 64]} />
      <meshStandardMaterial
        color="#22c55e" 
        wireframe
        opacity={0.15}
        transparent
      />
    </mesh>
  );
}

function Background3D() {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={0.8} />
      <AnimatedSphere />
    </Canvas>
  );
}

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      window.location.href = "/dashboard";
    } catch (err) {
       console.error(err);  
       alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex">
      
      <div className="hidden md:flex w-1/2 relative bg-gradient-to-br from-indigo-600 to-purple-600 items-center justify-center">
        <div className="absolute inset-0 opacity-40">
          <Background3D />
        </div>

        <div className="relative z-10 text-white max-w-md px-10">
          <h1 className="text-4xl font-bold mb-4">
            Track Your Jobs Easily 🚀
          </h1>
          <p className="text-lg text-gray-200">
            Simple. Clean. Powerful job tracking for your career growth.
          </p>
        </div>
      </div>

      
      <div className="flex w-full md:w-1/2 items-center justify-center bg-gray-50 px-4">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-sm bg-white p-8 rounded-2xl shadow-lg"
        >
          <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
            Login
          </h2>

          <input
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <div className="relative mb-5">
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            onChange={handleChange}
            className="w-full p-3 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

       <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-3 text-gray-500" >
          {showPassword ? "🙈" : "👁️"}
        </button>
      </div>

          <button className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition">
            Login
          </button>

          <p className="text-sm mt-4 text-center text-gray-600">
            Don’t have an account?{' '}
            <Link to="/signup" className="text-indigo-600 font-medium">
              Signup
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;