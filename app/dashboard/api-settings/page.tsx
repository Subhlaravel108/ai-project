import { Metadata } from "next";
import ApiSettings from "./clientPage";
export const metadata: Metadata = {
    title: "API Testings - VoiceAI",
    description: "Test your API keys and monitor usage with our API testing dashboard.",
};

export default function ApiTestingsPage() {
    return ( <ApiSettings/> );
}