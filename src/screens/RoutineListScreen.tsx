import { useMemo, useState } from "react";
import {
  Alert,
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRoutines, Routine } from "../context/RoutineContext";
import { getMuscleOption, muscleOptions } from "../routineOptions";
import { colors, radii, shadow, spacing } from "../theme";

const normalize = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase()
    .trim();

export default function RoutineListScreen({ navigation }: any) {
  const { routines, deleteRoutine } = useRoutines();
  const [query, setQuery] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("Todas");
  const totalMinutes = routines.reduce((sum, item) => sum + item.duration, 0);
  const groupCount = new Set(
    routines.map((item) => normalize(item.muscleGroup)),
  ).size;

  const filters = useMemo(() => {
    const defined = muscleOptions.map((option) => option.label);
    const legacy = routines
      .map((item) => item.muscleGroup.trim())
      .filter(
        (group, index, groups) =>
          group &&
          groups.findIndex(
            (candidate) => normalize(candidate) === normalize(group),
          ) === index &&
          !defined.some(
            (candidate) => normalize(candidate) === normalize(group),
          ),
      );
    return ["Todas", ...defined, ...legacy];
  }, [routines]);

  const filteredRoutines = useMemo(
    () =>
      routines.filter((routine) => {
        const matchesSearch = normalize(routine.name).includes(
          normalize(query),
        );
        const matchesGroup =
          selectedGroup === "Todas" ||
          normalize(routine.muscleGroup) === normalize(selectedGroup);
        return matchesSearch && matchesGroup;
      }),
    [query, routines, selectedGroup],
  );

  const confirmDelete = (routine: Routine) =>
    Alert.alert(
      "Eliminar rutina",
      `¿Seguro que deseas eliminar “${routine.name}”? Esta acción no se puede deshacer.`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: () => deleteRoutine(routine.id),
        },
      ],
    );

  const renderRoutine = ({ item }: { item: Routine }) => {
    const visual = getMuscleOption(item.muscleGroup);
    return (
      <View style={styles.routineCard}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Ver rutina ${item.name}`}
          onPress={() => navigation.navigate("Detail", { id: item.id })}
          style={({ pressed }) => [styles.cardMain, pressed && styles.pressed]}
        >
          <View
            style={[styles.cardIcon, { backgroundColor: `${visual.color}18` }]}
          >
            <Ionicons name={visual.icon} size={25} color={visual.color} />
          </View>
          <View style={styles.cardCopy}>
            <Text style={styles.routineName} numberOfLines={1}>
              {item.name}
            </Text>
            <View style={styles.cardMeta}>
              <Text style={[styles.groupLabel, { color: visual.color }]}>
                {item.muscleGroup}
              </Text>
              <View style={styles.dot} />
              <Ionicons
                name="time-outline"
                size={14}
                color={colors.textMuted}
              />
              <Text style={styles.duration}>{item.duration} min</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#AAA3A3" />
        </Pressable>
        <View style={styles.actions}>
          <Action
            label="Ver"
            icon="eye-outline"
            color={colors.textMuted}
            onPress={() => navigation.navigate("Detail", { id: item.id })}
          />
          <Action
            label="Editar"
            icon="pencil-outline"
            color={colors.primary}
            onPress={() => navigation.navigate("AddRoutine", { id: item.id })}
          />
          <Action
            label="Eliminar"
            icon="trash-outline"
            color={colors.accent}
            onPress={() => confirmDelete(item)}
            danger
          />
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["left", "right"]}>
      <FlatList
        data={filteredRoutines}
        keyExtractor={(item) => item.id}
        renderItem={renderRoutine}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListHeaderComponent={
          <View>
            <View style={styles.hero}>
              <View style={styles.heroGlow} />
              <Text style={styles.brand}>
                GYM<Text style={styles.brandAccent}>PRO</Text>
              </Text>
              <Text style={styles.title}>Mis rutinas</Text>
              <Text style={styles.subtitle}>
                Planifica hoy. Entrena con intención.
              </Text>
              <Pressable
                accessibilityRole="button"
                onPress={() => navigation.navigate("AddRoutine")}
                style={({ pressed }) => [
                  styles.addButton,
                  pressed && styles.pressed,
                ]}
              >
                <Ionicons
                  name="add-circle"
                  size={22}
                  color={colors.primaryDark}
                />
                <Text style={styles.addButtonText}>Nueva rutina</Text>
              </Pressable>
            </View>
            <View style={styles.statsRow}>
              <Stat
                value={routines.length}
                label="Rutinas"
                icon="barbell-outline"
              />
              <Stat value={totalMinutes} label="Minutos" icon="time-outline" />
              <Stat value={groupCount} label="Grupos" icon="body-outline" />
            </View>
            <Text style={styles.sectionTitle}>Tu planificación</Text>
            <View style={styles.searchBox}>
              <Ionicons
                name="search-outline"
                size={21}
                color={colors.textMuted}
              />
              <TextInput
                accessibilityLabel="Buscar rutinas por nombre"
                value={query}
                onChangeText={setQuery}
                placeholder="Buscar por nombre"
                placeholderTextColor="#959090"
                returnKeyType="search"
                style={styles.searchInput}
              />
              {query.length > 0 && (
                <Pressable onPress={() => setQuery("")} hitSlop={8}>
                  <Ionicons name="close-circle" size={20} color="#AAA3A3" />
                </Pressable>
              )}
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.filters}
            >
              {filters.map((filter) => {
                const selected = selectedGroup === filter;
                return (
                  <Pressable
                    key={filter}
                    onPress={() => setSelectedGroup(filter)}
                    style={({ pressed }) => [
                      styles.filterChip,
                      selected && styles.filterChipSelected,
                      pressed && styles.pressed,
                    ]}
                  >
                    {selected && (
                      <Ionicons
                        name="checkmark"
                        size={14}
                        color={colors.white}
                      />
                    )}
                    <Text
                      style={[
                        styles.filterText,
                        selected && styles.filterTextSelected,
                      ]}
                    >
                      {filter}
                    </Text>
                  </Pressable>
                );
              })}
            </ScrollView>
            <View style={styles.resultsRow}>
              <Text style={styles.resultsText}>
                {filteredRoutines.length}{" "}
                {filteredRoutines.length === 1 ? "rutina" : "rutinas"}
              </Text>
              {(query || selectedGroup !== "Todas") && (
                <Pressable
                  onPress={() => {
                    setQuery("");
                    setSelectedGroup("Todas");
                  }}
                >
                  <Text style={styles.clearText}>Limpiar filtros</Text>
                </Pressable>
              )}
            </View>
          </View>
        }
        ListEmptyComponent={
          <View style={styles.emptyCard}>
            <View style={styles.emptyIcon}>
              <Ionicons
                name={routines.length ? "search-outline" : "barbell-outline"}
                size={32}
                color={colors.primary}
              />
            </View>
            <Text style={styles.emptyTitle}>
              {routines.length
                ? "No encontramos coincidencias"
                : "Tu primera rutina empieza aquí"}
            </Text>
            <Text style={styles.emptyText}>
              {routines.length
                ? "Prueba con otro nombre o cambia el grupo muscular."
                : "Crea un plan sencillo y empieza a entrenar a tu ritmo."}
            </Text>
            {!routines.length && (
              <Pressable
                style={styles.emptyButton}
                onPress={() => navigation.navigate("AddRoutine")}
              >
                <Text style={styles.emptyButtonText}>Crear rutina</Text>
              </Pressable>
            )}
          </View>
        }
      />
    </SafeAreaView>
  );
}

function Stat({
  value,
  label,
  icon,
}: {
  value: number;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
}) {
  return (
    <View style={styles.statCard}>
      <Ionicons name={icon} size={20} color={colors.accent} />
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function Action({
  label,
  icon,
  color,
  onPress,
  danger = false,
}: {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  onPress: () => void;
  danger?: boolean;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      hitSlop={6}
      onPress={onPress}
      style={({ pressed }) => [
        styles.actionButton,
        danger && styles.deleteButton,
        pressed && styles.pressed,
      ]}
    >
      <Ionicons name={icon} size={18} color={color} />
      <Text style={[styles.actionText, { color }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  listContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
    flexGrow: 1,
  },
  hero: {
    backgroundColor: colors.primaryDark,
    borderRadius: radii.xl,
    padding: spacing.lg,
    marginTop: spacing.md,
    overflow: "hidden",
  },
  heroGlow: {
    position: "absolute",
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: colors.accent,
    opacity: 0.38,
    right: -55,
    top: -70,
  },
  brand: {
    color: colors.white,
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 2.2,
  },
  brandAccent: { color: "#F58A91" },
  title: {
    color: colors.white,
    fontSize: 32,
    fontWeight: "900",
    letterSpacing: -1,
    marginTop: 13,
  },
  subtitle: { color: "#E9D8D9", fontSize: 14, marginTop: 5 },
  addButton: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: colors.white,
    borderRadius: radii.md,
    paddingHorizontal: 14,
    paddingVertical: 11,
    marginTop: 20,
  },
  addButtonText: { color: colors.primaryDark, fontSize: 14, fontWeight: "800" },
  pressed: { opacity: 0.7, transform: [{ scale: 0.985 }] },
  statsRow: { flexDirection: "row", gap: 9, marginTop: 12 },
  statCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: radii.md,
    padding: 13,
    ...shadow,
  },
  statValue: {
    color: colors.text,
    fontSize: 21,
    fontWeight: "900",
    marginTop: 10,
  },
  statLabel: { color: colors.textMuted, fontSize: 11, marginTop: 2 },
  sectionTitle: {
    color: colors.text,
    fontSize: 19,
    fontWeight: "900",
    marginTop: 25,
    marginBottom: 11,
  },
  searchBox: {
    minHeight: 51,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.md,
    paddingHorizontal: 14,
  },
  searchInput: {
    flex: 1,
    color: colors.text,
    fontSize: 15,
    paddingVertical: 12,
  },
  filters: { gap: 8, paddingVertical: 12, paddingRight: spacing.lg },
  filterChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.pill,
    backgroundColor: colors.surface,
    paddingHorizontal: 13,
    paddingVertical: 9,
  },
  filterChipSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterText: { color: colors.textMuted, fontSize: 12, fontWeight: "700" },
  filterTextSelected: { color: colors.white },
  resultsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 11,
  },
  resultsText: { color: colors.textMuted, fontSize: 12, fontWeight: "700" },
  clearText: { color: colors.primary, fontSize: 12, fontWeight: "800" },
  separator: { height: 12 },
  routineCard: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.lg,
    overflow: "hidden",
    ...shadow,
  },
  cardMain: { flexDirection: "row", alignItems: "center", padding: 15 },
  cardIcon: {
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
  },
  cardCopy: { flex: 1, marginLeft: 12 },
  routineName: { color: colors.text, fontSize: 16, fontWeight: "900" },
  cardMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginTop: 6,
  },
  groupLabel: { fontSize: 12, fontWeight: "800" },
  dot: {
    width: 3,
    height: 3,
    borderRadius: 2,
    backgroundColor: "#B9B4B4",
    marginHorizontal: 2,
  },
  duration: { color: colors.textMuted, fontSize: 12 },
  actions: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  actionButton: {
    flex: 1,
    minHeight: 43,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  actionText: { fontSize: 11, fontWeight: "800" },
  deleteButton: { backgroundColor: "#FFF8F8" },
  emptyCard: {
    alignItems: "center",
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#D7C7C8",
    borderRadius: radii.lg,
    padding: 28,
  },
  emptyIcon: {
    width: 64,
    height: 64,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.accentSoft,
    borderRadius: 20,
    marginBottom: 14,
  },
  emptyTitle: {
    color: colors.text,
    fontSize: 17,
    fontWeight: "900",
    textAlign: "center",
  },
  emptyText: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 19,
    textAlign: "center",
    marginTop: 7,
  },
  emptyButton: {
    backgroundColor: colors.primary,
    borderRadius: radii.md,
    paddingHorizontal: 16,
    paddingVertical: 11,
    marginTop: 17,
  },
  emptyButtonText: { color: colors.white, fontSize: 13, fontWeight: "800" },
});
