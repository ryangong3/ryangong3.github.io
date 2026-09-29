import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders Ryan Gong's interactive portfolio", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Ryan Gong \| Social Media Specialist<\/title>/i);
  assert.match(html, /RYAN GONG/);
  assert.match(html, /SOCIAL MEDIA SPECIALIST/);
  assert.match(html, /作品集/);
  assert.match(html, /HoopSprout/);
  assert.match(html, /ClickStone Media/);
  assert.match(html, /CHIN CHINE/);
  assert.match(html, /mailto:GONGRUI001@GMAIL\.COM/i);
  assert.match(html, /tel:\+15794210829/i);
  assert.match(html, /virtual-avatar-v2-illustrated\.png/);
});

test("keeps bilingual interactions and real project links in source", async () => {
  const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");

  assert.match(page, /type Language = "zh" \| "en"/);
  assert.match(page, /type ZoneKey = "mind" \| "repair" \| "create"/);
  assert.match(page, /ryan-portfolio-language/);
  assert.match(page, /window\.navigator\.language\.toLowerCase\(\)/);
  assert.match(page, /browserLanguage\.startsWith\("zh"\) \? "zh" : "en"/);
  assert.match(page, /saved === "zh" \|\| saved === "en"/);
  assert.match(page, /Social Strategy & Content Planning/);
  assert.match(page, /Social Media Specialist/);
  assert.match(page, /Managed Douyin, blogs, websites and other digital channels/);
  assert.doesNotMatch(page, /9356-6776 Québec Inc\./);
  assert.doesNotMatch(page, /Gansu Daercheng Human Resources Service Co\., Ltd\./);
  assert.doesNotMatch(page, /Lanzhou University Public Facilities Service Center/);
  assert.doesNotMatch(page, /Passport No\./i);
  assert.doesNotMatch(page, /Date of Birth/i);
  assert.match(page, /平台运营与数据复盘/);
  assert.match(page, /https:\/\/www\.hoopsprout\.ca\//);
  assert.match(page, /https:\/\/clickstonemedia\.ca\//);
  assert.match(page, /https:\/\/www\.chinchine\.ca\//);
  assert.match(page, /youtube-nocookie\.com\/embed\/aZq9Er5NF7k/);
  assert.match(page, /youtube-nocookie\.com\/embed\/Sndiv87OZvM/);
  assert.match(page, /setActive\(key\)/);
  assert.match(page, /setHasInteracted\(true\)/);
  assert.match(page, /mobile-node-card/);
  assert.match(page, /energy-system/);
  assert.match(page, /onClick=\{\(\) => setActiveVideo\(video\)\}/);
});
