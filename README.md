# PineQuest Mobile App

React Native Expo ашиглан хийсэн mobile application.

## 🚀 Эхлэх

### Шаардлагатай зүйлс
- Node.js (v16 ба түүнээс дээш)
- npm эсвэл yarn
- Expo Go app (утсан дээрээ татаж аваарай)

### Суулгах

```bash
npm install
```

### Ажиллуулах

```bash
# Хөгжүүлэлтийн сервер эхлүүлэх
npm start

# iOS симулятор дээр ажиллуулах (Mac only)
npm run ios

# Android emulator дээр ажиллуулах
npm run android

# Web дээр ажиллуулах
npm run web
```

QR код гарч ирэхэд утасны **Expo Go** app-аар scan хийгээд үзэж болно.

## 📁 Төслийн бүтэц

```
pinequest-s4-e2-team-1/
├── App.tsx                 # Гол entry point
├── app.json                # Expo тохиргоо
├── package.json            # Dependencies
├── tsconfig.json           # TypeScript тохиргоо
├── babel.config.js         # Babel тохиргоо
├── assets/                 # Зургууд, фонт гэх мэт
└── src/
    └── screens/
        └── HomeScreen.tsx  # Нүүр дэлгэц
```

## 🛠️ Технологиуд

- **React Native** - Cross-platform mobile framework
- **Expo** - Хөгжүүлэлтийг хялбаршуулах tool
- **TypeScript** - Type safety
- **React Navigation** - Дэлгэцүүдийн хооронд шилжилт

## 📱 Боломжууд

- ✅ Counter жишээ
- ✅ Text input жишээ
- ✅ Navigation бэлэн болсон
- ✅ TypeScript дэмжлэгтэй
- ✅ iOS болон Android дээр ажиллана

## 🎨 Дараагийн алхамууд

1. Шинэ дэлгэцүүд нэмэх (`src/screens/`)
2. API холболт нэмэх
3. Authentication нэмэх
4. UI components бүтээх
5. State management (Redux, MobX, гэх мэт) нэмэх

## 🔧 Тусламж

- [Expo документ](https://docs.expo.dev/)
- [React Native документ](https://reactnative.dev/)
- [React Navigation](https://reactnavigation.org/)
