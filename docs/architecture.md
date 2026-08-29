# TaskFlow 项目架构文档

## 1. 项目概述

TaskFlow 是一个团队任务协作管理系统，采用前后端分离架构，支持项目管理、任务分配、团队协作、文件共享、评论互动和通知推送等功能。

- **后端**：Python + FastAPI
- **前端**：Vue 3 + Vite
- **数据库**：MySQL
- **缓存**：Redis
- **部署**：Docker + Docker Compose

---

## 2. 整体目录结构

```
TaskFlow/
├── backend/                  # Python 后端
├── frontend/                 # Vue 前端
├── docs/                     # 项目文档
├── scripts/                  # 项目脚本
├── docker/                   # Docker 相关配置
├── uploads/                  # 用户上传文件
├── logs/                     # 日志文件
├── .env.example              # 全局环境变量示例
├── .gitignore                # Git 忽略文件
├── docker-compose.yml        # 启动整个项目
└── README.md                 # 项目说明
```

---

## 3. 后端架构（backend/）

后端基于 **FastAPI** 框架，采用分层架构设计，职责清晰、易于维护。

### 3.1 目录结构

```
backend/
├── app/                      # 后端核心代码
│   ├── api/                  # API 接口层（路由）
│   ├── models/               # 数据库模型（ORM）
│   ├── schemas/              # 数据验证模型（Pydantic）
│   ├── services/             # 业务逻辑层
│   ├── database/             # 数据库连接与 Session
│   ├── utils/                # 通用工具
│   ├── config/               # 项目配置
│   └── main.py               # FastAPI 启动入口
├── tests/                    # 自动化测试
├── migrations/               # 数据库迁移
├── requirements.txt          # Python 依赖
├── .env.example              # 环境变量示例
├── .gitignore
└── Dockerfile                # 后端 Docker 配置
```

### 3.2 分层职责

| 层级 | 目录 | 职责 |
|------|------|------|
| 接口层 | `app/api/` | 定义 HTTP 路由，接收请求，返回响应 |
| 数据验证层 | `app/schemas/` | 使用 Pydantic 定义请求/响应数据结构 |
| 业务逻辑层 | `app/services/` | 处理核心业务逻辑，协调数据流转 |
| 数据模型层 | `app/models/` | 定义 SQLAlchemy ORM 模型 |
| 数据库层 | `app/database/` | 管理数据库连接和 Session |
| 工具层 | `app/utils/` | 安全、日志、响应格式等通用工具 |
| 配置层 | `app/config/` | 环境变量与全局配置 |

### 3.3 API 接口模块

| 模块 | 文件 | 功能 |
|------|------|------|
| 认证 | `api/auth.py` | 登录、注册、Token 刷新 |
| 用户 | `api/users.py` | 用户信息查询与修改 |
| 项目 | `api/projects.py` | 项目增删改查、成员管理 |
| 任务 | `api/tasks.py` | 任务增删改查、状态变更 |
| 评论 | `api/comments.py` | 任务评论的增删改查 |
| 文件 | `api/files.py` | 文件上传与下载 |
| 通知 | `api/notifications.py` | 系统通知推送与查询 |
| 公共依赖 | `api/deps.py` | 鉴权、数据库 Session 等公共依赖 |

### 3.4 数据库模型

| 模型 | 文件 | 说明 |
|------|------|------|
| User | `models/user.py` | 用户信息 |
| Project | `models/project.py` | 项目信息 |
| Task | `models/task.py` | 任务信息 |
| Comment | `models/comment.py` | 评论信息 |
| File | `models/file.py` | 上传文件记录 |
| Notification | `models/notification.py` | 通知记录 |

### 3.5 工具模块

| 工具 | 文件 | 功能 |
|------|------|------|
| 安全 | `utils/security.py` | 密码加密、JWT 生成与校验 |
| 响应 | `utils/response.py` | 统一 API 返回格式封装 |
| 日志 | `utils/logger.py` | 日志记录配置 |
| 文件 | `utils/file.py` | 文件处理工具 |
| 时间 | `utils/time.py` | 时间格式化与转换 |

---

## 4. 前端架构（frontend/）

前端基于 **Vue 3** + **Vite** 构建，使用 Pinia 进行状态管理，Vue Router 进行路由控制。

### 4.1 目录结构

```
frontend/
├── src/
│   ├── api/                  # 调用 Python API
│   ├── assets/               # 图片、图标等资源
│   ├── components/           # 公共组件
│   ├── layouts/              # 页面布局
│   ├── views/                # 页面视图
│   ├── router/               # 前端路由
│   ├── stores/               # 全局状态（Pinia）
│   ├── utils/                # 前端工具
│   ├── App.vue               # 根组件
│   └── main.js               # 应用入口
├── public/                   # 静态资源
├── package.json              # 前端依赖
├── vite.config.js            # Vite 配置
└── Dockerfile                # 前端 Docker 配置
```

### 4.2 页面模块

| 页面 | 文件 | 功能 |
|------|------|------|
| 登录 | `views/Login.vue` | 用户登录 |
| 注册 | `views/Register.vue` | 用户注册 |
| 仪表盘 | `views/Dashboard.vue` | 项目概览 |
| 项目列表 | `views/Projects.vue` | 项目管理 |
| 项目详情 | `views/ProjectDetail.vue` | 单个项目详情 |
| 任务列表 | `views/Tasks.vue` | 任务管理 |
| 任务详情 | `views/TaskDetail.vue` | 单个任务详情 |
| 日历 | `views/Calendar.vue` | 任务日历视图 |
| 成员 | `views/Members.vue` | 团队成员管理 |
| 通知 | `views/Notifications.vue` | 通知中心 |
| 设置 | `views/Settings.vue` | 用户设置 |

### 4.3 公共组件

| 组件 | 文件 | 功能 |
|------|------|------|
| 任务卡片 | `components/TaskCard.vue` | 任务展示卡片 |
| 项目卡片 | `components/ProjectCard.vue` | 项目展示卡片 |
| 用户头像 | `components/UserAvatar.vue` | 用户头像组件 |
| 任务表单 | `components/TaskForm.vue` | 任务创建/编辑表单 |
| 确认对话框 | `components/ConfirmDialog.vue` | 通用确认弹窗 |

### 4.4 状态管理（Pinia）

| Store | 文件 | 管理内容 |
|-------|------|----------|
| user | `stores/user.js` | 用户登录状态与信息 |
| project | `stores/project.js` | 项目列表与当前项目 |
| task | `stores/task.js` | 任务列表与当前任务 |

### 4.5 前端工具

| 工具 | 文件 | 功能 |
|------|------|------|
| 请求封装 | `utils/request.js` | Axios 请求封装（拦截器、Token 注入） |
| 鉴权 | `utils/auth.js` | Token 存取与校验 |
| 格式化 | `utils/format.js` | 时间、状态等格式化工具 |

---

## 5. 数据库设计

数据库使用 **MySQL**，初始化脚本位于 `docker/mysql/init.sql`。

### 5.1 主要数据表

- **users**：用户表
- **projects**：项目表
- **project_members**：项目成员关联表
- **tasks**：任务表
- **comments**：评论表
- **files**：文件表
- **notifications**：通知表

详细表结构参见 [docs/database/tables.md](database/tables.md)，ER 图参见 [docs/database/er-diagram.png](database/er-diagram.png)。

---

## 6. 部署架构

项目使用 **Docker Compose** 进行容器化部署，一键启动所有服务。

### 6.1 服务组成

| 服务 | 说明 |
|------|------|
| backend | FastAPI 后端服务 |
| frontend | Vue 前端服务（Nginx 托管） |
| mysql | MySQL 数据库 |
| redis | Redis 缓存 |

### 6.2 Docker 配置

- `backend/Dockerfile`：后端镜像构建
- `frontend/Dockerfile`：前端镜像构建
- `docker/mysql/init.sql`：MySQL 初始化脚本
- `docker/redis/redis.conf`：Redis 配置
- `docker-compose.yml`：编排所有服务

### 6.3 启动方式

```bash
# 启动所有服务
docker-compose up -d

# 查看日志
docker-compose logs -f

# 停止服务
docker-compose down
```

---

## 7. 项目脚本（scripts/）

| 脚本 | 文件 | 功能 |
|------|------|------|
| 数据库初始化 | `scripts/init_db.py` | 创建数据库表结构 |
| 测试数据 | `scripts/seed_data.py` | 生成测试用数据 |

---

## 8. 文档结构（docs/）

```
docs/
├── api/                      # API 接口文档
│   ├── auth.md
│   ├── users.md
│   ├── projects.md
│   ├── tasks.md
│   └── notifications.md
├── database/                 # 数据库设计文档
│   ├── tables.md
│   └── er-diagram.png
├── frontend/                 # 前端设计文档
│   └── ui-design.md
└── architecture.md           # 项目整体架构（本文档）
```

---

## 9. 技术栈总结

### 后端
- **框架**：FastAPI
- **ORM**：SQLAlchemy
- **数据验证**：Pydantic
- **数据库**：MySQL
- **缓存**：Redis
- **鉴权**：JWT
- **迁移**：Alembic

### 前端
- **框架**：Vue 3
- **构建工具**：Vite
- **状态管理**：Pinia
- **路由**：Vue Router
- **HTTP 客户端**：Axios

### 部署
- **容器化**：Docker
- **编排**：Docker Compose
- **Web 服务器**：Nginx（前端托管）

---

## 10. 开发流程

1. **环境准备**：复制 `.env.example` 为 `.env`，配置环境变量
2. **数据库初始化**：运行 `scripts/init_db.py` 创建表结构
3. **测试数据**：运行 `scripts/seed_data.py` 生成测试数据
4. **启动后端**：`uvicorn app.main:app --reload`
5. **启动前端**：`npm run dev`
6. **生产部署**：`docker-compose up -d`

---

## 11. 约定与规范

- 后端遵循分层架构：API → Service → Model，层间职责清晰
- API 返回统一响应格式（由 `utils/response.py` 封装）
- 密码使用 bcrypt 加密存储
- 鉴权采用 JWT Token 机制
- 前端 API 请求统一通过 `utils/request.js` 封装，自动注入 Token
- 日志统一通过 `utils/logger.py` 记录，输出至 `logs/` 目录
- 用户上传文件统一存放于 `uploads/` 目录
