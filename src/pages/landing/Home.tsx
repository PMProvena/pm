import { useState } from "react";
import { AuthModal } from "./components/AuthModal";
import { LandingPage } from "./components/LandingPage";

export default function HomePage() {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalType, setAuthModalType] = useState<"login" | "signup">(
    "signup"
  );

   const waitlist = true

  const handleAuthClick = (type: "login" | "signup") => {
    setAuthModalType(type);
    setAuthModalOpen(true);
  };

  return (
    <>
      <LandingPage onAuthClick={handleAuthClick} waitlist={waitlist} />
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialTab={authModalType}
      />
    </>
  );
}
