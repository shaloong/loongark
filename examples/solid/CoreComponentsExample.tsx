/** @jsxImportSource solid-js */
// 本文件由 scripts/generate-core-examples.mjs 生成，并参与真实四端编译与浏览器验收。
import { createSignal } from "solid-js";
import * as L from "@loongark/solid";
export function CoreComponentsExample() {
  const [family, setFamily] = createSignal("NativeSelect");
  return (
    <section
      style={{
        display: "grid",
        gap: "var(--lk-space-component-lg)",
        "max-width": "40rem",
        "min-width": 0,
        width: "100%",
      }}
    >
      <label style={{ display: "grid", gap: "var(--lk-control-fieldgap)" }}>
        组件示例
        <L.LoongArkNativeSelect
          aria-label="组件示例"
          value={family()}
          onChange={(event) => setFamily(event.currentTarget.value)}
        >
          <option>Accordion</option>
          <option>Alert</option>
          <option>AlertDialog</option>
          <option>AngleSlider</option>
          <option>AspectRatio</option>
          <option>Badge</option>
          <option>Breadcrumb</option>
          <option>ButtonGroup</option>
          <option>Collapsible</option>
          <option>Direction</option>
          <option>Empty</option>
          <option>FilterBar</option>
          <option>FloatingPanel</option>
          <option>Item</option>
          <option>Kbd</option>
          <option>Marquee</option>
          <option>Menubar</option>
          <option>NativeSelect</option>
          <option>NavigationMenu</option>
          <option>PinInput</option>
          <option>Popover</option>
          <option>QRCode</option>
          <option>Separator</option>
          <option>Sheet</option>
          <option>Sidebar</option>
          <option>SignaturePad</option>
          <option>Skeleton</option>
          <option>Slider</option>
          <option>Spinner</option>
          <option>Table</option>
          <option>Tabs</option>
          <option>Timer</option>
          <option>Toggle</option>
          <option>ToggleGroup</option>
          <option>Tooltip</option>
        </L.LoongArkNativeSelect>
      </label>
      {family() === "Accordion" && (
        <div style={{ "min-width": 0 }} data-core-family="Accordion">
          <L.LoongArkAccordionRoot collapsible>
            <L.LoongArkAccordionItem value="one">
              <L.LoongArkAccordionItemTrigger>
                部署设置
                <L.LoongArkAccordionItemIndicator />
              </L.LoongArkAccordionItemTrigger>
              <L.LoongArkAccordionItemContent>
                通过 main 发布正式组件展示。
              </L.LoongArkAccordionItemContent>
            </L.LoongArkAccordionItem>
          </L.LoongArkAccordionRoot>
        </div>
      )}
      {family() === "Alert" && (
        <div style={{ "min-width": 0 }} data-core-family="Alert">
          <L.LoongArkAlert>
            <L.LoongArkAlertTitle>设置已保存</L.LoongArkAlertTitle>
            <L.LoongArkAlertDescription>
              当前修改已经生效。
            </L.LoongArkAlertDescription>
          </L.LoongArkAlert>
        </div>
      )}
      {family() === "AlertDialog" && (
        <div style={{ "min-width": 0 }} data-core-family="AlertDialog">
          <L.LoongArkAlertDialogRoot>
            <L.LoongArkDialogTrigger>确认操作</L.LoongArkDialogTrigger>
            <L.LoongArkDialogPortal>
              <L.LoongArkDialogOverlay />
              <L.LoongArkDialogPositioner>
                <L.LoongArkDialogContent>
                  <L.LoongArkDialogTitle>继续操作？</L.LoongArkDialogTitle>
                  <L.LoongArkDialogDescription>
                    关闭窗口不会修改任何数据。
                  </L.LoongArkDialogDescription>
                  <L.LoongArkDialogCloseTrigger>
                    取消
                  </L.LoongArkDialogCloseTrigger>
                </L.LoongArkDialogContent>
              </L.LoongArkDialogPositioner>
            </L.LoongArkDialogPortal>
          </L.LoongArkAlertDialogRoot>
        </div>
      )}
      {family() === "AngleSlider" && (
        <div style={{ "min-width": 0 }} data-core-family="AngleSlider">
          <L.LoongArkAngleSlider.Root defaultValue={45}>
            <L.LoongArkAngleSlider.Label>旋转角度</L.LoongArkAngleSlider.Label>
            <L.LoongArkAngleSlider.Control>
              <L.LoongArkAngleSlider.Thumb />
            </L.LoongArkAngleSlider.Control>
            <L.LoongArkAngleSlider.ValueText />
            <L.LoongArkAngleSlider.HiddenInput name="rotation" />
          </L.LoongArkAngleSlider.Root>
        </div>
      )}
      {family() === "AspectRatio" && (
        <div style={{ "min-width": 0 }} data-core-family="AspectRatio">
          <L.LoongArkAspectRatio ratio={16 / 9}>
            <L.LoongArkPaper padding="md">16:9 内容区域</L.LoongArkPaper>
          </L.LoongArkAspectRatio>
        </div>
      )}
      {family() === "Badge" && (
        <div style={{ "min-width": 0 }} data-core-family="Badge">
          <L.LoongArkBadge variant="outline">已发布</L.LoongArkBadge>
        </div>
      )}
      {family() === "Breadcrumb" && (
        <div style={{ "min-width": 0 }} data-core-family="Breadcrumb">
          <L.LoongArkBreadcrumb>
            <L.LoongArkBreadcrumbList>
              <L.LoongArkBreadcrumbItem>
                <L.LoongArkBreadcrumbLink href="#overview">
                  概览
                </L.LoongArkBreadcrumbLink>
              </L.LoongArkBreadcrumbItem>
              <L.LoongArkBreadcrumbSeparator />
              <L.LoongArkBreadcrumbItem>
                <L.LoongArkBreadcrumbPage>组件</L.LoongArkBreadcrumbPage>
              </L.LoongArkBreadcrumbItem>
            </L.LoongArkBreadcrumbList>
          </L.LoongArkBreadcrumb>
        </div>
      )}
      {family() === "ButtonGroup" && (
        <div style={{ "min-width": 0 }} data-core-family="ButtonGroup">
          <L.LoongArkButtonGroup>
            <L.LoongArkButton variant="outline">保存草稿</L.LoongArkButton>
            <L.LoongArkButton>发布</L.LoongArkButton>
          </L.LoongArkButtonGroup>
        </div>
      )}
      {family() === "Collapsible" && (
        <div style={{ "min-width": 0 }} data-core-family="Collapsible">
          <L.LoongArkCollapsibleRoot>
            <L.LoongArkCollapsibleTrigger>
              查看详细信息
            </L.LoongArkCollapsibleTrigger>
            <L.LoongArkCollapsibleContent>
              展开内容保留组件的键盘和焦点行为。
            </L.LoongArkCollapsibleContent>
          </L.LoongArkCollapsibleRoot>
        </div>
      )}
      {family() === "Direction" && (
        <div style={{ "min-width": 0 }} data-core-family="Direction">
          <L.LoongArkDirection dir="rtl">
            <L.LoongArkNativeSelect aria-label="从右向左的选项">
              <option value="one">方向与箭头留白</option>
              <option value="two">第二项</option>
            </L.LoongArkNativeSelect>
          </L.LoongArkDirection>
        </div>
      )}
      {family() === "Empty" && (
        <div style={{ "min-width": 0 }} data-core-family="Empty">
          <L.LoongArkEmpty>
            <L.LoongArkEmptyHeader>
              <L.LoongArkEmptyTitle>暂无文件</L.LoongArkEmptyTitle>
              <L.LoongArkEmptyDescription>
                添加文件后将在这里显示。
              </L.LoongArkEmptyDescription>
            </L.LoongArkEmptyHeader>
            <L.LoongArkEmptyContent>
              <L.LoongArkButton>添加文件</L.LoongArkButton>
            </L.LoongArkEmptyContent>
          </L.LoongArkEmpty>
        </div>
      )}
      {family() === "FilterBar" && (
        <div style={{ "min-width": 0 }} data-core-family="FilterBar">
          <L.LoongArkFilterBar>
            <L.LoongArkFilterBarSearch>
              <L.LoongArkInputRoot>
                <L.LoongArkInputLabel>搜索</L.LoongArkInputLabel>
                <L.LoongArkInputControl placeholder="搜索组件" />
              </L.LoongArkInputRoot>
            </L.LoongArkFilterBarSearch>
            <L.LoongArkFilterBarActions>
              <L.LoongArkButton variant="outline">重置</L.LoongArkButton>
            </L.LoongArkFilterBarActions>
          </L.LoongArkFilterBar>
        </div>
      )}
      {family() === "FloatingPanel" && (
        <div style={{ "min-width": 0 }} data-core-family="FloatingPanel">
          <L.LoongArkFloatingPanel.Root>
            <L.LoongArkFloatingPanel.Trigger>
              打开检查面板
            </L.LoongArkFloatingPanel.Trigger>
            <L.LoongArkFloatingPanel.Positioner>
              <L.LoongArkFloatingPanel.Content>
                <L.LoongArkFloatingPanel.Header>
                  <L.LoongArkFloatingPanel.Title>
                    检查面板
                  </L.LoongArkFloatingPanel.Title>
                  <L.LoongArkFloatingPanel.CloseTrigger>
                    关闭
                  </L.LoongArkFloatingPanel.CloseTrigger>
                </L.LoongArkFloatingPanel.Header>
                <L.LoongArkFloatingPanel.Body>
                  拖动标题栏或右下角调整面板。
                </L.LoongArkFloatingPanel.Body>
                <L.LoongArkFloatingPanel.ResizeTrigger axis="se" />
              </L.LoongArkFloatingPanel.Content>
            </L.LoongArkFloatingPanel.Positioner>
          </L.LoongArkFloatingPanel.Root>
        </div>
      )}
      {family() === "Item" && (
        <div style={{ "min-width": 0 }} data-core-family="Item">
          <L.LoongArkItem>
            <L.LoongArkItemContent>
              <L.LoongArkItemTitle>组件说明</L.LoongArkItemTitle>
              <L.LoongArkItemDescription>
                用于列表中的标题、描述和操作组合。
              </L.LoongArkItemDescription>
            </L.LoongArkItemContent>
            <L.LoongArkItemActions>
              <L.LoongArkButton variant="outline">查看</L.LoongArkButton>
            </L.LoongArkItemActions>
          </L.LoongArkItem>
        </div>
      )}
      {family() === "Kbd" && (
        <div style={{ "min-width": 0 }} data-core-family="Kbd">
          <L.LoongArkKbdGroup>
            <L.LoongArkKbd>Ctrl</L.LoongArkKbd>
            <span>+</span>
            <L.LoongArkKbd>K</L.LoongArkKbd>
          </L.LoongArkKbdGroup>
        </div>
      )}
      {family() === "Marquee" && (
        <div style={{ "min-width": 0 }} data-core-family="Marquee">
          <L.LoongArkMarquee.Root>
            <L.LoongArkMarquee.Viewport>
              <L.LoongArkMarquee.Content>
                <L.LoongArkMarquee.Item>
                  <L.LoongArkBadge variant="outline">React</L.LoongArkBadge>
                </L.LoongArkMarquee.Item>
                <L.LoongArkMarquee.Item>
                  <L.LoongArkBadge variant="outline">Vue</L.LoongArkBadge>
                </L.LoongArkMarquee.Item>
                <L.LoongArkMarquee.Item>
                  <L.LoongArkBadge variant="outline">
                    Solid / Svelte
                  </L.LoongArkBadge>
                </L.LoongArkMarquee.Item>
              </L.LoongArkMarquee.Content>
            </L.LoongArkMarquee.Viewport>
          </L.LoongArkMarquee.Root>
        </div>
      )}
      {family() === "Menubar" && (
        <div style={{ "min-width": 0 }} data-core-family="Menubar">
          <L.LoongArkMenubar>
            <L.LoongArkMenuRoot>
              <L.LoongArkMenuTrigger>文件</L.LoongArkMenuTrigger>
              <L.LoongArkMenuPositioner>
                <L.LoongArkMenuContent>
                  <L.LoongArkMenuItem value="new">新建</L.LoongArkMenuItem>
                  <L.LoongArkMenuItem value="save">保存</L.LoongArkMenuItem>
                </L.LoongArkMenuContent>
              </L.LoongArkMenuPositioner>
            </L.LoongArkMenuRoot>
          </L.LoongArkMenubar>
        </div>
      )}
      {family() === "NativeSelect" && (
        <div style={{ "min-width": 0 }} data-core-family="NativeSelect">
          <L.LoongArkNativeSelect name="plan" aria-label="方案">
            <option value="free">免费方案</option>
            <option value="pro">专业方案与较长的选项名称</option>
          </L.LoongArkNativeSelect>
        </div>
      )}
      {family() === "NavigationMenu" && (
        <div style={{ "min-width": 0 }} data-core-family="NavigationMenu">
          <L.LoongArkNavigationMenu>
            <L.LoongArkNavigationMenuList>
              <L.LoongArkNavigationMenuItem>
                <L.LoongArkNavigationMenuLink href="#overview">
                  概览
                </L.LoongArkNavigationMenuLink>
              </L.LoongArkNavigationMenuItem>
              <L.LoongArkNavigationMenuItem>
                <L.LoongArkNavigationMenuLink href="#reference">
                  API
                </L.LoongArkNavigationMenuLink>
              </L.LoongArkNavigationMenuItem>
            </L.LoongArkNavigationMenuList>
          </L.LoongArkNavigationMenu>
        </div>
      )}
      {family() === "PinInput" && (
        <div style={{ "min-width": 0 }} data-core-family="PinInput">
          <L.LoongArkPinInputRoot>
            <L.LoongArkPinInputLabel>验证码</L.LoongArkPinInputLabel>
            <L.LoongArkPinInputControl>
              <L.LoongArkPinInputInput index={0} />
              <L.LoongArkPinInputInput index={1} />
              <L.LoongArkPinInputInput index={2} />
              <L.LoongArkPinInputInput index={3} />
            </L.LoongArkPinInputControl>
            <L.LoongArkPinInputHiddenInput name="code" />
          </L.LoongArkPinInputRoot>
        </div>
      )}
      {family() === "Popover" && (
        <div style={{ "min-width": 0 }} data-core-family="Popover">
          <L.LoongArkPopoverRoot>
            <L.LoongArkPopoverTrigger>打开详情</L.LoongArkPopoverTrigger>
            <L.LoongArkPopoverPositioner>
              <L.LoongArkPopoverContent>
                <L.LoongArkPopoverTitle>详情</L.LoongArkPopoverTitle>
                <L.LoongArkPopoverDescription>
                  浮层继承当前主题。
                </L.LoongArkPopoverDescription>
                <L.LoongArkPopoverCloseTrigger>
                  关闭
                </L.LoongArkPopoverCloseTrigger>
              </L.LoongArkPopoverContent>
            </L.LoongArkPopoverPositioner>
          </L.LoongArkPopoverRoot>
        </div>
      )}
      {family() === "QRCode" && (
        <div style={{ "min-width": 0 }} data-core-family="QRCode">
          <L.LoongArkQrCode.Root value="https://shaloong.github.io/loongark/">
            <L.LoongArkQrCode.Frame>
              <L.LoongArkQrCode.Pattern />
            </L.LoongArkQrCode.Frame>
            <L.LoongArkQrCode.DownloadTrigger
              mimeType="image/png"
              fileName="loongark.png"
            >
              下载二维码
            </L.LoongArkQrCode.DownloadTrigger>
          </L.LoongArkQrCode.Root>
        </div>
      )}
      {family() === "Separator" && (
        <div style={{ "min-width": 0 }} data-core-family="Separator">
          <L.LoongArkStack>
            <span>基本设置</span>
            <L.LoongArkSeparator />
            <span>高级设置</span>
          </L.LoongArkStack>
        </div>
      )}
      {family() === "Sheet" && (
        <div style={{ "min-width": 0 }} data-core-family="Sheet">
          <L.LoongArkSheetRoot>
            <L.LoongArkSheetTrigger>打开侧边面板</L.LoongArkSheetTrigger>
            <L.LoongArkSheetPortal>
              <L.LoongArkSheetOverlay />
              <L.LoongArkSheetPositioner>
                <L.LoongArkSheetContent>
                  <L.LoongArkSheetTitle>编辑偏好</L.LoongArkSheetTitle>
                  <L.LoongArkSheetDescription>
                    关闭后恢复触发器焦点。
                  </L.LoongArkSheetDescription>
                  <L.LoongArkSheetAction>完成</L.LoongArkSheetAction>
                </L.LoongArkSheetContent>
              </L.LoongArkSheetPositioner>
            </L.LoongArkSheetPortal>
          </L.LoongArkSheetRoot>
        </div>
      )}
      {family() === "Sidebar" && (
        <div style={{ "min-width": 0 }} data-core-family="Sidebar">
          <L.LoongArkSidebar>
            <L.LoongArkSidebarHeader>工作区</L.LoongArkSidebarHeader>
            <L.LoongArkSidebarContent>
              <L.LoongArkSidebarMenu>
                <L.LoongArkSidebarMenuItem>
                  <L.LoongArkSidebarMenuButton>
                    概览
                  </L.LoongArkSidebarMenuButton>
                </L.LoongArkSidebarMenuItem>
                <L.LoongArkSidebarMenuItem>
                  <L.LoongArkSidebarMenuButton>
                    设置
                  </L.LoongArkSidebarMenuButton>
                </L.LoongArkSidebarMenuItem>
              </L.LoongArkSidebarMenu>
            </L.LoongArkSidebarContent>
          </L.LoongArkSidebar>
        </div>
      )}
      {family() === "SignaturePad" && (
        <div style={{ "min-width": 0 }} data-core-family="SignaturePad">
          <L.LoongArkSignaturePad.Root>
            <L.LoongArkSignaturePad.Label>签名</L.LoongArkSignaturePad.Label>
            <L.LoongArkSignaturePad.Control>
              <L.LoongArkSignaturePad.Segment />
              <L.LoongArkSignaturePad.Guide />
            </L.LoongArkSignaturePad.Control>
            <L.LoongArkSignaturePad.ClearTrigger>
              清除签名
            </L.LoongArkSignaturePad.ClearTrigger>
          </L.LoongArkSignaturePad.Root>
        </div>
      )}
      {family() === "Skeleton" && (
        <div style={{ "min-width": 0 }} data-core-family="Skeleton">
          <L.LoongArkStack>
            <L.LoongArkSkeleton />
            <L.LoongArkSkeleton />
            <span>内容正在加载</span>
          </L.LoongArkStack>
        </div>
      )}
      {family() === "Slider" && (
        <div style={{ "min-width": 0 }} data-core-family="Slider">
          <L.LoongArkSliderRoot defaultValue={[50]}>
            <L.LoongArkSliderLabel>音量</L.LoongArkSliderLabel>
            <L.LoongArkSliderControl>
              <L.LoongArkSliderTrack>
                <L.LoongArkSliderRange />
              </L.LoongArkSliderTrack>
              <L.LoongArkSliderThumb index={0} />
            </L.LoongArkSliderControl>
            <L.LoongArkSliderValueText />
          </L.LoongArkSliderRoot>
        </div>
      )}
      {family() === "Spinner" && (
        <div style={{ "min-width": 0 }} data-core-family="Spinner">
          <L.LoongArkStack orientation="horizontal">
            <L.LoongArkSpinner aria-label="加载中" />
            <span>正在载入组件</span>
          </L.LoongArkStack>
        </div>
      )}
      {family() === "Table" && (
        <div style={{ "min-width": 0 }} data-core-family="Table">
          <L.LoongArkTable>
            <L.LoongArkTableCaption>发布组件</L.LoongArkTableCaption>
            <L.LoongArkTableHeader>
              <L.LoongArkTableRow>
                <L.LoongArkTableHead>框架</L.LoongArkTableHead>
                <L.LoongArkTableHead>状态</L.LoongArkTableHead>
              </L.LoongArkTableRow>
            </L.LoongArkTableHeader>
            <L.LoongArkTableBody>
              <L.LoongArkTableRow>
                <L.LoongArkTableCell>
                  React / Vue / Solid / Svelte
                </L.LoongArkTableCell>
                <L.LoongArkTableCell>支持</L.LoongArkTableCell>
              </L.LoongArkTableRow>
            </L.LoongArkTableBody>
          </L.LoongArkTable>
        </div>
      )}
      {family() === "Tabs" && (
        <div style={{ "min-width": 0 }} data-core-family="Tabs">
          <L.LoongArkTabsRoot defaultValue="overview">
            <L.LoongArkTabsList>
              <L.LoongArkTabsTrigger value="overview">
                概览
              </L.LoongArkTabsTrigger>
              <L.LoongArkTabsTrigger value="api">API</L.LoongArkTabsTrigger>
            </L.LoongArkTabsList>
            <L.LoongArkTabsContent value="overview">
              组件概览
            </L.LoongArkTabsContent>
            <L.LoongArkTabsContent value="api">
              组件的公开 API
            </L.LoongArkTabsContent>
          </L.LoongArkTabsRoot>
        </div>
      )}
      {family() === "Timer" && (
        <div style={{ "min-width": 0 }} data-core-family="Timer">
          <L.LoongArkTimer.Root countdown startMs={60000}>
            <L.LoongArkTimer.Area>
              <L.LoongArkTimer.Item type="minutes" />
              <L.LoongArkTimer.Separator>:</L.LoongArkTimer.Separator>
              <L.LoongArkTimer.Item type="seconds" />
            </L.LoongArkTimer.Area>
            <L.LoongArkTimer.Control>
              <L.LoongArkTimer.ActionTrigger action="start">
                开始
              </L.LoongArkTimer.ActionTrigger>
              <L.LoongArkTimer.ActionTrigger action="pause">
                暂停
              </L.LoongArkTimer.ActionTrigger>
              <L.LoongArkTimer.ActionTrigger action="reset">
                重置
              </L.LoongArkTimer.ActionTrigger>
            </L.LoongArkTimer.Control>
          </L.LoongArkTimer.Root>
        </div>
      )}
      {family() === "Toggle" && (
        <div style={{ "min-width": 0 }} data-core-family="Toggle">
          <L.LoongArkToggleRoot aria-label="加粗">加粗</L.LoongArkToggleRoot>
        </div>
      )}
      {family() === "ToggleGroup" && (
        <div style={{ "min-width": 0 }} data-core-family="ToggleGroup">
          <L.LoongArkToggleGroupRoot>
            <L.LoongArkToggleGroupItem value="bold">
              加粗
            </L.LoongArkToggleGroupItem>
            <L.LoongArkToggleGroupItem value="italic">
              斜体
            </L.LoongArkToggleGroupItem>
          </L.LoongArkToggleGroupRoot>
        </div>
      )}
      {family() === "Tooltip" && (
        <div style={{ "min-width": 0 }} data-core-family="Tooltip">
          <L.LoongArkTooltipRoot>
            <L.LoongArkTooltipTrigger>查看提示</L.LoongArkTooltipTrigger>
            <L.LoongArkTooltipPositioner>
              <L.LoongArkTooltipContent>
                支持键盘聚焦和鼠标悬停。
              </L.LoongArkTooltipContent>
            </L.LoongArkTooltipPositioner>
          </L.LoongArkTooltipRoot>
        </div>
      )}
    </section>
  );
}
