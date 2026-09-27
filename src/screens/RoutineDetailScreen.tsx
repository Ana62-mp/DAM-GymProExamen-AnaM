import { View, Text, StyleSheet } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRoutines } from "../context/RoutineContext";

export default function RoutineDetailScreen({ route }: any) {
  const { routines } = useRoutines();

  // Recibimos el id enviado desde RoutineListScreen
  const idToView = route.params?.id;

  // Buscamos la rutina correspondiente
  const routine = routines.find((routine) => routine.id === idToView);

  // Por si no existe la rutina
  if (!routine) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.notFoundCard}>
          <Ionicons name="alert-circle-outline" size={34} color="#8f1d24" />
          <Text style={styles.notFoundText}>Rutina no encontrada</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Convertimos la fecha para mostrarla mejor
  const createdDate = new Date(routine.createdAt).toLocaleDateString();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.eyebrow}>DETALLE DE ENTRENAMIENTO</Text>
      <Text style={styles.title}>{routine.name}</Text>

      <View style={styles.detailCard}>
        <View style={[styles.detailRow, styles.detailBorder]}>
          <View style={styles.iconBox}>
            <Ionicons name="fitness-outline" size={22} color="#8f1d24" />
          </View>
          <View style={styles.detailCopy}>
            <Text style={styles.label}>Grupo muscular</Text>
            <Text style={styles.info}>{routine.muscleGroup}</Text>
          </View>
        </View>

        <View style={[styles.detailRow, styles.detailBorder]}>
          <View style={styles.iconBox}>
            <Ionicons name="time-outline" size={22} color="#8f1d24" />
          </View>
          <View style={styles.detailCopy}>
            <Text style={styles.label}>Duración</Text>
            <Text style={styles.info}>{routine.duration} mins</Text>
          </View>
        </View>

        <View style={styles.detailRow}>
          <View style={styles.iconBox}>
            <Ionicons name="calendar-outline" size={22} color="#8f1d24" />
          </View>
          <View style={styles.detailCopy}>
            <Text style={styles.label}>Fecha de creación</Text>
            <Text style={styles.info}>{createdDate}</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f7f7f7",
  },
  eyebrow: {
    color: "#c9363f",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1.8,
    marginTop: 4,
    marginBottom: 5,
  },
  title: {
    color: "#111111",
    fontSize: 29,
    fontWeight: "800",
    letterSpacing: -0.7,
    marginBottom: 24,
  },
  detailCard: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e5e5e5",
    borderRadius: 20,
    paddingHorizontal: 17,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 17,
  },
  detailBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#ededed",
  },
  iconBox: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff0f0",
    borderRadius: 13,
  },
  detailCopy: {
    flex: 1,
    marginLeft: 13,
  },
  label: {
    color: "#777777",
    fontSize: 11,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },
  info: {
    color: "#111111",
    fontSize: 17,
    fontWeight: "700",
    marginTop: 4,
  },
  notFoundCard: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e5e5e5",
    borderRadius: 20,
    padding: 28,
  },
  notFoundText: {
    color: "#111111",
    fontSize: 16,
    fontWeight: "700",
    marginTop: 10,
  },
});
