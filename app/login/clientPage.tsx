"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import PublicLayout from "@/components/PublicLayout";
import { useToast } from "@/hooks/use-toast";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
const Login = () => {
  const { toast } = useToast();
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  // ✅ Validation
  const validateForm = () => {
    let newErrors = {
      email: "",
      password: "",
    };

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = "Enter a valid email";
    }

    if (!form.password.trim()) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);

    return Object.values(newErrors).every((err) => err === "");
  };

  // ✅ Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await api.post("/login", {
        email: form.email,
        password: form.password,
      });

      const { token, user } = response.data;

      // Save token
      
      document.cookie = `token=${token}; path=/; max-age=86400; samesite=strict`; 
      document.cookie = `user=${JSON.stringify(user)}; path=/; max-age=86400; samesite=strict`;

      toast({
        title: "Login Successful 🎉",
        description: "Redirecting to dashboard...",
      });

      router.push("/dashboard");

    } catch (error: any) {
      console.error("Login error:", error);

      if (error.response) {
        toast({
          title: "Login Failed",
          description:
            error.response.data.message || "Invalid email or password",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Server Error",
          description: "Something went wrong. Please try again.",
          variant: "destructive",
        });
      }
    }

    setLoading(false);
  };

  return (
    <PublicLayout>
      <section className="section-padding flex items-center justify-center min-h-[80vh]">
        <motion.div
          className="glass-card p-8 w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl font-display font-bold text-center mb-2">
            Welcome Back
          </h1>
          <p className="text-sm text-muted-foreground text-center mb-8">
            Sign in to your account
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@company.com"
                className={`mt-1 ${
                  errors.email ? "border-red-500" : ""
                }`}
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative mt-1">
                <Input
                  id="password"
                  type={showPass ? "text" : "password"}
                  placeholder="••••••••"
                  className={`${
                    errors.password ? "border-red-500" : ""
                  }`}
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  onClick={() => setShowPass(!showPass)}
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password}
                </p>
              )}
            </div>

            <Button
              variant="hero"
              type="submit"
              className="w-full cursor-pointer"
              disabled={loading}
            >
              {loading ? "Signing In..." : "Sign In"}
            </Button>
          </form>

          <p className="text-sm text-muted-foreground text-center mt-6">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="text-primary hover:underline"
            >
              Sign up
            </Link>
          </p>
        </motion.div>
      </section>
    </PublicLayout>
  );
};

export default Login;