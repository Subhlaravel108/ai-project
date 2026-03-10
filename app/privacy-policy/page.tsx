import { Metadata } from "next";
import PrivacyPolicy from "./clientPage";

export const metadata: Metadata = {
  title: "Privacy Policy - VoiceAI",
  description: "VoiceAI Privacy Policy. Learn how we collect, use, and protect your data.",
};

export default function PrivacyPolicyPage() {
  return <PrivacyPolicy />;
}
