import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { ActivityIndicator, Alert, View } from "react-native";
import {
  initDatabase,
  getAllRoutines,
  insertRoutine,
  updateRoutineDB,
  deleteRoutineDB,
} from "../database/db";

// Tipo de una rutina completa
export type Routine = {
  id: string;
  name: string;
  muscleGroup: string;
  duration: number;
  createdAt: string;
};

// Datos que llegan desde los inputs
// duration puede llegar como string desde TextInput
type DatosRutina = {
  name: string;
  muscleGroup: string;
  duration: string | number;
};

// Lo que va a compartir el  Context
type RoutineContextType = {
  routines: Routine[];

  addRoutine: (datos: DatosRutina) => Promise<void>;

  updateRoutine: (id: string, datos: DatosRutina) => Promise<void>;

  deleteRoutine: (id: string) => Promise<void>;
};

// Crear Context
const RoutineContext = createContext<RoutineContextType | undefined>(undefined);

// Provider
export function RoutineProvider({ children }: { children: ReactNode }) {
  const [routines, setRoutines] = useState<Routine[]>([]);
  const [loading, setLoading] = useState(true);

  // para renderizar que cargue listado cada inicio app
  useEffect(() => {
    async function cargarRutinas() {
      try {
        await initDatabase();

        const rutinasGuardadas = await getAllRoutines();

        setRoutines(rutinasGuardadas);
      } catch (error) {
        console.error("Error al cargar rutinas:", error);

        Alert.alert("Error", "No se pudieron cargar las rutinas.");
      } finally {
        setLoading(false);
      }
    }

    cargarRutinas();
  }, []);

  // AGREGAR RUTINA
  const addRoutine = async (datos: DatosRutina) => {
    const nuevaRutina: Routine = {
      id: Date.now().toString(),
      //esto ... es para no poner todito, sino solo lo que se tiene que transformar
      ...datos,

      // Convertimos el valor a número
      duration: Number(datos.duration),

      createdAt: new Date().toISOString(),
    };
    await insertRoutine(nuevaRutina);
    setRoutines((actuales) => [...actuales, nuevaRutina]);
  };

  // ACTUALIZAR RUTINA
  const updateRoutine = async (id: string, datos: DatosRutina) => {
    const rutinaActual = routines.find((rutina) => rutina.id === id);
    if (!rutinaActual) {
      throw new Error("Rutina no encontrada");
    }

    const rutinaActualizada: Routine = {
      ...rutinaActual,
      ...datos,
      duration: Number(datos.duration),
    };

    await updateRoutineDB(rutinaActualizada);
    setRoutines((actuales) =>
      actuales.map((rutina) => (rutina.id === id ? rutinaActualizada : rutina)),
    );
  };

  // ELIMINAR RUTINA
  const deleteRoutine = async (id: string) => {
    await deleteRoutineDB(id);
    setRoutines((actuales) => actuales.filter((rutina) => rutina.id !== id));
  };

  return (
    <RoutineContext.Provider
      value={{
        routines,
        addRoutine,
        updateRoutine,
        deleteRoutine,
      }}
    >
      {loading ? (
          <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
          }}
        >

          <ActivityIndicator
            size="large"
            color="#8f1d24"
          />

        </View>
      
      ) : (
        children
      )}
    </RoutineContext.Provider>
  );
}

// Hook para utilizar el Context desde las pantallas
export function useRoutines() {
  const context = useContext(RoutineContext);

  if (context === undefined) {
    throw new Error("useRoutines debe utilizarse dentro de RoutineProvider");
  }

  return context;
}
