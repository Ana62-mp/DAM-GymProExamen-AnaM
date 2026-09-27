import { Text, View, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const options = [
  {icon: 'person-outline', title: 'Perfil', detail: 'Tus datos personales'},
  {icon: 'notifications-outline', title: 'Notificaciones', detail: 'Recordatorios de entrenamiento'},
  {icon: 'color-palette-outline', title: 'Apariencia', detail: 'Tema oscuro activado'},
  {icon: 'shield-checkmark-outline', title: 'Privacidad', detail: 'Seguridad y permisos'},
];

export default function SettingsScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.eyebrow}>GYMPRO</Text>
        <Text style={styles.title}>Configuración</Text>
        <Text style={styles.subtitle}>Personaliza tu experiencia de entrenamiento.</Text>

        <View style={styles.profileCard}>
          <View style={styles.avatar}><Ionicons name="person" size={30} color="#ffffff" /></View>
          <View style={styles.profileCopy}>
            <Text style={styles.profileName}>Atleta GymPro</Text>
            <Text style={styles.profileLevel}>Nivel intermedio</Text>
          </View>
          <View style={styles.proBadge}><Text style={styles.proText}>PRO</Text></View>
        </View>

        <Text style={styles.sectionTitle}>Preferencias</Text>
        <View style={styles.optionsCard}>
          {options.map((option, index) => (
            <View style={[styles.option, index < options.length - 1 && styles.optionBorder]} key={option.title}>
              <View style={styles.optionIcon}><Ionicons name={option.icon as any} size={21} color="#c9363f" /></View>
              <View style={styles.optionCopy}>
                <Text style={styles.optionTitle}>{option.title}</Text>
                <Text style={styles.optionDetail}>{option.detail}</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#777777" />
            </View>
          ))}
        </View>

        <View style={styles.brandCard}>
          <View style={styles.brandMark}><Ionicons name="barbell" size={25} color="#ffffff" /></View>
          <Text style={styles.brandName}>GYM<Text style={styles.brandAccent}>PRO</Text></Text>
          <Text style={styles.version}>Versión 1.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {flex: 1, backgroundColor: '#f7f7f7'},
  container: {paddingHorizontal: 20, paddingTop: 18, paddingBottom: 32},
  eyebrow: {color: '#c9363f', fontSize: 12, fontWeight: '800', letterSpacing: 2, marginBottom: 4},
  title: {fontSize: 30, fontWeight: '800', color: '#111111', letterSpacing: -0.8},
  subtitle: {fontSize: 14, color: '#666666', marginTop: 7, marginBottom: 22},
  profileCard: {flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff3f3', borderWidth: 1, borderColor: '#e6c5c7', borderRadius: 20, padding: 17, marginBottom: 25},
  avatar: {width: 56, height: 56, borderRadius: 18, backgroundColor: '#8f1d24', alignItems: 'center', justifyContent: 'center'},
  profileCopy: {flex: 1, marginLeft: 13},
  profileName: {color: '#111111', fontSize: 17, fontWeight: '800'},
  profileLevel: {color: '#9b8586', fontSize: 12, marginTop: 4},
  proBadge: {backgroundColor: '#ffffff', borderRadius: 12, paddingHorizontal: 9, paddingVertical: 5},
  proText: {color: '#65151a', fontSize: 10, fontWeight: '900'},
  sectionTitle: {fontSize: 18, color: '#111111', fontWeight: '800', marginBottom: 12},
  optionsCard: {backgroundColor: '#ffffff', borderWidth: 1, borderColor: '#e5e5e5', borderRadius: 20, paddingHorizontal: 15},
  option: {flexDirection: 'row', alignItems: 'center', paddingVertical: 15},
  optionBorder: {borderBottomWidth: 1, borderBottomColor: '#e5e5e5'},
  optionIcon: {width: 40, height: 40, borderRadius: 12, backgroundColor: '#fff0f0', alignItems: 'center', justifyContent: 'center'},
  optionCopy: {flex: 1, marginLeft: 12},
  optionTitle: {color: '#111111', fontSize: 14, fontWeight: '700'},
  optionDetail: {color: '#666666', fontSize: 11, marginTop: 3},
  brandCard: {alignItems: 'center', paddingTop: 30},
  brandMark: {width: 48, height: 48, borderRadius: 16, backgroundColor: '#65151a', alignItems: 'center', justifyContent: 'center', marginBottom: 10},
  brandName: {color: '#111111', fontSize: 18, fontWeight: '900', letterSpacing: 1.5},
  brandAccent: {color: '#c9363f'},
  version: {color: '#777777', fontSize: 11, marginTop: 5},
});
