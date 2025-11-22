# GitHub Actions Setting
### **1. Prepare your Ubuntu server**

SSH into your VPS and update the system:

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y git curl build-essential
```

Install **Node.js** (recommended: LTS):

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
node -v
npm -v
```

Install **PM2** to manage the Next.js process:

```bash
sudo npm install -g pm2
```

Install **nginx** for reverse proxy and HTTPS:

```bash
sudo apt install -y nginx
sudo systemctl enable nginx
sudo systemctl start nginx
```

---

### **2. Clone your Next.js project**

```bash
cd /var/www
sudo git clone https://github.com/yourusername/your-nextjs-project.git
cd your-nextjs-project
npm install
```

Test the build locally:

```bash
npm run build
npm run start
```

---

### **3. Set up Nginx as a reverse proxy**

Edit `/etc/nginx/sites-available/default`:

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Check and reload Nginx:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

---

### **4. Configure PM2**

Start your app with PM2:

```bash
pm2 start npm --name "nextjs-app" -- start
pm2 save
pm2 startup
```

PM2 will now keep your Next.js app running even after server restarts.

---

### **5. CI/CD with GitHub Actions and Playwright**

Create `.github/workflows/deploy.yml`:

```yaml
name: CI/CD

on:
  push:
    branches: [main]

jobs:
  test-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: 20

      - name: Install dependencies
        run: npm install

      - name: Run Playwright tests
        run: npx playwright test

      - name: Build Next.js
        run: npm run build

      - name: Deploy to VPS
        uses: appleboy/ssh-action@v0.1.9
        with:
          host: ${{ secrets.VPS_HOST }}
          username: ${{ secrets.VPS_USER }}
          key: ${{ secrets.VPS_KEY }}
          script: |
            cd /var/www/your-nextjs-project
            git pull
            npm install
            npm run build
            pm2 restart nextjs-app
```

**Notes:**

* Add your VPS credentials in GitHub secrets: `VPS_HOST`, `VPS_USER`, `VPS_KEY`.
* Playwright tests will run on GitHub runners before deployment.
* PM2 restarts the app automatically after each deployment.

---

### **6. Optional: Enable HTTPS with Let’s Encrypt**

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com
```

Certbot will handle automatic HTTPS renewal.
