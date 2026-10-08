<script lang="ts">
  import * as L from "@loongark/svelte";
  import { controlIcons } from "@loongark/kit";
  let active = $state(false);
  const toggle = () => (active = !active);
</script>

<L.LoongArkStack>
  <L.LoongArkPaper
    ><L.LoongArkStack>
      <h2>统一的线条图标</h2>
      <p>默认继承文字颜色，图标按钮由按钮提供名称。</p>
      <div
        style="display:flex;align-items:center;gap:var(--lk-space-component-md);flex-wrap:wrap"
      >
        <L.LoongArkIcon
          icon={controlIcons.search}
          label="Small search"
          size="sm"
        /><L.LoongArkIcon
          icon={controlIcons.search}
          label="Medium search"
        /><L.LoongArkIcon
          icon={controlIcons.search}
          label="Large search"
          size="lg"
        /><L.LoongArkIcon
          icon={controlIcons.search}
          label="Fixed stroke search"
          size={32}
          absoluteStrokeWidth
        />
      </div>
      <div
        style="display:flex;align-items:center;gap:var(--lk-space-component-md);flex-wrap:wrap"
      >
        <L.LoongArkButton aria-label="Search" size="icon" variant="outline"
          ><L.LoongArkIcon icon={controlIcons.search} /></L.LoongArkButton
        ><L.LoongArkButton disabled variant="outline"
          ><L.LoongArkIcon icon={controlIcons.plus} />添加项目</L.LoongArkButton
        ><L.LoongArkButton variant="outline" onclick={toggle}
          >切换图标</L.LoongArkButton
        >
      </div>
      <L.LoongArkIcon
        data-testid="dynamic-icon"
        icon={active ? controlIcons.check : controlIcons.search}
        label={active ? "Ready illustration" : "Search illustration"}
        size={active ? 32 : 16}
        strokeWidth={active ? 1.5 : 2}
      />
    </L.LoongArkStack></L.LoongArkPaper
  >
  <L.LoongArkPaper
    ><L.LoongArkStack
      ><h2>逻辑方向</h2>
      <p>仅导航箭头镜像，搜索、加号等图标保持原形。</p>
      <div
        dir="ltr"
        style="display:flex;align-items:center;gap:var(--lk-space-component-md);flex-wrap:wrap"
      >
        <span>LTR</span><L.LoongArkIcon
          data-testid="ltr-arrow"
          icon={controlIcons.arrowRight}
          mirrorInRtl
        /><L.LoongArkIcon icon={controlIcons.search} />
      </div>
      <div
        dir="rtl"
        style="display:flex;align-items:center;gap:var(--lk-space-component-md);flex-wrap:wrap"
      >
        <span>RTL</span><L.LoongArkIcon
          data-testid="rtl-arrow"
          icon={controlIcons.arrowRight}
          mirrorInRtl
        /><L.LoongArkIcon data-testid="rtl-search" icon={controlIcons.search} />
      </div></L.LoongArkStack
    ></L.LoongArkPaper
  >
</L.LoongArkStack>
