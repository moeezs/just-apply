"use client";

import { redirect } from "next/navigation";
import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

export default function Home() {
  useEffect(() => {
    // Start a new session with unique ID (only if not already started)
    if (!sessionStorage.getItem('sessionId')) {
      sessionStorage.setItem('sessionId', uuidv4());
    }
  }, []);
  return redirect('/onboarding');

}