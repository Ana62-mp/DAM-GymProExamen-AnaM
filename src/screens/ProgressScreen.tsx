import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRoutines } from "../context/RoutineContext";
import { getMuscleOption } from "../routineOptions";
import { colors, radii, spacing } from "../theme";

export default function ProgressScreen() {
  const { routines } = useRoutines();
  const totalMinutes = routines.reduce(
    (total, routine) => total + routine.duration,
    0,
  );
  const distribution = routines.reduce<Record<string, number>>(
    (groups, routine) => {
      const key = routine.muscleGroup.trim() || "General";
      groups[key] = (groups[key] ?? 0) + 1;
      return groups;
    },
    {},
  );
  const entries = Object.entries(distribution).sort((a, b) => b[1] - a[1]);
  const averageMinutes =
    routines.length > 0 ? Math.round(totalMinutes / routines.length) : 0;
  const topGroup = entries.length > 0 ? entries[0][0] : "Sin rutinas";

  const maxCount = Math.max(...entries.map(([, count]) => count), 1);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return (
    <SafeAreaView style={styles.safeArea} edges={["left", "right"]}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.eyebrow}>PANORAMA REAL</Text>
        <Text style={styles.title}>Tu planificación</Text>
        <Text style={styles.subtitle}>
          Una vista clara de las rutinas que has preparado.
        </Text>

        <View style={styles.hero}>
          <View style={styles.heroTop}>
            <View style={styles.heroIcon}>
              <Ionicons
                name="analytics-outline"
                size={24}
                color={colors.white}
              />
            </View>
            <Text style={styles.heroLabel}>TIEMPO PLANIFICADO</Text>
          </View>
          <View style={styles.timeRow}>
            {hours > 0 && (
              <>
                <Text style={styles.heroNumber}>{hours}</Text>
                <Text style={styles.heroUnit}>h</Text>
              </>
            )}
            <Text style={styles.heroNumber}>{minutes}</Text>
            <Text style={styles.heroUnit}>min</Text>
          </View>
          <Text style={styles.heroCaption}>
            Suma de la duración de tus rutinas
          </Text>
        </View>

        <View style={styles.statsRow}>
          <Stat
            icon="barbell-outline"
            value={routines.length}
            label="Rutinas planificadas"
          />
          <Stat
            icon="layers-outline"
            value={entries.length}
            label="Grupos diferentes"
          />
        </View>

        <View style={styles.statsRow}>
          <Stat
            icon="time-outline"
            value={averageMinutes}
            label="Promedio de minutos"
          />

          <View style={styles.statCard}>
            <Ionicons name="trophy-outline" size={22} color={colors.accent} />

            <Text style={styles.statValue}>{topGroup}</Text>

            <Text style={styles.statLabel}>Grupo con más rutinas</Text>
          </View>
        </View>

        <View style={styles.chartCard}>
          <Text style={styles.sectionTitle}>Distribución por grupo</Text>
          <Text style={styles.chartCaption}>
            Cantidad de rutinas creadas, no sesiones completadas.
          </Text>
          {entries.length ? (
            entries.map(([group, count]) => {
              const visual = getMuscleOption(group);
              return (
                <View style={styles.barRow} key={group}>
                  <View style={styles.barLabelRow}>
                    <View
                      style={[
                        styles.smallIcon,
                        { backgroundColor: `${visual.color}18` },
                      ]}
                    >
                      <Ionicons
                        name={visual.icon}
                        size={16}
                        color={visual.color}
                      />
                    </View>
                    <Text style={styles.barLabel}>{group}</Text>
                    <Text style={styles.barCount}>{count}</Text>
                  </View>
                  <View style={styles.track}>
                    <View
                      style={[
                        styles.bar,
                        {
                          width: `${Math.max((count / maxCount) * 100, 8)}%`,
                          backgroundColor: visual.color,
                        },
                      ]}
                    />
                  </View>
                </View>
              );
            })
          ) : (
            <View style={styles.empty}>
              <Ionicons
                name="stats-chart-outline"
                size={30}
                color={colors.primary}
              />
              <Text style={styles.emptyTitle}>Aún no hay datos</Text>
              <Text style={styles.emptyText}>
                Crea una rutina para ver aquí su distribución.
              </Text>
            </View>
          )}
        </View>

        <View style={styles.infoCard}>
          <Ionicons
            name="shield-checkmark-outline"
            size={23}
            color={colors.success}
          />
          <View style={styles.infoCopy}>
            <Text style={styles.infoTitle}>Datos transparentes</Text>
            <Text style={styles.infoText}>
              GymPro solo muestra información calculada desde tus rutinas
              guardadas.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function Stat({
  icon,
  value,
  label,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  value: number;
  label: string;
}) {
  return (
    <View style={styles.statCard}>
      <Ionicons name={icon} size={22} color={colors.accent} />
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  container: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: 34,
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
    marginTop: 4,
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 20,
    marginTop: 7,
    marginBottom: 20,
  },
  hero: {
    backgroundColor: colors.primaryDark,
    borderRadius: radii.xl,
    padding: 20,
  },
  heroTop: { flexDirection: "row", alignItems: "center", gap: 10 },
  heroIcon: {
    width: 42,
    height: 42,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.14)",
  },
  heroLabel: {
    color: "#E7D5D6",
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 1.3,
  },
  timeRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 4,
    marginTop: 18,
  },
  heroNumber: { color: colors.white, fontSize: 38, fontWeight: "900" },
  heroUnit: {
    color: "#F58A91",
    fontSize: 16,
    fontWeight: "800",
    marginRight: 7,
  },
  heroCaption: { color: "#DCC6C8", fontSize: 11, marginTop: 2 },
  statsRow: { flexDirection: "row", gap: 11, marginTop: 12 },
  statCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.lg,
    padding: 16,
  },
  statValue: {
    color: colors.text,
    fontSize: 23,
    fontWeight: "900",
    marginTop: 11,
  },
  statLabel: {
    color: colors.textMuted,
    fontSize: 11,
    lineHeight: 15,
    marginTop: 3,
  },
  chartCard: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.lg,
    padding: 17,
    marginTop: 13,
  },
  sectionTitle: { color: colors.text, fontSize: 18, fontWeight: "900" },
  chartCaption: {
    color: colors.textMuted,
    fontSize: 11,
    lineHeight: 16,
    marginTop: 4,
    marginBottom: 7,
  },
  barRow: { marginTop: 15 },
  barLabelRow: { flexDirection: "row", alignItems: "center" },
  smallIcon: {
    width: 30,
    height: 30,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
  },
  barLabel: {
    flex: 1,
    color: colors.text,
    fontSize: 12,
    fontWeight: "800",
    marginLeft: 9,
  },
  barCount: { color: colors.textMuted, fontSize: 12, fontWeight: "900" },
  track: {
    height: 7,
    borderRadius: 4,
    backgroundColor: colors.surfaceMuted,
    marginTop: 8,
    overflow: "hidden",
  },
  bar: { height: "100%", borderRadius: 4 },
  empty: { alignItems: "center", paddingVertical: 24 },
  emptyTitle: {
    color: colors.text,
    fontSize: 15,
    fontWeight: "900",
    marginTop: 8,
  },
  emptyText: { color: colors.textMuted, fontSize: 12, marginTop: 4 },
  infoCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 11,
    backgroundColor: "#EDF8F2",
    borderRadius: radii.md,
    padding: 14,
    marginTop: 13,
  },
  infoCopy: { flex: 1 },
  infoTitle: { color: colors.text, fontSize: 13, fontWeight: "900" },
  infoText: { color: "#537264", fontSize: 11, lineHeight: 16, marginTop: 3 },
});
