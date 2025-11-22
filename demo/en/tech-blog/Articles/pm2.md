You can see the status of all PM2-managed processes with:

```bash
pm2 status
```

Here are other useful commands:

* **View logs**

  ```bash
  pm2 logs
  ```

* **Show logs for a specific app**

  ```bash
  pm2 logs <app-name>
  ```

* **Check a specific process**

  ```bash
  pm2 describe <app-name>
  ```

* **List processes with system info**

  ```bash
  pm2 list
  ```

If PM2 is running as a service (startup mode), you can also check it with:

```bash
systemctl status pm2-$(whoami)
```
