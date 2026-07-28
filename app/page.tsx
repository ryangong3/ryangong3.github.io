"use client";

import Image from "next/image";
import type { CSSProperties, PointerEvent } from "react";
import { useEffect, useMemo, useState } from "react";

type ZoneKey = "mind" | "repair" | "create";
type Language = "zh" | "en";

const zones: Record<
  ZoneKey,
  {
    eyebrow: string;
    title: string;
    description: string;
    skills: string[];
    note: string;
  }
> = {
  mind: {
    eyebrow: "THINK / 01",
    title: "创意、AI 与持续学习",
    description:
      "我习惯从不确定的问题里寻找可能性，把天马行空的想法整理成能够被制作、测试和使用的方案。",
    skills: ["AI 创作工具", "创意构思", "快速学习", "中文母语", "英语中级", "法语中级"],
    note: "让工具服务于想法，而不是让想法被工具限制。",
  },
  repair: {
    eyebrow: "FIX / 02",
    title: "设备、维修与故障排查",
    description:
      "我熟悉多媒体设备和电脑软硬件，喜欢沿着信号、系统与使用场景逐层定位问题，并把设备恢复到稳定状态。",
    skills: ["AV 多媒体设备", "电脑软硬件", "系统排障", "设备安装", "信号链检查", "现场技术支持"],
    note: "先复现问题，再缩小范围，最后验证解决方案。",
  },
  create: {
    eyebrow: "CREATE / 03",
    title: "网站、视频与动态视觉",
    description:
      "我可以把内容从概念推进到成品：制作网站、剪辑视频、完成 AE 动效，并利用 AI 提高创作效率。",
    skills: ["网站制作", "视频剪辑", "After Effects", "动效设计", "数字内容", "AI 辅助创作"],
    note: "把技术、画面与节奏组织成一次完整体验。",
  },
};

const zonesEn: typeof zones = {
  mind: {
    eyebrow: "THINK / 01",
    title: "Creative Thinking, AI & Continuous Learning",
    description:
      "I look for possibilities inside uncertain problems and turn ambitious ideas into practical solutions that can be built, tested and used.",
    skills: [
      "AI creation tools",
      "Creative ideation",
      "Fast learner",
      "Native Chinese",
      "Intermediate English",
      "Intermediate French",
    ],
    note: "Tools should serve ideas—not limit them.",
  },
  repair: {
    eyebrow: "FIX / 02",
    title: "AV Equipment, Repair & Troubleshooting",
    description:
      "I am comfortable with multimedia equipment and computer hardware and software, tracing issues through signals, systems and real-world use until everything is stable again.",
    skills: [
      "AV equipment",
      "Computer hardware",
      "System troubleshooting",
      "Equipment setup",
      "Signal-chain checks",
      "On-site support",
    ],
    note: "Reproduce the issue, narrow the scope, then verify the solution.",
  },
  create: {
    eyebrow: "CREATE / 03",
    title: "Websites, Video & Motion Design",
    description:
      "I take content from concept to finished work—building websites, editing video, creating After Effects motion and using AI to improve production efficiency.",
    skills: [
      "Web development",
      "Video editing",
      "After Effects",
      "Motion design",
      "Digital content",
      "AI-assisted creation",
    ],
    note: "I organize technology, visuals and rhythm into one complete experience.",
  },
};

const zoneOrder: ZoneKey[] = ["mind", "repair", "create"];

const websites = [
  {
    index: "01",
    title: "篮芽 HoopSprout",
    titleEn: "HoopSprout",
    type: "全栈开发个人项目",
    typeEn: "Independent full-stack project",
    url: "https://www.hoopsprout.ca/",
    description:
      "独立设计并开发青少年篮球课程双语平台，基于 Next.js 与 Supabase 实现家长选课、试听申请、机构线索 CRM 和运营后台。",
    descriptionEn:
      "Independently designed and developed a bilingual youth basketball platform with Next.js and Supabase, including class selection, trial requests, lead CRM and an operations dashboard.",
    tags: ["Next.js", "Supabase", "双语平台", "CRM"],
    tagsEn: ["Next.js", "Supabase", "Bilingual platform", "CRM"],
    visual: "hoopsprout",
    image: "/portfolio/hoopsprout-logo.png",
  },
  {
    index: "02",
    title: "ClickStone Media 官网",
    titleEn: "ClickStone Media Website",
    type: "品牌网站设计与搭建",
    typeEn: "Brand website design & build",
    url: "https://clickstonemedia.ca/",
    description:
      "独立完成数字营销公司官网的品牌视觉、服务介绍、案例展示、联系表单与微信二维码，支持电脑端和移动端浏览。",
    descriptionEn:
      "Independently designed and built a responsive digital marketing website, covering brand visuals, services, case studies, a contact form and WeChat QR integration.",
    tags: ["Wix", "Canva", "AI 工具", "响应式设计"],
    tagsEn: ["Wix", "Canva", "AI tools", "Responsive design"],
    visual: "clickstone",
    image: "/portfolio/clickstone.png",
  },
  {
    index: "03",
    title: "CHIN CHINE 餐厅官网",
    titleEn: "CHIN CHINE Restaurant Website",
    type: "多语言餐饮网站",
    typeEn: "Multilingual restaurant website",
    url: "https://www.chinchine.ca/",
    description:
      "独立设计并搭建中英法三语餐厅网站，整合菜单、价格展示、在线点餐、桌面二维码入口与订单系统。",
    descriptionEn:
      "Independently designed and built a Chinese, English and French restaurant website integrating menus, pricing, online ordering, table QR access and the order system.",
    tags: ["Wix", "GloriaFood", "三语网站", "在线点餐"],
    tagsEn: ["Wix", "GloriaFood", "Trilingual website", "Online ordering"],
    visual: "chinchine",
    image: "/portfolio/chinchine-site.png",
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
      "以“石头蜕变为黄金”为核心视觉，独立完成创意策划、分镜、AI 画面生成、动态制作、音效与后期剪辑。",
    descriptionEn:
      "Built around a stone transforming into gold, this film was independently developed from concept and storyboard through AI visuals, motion, sound design and final editing.",
    tags: ["创意策划", "AI 视觉", "动态制作", "后期剪辑"],
    tagsEn: ["Creative direction", "AI visuals", "Motion design", "Editing"],
  },
  {
    index: "02",
    title: "Wakame Sushi 足球主题广告",
    titleEn: "Wakame Sushi Soccer-Themed Ad",
    url: "https://www.youtube.com/watch?v=Sndiv87OZvM",
    embedUrl: "https://www.youtube-nocookie.com/embed/Sndiv87OZvM?autoplay=1&rel=0",
    image: "/portfolio/wakame-ad.jpg",
    description:
      "用足球旋转变成三文鱼刺身，再切换至寿司、啤酒与看球场景，突出餐厅的大屏观赛氛围。",
    descriptionEn:
      "A spinning soccer ball transforms into salmon sashimi before shifting to sushi, beer and game-night scenes that highlight the restaurant’s big-screen atmosphere.",
    tags: ["广告创意", "分镜设计", "AI 画面", "音效剪辑"],
    tagsEn: ["Ad concept", "Storyboarding", "AI visuals", "Sound & editing"],
  },
] as const;

const ui = {
  zh: {
    homeLabel: "返回首页",
    navLabel: "主要导航",
    nav: ["能力", "作品", "方向", "联系"],
    switchLabel: "Switch to English",
    heroTitle: ["创造想法，", "也修好现实。"],
    heroIntro:
      "我是一名多媒体技术创作者，结合网站制作、视频动效、AI 工具与软硬件故障排查，把创意变成可以真正使用的成果。",
    explore: "探索我的能力",
    resume: "快速查看简历",
    avatarAlt: "戴眼镜、双手发光的虚拟人物，头部呈现紫色创意思维云",
    hotspotLabels: {
      mind: "查看创意、AI与语言能力",
      repair: "查看设备维修与故障排查能力",
      create: "查看网站、视频与动效能力",
    },
    hotspotText: { mind: "创意思维", repair: "设备排障", create: "数字创作" },
    interactionHint: "点击发光的头部或双手",
    relatedSkills: "相关技能",
    close: "关闭",
    panelTitle: "认识我的思维与双手",
    panelCopy: "每个发光区域代表一种能力。选择一个区域，看看我如何把想法变成成果。",
    panelKeys: { mind: "头脑", repair: "橙色手", create: "蓝色手" },
    skillsTitle: "想得出来，也做得出来。",
    viewOnCharacter: "在人物上查看 →",
    portfolioTitle: "作品集",
    websiteProjects: "网站项目",
    openWebsite: "打开",
    projectCover: "项目封面",
    visitWebsite: "访问网站 ↗",
    technologies: "使用技术",
    videoProjects: "视频作品",
    play: "播放",
    videoCover: "视频封面",
    playHere: "站内播放",
    creativeAd: "创意广告 / VIDEO",
    production: "制作内容",
    workTitle: "适合我的工作方向",
    roles: [
      ["AV / IT Support Technician", "会议与多媒体设备、现场技术支持、电脑软硬件和系统故障排查。"],
      ["Multimedia Technician", "设备、网站、视频与数字内容之间的跨领域制作和技术支持。"],
      ["Digital Content Producer", "视频剪辑、AE 动效、网页内容和 AI 辅助的多平台视觉制作。"],
    ],
    workNote: "项目案例、工作经历与教育背景将在收到你的具体资料后补充。",
    contactTitle: "有一个需要创意与技术一起解决的问题？",
    contactCopy: "我目前在多伦多寻找多媒体技术、AV/IT 支持与数字内容相关机会。",
    email: "发送邮件",
    phone: "电话",
    phoneLabel: "拨打电话 579 421 0829",
    backToTop: "返回顶部 ↑",
    nowPlaying: "正在播放",
    closeVideo: "关闭视频",
    openYouTube: "在 YouTube 打开 ↗",
  },
  en: {
    homeLabel: "Back to top",
    navLabel: "Primary navigation",
    nav: ["Skills", "Portfolio", "Roles", "Contact"],
    switchLabel: "切换至中文",
    heroTitle: ["I create ideas,", "and fix reality."],
    heroIntro:
      "I’m a multimedia technology creator combining web development, video and motion design, AI tools, and hardware and software troubleshooting to turn ideas into practical, usable results.",
    explore: "Explore my skills",
    resume: "View résumé",
    avatarAlt: "Illustrated portrait of Ryan Gong with a glowing creative mind and hands",
    hotspotLabels: {
      mind: "View creative thinking, AI and language skills",
      repair: "View equipment repair and troubleshooting skills",
      create: "View website, video and motion design skills",
    },
    hotspotText: { mind: "Creative Mind", repair: "Troubleshooting", create: "Digital Creation" },
    interactionHint: "Select the glowing mind or hands",
    relatedSkills: "Related skills",
    close: "Close",
    panelTitle: "Meet my mind and hands",
    panelCopy: "Each glowing area represents a capability. Select one to see how I turn ideas into working results.",
    panelKeys: { mind: "Mind", repair: "Orange hand", create: "Blue hand" },
    skillsTitle: "Ideas in mind. Solutions in hand.",
    viewOnCharacter: "View on the character →",
    portfolioTitle: "Portfolio",
    websiteProjects: "Website projects",
    openWebsite: "Open",
    projectCover: "project cover",
    visitWebsite: "Visit website ↗",
    technologies: "Technologies",
    videoProjects: "Video projects",
    play: "Play",
    videoCover: "video cover",
    playHere: "Play here",
    creativeAd: "CREATIVE AD / VIDEO",
    production: "Production skills",
    workTitle: "Roles I’m a strong fit for",
    roles: [
      ["AV / IT Support Technician", "Conference and multimedia equipment, on-site technical support, computer hardware, software and system troubleshooting."],
      ["Multimedia Technician", "Cross-disciplinary production and technical support connecting equipment, websites, video and digital content."],
      ["Digital Content Producer", "Video editing, After Effects motion, web content and AI-assisted visual production across platforms."],
    ],
    workNote: "Additional work history and education details can be provided with my full résumé.",
    contactTitle: "Have a challenge that needs both creativity and technology?",
    contactCopy: "I’m currently looking for multimedia technology, AV/IT support and digital content opportunities in Toronto.",
    email: "Email",
    phone: "Phone",
    phoneLabel: "Call 579 421 0829",
    backToTop: "Back to top ↑",
    nowPlaying: "NOW PLAYING",
    closeVideo: "Close video",
    openYouTube: "Open on YouTube ↗",
  },
} as const;

export default function Home() {
  const [language, setLanguage] = useState<Language>("zh");
  const [active, setActive] = useState<ZoneKey | null>(null);
  const [activeVideo, setActiveVideo] = useState<(typeof videos)[number] | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const savedLanguage = window.localStorage.getItem("ryan-portfolio-language");
      if (savedLanguage === "zh" || savedLanguage === "en") {
        setLanguage(savedLanguage);
      }
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
  }, [language]);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!activeVideo) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveVideo(null);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [activeVideo]);

  const t = ui[language];
  const localizedZones = language === "zh" ? zones : zonesEn;
  const selected = useMemo(
    () => (active ? localizedZones[active] : null),
    [active, localizedZones],
  );

  const toggleLanguage = () => {
    setLanguage((current) => {
      const next = current === "zh" ? "en" : "zh";
      window.localStorage.setItem("ryan-portfolio-language", next);
      return next;
    });
  };

  const moveCharacter = (event: PointerEvent<HTMLDivElement>) => {
    if (reducedMotion || event.pointerType === "touch") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    setTilt({
      x: ((event.clientX - bounds.left) / bounds.width - 0.5) * 8,
      y: ((event.clientY - bounds.top) / bounds.height - 0.5) * -6,
    });
  };

  return (
    <main className={language === "en" ? "language-en" : undefined}>
      <header className="site-header">
        <a className="brand" href="#top" aria-label={t.homeLabel}>
          <span className="brand-mark" aria-hidden="true" />
          <span>RYAN GONG</span>
        </a>
        <div className="header-actions">
          <nav aria-label={t.navLabel}>
            <a href="#skills">{t.nav[0]}</a>
            <a href="#portfolio">{t.nav[1]}</a>
            <a href="#work">{t.nav[2]}</a>
            <a href="#contact">{t.nav[3]}</a>
          </nav>
          <button
            className="language-toggle"
            type="button"
            onClick={toggleLanguage}
            aria-label={t.switchLabel}
            title={t.switchLabel}
          >
            <span className={language === "zh" ? "is-active" : ""}>中</span>
            <i aria-hidden="true" />
            <span className={language === "en" ? "is-active" : ""}>EN</span>
          </button>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="kicker">RYAN GONG / MULTIMEDIA × TECHNOLOGY × IDEAS</p>
          <h1>
            <span>{t.heroTitle[0]}</span>
            <span>{t.heroTitle[1]}</span>
          </h1>
          <p className="hero-intro">{t.heroIntro}</p>
          <div className="hero-actions">
            <a className="primary-button" href="#explore">
              {t.explore}
            </a>
            <a className="text-button" href="#work">
              {t.resume}
            </a>
          </div>
          <p className="location">Toronto, Canada · Open to opportunities</p>
        </div>

        <div
          className="character-stage"
          id="explore"
          onPointerMove={moveCharacter}
          onPointerLeave={() => setTilt({ x: 0, y: 0 })}
          style={
            {
              "--cursor-x": `${50 + tilt.x * 2.2}%`,
              "--cursor-y": `${48 - tilt.y * 2.2}%`,
            } as CSSProperties
          }
        >
          <div className="ambient-haze" aria-hidden="true" />
          <div className="orbit orbit-one" aria-hidden="true" />
          <div className="orbit orbit-two" aria-hidden="true" />
          <div
            className="character-wrap"
            style={{
              transform: `perspective(900px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
            }}
          >
            <div className="character-float">
              <Image
                className="character"
                src="/virtual-avatar-v2-illustrated.png"
                alt={t.avatarAlt}
                width={887}
                height={1774}
                priority
              />

              <button
                className={`hotspot hotspot-mind ${active === "mind" ? "is-active" : ""}`}
                type="button"
                aria-label={t.hotspotLabels.mind}
                aria-pressed={active === "mind"}
                onClick={() => setActive(active === "mind" ? null : "mind")}
              >
                <span>{t.hotspotText.mind}</span>
              </button>
              <button
                className={`hotspot hotspot-repair ${active === "repair" ? "is-active" : ""}`}
                type="button"
                aria-label={t.hotspotLabels.repair}
                aria-pressed={active === "repair"}
                onClick={() => setActive(active === "repair" ? null : "repair")}
              >
                <span>{t.hotspotText.repair}</span>
              </button>
              <button
                className={`hotspot hotspot-create ${active === "create" ? "is-active" : ""}`}
                type="button"
                aria-label={t.hotspotLabels.create}
                aria-pressed={active === "create"}
                onClick={() => setActive(active === "create" ? null : "create")}
              >
                <span>{t.hotspotText.create}</span>
              </button>
            </div>
          </div>
          <p className="interaction-hint">{t.interactionHint}</p>
        </div>

        <aside className={`skill-panel ${selected ? "has-selection" : ""}`} aria-live="polite">
          {selected ? (
            <>
              <div className={`panel-glow panel-glow-${active}`} aria-hidden="true" />
              <p className="panel-eyebrow">{selected.eyebrow}</p>
              <h2>{selected.title}</h2>
              <p>{selected.description}</p>
              <ul className="skill-chips" aria-label={t.relatedSkills}>
                {selected.skills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
              <blockquote>{selected.note}</blockquote>
              <button className="panel-close" type="button" onClick={() => setActive(null)}>
                {t.close}
              </button>
            </>
          ) : (
            <div className="panel-empty">
              <span className="panel-number">01—03</span>
              <h2>{t.panelTitle}</h2>
              <p>{t.panelCopy}</p>
              <div className="panel-keys">
                {zoneOrder.map((key) => (
                  <button key={key} type="button" onClick={() => setActive(key)}>
                    {t.panelKeys[key]}
                  </button>
                ))}
              </div>
            </div>
          )}
        </aside>
      </section>

      <section className="skills-section" id="skills">
        <div className="section-heading">
          <p className="kicker">THREE WAYS I WORK</p>
          <h2>{t.skillsTitle}</h2>
        </div>
        <div className="capability-grid">
          {zoneOrder.map((key, index) => {
            const zone = localizedZones[key];
            return (
              <button
                className={`capability-card capability-${key}`}
                type="button"
                key={key}
                onClick={() => {
                  setActive(key);
                  document.getElementById("explore")?.scrollIntoView({
                    behavior: reducedMotion ? "auto" : "smooth",
                  });
                }}
              >
                <span className="card-index">0{index + 1}</span>
                <span className="card-title">{zone.title}</span>
                <span className="card-copy">{zone.description}</span>
                <span className="card-link">{t.viewOnCharacter}</span>
              </button>
            );
          })}
        </div>
      </section>

      <section className="portfolio-section" id="portfolio">
        <div className="section-heading portfolio-heading">
          <div>
            <p className="kicker">SELECTED WORK</p>
            <h2>{t.portfolioTitle}</h2>
          </div>
          <p className="portfolio-summary">
            03 WEBSITES
            <br />
            02 FILMS
          </p>
        </div>

        <div className="portfolio-group-heading">
          <span>{t.websiteProjects}</span>
          <span>WEB / 01—03</span>
        </div>
        <div className="website-grid">
          {websites.map((project) => {
            const projectTitle = language === "zh" ? project.title : project.titleEn;
            const projectType = language === "zh" ? project.type : project.typeEn;
            const projectDescription =
              language === "zh" ? project.description : project.descriptionEn;
            const projectTags = language === "zh" ? project.tags : project.tagsEn;
            return (
            <article className="website-card" key={project.url}>
              <a
                className={`website-preview preview-${project.visual}`}
                href={project.url}
                target="_blank"
                rel="noreferrer"
                aria-label={`${t.openWebsite} ${projectTitle}`}
              >
                <div className="browser-chrome" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                  <small>{new URL(project.url).hostname}</small>
                </div>
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={`${projectTitle} ${t.projectCover}`}
                    fill
                    sizes="(max-width: 760px) 100vw, 33vw"
                  />
                ) : (
                  <div className="hoopsprout-visual">
                    <span className="court-line court-line-one" />
                    <span className="court-line court-line-two" />
                    <span className="basketball-mark" aria-hidden="true" />
                    <strong>篮芽</strong>
                    <small>HOOPSPROUT</small>
                  </div>
                )}
                <span className="visit-project">{t.visitWebsite}</span>
              </a>
              <div className="project-meta">
                <span>{project.index}</span>
                <span>{projectType}</span>
              </div>
              <h3>
                <a href={project.url} target="_blank" rel="noreferrer">
                  {projectTitle}
                </a>
              </h3>
              <p>{projectDescription}</p>
              <ul className="project-tags" aria-label={`${projectTitle} ${t.technologies}`}>
                {projectTags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            </article>
            );
          })}
        </div>

        <div className="portfolio-group-heading video-group-heading">
          <span>{t.videoProjects}</span>
          <span>FILM / 01—02</span>
        </div>
        <div className="video-grid">
          {videos.map((video) => {
            const videoTitle = language === "zh" ? video.title : video.titleEn;
            const videoDescription =
              language === "zh" ? video.description : video.descriptionEn;
            const videoTags = language === "zh" ? video.tags : video.tagsEn;
            return (
            <article className="video-card" key={video.url}>
              <button
                className="video-preview"
                type="button"
                onClick={() => setActiveVideo(video)}
                aria-label={`${t.play} ${videoTitle}`}
              >
                <Image
                  src={video.image}
                  alt={`${videoTitle} ${t.videoCover}`}
                  fill
                  sizes="(max-width: 760px) 100vw, 50vw"
                />
                <span className="play-button" aria-hidden="true">
                  <i />
                </span>
                <span className="play-label">{t.playHere}</span>
              </button>
              <div className="project-meta">
                <span>{video.index}</span>
                <span>{t.creativeAd}</span>
              </div>
              <h3>{videoTitle}</h3>
              <p>{videoDescription}</p>
              <ul className="project-tags" aria-label={`${videoTitle} ${t.production}`}>
                {videoTags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            </article>
            );
          })}
        </div>
      </section>

      <section className="work-section" id="work">
        <div className="section-heading">
          <p className="kicker">WHERE I CAN CONTRIBUTE</p>
          <h2>{t.workTitle}</h2>
        </div>
        <div className="roles">
          {t.roles.map((role, index) => (
            <article key={role[0]}>
              <span>0{index + 1}</span>
              <div>
                <h3>{role[0]}</h3>
                <p>{role[1]}</p>
              </div>
            </article>
          ))}
        </div>
        <p className="placeholder-note">{t.workNote}</p>
      </section>

      <section className="contact-section" id="contact">
        <p className="kicker">LET&apos;S CONNECT</p>
        <h2>{t.contactTitle}</h2>
        <p>{t.contactCopy}</p>
        <div className="contact-placeholder">
          <a href="mailto:GONGRUI001@GMAIL.COM">
            {t.email} · GONGRUI001@GMAIL.COM
          </a>
          <a href="tel:+15794210829" aria-label={t.phoneLabel}>
            {t.phone} · +1 (579) 421-0829
          </a>
        </div>
      </section>

      <footer>
        <span>Ryan Gong · Interactive portfolio · 2026</span>
        <a href="#top">{t.backToTop}</a>
      </footer>

      {activeVideo ? (
        <div
          className="video-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="video-modal-title"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setActiveVideo(null);
          }}
        >
          <div className="video-dialog">
            <div className="video-dialog-header">
              <div>
                <span>{t.nowPlaying}</span>
                <h2 id="video-modal-title">
                  {language === "zh" ? activeVideo.title : activeVideo.titleEn}
                </h2>
              </div>
              <button type="button" onClick={() => setActiveVideo(null)} aria-label={t.closeVideo}>
                {t.close} ×
              </button>
            </div>
            <div className="video-frame">
              <iframe
                src={activeVideo.embedUrl}
                title={language === "zh" ? activeVideo.title : activeVideo.titleEn}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
            <a href={activeVideo.url} target="_blank" rel="noreferrer">
              {t.openYouTube}
            </a>
          </div>
        </div>
      ) : null}
    </main>
  );
}
