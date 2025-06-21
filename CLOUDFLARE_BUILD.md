# Cloudflare Pages 构建配置指南

## 🚀 自动构建配置（推荐）

### 1. GitHub 集成部署

1. **连接GitHub仓库**
   - 登录 [Cloudflare Dashboard](https://dash.cloudflare.com)
   - 进入 Pages 部分
   - 点击 "Create a project"
   - 选择 "Connect to Git"
   - 授权并选择您的GitHub仓库

2. **构建配置设置**
   ```
   Framework preset: Next.js (Static HTML Export)
   Build command: npm run export
   Build output directory: out
   Root directory: /
   ```

3. **环境变量**（可选）
   ```
   NODE_VERSION=18
   NPM_VERSION=latest
   ```

### 2. 构建设置详解

| 配置项 | 值 | 说明 |
|--------|-----|------|
| Framework | Next.js (Static HTML Export) | 自动检测Next.js项目 |
| Build command | `npm run export` | 执行静态导出 |
| Output directory | `out` | Next.js导出目录 |
| Node.js version | 18+ | 推荐使用Node.js 18或更高版本 |

### 3. 高级构建配置

**自定义构建命令**：
```bash
npm ci && npm run export
```

**环境变量设置**：
- `NODE_ENV=production`
- `NEXT_TELEMETRY_DISABLED=1`（可选，禁用遥测）

## 📁 项目文件配置

### _headers 文件
项目根目录的 `_headers` 文件配置HTTP头：
- 安全头设置
- 缓存策略
- 静态资源优化

### _redirects 文件
项目根目录的 `_redirects` 文件配置重定向：
- SPA路由支持
- 404页面处理

## 🔧 手动部署配置

### 使用 Wrangler CLI

1. **安装依赖**
   ```bash
   npm install -g wrangler
   ```

2. **登录Cloudflare**
   ```bash
   wrangler login
   ```

3. **部署选项**

   **选项A - Cloudflare Pages**：
   ```bash
   npm run deploy:pages
   ```

   **选项B - Cloudflare Workers**：
   ```bash
   npm run deploy:cf
   ```

### wrangler.toml 配置

```toml
name = "wipdf"
compatibility_date = "2025-06-21"

[assets]
directory = "./out"

[env.production]
compatibility_date = "2025-06-21"
```

## 🌐 域名配置

### 自定义域名设置

1. **在Cloudflare Pages控制台**：
   - 进入项目设置
   - 点击 "Custom domains"
   - 添加您的域名

2. **DNS配置**：
   - 添加CNAME记录指向 `your-project.pages.dev`
   - 或使用Cloudflare作为DNS服务商

## 📊 构建优化

### 性能优化设置

1. **启用压缩**：
   - Cloudflare自动启用Gzip/Brotli压缩

2. **缓存配置**：
   - 静态资源：1年缓存
   - HTML文件：短期缓存

3. **CDN优化**：
   - 全球边缘节点分发
   - 自动图片优化

### 构建时间优化

```bash
# 使用npm ci替代npm install
npm ci && npm run export

# 启用并行构建
NEXT_PARALLEL=true npm run export
```

## 🔍 故障排除

### 常见问题

1. **构建失败**：
   - 检查Node.js版本（推荐18+）
   - 确认package.json中的scripts正确
   - 查看构建日志中的错误信息

2. **部署后页面空白**：
   - 确认out目录包含index.html
   - 检查_redirects文件配置
   - 验证静态资源路径

3. **路由不工作**：
   - 确认_redirects文件存在
   - 检查Next.js配置中的trailingSlash设置

### 调试命令

```bash
# 本地测试构建
npm run export
cd out && python -m http.server 8000

# 检查输出文件
ls -la out/
```

## 📈 监控和分析

### Cloudflare Analytics

- 访问统计
- 性能指标
- 错误监控
- 带宽使用情况

### 推荐设置

- 启用Web Analytics
- 配置错误页面
- 设置安全规则
- 启用Bot Fight Mode
