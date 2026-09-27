import { useEffect, useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { useRoutines } from "../context/RoutineContext";

export default function AddRoutineScreen({ navigation, route }: any) {
  const { addRoutine, updateRoutine, routines } = useRoutines();

  // Si llega un id, estamos editando
  const idToEdit = route.params?.id;

  // Estados de los inputs
  const [name, setName] = useState("");
  const [muscleGroup, setMuscleGroup] = useState("");
  const [durationString, setDurationString] = useState("");

  // Si existe un id, buscamos la rutina
  // y llenamos los inputs
  useEffect(() => {
    if (idToEdit) {
      const routineFound = routines.find((routine) => routine.id === idToEdit);

      if (routineFound) {
        setName(routineFound.name);

        setMuscleGroup(routineFound.muscleGroup);

        setDurationString(routineFound.duration.toString());
      }
    }
  }, [idToEdit]);

  // Guardar o actualizar
  const handleSave = () => {
    // Validar campos vacíos
    if (!name || !muscleGroup || !durationString) {
      Alert.alert("Error", "Faltan datos requeridos");

      return;
    }

    // Convertir duración a número
    const durationNumber = parseFloat(durationString);

    // vaalidar que sea número
    if (isNaN(durationNumber)) {
      Alert.alert("Error", "La duración debe ser un número válido");

      return;
    }

    // Si hay id -> actualizar
    if (idToEdit) {
      updateRoutine(idToEdit, {
        name,
        muscleGroup,
        duration: durationNumber,
      });
    }

    // Si no hay id -> crear
    else {
      addRoutine({
        name,
        muscleGroup,
        duration: durationNumber,
      });
    }

    // Regresar a la pantalla anterior
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.eyebrow}>GYMPRO</Text>
      <Text style={styles.title}>
        {idToEdit ? "Edita tu rutina" : "Crea tu rutina"}
      </Text>
      <Text style={styles.subtitle}>
        Define los datos principales de tu entrenamiento.
      </Text>

      <View style={styles.formCard}>
        <View style={styles.field}>
          <Text style={styles.label}>Nombre</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="barbell-outline" size={20} color="#8f1d24" />
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Ej. Rutina de fuerza"
              placeholderTextColor="#a1a1a1"
            />
          </View>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Grupo muscular</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="fitness-outline" size={20} color="#8f1d24" />
            <TextInput
              style={styles.input}
              value={muscleGroup}
              onChangeText={setMuscleGroup}
              placeholder="Ej. Piernas"
              placeholderTextColor="#a1a1a1"
            />
          </View>
        </View>

        <View style={[styles.field, styles.lastField]}>
          <Text style={styles.label}>Duración</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="time-outline" size={20} color="#8f1d24" />
            <TextInput
              style={styles.input}
              value={durationString}
              onChangeText={setDurationString}
              keyboardType="numeric"
              placeholder="Ej. 45 minutos"
              placeholderTextColor="#a1a1a1"
            />
          </View>
        </View>
      </View>

      <TouchableOpacity
        style={styles.saveButton}
        activeOpacity={0.85}
        onPress={handleSave}
      >
        <Ionicons
          name={idToEdit ? "checkmark-circle-outline" : "add-circle-outline"}
          size={21}
          color="#ffffff"
        />
        <Text style={styles.saveButtonText}>
          {idToEdit ? "Actualizar" : "Guardar"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
    paddingHorizontal: 20,
    paddingTop: 26,
  },
  eyebrow: {
    color: "#c9363f",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 2,
    marginBottom: 5,
  },
  title: {
    color: "#111111",
    fontSize: 29,
    fontWeight: "800",
    letterSpacing: -0.7,
  },
  subtitle: {
    color: "#666666",
    fontSize: 14,
    lineHeight: 20,
    marginTop: 7,
    marginBottom: 24,
  },
  formCard: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e5e5e5",
    borderRadius: 20,
    padding: 18,
  },
  field: {
    marginBottom: 18,
  },
  lastField: {
    marginBottom: 0,
  },
  label: {
    color: "#252525",
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 8,
  },
  inputContainer: {
    minHeight: 52,
    flexDirection: "row",
    alignItems: "center",
    gap: 11,
    backgroundColor: "#fafafa",
    borderWidth: 1,
    borderColor: "#dedede",
    borderRadius: 14,
    paddingHorizontal: 14,
  },
  input: {
    flex: 1,
    color: "#111111",
    fontSize: 15,
    paddingVertical: 13,
  },
  saveButton: {
    minHeight: 54,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
    backgroundColor: "#8f1d24",
    borderRadius: 16,
    marginTop: 18,
    paddingHorizontal: 18,
    shadowColor: "#65151a",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.18,
    shadowRadius: 10,
    elevation: 4,
  },
  saveButtonText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "800",
  },
});
