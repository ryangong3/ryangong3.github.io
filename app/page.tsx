"use client";

import Image from "next/image";
import {
  ArrowRight,
  Brain,
  Certificate,
  Code,
  EnvelopeSimple,
  FilmSlate,
  FilmStrip,
  GlobeHemisphereWest,
  GraduationCap,
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
      eyebrow: "策略节点 / 01",
      short: "内容策略 + AI",
      title: "社交媒体策略与内容策划",
      description:
        "我从品牌目标、受众需求和平台语境出发，把主题转化为可执行的内容方向、发布计划与传播创意。",
      skills: ["内容策略", "受众洞察", "选题策划", "内容日历", "AI 创作工具", "跨文化沟通"],
      note: "每一条内容都应有明确的受众、目的和表达方式。",
    },
    repair: {
      eyebrow: "运营节点 / 02",
      short: "平台运营 + 优化",
      title: "平台运营与数据复盘",
      description:
        "我能够维护社交账号与公开信息，跟进评论和用户反馈，并结合内容表现与平台趋势持续调整运营方向。",
      skills: ["账号运营", "内容发布", "评论管理", "数据分析", "趋势观察", "持续优化"],
      note: "用数据判断内容表现，再把洞察带回下一轮创作。",
    },
    create: {
      eyebrow: "制作节点 / 03",
      short: "视频 + 视觉内容",
      title: "跨平台数字内容制作",
      description:
        "我可以独立完成图片、短视频、文案、网页内容与宣传素材，让同一主题适配不同平台和受众。",
      skills: ["短视频制作", "视频剪辑", "视觉设计", "文案内容", "网页内容", "AI 辅助创作"],
      note: "让策略、画面、文案与节奏共同服务传播目标。",
    },
  },
  en: {
    mind: {
      eyebrow: "STRATEGY NODE / 01",
      short: "Content Strategy + AI",
      title: "Social Strategy & Content Planning",
      description:
        "I turn brand goals, audience needs and platform context into practical content directions, publishing plans and campaign ideas.",
      skills: ["Content strategy", "Audience insight", "Editorial planning", "Content calendars", "AI creation tools", "Cross-cultural communication"],
      note: "Every post should have a clear audience, purpose and point of view.",
    },
    repair: {
      eyebrow: "OPERATIONS NODE / 02",
      short: "Channel Operations + Optimization",
      title: "Channel Management & Performance Review",
      description:
        "I maintain social accounts and public information, respond to audience feedback, and refine content using performance signals and platform trends.",
      skills: ["Channel management", "Publishing", "Community feedback", "Performance analysis", "Trend monitoring", "Optimization"],
      note: "I use performance insights to make the next round of content stronger.",
    },
    create: {
      eyebrow: "MAKER NODE / 03",
      short: "Video + Visual Content",
      title: "Cross-Platform Content Production",
      description:
        "I produce images, short-form video, copy, web content and campaign materials, adapting each story for its platform and audience.",
      skills: ["Short-form video", "Video editing", "Visual design", "Copywriting", "Web content", "AI-assisted creation"],
      note: "Strategy, visuals, copy and rhythm should work toward the same communication goal.",
    },
  },
} as const;

const websites = [
  {
    index: "01",
    title: "篮芽 HoopSprout",
    titleEn: "HoopSprout",
    type: "品牌平台与内容运营工具",
    typeEn: "Brand platform & content operations",
    url: "https://www.hoopsprout.ca/",
    image: "/portfolio/hoopsprout-logo.png",
    description:
      "围绕青少年篮球品牌独立策划并制作双语网站内容，同时搭建课程展示、试听申请、客户线索与日常运营工具。",
    descriptionEn:
      "Planned and produced bilingual content for a youth basketball brand while building course, trial-request, lead-management and daily operations tools.",
    tags: ["Next.js", "Supabase", "双语平台", "CRM"],
    tagsEn: ["Next.js", "Supabase", "Bilingual", "CRM"],
  },
  {
    index: "02",
    title: "ClickStone Media 官网",
    titleEn: "ClickStone Media Website",
    type: "品牌内容与网站呈现",
    typeEn: "Brand content & web presence",
    url: "https://clickstonemedia.ca/",
    image: "/portfolio/clickstone.png",
    description:
      "独立梳理数字营销公司的品牌表达，制作服务介绍、案例内容、视觉素材与联系入口，并完成移动端适配。",
    descriptionEn:
      "Shaped a digital marketing company’s brand message and produced its service, case-study and visual content for a responsive website.",
    tags: ["Wix", "Canva", "AI 工具", "响应式设计"],
    tagsEn: ["Wix", "Canva", "AI tools", "Responsive"],
  },
  {
    index: "03",
    title: "CHIN CHINE 餐厅官网",
    titleEn: "CHIN CHINE Restaurant Website",
    type: "餐饮品牌多语内容",
    typeEn: "Multilingual restaurant content",
    url: "https://www.chinchine.ca/",
    image: "/portfolio/chinchine-site.png",
    description:
      "为餐厅整理并制作中英法三语品牌内容，将菜单、价格、在线点餐与桌面二维码入口整合为一致的顾客体验。",
    descriptionEn:
      "Produced Chinese, English and French restaurant content and unified menus, pricing, online ordering and table QR access into one customer journey.",
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
    nav: ["能力", "作品", "教育与认证", "方向", "联系"],
    switchLabel: "Switch to English",
    kicker: "SOCIAL MEDIA SPECIALIST",
    title: ["策划内容。", "连接受众。"],
    intro:
      "我是一名社交媒体专家，能够从内容策略、账号运营到短视频与视觉制作，完整推进品牌的数字传播。",
    location: "多伦多，加拿大",
    availability: "正在寻找新机会",
    viewWork: "查看作品",
    contact: "联系我",
    nodeHint: "探索我的策略、运营与内容制作能力",
    activeNode: "当前节点",
    keySkills: "核心技能",
    exploreRelated: "查看相关作品",
    skillStrip: ["内容策略", "账号运营", "数据分析", "短视频制作", "视觉内容", "AI 工具"],
    languages: ["中文（母语）", "英语（中级）", "法语（中级）"],
    workEyebrow: "SELECTED WORK",
    portfolioTitle: "作品集",
    portfolioIntro: "品牌网站、推广内容与短视频作品。",
    websites: "网站项目",
    films: "视频作品",
    visit: "访问网站",
    play: "站内播放",
    credentialsEyebrow: "EDUCATION / CREDENTIALS",
    credentialsTitle: "教育与认证",
    credentialsIntro: "数字媒体学习与全媒体运营认证，为内容策划、制作和平台运营打下基础。",
    credentials: [
      {
        type: "学士学位",
        title: "数字媒体专业",
        organization: "计算机科学系 · 中国",
        description: "完成计算机科学与数字媒体方向的本科专业学习。",
      },
      {
        type: "专业认证",
        title: "全媒体运营证书",
        organization: "中国国家广播电视总局",
        description: "具备跨平台内容策划、制作与运营相关的专业认证。",
      },
    ],
    experienceEyebrow: "WORK EXPERIENCE / CHINA + CANADA",
    experienceTitle: "工作经历",
    experienceIntro: "覆盖内容策划、账号管理、数字制作、线上推广与运营优化。",
    experiences: [
      {
        title: "社交媒体专员（加拿大）",
        duties: [
          "制作宣传册、报告、资讯简报及其他营销文件。",
          "建立并维护营销素材库，支持品牌和客户推广。",
          "执行线上营销、电商及网站推广活动。",
          "更新公开媒体信息与数据，管理社交媒体账号、评论和客户反馈。",
        ],
      },
      {
        title: "社交媒体专员（中国）",
        duties: [
          "运营抖音、博客、网站及其他数字渠道，保持一致的线上形象。",
          "制定社交媒体运营策略，提升曝光度与用户参与度。",
          "制作图片、视频和文字内容，并针对目标受众优化表达。",
          "拍摄校园活动，协调活动策划、视频制作及后期剪辑。",
          "按计划发布和推广内容，分析数据与趋势并持续优化。",
        ],
      },
    ],
    rolesEyebrow: "SOCIAL MEDIA / TORONTO",
    rolesTitle: "我的专业方向",
    roles: [
      ["Social Media Specialist", "制定内容方向、维护社交账号、管理发布节奏，并根据受众反馈持续优化。"],
      ["Content Creator", "独立完成图片、文案、短视频与活动素材，适配不同平台和传播场景。"],
      ["Digital Content Producer", "整合视频剪辑、动态视觉、网页内容与 AI 工具，推进跨平台内容生产。"],
    ],
    contactEyebrow: "LET’S CONNECT",
    contactTitle: "需要一位能把策略变成内容的人？",
    contactCopy: "我目前在多伦多寻找社交媒体运营、内容创作与数字营销相关机会。",
    email: "发送邮件",
    phone: "拨打电话",
    footer: "Ryan Gong · Social Media Specialist · Toronto",
    nowPlaying: "正在播放",
    closeVideo: "关闭视频",
    youtube: "在 YouTube 打开",
  },
  en: {
    nav: ["Capabilities", "Work", "Credentials", "Direction", "Contact"],
    switchLabel: "切换至中文",
    kicker: "SOCIAL MEDIA SPECIALIST",
    title: ["Plan content.", "Connect audiences."],
    intro:
      "I take social media work from strategy and channel management through short-form video, visual production and publishing.",
    location: "Toronto, Canada",
    availability: "Open to opportunities",
    viewWork: "View work",
    contact: "Contact",
    nodeHint: "Explore my strategy, operations and content-production skills",
    activeNode: "Active node",
    keySkills: "Key skills",
    exploreRelated: "Explore related work",
    skillStrip: ["Content strategy", "Channel management", "Analytics", "Short-form video", "Visual content", "AI tools"],
    languages: ["Chinese (Native)", "English (Intermediate)", "French (Intermediate)"],
    workEyebrow: "SELECTED WORK",
    portfolioTitle: "Portfolio",
    portfolioIntro: "Selected brand websites, campaign content and short-form video.",
    websites: "Website projects",
    films: "Video projects",
    visit: "Visit website",
    play: "Play here",
    credentialsEyebrow: "EDUCATION / CREDENTIALS",
    credentialsTitle: "Education & Credentials",
    credentialsIntro: "Digital media education and all-media certification supporting content strategy, production and channel operations.",
    credentials: [
      {
        type: "Bachelor’s Degree",
        title: "Digital Media",
        organization: "Department of Computer Science · China",
        description: "Undergraduate study combining computer science and digital media.",
      },
      {
        type: "Professional Certificate",
        title: "All-Media Operations Certificate",
        organization: "National Radio and Television Administration of China",
        description: "Professional certification in cross-platform content planning, production and operations.",
      },
    ],
    experienceEyebrow: "WORK EXPERIENCE / CHINA + CANADA",
    experienceTitle: "Work Experience",
    experienceIntro: "Content planning, channel management, digital production, online promotion and performance optimization.",
    experiences: [
      {
        title: "Social Media Specialist — Canada",
        duties: [
          "Prepared brochures, reports, newsletters and other marketing documents.",
          "Developed and maintained a portfolio of marketing materials for brand and client promotion.",
          "Supported online marketing, e-commerce and website promotions.",
          "Updated public-facing media information and data while managing social accounts, reviews and client feedback.",
        ],
      },
      {
        title: "Social Media Specialist — China",
        duties: [
          "Managed Douyin, blogs, websites and other digital channels to maintain a consistent online presence.",
          "Developed social media strategies to improve visibility and audience engagement.",
          "Created images, videos and written content tailored to target audiences.",
          "Filmed campus events and coordinated event planning, video production and post-production editing.",
          "Scheduled and promoted content, then analyzed performance data and trends to guide optimization.",
        ],
      },
    ],
    rolesEyebrow: "SOCIAL MEDIA / TORONTO",
    rolesTitle: "My professional focus",
    roles: [
      ["Social Media Specialist", "Content direction, channel management, publishing cadence and ongoing optimization informed by audience feedback."],
      ["Content Creator", "Independent production of images, copy, short-form video and campaign assets for different platforms and contexts."],
      ["Digital Content Producer", "Integrated video editing, motion graphics, web content and AI tools for cross-platform production."],
    ],
    contactEyebrow: "LET’S CONNECT",
    contactTitle: "Need someone who can turn strategy into content?",
    contactCopy: "I’m looking for social media, content creation and digital marketing opportunities in Toronto.",
    email: "Email Ryan",
    phone: "Call me",
    footer: "Ryan Gong · Social Media Specialist · Toronto",
    nowPlaying: "NOW PLAYING",
    closeVideo: "Close video",
    youtube: "Open on YouTube",
  },
} as const;

const zoneIcons = {
  mind: Brain,
  repair: GlobeHemisphereWest,
  create: FilmStrip,
};

const stripIcons = [Code, Monitor, Wrench, FilmSlate, FilmStrip, Sparkle];

export default function Home() {
  const [language, setLanguage] = useState<Language>("zh");
  const [active, setActive] = useState<ZoneKey>("create");
  const [hasInteracted, setHasInteracted] = useState(false);
  const [activeVideo, setActiveVideo] = useState<(typeof videos)[number] | null>(null);

  useEffect(() => {
    const saved = window.localStorage.getItem("ryan-portfolio-language");
    if (saved === "zh" || saved === "en") {
      setLanguage(saved);
      return;
    }

    const browserLanguage = window.navigator.language.toLowerCase();
    setLanguage(browserLanguage.startsWith("zh") ? "zh" : "en");
  }, []);

  useEffect(() => {
    document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
  }, [language]);

  useEffect(() => {
    const portfolio = document.getElementById("portfolio");
    if (!portfolio) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setHasInteracted(false);
      },
      { threshold: 0.02 },
    );

    observer.observe(portfolio);
    return () => observer.disconnect();
  }, []);

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
            <a href="#top">{t.nav[0]}</a>
            <a href="#portfolio">{t.nav[1]}</a>
            <a href="#credentials">{t.nav[2]}</a>
            <a href="#direction">{t.nav[3]}</a>
            <a href="#contact">{t.nav[4]}</a>
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

        <div className={`character-stage stage-${active}`} aria-label={t.nodeHint}>
          <div className="avatar-field" aria-hidden="true" />
          <div className="energy-system" aria-hidden="true">
            <span className="scan-orbit scan-orbit-one" />
            <span className="scan-orbit scan-orbit-two" />
            <span className="energy-core energy-head" />
            <span className="energy-core energy-left-hand" />
            <span className="energy-core energy-right-hand" />
            <span className="signal-particle particle-one" />
            <span className="signal-particle particle-two" />
            <span className="signal-particle particle-three" />
            <span className="signal-particle particle-four" />
            <span className="signal-particle particle-five" />
          </div>
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
                onClick={() => {
                  setActive(key);
                  setHasInteracted(true);
                }}
                aria-pressed={active === key}
                aria-label={zones[key].title}
              >
                <Icon weight="duotone" />
                <span>{zones[key].short}</span>
              </button>
            );
          })}
          <p className="interaction-hint">{t.nodeHint}</p>

          <aside
            className={`mobile-node-card panel-${active} ${hasInteracted ? "is-visible" : ""}`}
            aria-live="polite"
            aria-hidden={!hasInteracted}
          >
            <button
              className="mobile-card-close"
              type="button"
              onClick={() => setHasInteracted(false)}
              aria-label={language === "zh" ? "关闭技能卡片" : "Close skill card"}
            >
              <X weight="bold" />
            </button>
            <div className="panel-heading">
              <span className="panel-signal" aria-hidden="true" />
              <p>{selected.eyebrow}</p>
            </div>
            <div className="mobile-card-title">
              <ActiveIcon weight="duotone" />
              <h2>{selected.title}</h2>
            </div>
            <p>{selected.description}</p>
            <ul className="panel-skills">
              {selected.skills.slice(0, 4).map((skill) => <li key={skill}>{skill}</li>)}
            </ul>
          </aside>
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

        <div className="signal-strip">
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

      <section className="experience-section" id="experience">
        <div className="section-heading experience-heading">
          <div>
            <p className="eyebrow orange">{t.experienceEyebrow}</p>
            <h2>{t.experienceTitle}</h2>
          </div>
          <p>{t.experienceIntro}</p>
        </div>
        <div className="experience-grid">
          {t.experiences.map((experience) => (
            <article className="experience-card" key={experience.title}>
              <h3>{experience.title}</h3>
              <ul>
                {experience.duties.map((duty) => <li key={duty}>{duty}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="credentials-section" id="credentials">
        <div className="section-heading credentials-heading">
          <div>
            <p className="eyebrow">{t.credentialsEyebrow}</p>
            <h2>{t.credentialsTitle}</h2>
          </div>
          <p>{t.credentialsIntro}</p>
        </div>
        <div className="credentials-grid">
          {t.credentials.map((credential, index) => {
            const Icon = index === 0 ? GraduationCap : Certificate;
            return (
              <article className="credential-card" key={credential.title}>
                <div className="credential-icon"><Icon weight="duotone" /></div>
                <div className="credential-number">0{index + 1}</div>
                <p className="credential-type">{credential.type}</p>
                <h3>{credential.title}</h3>
                <p className="credential-organization">{credential.organization}</p>
                <p className="credential-description">{credential.description}</p>
              </article>
            );
          })}
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
