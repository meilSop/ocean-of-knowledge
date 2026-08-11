# JDK8 安装 + IDEA 配置 完整教程（零基础一步到位）

- 我给你做**最简洁、最不容易出错、前端转后端一看就懂**的版本，**Windows + IDEA 通用**。

## 一、先安装 JDK8（10 分钟搞定）

### 1. 下载 JDK8（企业最稳定版）

下载地址（我给你选好无需登录的）：

👉 <https://www.azul.com/downloads/?version=java-8-lts&package=jdk>
选择：

- Operating System: Windows
- Architecture: x86 64-bit
- Download: .msi（双击直接装，自动配置环境，最省心）

### 2. 安装 JDK8（一路下一步）

1. 双击 .msi 文件
2. 全程 Next 到底
3. 最后 Finish

**✅ 这种安装方式不需要你手动配环境变量！自动配好！**

### 3. 验证是否安装成功

- 按 Win + R → 输入 cmd 打开命令行
- 输入：

```plaintext
java -version
javac -version
```

如果出现版本号 = **安装成功**

## 二、安装 IDEA（Java 最强开发工具）

### 1. 下载 IDEA 社区版（免费）

👉 <https://www.jetbrains.com/idea/download/>

选择：Community 社区版（免费够用）

### 2. 安装 IDEA

- 双击安装包
- 勾选以下选项（重要）：
  - .java
  - .class
  - Add to PATH
  - 桌面快捷方式

- 一路下一步 → 安装完成

## 三、IDEA 配置 JDK8（最关键一步）

### 方法 A：新建项目时配置

- 打开 IDEA → **New Project**
- 选择 **Java**
- **Project SDK** 点下拉 → 选择你安装的 1.8
- 没有就点 **Add SDK → JDK**，找到你 JDK 安装目录
  - 通常是：C:\Program Files\Zulu\zulu-8
- 点击 **Create**

  ✅ 完成！

### 方法 B：已有项目配置 JDK8

- 打开 IDEA 上方菜单：
  File → Project Structure
- 左侧 Project
- SDK 选择 1.8
- Language level 选择 8 - Lambdas
- 点 OK

## 四、测试：运行第一个 Java 程序

1. 在 src 上右键 → New → Java Class
2. 输入名字：Hello
3. 输入代码：

```java
public class Hello {
    public static void main(String[] args) {
        System.out.println("JDK8 + IDEA 安装成功！");
    }
}
```

1. 代码左边点 **绿色三角 ▶️ 运行**

控制台输出：

```plaintext
JDK8 + IDEA 安装成功！
```

🎉 恭喜你 Java 环境彻底搞定！
