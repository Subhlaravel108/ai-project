import { Metadata } from "next";
import Register from "./clientPage";

export const metadata:Metadata={
    title: "Register - VoiceAI",
    description: "Create an account to access VoiceAI's powerful voice recognition and AI features.",

}

export default function RegisterPage() {
    return <Register/>;
}