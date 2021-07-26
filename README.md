# Tetris-vue3

使用 vue3 实现俄罗斯方块

[单机版本实现](https://github.com/cuixiaorui/tetris-vue3/tree/stand-alone)
[联机版本实现](https://github.com/cuixiaorui/tetris-vue3/tree/online)

## 实现原理

采用了 [Functional Core, Imperative Shell](https://marsbased.com/blog/2020/01/20/functional-core-imperative-shell/#:~:text=The%20pattern.%20This%20pattern%20is%20sometimes%20called%20functional,commands.%20We%20keep%20that%20code%20small%20and%20trivial.) 模式来实现

提高了可测试性

业务核心逻辑和视图逻辑拆分

可以移植到任意 UI 库




## todo

- [ ] 游戏重来


# 收获

  - 应用程序从 0 到 1 的全过程  

  - 用户故事来描述你的程序需求点  

  - tasking 的方式来管理你的开发进度  

  - vue3 最新的 setup script 语法糖的应用  

  - 使用单元测试提高开发效率  

  - 设计模式的应用  

    - 策略模式  

    - 工厂模式  

  - 重构技巧 （写出好代码 ）

 
## Tasking
### 单机

  - 用户进入游戏的时候可以看到游戏开始页面  

    ![](https://api2.mubu.com/v3/document_image/84c479b6-f86f-4887-9e33-dacaeaf27d0b-7425747.jpg)

    

  - 用户点击 startGame 可以开始游戏  

  - 用户在开始游戏的时候可以看到掉落的方块  

  - 方块掉落到最下面边界的时候就会停下来  

  - 方块掉落到其他方块的时候也会停下来  

  - 方块掉落的停下来的时候就会有新的方块掉下来  

    - 新的方块是随机产生的  

  - 用户可以操作方向键让正在掉落的方块移动，但是不会超过边界  

    - 左方向键向左  

    - 右方向键向右  

  - 用户用方块凑满了一行的话，会消除当前凑满的行，并且会看到上面的行会掉落下来  

  - 当方块超出最上面边界的时候，用户会看到游戏结束的提示  

  - 用户可以操作空格键来旋转正在掉落的方块?  

  - 用户可以操作方向键下，来加速正在掉落的方块掉落的速度?

### 联机

  - 用户可以看到对手的游戏界面

  - 用户通过对手的游戏界面看到的掉落的方块需要和对手正在掉落的方块一样

  - 用户可以看到对手的所有游戏操作

    方块的向下移动

    方块的向左移动

    方块的向右移动

    方块旋转

  - 用户消行了，对手会增加一行（这个行不可以被消除）

  - 用户游戏结束了，对手会收到游戏获胜的提示

  


## 双人对战

通过 websocket 来同步玩家的动作，来实现双人对战模式

### 同步的动作

- gameOver (游戏结束)

  - to other
    - gameWon

- eliminateLine (消除行)

  - to self

    - syncAddLine (同步 dival 视图)

  - to other
    - addLine (让其他玩家加行)

- moveBoxToDown (向下移动 box)

  - to other
    - moveBoxToDown

- moveBoxToLeft (向左移动 box)

  - to other
    - moveBoxToLeft

- moveBoxToRight (向右移动 box)

  - to other
    - moveBoxToRight

- rotateBox (旋转 box)

  - to other
    - rotateBox

- createBox (创建 box)
  - to other
    - createBox
