import { Text, View, StyleSheet, ImageBackground, ScrollView } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"

const week = [42, 68, 50, 86, 62, 94, 74];

export default function ProgressScreen(){
    return(
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
                <Text style={styles.eyebrow}>RESUMEN SEMANAL</Text>
                <Text style={styles.title}>Tu progreso</Text>
                <Text style={styles.subtitle}>Cada sesión te acerca a tu mejor versión.</Text>

                <ImageBackground source={require('../../assets/gym-progress-hero.png')} style={styles.hero} imageStyle={styles.heroImage}>
                    <View style={styles.heroOverlay}>
                        <Text style={styles.heroLabel}>ENTRENAMIENTOS</Text>
                        <Text style={styles.heroNumber}>12</Text>
                        <Text style={styles.heroCaption}>+3 este mes</Text>
                    </View>
                </ImageBackground>

                <View style={styles.statsRow}>
                    <View style={styles.statCard}>
                        <Ionicons name="time-outline" size={22} color="#c9363f" />
                        <Text style={styles.statValue}>8h 40m</Text>
                        <Text style={styles.statLabel}>Tiempo total</Text>
                    </View>
                    <View style={styles.statCard}>
                        <Ionicons name="flame-outline" size={22} color="#c9363f" />
                        <Text style={styles.statValue}>3.240</Text>
                        <Text style={styles.statLabel}>Calorías</Text>
                    </View>
                </View>

                <View style={styles.chartCard}>
                    <View style={styles.chartHeader}>
                        <View>
                            <Text style={styles.sectionTitle}>Actividad</Text>
                            <Text style={styles.chartCaption}>Últimos 7 días</Text>
                        </View>
                        <View style={styles.changeBadge}>
                            <Ionicons name="trending-up" size={14} color="#ffffff" />
                            <Text style={styles.changeText}>18%</Text>
                        </View>
                    </View>
                    <View style={styles.chart}>
                        {week.map((height, index) => (
                            <View style={styles.barColumn} key={index}>
                                <View style={[styles.bar, {height}]} />
                                <Text style={styles.day}>{['L','M','X','J','V','S','D'][index]}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                <View style={styles.goalCard}>
                    <View style={styles.goalIcon}><Ionicons name="trophy-outline" size={24} color="#ffffff" /></View>
                    <View style={styles.goalCopy}>
                        <Text style={styles.goalTitle}>Meta semanal</Text>
                        <Text style={styles.goalText}>4 de 5 entrenamientos completados</Text>
                    </View>
                    <Text style={styles.goalPercent}>80%</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    safeArea: {flex: 1, backgroundColor: '#f7f7f7'},
    container: {paddingHorizontal: 20, paddingTop: 18, paddingBottom: 30},
    eyebrow: {color: '#c9363f', fontSize: 12, fontWeight: '800', letterSpacing: 2, marginBottom: 4},
    title: {fontSize: 30, fontWeight: '800', color: '#111111', letterSpacing: -0.8},
    subtitle: {fontSize: 14, color: '#666666', marginTop: 7, marginBottom: 20},
    hero: {height: 190, marginBottom: 14},
    heroImage: {borderRadius: 22},
    heroOverlay: {flex: 1, justifyContent: 'flex-end', padding: 18, borderRadius: 22, backgroundColor: 'rgba(0,0,0,0.32)'},
    heroLabel: {color: '#d1d1d1', fontSize: 10, fontWeight: '800', letterSpacing: 1.5},
    heroNumber: {color: '#ffffff', fontSize: 40, fontWeight: '900', lineHeight: 45},
    heroCaption: {color: '#e2666d', fontSize: 12, fontWeight: '700'},
    statsRow: {flexDirection: 'row', gap: 12, marginBottom: 14},
    statCard: {flex: 1, backgroundColor: '#ffffff', borderWidth: 1, borderColor: '#e5e5e5', borderRadius: 18, padding: 16},
    statValue: {color: '#111111', fontSize: 19, fontWeight: '800', marginTop: 12},
    statLabel: {color: '#666666', fontSize: 12, marginTop: 3},
    chartCard: {backgroundColor: '#ffffff', borderWidth: 1, borderColor: '#e5e5e5', borderRadius: 20, padding: 18, marginBottom: 14},
    chartHeader: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'},
    sectionTitle: {color: '#111111', fontSize: 18, fontWeight: '800'},
    chartCaption: {color: '#666666', fontSize: 12, marginTop: 3},
    changeBadge: {flexDirection: 'row', gap: 4, backgroundColor: '#65151a', borderRadius: 14, paddingHorizontal: 9, paddingVertical: 6},
    changeText: {color: '#ffffff', fontSize: 11, fontWeight: '800'},
    chart: {height: 125, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', paddingTop: 18},
    barColumn: {alignItems: 'center', justifyContent: 'flex-end', height: '100%'},
    bar: {width: 18, borderRadius: 9, backgroundColor: '#8f1d24'},
    day: {color: '#666666', fontSize: 10, marginTop: 7},
    goalCard: {flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff3f3', borderWidth: 1, borderColor: '#e6c5c7', borderRadius: 18, padding: 15},
    goalIcon: {width: 44, height: 44, borderRadius: 14, backgroundColor: '#8f1d24', alignItems: 'center', justifyContent: 'center'},
    goalCopy: {flex: 1, marginLeft: 12},
    goalTitle: {color: '#111111', fontSize: 15, fontWeight: '800'},
    goalText: {color: '#765d5f', fontSize: 11, marginTop: 3},
    goalPercent: {color: '#111111', fontSize: 18, fontWeight: '900'},
});
