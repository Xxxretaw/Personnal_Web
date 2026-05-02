# 个人网站

**在线预览：[xxxretaw.github.io/Personnal_Web](https://xxxretaw.github.io/Personnal_Web/)**

AI 训练师的个人作品集网站，展示 AI 辅助工具、动画制作经历与音乐分享。

## 技术栈

- **Next.js 16** (App Router) + **React 19**
- **Tailwind CSS v4** (CSS-based config)
- **Framer Motion v12** 动效
- **Lenis** 平滑滚动
- **TypeScript**

## 开始使用

```bash
npm install
npm run dev
```

开发服务器启动后，打开 [http://localhost:3000](http://localhost:3000) 查看本地页面。

## 项目结构

```
app/
  layout.tsx      — 全局布局（字体、LenisProvider）
  page.tsx        — 主页组装
  globals.css     — Tailwind v4 @theme 设计令牌 + CSS 纹理
components/
  Hero.tsx        — 首屏介绍
  WorkShowcase.tsx — AI 工具展示（obs2feishu、TodoList、HSV 色彩识别）
  AboutBeliefs.tsx — 过往动画作品（三国的星空、剑来、诛仙）
  MusicSection.tsx — 人生歌单
  Connect.tsx     — 联系方式
  Navbar.tsx      — 固定导航栏
  SideColumns.tsx — 装饰侧边栏
lib/
  assets.ts       — 静态资源路径工具
```
