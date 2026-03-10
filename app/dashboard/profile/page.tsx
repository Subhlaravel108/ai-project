import { Metadata } from "next";
import Profile from "./clientPage";

export const metadata: Metadata = {
  title: "Profile - VoiceAI",
  description: "View and edit your profile information, including your name, email, and password.",
};

export default function ProfilePage() {
    return <Profile/>;
}