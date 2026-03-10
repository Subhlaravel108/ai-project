import { Metadata } from "next";
import Login from "./clientPage";

export const metadata:Metadata={
    title: "Login - VoiceAI",  
    description: "Access your VoiceAI account to manage your settings, view billing information, and explore our latest features.",     
}

export default function LoginPage() {
    return <Login/>;
}