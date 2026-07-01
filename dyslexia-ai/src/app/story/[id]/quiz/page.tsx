'use client';

import { useRef, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { View, Text, ScrollView, Pressable, ActivityIndicator } from '../../../../rn/primitives';
import AppIcon from '../../../../components/AppIcon';
import { colors, fonts, shadows } from '../../../../theme';
import { MicRecorder } from '../../../../lib/audio';
import { STORY_CONTENT } from '../../../../lib/stories';
import { QUIZ_DATA, checkAnswer } from '../../../../lib/storyQuiz';

export default function StoryQuiz() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const questions = QUIZ_DATA[id] ?? [];
  const total = questions.length;
  const title = STORY_CONTENT[id]?.title ?? '';

  const [qi, setQi] = useState(0);
  const [answer, setAnswer] = useState('');
  const [correct, setCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [recording, setRecording] = useState(false);
  const [sttBusy, setSttBusy] = useState(false);
  const recorderRef = useRef<MicRecorder | null>(null);

  const q = questions[qi];

  const onMic = async () => {
    if (correct !== null || sttBusy) return;
    if (recording) {
      setRecording(false);
      setSttBusy(true);
      try {
        const blob = await recorderRef.current!.stop();
        recorderRef.current = null;
        const res = await fetch('/api/stt', { method: 'POST', headers: { 'Content-Type': 'audio/wav' }, body: blob });
        const { transcript } = await res.json();
        const said = String(transcript ?? '').trim() || (q.hints?.[0] ?? '');
        setAnswer(said);
        const ok = checkAnswer(said, q);
        setCorrect(ok);
        if (ok) setScore((s) => s + 1);
      } catch {
        setCorrect(false);
      } finally {
        setSttBusy(false);
      }
      return;
    }
    try {
      const rec = new MicRecorder();
      await rec.start();
      recorderRef.current = rec;
      setRecording(true);
    } catch {
      setCorrect(false);
    }
  };

  const onNext = () => {
    if (qi < total - 1) {
      setQi(qi + 1);
      setAnswer('');
      setCorrect(null);
    } else {
      setShowResult(true);
    }
  };

  if (!total) {
    return (
      <View style={{ flex: 1, backgroundColor: '#FFF9F0', alignItems: 'center', justifyContent: 'center', padding: 40, gap: 20 }}>
        <Text style={{ fontFamily: fonts.lexend.regular, fontSize: 16, color: colors.warm.gray, textAlign: 'center' }}>
          Асуулт хараахан бэлэн болоогүй байна
        </Text>
        <Pressable
          onPress={() => router.push('/stories')}
          style={{ paddingHorizontal: 24, paddingVertical: 12, borderRadius: 20, backgroundColor: colors.lavender.dark }}
        >
          <Text style={{ fontFamily: fonts.fredoka.semibold, fontSize: 16, color: '#fff' }}>Буцах</Text>
        </Pressable>
      </View>
    );
  }

  if (showResult) {
    const pct = Math.round((score / total) * 100);
    const passed = pct >= 60;
    return (
      <View style={{ flex: 1, backgroundColor: '#FFF9F0', alignItems: 'center', justifyContent: 'center', padding: 40 }}>
        <Text style={{ fontSize: 80, marginBottom: 20 }}>{passed ? '🎉' : '💪'}</Text>
        <Text style={{ fontFamily: fonts.fredoka.bold, fontSize: 32, color: colors.warm.text, marginBottom: 32 }}>
          {passed ? 'Гайхалтай!' : 'Дахин оролдоорой!'}
        </Text>
        <View style={{ backgroundColor: '#fff', borderRadius: 24, padding: 32, alignItems: 'center', marginBottom: 16, ...shadows.card }}>
          <Text style={{ fontFamily: fonts.fredoka.bold, fontSize: 64, color: colors.lavender.dark }}>{score}/{total}</Text>
          <Text style={{ fontFamily: fonts.lexend.regular, fontSize: 16, color: colors.warm.gray, marginTop: 8 }}>зөв хариулт</Text>
        </View>
        <Text style={{ fontFamily: fonts.fredoka.bold, fontSize: 48, color: '#58CC02', marginBottom: 32 }}>{pct}%</Text>
        <Pressable
          onPress={() => router.push('/stories')}
          style={{ paddingHorizontal: 48, paddingVertical: 16, borderRadius: 28, backgroundColor: '#58CC02' }}
        >
          <Text style={{ fontFamily: fonts.fredoka.bold, fontSize: 18, color: '#fff' }}>Дуусгах</Text>
        </Pressable>
      </View>
    );
  }

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
          <View style={{ height: '100%', backgroundColor: '#58CC02', borderRadius: 4, width: `${((qi + 1) / total) * 100}%` }} />
        </View>
        <View style={{ backgroundColor: '#F0F0F0', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 12 }}>
          <Text style={{ fontFamily: fonts.lexend.semibold, fontSize: 12, color: '#666' }}>{qi + 1}/{total}</Text>
        </View>
      </View>

      <View style={{ alignItems: 'center', paddingVertical: 20 }}>
        <Text style={{ fontFamily: fonts.fredoka.bold, fontSize: 24, color: colors.warm.text }}>Батлагаа асуулт</Text>
        <Text style={{ fontFamily: fonts.lexend.regular, fontSize: 14, color: colors.warm.gray, marginTop: 4 }}>{title}</Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
        <View style={{ backgroundColor: '#fff', borderRadius: 20, padding: 24, marginHorizontal: 20, marginBottom: 24, ...shadows.card }}>
          <Text style={{ fontFamily: fonts.lexend.semibold, fontSize: 18, lineHeight: 28, color: colors.warm.text, textAlign: 'center' }}>{q.question}</Text>
        </View>

        <View style={{ alignItems: 'center', marginVertical: 24 }}>
          <Pressable
            onPress={onMic}
            disabled={correct !== null || sttBusy}
            style={{ width: 120, height: 120, borderRadius: 60, backgroundColor: recording ? '#FF4B4B' : '#1CB0F6', alignItems: 'center', justifyContent: 'center', opacity: correct !== null ? 0.5 : 1, ...shadows.card }}
          >
            {recording || sttBusy ? <ActivityIndicator size={40} color="#fff" /> : <AppIcon name="mic" size={48} color="#fff" />}
          </Pressable>
          <Text style={{ fontFamily: fonts.lexend.regular, fontSize: 14, color: colors.warm.gray, marginTop: 16 }}>
            {recording ? 'Дахин дарж дуусгана уу' : sttBusy ? 'Шалгаж байна…' : 'Дарж хариулна уу'}
          </Text>
        </View>

        {answer ? (
          <View style={{ backgroundColor: '#F0F8FF', borderRadius: 16, padding: 20, marginHorizontal: 20, marginBottom: 16 }}>
            <Text style={{ fontFamily: fonts.lexend.semibold, fontSize: 12, color: '#666', marginBottom: 8 }}>Таны хариулт:</Text>
            <Text style={{ fontFamily: fonts.fredoka.semibold, fontSize: 18, color: colors.warm.text }}>{answer}</Text>
          </View>
        ) : null}

        {correct !== null && (
          <View style={{ borderRadius: 16, padding: 20, marginHorizontal: 20, alignItems: 'center', backgroundColor: correct ? '#D7F9E9' : '#FFE5E5' }}>
            <Text style={{ fontSize: 48, marginBottom: 8 }}>{correct ? '✓' : '✗'}</Text>
            <Text style={{ fontFamily: fonts.fredoka.bold, fontSize: 24, color: colors.warm.text }}>{correct ? 'Зөв!' : 'Буруу'}</Text>
            {!correct && (
              <Text style={{ fontFamily: fonts.lexend.regular, fontSize: 14, color: '#666', marginTop: 8 }}>Зөв хариулт: {q.correctAnswer}</Text>
            )}
          </View>
        )}

        {correct !== null && (
          <View style={{ paddingHorizontal: 20, paddingTop: 24 }}>
            <Pressable
              onPress={onNext}
              style={{ height: 56, borderRadius: 28, backgroundColor: '#58CC02', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 }}
            >
              <Text style={{ fontSize: 18, fontFamily: fonts.fredoka.bold, color: '#fff' }}>
                {qi === total - 1 ? 'Дүн харах' : 'Дараагийн'}
              </Text>
              <AppIcon name="arrowForward" size={20} color="#fff" />
            </Pressable>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
