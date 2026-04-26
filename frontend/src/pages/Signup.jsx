import { useState, useRef } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";
import { Canvas, useFrame } from "@react-three/fiber";

//3D BACKGROUND
function AnimatedSphere() {
  const ref = useRef();

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.x += 0.002;
      ref.current.rotation.y += 0.003;
    }
  });

  return (
    <mesh ref={ref}>
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

function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/auth/register", form);
      alert("Signup successful");
      window.location.href = "/";
    } catch (err) {
       console.error(err);  
       alert("Error");
    }
  };

  return (
    <div className="min-h-screen flex">
      
      <div className="hidden md:flex w-1/2 relative bg-gradient-to-br from-green-600 to-emerald-700 items-center justify-center">
        <div className="absolute inset-0 opacity-40">
          <Background3D />
        </div>

        <div className="relative z-10 text-white text-center px-10">
          <h1 className="text-4xl font-bold mb-4">
            Start Your Journey 💼
          </h1>
          <p className="text-lg text-gray-200">
            Create your account and begin tracking your career growth.
          </p>
        </div>
      </div>

      
      <div className="flex w-full md:w-1/2 items-center justify-center bg-gray-50 px-4">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-sm bg-white p-8 rounded-2xl shadow-lg"
        >
          <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
            Signup
          </h2>

          <input
            name="name"
            placeholder="Name"
            onChange={handleChange}
            className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <input
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
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
         className="absolute right-3 top-3 text-gray-500"
        >
          {showPassword ? "🙈" : "👁️"}
         </button>
        </div>

          <button className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition">
            Signup
          </button>

          <p className="text-sm mt-4 text-center text-gray-600">
            Already have an account?{' '}
            <Link to="/" className="text-green-600 font-medium">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;