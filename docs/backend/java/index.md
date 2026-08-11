# Java基础语法中需要注意的点

## 1. 静态方法中只能访问静态属性与静态方法

```java 
public class Test {
  static int a = 1;
  String b = "hello";
  
  // 定义静态方法
  public static void print() {
    System.out.println(a);
  }
  
  // 定义非静态方法, 可以调用静态方法与属性
  public void print1() {
    System.out.println(b);
    print();
  }
 
  // 静态方法中不能调用非静态方法与属性
  public static void main() {
    System.out.println(a);
    System.out.println(b);  // 这个会报错

    print();
    print1();  // 报错
  }
}
```

## 2. 方法中接受的属性与类中的属性相同时，需要用到this

```java
public class Test { 
  String a = "hello";
  public void print(String a) {
    this.a = a;
    System.out.println(this.a);
  }
}
```

## 3. 封装 的含义与意义

- 封装：将属性与方法组合在一起，封装后的对象，只能通过方法访问属性
- 封装的意义是确保对用户隐藏"敏感"数据
- 封装的实现方式：将类变量/属性声明为 private； 创建属性的getter和setter方法

```java
public class Person {
  private String name; // private = restricted access

  // Getter
  public String getName() {
    return name;
  }

  // Setter
  public void setName(String newName) {
    this.name = newName;
  }
}
```

### 为什么要封装

- 更好地控制类属性和方法
- 类属性可以设置为只读（如果只使用get方法），也可以设置为只写（如果只使用set方法）
- 灵活:程序员可以在不影响其他部分的情况下更改代码的一部分
- 提高数据的安全性
