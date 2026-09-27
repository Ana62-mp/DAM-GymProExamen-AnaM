import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRoutines } from "../context/RoutineContext";
import { getMuscleOption } from "../routineOptions";
import { colors, radii, shadow, spacing } from "../theme";

export default function RoutineDetailScreen({ route, navigation }: any) {
  const { routines } = useRoutines();
  const routine = routines.find((item) => item.id === route.params?.id);

  if (!routine) {
    return (
      <SafeAreaView style={styles.screen} edges={["left", "right", "bottom"]}>
        <View style={styles.notFound}>
          <View style={styles.notFoundIcon}><Ionicons name="file-tray-outline" size={34} color={colors.primary} /></View>
          <Text style={styles.notFoundTitle}>Rutina no disponible</Text>
          <Text style={styles.notFoundText}>Puede que haya sido eliminada. Regresa a tu planificación para continuar.</Text>
          <Pressable onPress={() => navigation.goBack()} style={styles.backButton}><Text style={styles.backText}>Volver a mis rutinas</Text></Pressable>
        </View>
      </SafeAreaView>
    );
  }

  const visual = getMuscleOption(routine.muscleGroup);
  const createdDate = new Intl.DateTimeFormat("es", { day: "numeric", month: "long", year: "numeric" }).format(new Date(routine.createdAt));

  return (
    <SafeAreaView style={styles.screen} edges={["left", "right", "bottom"]}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <View style={[styles.heroIcon, { backgroundColor: visual.color }]}><Ionicons name={visual.icon} size={31} color={colors.white} /></View>
          <Text style={styles.eyebrow}>TU ENTRENAMIENTO</Text>
          <Text style={styles.title}>{routine.name}</Text>
          <View style={styles.heroMeta}><Ionicons name="flash" size={16} color="#F58A91" /><Text style={styles.heroMetaText}>Plan listo para empezar</Text></View>
        </View>

        <Text style={styles.sectionTitle}>Detalles de la rutina</Text>
        <View style={styles.detailCard}>
          <DetailRow icon={visual.icon} color={visual.color} label="Grupo muscular" value={routine.muscleGroup} />
          <View style={styles.divider} />
          <DetailRow icon="time-outline" color={colors.accent} label="Duración planificada" value={`${routine.duration} minutos`} />
          <View style={styles.divider} />
          <DetailRow icon="calendar-outline" color="#365EAA" label="Fecha de creación" value={createdDate} />
        </View>

        <View style={styles.noteCard}><Ionicons name="information-circle-outline" size={20} color={colors.primary} /><Text style={styles.noteText}>Esta pantalla muestra planificación, no entrenamientos completados.</Text></View>

        <Pressable onPress={() => navigation.navigate("AddRoutine", { id: routine.id })} style={({ pressed }) => [styles.editButton, pressed && styles.pressed]}>
          <Ionicons name="pencil-outline" size={20} color={colors.white} /><Text style={styles.editText}>Editar rutina</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

function DetailRow({ icon, color, label, value }: { icon: keyof typeof Ionicons.glyphMap; color: string; label: string; value: string }) {
  return <View style={styles.detailRow}><View style={[styles.detailIcon, { backgroundColor: `${color}18` }]}><Ionicons name={icon} size={22} color={color} /></View><View style={styles.detailCopy}><Text style={styles.label}>{label}</Text><Text style={styles.value}>{value}</Text></View></View>;
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  container: { padding: spacing.lg, paddingBottom: 36 },
  hero: { backgroundColor: colors.primaryDark, borderRadius: radii.xl, padding: 22, minHeight: 210, justifyContent: "flex-end", ...shadow },
  heroIcon: { width: 58, height: 58, borderRadius: 18, alignItems: "center", justifyContent: "center", marginBottom: 22 },
  eyebrow: { color: "#E0C7C9", fontSize: 10, fontWeight: "900", letterSpacing: 1.7 },
  title: { color: colors.white, fontSize: 29, fontWeight: "900", letterSpacing: -0.8, marginTop: 6 },
  heroMeta: { flexDirection: "row", alignItems: "center", gap: 6, marginTop: 10 },
  heroMetaText: { color: "#EAD9DA", fontSize: 12, fontWeight: "700" },
  sectionTitle: { color: colors.text, fontSize: 18, fontWeight: "900", marginTop: 24, marginBottom: 11 },
  detailCard: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: radii.lg, paddingHorizontal: 16 },
  detailRow: { flexDirection: "row", alignItems: "center", paddingVertical: 16 },
  detailIcon: { width: 46, height: 46, borderRadius: 14, alignItems: "center", justifyContent: "center" },
  detailCopy: { flex: 1, marginLeft: 12 },
  label: { color: colors.textMuted, fontSize: 11, fontWeight: "700" },
  value: { color: colors.text, fontSize: 16, fontWeight: "800", marginTop: 3, textTransform: "capitalize" },
  divider: { height: 1, backgroundColor: colors.border },
  noteCard: { flexDirection: "row", alignItems: "flex-start", gap: 9, backgroundColor: colors.accentSoft, borderRadius: radii.md, padding: 13, marginTop: 13 },
  noteText: { flex: 1, color: "#765D5F", fontSize: 12, lineHeight: 17 },
  editButton: { minHeight: 54, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, backgroundColor: colors.primary, borderRadius: radii.md, marginTop: 18, ...shadow },
  editText: { color: colors.white, fontSize: 15, fontWeight: "900" },
  pressed: { opacity: 0.72, transform: [{ scale: 0.99 }] },
  notFound: { margin: spacing.lg, alignItems: "center", justifyContent: "center", backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: radii.lg, padding: 28 },
  notFoundIcon: { width: 68, height: 68, borderRadius: 22, backgroundColor: colors.accentSoft, alignItems: "center", justifyContent: "center" },
  notFoundTitle: { color: colors.text, fontSize: 19, fontWeight: "900", marginTop: 15 },
  notFoundText: { color: colors.textMuted, fontSize: 13, lineHeight: 19, textAlign: "center", marginTop: 7 },
  backButton: { backgroundColor: colors.primary, borderRadius: radii.md, paddingHorizontal: 17, paddingVertical: 12, marginTop: 18 },
  backText: { color: colors.white, fontSize: 13, fontWeight: "800" },
});
