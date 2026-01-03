export interface FilterChip {
  id: string;
  label: string;
  badge?: number;
}

export interface FilterBarScenario {
  searchLabel: string;
  searchPlaceholder: string;
  searchHelper: string;
  chips: FilterChip[];
  primaryAction: string;
  secondaryAction: string;
}

export interface FilterBarTestIds {
  root: string;
  search: string;
  chip: (id: string) => string;
  primaryAction: string;
  secondaryAction: string;
}

export const filterBarScenario: FilterBarScenario = {
  searchLabel: "过滤项目",
  searchPlaceholder: "搜索成员、标签或描述",
  searchHelper: "支持按 @mention、#标签 组合查询",
  chips: [
    { id: "all", label: "全部" },
    { id: "active", label: "活跃", badge: 24 },
    { id: "pending", label: "待审批", badge: 8 },
    { id: "draft", label: "草稿", badge: 3 },
  ],
  primaryAction: "创建视图",
  secondaryAction: "重置",
};

export const filterBarTestIds: FilterBarTestIds = {
  root: "filter-bar",
  search: "filter-bar-search",
  chip: (id: string) => `filter-chip-${id}`,
  primaryAction: "filter-primary-action",
  secondaryAction: "filter-secondary-action",
};
