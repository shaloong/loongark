export interface FormScenario {
  emailLabel: string;
  emailPlaceholder: string;
  helperText: string;
  prefixLabel: string;
  suffixAction: string;
  dialogTitle: string;
  dialogDescription: string;
  primaryLabel: string;
  secondaryLabel: string;
}

export interface ScenarioTestIds {
  form: string;
  inputWrapper: string;
  inputPrefix: string;
  inputSuffix: string;
  helperText: string;
  primaryButton: string;
  secondaryButton: string;
  dialogTitle: string;
  dialogDescription: string;
}

export const defaultScenario: FormScenario = {
  emailLabel: "邀请邮箱",
  emailPlaceholder: "teammate@loongark.dev",
  helperText: "需要公司邮箱，系统会自动分配编辑权限。",
  prefixLabel: "@",
  suffixAction: "清除",
  dialogTitle: "邀请成员",
  dialogDescription: "将向成员发送邀请邮件，确认后可在设置面板修改角色。",
  primaryLabel: "发送邀请",
  secondaryLabel: "取消",
};

export const scenarioTestIds: ScenarioTestIds = {
  form: "invitation-form",
  inputWrapper: "input-wrapper",
  inputPrefix: "input-prefix",
  inputSuffix: "input-suffix",
  helperText: "input-helper",
  primaryButton: "primary-button",
  secondaryButton: "secondary-button",
  dialogTitle: "dialog-title",
  dialogDescription: "dialog-description",
};
