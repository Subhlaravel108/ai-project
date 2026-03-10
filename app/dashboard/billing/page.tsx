import { Metadata } from "next";
import Billing from "./clientPage";

export const metadata: Metadata = {
  title: "Billing - VoiceAI",
  description: "Manage your subscription, view billing history, and update payment information.",
};

export default function BillingPage() {
    return <Billing/>;
}