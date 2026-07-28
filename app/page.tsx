"use client";

import Image from "next/image";
import {
  ArrowRight,
  Brain,
  Code,
  EnvelopeSimple,
  FilmSlate,
  FilmStrip,
  GlobeHemisphereWest,
  MapPin,
  Monitor,
  Phone,
  Play,
  Sparkle,
  Wrench,
  X,
} from "@phosphor-icons/react";
import { useEffect, useMemo, useState } from "react";

type Language = "zh" | "en";
type ZoneKey = "mind" | "repair" | "create";

const zoneOrder: ZoneKey[] = ["mind", "repair", "create"];

const zoneContent = {
  zh: {
    mind: {
      eyebrow: "创意节点 / 01",
      short: "创意思维 + AI",
      title: "创意、AI 与持续学习",
      description:
        "我习惯从不确定的问题里寻找可能性，把天马行空的想法整理成能够被制作、测试和使用的方案。",
      skills: ["AI 创作工具", "创意构思", "快速学习", "中文母语", "英语中级", "法语中级"],
      note: "让工具服务于想法，而不是让想法被工具限制。",
    },
    repair: {
      eyebrow: "技术节点 / 02",
      short: "AV 系统 + 排障",
      title: "设备、维修与故障排查",
      description:
        "我熟悉多媒体设备和电脑软硬件，能够沿着信号、系统与使用场景逐层定位问题，并恢复稳定运行。",
      skills: ["AV 多媒体设备", "电脑软硬件", "系统排障", "设备安装", "信号链检查", "现场技术支持"],
      note: "先复现问题，再缩小范围，最后验证解决方案。",
    },
    create: {
      eyebrow: "制作节点 / 03",
      short: "网站 + 动态视觉",
      title: "网站、视频与动态视觉",
      description:
        "我可以把内容从概念推进到成品：制作网站、剪辑视频、完成 AE 动效，并用 AI 提高创作效率。",
      skills: ["网站开发", "视频剪辑", "After Effects", "动态设计", "数字内容", "AI 辅助创作"],
      note: "把技术、画面与节奏组织成一次完整体验。",
    },
  },
  en: {
    mind: {
      eyebrow: "CREATIVE NODE / 01",
      short: "Creative Mind + AI",
      title: "Creative Thinking, AI & Learning",
      description:
        "I find possibilities inside uncertain problems and shape ambitious ideas into solutions that can be built, tested and used.",
      skills: ["AI creation tools", "Creative ideation", "Fast learner", "Native Chinese", "Intermediate English", "Intermediate French"],
      note: "Tools should serve ideas, not limit them.",
    },
    repair: {
      eyebrow: "TECH NODE / 02",
      short: "AV Systems + Support",
      title: "Equipment, Repair & Troubleshooting",
      description:
        "I work comfortably across multimedia equipment, computer hardware and software, tracing issues through signals and systems until they are stable.",
      skills: ["AV equipment", "Computer hardware", "System troubleshooting", "Equipment setup", "Signal-chain checks", "On-site support"],
      note: "Reproduce the issue, narrow the scope, then verify the solution.",
    },
    create: {
      eyebrow: "MAKER NODE / 03",
      short: "Web + Motion Craft",
      title: "Websites, Video & Motion",
      description:
        "I move ideas from concept to finished work through websites, video editing, After Effects motion and AI-assisted production.",
      skills: ["Web development", "Video editing", "After Effects", "Motion design", "Digital content", "AI-assisted creation"],
      note: "I combine technology, visuals and rhythm into one clear experience.",
    },
  },
} as const;

const websites = [
  {
    index: "01",
    title: "篮芽 HoopSprout",
    titleEn: "HoopSprout",
    type: "全栈开发个人项目",
    typeEn: "Independent full-stack project",
    url: "https://www.hoopsprout.ca/",
    image: "/portfolio/hoopsprout-logo.png",
    description:
      "独立设计并开发青少年篮球课程双语平台，基于 Next.js 与 Supabase 实现家长选课、试听申请、机构线索 CRM 和运营后台。",
    descriptionEn:
      "Designed and developed a bilingual youth basketball platform with Next.js and Supabase, including class selection, trial requests, lead CRM and operations tools.",
    tags: ["Next.js", "Supabase", "双语平台", "CRM"],
    tagsEn: ["Next.js", "Supabase", "Bilingual", "CRM"],
  },
  {
    index: "02",
    title: "ClickStone Media 官网",
    titleEn: "ClickStone Media Website",
    type: "品牌网站设计与搭建",
    typeEn: "Brand website design & build",
    url: "https://clickstonemedia.ca/",
    image: "/portfolio/clickstone.png",
    description:
      "独立完成数字营销公司官网的品牌视觉、服务介绍、案例展示、联系表单与微信二维码，支持电脑端和移动端浏览。",
    descriptionEn:
      "Designed and built a responsive digital marketing site covering brand visuals, services, case studies, contact and WeChat integration.",
    tags: ["Wix", "Canva", "AI 工具", "响应式设计"],
    tagsEn: ["Wix", "Canva", "AI tools", "Responsive"],
  },
  {
    index: "03",
    title: "CHIN CHINE 餐厅官网",
    titleEn: "CHIN CHINE Restaurant Website",
    type: "中英法三语餐饮网站",
    typeEn: "Trilingual restaurant website",
    url: "https://www.chinchine.ca/",
    image: "/portfolio/chinchine-site.png",
    description:
      "独立设计并搭建中英法三语餐厅网站，整合菜单、价格展示、在线点餐、桌面二维码入口与订单系统。",
    descriptionEn:
      "Designed and built a Chinese, English and French restaurant website integrating menus, pricing, ordering and table QR access.",
    tags: ["Wix", "GloriaFood", "三语网站", "在线点餐"],
    tagsEn: ["Wix", "GloriaFood", "Trilingual", "Online ordering"],
  },
] as const;

const videos = [
  {
    index: "01",
    title: "品牌宣传片",
    titleEn: "Brand Film",
    url: "https://www.youtube.com/watch?v=aZq9Er5NF7k",
    embedUrl: "https://www.youtube-nocookie.com/embed/aZq9Er5NF7k?autoplay=1&rel=0",
    image: "/portfolio/brand-film.jpg",
    description:
      "以“石头蜕变为黄金”为核心视觉，独立完成创意策划、分镜、AI 画面、动态制作、音效与后期剪辑。",
    descriptionEn:
      "A stone transforms into gold in a film developed independently from concept and storyboard through AI visuals, motion, sound and final edit.",
    tags: ["创意策划", "AI 视觉", "动态制作", "后期剪辑"],
    tagsEn: ["Creative direction", "AI visuals", "Motion", "Editing"],
  },
  {
    index: "02",
    title: "Wakame Sushi 足球主题广告",
    titleEn: "Wakame Sushi Soccer Ad",
    url: "https://www.youtube.com/watch?v=Sndiv87OZvM",
    embedUrl: "https://www.youtube-nocookie.com/embed/Sndiv87OZvM?autoplay=1&rel=0",
    image: "/portfolio/wakame-ad.jpg",
    description:
      "足球旋转变成三文鱼刺身，再切换至寿司、啤酒与看球场景，突出餐厅的大屏观赛氛围。",
    descriptionEn:
      "A spinning soccer ball becomes salmon sashimi, then shifts to sushi, beer and game-night scenes that sell the big-screen atmosphere.",
    tags: ["广告创意", "分镜设计", "AI 画面", "音效剪辑"],
    tagsEn: ["Ad concept", "Storyboarding", "AI visuals", "Sound & edit"],
  },
] as const;

const copy = {
  zh: {
    nav: ["能力", "作品", "方向", "联系"],
    switchLabel: "Switch to English",
    kicker: "MULTIMEDIA TECHNOLOGIST",
    title: ["创造想法。", "构建现实。"],
    intro:
      "我是一名多媒体技术创作者，把网站、AV 系统、视频动效与 AI 工作流连接起来，让创意真正落地。",
    location: "多伦多，加拿大",
    availability: "正在寻找新机会",
    viewWork: "查看作品",
    contact: "联系我",
    nodeHint: "选择发光的头部或双手",
    activeNode: "当前节点",
    keySkills: "核心技能",
    exploreRelated: "查看相关作品",
    skillStrip: ["网站开发", "多媒体设备", "诊断与维修", "视频剪辑", "After Effects", "AI 工具"],
    languages: ["中文（母语）", "英语（中级）", "法语（中级）"],
    workEyebrow: "SELECTED WORK",
    portfolioTitle: "作品集",
    portfolioIntro: "网站、品牌与动态影像项目。",
    websites: "网站项目",
    films: "视频作品",
    visit: "访问网站",
    play: "站内播放",
    rolesEyebrow: "DIRECTION / TORONTO",
    rolesTitle: "适合我的工作方向",
    roles: [
      ["AV / IT Support Technician", "会议与多媒体设备、现场技术支持、电脑软硬件和系统故障排查。"],
      ["Multimedia Technician", "连接设备、网站、视频与数字内容的跨领域制作和技术支持。"],
      ["Digital Content Producer", "视频剪辑、AE 动效、网页内容和 AI 辅助的多平台视觉制作。"],
    ],
    contactEyebrow: "LET’S CONNECT",
    contactTitle: "需要一个同时懂创意与技术的人？",
    contactCopy: "我目前在多伦多寻找多媒体技术、AV / IT 支持与数字内容相关机会。",
    email: "发送邮件",
    phone: "拨打电话",
    footer: "Ryan Gong · Creative Technologist · Toronto",
    nowPlaying: "正在播放",
    closeVideo: "关闭视频",
    youtube: "在 YouTube 打开",
  },
  en: {
    nav: ["Capabilities", "Work", "Direction", "Contact"],
    switchLabel: "切换至中文",
    kicker: "MULTIMEDIA TECHNOLOGIST",
    title: ["Create ideas.", "Build reality."],
    intro:
      "I connect websites, AV systems, motion content and AI workflows to turn creative ideas into reliable real-world results.",
    location: "Toronto, Canada",
    availability: "Open to opportunities",
    viewWork: "View work",
    contact: "Contact",
    nodeHint: "Select the glowing mind or hands",
    activeNode: "Active node",
    keySkills: "Key skills",
    exploreRelated: "Explore related work",
    skillStrip: ["Web development", "Multimedia hardware", "Diagnosis & repair", "Video editing", "After Effects", "AI tools"],
    languages: ["Chinese (Native)", "English (Intermediate)", "French (Intermediate)"],
    workEyebrow: "SELECTED WORK",
    portfolioTitle: "Portfolio",
    portfolioIntro: "Selected websites, brand and motion work.",
    websites: "Website projects",
    films: "Video projects",
    visit: "Visit website",
    play: "Play here",
    rolesEyebrow: "DIRECTION / TORONTO",
    rolesTitle: "Roles I’m a strong fit for",
    roles: [
      ["AV / IT Support Technician", "Conference and multimedia equipment, on-site support, computer hardware, software and system troubleshooting."],
      ["Multimedia Technician", "Cross-disciplinary production and technical support connecting equipment, websites, video and digital content."],
      ["Digital Content Producer", "Video editing, After Effects motion, web content and AI-assisted visual production across platforms."],
    ],
    contactEyebrow: "LET’S CONNECT",
    contactTitle: "Need someone who speaks both creative and technical?",
    contactCopy: "I’m looking for multimedia technology, AV / IT support and digital content opportunities in Toronto.",
    email: "Email Ryan",
    phone: "Call me",
    footer: "Ryan Gong · Creative Technologist · Toronto",
    nowPlaying: "NOW PLAYING",
    closeVideo: "Close video",
    youtube: "Open on YouTube",
  },
} as const;

const zoneIcons = {
  mind: Brain,
  repair: Wrench,
  create: FilmStrip,
};

const stripIcons = [Code, Monitor, Wrench, FilmSlate, FilmStrip, Sparkle];

export default function Home() {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window === "undefined") return "zh";
    const saved = window.localStorage.getItem("ryan-portfolio-language");
    return saved === "en" ? "en" : "zh";
  });
  const [active, setActive] = useState<ZoneKey>("create");
  const [activeVideo, setActiveVideo] = useState<(typeof videos)[number] | null>(null);

  useEffect(() => {
    document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
  }, [language]);

  useEffect(() => {
    if (!activeVideo) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveVideo(null);
    };
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", close);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", close);
    };
  }, [activeVideo]);

  const t = copy[language];
  const zones = zoneContent[language];
  const selected = useMemo(() => zones[active], [active, zones]);
  const ActiveIcon = zoneIcons[active];

  const toggleLanguage = () => {
    const next = language === "zh" ? "en" : "zh";
    setLanguage(next);
    window.localStorage.setItem("ryan-portfolio-language", next);
  };

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Ryan Gong">
          <span className="brand-dot" aria-hidden="true" />
          RYAN GONG
        </a>
        <div className="header-actions">
          <nav aria-label="Primary navigation">
            <a href="#skills">{t.nav[0]}</a>
            <a href="#portfolio">{t.nav[1]}</a>
            <a href="#direction">{t.nav[2]}</a>
            <a href="#contact">{t.nav[3]}</a>
          </nav>
          <button className="language-toggle" type="button" onClick={toggleLanguage} aria-label={t.switchLabel}>
            <span className={language === "en" ? "active" : ""}>EN</span>
            <i aria-hidden="true">/</i>
            <span className={language === "zh" ? "active" : ""}>中文</span>
          </button>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">{t.kicker}</p>
          <h1>
            <span>{t.title[0]}</span>
            <span>{t.title[1]}</span>
          </h1>
          <p className="hero-intro">{t.intro}</p>
          <div className="location-row">
            <span><MapPin weight="bold" />{t.location}</span>
            <i aria-hidden="true" />
            <strong>{t.availability}</strong>
          </div>
          <div className="hero-actions">
            <a className="button button-primary" href="#portfolio">{t.viewWork}<ArrowRight /></a>
            <a className="button button-secondary" href="#contact">{t.contact}<EnvelopeSimple /></a>
          </div>
        </div>

        <div className="character-stage" aria-label={t.nodeHint}>
          <div className="avatar-field" aria-hidden="true" />
          <Image
            className="avatar"
            src="/virtual-avatar-v2-illustrated.png"
            alt={language === "zh" ? "Ryan Gong 的互动虚拟形象" : "Interactive portrait of Ryan Gong"}
            width={887}
            height={1774}
            priority
            unoptimized
          />
          {zoneOrder.map((key) => {
            const Icon = zoneIcons[key];
            return (
              <button
                className={`hotspot hotspot-${key} ${active === key ? "is-active" : ""}`}
                type="button"
                key={key}
                onClick={() => setActive(key)}
                aria-pressed={active === key}
                aria-label={zones[key].title}
              >
                <Icon weight="duotone" />
                <span>{zones[key].short}</span>
              </button>
            );
          })}
          <p className="interaction-hint">{t.nodeHint}</p>
        </div>

        <aside className={`active-panel panel-${active}`} aria-live="polite">
          <div className="panel-heading">
            <span className="panel-signal" aria-hidden="true" />
            <p>{t.activeNode}</p>
          </div>
          <div className="panel-title-row">
            <ActiveIcon weight="duotone" />
            <div>
              <span>{selected.eyebrow}</span>
              <h2>{selected.title}</h2>
            </div>
          </div>
          <p className="panel-description">{selected.description}</p>
          <p className="panel-label">{t.keySkills}</p>
          <ul className="panel-skills">
            {selected.skills.map((skill) => <li key={skill}>{skill}</li>)}
          </ul>
          <blockquote>{selected.note}</blockquote>
          <a href="#portfolio">{t.exploreRelated}<ArrowRight /></a>
        </aside>

        <div className="signal-strip" id="skills">
          <div className="capability-strip">
            {t.skillStrip.map((skill, index) => {
              const Icon = stripIcons[index];
              return <span key={skill}><Icon weight="duotone" />{skill}</span>;
            })}
          </div>
          <div className="language-strip">
            <GlobeHemisphereWest weight="duotone" />
            {t.languages.map((item) => <span key={item}>{item}</span>)}
          </div>
        </div>
      </section>

      <section className="portfolio-section" id="portfolio">
        <div className="section-heading">
          <div>
            <p className="eyebrow orange">{t.workEyebrow}</p>
            <h2>{t.portfolioTitle}</h2>
          </div>
          <p>{t.portfolioIntro}</p>
        </div>

        <div className="group-heading">
          <span>{t.websites}</span>
          <span>WEB / 01—03</span>
        </div>
        <div className="website-grid">
          {websites.map((project) => (
            <article className="project-card" key={project.url}>
              <a className="project-image" href={project.url} target="_blank" rel="noreferrer">
                <Image src={project.image} alt="" fill unoptimized sizes="(max-width: 800px) 100vw, 33vw" />
                <span>{t.visit}<ArrowRight /></span>
              </a>
              <div className="project-meta">
                <span>{project.index}</span>
                <span>{language === "zh" ? project.type : project.typeEn}</span>
              </div>
              <h3>{language === "zh" ? project.title : project.titleEn}</h3>
              <p>{language === "zh" ? project.description : project.descriptionEn}</p>
              <ul className="tag-list">
                {(language === "zh" ? project.tags : project.tagsEn).map((tag) => <li key={tag}>{tag}</li>)}
              </ul>
            </article>
          ))}
        </div>

        <div className="group-heading film-heading">
          <span>{t.films}</span>
          <span>FILM / 01—02</span>
        </div>
        <div className="video-grid">
          {videos.map((video) => (
            <article className="project-card video-card" key={video.url}>
              <button className="video-image" type="button" onClick={() => setActiveVideo(video)}>
                <Image src={video.image} alt="" fill unoptimized sizes="(max-width: 800px) 100vw, 50vw" />
                <span className="play-control"><Play weight="fill" /></span>
                <small>{t.play}</small>
              </button>
              <div className="project-meta">
                <span>{video.index}</span>
                <span>YOUTUBE / FILM</span>
              </div>
              <h3>{language === "zh" ? video.title : video.titleEn}</h3>
              <p>{language === "zh" ? video.description : video.descriptionEn}</p>
              <ul className="tag-list">
                {(language === "zh" ? video.tags : video.tagsEn).map((tag) => <li key={tag}>{tag}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="direction-section" id="direction">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{t.rolesEyebrow}</p>
            <h2>{t.rolesTitle}</h2>
          </div>
        </div>
        <div className="role-list">
          {t.roles.map(([title, description], index) => (
            <article key={title}>
              <span>0{index + 1}</span>
              <h3>{title}</h3>
              <p>{description}</p>
              <ArrowRight aria-hidden="true" />
            </article>
          ))}
        </div>
      </section>

      <section className="contact-section" id="contact">
        <p className="eyebrow">{t.contactEyebrow}</p>
        <h2>{t.contactTitle}</h2>
        <p>{t.contactCopy}</p>
        <div className="contact-actions">
          <a className="button button-primary" href="mailto:GONGRUI001@GMAIL.COM">
            <EnvelopeSimple />{t.email}<span>GONGRUI001@GMAIL.COM</span>
          </a>
          <a className="button button-secondary" href="tel:+15794210829">
            <Phone />{t.phone}<span>+1 (579) 421-0829</span>
          </a>
        </div>
      </section>

      <footer>
        <span>{t.footer}</span>
        <a href="#top">TOP ↑</a>
      </footer>

      {activeVideo && (
        <div className="video-modal" role="presentation" onMouseDown={(event) => {
          if (event.currentTarget === event.target) setActiveVideo(null);
        }}>
          <div className="video-dialog" role="dialog" aria-modal="true" aria-label={language === "zh" ? activeVideo.title : activeVideo.titleEn}>
            <div className="video-dialog-header">
              <div>
                <span>{t.nowPlaying}</span>
                <h2>{language === "zh" ? activeVideo.title : activeVideo.titleEn}</h2>
              </div>
              <button type="button" onClick={() => setActiveVideo(null)} aria-label={t.closeVideo}><X /></button>
            </div>
            <div className="video-frame">
              <iframe
                src={activeVideo.embedUrl}
                title={language === "zh" ? activeVideo.title : activeVideo.titleEn}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <a href={activeVideo.url} target="_blank" rel="noreferrer">{t.youtube}<ArrowRight /></a>
          </div>
        </div>
      )}
    </main>
  );
}
