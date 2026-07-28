"use client";

import Image from "next/image";
import type { CSSProperties, PointerEvent } from "react";
import { useEffect, useMemo, useState } from "react";

type ZoneKey = "mind" | "repair" | "create";

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

const zoneOrder: ZoneKey[] = ["mind", "repair", "create"];

const websites = [
  {
    index: "01",
    title: "篮芽 HoopSprout",
    type: "全栈开发个人项目",
    url: "https://www.hoopsprout.ca/",
    description:
      "独立设计并开发青少年篮球课程双语平台，基于 Next.js 与 Supabase 实现家长选课、试听申请、机构线索 CRM 和运营后台。",
    tags: ["Next.js", "Supabase", "双语平台", "CRM"],
    visual: "hoopsprout",
    image: null,
  },
  {
    index: "02",
    title: "ClickStone Media 官网",
    type: "品牌网站设计与搭建",
    url: "https://clickstonemedia.ca/",
    description:
      "独立完成数字营销公司官网的品牌视觉、服务介绍、案例展示、联系表单与微信二维码，支持电脑端和移动端浏览。",
    tags: ["Wix", "Canva", "AI 工具", "响应式设计"],
    visual: "clickstone",
    image: "/portfolio/clickstone.png",
  },
  {
    index: "03",
    title: "CHIN CHINE 餐厅官网",
    type: "多语言餐饮网站",
    url: "https://www.chinchine.ca/",
    description:
      "独立设计并搭建中英法三语餐厅网站，整合菜单、价格展示、在线点餐、桌面二维码入口与订单系统。",
    tags: ["Wix", "GloriaFood", "三语网站", "在线点餐"],
    visual: "chinchine",
    image: "/portfolio/chinchine.png",
  },
] as const;

const videos = [
  {
    index: "01",
    title: "品牌宣传片",
    url: "https://www.youtube.com/watch?v=aZq9Er5NF7k",
    embedUrl: "https://www.youtube-nocookie.com/embed/aZq9Er5NF7k?autoplay=1&rel=0",
    image: "/portfolio/brand-film.jpg",
    description:
      "以“石头蜕变为黄金”为核心视觉，独立完成创意策划、分镜、AI 画面生成、动态制作、音效与后期剪辑。",
    tags: ["创意策划", "AI 视觉", "动态制作", "后期剪辑"],
  },
  {
    index: "02",
    title: "Wakame Sushi 足球主题广告",
    url: "https://www.youtube.com/watch?v=Sndiv87OZvM",
    embedUrl: "https://www.youtube-nocookie.com/embed/Sndiv87OZvM?autoplay=1&rel=0",
    image: "/portfolio/wakame-ad.jpg",
    description:
      "用足球旋转变成三文鱼刺身，再切换至寿司、啤酒与看球场景，突出餐厅的大屏观赛氛围。",
    tags: ["广告创意", "分镜设计", "AI 画面", "音效剪辑"],
  },
] as const;

export default function Home() {
  const [active, setActive] = useState<ZoneKey | null>(null);
  const [activeVideo, setActiveVideo] = useState<(typeof videos)[number] | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

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

  const selected = useMemo(() => (active ? zones[active] : null), [active]);

  const moveCharacter = (event: PointerEvent<HTMLDivElement>) => {
    if (reducedMotion || event.pointerType === "touch") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    setTilt({
      x: ((event.clientX - bounds.left) / bounds.width - 0.5) * 8,
      y: ((event.clientY - bounds.top) / bounds.height - 0.5) * -6,
    });
  };

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="返回首页">
          <span className="brand-mark" aria-hidden="true" />
          <span>CREATIVE TECHNOLOGIST</span>
        </a>
        <nav aria-label="主要导航">
          <a href="#skills">能力</a>
          <a href="#portfolio">作品</a>
          <a href="#work">方向</a>
          <a href="#contact">联系</a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="kicker">MULTIMEDIA × TECHNOLOGY × IDEAS</p>
          <h1>
            <span>创造想法，</span>
            <span>也修好现实。</span>
          </h1>
          <p className="hero-intro">
            我是一名多媒体技术创作者，结合网站制作、视频动效、AI 工具与软硬件故障排查，
            把创意变成可以真正使用的成果。
          </p>
          <div className="hero-actions">
            <a className="primary-button" href="#explore">
              探索我的能力
            </a>
            <a className="text-button" href="#work">
              快速查看简历
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
                alt="戴眼镜、双手发光的虚拟人物，头部呈现紫色创意思维云"
                width={887}
                height={1774}
                priority
              />

              <button
                className={`hotspot hotspot-mind ${active === "mind" ? "is-active" : ""}`}
                type="button"
                aria-label="查看创意、AI与语言能力"
                aria-pressed={active === "mind"}
                onClick={() => setActive(active === "mind" ? null : "mind")}
              >
                <span>创意思维</span>
              </button>
              <button
                className={`hotspot hotspot-repair ${active === "repair" ? "is-active" : ""}`}
                type="button"
                aria-label="查看设备维修与故障排查能力"
                aria-pressed={active === "repair"}
                onClick={() => setActive(active === "repair" ? null : "repair")}
              >
                <span>设备排障</span>
              </button>
              <button
                className={`hotspot hotspot-create ${active === "create" ? "is-active" : ""}`}
                type="button"
                aria-label="查看网站、视频与动效能力"
                aria-pressed={active === "create"}
                onClick={() => setActive(active === "create" ? null : "create")}
              >
                <span>数字创作</span>
              </button>
            </div>
          </div>
          <p className="interaction-hint">点击发光的头部或双手</p>
        </div>

        <aside className={`skill-panel ${selected ? "has-selection" : ""}`} aria-live="polite">
          {selected ? (
            <>
              <div className={`panel-glow panel-glow-${active}`} aria-hidden="true" />
              <p className="panel-eyebrow">{selected.eyebrow}</p>
              <h2>{selected.title}</h2>
              <p>{selected.description}</p>
              <ul className="skill-chips" aria-label="相关技能">
                {selected.skills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
              <blockquote>{selected.note}</blockquote>
              <button className="panel-close" type="button" onClick={() => setActive(null)}>
                关闭
              </button>
            </>
          ) : (
            <div className="panel-empty">
              <span className="panel-number">01—03</span>
              <h2>认识我的思维与双手</h2>
              <p>每个发光区域代表一种能力。选择一个区域，看看我如何把想法变成成果。</p>
              <div className="panel-keys">
                {zoneOrder.map((key) => (
                  <button key={key} type="button" onClick={() => setActive(key)}>
                    {key === "mind" ? "头脑" : key === "repair" ? "橙色手" : "蓝色手"}
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
          <h2>想得出来，也做得出来。</h2>
        </div>
        <div className="capability-grid">
          {zoneOrder.map((key, index) => {
            const zone = zones[key];
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
                <span className="card-link">在人物上查看 →</span>
              </button>
            );
          })}
        </div>
      </section>

      <section className="portfolio-section" id="portfolio">
        <div className="section-heading portfolio-heading">
          <div>
            <p className="kicker">SELECTED WORK</p>
            <h2>从想法到上线。</h2>
          </div>
          <p className="portfolio-summary">
            03 WEBSITES
            <br />
            02 FILMS
          </p>
        </div>

        <div className="portfolio-group-heading">
          <span>网站项目</span>
          <span>WEB / 01—03</span>
        </div>
        <div className="website-grid">
          {websites.map((project) => (
            <article className="website-card" key={project.title}>
              <a
                className={`website-preview preview-${project.visual}`}
                href={project.url}
                target="_blank"
                rel="noreferrer"
                aria-label={`打开 ${project.title} 网站`}
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
                    alt={`${project.title} 项目封面`}
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
                <span className="visit-project">访问网站 ↗</span>
              </a>
              <div className="project-meta">
                <span>{project.index}</span>
                <span>{project.type}</span>
              </div>
              <h3>
                <a href={project.url} target="_blank" rel="noreferrer">
                  {project.title}
                </a>
              </h3>
              <p>{project.description}</p>
              <ul className="project-tags" aria-label={`${project.title} 使用技术`}>
                {project.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="portfolio-group-heading video-group-heading">
          <span>视频作品</span>
          <span>FILM / 01—02</span>
        </div>
        <div className="video-grid">
          {videos.map((video) => (
            <article className="video-card" key={video.title}>
              <button
                className="video-preview"
                type="button"
                onClick={() => setActiveVideo(video)}
                aria-label={`播放 ${video.title}`}
              >
                <Image
                  src={video.image}
                  alt={`${video.title} 视频封面`}
                  fill
                  sizes="(max-width: 760px) 100vw, 50vw"
                />
                <span className="play-button" aria-hidden="true">
                  <i />
                </span>
                <span className="play-label">站内播放</span>
              </button>
              <div className="project-meta">
                <span>{video.index}</span>
                <span>创意广告 / VIDEO</span>
              </div>
              <h3>{video.title}</h3>
              <p>{video.description}</p>
              <ul className="project-tags" aria-label={`${video.title} 制作内容`}>
                {video.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="work-section" id="work">
        <div className="section-heading">
          <p className="kicker">WHERE I CAN CONTRIBUTE</p>
          <h2>适合我的工作方向</h2>
        </div>
        <div className="roles">
          <article>
            <span>01</span>
            <div>
              <h3>AV / IT Support Technician</h3>
              <p>会议与多媒体设备、现场技术支持、电脑软硬件和系统故障排查。</p>
            </div>
          </article>
          <article>
            <span>02</span>
            <div>
              <h3>Multimedia Technician</h3>
              <p>设备、网站、视频与数字内容之间的跨领域制作和技术支持。</p>
            </div>
          </article>
          <article>
            <span>03</span>
            <div>
              <h3>Digital Content Producer</h3>
              <p>视频剪辑、AE 动效、网页内容和 AI 辅助的多平台视觉制作。</p>
            </div>
          </article>
        </div>
        <p className="placeholder-note">
          项目案例、工作经历与教育背景将在收到你的具体资料后补充。
        </p>
      </section>

      <section className="contact-section" id="contact">
        <p className="kicker">LET&apos;S CONNECT</p>
        <h2>有一个需要创意与技术一起解决的问题？</h2>
        <p>我目前在多伦多寻找多媒体技术、AV/IT 支持与数字内容相关机会。</p>
        <div className="contact-placeholder">
          <span>邮箱与 LinkedIn 待补充</span>
          <span>PDF 简历准备中</span>
        </div>
      </section>

      <footer>
        <span>Interactive portfolio · 2026</span>
        <a href="#top">返回顶部 ↑</a>
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
                <span>NOW PLAYING</span>
                <h2 id="video-modal-title">{activeVideo.title}</h2>
              </div>
              <button type="button" onClick={() => setActiveVideo(null)} aria-label="关闭视频">
                关闭 ×
              </button>
            </div>
            <div className="video-frame">
              <iframe
                src={activeVideo.embedUrl}
                title={activeVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
            <a href={activeVideo.url} target="_blank" rel="noreferrer">
              在 YouTube 打开 ↗
            </a>
          </div>
        </div>
      ) : null}
    </main>
  );
}
