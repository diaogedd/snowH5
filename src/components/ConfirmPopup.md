# ConfirmPopup 确认弹窗组件

## 功能概述

`ConfirmPopup` 是一个基于 `antd-mobile` 的 `Popup` 组件封装的确认弹窗，提供了统一的确认对话框体验。

## 组件特性

- ✅ 支持自定义标题、内容和按钮文本
- ✅ 支持加载状态显示
- ✅ 支持异步操作
- ✅ 响应式设计
- ✅ TypeScript 类型支持

## 基础用法

### 1. 直接使用组件

```tsx
import React, { useState } from 'react';
import ConfirmPopup from './components/ConfirmPopup';

const MyComponent = () => {
  const [visible, setVisible] = useState(false);

  const handleConfirm = () => {
    console.log('用户确认了操作');
    setVisible(false);
  };

  const handleCancel = () => {
    console.log('用户取消了操作');
    setVisible(false);
  };

  return (
    <div>
      <button onClick={() => setVisible(true)}>显示确认弹窗</button>

      <ConfirmPopup
        visible={visible}
        title="删除确认"
        content="确定要删除这条记录吗？"
        confirmText="删除"
        cancelText="取消"
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </div>
  );
};
```

### 2. 使用 Hook（推荐）

```tsx
import React from 'react';
import ConfirmPopup from './components/ConfirmPopup';
import { useConfirmPopup } from './hooks/useConfirmPopup';

const MyComponent = () => {
  const confirmPopup = useConfirmPopup();

  const handleDelete = () => {
    confirmPopup.showConfirm({
      title: '删除确认',
      content: '确定要删除这条记录吗？此操作不可恢复。',
      confirmText: '删除',
      cancelText: '取消',
      onConfirm: async () => {
        // 执行删除操作
        await deleteRecord();
        console.log('删除成功');
      },
    });
  };

  return (
    <div>
      <button onClick={handleDelete}>删除记录</button>

      <ConfirmPopup
        visible={confirmPopup.visible}
        title={confirmPopup.title}
        content={confirmPopup.content}
        confirmText={confirmPopup.confirmText}
        cancelText={confirmPopup.cancelText}
        onConfirm={confirmPopup.handleConfirm}
        onCancel={confirmPopup.handleCancel}
        loading={confirmPopup.loading}
      />
    </div>
  );
};
```

## API 参考

### ConfirmPopup Props

| 参数        | 类型       | 默认值                 | 说明             |
| ----------- | ---------- | ---------------------- | ---------------- |
| visible     | boolean    | -                      | 是否显示弹窗     |
| title       | string     | '确认'                 | 弹窗标题         |
| content     | string     | '确定要执行此操作吗？' | 弹窗内容         |
| confirmText | string     | '确定'                 | 确认按钮文本     |
| cancelText  | string     | '取消'                 | 取消按钮文本     |
| onConfirm   | () => void | -                      | 确认回调函数     |
| onCancel    | () => void | -                      | 取消回调函数     |
| loading     | boolean    | false                  | 是否显示加载状态 |

### useConfirmPopup Hook

#### 返回值

| 参数          | 类型                                   | 说明         |
| ------------- | -------------------------------------- | ------------ |
| visible       | boolean                                | 弹窗显示状态 |
| title         | string                                 | 弹窗标题     |
| content       | string                                 | 弹窗内容     |
| confirmText   | string                                 | 确认按钮文本 |
| cancelText    | string                                 | 取消按钮文本 |
| loading       | boolean                                | 加载状态     |
| showConfirm   | (options: ConfirmPopupOptions) => void | 显示确认弹窗 |
| hideConfirm   | () => void                             | 隐藏确认弹窗 |
| handleConfirm | () => void                             | 处理确认操作 |
| handleCancel  | () => void                             | 处理取消操作 |

#### ConfirmPopupOptions

| 参数        | 类型                        | 默认值                 | 说明                   |
| ----------- | --------------------------- | ---------------------- | ---------------------- |
| title       | string                      | '确认'                 | 弹窗标题               |
| content     | string                      | '确定要执行此操作吗？' | 弹窗内容               |
| confirmText | string                      | '确定'                 | 确认按钮文本           |
| cancelText  | string                      | '取消'                 | 取消按钮文本           |
| onConfirm   | () => void \| Promise<void> | -                      | 确认回调函数，支持异步 |
| onCancel    | () => void                  | -                      | 取消回调函数           |

## 使用场景

### 1. 删除确认

```tsx
const handleDelete = () => {
  confirmPopup.showConfirm({
    title: '删除确认',
    content: '确定要删除这条记录吗？删除后无法恢复。',
    confirmText: '删除',
    cancelText: '取消',
    onConfirm: async () => {
      await deleteRecord(id);
      message.success('删除成功');
    },
  });
};
```

### 2. 操作确认

```tsx
const handlePublish = () => {
  confirmPopup.showConfirm({
    title: '发布确认',
    content: '确定要发布这个团购吗？发布后将无法修改。',
    confirmText: '发布',
    cancelText: '再想想',
    onConfirm: async () => {
      await publishGroup(groupId);
      message.success('发布成功');
    },
  });
};
```

### 3. 退出确认

```tsx
const handleExit = () => {
  confirmPopup.showConfirm({
    title: '退出确认',
    content: '当前有未保存的内容，确定要退出吗？',
    confirmText: '退出',
    cancelText: '保存',
    onConfirm: () => {
      navigate('/home');
    },
    onCancel: () => {
      saveDraft();
    },
  });
};
```

## 样式定制

组件使用了内联样式，你可以通过修改 `ConfirmPopup.tsx` 文件来自定义样式：

```tsx
// 修改弹窗样式
<Popup
  visible={visible}
  onMaskClick={onCancel}
  bodyStyle={{
    borderTopLeftRadius: '12px',  // 自定义圆角
    borderTopRightRadius: '12px',
    minHeight: '150px',           // 自定义高度
    backgroundColor: '#f8f9fa',   // 自定义背景色
  }}
>
```

## 注意事项

1. **异步操作**：`onConfirm` 回调支持异步操作，组件会自动处理加载状态
2. **错误处理**：异步操作中的错误会被捕获并打印到控制台
3. **状态管理**：使用 Hook 时，组件会自动管理弹窗状态
4. **性能优化**：所有回调函数都使用 `useCallback` 进行了优化
