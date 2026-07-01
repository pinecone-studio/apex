'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { View, Text, ScrollView, Pressable } from '../../../rn/primitives';
import { LinearGradient } from '../../../rn/LinearGradient';
import StatusBarRow from '../../../components/StatusBarRow';
import AppIcon from '../../../components/AppIcon';
import { colors, fonts, shadows } from '../../../theme';
import { useChild } from '../../../hooks/useChild';
import { api } from '../../../lib/api';
import { CATS, catFilter, storyPrice, storyById, type StoryMeta } from '../../../lib/stories';

export default function StoriesScreen() {
  const router = useRouter();
  const { child, refresh } = useChild();
  const [cat, setCat] = useState(0);
  const [busy, setBusy] = useState<string | null>(null);
  const [msg, setMsg] = useState('');
  const stories = catFilter(cat);

  const isOpen = (m: StoryMeta) => storyPrice(m) === 0 || (child?.unlockedStories ?? []).includes(m.id);

  const open = async (m: StoryMeta) => {
    if (isOpen(m)) {
      router.push(`/story/${m.id}`);
      return;
    }
    const price = storyPrice(m);
    if (!child?.clerkId) return;
    if ((child.coins ?? 0) < price) {
      setMsg(`«${m.title}» нээхэд ${price} зоос хэрэгтэй`);
      return;
    }
    setBusy(m.id);
    setMsg('');
    try {
      await api.unlockStory(child.clerkId, m.id);
      await refresh();
      router.push(`/story/${m.id}`);
    } catch (e) {
      const detail = e instanceof Error ? e.message : '';
      setMsg(detail.includes('402') ? 'Зоос хүрэлцэхгүй байна' : `Худалдан авалт амжилтгүй: ${detail}`);
    } finally {
      setBusy(null);
    }
  };

  const featured = storyById('aldar-huu')!;

  return (
    <View style={{ flex: 1, backgroundColor: colors.warm.beige }}>
      <StatusBarRow />
      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 8, paddingBottom: 24 }} showsVerticalScrollIndicator={false}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <Text style={{ fontFamily: fonts.fredoka.bold, fontSize: 24, color: colors.warm.text }}>Үлгэрийн ертөнц</Text>
            <AppIcon name="sparkles" size={20} color="#E8B04A" />
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: colors.warm.card, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 14, ...shadows.cardSm }}>
            <AppIcon name="coin" size={16} color="#E0A82E" />
            <Text style={{ fontFamily: fonts.fredoka.bold, fontSize: 14, color: colors.warm.text }}>{child?.coins ?? 0}</Text>
          </View>
        </View>
        <Text style={{ fontFamily: fonts.lexend.regular, fontSize: 14, color: colors.warm.gray }}>Уншихаар шидэт үлгэр сонго</Text>

        {msg ? (
          <View style={{ marginTop: 12, backgroundColor: '#FFE5E5', borderRadius: 12, padding: 12 }}>
            <Text style={{ fontFamily: fonts.lexend.regular, fontSize: 13, color: '#C4463A' }}>{msg}</Text>
          </View>
        ) : null}

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8, marginTop: 16, paddingBottom: 4 }}>
          {CATS.map((c, i) => (
            <Pressable
              key={c}
              onPress={() => setCat(i)}
              style={{ paddingHorizontal: 14, paddingVertical: 8, borderRadius: 16, whiteSpace: 'nowrap', backgroundColor: cat === i ? colors.lavender.dark : colors.warm.card, ...(cat === i ? {} : shadows.cardSm) }}
            >
              <Text style={{ fontFamily: fonts.fredoka.semibold, fontSize: 12, color: cat === i ? '#fff' : colors.warm.gray }}>{c}</Text>
            </Pressable>
          ))}
        </ScrollView>

        <LinearGradient colors={['#8B7AB8', '#6A98B0']} style={{ marginTop: 16, borderRadius: 24, padding: 20, ...shadows.lavender }}>
          <View style={{ position: 'absolute', top: 12, right: 16, opacity: 0.7 }}>
            <AppIcon name="sparkles" size={18} color="#FFF0B8" />
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
            <View style={{ width: 80, height: 80, borderRadius: 16, backgroundColor: colors.warm.card, alignItems: 'center', justifyContent: 'center', ...shadows.card }}>
              <Text style={{ fontSize: 48 }}>🐴</Text>
            </View>
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, alignSelf: 'flex-start', backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 }}>
                <AppIcon name="star" size={11} color="#F5D27A" />
                <Text style={{ fontFamily: fonts.lexend.semibold, fontSize: 10, color: '#fff' }}>Онцлох</Text>
              </View>
              <Text style={{ fontFamily: fonts.fredoka.bold, fontSize: 20, color: '#fff', marginTop: 8 }}>Алдар хөө</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 4 }}>
                <AppIcon name="headset" size={13} color="rgba(255,255,255,0.8)" />
                <Text style={{ fontFamily: fonts.lexend.regular, fontSize: 12, color: 'rgba(255,255,255,0.8)' }}>Монгол ардын үлгэр · 8 мин</Text>
              </View>
            </View>
          </View>
          <Pressable
            style={{ marginTop: 16, backgroundColor: colors.sand.DEFAULT, paddingVertical: 12, borderRadius: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, opacity: busy === featured.id ? 0.6 : 1 }}
            onPress={() => open(featured)}
          >
            <AppIcon name={isOpen(featured) ? 'play' : 'coin'} size={16} color={colors.warm.text} />
            <Text style={{ fontFamily: fonts.fredoka.semibold, fontSize: 16, color: colors.warm.text }}>
              {isOpen(featured) ? 'Хамтдаа унших' : `${storyPrice(featured)} зоосоор нээх`}
            </Text>
          </Pressable>
        </LinearGradient>

        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 20 }}>
          <Text style={{ fontFamily: fonts.fredoka.semibold, fontSize: 16, color: colors.warm.text }}>Бусад үлгэр</Text>
          <Text style={{ fontFamily: fonts.lexend.regular, fontSize: 12, color: colors.lavender.dark }}>Бүгдийг үзэх</Text>
        </View>
        <View style={{ gap: 10, marginTop: 12 }}>
          {stories.map((m) => {
            const opened = isOpen(m);
            const price = storyPrice(m);
            return (
              <Pressable
                key={m.id}
                style={{ backgroundColor: colors.warm.card, borderRadius: 16, padding: 12, flexDirection: 'row', alignItems: 'center', gap: 12, opacity: busy === m.id ? 0.6 : 1, ...shadows.card }}
                onPress={() => open(m)}
              >
                <View style={{ width: 56, height: 56, borderRadius: 16, backgroundColor: m.bg, alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ fontSize: 28 }}>{m.emoji}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontFamily: fonts.fredoka.semibold, fontSize: 16, color: colors.warm.text }}>{m.title}</Text>
                  <Text style={{ fontFamily: fonts.lexend.regular, fontSize: 11, color: colors.warm.gray }}>{m.level}</Text>
                </View>
                {opened ? (
                  <AppIcon name="headset" size={20} color={colors.lavender.dark} />
                ) : (
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: colors.sand.lightest, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 12 }}>
                    <AppIcon name="coin" size={14} color="#E0A82E" />
                    <Text style={{ fontFamily: fonts.fredoka.bold, fontSize: 13, color: colors.warm.text }}>{price}</Text>
                  </View>
                )}
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}
