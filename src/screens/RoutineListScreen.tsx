import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRoutines } from "../context/RoutineContext";

export default function RoutineListScreen({ navigation }: any) {
  const { routines, deleteRoutine } = useRoutines();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <View style={styles.headerCopy}>
          <Text style={styles.eyebrow}>ENTRENAMIENTO</Text>
          <Text style={styles.title}>Mis rutinas</Text>
          <Text style={styles.subtitle}>Organiza y consulta tus entrenamientos.</Text>
        </View>
        <TouchableOpacity
          style={styles.addButton}
          activeOpacity={0.85}
          onPress={() => navigation.navigate("AddRoutine")}
        >
          <Ionicons name="add" size={27} color="#ffffff" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={routines}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyCard}>
            <View style={styles.emptyIcon}>
              <Ionicons name="barbell-outline" size={30} color="#8f1d24" />
            </View>
            <Text style={styles.emptyTitle}>Aún no hay rutinas</Text>
            <Text style={styles.emptyText}>
              Pulsa el botón + para agregar tu primer entrenamiento.
            </Text>
          </View>
        }
        renderItem={({ item }) => {
          return (
            <View style={styles.routineCard}>
              <View style={styles.routineInfo}>
                <View style={styles.cardIcon}>
                  <Ionicons name="fitness-outline" size={23} color="#8f1d24" />
                </View>
                <View style={styles.cardCopy}>
                  <Text style={styles.routineName}>{item.name}</Text>
                  <Text style={styles.muscleGroup}>{item.muscleGroup}</Text>
                  <View style={styles.durationRow}>
                    <Ionicons name="time-outline" size={14} color="#777777" />
                    <Text style={styles.duration}>{item.duration} mins</Text>
                  </View>
                </View>
              </View>

              <View style={styles.actions}>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() =>
                    navigation.navigate("Detail", { id: item.id })
                  }
                >
                  <Ionicons name="eye-outline" size={20} color="#555555" />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() =>
                    navigation.navigate("AddRoutine", { id: item.id })
                  }
                >
                  <Ionicons name="pencil-outline" size={20} color="#8f1d24" />
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.actionButton, styles.deleteButton]}
                  onPress={() => deleteRoutine(item.id)}
                >
                  <Ionicons name="trash-outline" size={20} color="#c9363f" />
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f7f7f7",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 18,
  },
  headerCopy: {
    flex: 1,
  },
  eyebrow: {
    color: "#c9363f",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 2,
    marginBottom: 4,
  },
  title: {
    color: "#111111",
    fontSize: 30,
    fontWeight: "800",
    letterSpacing: -0.8,
  },
  subtitle: {
    color: "#666666",
    fontSize: 13,
    marginTop: 5,
  },
  addButton: {
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#8f1d24",
    borderRadius: 16,
    marginLeft: 14,
    shadowColor: "#65151a",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 28,
    gap: 12,
    flexGrow: 1,
  },
  routineCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e5e5e5",
    borderRadius: 20,
    padding: 15,
  },
  routineInfo: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  cardIcon: {
    width: 47,
    height: 47,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff0f0",
    borderRadius: 14,
  },
  cardCopy: {
    flex: 1,
    marginLeft: 12,
  },
  routineName: {
    color: "#111111",
    fontSize: 16,
    fontWeight: "800",
  },
  muscleGroup: {
    color: "#8f1d24",
    fontSize: 12,
    fontWeight: "700",
    marginTop: 3,
  },
  durationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 6,
  },
  duration: {
    color: "#777777",
    fontSize: 11,
  },
  actions: {
    flexDirection: "row",
    gap: 6,
    marginLeft: 8,
  },
  actionButton: {
    width: 35,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 11,
  },
  deleteButton: {
    backgroundColor: "#fff0f0",
  },
  emptyCard: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e5e5e5",
    borderRadius: 20,
    padding: 28,
    marginTop: 8,
  },
  emptyIcon: {
    width: 62,
    height: 62,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff0f0",
    borderRadius: 19,
    marginBottom: 14,
  },
  emptyTitle: {
    color: "#111111",
    fontSize: 17,
    fontWeight: "800",
  },
  emptyText: {
    color: "#777777",
    fontSize: 13,
    lineHeight: 19,
    textAlign: "center",
    marginTop: 6,
  },
});
