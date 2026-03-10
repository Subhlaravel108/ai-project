import { Metadata } from "next";
import TermsOfService from "./clientPage";

export const metadata: Metadata = {
  title: "Terms of Service - VoiceAI",
  description: "VoiceAI Terms of Service. Terms and conditions for using our platform.",
};

export default function TermsOfServicePage() {
  return <TermsOfService />;
}
