# 图片格式转换器

一款基于纯前端技术开发的在线图片格式转换工具，支持多种主流图片格式之间的快速转换。

## 项目简介

图片格式转换器采用 HTML5 Canvas API 技术，所有图片处理均在用户浏览器本地完成，无需上传到服务器，确保用户隐私和数据安全。

**在线演示**: [https://image.gitapp.cn/](https://image.gitapp.cn/)

## 功能特性

### 支持的格式

- **PNG** - 支持透明背景，无损压缩，适合图标和设计稿
- **JPEG/JPG** - 有损压缩，文件小，适合照片和网页图片
- **WebP** - 新一代图片格式，压缩率高，质量好
- **BMP** - 位图格式，无压缩，保真度高
- **GIF** - 支持动画和透明，适合小动图
- **ICO** - 网站图标格式，多尺寸支持

### 核心优势

- 🚀 **纯前端处理** - 图片在浏览器本地转换，不上传服务器，转换速度快
- 🔒 **隐私安全** - 所有操作在本地完成，图片不会离开你的设备
- 💯 **完全免费** - 无需注册登录，无使用次数限制，永久免费使用
- ⚡ **即时转换** - 一键转换，实时预览，支持多种主流图片格式
- 📱 **多端适配** - 支持手机、平板、电脑等各种设备访问使用
- 🎨 **质量保证** - 采用HTML5 Canvas技术，确保转换质量

## 技术栈

- **HTML5** - 页面结构
- **CSS3** - 样式和动画效果
- **JavaScript (ES6+)** - 核心转换逻辑
- **Canvas API** - 图片处理和格式转换
- **FileReader API** - 本地文件读取

## 项目结构

```
image_converter/
├── index.html          # 主页面
├── about.html          # 关于页面
├── css/
│   └── style.css       # 全局样式文件
├── js/
│   └── main.js         # 核心JavaScript逻辑
└── README.md           # 项目文档
```

## 快速开始

### 本地运行

1. 克隆项目到本地
```bash
git clone https://github.com/net936/image-converter.git
```

2. 进入项目目录
```bash
cd image-converter
```

3. 使用任意HTTP服务器运行项目
```bash
# 使用Python 3
python -m http.server 8000

# 或使用Node.js的http-server
npx http-server -p 8000

# 或使用Live Server (VSCode插件)
# 右键 index.html -> Open with Live Server
```

4. 在浏览器中访问
```
http://localhost:8000
```

### 使用说明

1. 点击"选择图片文件"按钮，选择需要转换的图片
2. 在"选择目标格式"下拉菜单中选择要转换的格式
3. 点击"开始转换"按钮
4. 转换完成后，预览转换结果并点击"下载图片"按钮保存

## 使用场景

- 网站开发时需要转换图片格式以优化加载速度
- 设计师需要将设计稿转换为不同格式
- 需要将照片转换为特定格式以适配不同平台
- 需要生成网站 favicon 图标
- 批量处理图片格式转换任务

## 浏览器兼容性

- Chrome (推荐)
- Firefox
- Safari
- Edge
- Opera

> 注意：需要支持 HTML5 Canvas API 的现代浏览器

## 部署

### GitHub Pages

1. Fork 本项目
2. 进入仓库设置 Settings -> Pages
3. Source 选择 `main` 分支
4. 保存后即可通过 `https://net936.github.io/image-converter/` 访问

### Vercel

1. 在 [Vercel](https://vercel.com/) 导入 GitHub 仓库
2. 默认配置即可，无需特殊设置
3. 点击 Deploy 完成部署

### Netlify

1. 在 [Netlify](https://www.netlify.com/) 导入 GitHub 仓库
2. Build settings 留空
3. Publish directory 填写 `/`
4. 点击 Deploy site 完成部署

### Cloudflare Pages

1. 登录 [Cloudflare Pages](https://pages.cloudflare.com/)
2. 点击 "创建项目" -> "连接到 Git"
3. 选择你的 GitHub 仓库 `image-converter`
4. 构建设置：
   - 构建命令：留空（无需构建）
   - 构建输出目录：`/`
   - 根目录：`/`（默认）
5. 点击 "保存并部署"
6. 部署完成后会获得一个 `*.pages.dev` 域名
7. 可选：在设置中绑定自定义域名

**优势**：
- 全球 CDN 加速
- 自动 HTTPS
- 无限带宽
- 免费且快速

### Nginx 部署

适合自有服务器部署，提供完全的控制权。

#### 1. 准备服务器环境

确保服务器已安装 Nginx：

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install nginx

# CentOS/RHEL
sudo yum install nginx
```

#### 2. 上传项目文件

将项目文件上传到服务器，例如：

```bash
# 在本地执行
scp -r image-converter/ user@your-server:/var/www/

# 或使用 git 克隆
ssh user@your-server
cd /var/www/
git clone https://github.com/net936/image-converter.git
```

#### 3. 配置 Nginx

创建 Nginx 配置文件：

```bash
sudo nano /etc/nginx/sites-available/image-converter
```

添加以下配置：

```nginx
server {
    listen 80;
    server_name your-domain.com;  # 替换为你的域名或服务器IP

    root /var/www/image-converter;
    index index.html;

    # 启用 gzip 压缩
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/javascript;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # 静态资源缓存
    location ~* \.(css|js|jpg|jpeg|png|gif|ico|svg|webp)$ {
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    # 安全头部
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
}
```

#### 4. 启用站点配置

```bash
# 创建软链接
sudo ln -s /etc/nginx/sites-available/image-converter /etc/nginx/sites-enabled/

# 测试配置
sudo nginx -t

# 重启 Nginx
sudo systemctl restart nginx
```

#### 5. 配置 SSL（可选但推荐）

使用 Let's Encrypt 免费证书：

```bash
# 安装 Certbot
sudo apt install certbot python3-certbot-nginx  # Ubuntu/Debian
sudo yum install certbot python3-certbot-nginx  # CentOS/RHEL

# 获取并配置证书
sudo certbot --nginx -d your-domain.com

# 自动续期
sudo certbot renew --dry-run
```

配置完成后，Nginx 配置会自动更新为 HTTPS：

```nginx
server {
    listen 443 ssl http2;
    server_name your-domain.com;

    ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;

    # ... 其他配置保持不变
}

server {
    listen 80;
    server_name your-domain.com;
    return 301 https://$server_name$request_uri;
}
```

#### 6. 验证部署

访问你的域名或服务器IP，确认网站正常运行。

**优势**：
- 完全控制服务器配置
- 高性能和可定制性
- 适合企业级部署
- 可与其他服务集成

## 贡献指南

欢迎提交 Issue 和 Pull Request 来帮助改进项目！

### 提交 Issue

- 使用 Issue 报告 Bug
- 提出新功能建议
- 讨论项目相关问题

### 提交 Pull Request

1. Fork 本项目
2. 创建新的功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的修改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 提交 Pull Request

## 开发计划

- [ ] 支持批量转换多张图片
- [ ] 添加图片压缩功能
- [ ] 支持图片尺寸调整
- [ ] 添加图片裁剪功能
- [ ] 支持水印添加
- [ ] 提供API接口

## 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件

## 联系方式

- 邮箱: support@example.com
- GitHub: [@net936](https://github.com/net936)
- 网站: [https://image.gitapp.cn/](https://image.gitapp.cn/)

## 致谢

感谢所有为这个项目做出贡献的开发者！

---

⭐ 如果这个项目对你有帮助，欢迎给个 Star！
