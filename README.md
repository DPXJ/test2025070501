# 生产管理系统

基于React + TypeScript + Vite + Ant Design构建的现代化生产管理系统。

## 功能特性

- 🎯 **生产执行管理** - 管理生产计划的执行情况，跟踪生产进度和质量
- 📊 **生产验收管理** - 对已完成的生产任务进行质量验收，确保产品质量符合标准
- 📱 **响应式设计** - 支持桌面端和移动端访问
- 🌐 **国际化支持** - 支持中文界面
- 🎨 **现代化UI** - 基于Ant Design组件库，提供美观的用户界面

## 技术栈

- **前端框架**: React 18
- **开发语言**: TypeScript
- **构建工具**: Vite
- **UI组件库**: Ant Design 5
- **路由管理**: React Router Dom
- **样式方案**: CSS + Ant Design

## 项目结构

```
├── src/
│   ├── components/          # 公共组件
│   │   └── Layout/         # 布局组件
│   ├── pages/              # 页面组件
│   │   ├── ProductionExecution/    # 生产执行页面
│   │   └── ProductionAcceptance/   # 生产验收页面
│   ├── App.tsx             # 主应用组件
│   ├── main.tsx            # 应用入口
│   └── index.css           # 全局样式
├── public/                 # 静态资源
├── index.html              # HTML模板
├── package.json            # 项目依赖
├── tsconfig.json           # TypeScript配置
├── vite.config.ts          # Vite配置
└── README.md               # 项目说明
```

## 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3000 查看应用

### 构建生产版本

```bash
npm run build
```

### 预览生产版本

```bash
npm run preview
```

## 主要功能

### 生产执行管理
- 生产任务列表展示
- 生产状态跟踪（待开始、进行中、已完成、已取消）
- 生产数据统计
- 搜索和筛选功能
- 生产任务的增删改查

### 生产验收管理
- 验收任务列表展示
- 质量统计数据展示
- 验收状态管理（待验收、已通过、已拒绝）
- 质量合格率统计
- 验收操作（通过/拒绝）

## 开发规范

- 使用TypeScript进行类型检查
- 遵循React Hooks最佳实践
- 使用Ant Design组件库保持UI一致性
- 采用响应式设计适配多端访问

## 贡献指南

1. Fork本项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建Pull Request

## 许可证

MIT License 