import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";

const emojis = ["🌿", "💛", "💜"];

const GratitudeCheckIn = () => {
  const [items, setItems] = useState(["", "", ""]);
  const [submitted, setSubmitted] = useState(false);

  const allFilled = items.every((item) => item.trim().length > 0);

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
  };

  if (submitted) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 animate-slide-up bg-gradient-to-br from-[hsl(30,67%,96%)] via-[hsl(40,70%,94%)] to-[hsl(20,60%,92%)]">
        <span className="text-6xl">🌻</span>
        <h2 className="text-3xl font-bold text-foreground">Gratitude logged!</h2>
        <p className="text-lg text-muted-foreground">Small moments, big joy.</p>
        <Button variant="ghost" className="rounded-full gap-2 mt-2" onClick={handleReset}>
          <ArrowLeft size={18} />
          Log Another
        </Button>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 bg-gradient-to-br from-[hsl(30,67%,96%)] via-[hsl(45,80%,95%)] to-[hsl(20,50%,93%)]">
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
                className="rounded-xl h-12 text-base border-border/60 bg-card/80 backdrop-blur-sm shadow-sm focus-visible:ring-primary/40"
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
            className="w-full rounded-full font-bold text-base h-12 bg-gradient-to-r from-primary to-[hsl(35,85%,60%)] hover:from-primary/90 hover:to-[hsl(35,85%,55%)] shadow-md shadow-primary/20"
            disabled={!allFilled}
            onClick={handleSubmit}
          >
            Log Gratitude
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GratitudeCheckIn;
