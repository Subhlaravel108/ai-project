import { Metadata } from "next";
import Contact from "./clientPage";

export const metadata: Metadata = {
  title: "Contact Us - VoiceAI",
  description: "Get in touch with our support team for assistance, inquiries, or feedback.",
};

export default function ContactPage() {
    return <Contact/>;
}