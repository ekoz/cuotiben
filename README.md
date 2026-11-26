# 个人纠错本

[![Deploy VitePress site to Pages](https://github.com/ekoz/cuotiben/actions/workflows/deploy.yml/badge.svg?branch=master)](https://github.com/ekoz/cuotiben/actions/workflows/deploy.yml)
[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-online-brightgreen?logo=githubpages&logoColor=white)](https://ekozhan.com/cuotiben/)
[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D24-339933?logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![VitePress](https://img.shields.io/badge/VitePress-static%20site-646cff?logo=vite&logoColor=white)](https://vitepress.dev/)

长期累积语文、数学、英语错题的静态站点，基于 VitePress 构建。

在线站点：<https://ekozhan.com/cuotiben/>

## 特点

- 按「学科 → 学期 → 每题一文件」组织，侧边栏从 `notes/` 目录自动生成。
- 数学公式用 KaTeX 渲染：行内 `$...$`，独立公式 `$$ ... $$`。
- 本地全文搜索，中文按单字切分，支持前缀匹配与模糊匹配。
- 纯静态站点，无后端、无数据库，构建产物可直接托管。

## 目录结构

| 路径 | 说明 |
|---|---|
| `notes/` | 站点内容根（VitePress `srcDir`），按学科、学期分目录 |
| `notes/_templates/错题模板.md` | 新建错题时复制使用的模板，不参与构建 |
| `notes/<学科>/index.md` | 学科首页 |
| `.vitepress/config.mts` | 站点配置：导航、侧边栏、搜索、公式插件 |
| `docs/` | 项目约束、知识库与需求工件，不参与站点构建 |

## 本地使用

要求 Node.js >= 24、npm >= 11。

```bash
npm install
npm run docs:dev      # 本地预览 http://localhost:5173/
npm run docs:build    # 构建到 .vitepress/dist
npm run docs:preview  # 预览构建产物
```

## 添加一道错题

1. 复制 `notes/_templates/错题模板.md` 到对应学期目录，命名为 `YYYY-MM-DD-短标题.md`。
2. 按固定结构填写：题目 → 解题思路 → 同类型练习 5 道 → 答案（答案放在同文件末尾）。
3. 页面末尾用引用块记录录入日期：

   ```markdown
   > 录入日期：YYYY-MM-DD
   ```

4. 作文按自身结构（正文 + 写作思路），不套用错题结构。

> [!TIP]
> 导航和侧边栏由目录结构自动推导，新增文件后无需修改配置；页面也不显示学科、学期等元信息。

## 部署

推送 `master` 分支触发 GitHub Actions，构建产物发布到 GitHub Pages；也可在 Actions 页面手动触发。构建时 `VITEPRESS_BASE` 自动设为仓库名对应的子路径。

## 协作入口

- [AGENTS.md](AGENTS.md)：项目约束与常用命令（AI 协作入口）。
- [docs/harness/index.md](docs/harness/index.md)：工程约束入口。
- [docs/knowledge/index.md](docs/knowledge/index.md)：知识索引，按需加载。
- `docs/specs/active/`、`docs/specs/completed/`：当前与已归档需求工件。
- HelixHarness 命令：`/helix:init`、`/helix:propose`、`/helix:apply`、`/helix:archive`、`/helix:ut`、`/helix:bug-fix`、`/helix:update`。
