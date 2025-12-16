<!--
 * @Date: 2023-12-05 20:05:45
 * @LastEditors: zhumanyao
 * @LastEditTime: 2023-12-06 16:04:27
 * @FilePath: \ocean-of-knowledge\docs\knowledge-module\node\nginx\run.md
-->

# Nginx 的指令 (在 shell 中的操作)

## nginx 的安装

```js
sudo apt-get install nginx
```

## Nginx 卸载

- 1.删除 nginx, -purge 包括配置文件

```js
sudo apt-get -purge remove nginx
```

- 2.自动移除全部不使用的软件包

```js
sudo apt-get autoremove
```

- 3.罗列出与 nginx 相关的软件

```js
dpkg --get-selections|grep nginx
```

- 执行 3 的结果

```js
stephen@stephen-OptiPlex-390:~$ dpkg --get-selections|grep nginx

nginx                       install
nginx-common                    install
nginx-core                  install　
```

- 4.删除 3 查询出与 nginx 有关的软件

```js
sudo apt-get --purge remove nginx
sudo apt-get --purge remove nginx-common
sudo apt-get --purge remove nginx-core
```

这样就可以完全卸载掉 nginx 包括配置文件

## 查看 nginx 正在运行的进程

```js
ps -ef |grep nginx
```

- 看下 nginx 还有没有启动,一般执行完 1 后，nginx 还是启动着的，如下：

```js
stephen@stephen-OptiPlex-390:~$ ps -ef |grep nginx

root      7875  2317  0 15:02 ?        00:00:00 nginx: master process /usr/sbin/nginx
www-data  7876  7875  0 15:02 ?        00:00:00 nginx: worker process
www-data  7877  7875  0 15:02 ?        00:00:00 nginx: worker process
www-data  7878  7875  0 15:02 ?        00:00:00 nginx: worker process
www-data  7879  7875  0 15:02 ?        00:00:00 nginx: worker process
stephen   8321  3510  0 15:20 pts/0    00:00:00 grep --color=auto nginx　　
```

## kill nginx 进程

```js
sudo kill  -9  7875 7876 7877 7879
```

## 全局查找与 nginx 相关的文件

```js
sudo  find  /  -name  nginx*　
```

## 依次删除 列出的所有文件

```js
sudo rm -rf file　
```

## 再次重装

```js
sudo apt-get update
sudo apt-get install nginx
```

## 重启

```js
nginx -s reload
```
