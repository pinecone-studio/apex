import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth, useUser } from '@clerk/clerk-expo';
import StatusBarRow from '../components/StatusBarRow';
import { colors, fonts, shadows } from '../theme';
import { useChild } from '../hooks/useChild';

const CUSTOMIZE = [
  { e: '💇', l: 'Үс' },
  { e: '👕', l: 'Хувцас' },
  { e: '🎩', l: 'Нэмэлт' },
  { e: '🏞️', l: 'Дэвсгэр' },
];
const SWATCHES = ['#E8D8C3', '#D8A48F', '#B8C9B0', '#A8C4CE', '#8B7AB8'];
const ACH_BG = ['#F0E8D8', '#F5DDD5', '#E8E3F5', '#D8E8D4'];

export default function ProfileScreen() {
  const [active, setActive] = useState(0);
  const { signOut } = useAuth();
  const { user } = useUser();
  const { child } = useChild();
  return (
    <View style={styles.root}>
      <StatusBarRow />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Миний профайл 👤</Text>

        {/* Avatar card */}
        <LinearGradient colors={['#6A98B0', '#8B7AB8']} style={styles.avatarCard}>
          <Text style={[styles.deco, { top: 12, left: 20 }]}>⭐</Text>
          <Text style={[styles.deco, { top: 24, right: 24 }]}>✨</Text>
          <View style={styles.avatar}>
            <Text style={{ fontSize: 56 }}>{child?.avatar ?? '🦊'}</Text>
          </View>
          <Text style={styles.name}>{child?.name ?? '...'}</Text>
          <View style={styles.level}>
            <Text style={styles.levelText}>
              {(child?.level ?? 1)}-р түвшин · {child?.title ?? 'Унших аялагч'}
            </Text>
          </View>
        </LinearGradient>

        {/* Customize */}
        <Text style={styles.sectionTitle}>Найзаа тохируул</Text>
        <View style={styles.customizeRow}>
          {CUSTOMIZE.map(({ e, l }) => (
            <View key={l} style={styles.customizeItem}>
              <Text style={{ fontSize: 22 }}>{e}</Text>
              <Text style={styles.customizeLabel}>{l}</Text>
            </View>
          ))}
        </View>

        {/* Swatches */}
        <View style={styles.swatchRow}>
          <Text style={styles.swatchLabel}>Дэвсгэр өнгө</Text>
          {SWATCHES.map((c, i) => (
            <Pressable
              key={c}
              onPress={() => setActive(i)}
              style={[
                styles.swatch,
                { backgroundColor: c },
                active === i && { borderWidth: 3, borderColor: colors.warm.card },
              ]}
            />
          ))}
        </View>

        {/* Achievements */}
        <Text style={styles.sectionTitle}>Миний амжилтууд</Text>
        <View style={styles.achRow}>
          {(child?.badges ?? []).slice(0, 4).map((b, i) => (
            <View
              key={b.id}
              style={[styles.achItem, { backgroundColor: ACH_BG[i % ACH_BG.length], opacity: b.unlocked ? 1 : 0.35 }]}
            >
              <Text style={{ fontSize: 22 }}>{b.emoji}</Text>
            </View>
          ))}
          {(child?.badges?.length ?? 0) > 4 ? (
            <View style={styles.achMore}>
              <Text style={styles.achMoreText}>+{(child?.badges.length ?? 0) - 4}</Text>
            </View>
          ) : null}
        </View>

        {/* Account */}
        {user?.username ? (
          <Text style={styles.account}>Нэвтэрсэн: @{user.username}</Text>
        ) : null}
        <Pressable style={styles.signOut} onPress={() => signOut()}>
          <Text style={styles.signOutText}>Гарах</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.warm.beige },
  content: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 24 },
  title: { fontFamily: fonts.fredoka.bold, fontSize: 24, color: colors.warm.text },
  avatarCard: { marginTop: 16, borderRadius: 24, padding: 24, alignItems: 'center', ...shadows.lavender },
  deco: { position: 'absolute', fontSize: 16, opacity: 0.7 },
  avatar: {
    width: 112,
    height: 112,
    borderRadius: 56,
    backgroundColor: colors.warm.card,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.card,
  },
  name: { fontFamily: fonts.fredoka.bold, fontSize: 20, color: '#fff', marginTop: 12 },
  level: { backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12, marginTop: 4 },
  levelText: { fontFamily: fonts.lexend.semibold, fontSize: 12, color: '#fff' },
  sectionTitle: { fontFamily: fonts.fredoka.semibold, fontSize: 16, color: colors.warm.text, marginTop: 20 },
  account: { fontFamily: fonts.lexend.regular, fontSize: 13, color: colors.warm.gray, textAlign: 'center', marginTop: 24 },
  signOut: {
    marginTop: 12,
    backgroundColor: colors.warm.card,
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.peach.light,
  },
  signOutText: { fontFamily: fonts.fredoka.semibold, fontSize: 15, color: colors.peach.dark },
  customizeRow: { flexDirection: 'row', gap: 10, marginTop: 12 },
  customizeItem: { flex: 1, backgroundColor: colors.warm.card, borderRadius: 16, paddingVertical: 14, alignItems: 'center', ...shadows.card },
  customizeLabel: { fontFamily: fonts.lexend.semibold, fontSize: 10, color: colors.warm.text, marginTop: 4 },
  swatchRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 16 },
  swatchLabel: { fontFamily: fonts.lexend.regular, fontSize: 12, color: colors.warm.gray },
  swatch: { width: 32, height: 32, borderRadius: 16 },
  achRow: { flexDirection: 'row', gap: 12, marginTop: 12 },
  achItem: { width: 56, height: 56, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  achMore: {
    flex: 1,
    height: 56,
    borderRadius: 16,
    backgroundColor: colors.warm.card,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.card,
  },
  achMoreText: { fontFamily: fonts.fredoka.semibold, fontSize: 14, color: colors.lavender.dark },
});
