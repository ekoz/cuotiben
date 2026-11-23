# Hooks 机制总览

HelixHarness 的 Hook 分为三类，职责不同，不可混用。

## 1. Runtime hooks（宿主执行）

由宿主在运行时触发的自动检查，配置写入项目设置文件：

- 宿主: Claude Code
- 设置文件: `.claude/settings.json`
- 事件: `PostToolUse`，matcher `Write|Edit|MultiEdit`
- 行为: 每次写文件后串行运行两个 linter
  - `docs/harness/linters/invariant-check.py`
  - `docs/harness/linters/spec-sync-check.py`
- 实现: 由插件脚本 `scripts/project_linter.py` 调用，解释器在合并时绑定为 preflight 验证过的 Python 3.10+。

Runtime hooks 只做快速提示，不替代 Apply/Archive 的验证门禁。

## 2. Workflow gates（命令内执行）

由 `/helix:apply`、`/helix:archive` 在需求工作流内执行，证据写入
`docs/specs/active/{feature}/verify-report.md`。Init 不创建任何 feature 工件，也不生成独立的
`docs/harness/quality-gates/`。

## 3. Review checklists（评审使用）

供代码评审与自检使用的人工清单，见 [cr-checklist.md](cr-checklist.md)；
写后快速检查要点见 [post-action.md](post-action.md)。

## 文件索引

| 文件 | 定位 | 加载时机 |
|------|------|----------|
| [post-action.md](post-action.md) | 写后自动检查说明与人工补查要点 | 修改文件、回答「检查」类问题时 |
| [cr-checklist.md](cr-checklist.md) | CR 检查清单 | 代码评审、Apply 双轴评审前 |
