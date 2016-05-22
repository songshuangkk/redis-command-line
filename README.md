## Redis 的一个简易的命令行连接客户端

### 安装

```javascript
  npm install redis-command-line
```

### 使用

```javascript
  connect
```

输入connect就能进行连接redis。

## 通过配置文件来进行配置

我们可以添加一个配置文件到当前目录, config.json文件:
```
{
  "host": "localhost",
  "port": 6379,
  "password": ""
}

```

然后在启动的时候:
```
redis-command-line -f config.json
```
这样就连接上了redis。

连接完成之后，就能在里面输入redis的命令了。
