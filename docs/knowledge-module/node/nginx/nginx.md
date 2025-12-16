# Nginx 代理

## 转发 http 到 https

```js
server {
  listen   80;
  server_name  apaas-sit.sungrow.cn
  rewrite ^(.*)$ https://$host$1 permanent
}
```

## 配置 https

```js
  server {
    listen   443;
    server_name test.pashr.com.cn;
    # ssl
    ssl on;
    ssl_certificate /etc/nginx/cert/1_test.pashr.com.cn.crt;
    ssl_certificate_key /etc/nginx/cert/1_test.pashr.com.cn.key;
    ssl_session_timeout 5m;
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE;
    ssl_prefer_server_ciphers on;
    # locations
    location /gateway {  # 后端接口地址的代理
      rewrite ^/gateway(/.*)$ $1 break;
      proxy_pass http://172.19.180.116:8080;
    }
    location / { # 前端代码配置的代理
        root /opt/publicAccount-test;
        try_files $uri $uri/ /index.html;
        index index.html;
    }
  }
```
