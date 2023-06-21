## 一、antd v5 的 Menu 的使用
直接在 antd 官网复制想要的代码，根据需要进行修改。官网的设计中，利用函数 getItem( ) 创建列表项，如下：
```js
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
```
具体使用需注意：

1. 想要为每一个小项添加路由链接，以实现点击来切换界面中的内容，需要在 label 上添加。
```js
const item = getItem(<Link to={'/home'}>首页</Link>, '/home', <HomeOutlined />);
```
2. 想实现刷新界面后，仍然保持被选中的小项的高亮效果，需要借助 key 动态设置 Menu 中的属性：`selectedKeys`。可以让每一个小项的 key 为其路由路径，便于区分。

3. 想要实现，当选中二级列表的小项，在刷新界面后仍然保持展开且高亮的状态，需要动态设置 Menu 中的属性：`defaultOpenKeys`。具体实现方法，看个人爱好。

