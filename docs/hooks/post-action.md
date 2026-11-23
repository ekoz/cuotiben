# 写后快速检查

每次使用 Write / Edit / MultiEdit 修改文件后，宿主自动执行：

1. `docs/harness/linters/invariant-check.py`
   - 当前 greenfield 基线：尚无机器可校验的不变量，输出状态后成功退出。
   - 内容规则（中文、学科/学期组织、六字段完整）在目录结构与命名规范确认后再固化为脚本检查。
2. `docs/harness/linters/spec-sync-check.py`
   - 检查 `docs/specs/active/` 下各 feature 的 `spec.md`、`tasks.md`、`verify-report.md` 是否缺失或为空。
   - 仅 warning，不阻断写入。

## 人工补查要点

- 新增或修改错题条目时，确认六个字段齐全：题目、我的答案、正确答案、错因分析、订正、复习日期。
- 确认条目位于正确的「学科 → 学期」目录下。
- 修改 `docs/harness/` 约束或 `docs/knowledge/` 事实时，检查索引是否需要同步更新。
- 未确认的信息保留 `<!-- TODO: 待确认 -->`，不要用推测填充。
- 有活跃需求时，确认代码改动与 `tasks.md` checkpoint、`verify-report.md` 证据保持对账。
