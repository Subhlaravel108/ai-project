"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import PublicLayout from "@/components/PublicLayout";
import { useToast } from "@/hooks/use-toast";
import api from "@/lib/api";
import { useRouter } from "next/navigation";

const Register = () => {
  const { toast } = useToast();
  const [showPass, setShowPass] = useState(false);
  const [step, setStep] = useState<"form" | "otp">("form");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });


  const [errors, setErrors] = useState({
  username: "",
  email: "",
  password: "",
  otp: "",
});

  
  const [otp, setOtp] = useState("");

  const validateForm = () => {
  let newErrors = {
    username: "",
    email: "",
    password: "",
    otp: "",
  };

  if (!form.username.trim()) {
    newErrors.username = "Full name is required";
  }

  if (!form.email.trim()) {
    newErrors.email = "Email is required";
  } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
    newErrors.email = "Enter valid email";
  }

  if (!form.password.trim()) {
    newErrors.password = "Password is required";
  } else if (form.password.length < 6) {
    newErrors.password = "Password must be at least 6 characters";
  }

  setErrors(newErrors);

  return !newErrors.username && !newErrors.email && !newErrors.password;
};


useEffect(() => {
  const email = localStorage.getItem("verifyEmail");

  if (email) {
    setForm((prev) => ({
      ...prev,
      email: email,
    }));

    setStep("otp");
  }
}, []);

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);

    try {
      // 👉 Yaha backend API call karega
      // await axios.post("/api/send-otp", { email: form.email });
       const res = await api.post("/register", form);
      // if(res.status === 200){
        toast({
          title: "OTP Sent",
          description: "Check your email for verification code.",
        });
       localStorage.setItem("verifyEmail", form.email);
        setStep("otp");
        
      // toast({
      //   title: "OTP Sent",
      //   description: "Check your email for verification code.",
      // });

    } catch (err: any) {
      console.log("errors=",err);
      toast({
        title: "Error",
        description: "Failed to send OTP",
        variant: "destructive",
      });

    }

    setLoading(false);
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 👉 Yaha backend verification karega
      // await axios.post("/api/verify-otp", { email: form.email, otp });
      const res=await api.post("/verify-otp", { email: form.email, otp });
      

      localStorage.removeItem("verifyEmail");
      toast({
        title: "Account Created 🎉",
        description: "Redirecting to login page...",
      });

      
      router.push("/login");
    } catch (err) {
      toast({
        title: "Invalid OTP",
        description: "Please enter correct OTP",
        variant: "destructive",
      });
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
            Create Your Account
          </h1>

          {step === "form" && (
            <form onSubmit={handleSendOTP} className="space-y-4">
              <div>
                <Label>Full Name</Label>
                <Input
                  value={form.username}
                  onChange={(e) =>
                    setForm({ ...form, username: e.target.value })
                  }
                />
                {errors.username && (
  <p className="text-red-500 text-xs mt-1">{errors.username}</p>
)}
              </div>

              <div>
                <Label>Email</Label>
                <Input
                  type="email"
                  value={form.email}
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                />
                {errors.email && (
  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
)}
              </div>

              <div>
                <Label>Password</Label>
                <div className="relative">
                  <Input
                    type={showPass ? "text" : "password"}
                    value={form.password}
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                    />
                    {errors.password && (
  <p className="text-red-500 text-xs mt-1">{errors.password}</p>
)}
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                    onClick={() => setShowPass(!showPass)}
                  >
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <Button type="submit" className="w-full cursor-pointer" disabled={loading}>
                {loading ? "Sending..." : "Send OTP"}
              </Button>
            </form>
          )}

          {step === "otp" && (
            <form onSubmit={handleVerifyOTP} className="space-y-4">
              <div>
                <Label>Enter OTP</Label>
                <Input
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="6 digit code"
                />
              </div>

              <Button type="submit" className="w-full cursor-pointer" disabled={loading}>
                {loading ? "Verifying..." : "Verify & Create Account"}
              </Button>
            </form>
          )}

          <p className="text-sm text-muted-foreground text-center mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </motion.div>
      </section>
    </PublicLayout>
  );
};

export default Register;