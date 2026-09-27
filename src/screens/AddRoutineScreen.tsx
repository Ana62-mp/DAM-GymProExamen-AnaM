import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRoutines } from "../context/RoutineContext";
import {
  durationOptions,
  getMuscleOption,
  muscleOptions,
} from "../routineOptions";
import { colors, radii, shadow, spacing } from "../theme";

type Errors = { name?: string; muscleGroup?: string; duration?: string };

export default function AddRoutineScreen({ navigation, route }: any) {
  const { addRoutine, updateRoutine, routines } = useRoutines();
  const idToEdit = route.params?.id as string | undefined;
  const routineToEdit = useMemo(
    () => routines.find((routine) => routine.id === idToEdit),
    [idToEdit, routines],
  );
  const [name, setName] = useState("");
  const [muscleGroup, setMuscleGroup] = useState("");
  const [duration, setDuration] = useState(45);
  const [nameFocused, setNameFocused] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const minDuration = 10;
  const maxDuration = 180

  useEffect(() => {
    if (routineToEdit) {
      setName(routineToEdit.name);
      setMuscleGroup(routineToEdit.muscleGroup);
      setDuration(routineToEdit.duration);
    }
  }, [routineToEdit]);

  const selectorOptions = useMemo(() => {
    if (
      muscleGroup &&
      !muscleOptions.some(
        (option) =>
          option.label.toLocaleLowerCase() === muscleGroup.toLocaleLowerCase(),
      )
    ) {
      return [...muscleOptions, getMuscleOption(muscleGroup)];
    }
    return muscleOptions;
  }, [muscleGroup]);

  const adjustDuration = (change: number) => {
    setDuration((current) => Math.min(maxDuration, Math.max(minDuration, current + change)));
    setErrors((current) => ({ ...current, duration: undefined }));
  };

  const handleSave = () => {
    const cleanName = name.trim();
    const nextErrors: Errors = {};

    if (!cleanName)
      nextErrors.name = "Escribe un nombre para identificar tu rutina.";

    if (!muscleGroup) nextErrors.muscleGroup = "Selecciona un grupo muscular.";

    if (!Number.isFinite(duration) || duration < minDuration || duration > maxDuration)
      nextErrors.duration = "Elige una duración entre 10 y 180 minutos.";

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length) return;

    const data = { name: cleanName, muscleGroup, duration };

    if (idToEdit) updateRoutine(idToEdit, data);
    else addRoutine(data);

    Alert.alert(
      idToEdit ? "Rutina actualizada" : "Rutina creada",
      "Tu planificación se guardó correctamente.",
      [{ text: "Listo", onPress: () => navigation.goBack() }],
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={90}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.eyebrow}>
          {idToEdit ? "MODO EDICIÓN" : "NUEVA PLANIFICACIÓN"}
        </Text>
        <Text style={styles.title}>
          {idToEdit ? "Ajusta tu rutina" : "Diseña tu rutina"}
        </Text>
        <Text style={styles.subtitle}>
          Elige cada detalle y revisa el resumen antes de guardar.
        </Text>

        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <View style={styles.stepBadge}>
              <Text style={styles.stepText}>1</Text>
            </View>
            <View>
              <Text style={styles.sectionTitle}>Nombre</Text>
              <Text style={styles.sectionHint}>
                Hazlo corto y fácil de reconocer
              </Text>
            </View>
          </View>
          <View
            style={[
              styles.inputContainer,
              nameFocused && styles.inputFocused,
              errors.name && styles.inputError,
            ]}
          >
            <Ionicons
              name="barbell-outline"
              size={20}
              color={nameFocused ? colors.primary : colors.textMuted}
            />
            <TextInput
              value={name}
              onChangeText={(value) => {
                setName(value);
                setErrors((current) => ({ ...current, name: undefined }));
              }}
              onFocus={() => setNameFocused(true)}
              onBlur={() => setNameFocused(false)}
              placeholder="Ej. Pecho y tríceps"
              placeholderTextColor="#A09A9A"
              maxLength={50}
              returnKeyType="done"
              style={styles.input}
            />
          </View>
          {errors.name && <ErrorText message={errors.name} />}
        </View>

        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <View style={styles.stepBadge}>
              <Text style={styles.stepText}>2</Text>
            </View>
            <View>
              <Text style={styles.sectionTitle}>Grupo muscular</Text>
              <Text style={styles.sectionHint}>Selecciona una sola opción</Text>
            </View>
          </View>
          <View style={styles.optionGrid}>
            {selectorOptions.map((option) => {
              const selected = option.label === muscleGroup;
              return (
                <Pressable
                  key={option.label}
                  onPress={() => {
                    setMuscleGroup(option.label);
                    setErrors((current) => ({
                      ...current,
                      muscleGroup: undefined,
                    }));
                  }}
                  style={({ pressed }) => [
                    styles.muscleOption,
                    selected && {
                      backgroundColor: option.color,
                      borderColor: option.color,
                    },
                    pressed && styles.pressed,
                  ]}
                >
                  <Ionicons
                    name={option.icon}
                    size={20}
                    color={selected ? colors.white : option.color}
                  />
                  <Text
                    style={[styles.muscleText, selected && styles.selectedText]}
                  >
                    {option.label}
                  </Text>
                  {selected && (
                    <Ionicons
                      name="checkmark-circle"
                      size={17}
                      color={colors.white}
                    />
                  )}
                </Pressable>
              );
            })}
          </View>
          {errors.muscleGroup && <ErrorText message={errors.muscleGroup} />}
        </View>

        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <View style={styles.stepBadge}>
              <Text style={styles.stepText}>3</Text>
            </View>
            <View>
              <Text style={styles.sectionTitle}>Duración</Text>
              <Text style={styles.sectionHint}>Entre 10 y 180 minutos</Text>
            </View>
          </View>
          <View style={styles.durationGrid}>
            {durationOptions.map((option) => (
              <Pressable
                key={option}
                onPress={() => {
                  setDuration(option);
                  setErrors((current) => ({ ...current, duration: undefined }));
                }}
                style={({ pressed }) => [
                  styles.durationChip,
                  duration === option && styles.durationChipSelected,
                  pressed && styles.pressed,
                ]}
              >
                <Text
                  style={[
                    styles.durationChipText,
                    duration === option && styles.selectedText,
                  ]}
                >
                  {option} min
                </Text>
              </Pressable>
            ))}
          </View>
          <View style={styles.stepper}>
            <Pressable
              accessibilityLabel="Restar cinco minutos"
              onPress={() => adjustDuration(-5)}
              disabled={duration <= minDuration}
              style={({ pressed }) => [
                styles.stepperButton,
                duration <= minDuration && styles.disabled,
                pressed && styles.pressed,
              ]}
            >
              <Ionicons name="remove" size={24} color={colors.primary} />
            </Pressable>
            <View style={styles.durationValue}>
              <Text style={styles.durationNumber}>{duration}</Text>
              <Text style={styles.durationUnit}>minutos</Text>
            </View>
            <Pressable
              accessibilityLabel="Sumar cinco minutos"
              onPress={() => adjustDuration(5)}
              disabled={duration >= maxDuration}
              style={({ pressed }) => [
                styles.stepperButton,
                duration >= maxDuration && styles.disabled,
                pressed && styles.pressed,
              ]}
            >
              <Ionicons name="add" size={24} color={colors.primary} />
            </Pressable>
          </View>
          {errors.duration && <ErrorText message={errors.duration} />}
        </View>

        <View style={styles.summaryCard}>
          <View style={styles.summaryTop}>
            <Text style={styles.summaryLabel}>RESUMEN</Text>
            <Ionicons name="sparkles-outline" size={19} color="#F58A91" />
          </View>
          <Text style={styles.summaryName}>
            {name.trim() || "Tu próxima rutina"}
          </Text>
          <View style={styles.summaryMeta}>
            <View style={styles.summaryPill}>
              <Ionicons
                name={getMuscleOption(muscleGroup).icon}
                size={16}
                color={colors.white}
              />
              <Text style={styles.summaryPillText}>
                {muscleGroup || "Sin grupo"}
              </Text>
            </View>
            <View style={styles.summaryPill}>
              <Ionicons name="time-outline" size={16} color={colors.white} />
              <Text style={styles.summaryPillText}>{duration} min</Text>
            </View>
          </View>
        </View>

        <Pressable
          accessibilityRole="button"
          onPress={handleSave}
          style={({ pressed }) => [
            styles.saveButton,
            pressed && styles.pressed,
          ]}
        >
          <Ionicons
            name={idToEdit ? "checkmark-circle-outline" : "add-circle-outline"}
            size={22}
            color={colors.white}
          />
          <Text style={styles.saveText}>
            {idToEdit ? "Actualizar rutina" : "Guardar rutina"}
          </Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

function ErrorText({ message }: { message: string }) {
  return (
    <View style={styles.errorRow}>
      <Ionicons name="alert-circle-outline" size={15} color={colors.accent} />
      <Text style={styles.errorText}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  container: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: 36,
  },
  eyebrow: {
    color: colors.accent,
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 1.8,
  },
  title: {
    color: colors.text,
    fontSize: 30,
    fontWeight: "900",
    letterSpacing: -0.9,
    marginTop: 5,
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 20,
    marginTop: 7,
    marginBottom: 20,
  },
  sectionCard: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.lg,
    padding: spacing.md,
    marginBottom: 13,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 15,
  },
  stepBadge: {
    width: 31,
    height: 31,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.accentSoft,
  },
  stepText: { color: colors.primary, fontSize: 13, fontWeight: "900" },
  sectionTitle: { color: colors.text, fontSize: 16, fontWeight: "900" },
  sectionHint: { color: colors.textMuted, fontSize: 11, marginTop: 2 },
  inputContainer: {
    minHeight: 53,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.md,
    paddingHorizontal: 14,
  },
  inputFocused: {
    borderColor: colors.primary,
    backgroundColor: colors.surface,
  },
  inputError: { borderColor: colors.accent },
  input: { flex: 1, color: colors.text, fontSize: 15, paddingVertical: 13 },
  optionGrid: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  muscleOption: {
    minWidth: "47%",
    flexGrow: 1,
    flexBasis: 0,
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.md,
    paddingHorizontal: 11,
    paddingVertical: 12,
  },
  muscleText: { flex: 1, color: colors.text, fontSize: 12, fontWeight: "800" },
  selectedText: { color: colors.white },
  durationGrid: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  durationChip: {
    width: "30%",
    flexGrow: 1,
    alignItems: "center",
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.md,
    paddingVertical: 11,
  },
  durationChipSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  durationChipText: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: "800",
  },
  stepper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 25,
    marginTop: 16,
  },
  stepperButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.accentSoft,
  },
  durationValue: { alignItems: "center", minWidth: 70 },
  durationNumber: { color: colors.text, fontSize: 24, fontWeight: "900" },
  durationUnit: { color: colors.textMuted, fontSize: 10, marginTop: -2 },
  disabled: { opacity: 0.35 },
  errorRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginTop: 9,
  },
  errorText: { flex: 1, color: colors.accent, fontSize: 11, fontWeight: "700" },
  summaryCard: {
    backgroundColor: colors.primaryDark,
    borderRadius: radii.lg,
    padding: 18,
    marginTop: 2,
    overflow: "hidden",
  },
  summaryTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  summaryLabel: {
    color: "#E0C7C9",
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 1.5,
  },
  summaryName: {
    color: colors.white,
    fontSize: 21,
    fontWeight: "900",
    marginTop: 10,
  },
  summaryMeta: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 14,
  },
  summaryPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(255,255,255,0.14)",
    borderRadius: radii.pill,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  summaryPillText: { color: colors.white, fontSize: 11, fontWeight: "700" },
  saveButton: {
    minHeight: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
    backgroundColor: colors.primary,
    borderRadius: radii.md,
    marginTop: 15,
    ...shadow,
  },
  saveText: { color: colors.white, fontSize: 15, fontWeight: "900" },
  pressed: { opacity: 0.72, transform: [{ scale: 0.99 }] },
});
