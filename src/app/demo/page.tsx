"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function DemoPage() {
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const hendleBlocking = async () => {
    setLoading(true);
    const res = await fetch("api/demo/blocking", { method: "POST" });
    console.log("res : ", res);
    setLoading(false);
  };

  const hendleBackground = async () => {
    setLoading2(true);
    const res = await fetch("api/demo/background", { method: "POST" });
    console.log("res : ", res);
    setLoading2(false);
  };

  return (
    <div>
      <Button onClick={hendleBlocking}>
        {loading ? "loading" : "Blocking"}
      </Button>
      <Button onClick={hendleBackground}>
        {loading2 ? "loading" : "background"}
      </Button>
    </div>
  );
}
