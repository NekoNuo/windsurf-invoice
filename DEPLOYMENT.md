# WIPDF Cloudflare Pages 部署指南

## 🚀 快速部署

### 方法1：使用Wrangler CLI（推荐）

1. **安装Wrangler CLI**
   ```bash
   npm install -g wrangler
   ```

2. **登录Cloudflare**
   ```bash
   wrangler login
   ```

3. **构建并部署**
   ```bash
   npm run deploy
   ```

### 方法2：手动部署

1. **构建项目**
   ```bash
   npm run export
   ```

2. **部署到Cloudflare**
   ```bash
   wrangler deploy --assets=./out
   ```

### 方法3：使用Cloudflare Pages

1. **构建项目**
   ```bash
   npm run export
   ```

2. **部署到Cloudflare Pages**
   ```bash
   wrangler pages deploy out --project-name wipdf
   ```

## 📁 项目配置说明

### Next.js 配置 (next.config.js)
- `output: 'export'` - 启用静态导出
- `trailingSlash: true` - 确保URL兼容性
- `images: { unoptimized: true }` - 禁用图片优化（静态导出需要）

### 构建输出
- 构建后的静态文件位于 `out/` 目录
- 包含所有必要的HTML、CSS、JS和静态资源

## 🔧 部署脚本

package.json中已添加以下脚本：
- `npm run export` - 构建静态导出
- `npm run deploy` - 构建并部署到Cloudflare Pages

## 🌐 访问部署

部署成功后，您将获得一个Cloudflare Pages URL，格式类似：
`https://wipdf.pages.dev`

## 📝 注意事项

1. **静态导出限制**：
   - 不支持服务器端功能（API路由、服务器组件等）
   - 所有功能都在客户端运行

2. **自定义域名**：
   - 可在Cloudflare Pages控制台中配置自定义域名

3. **环境变量**：
   - 如需环境变量，在Cloudflare Pages控制台中配置

## 🔍 故障排除

如果部署失败：
1. 确保 `out/` 目录存在且包含 `index.html`
2. 检查 `wrangler.toml` 配置
3. 确认Cloudflare账户权限

## 📊 部署状态

构建成功后会显示：
- 路由信息
- 文件大小
- First Load JS大小
- 静态页面列表
