interface SplitPosition {
  startY: number;
  height: number;
}

interface SplitOptions {
  mode: SplitMode;
  height: number;
  overlap: number;
  totalHeight: number;
}

interface ElementMeasure {
  top: number;
  height: number;
}

/**
 * 获取元素位置信息
 * @param container 容器元素
 * @param mode 分割模式
 * @returns 元素位置信息数组
 */
export function getElementMeasures(container: HTMLElement, mode: SplitMode): ElementMeasure[] {
  if (mode === 'hr') {
    // 查找所有 hr 元素的位置
    const hrs = container.querySelectorAll('hr');
    return Array.from(hrs).map(hr => {
      const rect = hr.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      return {
        top: rect.top - containerRect.top,
        height: rect.height,
      };
    });
  } else if (mode === 'auto') {
    // 查找所有段落元素的位置
    const paragraphs = Array.from(container.find('.export-image-markdown>div')!.children);
    const containerRect = container.getBoundingClientRect();

    return paragraphs.map((p, index) => {
      const rect = p.getBoundingClientRect();
      const currentTop = rect.top - containerRect.top;

      if (index < paragraphs.length - 1) {
        // 如果不是最后一个元素，高度取到下一个元素的顶部
        const nextRect = paragraphs[index + 1].getBoundingClientRect();
        const nextTop = nextRect.top - containerRect.top;
        return {
          top: currentTop,
          height: nextTop - currentTop,
        };
      } else {
        // 最后一个元素使用其实际高度
        return {
          top: currentTop,
          height: rect.height,
        };
      }
    });
  }
  return [];
}

/**
 * 计算分割位置
 * @param options 分割选项
 * @param elements 元素测量数据，仅在 hr 和 auto 模式下需要
 * @returns 分割位置数组
 */
export function calculateSplitPositions(
  options: SplitOptions,
  elements?: ElementMeasure[],
): SplitPosition[] {
  const { mode, height, overlap, totalHeight } = options;
  const positions: SplitPosition[] = [];
  if (mode === 'hr' && elements) {
    // 按分隔线切割
    let lastY = 0;
    elements.forEach((el, index) => {
      const currentY = el.top;
      if (index === 0) {
        positions.push({ startY: 0, height: currentY });
      } else {
        positions.push({ startY: lastY, height: currentY - lastY });
      }
      lastY = currentY;
    });
    // 添加最后一部分
    if (lastY < totalHeight) {
      positions.push({ startY: lastY, height: totalHeight - lastY });
    }
  } else if (mode === 'auto' && elements) {
    // 按段落自动切割
    let currentStartY = 0;
    let currentHeight = 0;

    for (let i = 0; i < elements.length - 1; i++) {
      const item = elements[i];
      currentHeight += item.height + (i === 0 ? item.top : 0);
      if (currentHeight >= height) {
        positions.push({ startY: currentStartY, height: currentHeight });
        currentStartY += currentHeight;
        currentHeight = 0;
        continue;
      }
      const delta = height - currentHeight;
      if (delta < elements[i + 1].height / 2) {
        positions.push({ startY: currentStartY, height: currentHeight });
        currentStartY += currentHeight;
        currentHeight = 0;
      }
    };
    // 添加最后一部分
    if (currentStartY < totalHeight) {
      positions.push({ startY: currentStartY, height: totalHeight - currentStartY });
    }
  } else {
    // 固定高度模式
    // 计算最小分割高度：重叠高度 + 50px
    const minSplitHeight = 2 * overlap + 50;
    // 使用设置的高度和最小高度中的较大值
    const effectiveHeight = Math.max(height, minSplitHeight);
    const firstPageHeight = effectiveHeight;
    const remainingHeight = totalHeight - firstPageHeight;
    const additionalPages = Math.max(0, Math.ceil(remainingHeight / (effectiveHeight - overlap * 2)));

    // 第一页
    positions.push({ startY: 0, height: firstPageHeight });
    let lastY = firstPageHeight;
    // 后续页面
    for (let i = 1; i <= additionalPages; i++) {
      const startY = lastY - overlap;
      const pageHeight = i === additionalPages
        ? totalHeight - startY  // 最后一页：使用实际剩余高度
        : effectiveHeight;      // 其他页：使用设定的分割高度
      positions.push({ startY, height: pageHeight });
      lastY = startY + pageHeight;
    }
  }
  return positions;
}

/**
 * 计算分割线位置
 * @param options 分割选项
 * @param elements 元素测量数据，仅在 hr 和 auto 模式下需要
 * @returns 分割线位置数组
 */
export function calculateSplitLines(
  options: SplitOptions,
  elements?: ElementMeasure[],
): number[] {
  const positions = calculateSplitPositions(options, elements);
  // 除了最后一个位置，其他位置都需要显示分割线
  return positions.slice(0, -1).map(p => p.startY + p.height);
} 