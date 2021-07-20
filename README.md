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
