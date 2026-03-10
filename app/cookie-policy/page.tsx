import { Metadata } from "next";
import CookiePolicy from "./clientPage";

export const metadata: Metadata = {
  title: "Cookie Policy - VoiceAI",
  description: "VoiceAI Cookie Policy. How we use cookies and similar technologies.",
};

export default function CookiePolicyPage() {
  return <CookiePolicy />;
}
