#!/bin/bash
# 批量渲染 34 条课程宣传片（含云健男声配音）
# 运行: bash scripts/render-all-promos.sh

cd "$(dirname "$0")/.."
mkdir -p out/promos

PROMOS=(
  Promo-1-1 Promo-1-2
  Promo-2-1 Promo-2-2 Promo-2-3 Promo-2-4 Promo-2-5 Promo-2-6 Promo-2-7 Promo-2-8 Promo-2-9
  Promo-2-10 Promo-2-11 Promo-2-12 Promo-2-13 Promo-2-14 Promo-2-15 Promo-2-16 Promo-2-17 Promo-2-18 Promo-2-19
  Promo-3-1 Promo-3-2 Promo-3-3 Promo-3-4 Promo-3-5 Promo-3-6
  Promo-4-1 Promo-4-2 Promo-4-3 Promo-4-4 Promo-4-5 Promo-4-6
  Promo-5-1
)

TOTAL=${#PROMOS[@]}
COUNT=0

for P in "${PROMOS[@]}"; do
  COUNT=$((COUNT + 1))
  ID=$(echo "$P" | sed 's/Promo-//' | tr '[:upper:]' '[:lower:]')
  OUTPUT="out/promos/promo-${ID}.mp4"
  echo ""
  echo "=== [$COUNT/$TOTAL] Rendering $P -> $OUTPUT ==="
  npx remotion render src/index.ts "$P" "$OUTPUT" --concurrency=4 --overwrite
  if [ $? -eq 0 ]; then
    echo "  ✓ $P done"
  else
    echo "  ✗ $P FAILED"
  fi
done

echo ""
echo "=== 全部渲染完成！$TOTAL/$TOTAL ==="