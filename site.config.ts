import { defineSiteConfig } from 'valaxy'

export default defineSiteConfig({
  lang: "zh-CN",
  title: "乐得自在的小破站",
  subtitle: "可能走错地方了吖",
  author: {
    name: "乐得自在",
    avatar: "https://copur.xyz/image/avatar.webp",
    email: "copur@qq.com",
    status: {
      emoji: "🌱",
      message: "正在努力学习中",
    },
  },
  description: "闲来无事的小本本.",
  url: "https://copur.xyz",
  statistics: {
    enable: true,
  },
  social: [
    {
      name: "RSS",
      link: "/atom.xml",
      icon: "i-ri-rss-line",
      color: "orange",
    },
    {
      name: "QQ",
      link: "https://wpa.qq.com/msgrd?v=3&uin=1935576264&site=qq&menu=yes",
      icon: "i-ri-qq-line",
      color: "#12B7F5",
    },
    {
      name: "GitHub",
      link: "https://github.com/copurxia/",
      icon: "i-ri-github-line",
      color: "#6e5494",
    },
    {
      name: "E-Mail",
      link: "mailto:copur@copur.xyz",
      icon: "i-ri-mail-line",
      color: "#8E71C1",
    },
    {
      name: "Travelling",
      link: "https://travellings.link",
      icon: "i-ri-train-line",
      color: "var(--va-c-text)",
    },
  ],
})
