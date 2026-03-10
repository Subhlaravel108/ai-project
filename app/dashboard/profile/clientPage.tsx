"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import DashboardLayout from "@/components/DashboardLayout";
import api from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const [token, setToken] = useState<string | null>(null);
  const {toast} = useToast();
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const [errors, setErrors] = useState<any>({});
  const [passwordErrors, setPasswordErrors] = useState<any>({});

  const [profileLoading, setProfileLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);

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

  // ===============================
  // VALIDATIONS
  // ===============================

  const validateProfile = () => {
    const newErrors: any = {};

    if (!profile.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!profile.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!profile.email.includes("@")) {
      newErrors.email = "Enter valid email";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePassword = () => {
    const newErrors: any = {};

    if (!passwordData.currentPassword) {
      newErrors.currentPassword = "Current password is required";
    }

    if (!passwordData.newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (passwordData.newPassword.length < 6) {
      newErrors.newPassword = "Minimum 6 characters required";
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
        "/user/profile",
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
        currentPassword: "",
        newPassword: "",
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

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label>First Name</Label>
                <Input
                  className="mt-1"
                  value={profile.firstName}
                  onChange={(e) =>
                    setProfile({ ...profile, firstName: e.target.value })
                  }
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.firstName}
                  </p>
                )}
              </div>

              <div>
                <Label>Last Name</Label>
                <Input
                  className="mt-1"
                  value={profile.lastName}
                  onChange={(e) =>
                    setProfile({ ...profile, lastName: e.target.value })
                  }
                />
              </div>
            </div>

            <div>
              <Label>Email</Label>
              <Input
                type="email"
                className="mt-1"
                value={profile.email}
                onChange={(e) =>
                  setProfile({ ...profile, email: e.target.value })
                }
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email}
                </p>
              )}
            </div>

            <Button
              variant="hero"
              onClick={handleProfileUpdate}
              disabled={profileLoading}
            >
              {profileLoading ? "Saving..." : "Save Changes"}
            </Button>
          </div>

          {/* PASSWORD SECTION */}
          <div className="glass-card p-6 space-y-4">
            <h3 className="font-semibold text-lg">Change Password</h3>

            <div>
              <Label>Current Password</Label>
              <Input
                type="password"
                className="mt-1"
                value={passwordData.currentPassword}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    currentPassword: e.target.value,
                  })
                }
              />
              {passwordErrors.currentPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {passwordErrors.currentPassword}
                </p>
              )}
            </div>

            <div>
              <Label>New Password</Label>
              <Input
                type="password"
                className="mt-1"
                value={passwordData.newPassword}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    newPassword: e.target.value,
                  })
                }
              />
              {passwordErrors.newPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {passwordErrors.newPassword}
                </p>
              )}
            </div>

            <Button
              variant="hero-outline"
              onClick={handlePasswordUpdate}
              disabled={passwordLoading}
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