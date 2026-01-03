# LoongArk 贡献指南

## 开发环境设置

1. 克隆仓库

```bash
git clone [repository-url]
cd loongark
```

2. 安装依赖

```bash
pnpm install
```

## 开发流程

### 1. 分支管理

- `main`: 主分支，用于发布
- `develop`: 开发分支
- `feature/*`: 功能分支
- `fix/*`: 修复分支

### 2. 提交规范

使用 Conventional Commits 规范：

- `feat`: 新功能
- `fix`: 修复问题
- `docs`: 文档更新
- `style`: 代码格式调整
- `refactor`: 重构代码
- `test`: 测试相关
- `chore`: 构建过程或辅助工具的变动

示例：

```bash
git commit -m "feat(button): add size variant support"
```

### 3. 开发步骤

1. 创建新分支

```bash
git checkout -b feature/your-feature
```

2. 开发完成后，提交代码

```bash
git add .
git commit -m "feat: add new feature"
```

3. 推送分支并创建 Pull Request

```bash
git push origin feature/your-feature
```

### 4. 代码审查

- 所有代码变更必须通过代码审查
- 确保代码符合项目规范
- 包含适当的测试
- 更新相关文档

## 发布流程

1. 版本管理

   - 遵循语义化版本规范
   - 使用 `pnpm version` 管理版本

2. 发布检查清单
   - [ ] 所有测试通过
   - [ ] 文档已更新
   - [ ] Changelog 已更新
   - [ ] 版本号已更新

## 问题反馈

如发现问题，请创建 Issue 并包含：

1. 问题描述
2. 复现步骤
3. 预期行为
4. 实际行为
5. 环境信息
