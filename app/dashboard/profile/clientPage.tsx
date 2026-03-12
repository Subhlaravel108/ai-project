"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import DashboardLayout from "@/components/DashboardLayout";
import api from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

const Profile = () => {
  const [token, setToken] = useState<string | null>(null);
  const {toast} = useToast();
  const [profile, setProfile] = useState({
    name: "",
    email: "",
  });

  const [passwordData, setPasswordData] = useState({
    current_password: "",
    new_password: "",
  });

  const [errors, setErrors] = useState<any>({});
  const [passwordErrors, setPasswordErrors] = useState<any>({});

  const [profileLoading, setProfileLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [profileFetchLoading, setProfileFetchLoading] = useState(true);

  // ===============================
  // GET TOKEN FROM COOKIE
  // ===============================

  useEffect(() => {
    const match = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="));

    if (match) {
      setToken(match.split("=")[1]);
    }
  }, []);


  useEffect(() => {
    const fetchProfile = async () => {

      if (!token) return;
      try {
        setProfileFetchLoading(true);
        const res = await api.get("/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = res.data;
        setProfile({
          name: data.name || "",
          email: data.email || "",
        });
      } catch (error) {
        toast({
          title: "Error", 
          description: "Failed to fetch profile data",
          variant: "destructive",
        });
      } finally {
             setProfileFetchLoading(false);

      }

    };
    fetchProfile();
  }, [token]);
  // ===============================
  // VALIDATIONS
  // ===============================

  const validateProfile = () => {
    const newErrors: any = {};

    if (!profile.name.trim()) {
      newErrors.name = "Name is required";
    }

    // if (!profile.email.trim()) {
    //   newErrors.email = "Email is required";
    // } else if (!profile.email.includes("@")) {
    //   newErrors.email = "Enter valid email";
    // }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePassword = () => {
    const newErrors: any = {};

    if (!passwordData.current_password) {
      newErrors.current_password = "Current password is required";
    }

    if (!passwordData.new_password) {
      newErrors.new_password = "New password is required";
    } else if (passwordData.new_password.length < 6) {
      newErrors.new_password = "Minimum 6 characters required";
    }

    setPasswordErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ===============================
  // UPDATE PROFILE
  // ===============================

  const handleProfileUpdate = async () => {
    if (!validateProfile() || !token) return;

    try {
      setProfileLoading(true);

      await api.post(
        "/profile/update",
        profile,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Profile update failed",
        variant: "destructive",
      });
    } finally {
      setProfileLoading(false);
    }
  };

  // ===============================
  // UPDATE PASSWORD
  // ===============================

  const handlePasswordUpdate = async () => {
    if (!validatePassword() || !token) return;

    try {
      setPasswordLoading(true);

      await api.post(
        "/change-password",
        passwordData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast({
        title: "Password Updated",
        description: "Your password has been updated successfully.",
      });

      setPasswordData({
        current_password: "",
        new_password: "",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Password update failed",
        variant: "destructive",
      });
    } finally {
      setPasswordLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* PROFILE SECTION */}
          <div className="glass-card p-6 space-y-5">
  <h3 className="font-semibold text-lg">Profile Settings</h3>

  {profileFetchLoading ? (
    <div className="space-y-4">
      <Skeleton className="h-4 w-32" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-4 w-32 mt-4" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-40 mt-4" />
    </div>
  ) : (
    <>
      <div className="grid sm:grid-cols-1 gap-4">
        <div>
          <Label>First Name</Label>
          <Input
            className="mt-1"
            value={profile.name}
            onChange={(e) => {
              setProfile({ ...profile, name: e.target.value });
              setErrors({
                ...errors,
                name: "",
              });
            }}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>
      </div>

      <div>
        <Label>Email</Label>
        <Input
          type="email"
          className="mt-1"
          value={profile.email}
          disabled
        />
      </div>

      <Button
        variant="hero"
        onClick={handleProfileUpdate}
        disabled={profileLoading}
        className="cursor-pointer"
      >
        {profileLoading ? "Saving..." : "Save Changes"}
      </Button>
    </>
  )}
</div>

          {/* PASSWORD SECTION */}
          <div className="glass-card p-6 space-y-4">
            <h3 className="font-semibold text-lg">Change Password</h3>

            <div>
              <Label>Current Password</Label>
              <Input
                type="password"
                className="mt-1"
                value={passwordData.current_password}
                onChange={(e) =>
                 { setPasswordData({
                    ...passwordData,
                    current_password: e.target.value,
                  })
                  setPasswordErrors({
                    ...passwordErrors,
                    current_password: "",
                  })
                }
                }
              />
              {passwordErrors.current_password && (
                <p className="text-red-500 text-sm mt-1">
                  {passwordErrors.current_password}
                </p>
              )}
            </div>

            <div>
              <Label>New Password</Label>
              <Input
                type="password"
                className="mt-1"
                value={passwordData.new_password}
                onChange={(e) =>
                 { setPasswordData({
                    ...passwordData,
                    new_password: e.target.value,
                  })
                  setPasswordErrors({
                    ...passwordErrors,
                    new_password: "",
                  }) 
                }
                }
              />
              {passwordErrors.new_password && (
                <p className="text-red-500 text-sm mt-1">
                  {passwordErrors.new_password}
                </p>
              )}
            </div>

            <Button
              variant="hero-outline"
              onClick={handlePasswordUpdate}
              disabled={passwordLoading}
              className="cursor-pointer"
            >
              {passwordLoading ? "Updating..." : "Update Password"}
            </Button>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;