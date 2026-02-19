import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";

const emojis = ["🌟", "💛", "✨"];

const GratitudeCheckIn = () => {
  const [items, setItems] = useState(["", "", ""]);
  const [submitted, setSubmitted] = useState(false);
  const [skipped, setSkipped] = useState(false);

  const hasText = items.some((item) => item.trim().length > 0);

  const handleChange = (index: number, value: string) => {
    setItems((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  };

  const handleSubmit = () => {
    const nonEmpty = items.filter((i) => i.trim().length > 0);
    const existing = JSON.parse(localStorage.getItem("gratitude_logs") || "[]");
    existing.push({ items: nonEmpty, date: new Date().toISOString() });
    localStorage.setItem("gratitude_logs", JSON.stringify(existing));
    setSubmitted(true);
  };

  const handleReset = () => {
    setItems(["", "", ""]);
    setSubmitted(false);
    setSkipped(false);
  };

  if (skipped) {
    return (
      <div className="flex min-h-[80vh] flex-col items-center justify-center gap-6">
        <p className="text-xl text-muted-foreground">Maybe next time 💫</p>
        <Button variant="ghost" className="rounded-full gap-2" onClick={handleReset}>
          <ArrowLeft size={18} />
          Go Back
        </Button>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="flex min-h-[80vh] flex-col items-center justify-center gap-6 animate-slide-up">
        <span className="text-6xl">🌻</span>
        <h2 className="text-3xl font-bold text-foreground">Gratitude logged!</h2>
        <p className="text-lg text-muted-foreground">Keep shining ✨</p>
        <Button variant="ghost" className="rounded-full gap-2 mt-2" onClick={handleReset}>
          <ArrowLeft size={18} />
          Log Another
        </Button>
      </div>
    );
  }

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-3 animate-slide-up" style={{ animationDelay: "0ms", animationFillMode: "backwards" }}>
          <h1 className="text-3xl font-bold text-foreground">Gratitude Check-In</h1>
          <p className="text-lg text-muted-foreground">Name 3 things you're grateful for</p>
        </div>

        <div className="space-y-5">
          {emojis.map((emoji, index) => (
            <div
              key={index}
              className="flex items-center gap-4 animate-slide-up"
              style={{
                animationDelay: `${(index + 1) * 200}ms`,
                animationFillMode: "backwards",
              }}
            >
              <span className="text-3xl">{emoji}</span>
              <Input
                className="rounded-xl h-12 text-base"
                placeholder="I'm grateful for..."
                value={items[index]}
                onChange={(e) => handleChange(index, e.target.value)}
              />
            </div>
          ))}
        </div>

        <div
          className="flex flex-col items-center gap-4 pt-4 animate-slide-up"
          style={{ animationDelay: "800ms", animationFillMode: "backwards" }}
        >
          <Button
            size="lg"
            className="w-full rounded-full font-bold text-base h-12"
            disabled={!hasText}
            onClick={handleSubmit}
          >
            Log Gratitude
          </Button>
          <Button
            variant="ghost"
            className="rounded-full text-base"
            onClick={() => setSkipped(true)}
          >
            Skip
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GratitudeCheckIn;
