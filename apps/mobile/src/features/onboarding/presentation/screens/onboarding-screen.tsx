import { useState } from "react";
import { Pressable, View } from "react-native";
import { useRouter } from "expo-router";
import { space } from "@breathflow/ui";
import { Button } from "../../../../shared/ui/button";
import { Card } from "../../../../shared/ui/card";
import { Text } from "../../../../shared/ui/text";
import { useTheme } from "../../../../shared/ui/theme-provider";

const STEPS = [
  {
    title: "Breathe with intention.",
    body: "Reach calm, focus, energy, sleep — through your breath.",
  },
  {
    title: "What brings you here?",
    body: "Pick a goal. You can change it anytime.",
    options: ["Calm", "Focus", "Energy", "Sleep", "Performance", "Pranayama"],
  },
  {
    title: "How much breathwork do you do?",
    body: "We'll tailor what we show first.",
    options: ["Beginner", "Intermediate", "Advanced"],
  },
  {
    title: "Optional: measure your BOLT.",
    body: "A 60-second CO₂-tolerance baseline. We can personalise sessions from it.",
  },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const theme = useTheme();
  const [step, setStep] = useState(0);
  const [goal, setGoal] = useState<string | null>(null);
  const [level, setLevel] = useState<string | null>(null);
  const current = STEPS[step]!;

  const next = () => {
    if (step < STEPS.length - 1) setStep(step + 1);
    else router.replace("/");
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.bg, padding: space[5], gap: space[6] }}>
      <View style={{ paddingTop: space[10] }}>
        <Text variant="micro" tone="dim">
          STEP {step + 1} / {STEPS.length}
        </Text>
        <View style={{ height: space[2] }} />
        <Text variant="h1">{current.title}</Text>
        <Text variant="body" tone="muted" style={{ marginTop: space[3] }}>
          {current.body}
        </Text>
      </View>

      {current.options ? (
        <View style={{ gap: space[2] }}>
          {current.options.map((o) => {
            const selected = step === 1 ? goal === o : level === o;
            return (
              <Pressable
                key={o}
                onPress={() => (step === 1 ? setGoal(o) : setLevel(o))}
              >
                <Card
                  style={{ borderColor: selected ? theme.accent : theme.border }}
                  elevated={selected}
                >
                  <Text variant="bodyBold">{o}</Text>
                </Card>
              </Pressable>
            );
          })}
        </View>
      ) : null}

      <View style={{ flex: 1 }} />

      <Button label={step === STEPS.length - 1 ? "Finish" : "Continue"} onPress={next} size="lg" fullWidth />
      {step > 0 ? (
        <Pressable onPress={() => setStep(step - 1)} accessibilityRole="button">
          <Text variant="caption" tone="muted" align="center">
            back
          </Text>
        </Pressable>
      ) : null}
    </View>
  );
}
