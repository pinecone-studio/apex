import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import StatusBarRow from '../components/StatusBarRow';
import LexiBot from '../components/LexiBot';
import { colors, fonts, shadows } from '../theme';
import { useChild } from '../hooks/useChild';

const cards = [
  { to: 'Reading', bg: colors.sand.lightest, icon: '📖', title: 'Унших эхлэх', sub: '12-оос 6-р хичээл' },
  { to: 'Stories', bg: colors.sage.light, icon: '🎧', title: 'Сонсож сур', sub: 'Шинэ дуу' },
  { to: 'Games', bg: colors.peach.lightest, icon: '🎮', title: 'Сургалтын тоглоом', sub: '4 хөгжилтэй тоглоом' },
  { to: 'Stories', bg: colors.slate.light, icon: '📚', title: 'Үлгэрийн ертөнц', sub: '12 үлгэр' },
  { to: 'DyslexiaTest', bg: colors.lavender.lightest, icon: '🧠', title: 'Дислекси шалгалт', sub: '5 мин · 4-7 нас' },
];

export default function HomeScreen({ navigation }: { navigation: any }) {
  const { child } = useChild();

  const unlockedBadges = child?.badges.filter((b) => b.unlocked).length ?? 0;
  const stats: [string, string, string][] = [
    ['⭐', String(child?.stars ?? 0), 'Од'],
    ['🔥', String(child?.streak ?? 0), 'Тасралтгүй өдөр'],
    ['🏅', String(unlockedBadges), 'Тэмдэг'],
  ];

  return (
    <View style={styles.root}>
      <StatusBarRow />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Greeting */}
        <View style={styles.greetRow}>
          <View>
            <Text style={styles.greetHi}>Сайн уу,</Text>
            <Text style={styles.greetName}>{child?.name ?? '...'}! 👋</Text>
          </View>
          <LinearGradient colors={['#D8C4B0', '#C4A08C']} style={styles.avatar}>
            <Text style={{ fontSize: 30 }}>{child?.avatar ?? '🦊'}</Text>
          </LinearGradient>
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          {stats.map(([emoji, val, label]) => (
            <View key={label} style={styles.statCard}>
              <Text style={{ fontSize: 20 }}>{emoji}</Text>
              <Text style={styles.statVal}>{val}</Text>
              <Text style={styles.statLabel}>{label}</Text>
            </View>
          ))}
        </View>

        {/* AI Buddy banner */}
        <LinearGradient
          colors={['#8B7AB8', '#A090C8']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.banner}
        >
          <View style={{ flex: 1 }}>
            <Text style={styles.bannerTitle}>AI Унших Найз</Text>
            <Text style={styles.bannerSub}>Лекситэй чанга унш!</Text>
            <Pressable style={styles.bannerBtn} onPress={() => navigation.navigate('Practice')}>
              <Text style={styles.bannerBtnText}>Эхлэх →</Text>
            </Pressable>
          </View>
          <LexiBot size="sm" animate="float" />
        </LinearGradient>

        {/* Quick access grid */}
        <View style={styles.grid}>
          {cards.map(({ to, icon, title, sub }, i) => (
            <Pressable key={i} style={styles.gridCard} onPress={() => navigation.navigate(to)}>
              <View style={[styles.gridIcon, { backgroundColor: colors.warm.beige }]}>
                <Text style={{ fontSize: 22 }}>{icon}</Text>
              </View>
              <Text style={styles.gridTitle}>{title}</Text>
              <Text style={styles.gridSub}>{sub}</Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.warm.beige },
  content: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 24 },
  greetRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  greetHi: { fontFamily: fonts.lexend.regular, fontSize: 16, color: colors.warm.gray },
  greetName: { fontFamily: fonts.fredoka.bold, fontSize: 30, color: colors.warm.text },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.peach,
  },
  statsRow: { flexDirection: 'row', gap: 10, marginTop: 20 },
  statCard: {
    flex: 1,
    backgroundColor: colors.warm.card,
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
    ...shadows.card,
  },
  statVal: { fontFamily: fonts.fredoka.bold, fontSize: 20, color: colors.warm.text, marginTop: 2 },
  statLabel: { fontFamily: fonts.lexend.regular, fontSize: 11, color: colors.warm.gray },
  banner: {
    marginTop: 20,
    borderRadius: 24,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    ...shadows.lavender,
  },
  bannerTitle: { fontFamily: fonts.fredoka.semibold, fontSize: 18, color: '#fff' },
  bannerSub: { fontFamily: fonts.lexend.regular, fontSize: 14, color: 'rgba(255,255,255,0.8)', marginTop: 4 },
  bannerBtn: {
    alignSelf: 'flex-start',
    marginTop: 10,
    backgroundColor: colors.sand.DEFAULT,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
  },
  bannerBtnText: { fontFamily: fonts.fredoka.semibold, fontSize: 14, color: colors.warm.text },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: 16 },
  gridCard: {
    width: '48%',
    backgroundColor: colors.warm.card,
    borderRadius: 24,
    padding: 16,
    marginBottom: 12,
    ...shadows.card,
  },
  gridIcon: {
    width: 44,
    height: 44,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gridTitle: { fontFamily: fonts.fredoka.semibold, fontSize: 16, color: colors.warm.text, marginTop: 12 },
  gridSub: { fontFamily: fonts.lexend.regular, fontSize: 11, color: colors.warm.gray, marginTop: 2 },
});
