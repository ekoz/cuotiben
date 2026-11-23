# 个人纠错本

## 项目概述

- **业务领域**：个人学习 / 错题管理，长期累积语文、数学、英语错题。
- **技术栈**：Node.js + VitePress + npm（静态站点，无数据库）。
- **架构风格**：静态站点（VitePress 文档站），内容位于 `notes/`。

## 导航

- `notes/`：站点内容根（VitePress `srcDir`），按「学科 → 学期」组织。
- `notes/_templates/错题模板.md`：新错题模板。
- `docs/harness/index.md`：项目约束入口。
- `docs/knowledge/index.md`：知识入口，按「文件/目录、定位、加载时机」选择相关叶子。
- `docs/specs/active/<feature>/`：当前需求（Propose 生成 `spec.md`、`tasks.md`，Apply 生成 `verify-report.md`）。
- `docs/specs/completed/<feature>/`：通过 Archive 门禁后归档的三份工件。

## 关键约束

- 内容语言为中文。
- 内容按「学科（语文/数学/英语）→ 学期（如 2026-秋）→ 每题一文件」组织。
- 错题固定结构：题目、解题思路、同类型练习 5 道、答案（答案放在同一文件末尾）。
- 页面不显示学科、学期等元信息；录入日期以引用块放在页面末尾。
- 作文条目按自身结构（正文 + 写作思路），不套用错题结构。
- 技术基线为 VitePress 静态站点 + npm；引入后端、数据库或其他新运行时须先经 Propose 评审。

## 常用命令

- 本地预览：`npm run docs:dev`（http://localhost:5173/）
- 构建站点：`npm run docs:build`
- 预览构建产物：`npm run docs:preview`
- HelixHarness：`/helix:init`、`/helix:propose`、`/helix:apply`、`/helix:archive`、`/helix:ut`、`/helix:bug-fix`、`/helix:update`
- `propose --loop` 按顺序执行 Propose → Apply → Archive

## Agent 工作规则

读取项目索引，按任务范围加载约束和知识。完整命令以插件 `commands/` 为准。
保留用户已有内容；实现、验证和归档必须有实际工件证据。Apply 内部执行 Standards 与 Spec 双轴评审。
归档前展示知识修改建议并按用户确认的精确范围更新；提交和推送遵循当前命令的授权规则。
