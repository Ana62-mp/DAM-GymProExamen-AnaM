import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRoutines } from "../context/RoutineContext";
import { colors, radii, spacing } from "../theme";

export default function SettingsScreen() {
  const { routines } = useRoutines();
  return (
    <SafeAreaView style={styles.safeArea} edges={["left", "right"]}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.eyebrow}>GYMPRO</Text>
        <Text style={styles.title}>Configuración</Text>
        <Text style={styles.subtitle}>
          Información clara sobre tu experiencia actual.
        </Text>

        <View style={styles.brandCard}>
          <View style={styles.brandMark}>
            <Ionicons name="barbell" size={30} color={colors.white} />
          </View>
          <View style={styles.brandCopy}>
            <Text style={styles.brandName}>
              GYM<Text style={styles.brandAccent}>PRO</Text>
            </Text>
            <Text style={styles.brandDetail}>Entrena con intención</Text>
          </View>
          <View style={styles.versionBadge}>
            <Text style={styles.versionText}>v1.0</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Acerca de la app</Text>
        <View style={styles.infoCard}>
          <InfoRow
            icon="phone-portrait-outline"
            title="Experiencia"
            detail="Diseñada para dispositivos móviles"
          />
          <View style={styles.divider} />
          <InfoRow
            icon="sunny-outline"
            title="Apariencia"
            detail="Tema claro deportivo"
          />
          <View style={styles.divider} />
          <InfoRow
            icon="albums-outline"
            title="Rutinas en esta sesión"
            detail={`${routines.length} ${routines.length === 1 ? "rutina guardada" : "rutinas guardadas"}`}
          />
        </View>

        <View style={styles.privacyCard}>
          <View style={styles.privacyIcon}>
            <Ionicons
              name="lock-closed-outline"
              size={22}
              color={colors.success}
            />
          </View>
          <View style={styles.privacyCopy}>
            <Text style={styles.privacyTitle}>Datos locales de sesión</Text>
            <Text style={styles.privacyText}>
              Esta versión no utiliza cuenta, nube ni seguimiento de
              entrenamientos completados.
            </Text>
          </View>
        </View>

        <Text style={styles.footer}>
          Hecho para planificar tus entrenamientos con claridad.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

function InfoRow({
  icon,
  title,
  detail,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  detail: string;
}) {
  return (
    <View style={styles.infoRow}>
      <View style={styles.infoIcon}>
        <Ionicons name={icon} size={20} color={colors.primary} />
      </View>
      <View style={styles.infoCopy}>
        <Text style={styles.infoTitle}>{title}</Text>
        <Text style={styles.infoDetail}>{detail}</Text>
      </View>
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
    letterSpacing: 2,
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
    marginTop: 7,
    marginBottom: 21,
  },
  brandCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.primaryDark,
    borderRadius: radii.xl,
    padding: 18,
  },
  brandMark: {
    width: 55,
    height: 55,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.accent,
  },
  brandCopy: { flex: 1, marginLeft: 13 },
  brandName: {
    color: colors.white,
    fontSize: 20,
    fontWeight: "900",
    letterSpacing: 1.5,
  },
  brandAccent: { color: "#F58A91" },
  brandDetail: { color: "#DCC6C8", fontSize: 11, marginTop: 4 },
  versionBadge: {
    backgroundColor: "rgba(255,255,255,0.13)",
    borderRadius: 10,
    paddingHorizontal: 9,
    paddingVertical: 6,
  },
  versionText: { color: colors.white, fontSize: 10, fontWeight: "800" },
  sectionTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "900",
    marginTop: 25,
    marginBottom: 11,
  },
  infoCard: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.lg,
    paddingHorizontal: 15,
  },
  infoRow: { flexDirection: "row", alignItems: "center", paddingVertical: 15 },
  infoIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.accentSoft,
  },
  infoCopy: { flex: 1, marginLeft: 11 },
  infoTitle: { color: colors.text, fontSize: 13, fontWeight: "800" },
  infoDetail: { color: colors.textMuted, fontSize: 11, marginTop: 3 },
  divider: { height: 1, backgroundColor: colors.border },
  privacyCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#EDF8F2",
    borderRadius: radii.lg,
    padding: 15,
    marginTop: 14,
  },
  privacyIcon: {
    width: 42,
    height: 42,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
  },
  privacyCopy: { flex: 1, marginLeft: 11 },
  privacyTitle: { color: colors.text, fontSize: 13, fontWeight: "900" },
  privacyText: { color: "#537264", fontSize: 11, lineHeight: 16, marginTop: 4 },
  footer: {
    color: colors.textMuted,
    fontSize: 11,
    textAlign: "center",
    marginTop: 27,
  },
});
