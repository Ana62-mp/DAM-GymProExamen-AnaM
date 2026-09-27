import { ComponentProps } from "react";
import { Ionicons } from "@expo/vector-icons";

export type MuscleOption = {
  label: string;
  icon: ComponentProps<typeof Ionicons>["name"];
  color: string;
};

export const muscleOptions: MuscleOption[] = [
  { label: "Pecho", icon: "body-outline", color: "#B92936" },
  { label: "Espalda", icon: "accessibility-outline", color: "#7A3E9D" },
  { label: "Piernas", icon: "walk-outline", color: "#247A64" },
  { label: "Hombros", icon: "fitness-outline", color: "#D46B21" },
  { label: "Brazos", icon: "barbell-outline", color: "#365EAA" },
  { label: "Abdomen", icon: "grid-outline", color: "#A16A14" },
  { label: "Full Body", icon: "flash-outline", color: "#8F1D24" },
  { label: "Cardio", icon: "heart-outline", color: "#C9363F" },
];

export const durationOptions = [15, 30, 45, 60, 75, 90];

export function getMuscleOption(group: string): MuscleOption {
  return (
    muscleOptions.find(
      (option) => option.label.toLocaleLowerCase() === group.toLocaleLowerCase(),
    ) ?? { label: group || "General", icon: "fitness-outline", color: "#8F1D24" }
  );
}
