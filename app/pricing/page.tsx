import { Metadata } from "next";
import Pricing from "./clientPage";

export const metadata: Metadata = {
    title: "Pricing - VoiceAI",
    description: "Explore our pricing plans for VoiceAI, designed to fit your needs and budget.",
};

export default function PricingPage() {
    return <Pricing/>;
}