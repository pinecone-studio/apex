export type Question = { question: string; correctAnswer: string; hints?: string[] };

export const QUIZ_DATA: Record<string, Question[]> = {
  'aldar-huu': [
    { question: 'Алдар хөө юугаараа баяжсан бэ?', correctAnswer: 'ухаан', hints: ['ухаан', 'мэргэн ухаан', 'ухаантай'] },
    { question: 'Баян хүн юу асуусан бэ?', correctAnswer: 'дэлхийд хамгийн хурдан юу вэ', hints: ['хурдан', 'бодол'] },
    { question: 'Дэлхийд хамгийн чухал юу вэ гэж Алдар хариулсан бэ?', correctAnswer: 'цаг хугацаа', hints: ['цаг', 'хугацаа', 'цаг хугацаа'] },
  ],
  'suult-uneg': [
    { question: 'Үнэг юу идэхийг хүссэн бэ?', correctAnswer: 'үзэм', hints: ['үзэм'] },
    { question: 'Үнэг яагаад үзэм авч чадаагүй вэ?', correctAnswer: 'хэтэрхий өндөрт байсан', hints: ['өндөр', 'хүрэхгүй'] },
    { question: 'Энэ үлгэрээс юу сурах вэ?', correctAnswer: 'олж авч чадахгүй зүйлээ гүтгэдэг', hints: ['гүтгэх', 'чадахгүй'] },
  ],
  'hilenset-chono': [
    { question: 'Чоно юу өмссөн бэ?', correctAnswer: 'хонины арьс', hints: ['хонь', 'арьс', 'хонины арьс'] },
    { question: 'Чоно яагаад илчлэгдсэн бэ?', correctAnswer: 'уулсан', hints: ['уулах', 'дуу'] },
    { question: 'Энэ үлгэр юу заах вэ?', correctAnswer: 'худлын төрх илчлэгддэг', hints: ['худал', 'илчлэгдэх'] },
  ],
  'yast-melhii': [
    { question: 'Туулай юу хийсэн бэ?', correctAnswer: 'унтсан', hints: ['унтах', 'амрах'] },
    { question: 'Яст мэлхий яаж түрүүлсэн бэ?', correctAnswer: 'зогсолтгүй алхсан', hints: ['алхах', 'зогсохгүй'] },
    { question: 'Энэ үлгэрээс юу сурах вэ?', correctAnswer: 'тууштай хичээл зүтгэл чухал', hints: ['тууштай', 'хичээх'] },
  ],
  'arslan-hulgana': [
    { question: 'Хулгана арсланд юу гуйсан бэ?', correctAnswer: 'өршөө', hints: ['өршөөх', 'суллах'] },
    { question: 'Хулгана яаж арсланд тусалсан бэ?', correctAnswer: 'олсыг зүссэн', hints: ['олс', 'зүсэх'] },
    { question: 'Энэ үлгэр юу заах вэ?', correctAnswer: 'бага сайн үйл их утгатай', hints: ['сайн үйл', 'утга'] },
  ],
  'shorgooljiin-uliral': [
    { question: 'Царцаа зундаа юу хийсэн бэ?', correctAnswer: 'дуулж тоглосон', hints: ['дуулах', 'тоглох'] },
    { question: 'Шоргоолж өвлийн юу бэлдсэн бэ?', correctAnswer: 'хоол хүнс', hints: ['хоол', 'хүнс'] },
    { question: 'Энэ үлгэрээс юу сурах вэ?', correctAnswer: 'цаг тухайдаа бэлдэх ухаалаг', hints: ['бэлдэх', 'цаг тухай'] },
  ],
  'erhii-mergen': [
    { question: 'Эрхий Мэргэн ямар агнуур байсан бэ?', correctAnswer: 'хурдан болон нүдээрээ хурц харах', hints: ['хурдан', 'хурц', 'бүргэд'] },
    { question: 'Эрхий Мэргэн барыг яаж зогсоосон бэ?', correctAnswer: 'нум харвасан', hints: ['нум', 'харвах'] },
    { question: 'Ард түмэн түүнийг яагаад Эрхий Мэргэн гэж нэрлэсэн бэ?', correctAnswer: 'барыг зогсоосон', hints: ['бар', 'зогсоох', 'баатар'] },
  ],
  'hohoo-namjil': [
    { question: 'Хөхөө намжил ямар гэрт төрсөн бэ?', correctAnswer: 'баян гэрт', hints: ['баян'] },
    { question: 'Хөхөө намжил юуг авчирсан бэ?', correctAnswer: 'эм', hints: ['эм', 'эмнэлт'] },
    { question: 'Эм хаанаас олдсон бэ?', correctAnswer: 'алс холын уулан дээр', hints: ['уул', 'холын'] },
  ],
  'chonony-olsgolun': [
    { question: 'Чоно яагаад өлссөн байсан бэ?', correctAnswer: 'өвөл хүйтэн байсан', hints: ['өвөл', 'хүйтэн'] },
    { question: 'Нохойн хүзүүнд юу байсан бэ?', correctAnswer: 'гинж', hints: ['гинж', 'уях'] },
    { question: 'Чоно яагаад буцсан бэ?', correctAnswer: 'эрх чөлөөгөө хүссэн', hints: ['эрх чөлөө', 'чөлөө'] },
  ],
  'sarny-gerel': [
    { question: 'Хүүхэд юунаас айж байсан бэ?', correctAnswer: 'харанхуйгаас', hints: ['харанхуй', 'айх'] },
    { question: 'Хэн хүүхдэд тусалсан бэ?', correctAnswer: 'сар', hints: ['сар', 'гэрэл'] },
    { question: 'Хүүхэд яаж айхаа больсон бэ?', correctAnswer: 'сар харж байдгийг мэдсэн', hints: ['сар', 'харах', 'мэдэх'] },
  ],
  'oddyn-nuher': [
    { question: 'Тэнгэрт хэдэн од байсан бэ?', correctAnswer: 'хоёр од нөхөр', hints: ['хоёр', 'нөхөр'] },
    { question: 'Тэднийг юу салгахыг оролдсон бэ?', correctAnswer: 'салхи болон үүл', hints: ['салхи', 'үүл'] },
    { question: 'Энэ үлгэр юуны тухай вэ?', correctAnswer: 'жинхэнэ нөхөрлөл', hints: ['нөхөрлөл', 'найз'] },
  ],
  'shuvuu-shonyn-ger': [
    { question: 'Шувуу юу барихыг хүссэн бэ?', correctAnswer: 'үүр', hints: ['үүр', 'гэр'] },
    { question: 'Шувуу юу цуглуулсан бэ?', correctAnswer: 'салаа өвс', hints: ['салаа', 'өвс'] },
    { question: 'Энэ үлгэрээс юу сурах вэ?', correctAnswer: 'хичээнгүй хөдөлмөр сайхан амралт авчирна', hints: ['хичээл', 'хөдөлмөр', 'амралт'] },
  ],
  'huuhduudiin-od': [
    { question: 'Хүүхэд бүр тэнгэрт юутай вэ?', correctAnswer: 'өөрийн од', hints: ['од'] },
    { question: 'Хүүхэд унтахад од юу хийдэг вэ?', correctAnswer: 'илүү гэрэлтдэг', hints: ['гэрэлтэх', 'гэрэл'] },
    { question: 'Хүүхэд өссөн бүр од юу хийдэг вэ?', correctAnswer: 'томорч гэрэлтдэг', hints: ['томрох', 'гэрэлтэх'] },
  ],
};

export const checkAnswer = (answer: string, q: Question): boolean => {
  const a = answer.toLowerCase().trim();
  const hints = (q.hints ?? []).map((h) => h.toLowerCase());
  return a.includes(q.correctAnswer.toLowerCase()) || hints.some((h) => a.includes(h));
};
