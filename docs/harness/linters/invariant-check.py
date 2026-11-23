#!/usr/bin/env python3
"""HelixHarness invariant check for a greenfield project.

No machine-checkable invariants have been confirmed yet. The content rules in
docs/harness/index.md (C-001 .. C-005) need a stable content directory layout
before they can be enforced by a script; until then this linter reports the
status and exits successfully so the post-write hook never blocks work.
"""
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[3]


def main() -> int:
    print("=== HelixHarness invariant check ===")
    print(f"project root: {ROOT}")
    print("No invariant rules configured yet; nothing to check.")
    print("Add checks here after content paths and naming rules are confirmed.")
    print("=== invariant check complete ===")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
