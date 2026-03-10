import { Metadata } from "next";
import DashboardOverview from "./clientPage";

export const metadata: Metadata = {
  title: "Dashboard - VoiceAI",
  description: "Access your personalized dashboard to manage your account, view analytics, and customize settings.",
};

export default function DashboardPage() {
    return <DashboardOverview/>;
}