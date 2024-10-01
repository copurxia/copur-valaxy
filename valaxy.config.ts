import { defineValaxyConfig } from "valaxy";
import type { UserThemeConfig } from "valaxy-theme-yun";

// add icons what you will need
const safelist = ["i-ri-home-line"];

/**
 * User Config
 */
export default defineValaxyConfig<UserThemeConfig>({
  // site config see site.config.ts

  theme: "yun",

  siteConfig: {
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
  },
  themeConfig: {
    banner: {
      enable: true,
      title: "乐得自在的小破站",
      cloud: {
        enable: true,
      },
    },

    pages: [
      {
        name: "我的小伙伴们",
        url: "/links/",
        icon: "i-ri-genderless-line",
        color: "dodgerblue",
      },
      {
        name: "英语听力解析",
        url: "/englisten/",
        icon: "i-ri-customer-service-line",
        color: "#F293B0",
      },
      {
        name: "Baidu-light-33主题",
        url: "/posts/baidu-light/",
        icon: "i-ri-baidu-line",
        color: "#13c2c2",
      },
    ],

    footer: {
      since: 2020,
      beian: {
        enable: true,
        icp: "浙ICP备2021035374号",
      },
      powered: true,
    },
  },

  unocss: { safelist },
});
