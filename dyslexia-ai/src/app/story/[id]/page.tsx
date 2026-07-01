'use client';

import { useEffect, useRef, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { View, Text, ScrollView, Pressable, Slider } from '../../../rn/primitives';
import AppIcon from '../../../components/AppIcon';
import { colors, fonts, shadows } from '../../../theme';
import { STORY_CONTENT } from '../../../lib/stories';

export default function StoryReader() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const story = STORY_CONTENT[id] ?? STORY_CONTENT['aldar-huu'];
  const totalPages = story.pages.length;

  const [page, setPage] = useState(0);
  const [wordIndex, setWordIndex] = useState(-1);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const playTokenRef = useRef(0);
  const speedRef = useRef(speed);
  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  const words = story.pages[page].split(/\s+/);

  const stop = () => {
    playTokenRef.current++;
    audioRef.current?.pause();
    audioRef.current = null;
    setPlaying(false);
    setWordIndex(-1);
  };

  // Хуудас солигдоход тоглуулалтыг зогсооно.
  useEffect(() => stop, [page]);

  const play = async () => {
    const token = ++playTokenRef.current;
    setPlaying(true);
    try {
      const res = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: story.pages[page] }),
      });
      if (!res.ok) throw new Error('tts');
      if (token !== playTokenRef.current) return;
      const url = URL.createObjectURL(await res.blob());
      const audio = new Audio(url);
      audio.playbackRate = speedRef.current;
      audioRef.current = audio;
      audio.onended = () => {
        if (token === playTokenRef.current) {
          setPlaying(false);
          setWordIndex(-1);
        }
        URL.revokeObjectURL(url);
      };
      await audio.play();

      for (let i = 0; i < words.length; i++) {
        if (token !== playTokenRef.current) return;
        setWordIndex(i);
        await new Promise((r) => setTimeout(r, 380 / speedRef.current));
      }
    } catch {
      if (token === playTokenRef.current) {
        setPlaying(false);
        setWordIndex(-1);
      }
    }
  };

  const next = () => {
    stop();
    if (page < totalPages - 1) setPage(page + 1);
    else router.push(`/story/${id}/quiz`);
  };

  const progress = ((page + 1) / totalPages) * 100;

  return (
    <View style={{ flex: 1, backgroundColor: '#FFF9F0' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingTop: 16, gap: 12 }}>
        <Pressable
          onPress={() => router.push('/stories')}
          style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: '#F0F0F0', alignItems: 'center', justifyContent: 'center' }}
        >
          <Text style={{ fontSize: 20, color: '#999', fontWeight: '600' }}>✕</Text>
        </Pressable>
        <View style={{ flex: 1, height: 8, backgroundColor: '#E5E5E5', borderRadius: 4, overflow: 'hidden' }}>
          <View style={{ height: '100%', backgroundColor: '#58CC02', borderRadius: 4, width: `${progress}%` }} />
        </View>
        <View style={{ backgroundColor: '#F0F0F0', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 12 }}>
          <Text style={{ fontFamily: fonts.lexend.semibold, fontSize: 12, color: '#666' }}>{page + 1}/{totalPages}</Text>
        </View>
      </View>

      <View style={{ alignItems: 'center', paddingVertical: 24 }}>
        <Text style={{ fontSize: 64, marginBottom: 8 }}>{story.emoji}</Text>
        <Text style={{ fontFamily: fonts.fredoka.bold, fontSize: 28, color: colors.warm.text }}>{story.title}</Text>
      </View>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 24 }}>
        <View style={{ backgroundColor: '#fff', borderRadius: 24, padding: 28, position: 'relative', ...shadows.card }}>
          <Pressable
            onPress={() => (playing ? stop() : play())}
            style={{ position: 'absolute', top: 16, right: 16, width: 48, height: 48, borderRadius: 24, backgroundColor: '#58CC02', alignItems: 'center', justifyContent: 'center', zIndex: 10, ...shadows.card }}
          >
            <AppIcon name={playing ? 'pause' : 'play'} size={24} color="#fff" />
          </Pressable>

          <Text style={{ fontFamily: fonts.lexend.regular, fontSize: 18, lineHeight: 32, color: colors.warm.text, paddingRight: 60 }}>
            {words.map((w, i) => (
              <Text
                key={`${i}-${w}`}
                style={
                  wordIndex === i
                    ? { backgroundColor: '#FFD54F', color: '#000', fontFamily: fonts.lexend.bold, borderRadius: 8, paddingHorizontal: 6, paddingVertical: 2 }
                    : { color: colors.warm.text }
                }
              >
                {w}{' '}
              </Text>
            ))}
          </Text>
        </View>

        <View style={{ backgroundColor: '#fff', borderRadius: 20, padding: 20, paddingVertical: 16, marginTop: 16, flexDirection: 'row', alignItems: 'center', gap: 12, ...shadows.card }}>
          <Text style={{ fontFamily: fonts.lexend.regular, fontSize: 14, color: colors.warm.gray, width: 45 }}>Хурд</Text>
          <Slider
            style={{ flex: 1, height: 40 }}
            minimumValue={0.5}
            maximumValue={1.5}
            step={0.1}
            value={speed}
            onValueChange={setSpeed}
            minimumTrackTintColor={colors.lavender.dark}
            maximumTrackTintColor="#E0D8CC"
          />
          <Text style={{ fontFamily: fonts.fredoka.semibold, fontSize: 16, color: colors.lavender.dark, width: 40, textAlign: 'right' }}>{speed.toFixed(1)}×</Text>
        </View>
      </ScrollView>

      <View style={{ flexDirection: 'row', paddingHorizontal: 20, paddingVertical: 24, gap: 12 }}>
        {page > 0 && (
          <Pressable
            onPress={() => {
              stop();
              setPage(page - 1);
            }}
            style={{ width: 56, height: 56, borderRadius: 28, backgroundColor: '#F0F0F0', alignItems: 'center', justifyContent: 'center' }}
          >
            <AppIcon name="arrowBack" size={20} color="#666" />
          </Pressable>
        )}
        <Pressable
          onPress={next}
          style={{ flex: 1, height: 56, borderRadius: 28, backgroundColor: '#58CC02', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, ...(page === 0 ? { marginLeft: 'auto' } : {}) }}
        >
          <Text style={{ fontSize: 18, fontFamily: fonts.fredoka.bold, color: '#fff' }}>
            {page === totalPages - 1 ? 'Дуусгах' : 'Дараах'}
          </Text>
          {page !== totalPages - 1 && <AppIcon name="arrowForward" size={20} color="#fff" />}
        </Pressable>
      </View>
    </View>
  );
}
