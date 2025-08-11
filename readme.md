# API余额查询工具开发文档

## 项目简介
这是一个简单的API余额查询工具，允许用户通过输入API密钥查询其账户余额信息。工具采用纯前端实现，无需后端服务，直接在浏览器中运行。

## 功能说明
1. 支持输入API密钥进行认证
2. 查询账户余额信息（system_hard_limit_usd）
3. 以人民币（元）格式显示余额
4. 显示待入账金额信息
5. 余额不足提醒（当余额低于1元时）
6. 令牌状态智能识别（已禁用、不存在、无效）
7. 重新查询功能（无需重新输入API密钥）
8. 简洁美观的用户界面

## 文件结构
```
newapi/
├── newapi-balance.html  # 主应用文件
└── readme.md            # 开发文档
```

## 技术栈
- HTML5
- Tailwind CSS
- JavaScript

## 使用方法
1. 直接在浏览器中打开 `newapi-balance.html` 文件
2. 在输入框中输入您的API密钥
3. 点击"查询"按钮获取余额信息
4. 如需重新查询，点击"重新查询"按钮（无需重新输入密钥）
5. 当余额低于1元时，系统会显示黄色警告提醒及时充值

## API接口说明
### 基础URL
`https://api.kaka11.top/v1/dashboard/billing/subscription`

### 请求方法
GET

### 请求头
- `Authorization`: `Bearer {API_KEY}`  (其中 {API_KEY} 是用户输入的密钥)

### 成功响应格式
```json
{
  "system_hard_limit_usd": 100.0,  // 账户余额
  "pending_amount": 50.0,          // 待入账金额
  // 其他可能的响应字段...
}
```

### 错误响应格式 (401)
```json
{
  "message": "令牌状态不可用"  // 或 "无效的令牌" 等错误信息
}
```

## 令牌状态说明
- **已禁用**: 当API返回错误信息包含"不可用"时
- **不存在**: 当API返回错误信息包含"无效的令牌"时
- **无效**: 其他401错误情况

## 开发环境设置
1. 克隆或下载项目到本地
2. 使用任何HTTP服务器运行项目
   - Python: `python -m http.server 8080`
   - Node.js: `npx http-server -p 8080`
3. 在浏览器中访问 `http://localhost:8080/newapi-balance.html`

## 部署说明
可通过GitHub Pages部署此静态网站：
1. 创建GitHub仓库并上传文件
2. 进入仓库"Settings" > "Pages"
3. 选择分支和文件夹，点击"Save"
4. 访问生成的URL（如`https://<username>.github.io/<repository-name>/`）

## 注意事项
1. 确保您的API密钥安全，不要泄露给他人
2. 本工具仅用于查询余额信息，不会存储您的API密钥
3. 余额和待入账金额以元为单位显示，无需手动换算
4. 如果查询失败，请检查您的网络连接和API密钥是否有效

## 更新记录
- 初始版本：实现基本的余额查询功能
- 更新版本1：替换为新的API接口，优化余额显示逻辑
- 更新版本2：添加余额不足提醒功能，改进令牌状态识别
- 更新版本3：增加重新查询按钮功能，将金额单位从美元改为元

## 许可证
MIT License