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
