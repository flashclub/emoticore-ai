# EmotiCore AI - Your Emotional Intelligence Companion 🌈

EmotiCore AI is a unique emotional intelligence assistant that can sense your emotions in real-time and respond with dynamic colors and warm conversations! ✨

<p align="center">
  <a href="https://nextjs.org/" target="_blank">
    <img src="https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js" alt="Next.js">
  </a>
  <a href="https://www.typescriptlang.org/" target="_blank">
    <img src="https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript" alt="TypeScript">
  </a>
  <a href="https://openai.com/" target="_blank">
    <img src="https://img.shields.io/badge/OpenAI-GPT--4-412991?style=for-the-badge&logo=openai" alt="OpenAI">
  </a>
  <a href="https://tailwindcss.com/" target="_blank">
    <img src="https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS">
  </a>
  <a href="https://react.dev/" target="_blank">
    <img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react" alt="React">
  </a>
</p>

## ✨ Key Features

- 🎭 Advanced emotion analysis
- 🌈 Dynamic emotional energy core display
- 🌊 Smooth real-time conversations
- 🎨 Seven-color emotion mapping
- 🌍 Multi-language support
- 📱 Responsive design

## 🚀 Getting Started

1. Install dependencies:

```bash
npm install
```

2. Set up environment variables:
   Create `.env.local` and add:

```bash
OPENAI_API_KEY=your_openai_api_key
```

3. Run the development server:

```bash
npm run dev
```

## 🎨 Emotional Core Guide

EmotiCore AI's energy core changes colors based on emotional context:

- 💙 Blue: Calm, thoughtful, serenity
- 💗 Pink: Caring, warmth, empathy
- 🌟 Gold: Joy, excitement, creativity
- 💜 Purple: Curiosity, mystery, confusion
- 💚 Green: Healing, balance, growth
- ❤️ Red: Passion, excitement, intense emotions
- ⚪ White: Pure, clarity, rational

## 💻 Development

### Local Development

The project includes a pre-configured proxy for OpenAI API calls:

```typescript
if (process.env.NODE_ENV === "development") {
  config.httpAgent = new HttpsProxyAgent("http://127.0.0.1:7890");
}
```

### Environment Variables

Required environment variables:

- `OPENAI_API_KEY`: Your OpenAI API key
- `NODE_ENV`: Development/production environment

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch
3. Submit a Pull Request

## 🐛 Bug Reports

Found a bug? Please open an issue with:

- Bug description
- Steps to reproduce
- Expected vs actual behavior

## 📦 Dependencies

Core dependencies:

- Next.js 14
- React 18
- OpenAI API
- TailwindCSS

## 🔮 Future Plans

- [ ] Voice emotion analysis
- [ ] Enhanced visualization effects
- [ ] More emotional patterns
- [ ] Mobile app version

## 📜 License

MIT

---

> 🤖 **Pro tip**: Try expressing your genuine emotions when chatting with EmotiCore AI - it will respond with matching emotional energy!

## 🙏 Acknowledgments

Special thanks to:

- OpenAI team for GPT-4
- Next.js team for the amazing framework
- All contributors and supporters

---

Made with ❤️ by the EmotiCore AI Team
