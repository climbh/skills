#!/usr/bin/env bash
set -euo pipefail

usage() {
  echo "Usage: sync_docs.sh [SOURCE_DOCS_DIR] [SKILL_DIR]"
  echo "Defaults:"
  echo "  SOURCE_DOCS_DIR=/Users/Ai/TRAE/上下文文档/jn-ve-global"
  echo "  SKILL_DIR=parent directory of this script"
}

if [[ "${1:-}" == "--help" || "${1:-}" == "-h" ]]; then
  usage
  exit 0
fi

source_dir="${1:-/Users/Ai/TRAE/上下文文档/jn-ve-global}"
skill_dir="${2:-$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)}"
reference_dir="${skill_dir}/references"

if [[ ! -d "${source_dir}" ]]; then
  echo "Documentation directory not found: ${source_dir}" >&2
  exit 1
fi

mkdir -p "${reference_dir}"
find "${source_dir}" -maxdepth 1 -type f -name '*.md' ! -name 'README.md' -exec cp {} "${reference_dir}/" \;
echo "Synced Markdown documentation from ${source_dir} to ${reference_dir}"
