# 认证方案迁移说明

## 从 oidc-client-ts 迁移到 react-oidc-context

### 主要变更

1. **配置文件变更**
   - 旧文件：`src/auth/oidc.ts` (已删除)
   - 新文件：`src/auth/oidc-config.ts`

2. **App.tsx 变更**
   - 使用 `AuthProvider` 包装整个应用
   - 使用 `AuthGuard` 保护需要登录的页面

3. **登录页面变更**
   - 使用 `useAuth` hook 替代 `userManager`
   - 使用 `useNavigate` 进行路由跳转

4. **API 请求变更**
   - 使用 `getAccessToken()` 函数获取访问令牌
   - 不再需要异步获取用户信息

### 新增功能

1. **AuthGuard 组件**
   - 自动保护需要登录的页面
   - 处理加载状态和认证状态

2. **认证工具函数**
   - `useAccessToken()`: React hook 获取访问令牌
   - `getAccessToken()`: 同步函数获取访问令牌

3. **LogoutButton 组件**
   - 提供统一的登出功能

### 使用方法

#### 在组件中获取用户信息

```tsx
import { useAuth } from 'react-oidc-context';

const MyComponent = () => {
  const auth = useAuth();

  if (auth.isLoading) return <div>加载中...</div>;
  if (!auth.isAuthenticated) return <div>请先登录</div>;

  return <div>欢迎, {auth.user?.profile.name}</div>;
};
```

#### 在 API 请求中使用令牌

```tsx
import { getAccessToken } from '../auth/auth-utils';

const token = getAccessToken();
// 使用 token 进行 API 请求
```

#### 登出功能

```tsx
import LogoutButton from '../components/LogoutButton';

// 在需要的地方使用
<LogoutButton />;
```

### 配置说明

OIDC 配置在 `src/auth/oidc-config.ts` 中，主要配置项：

- `authority`: OIDC 服务地址
- `client_id`: 客户端 ID
- `redirect_uri`: 登录回调地址
- `scope`: 权限范围
- `onSigninCallback`: 登录成功回调
- `onSignoutCallback`: 登出成功回调

### 注意事项

1. 确保 `public/silent-renew.html` 文件存在，用于静默刷新
2. 所有需要登录的页面都应该使用 `AuthGuard` 包装
3. API 请求会自动获取最新的访问令牌
4. 用户信息会自动缓存和刷新
