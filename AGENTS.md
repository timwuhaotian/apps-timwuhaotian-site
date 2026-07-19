<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## 部署 VPS

当用户说 "部署vps" 时，执行以下操作：

1. SSH 到 VPS 服务器：
   - 主机: `45.76.178.248`
   - 用户: `root`
   - 密码: `2e=W9hbg$YE42Q4s`
   - 项目目录: `/root/code/apps-timwuhaotian-site`

3. 使用 sshpass 实现免交互 SSH（systemd 服务跑 `next start --port 3003`，所以重启前**必须先 `npm run build`**，否则服务起来的是旧的 `.next`；node 装在 nvm 下，非交互 SSH 需手动加 PATH）：
   ```bash
   sshpass -p '2e=W9hbg$YE42Q4s' ssh -o StrictHostKeyChecking=no root@45.76.178.248 'export PATH=/root/.nvm/versions/node/v24.16.0/bin:$PATH && cd /root/code/apps-timwuhaotian-site && git pull --ff-only && npm install && npm run build && systemctl restart apps-timwuhaotian-site'
   ```
   - 线上 Caddy 反代 `apps.timwuhaotian.dev` → `localhost:3003`（本服务）。

4. 如果本地 `.env` 有更新，需同步到 VPS：
   ```bash
   sshpass -p '2e=W9hbg$YE42Q4s' scp -o StrictHostKeyChecking=no .env root@45.76.178.248:/root/code/apps-timwuhaotian-site/.env
   ```

## 更新 APP 状态

当用户说 "更新app状态" 时，执行以下操作：

1. **确定项目映射关系**：
   在平级目录中，根据网站中定义在 `src/content/apps.ts` 里的 app `slug` 寻找对应的项目目录。常见的映射关系如下（如果不确定，可以搜索平级目录）：
   - `kinvoice` -> `kin-voice`
   - `echo-vault` -> `echo-vault`
   - `duetshot` -> `mobile-dual-cam`
   - `found` -> `ios-found`
   - `scholar-daily` -> `scholar-daily`
   - `client-memory` -> `client-memory`
   - `kodda` -> `kodda`
   - `ai-quick-note` -> `ai-quick-note`
   - `ai-chinese-dict` -> `ai-personal-dict`
   - `the-pair` -> `the-pair`
   - `harbor` -> `harbor`
   - `ai-bill` -> `ai-bill`
   - `sec-daily` -> `sec-daily`
   - `cve-daily` -> `cve-daily`

2. **获取每个 APP 的最新状态**：
   - 检查每个对应项目的近期 Git 提交历史（如 `git log -n 5`）。
   - 检查其 `package.json` 中的版本号。
   - 检查项目根目录下的主要文档（如 `README.md`、`AGENTS.md` 等），了解当前状态（例如：是否已发布 `live`、测试中 `beta`，还是开发中 `in development`，以及最新的 features 等）。
   - 检查 app 的 App Store 状态或 Release 情况。

3. **更新本站配置**：
   - 对比收集到的最新信息与 `src/content/apps.ts` 中的配置。
   - 修改 `src/content/apps.ts` 中的 `status` ("live" | "beta" | "in development")、`features`、版本更新日期或隐私/服务条款更新日期等字段。
   - 如果有更新，记得告知用户修改了哪些部分。

