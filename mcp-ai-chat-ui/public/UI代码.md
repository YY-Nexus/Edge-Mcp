# 
### app/dashboard/page.tsx
```typescript
// app/dashboard/page.tsx
'use client';

import React from 'react';
import { PageTemplate } from '@/components/layout/page-template';
import { StatCard, StatCardGroup } from '@/components/business/stat-card';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  FileText, 
  BarChart3, 
  Brain, 
  Activity,
  TrendingUp,
  MoreHorizontal,
  CheckCircle,
  AlertCircle,
  Clock
} from 'lucide-react';
import { DataTable } from '@/components/business/data-table';

export default function DashboardPage() {
  // 模拟统计数据
  const stats = [
    {
      title: '总用户数',
      value: '12,361',
      change: { value: 12, type: 'increase' as const, text: '较上月' },
      icon: <Users className="h-5 w-5" />,
      description: '平台注册用户总数'
    },
    {
      title: '内容数量',
      value: '2,456',
      change: { value: 8, type: 'increase' as const, text: '较上月' },
      icon: <FileText className="h-5 w-5" />,
      description: '平台发布内容总数'
    },
    {
      title: '数据分析',
      value: '892',
      change: { value: 15, type: 'increase' as const, text: '较上月' },
      icon: <BarChart3 className="h-5 w-5" />,
      description: '数据分析报告总数'
    },
    {
      title: 'AI任务',
      value: '124',
      change: { value: 3, type: 'increase' as const, text: '较上月' },
      icon: <Brain className="h-5 w-5" />,
      description: 'AI处理任务总数'
    }
  ];

  // 模拟待办任务数据
  const tasks = [
    { id: 1, title: '审核新用户注册申请', status: 'pending', priority: 'high', dueDate: '2023-06-15' },
    { id: 2, title: '更新系统安全策略', status: 'in-progress', priority: 'medium', dueDate: '2023-06-20' },
    { id: 3, title: '优化数据库查询性能', status: 'completed', priority: 'high', dueDate: '2023-06-10' },
    { id: 4, title: '准备月度运营报告', status: 'pending', priority: 'low', dueDate: '2023-06-30' }
  ];

  // 任务表格列
  const taskColumns = [
    { key: 'title', title: '任务标题' },
    { 
      key: 'status', 
      title: '状态',
      render: (value: string) => {
        const statusMap = {
          'pending': { label: '待处理', color: 'bg-yellow-100 text-yellow-800' },
          'in-progress': { label: '进行中', color: 'bg-blue-100 text-blue-800' },
          'completed': { label: '已完成', color: 'bg-green-100 text-green-800' }
        };
        const status = statusMap[value as keyof typeof statusMap] || statusMap['pending'];
        return <span className={`px-2 py-1 rounded-full text-xs ${status.color}`}>{status.label}</span>;
      }
    },
    { 
      key: 'priority', 
      title: '优先级',
      render: (value: string) => {
        const priorityMap = {
          'high': { label: '高', color: 'text-red-500' },
          'medium': { label: '中', color: 'text-yellow-500' },
          'low': { label: '低', color: 'text-green-500' }
        };
        const priority = priorityMap[value as keyof typeof priorityMap] || priorityMap['medium'];
        return <span className={`font-medium ${priority.color}`}>{priority.label}</span>;
      }
    },
    { key: 'dueDate', title: '截止日期' }
  ];

  // 模拟系统状态数据
  const systemStatus = [
    { name: 'CPU使用率', value: 45, status: 'normal' },
    { name: '内存使用率', value: 62, status: 'normal' },
    { name: '磁盘使用率', value: 78, status: 'warning' },
    { name: '网络延迟', value: 32, status: 'normal' }
  ];

  return (
    <PageTemplate
      title="数据中心"
      description="系统概览页面，包含核心数据看板、关键指标统计图表、待办任务列表和系统状态卡片"
      breadcrumbs={[
        { title: '首页', path: '/dashboard' }
      ]}
      actions={
        <Button>
          <TrendingUp className="mr-2 h-4 w-4" />
          生成报告
        </Button>
      }
    >
      <div className="space-y-8">
        {/* 统计卡片 */}
        <StatCardGroup>
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              title={stat.title}
              value={stat.value}
              change={stat.change}
              icon={stat.icon}
              description={stat.description}
            />
          ))}
        </StatCardGroup>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 待办任务 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="mr-2 h-5 w-5" />
                待办任务
              </CardTitle>
              <CardDescription>需要处理的任务列表</CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable
                data={tasks}
                columns={taskColumns}
                pagination={false}
                actions={(row) => (
                  <>
                    <button className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100">
                      查看详情
                    </button>
                    <button className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100">
                      标记完成
                    </button>
                  </>
                )}
              />
            </CardContent>
          </Card>

          {/* 系统状态 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="mr-2 h-5 w-5" />
                系统状态
              </CardTitle>
              <CardDescription>当前系统运行状态</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {systemStatus.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">{item.name}</span>
                      <span className="text-sm">{item.value}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          item.status === 'normal' ? 'bg-green-500' : 
                          item.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${item.value}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 最近活动 */}
        <Card>
          <CardHeader>
            <CardTitle>最近活动</CardTitle>
            <CardDescription>平台最新活动记录</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { id: 1, user: '张三', action: '创建了新文章', time: '2分钟前', icon: <FileText className="h-5 w-5 text-blue-500" /> },
                { id: 2, user: '李四', action: '完成了数据分析任务', time: '15分钟前', icon: <BarChart3 className="h-5 w-5 text-green-500" /> },
                { id: 3, user: '王五', action: '更新了用户权限', time: '1小时前', icon: <Users className="h-5 w-5 text-purple-500" /> },
                { id: 4, user: '赵六', action: '上传了新文件', time: '2小时前', icon: <Brain className="h-5 w-5 text-amber-500" /> }
              ].map((activity) => (
                <div key={activity.id} className="flex items-center">
                  <div className="mr-3 p-2 rounded-full bg-gray-100">
                    {activity.icon}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{activity.user} {activity.action}</p>
                    <p className="text-sm text-gray-500">{activity.time}</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </PageTemplate>
  );
}

```
### app/users/page.tsx
```typescript
// app/users/page.tsx
'use client';

import React, { useState } from 'react';
import { PageTemplate } from '@/components/layout/page-template';
import { DataTable } from '@/components/business/data-table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { 
  Plus, 
  Search, 
  MoreHorizontal, 
  UserCheck, 
  UserX, 
  Mail,
  Calendar,
  Shield
} from 'lucide-react';

export default function UsersPage() {
  // 模拟用户数据
  const [users, setUsers] = useState([
    { 
      id: 1, 
      name: '张三', 
      email: 'zhangsan@example.com', 
      role: '管理员', 
      status: 'active',
      registrationDate: '2023-01-15',
      lastLogin: '2023-06-10'
    },
    { 
      id: 2, 
      name: '李四', 
      email: 'lisi@example.com', 
      role: '编辑', 
      status: 'active',
      registrationDate: '2023-02-20',
      lastLogin: '2023-06-09'
    },
    { 
      id: 3, 
      name: '王五', 
      email: 'wangwu@example.com', 
      role: '用户', 
      status: 'inactive',
      registrationDate: '2023-03-05',
      lastLogin: '2023-05-20'
    },
    { 
      id: 4, 
      name: '赵六', 
      email: 'zhaoliu@example.com', 
      role: '编辑', 
      status: 'active',
      registrationDate: '2023-04-12',
      lastLogin: '2023-06-08'
    },
    { 
      id: 5, 
      name: '钱七', 
      email: 'qianqi@example.com', 
      role: '用户', 
      status: 'banned',
      registrationDate: '2023-05-01',
      lastLogin: '2023-05-15'
    }
  ]);

  // 用户表格列
  const userColumns = [
    { key: 'name', title: '姓名' },
    { key: 'email', title: '邮箱' },
    { key: 'role', title: '角色' },
    { 
      key: 'status', 
      title: '状态',
      render: (value: string) => {
        const statusMap = {
          'active': { label: '活跃', color: 'bg-green-100 text-green-800' },
          'inactive': { label: '未激活', color: 'bg-gray-100 text-gray-800' },
          'banned': { label: '已封禁', color: 'bg-red-100 text-red-800' }
        };
        const status = statusMap[value as keyof typeof statusMap] || statusMap['inactive'];
        return <Badge className={status.color}>{status.label}</Badge>;
      }
    },
    { key: 'registrationDate', title: '注册日期' },
    { key: 'lastLogin', title: '最后登录' }
  ];

  return (
    <PageTemplate
      title="用户管理"
      description="统一管理平台用户、角色和权限的模块"
      breadcrumbs={[
        { title: '首页', path: '/dashboard' },
        { title: '用户管理', path: '/users' }
      ]}
      actions={
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          添加用户
        </Button>
      }
    >
      <div className="space-y-6">
        {/* 搜索和筛选 */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="搜索用户..."
              className="pl-8"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="cursor-pointer">全部</Badge>
            <Badge variant="secondary" className="cursor-pointer">管理员</Badge>
            <Badge variant="secondary" className="cursor-pointer">编辑</Badge>
            <Badge variant="secondary" className="cursor-pointer">用户</Badge>
          </div>
        </div>

        {/* 用户表格 */}
        <DataTable
          data={users}
          columns={userColumns}
          actions={(row) => (
            <>
              <DropdownMenuItem onClick={() => console.log('查看用户', row.id)}>
                <UserCheck className="mr-2 h-4 w-4" />
                查看详情
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => console.log('编辑用户', row.id)}>
                <Shield className="mr-2 h-4 w-4" />
                编辑权限
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => console.log('发送邮件', row.id)}>
                <Mail className="mr-2 h-4 w-4" />
                发送邮件
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => {
                  const updatedUsers = users.map(user => 
                    user.id === row.id 
                      ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' } 
                      : user
                  );
                  setUsers(updatedUsers);
                }}
              >
                {row.status === 'active' ? (
                  <>
                    <UserX className="mr-2 h-4 w-4" />
                    禁用账户
                  </>
                ) : (
                  <>
                    <UserCheck className="mr-2 h-4 w-4" />
                    启用账户
                  </>
                )}
              </DropdownMenuItem>
            </>
          )}
        />

        {/* 统计信息 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg border">
            <div className="text-2xl font-bold">{users.length}</div>
            <div className="text-sm text-gray-500">总用户数</div>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <div className="text-2xl font-bold">
              {users.filter(u => u.status === 'active').length}
            </div>
            <div className="text-sm text-gray-500">活跃用户</div>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <div className="text-2xl font-bold">
              {users.filter(u => u.role === '管理员').length}
            </div>
            <div className="text-sm text-gray-500">管理员</div>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
}

```
### app/roles/page.tsx
```typescript
// app/roles/page.tsx
'use client';

import React, { useState } from 'react';
import { PageTemplate } from '@/components/layout/page-template';
import { DataTable } from '@/components/business/data-table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Plus, 
  MoreHorizontal, 
  Shield, 
  Users,
  Settings,
  Trash2,
  Edit
} from 'lucide-react';

export default function RolesPage() {
  // 模拟角色数据
  const [roles, setRoles] = useState([
    { 
      id: 1, 
      name: '超级管理员', 
      description: '拥有系统所有权限',
      userCount: 2,
      permissions: ['用户管理', '内容管理', '数据分析', '系统设置', '项目管理']
    },
    { 
      id: 2, 
      name: '内容管理员', 
      description: '负责内容管理和审核',
      userCount: 5,
      permissions: ['内容管理', '数据分析']
    },
    { 
      id: 3, 
      name: '数据分析师', 
      description: '负责数据分析和报告生成',
      userCount: 3,
      permissions: ['数据分析']
    },
    { 
      id: 4, 
      name: '项目经理', 
      description: '负责项目管理和执行',
      userCount: 4,
      permissions: ['项目管理', '数据分析']
    },
    { 
      id: 5, 
      name: '普通用户', 
      description: '基本权限用户',
      userCount: 15,
      permissions: ['查看内容']
    }
  ]);

  // 角色表格列
  const roleColumns = [
    { key: 'name', title: '角色名称' },
    { key: 'description', title: '描述' },
    { 
      key: 'userCount', 
      title: '用户数',
      render: (value: number) => (
        <div className="flex items-center">
          <Users className="mr-1 h-4 w-4 text-gray-500" />
          {value}
        </div>
      )
    },
    { 
      key: 'permissions', 
      title: '权限',
      render: (value: string[]) => (
        <div className="flex flex-wrap gap-1">
          {value.slice(0, 2).map((permission, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {permission}
            </Badge>
          ))}
          {value.length > 2 && (
            <Badge variant="outline" className="text-xs">
              +{value.length - 2}
            </Badge>
          )}
        </div>
      )
    }
  ];

  // 模拟权限数据
  const permissions = [
    { id: 1, name: '用户管理', description: '管理平台用户和角色', category: '用户管理' },
    { id: 2, name: '内容管理', description: '管理平台内容和媒体', category: '内容管理' },
    { id: 3, name: '数据分析', description: '查看和分析平台数据', category: '数据分析' },
    { id: 4, name: '系统设置', description: '配置系统参数和设置', category: '系统设置' },
    { id: 5, name: '项目管理', description: '管理项目开发和执行', category: '项目管理' },
    { id: 6, name: '商务功能', description: '使用商务相关功能', category: '商务功能' },
    { id: 7, name: '智能引擎', description: '使用AI和智能功能', category: '智能引擎' }
  ];

  return (
    <PageTemplate
      title="角色权限"
      description="角色定义与权限分配界面，可视化权限矩阵，支持自定义角色创建和权限配置"
      breadcrumbs={[
        { title: '首页', path: '/dashboard' },
        { title: '用户管理', path: '/users' },
        { title: '角色权限', path: '/roles' }
      ]}
      actions={
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          创建角色
        </Button>
      }
    >
      <div className="space-y-8">
        {/* 角色列表 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="mr-2 h-5 w-5" />
              角色列表
            </CardTitle>
            <CardDescription>系统中的所有角色及其权限</CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable
              data={roles}
              columns={roleColumns}
              actions={(row) => (
                <>
                  <button className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100">
                    <Edit className="inline mr-2 h-4 w-4" />
                    编辑角色
                  </button>
                  <button className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100">
                    <Settings className="inline mr-2 h-4 w-4" />
                    权限配置
                  </button>
                  <button className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100 text-red-500">
                    <Trash2 className="inline mr-2 h-4 w-4" />
                    删除角色
                  </button>
                </>
              )}
            />
          </CardContent>
        </Card>

        {/* 权限矩阵 */}
        <Card>
          <CardHeader>
            <CardTitle>权限矩阵</CardTitle>
            <CardDescription>角色与权限的对应关系</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="p-2 text-left">角色/权限</th>
                    {permissions.map(permission => (
                      <th key={permission.id} className="p-2 text-center text-xs">
                        {permission.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {roles.map(role => (
                    <tr key={role.id} className="border-b">
                      <td className="p-2 font-medium">{role.name}</td>
                      {permissions.map(permission => (
                        <td key={permission.id} className="p-2 text-center">
                          {role.permissions.includes(permission.name) ? (
                            <div className="w-4 h-4 bg-green-500 rounded-full mx-auto"></div>
                          ) : (
                            <div className="w-4 h-4 bg-gray-200 rounded-full mx-auto"></div>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* 权限列表 */}
        <Card>
          <CardHeader>
            <CardTitle>系统权限</CardTitle>
            <CardDescription>系统中所有可用的权限</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {permissions.map(permission => (
                <div key={permission.id} className="border rounded-lg p-4">
                  <div className="font-medium">{permission.name}</div>
                  <div className="text-sm text-gray-500 mt-1">{permission.description}</div>
                  <Badge variant="outline" className="mt-2">{permission.category}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </PageTemplate>
  );
}

```
### app/bans/page.tsx
```typescript
// app/bans/page.tsx
'use client';

import React, { useState } from 'react';
import { PageTemplate } from '@/components/layout/page-template';
import { DataTable } from '@/components/business/data-table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  UserX, 
  Calendar, 
  MoreHorizontal, 
  CheckCircle,
  XCircle,
  Clock,
  Search
} from 'lucide-react';

export default function BansPage() {
  // 模拟封禁用户数据
  const [bannedUsers, setBannedUsers] = useState([
    { 
      id: 1, 
      name: '钱七', 
      email: 'qianqi@example.com', 
      reason: '发布违规内容',
      bannedBy: '管理员',
      banDate: '2023-05-20',
      expiryDate: '2023-06-20',
      status: 'active'
    },
    { 
      id: 2, 
      name: '孙八', 
      email: 'sunba@example.com', 
      reason: '多次恶意评论',
      bannedBy: '内容管理员',
      banDate: '2023-05-25',
      expiryDate: '2023-06-25',
      status: 'active'
    },
    { 
      id: 3, 
      name: '周九', 
      email: 'zhoujiu@example.com', 
      reason: '滥用系统功能',
      bannedBy: '管理员',
      banDate: '2023-04-10',
      expiryDate: '2023-05-10',
      status: 'expired'
    },
    { 
      id: 4, 
      name: '吴十', 
      email: 'wushi@example.com', 
      reason: '尝试攻击系统',
      bannedBy: '管理员',
      banDate: '2023-03-15',
      expiryDate: '永久',
      status: 'active'
    }
  ]);

  // 封禁用户表格列
  const banColumns = [
    { key: 'name', title: '用户名' },
    { key: 'email', title: '邮箱' },
    { key: 'reason', title: '封禁原因' },
    { key: 'bannedBy', title: '操作人' },
    { key: 'banDate', title: '封禁日期' },
    { key: 'expiryDate', title: '到期日期' },
    { 
      key: 'status', 
      title: '状态',
      render: (value: string) => {
        const statusMap = {
          'active': { label: '生效中', color: 'bg-red-100 text-red-800' },
          'expired': { label: '已过期', color: 'bg-gray-100 text-gray-800' }
        };
        const status = statusMap[value as keyof typeof statusMap] || statusMap['expired'];
        return <Badge className={status.color}>{status.label}</Badge>;
      }
    }
  ];

  // 解封用户
  const unbanUser = (userId: number) => {
    setBannedUsers(bannedUsers.map(user => 
      user.id === userId ? { ...user, status: 'expired' } : user
    ));
  };

  return (
    <PageTemplate
      title="封禁管理"
      description="管理被封禁用户的列表，显示封禁原因、封禁时间和操作记录"
      breadcrumbs={[
        { title: '首页', path: '/dashboard' },
        { title: '用户管理', path: '/users' },
        { title: '封禁管理', path: '/bans' }
      ]}
    >
      <div className="space-y-6">
        {/* 搜索和筛选 */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="搜索用户..."
              className="pl-8"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="cursor-pointer">全部</Badge>
            <Badge variant="secondary" className="cursor-pointer">生效中</Badge>
            <Badge variant="secondary" className="cursor-pointer">已过期</Badge>
          </div>
        </div>

        {/* 封禁用户表格 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <UserX className="mr-2 h-5 w-5" />
              封禁用户列表
            </CardTitle>
            <CardDescription>当前被封禁的用户及其封禁信息</CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable
              data={bannedUsers}
              columns={banColumns}
              actions={(row) => (
                <>
                  {row.status === 'active' && (
                    <button 
                      className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100 text-green-600"
                      onClick={() => unbanUser(row.id)}
                    >
                      <CheckCircle className="inline mr-2 h-4 w-4" />
                      解封用户
                    </button>
                  )}
                  <button className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100">
                    查看详情
                  </button>
                  <button className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100">
                    延长封禁
                  </button>
                </>
              )}
            />
          </CardContent>
        </Card>

        {/* 统计信息 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <div className="p-2 rounded-full bg-red-100 mr-3">
                  <XCircle className="h-5 w-5 text-red-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    {bannedUsers.filter(u => u.status === 'active').length}
                  </div>
                  <div className="text-sm text-gray-500">生效中封禁</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <div className="p-2 rounded-full bg-gray-100 mr-3">
                  <Clock className="h-5 w-5 text-gray-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    {bannedUsers.filter(u => u.status === 'expired').length}
                  </div>
                  <div className="text-sm text-gray-500">已过期封禁</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <div className="p-2 rounded-full bg-blue-100 mr-3">
                  <Calendar className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{bannedUsers.length}</div>
                  <div className="text-sm text-gray-500">总封禁数</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageTemplate>
  );
}

```
### app/articles/page.tsx
```typescript
// app/articles/page.tsx
'use client';

import React, { useState } from 'react';
import { PageTemplate } from '@/components/layout/page-template';
import { DataTable } from '@/components/business/data-table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Plus, 
  Search, 
  MoreHorizontal, 
  Edit,
  Trash2,
  Eye,
  FileText,
  Calendar,
  TrendingUp,
  Filter
} from 'lucide-react';

export default function ArticlesPage() {
  // 模拟文章数据
  const [articles, setArticles] = useState([
    { 
      id: 1, 
      title: 'YanYu Cloud³ 平台新功能发布', 
      category: '产品动态',
      author: '张三',
      status: 'published',
      publishDate: '2023-06-01',
      views: 1250,
      comments: 24
    },
    { 
      id: 2, 
      title: '如何使用数据分析功能提升业务效率', 
      category: '使用指南',
      author: '李四',
      status: 'published',
      publishDate: '2023-05-28',
      views: 890,
      comments: 15
    },
    { 
      id: 3, 
      title: '系统安全更新公告', 
      category: '公告',
      author: '王五',
      status: 'draft',
      publishDate: null,
      views: 0,
      comments: 0
    },
    { 
      id: 4, 
      title: 'AI智能引擎使用技巧分享', 
      category: '技术分享',
      author: '赵六',
      status: 'published',
      publishDate: '2023-05-20',
      views: 2100,
      comments: 42
    },
    { 
      id: 5, 
      title: '项目管理最佳实践', 
      category: '使用指南',
      author: '钱七',
      status: 'archived',
      publishDate: '2023-04-15',
      views: 1560,
      comments: 31
    }
  ]);

  // 文章表格列
  const articleColumns = [
    { key: 'title', title: '标题' },
    { key: 'category', title: '分类' },
    { key: 'author', title: '作者' },
    { 
      key: 'status', 
      title: '状态',
      render: (value: string) => {
        const statusMap = {
          'published': { label: '已发布', color: 'bg-green-100 text-green-800' },
          'draft': { label: '草稿', color: 'bg-yellow-100 text-yellow-800' },
          'archived': { label: '已归档', color: 'bg-gray-100 text-gray-800' }
        };
        const status = statusMap[value as keyof typeof statusMap] || statusMap['draft'];
        return <Badge className={status.color}>{status.label}</Badge>;
      }
    },
    { 
      key: 'publishDate', 
      title: '发布日期',
      render: (value: string | null) => value || '-'
    },
    { 
      key: 'views', 
      title: '浏览量',
      render: (value: number) => (
        <div className="flex items-center">
          <Eye className="mr-1 h-4 w-4 text-gray-500" />
          {value}
        </div>
      )
    },
    { 
      key: 'comments', 
      title: '评论数',
      render: (value: number) => (
        <div className="flex items-center">
          <FileText className="mr-1 h-4 w-4 text-gray-500" />
          {value}
        </div>
      )
    }
  ];

  // 文章分类
  const categories = ['全部', '产品动态', '使用指南', '公告', '技术分享'];

  // 文章状态
  const statuses = ['全部', '已发布', '草稿', '已归档'];

  return (
    <PageTemplate
      title="文章管理"
      description="文章列表与编辑界面，支持富文本编辑、草稿保存、发布状态管理，包含阅读量统计图表"
      breadcrumbs={[
        { title: '首页', path: '/dashboard' },
        { title: '内容管理', path: '/content' },
        { title: '文章管理', path: '/articles' }
      ]}
      actions={
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          新建文章
        </Button>
      }
    >
      <div className="space-y-6">
        {/* 搜索和筛选 */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="搜索文章..."
              className="pl-8"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <div className="flex items-center">
              <Filter className="mr-2 h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-500 mr-2">分类:</span>
            </div>
            {categories.map(category => (
              <Badge 
                key={category} 
                variant={category === '全部' ? 'default' : 'outline'} 
                className="cursor-pointer"
              >
                {category}
              </Badge>
            ))}
          </div>
          
          <div className="flex flex-wrap gap-2">
            <div className="flex items-center">
              <span className="text-sm text-gray-500 mr-2">状态:</span>
            </div>
            {statuses.map(status => (
              <Badge 
                key={status} 
                variant={status === '全部' ? 'default' : 'outline'} 
                className="cursor-pointer"
              >
                {status}
              </Badge>
            ))}
          </div>
        </div>

        {/* 文章表格 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="mr-2 h-5 w-5" />
              文章列表
            </CardTitle>
            <CardDescription>平台中的所有文章</CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable
              data={articles}
              columns={articleColumns}
              actions={(row) => (
                <>
                  <button className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100">
                    <Eye className="inline mr-2 h-4 w-4" />
                    预览
                  </button>
                  <button className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100">
                    <Edit className="inline mr-2 h-4 w-4" />
                    编辑
                  </button>
                  {row.status === 'published' && (
                    <button className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100">
                      <TrendingUp className="inline mr-2 h-4 w-4" />
                      查看统计
                    </button>
                  )}
                  <button className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100 text-red-500">
                    <Trash2 className="inline mr-2 h-4 w-4" />
                    删除
                  </button>
                </>
              )}
            />
          </CardContent>
        </Card>

        {/* 统计信息 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{articles.length}</div>
              <div className="text-sm text-gray-500">总文章数</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">
                {articles.filter(a => a.status === 'published').length}
              </div>
              <div className="text-sm text-gray-500">已发布</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">
                {articles.filter(a => a.status === 'draft').length}
              </div>
              <div className="text-sm text-gray-500">草稿</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">
                {articles.reduce((sum, article) => sum + article.views, 0)}
              </div>
              <div className="text-sm text-gray-500">总浏览量</div>
            </CardContent>
          </Card>
        </div>

        {/* 热门文章 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="mr-2 h-5 w-5" />
              热门文章
            </CardTitle>
            <CardDescription>浏览量最高的文章</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {articles
                .filter(a => a.status === 'published')
                .sort((a, b) => b.views - a.views)
                .slice(0, 3)
                .map(article => (
                  <div key={article.id} className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{article.title}</div>
                      <div className="text-sm text-gray-500">
                        {article.author} · {article.category}
                      </div>
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">{article.views}</span> 次浏览
                    </div>
                  </div>
                ))
              }
            </div>
          </CardContent>
        </Card>
      </div>
    </PageTemplate>
  );
}

```
### app/media/page.tsx
```typescript
// app/media/page.tsx
'use client';

import React, { useState } from 'react';
import { PageTemplate } from '@/components/layout/page-template';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Plus, 
  Search, 
  Upload,
  Image as ImageIcon,
  FileVideo,
  File,
  Filter,
  Grid,
  List,
  Download,
  Trash2
} from 'lucide-react';

export default function MediaPage() {
  // 模拟媒体文件数据
  const [mediaFiles, setMediaFiles] = useState([
    { 
      id: 1, 
      name: '平台logo.png', 
      type: 'image', 
      size: '245 KB',
      uploadDate: '2023-05-20',
      category: '品牌',
      url: '/images/logo.png'
    },
    { 
      id: 2, 
      name: '产品介绍视频.mp4', 
      type: 'video', 
      size: '12.4 MB',
      uploadDate: '2023-05-18',
      category: '产品',
      url: '/videos/intro.mp4'
    },
    { 
      id: 3, 
      name: '用户手册.pdf', 
      type: 'document', 
      size: '3.2 MB',
      uploadDate: '2023-05-15',
      category: '文档',
      url: '/docs/manual.pdf'
    },
    { 
      id: 4, 
      name: '团队合影.jpg', 
      type: 'image', 
      size: '1.8 MB',
      uploadDate: '2023-05-10',
      category: '团队',
      url: '/images/team.jpg'
    },
    { 
      id: 5, 
      name: '功能演示视频.mp4', 
      type: 'video', 
      size: '24.7 MB',
      uploadDate: '2023-05-05',
      category: '产品',
      url: '/videos/demo.mp4'
    },
    { 
      id: 6, 
      name: '技术白皮书.pdf', 
      type: 'document', 
      size: '5.6 MB',
      uploadDate: '2023-05-01',
      category: '文档',
      url: '/docs/whitepaper.pdf'
    }
  ]);

  // 文件类型
  const fileTypes = ['全部', '图片', '视频', '文档'];

  // 文件分类
  const categories = ['全部', '品牌', '产品', '文档', '团队'];

  // 视图模式
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // 获取文件图标
  const getFileIcon = (type: string) => {
    switch (type) {
      case 'image':
        return <ImageIcon className="h-8 w-8 text-blue-500" />;
      case 'video':
        return <FileVideo className="h-8 w-8 text-red-500" />;
      case 'document':
        return <File className="h-8 w-8 text-gray-500" />;
      default:
        return <File className="h-8 w-8 text-gray-500" />;
    }
  };

  return (
    <PageTemplate
      title="自媒体库"
      description="媒体文件上传、存储和管理界面，支持文件分类、预览和批量操作"
      breadcrumbs={[
        { title: '首页', path: '/dashboard' },
        { title: '内容管理', path: '/content' },
        { title: '自媒体库', path: '/media' }
      ]}
      actions={
        <Button>
          <Upload className="mr-2 h-4 w-4" />
          上传文件
        </Button>
      }
    >
      <div className="space-y-6">
        {/* 搜索和筛选 */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="搜索文件..."
              className="pl-8"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <div className="flex items-center">
              <Filter className="mr-2 h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-500 mr-2">类型:</span>
            </div>
            {fileTypes.map(type => (
              <Badge 
                key={type} 
                variant={type === '全部' ? 'default' : 'outline'} 
                className="cursor-pointer"
              >
                {type}
              </Badge>
            ))}
          </div>
          
          <div className="flex flex-wrap gap-2">
            <div className="flex items-center">
              <span className="text-sm text-gray-500 mr-2">分类:</span>
            </div>
            {categories.map(category => (
              <Badge 
                key={category} 
                variant={category === '全部' ? 'default' : 'outline'} 
                className="cursor-pointer"
              >
                {category}
              </Badge>
            ))}
          </div>
          
          <div className="flex gap-2">
            <Button 
              variant={viewMode === 'grid' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button 
              variant={viewMode === 'list' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* 媒体文件网格视图 */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {mediaFiles.map(file => (
              <Card key={file.id} className="overflow-hidden">
                <div className="aspect-square bg-gray-100 flex items-center justify-center">
                  {file.type === 'image' ? (
                    <div className="text-center">
                      <ImageIcon className="h-12 w-12 text-blue-500 mx-auto" />
                      <div className="text-xs mt-2 text-gray-500">{file.name}</div>
                    </div>
                  ) : (
                    <div className="text-center">
                      {getFileIcon(file.type)}
                      <div className="text-xs mt-2 text-gray-500">{file.name}</div>
                    </div>
                  )}
                </div>
                <CardContent className="p-3">
                  <div className="font-medium text-sm truncate">{file.name}</div>
                  <div className="flex justify-between items-center mt-2">
                    <Badge variant="outline" className="text-xs">
                      {file.category}
                    </Badge>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {file.size} · {file.uploadDate}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* 媒体文件列表视图 */}
        {viewMode === 'list' && (
          <Card>
            <CardHeader>
              <CardTitle>媒体文件列表</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mediaFiles.map(file => (
                  <div key={file.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center">
                      <div className="mr-3">
                        {getFileIcon(file.type)}
                      </div>
                      <div>
                        <div className="font-medium">{file.name}</div>
                        <div className="text-sm text-gray-500">
                          {file.size} · {file.uploadDate} · {file.category}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-1" />
                        下载
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* 存储统计 */}
        <Card>
          <CardHeader>
            <CardTitle>存储统计</CardTitle>
            <CardDescription>媒体库存储使用情况</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">已用空间</span>
                  <span className="text-sm text-gray-500">45.2 MB / 100 MB</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '45.2%' }}></div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border rounded-lg p-3">
                  <div className="text-lg font-bold">24</div>
                  <div className="text-sm text-gray-500">图片文件</div>
                </div>
                <div className="border rounded-lg p-3">
                  <div className="text-lg font-bold">8</div>
                  <div className="text-sm text-gray-500">视频文件</div>
                </div>
                <div className="border rounded-lg p-3">
                  <div className="text-lg font-bold">12</div>
                  <div className="text-sm text-gray-500">文档文件</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageTemplate>
  );
}

```
### app/categories/page.tsx
```typescript
// app/categories/page.tsx
'use client';

import React, { useState } from 'react';
import { PageTemplate } from '@/components/layout/page-template';
import { DataTable } from '@/components/business/data-table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Plus, 
  Search, 
  MoreHorizontal, 
  Edit,
  Trash2,
  FolderOpen,
  Tag,
  GripVertical,
  FileText
} from 'lucide-react';

export default function CategoriesPage() {
  // 模拟分类数据
  const [categories, setCategories] = useState([
    { 
      id: 1, 
      name: '产品动态', 
      description: '产品更新和新功能发布',
      parent: null,
      articleCount: 12,
      order: 1
    },
    { 
      id: 2, 
      name: '使用指南', 
      description: '平台功能使用教程和指南',
      parent: null,
      articleCount: 24,
      order: 2
    },
    { 
      id: 3, 
      name: '公告', 
      description: '系统公告和重要通知',
      parent: null,
      articleCount: 8,
      order: 3
    },
    { 
      id: 4, 
      name: '技术分享', 
      description: '技术文章和开发经验分享',
      parent: null,
      articleCount: 15,
      order: 4
    },
    { 
      id: 5, 
      name: '基础教程', 
      description: '平台基础功能教程',
      parent: 2,
      articleCount: 10,
      order: 1
    },
    { 
      id: 6, 
      name: '高级技巧', 
      description: '平台高级功能使用技巧',
      parent: 2,
      articleCount: 8,
      order: 2
    },
    { 
      id: 7, 
      name: '案例分析', 
      description: '实际应用案例分析',
      parent: 2,
      articleCount: 6,
      order: 3
    }
  ]);

  // 分类表格列
  const categoryColumns = [
    { key: 'name', title: '分类名称' },
    { key: 'description', title: '描述' },
    { 
      key: 'parent', 
      title: '父分类',
      render: (value: number | null) => {
        if (value === null) return <span className="text-gray-500">无</span>;
        const parentCategory = categories.find(c => c.id === value);
        return parentCategory ? parentCategory.name : '未知';
      }
    },
    { 
      key: 'articleCount', 
      title: '文章数',
      render: (value: number) => (
        <div className="flex items-center">
          <FileText className="mr-1 h-4 w-4 text-gray-500" />
          {value}
        </div>
      )
    },
    { key: 'order', title: '排序' }
  ];

  // 获取顶级分类
  const topLevelCategories = categories.filter(c => c.parent === null);

  // 获取子分类
  const getSubCategories = (parentId: number) => {
    return categories.filter(c => c.parent === parentId);
  };

  return (
    <PageTemplate
      title="分类管理"
      description="内容分类层级管理，支持拖拽调整顺序和设置分类属性"
      breadcrumbs={[
        { title: '首页', path: '/dashboard' },
        { title: '内容管理', path: '/content' },
        { title: '分类管理', path: '/categories' }
      ]}
      actions={
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          新建分类
        </Button>
      }
    >
      <div className="space-y-6">
        {/* 搜索 */}
        <div className="relative w-full md:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="搜索分类..."
            className="pl-8"
          />
        </div>

        {/* 分类层级视图 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FolderOpen className="mr-2 h-5 w-5" />
              分类层级
            </CardTitle>
            <CardDescription>分类的层级结构</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topLevelCategories.map(category => (
                <div key={category.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <GripVertical className="mr-2 h-5 w-5 text-gray-400" />
                      <div>
                        <div className="font-medium flex items-center">
                          {category.name}
                          <Badge variant="outline" className="ml-2">
                            {category.articleCount} 篇
                          </Badge>
                        </div>
                        <div className="text-sm text-gray-500">{category.description}</div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  {/* 子分类 */}
                  {getSubCategories(category.id).length > 0 && (
                    <div className="mt-3 ml-6 space-y-3">
                      {getSubCategories(category.id).map(subCategory => (
                        <div key={subCategory.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center">
                            <GripVertical className="mr-2 h-5 w-5 text-gray-400" />
                            <div>
                              <div className="font-medium flex items-center">
                                {subCategory.name}
                                <Badge variant="outline" className="ml-2">
                                  {subCategory.articleCount} 篇
                                </Badge>
                              </div>
                              <div className="text-sm text-gray-500">{subCategory.description}</div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 分类列表 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Tag className="mr-2 h-5 w-5" />
              所有分类
            </CardTitle>
            <CardDescription>系统中的所有分类</CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable
              data={categories}
              columns={categoryColumns}
              actions={(row) => (
                <>
                  <button className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100">
                    <Edit className="inline mr-2 h-4 w-4" />
                    编辑分类
                  </button>
                  <button className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100">
                    查看文章
                  </button>
                  <button className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100 text-red-500">
                    <Trash2 className="inline mr-2 h-4 w-4" />
                    删除分类
                  </button>
                </>
              )}
            />
          </CardContent>
        </Card>

        {/* 统计信息 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{categories.length}</div>
              <div className="text-sm text-gray-500">总分类数</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">
                {categories.filter(c => c.parent === null).length}
              </div>
              <div className="text-sm text-gray-500">顶级分类</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">
                {categories.reduce((sum, category) => sum + category.articleCount, 0)}
              </div>
              <div className="text-sm text-gray-500">总文章数</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageTemplate>
  );
}

```
### app/marketing/page.tsx
```typescript
// app/marketing/page.tsx
'use client';

import React, { useState } from 'react';
import { PageTemplate } from '@/components/layout/page-template';
import { DataTable } from '@/components/business/data-table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Plus, 
  Search, 
  MoreHorizontal, 
  Edit,
  Trash2,
  TrendingUp,
  Calendar,
  DollarSign,
  Users,
  BarChart3
} from 'lucide-react';

export default function MarketingPage() {
  // 模拟营销活动数据
  const [campaigns, setCampaigns] = useState([
    { 
      id: 1, 
      name: '夏季促销活动', 
      type: '促销',
      status: 'active',
      startDate: '2023-06-01',
      endDate: '2023-06-30',
      budget: 50000,
      spent: 32000,
      clicks: 12500,
      conversions: 320,
      roi: 0.25
    },
    { 
      id: 2, 
      name: '新产品发布', 
      type: '发布',
      status: 'active',
      startDate: '2023-05-20',
      endDate: '2023-06-20',
      budget: 80000,
      spent: 65000,
      clicks: 21000,
      conversions: 580,
      roi: 0.42
    },
    { 
      id: 3, 
      name: '品牌推广', 
      type: '品牌',
      status: 'completed',
      startDate: '2023-04-01',
      endDate: '2023-04-30',
      budget: 100000,
      spent: 95000,
      clicks: 35000,
      conversions: 420,
      roi: 0.18
    },
    { 
      id: 4, 
      name: '用户增长计划', 
      type: '增长',
      status: 'draft',
      startDate: '2023-07-01',
      endDate: '2023-07-31',
      budget: 60000,
      spent: 0,
      clicks: 0,
      conversions: 0,
      roi: 0
    }
  ]);

  // 营销活动表格列
  const campaignColumns = [
    { key: 'name', title: '活动名称' },
    { key: 'type', title: '类型' },
    { 
      key: 'status', 
      title: '状态',
      render: (value: string) => {
        const statusMap = {
          'active': { label: '进行中', color: 'bg-green-100 text-green-800' },
          'completed': { label: '已完成', color: 'bg-blue-100 text-blue-800' },
          'draft': { label: '草稿', color: 'bg-yellow-100 text-yellow-800' }
        };
        const status = statusMap[value as keyof typeof statusMap] || statusMap['draft'];
        return <Badge className={status.color}>{status.label}</Badge>;
      }
    },
    { key: 'startDate', title: '开始日期' },
    { key: 'endDate', title: '结束日期' },
    { 
      key: 'budget', 
      title: '预算',
      render: (value: number) => `¥${value.toLocaleString()}`
    },
    { 
      key: 'spent', 
      title: '已花费',
      render: (value: number) => `¥${value.toLocaleString()}`
    },
    { 
      key: 'roi', 
      title: 'ROI',
      render: (value: number) => (
        <div className="flex items-center">
          <span className={value > 0 ? 'text-green-600' : 'text-red-600'}>
            {value > 0 ? '+' : ''}{(value * 100).toFixed(1)}%
          </span>
        </div>
      )
    }
  ];

  // 活动类型
  const campaignTypes = ['全部', '促销', '发布', '品牌', '增长'];

  // 活动状态
  const campaignStatuses = ['全部', '进行中', '已完成', '草稿'];

  return (
    <PageTemplate
      title="推广营销"
      description="营销活动创建与管理界面，包含活动效果分析图表和预算使用情况"
      breadcrumbs={[
        { title: '首页', path: '/dashboard' },
        { title: '内容管理', path: '/content' },
        { title: '推广营销', path: '/marketing' }
      ]}
      actions={
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          创建活动
        </Button>
      }
    >
      <div className="space-y-6">
        {/* 搜索和筛选 */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="搜索活动..."
              className="pl-8"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <div className="flex items-center">
              <span className="text-sm text-gray-500 mr-2">类型:</span>
            </div>
            {campaignTypes.map(type => (
              <Badge 
                key={type} 
                variant={type === '全部' ? 'default' : 'outline'} 
                className="cursor-pointer"
              >
                {type}
              </Badge>
            ))}
          </div>
          
          <div className="flex flex-wrap gap-2">
            <div className="flex items-center">
              <span className="text-sm text-gray-500 mr-2">状态:</span>
            </div>
            {campaignStatuses.map(status => (
              <Badge 
                key={status} 
                variant={status === '全部' ? 'default' : 'outline'} 
                className="cursor-pointer"
              >
                {status}
              </Badge>
            ))}
          </div>
        </div>

        {/* 营销活动表格 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="mr-2 h-5 w-5" />
              营销活动列表
            </CardTitle>
            <CardDescription>所有营销活动及其效果数据</CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable
              data={campaigns}
              columns={campaignColumns}
              actions={(row) => (
                <>
                  <button className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100">
                    <BarChart3 className="inline mr-2 h-4 w-4" />
                    查看分析
                  </button>
                  <button className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100">
                    <Edit className="inline mr-2 h-4 w-4" />
                    编辑活动
                  </button>
                  <button className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100">
                    <Calendar className="inline mr-2 h-4 w-4" />
                    查看日程
                  </button>
                  <button className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100 text-red-500">
                    <Trash2 className="inline mr-2 h-4 w-4" />
                    删除活动
                  </button>
                </>
              )}
            />
          </CardContent>
        </Card>

        {/* 统计卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <div className="p-2 rounded-full bg-blue-100 mr-3">
                  <DollarSign className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    ¥{campaigns.reduce((sum, campaign) => sum + campaign.budget, 0).toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-500">总预算</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <div className="p-2 rounded-full bg-green-100 mr-3">
                  <TrendingUp className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    {campaigns.reduce((sum, campaign) => sum + campaign.spent, 0).toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-500">已花费</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <div className="p-2 rounded-full bg-purple-100 mr-3">
                  <Users className="h-5 w-5 text-purple-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    {campaigns.reduce((sum, campaign) => sum + campaign.clicks, 0).toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-500">总点击量</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <div className="p-2 rounded-full bg-amber-100 mr-3">
                  <BarChart3 className="h-5 w-5 text-amber-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    {campaigns.reduce((sum, campaign) => sum + campaign.conversions, 0).toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-500">总转化数</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 活动效果图表 */}
        <Card>
          <CardHeader>
            <CardTitle>活动效果分析</CardTitle>
            <CardDescription>各营销活动的效果对比</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {campaigns
                .filter(c => c.status === 'active' || c.status === 'completed')
                .sort((a, b) => b.roi - a.roi)
                .map(campaign => (
                  <div key={campaign.id} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">{campaign.name}</span>
                      <span className={campaign.roi > 0 ? 'text-green-600' : 'text-red-600'}>
                        ROI: {(campaign.roi * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${campaign.roi > 0 ? 'bg-green-500' : 'bg-red-500'}`}
                        style={{ width: `${Math.min(Math.abs(campaign.roi) * 100, 100)}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>预算: ¥{campaign.budget.toLocaleString()}</span>
                      <span>花费: ¥{campaign.spent.toLocaleString()}</span>
                      <span>转化: {campaign.conversions}</span>
                    </div>
                  </div>
                ))
              }
            </div>
          </CardContent>
        </Card>
      </div>
    </PageTemplate>
  );
}

```
### app/analytics/page.tsx
```typescript
// app/analytics/page.tsx
'use client';

import React, { useState } from 'react';
import { PageTemplate } from '@/components/layout/page-template';
import { StatCard, StatCardGroup } from '@/components/business/stat-card';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  Users, 
  FileText,
  Download,
  Calendar,
  RefreshCw
} from 'lucide-react';

export default function AnalyticsPage() {
  // 模拟统计数据
  const stats = [
    {
      title: '总访问量',
      value: '124,560',
      change: { value: 12, type: 'increase' as const, text: '较上月' },
      icon: <BarChart3 className="h-5 w-5" />,
      description: '平台总访问次数'
    },
    {
      title: '独立访客',
      value: '32,890',
      change: { value: 8, type: 'increase' as const, text: '较上月' },
      icon: <Users className="h-5 w-5" />,
      description: '独立访问用户数'
    },
    {
      title: '页面浏览量',
      value: '456,780',
      change: { value: 15, type: 'increase' as const, text: '较上月' },
      icon: <FileText className="h-5 w-5" />,
      description: '页面总浏览次数'
    },
    {
      title: '平均停留时间',
      value: '3:45',
      change: { value: 5, type: 'increase' as const, text: '较上月' },
      icon: <TrendingUp className="h-5 w-5" />,
      description: '用户平均停留时间'
    }
  ];

  // 模拟流量来源数据
  const trafficSources = [
    { source: '直接访问', visitors: 12450, percentage: 38, change: 5 },
    { source: '搜索引擎', visitors: 9850, percentage: 30, change: 8 },
    { source: '社交媒体', visitors: 5420, percentage: 16, change: 12 },
    { source: '外部链接', visitors: 3280, percentage: 10, change: -3 },
    { source: '邮件营销', visitors: 1890, percentage: 6, change: 2 }
  ];

  // 模拟热门页面数据
  const popularPages = [
    { page: '/dashboard', views: 12560, percentage: 28, change: 5 },
    { page: '/articles', views: 8950, percentage: 20, change: 12 },
    { page: '/ai', views: 6780, percentage: 15, change: 8 },
    { page: '/users', views: 5420, percentage: 12, change: 3 },
    { page: '/analytics', views: 4320, percentage: 10, change: -2 }
  ];

  // 模拟用户地域分布数据
  const userRegions = [
    { region: '华东地区', users: 12560, percentage: 38 },
    { region: '华南地区', users: 8950, percentage: 27 },
    { region: '华北地区', users: 5420, percentage: 16 },
    { region: '西南地区', users: 3280, percentage: 10 },
    { region: '其他地区', users: 1890, percentage: 9 }
  ];

  // 模拟设备类型数据
  const deviceTypes = [
    { type: '桌面端', users: 18950, percentage: 58 },
    { type: '移动端', users: 11370, percentage: 34 },
    { type: '平板端', users: 2480, percentage: 8 }
  ];

  return (
    <PageTemplate
      title="数据概览"
      description="综合数据分析仪表板，包含多种关键指标图表、趋势图和数据卡片"
      breadcrumbs={[
        { title: '首页', path: '/dashboard' },
        { title: '数据分析', path: '/analytics' },
        { title: '数据概览', path: '/analytics' }
      ]}
      actions={
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            选择日期
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            导出报告
          </Button>
        </div>
      }
    >
      <div className="space-y-8">
        {/* 统计卡片 */}
        <StatCardGroup>
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              title={stat.title}
              value={stat.value}
              change={stat.change}
              icon={stat.icon}
              description={stat.description}
            />
          ))}
        </StatCardGroup>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 流量来源 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <PieChart className="mr-2 h-5 w-5" />
                流量来源
              </CardTitle>
              <CardDescription>用户访问来源分布</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {trafficSources.map((source, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">{source.source}</span>
                      <div className="flex items-center">
                        <span className="mr-2">{source.percentage}%</span>
                        <span className={`text-sm ${source.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {source.change > 0 ? '+' : ''}{source.change}%
                        </span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full bg-blue-500"
                        style={{ width: `${source.percentage}%` }}
                      ></div>
                    </div>
                    <div className="text-sm text-gray-500">
                      {source.visitors.toLocaleString()} 访客
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 热门页面 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                热门页面
              </CardTitle>
              <CardDescription>访问量最高的页面</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {popularPages.map((page, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">{page.page}</span>
                      <div className="flex items-center">
                        <span className="mr-2">{page.percentage}%</span>
                        <span className={`text-sm ${page.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {page.change > 0 ? '+' : ''}{page.change}%
                        </span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full bg-green-500"
                        style={{ width: `${page.percentage}%` }}
                      ></div>
                    </div>
                    <div className="text-sm text-gray-500">
                      {page.views.toLocaleString()} 浏览量
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 用户地域分布 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="mr-2 h-5 w-5" />
                用户地域分布
              </CardTitle>
              <CardDescription>用户所在地区分布</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {userRegions.map((region, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">{region.region}</span>
                      <span>{region.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full bg-purple-500"
                        style={{ width: `${region.percentage}%` }}
                      ></div>
                    </div>
                    <div className="text-sm text-gray-500">
                      {region.users.toLocaleString()} 用户
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 设备类型 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <RefreshCw className="mr-2 h-5 w-5" />
                设备类型
              </CardTitle>
              <CardDescription>用户使用设备类型分布</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {deviceTypes.map((device, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">{device.type}</span>
                      <span>{device.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full bg-amber-500"
                        style={{ width: `${device.percentage}%` }}
                      ></div>
                    </div>
                    <div className="text-sm text-gray-500">
                      {device.users.toLocaleString()} 用户
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 趋势图表 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="mr-2 h-5 w-5" />
              访问趋势
            </CardTitle>
            <CardDescription>最近30天访问量变化趋势</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-end space-x-1">
              {Array.from({ length: 30 }, (_, i) => {
                const height = 40 + Math.random() * 160;
                return (
                  <div 
                    key={i} 
                    className="flex-1 bg-blue-500 rounded-t"
                    style={{ height: `${height}px` }}
                  ></div>
                );
              })}
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-500">
              <span>30天前</span>
              <span>15天前</span>
              <span>今天</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageTemplate>
  );
}

```
### app/reports/page.tsx
```typescript
// app/reports/page.tsx
'use client';

import React, { useState } from 'react';
import { PageTemplate } from '@/components/layout/page-template';
import { DataTable } from '@/components/business/data-table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Plus, 
  Search, 
  MoreHorizontal, 
  Download,
  Eye,
  Edit,
  Trash2,
  FileBarChart,
  Calendar,
  Filter,
  Clock
} from 'lucide-react';

export default function ReportsPage() {
  // 模拟报表数据
  const [reports, setReports] = useState([
    { 
      id: 1, 
      name: '月度运营报告', 
      type: '运营',
      category: '定期报告',
      createdAt: '2023-06-01',
      lastModified: '2023-06-05',
      schedule: '每月1日',
      format: 'PDF',
      size: '2.4 MB',
      status: 'active'
    },
    { 
      id: 2, 
      name: '用户增长分析', 
      type: '用户',
      category: '分析报告',
      createdAt: '2023-05-28',
      lastModified: '2023-05-28',
      schedule: '手动',
      format: 'Excel',
      size: '1.8 MB',
      status: 'active'
    },
    { 
      id: 3, 
      name: '销售数据统计', 
      type: '销售',
      category: '数据报告',
      createdAt: '2023-05-20',
      lastModified: '2023-05-25',
      schedule: '每周一',
      format: 'Excel',
      size: '3.2 MB',
      status: 'active'
    },
    { 
      id: 4, 
      name: '系统性能监控', 
      type: '系统',
      category: '监控报告',
      createdAt: '2023-05-15',
      lastModified: '2023-06-01',
      schedule: '每日',
      format: 'PDF',
      size: '1.5 MB',
      status: 'active'
    },
    { 
      id: 5, 
      name: '市场趋势分析', 
      type: '市场',
      category: '分析报告',
      createdAt: '2023-05-10',
      lastModified: '2023-05-10',
      schedule: '手动',
      format: 'PDF',
      size: '4.7 MB',
      status: 'archived'
    }
  ]);

  // 报表表格列
  const reportColumns = [
    { key: 'name', title: '报表名称' },
    { key: 'type', title: '类型' },
    { key: 'category', title: '分类' },
    { key: 'schedule', title: '生成频率' },
    { key: 'format', title: '格式' },
    { key: 'lastModified', title: '最后修改' },
    { 
      key: 'status', 
      title: '状态',
      render: (value: string) => {
        const statusMap = {
          'active': { label: '启用', color: 'bg-green-100 text-green-800' },
          'archived': { label: '已归档', color: 'bg-gray-100 text-gray-800' }
        };
        const status = statusMap[value as keyof typeof statusMap] || statusMap['active'];
        return <Badge className={status.color}>{status.label}</Badge>;
      }
    }
  ];

  // 报表类型
  const reportTypes = ['全部', '运营', '用户', '销售', '系统', '市场'];

  // 报表分类
  const reportCategories = ['全部', '定期报告', '分析报告', '数据报告', '监控报告'];

  // 报表状态
  const reportStatuses = ['全部', '启用', '已归档'];

  return (
    <PageTemplate
      title="报表中心"
      description="自定义报表创建和管理界面，支持数据导出和定时报表发送"
      breadcrumbs={[
        { title: '首页', path: '/dashboard' },
        { title: '数据分析', path: '/analytics' },
        { title: '报表中心', path: '/reports' }
      ]}
      actions={
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          创建报表
        </Button>
      }
    >
      <div className="space-y-6">
        {/* 搜索和筛选 */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="搜索报表..."
              className="pl-8"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <div className="flex items-center">
              <Filter className="mr-2 h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-500 mr-2">类型:</span>
            </div>
            {reportTypes.map(type => (
              <Badge 
                key={type} 
                variant={type === '全部' ? 'default' : 'outline'} 
                className="cursor-pointer"
              >
                {type}
              </Badge>
            ))}
          </div>
          
          <div className="flex flex-wrap gap-2">
            <div className="flex items-center">
              <span className="text-sm text-gray-500 mr-2">分类:</span>
            </div>
            {reportCategories.map(category => (
              <Badge 
                key={category} 
                variant={category === '全部' ? 'default' : 'outline'} 
                className="cursor-pointer"
              >
                {category}
              </Badge>
            ))}
          </div>
          
          <div className="flex flex-wrap gap-2">
            <div className="flex items-center">
              <span className="text-sm text-gray-500 mr-2">状态:</span>
            </div>
            {reportStatuses.map(status => (
              <Badge 
                key={status} 
                variant={status === '全部' ? 'default' : 'outline'} 
                className="cursor-pointer"
              >
                {status}
              </Badge>
            ))}
          </div>
        </div>

        {/* 报表列表 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileBarChart className="mr-2 h-5 w-5" />
              报表列表
            </CardTitle>
            <CardDescription>系统中的所有报表</CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable
              data={reports}
              columns={reportColumns}
              actions={(row) => (
                <>
                  <button className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100">
                    <Eye className="inline mr-2 h-4 w-4" />
                    查看报表
                  </button>
                  <button className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100">
                    <Download className="inline mr-2 h-4 w-4" />
                    下载报表
                  </button>
                  <button className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100">
                    <Edit className="inline mr-2 h-4 w-4" />
                    编辑报表
                  </button>
                  <button className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100">
                    <Calendar className="inline mr-2 h-4 w-4" />
                    查看计划
                  </button>
                  <button className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100 text-red-500">
                    <Trash2 className="inline mr-2 h-4 w-4" />
                    删除报表
                  </button>
                </>
              )}
            />
          </CardContent>
        </Card>

        {/* 统计信息 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{reports.length}</div>
              <div className="text-sm text-gray-500">总报表数</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">
                {reports.filter(r => r.status === 'active').length}
              </div>
              <div className="text-sm text-gray-500">启用报表</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">
                {reports.filter(r => r.schedule !== '手动').length}
              </div>
              <div className="text-sm text-gray-500">定时报表</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">
                {reports.filter(r => r.format === 'PDF').length}
              </div>
              <div className="text-sm text-gray-500">PDF报表</div>
            </CardContent>
          </Card>
        </div>

        {/* 最近生成的报表 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="mr-2 h-5 w-5" />
              最近生成的报表
            </CardTitle>
            <CardDescription>最近更新的报表</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {reports
                .sort((a, b) => new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime())
                .slice(0, 5)
                .map(report => (
                  <div key={report.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center">
                      <div className="mr-3 p-2 rounded-full bg-blue-100">
                        <FileBarChart className="h-5 w-5 text-blue-500" />
                      </div>
                      <div>
                        <div className="font-medium">{report.name}</div>
                        <div className="text-sm text-gray-500">
                          {report.type} · {report.format} · {report.size}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-1" />
                        下载
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))
              }
            </div>
          </CardContent>
        </Card>
      </div>
    </PageTemplate>
  );
}

```
### app/monitoring/page.tsx
```typescript
// app/monitoring/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { PageTemplate } from '@/components/layout/page-template';
import { StatCard, StatCardGroup } from '@/components/business/stat-card';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Activity, 
  Cpu, 
  HardDrive, 
  Wifi, 
  AlertTriangle,
  CheckCircle,
  RefreshCw,
  Server,
  Database,
  Zap
} from 'lucide-react';

export default function MonitoringPage() {
  // 模拟系统资源数据
  const [systemResources, setSystemResources] = useState({
    cpu: { usage: 45, status: 'normal' },
    memory: { usage: 62, status: 'normal' },
    disk: { usage: 78, status: 'warning' },
    network: { usage: 32, status: 'normal' }
  });

  // 模拟服务状态数据
  const [services, setServices] = useState([
    { id: 1, name: 'Web服务器', status: 'running', uptime: '15天', cpu: 12, memory: 256 },
    { id: 2, name: '数据库', status: 'running', uptime: '30天', cpu: 25, memory: 1024 },
    { id: 3, name: '缓存服务', status: 'running', uptime: '20天', cpu: 8, memory: 512 },
    { id: 4, name: '消息队列', status: 'warning', uptime: '5天', cpu: 15, memory: 384 },
    { id: 5, name: '文件存储', status: 'running', uptime: '25天', cpu: 5, memory: 128 }
  ]);

  // 模拟告警数据
  const [alerts, setAlerts] = useState([
    { id: 1, type: 'warning', message: '磁盘空间使用率超过80%', source: '文件存储', time: '10分钟前', resolved: false },
    { id: 2, type: 'error', message: '数据库连接超时', source: '数据库', time: '25分钟前', resolved: true },
    { id: 3, type: 'info', message: '系统更新完成', source: '系统', time: '1小时前', resolved: true },
    { id: 4, type: 'warning', message: '内存使用率较高', source: 'Web服务器', time: '2小时前', resolved: false }
  ]);

  // 模拟实时数据更新
  useEffect(() => {
    const interval = setInterval(() => {
      // 更新系统资源数据
      setSystemResources(prev => ({
        cpu: { 
          usage: Math.min(100, Math.max(0, prev.cpu.usage + (Math.random() - 0.5) * 5)), 
          status: 'normal' 
        },
        memory: { 
          usage: Math.min(100, Math.max(0, prev.memory.usage + (Math.random() - 0.5) * 3)), 
          status: 'normal' 
        },
        disk: { 
          usage: Math.min(100, Math.max(0, prev.disk.usage + (Math.random() - 0.5) * 1)), 
          status: prev.disk.usage > 80 ? 'warning' : 'normal' 
        },
        network: { 
          usage: Math.min(100, Math.max(0, prev.network.usage + (Math.random() - 0.5) * 10)), 
          status: 'normal' 
        }
      }));

      // 随机更新服务状态
      setServices(prev => prev.map(service => {
        if (service.id === 4 && Math.random() > 0.7) {
          return { ...service, status: 'running' };
        }
        return service;
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // 获取状态图标
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'error':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      default:
        return <div className="h-5 w-5 rounded-full bg-gray-300"></div>;
    }
  };

  // 获取告警类型样式
  const getAlertStyle = (type: string) => {
    switch (type) {
      case 'error':
        return 'bg-red-100 text-red-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      case 'info':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <PageTemplate
      title="实时监控"
      description="系统资源和用户行为实时监控界面，包含实时数据流图表和异常告警"
      breadcrumbs={[
        { title: '首页', path: '/dashboard' },
        { title: '数据分析', path: '/analytics' },
        { title: '实时监控', path: '/monitoring' }
      ]}
      actions={
        <Button>
          <RefreshCw className="mr-2 h-4 w-4" />
          刷新数据
        </Button>
      }
    >
      <div className="space-y-8">
        {/* 系统资源监控 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="mr-2 h-5 w-5" />
              系统资源监控
            </CardTitle>
            <CardDescription>实时系统资源使用情况</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <Cpu className="mr-2 h-5 w-5 text-blue-500" />
                    <span className="font-medium">CPU使用率</span>
                  </div>
                  <span className="text-lg font-bold">{systemResources.cpu.usage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      systemResources.cpu.status === 'normal' ? 'bg-green-500' : 
                      systemResources.cpu.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${systemResources.cpu.usage}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <HardDrive className="mr-2 h-5 w-5 text-purple-500" />
                    <span className="font-medium">内存使用率</span>
                  </div>
                  <span className="text-lg font-bold">{systemResources.memory.usage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      systemResources.memory.status === 'normal' ? 'bg-green-500' : 
                      systemResources.memory.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${systemResources.memory.usage}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <Database className="mr-2 h-5 w-5 text-amber-500" />
                    <span className="font-medium">磁盘使用率</span>
                  </div>
                  <span className="text-lg font-bold">{systemResources.disk.usage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      systemResources.disk.status === 'normal' ? 'bg-green-500' : 
                      systemResources.disk.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${systemResources.disk.usage}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <Wifi className="mr-2 h-5 w-5 text-green-500" />
                    <span className="font-medium">网络使用率</span>
                  </div>
                  <span className="text-lg font-bold">{systemResources.network.usage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      systemResources.network.status === 'normal' ? 'bg-green-500' : 
                      systemResources.network.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${systemResources.network.usage}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 服务状态 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Server className="mr-2 h-5 w-5" />
                服务状态
              </CardTitle>
              <CardDescription>系统服务运行状态</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {services.map(service => (
                  <div key={service.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center">
                      {getStatusIcon(service.status)}
                      <div className="ml-3">
                        <div className="font-medium">{service.name}</div>
                        <div className="text-sm text-gray-500">
                          运行时间: {service.uptime} · CPU: {service.cpu}% · 内存: {service.memory}MB
                        </div>
                      </div>
                    </div>
                    <Badge 
                      className={
                        service.status === 'running' ? 'bg-green-100 text-green-800' :
                        service.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }
                    >
                      {service.status === 'running' ? '运行中' :
                       service.status === 'warning' ? '警告' : '错误'}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 告警信息 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="mr-2 h-5 w-5" />
                告警信息
              </CardTitle>
              <CardDescription>系统告警和异常信息</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {alerts.map(alert => (
                  <div key={alert.id} className="p-3 border rounded-lg">
                    <div className="flex items-start">
                      <div className={`px-2 py-1 rounded text-xs ${getAlertStyle(alert.type)} mr-3`}>
                        {alert.type === 'error' ? '错误' :
                         alert.type === 'warning' ? '警告' : '信息'}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{alert.message}</div>
                        <div className="text-sm text-gray-500">
                          来源: {alert.source} · 时间: {alert.time}
                        </div>
                      </div>
                      {alert.resolved ? (
                        <Badge className="bg-green-100 text-green-800">已解决</Badge>
                      ) : (
                        <Badge className="bg-red-100 text-red-800">未解决</Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 实时流量图表 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Zap className="mr-2 h-5 w-5" />
              实时流量
            </CardTitle>
            <CardDescription>系统实时流量监控</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-end space-x-1">
              {Array.from({ length: 60 }, (_, i) => {
                const height = 20 + Math.random() * 180;
                return (
                  <div 
                    key={i} 
                    className="flex-1 bg-blue-500 rounded-t"
                    style={{ height: `${height}px` }}
                  ></div>
                );
              })}
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-500">
              <span>60秒前</span>
              <span>30秒前</span>
              <span>现在</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageTemplate>
  );
}

```
### app/ai/page.tsx
```typescript
// app/ai/page.tsx
'use client';

import React, { useState } from 'react';
import { PageTemplate } from '@/components/layout/page-template';
import { StatCard, StatCardGroup } from '@/components/business/stat-card';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Cpu, 
  Brain, 
  Zap, 
  BarChart3, 
  MessageSquare,
  Lightbulb,
  TrendingUp,
  Send,
  RefreshCw,
  Settings,
  FileText,
  Database
} from 'lucide-react';

export default function AIPage() {
  // 模拟AI模型数据
  const [aiModels, setAiModels] = useState([
    { 
      id: 1, 
      name: '文本生成模型', 
      type: 'NLP',
      status: 'running',
      accuracy: 94.5,
      requests: 12560,
      lastTrained: '2023-05-20'
    },
    { 
      id: 2, 
      name: '图像识别模型', 
      type: 'CV',
      status: 'running',
      accuracy: 92.3,
      requests: 8950,
      lastTrained: '2023-05-15'
    },
    { 
      id: 3, 
      name: '推荐系统', 
      type: 'RS',
      status: 'training',
      accuracy: 87.8,
      requests: 15420,
      lastTrained: '2023-05-25'
    },
    { 
      id: 4, 
      name: '异常检测模型', 
      type: 'AD',
      status: 'stopped',
      accuracy: 89.2,
      requests: 5420,
      lastTrained: '2023-05-10'
    }
  ]);

  // 模拟AI任务数据
  const [aiTasks, setAiTasks] = useState([
    { 
      id: 1, 
      name: '用户行为分析', 
      type: '分析',
      status: 'completed',
      progress: 100,
      createdAt: '2023-06-01',
      completedAt: '2023-06-02'
    },
    { 
      id: 2, 
      name: '内容分类', 
      type: '分类',
      status: 'running',
      progress: 65,
      createdAt: '2023-06-02',
      completedAt: null
    },
    { 
      id: 3, 
      name: '预测模型训练', 
      type: '训练',
      status: 'pending',
      progress: 0,
      createdAt: '2023-06-03',
      completedAt: null
    }
  ]);

  // AI聊天状态
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: 'ai', content: '您好！我是YanYu Cloud³的AI助手，有什么可以帮助您的吗？', time: '10:00' },
    { id: 2, sender: 'user', content: '请帮我分析一下最近一周的用户活跃度数据', time: '10:02' },
    { id: 3, sender: 'ai', content: '根据最近一周的数据分析，用户活跃度相比上周提升了12.3%，主要增长来自移动端用户。详细报告已生成，您可以查看数据分析模块获取更多信息。', time: '10:03' }
  ]);
  const [newMessage, setNewMessage] = useState('');

  // 发送消息
  const sendMessage = () => {
    if (newMessage.trim() === '') return;
    
    const userMessage = {
      id: chatMessages.length + 1,
      sender: 'user' as const,
      content: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setChatMessages([...chatMessages, userMessage]);
    setNewMessage('');
    
    // 模拟AI回复
    setTimeout(() => {
      const aiMessage = {
        id: chatMessages.length + 2,
        sender: 'ai' as const,
        content: '我正在处理您的请求，请稍候...',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages(prev => [...prev, aiMessage]);
    }, 1000);
  };

  // 获取状态样式
  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'running':
        return 'bg-green-100 text-green-800';
      case 'training':
        return 'bg-yellow-100 text-yellow-800';
      case 'stopped':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <PageTemplate
      title="AI智能"
      description="AI模型配置和智能分析界面，包含模型性能指标图表和预测结果展示"
      breadcrumbs={[
        { title: '首页', path: '/dashboard' },
        { title: '智能引擎', path: '/ai' },
        { title: 'AI智能', path: '/ai' }
      ]}
      actions={
        <Button>
          <Settings className="mr-2 h-4 w-4" />
          模型设置
        </Button>
      }
    >
      <div className="space-y-8">
        {/* AI统计卡片 */}
        <StatCardGroup>
          <StatCard
            title="AI模型数量"
            value="4"
            icon={<Brain className="h-5 w-5" />}
            description="当前运行的AI模型"
          />
          <StatCard
            title="今日请求量"
            value="24,560"
            change={{ value: 18, type: 'increase', text: '较昨日' }}
            icon={<Zap className="h-5 w-5" />}
            description="AI模型总请求量"
          />
          <StatCard
            title="平均准确率"
            value="91.2%"
            change={{ value: 2, type: 'increase', text: '较上周' }}
            icon={<BarChart3 className="h-5 w-5" />}
            description="AI模型平均准确率"
          />
          <StatCard
            title="处理时间"
            value="125ms"
            change={{ value: 5, type: 'decrease', text: '较上周' }}
            icon={<Cpu className="h-5 w-5" />}
            description="平均请求处理时间"
          />
        </StatCardGroup>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* AI模型列表 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Brain className="mr-2 h-5 w-5" />
                AI模型
              </CardTitle>
              <CardDescription>系统中的AI模型及其状态</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {aiModels.map(model => (
                  <div key={model.id} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium">{model.name}</div>
                      <Badge className={getStatusStyle(model.status)}>
                        {model.status === 'running' ? '运行中' :
                         model.status === 'training' ? '训练中' :
                         model.status === 'stopped' ? '已停止' : model.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <div className="text-gray-500">类型</div>
                        <div>{model.type}</div>
                      </div>
                      <div>
                        <div className="text-gray-500">准确率</div>
                        <div>{model.accuracy}%</div>
                      </div>
                      <div>
                        <div className="text-gray-500">请求数</div>
                        <div>{model.requests.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-gray-500">最后训练</div>
                        <div>{model.lastTrained}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* AI任务列表 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Lightbulb className="mr-2 h-5 w-5" />
                AI任务
              </CardTitle>
              <CardDescription>当前运行的AI任务</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {aiTasks.map(task => (
                  <div key={task.id} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium">{task.name}</div>
                      <Badge className={getStatusStyle(task.status)}>
                        {task.status === 'completed' ? '已完成' :
                         task.status === 'running' ? '运行中' :
                         task.status === 'pending' ? '等待中' : task.status}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="text-gray-500">
                        类型: {task.type} · 创建时间: {task.createdAt}
                      </div>
                      <div>
                        {task.status === 'completed' ? (
                          <span>完成时间: {task.completedAt}</span>
                        ) : (
                          <span>进度: {task.progress}%</span>
                        )}
                      </div>
                    </div>
                    {task.status !== 'completed' && (
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                        <div 
                          className="h-2 rounded-full bg-blue-500"
                          style={{ width: `${task.progress}%` }}
                        ></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* AI助手 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="mr-2 h-5 w-5" />
                AI助手
              </CardTitle>
              <CardDescription>与AI助手对话，获取智能分析和建议</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 overflow-y-auto mb-4 border rounded-lg p-4">
                {chatMessages.map(message => (
                  <div 
                    key={message.id} 
                    className={`mb-4 ${message.sender === 'user' ? 'text-right' : ''}`}
                  >
                    <div className={`inline-block p-3 rounded-lg max-w-xs lg:max-w-md ${
                      message.sender === 'user' 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {message.content}
                    </div>
                    <div className={`text-xs text-gray-500 mt-1 ${
                      message.sender === 'user' ? 'text-right' : ''
                    }`}>
                      {message.time}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="输入您的问题..."
                  className="flex-1"
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                />
                <Button onClick={sendMessage} className="ml-2">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* AI洞察 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="mr-2 h-5 w-5" />
                AI洞察
              </CardTitle>
              <CardDescription>基于数据分析的AI洞察和建议</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="font-medium text-blue-800 flex items-center">
                    <Lightbulb className="mr-2 h-4 w-4" />
                    用户行为洞察
                  </div>
                  <div className="text-sm text-blue-700 mt-1">
                    根据最近数据分析，移动端用户活跃度显著提升，建议加强移动端功能开发和优化。
                  </div>
                </div>
                
                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="font-medium text-green-800 flex items-center">
                    <Lightbulb className="mr-2 h-4 w-4" />
                    内容推荐优化
                  </div>
                  <div className="text-sm text-green-700 mt-1">
                    推荐算法显示，用户对技术类内容兴趣度上升，建议增加相关内容产出。
                  </div>
                </div>
                
                <div className="p-3 bg-amber-50 rounded-lg">
                  <div className="font-medium text-amber-800 flex items-center">
                    <Lightbulb className="mr-2 h-4 w-4" />
                    系统性能建议
                  </div>
                  <div className="text-sm text-amber-700 mt-1">
                    检测到数据库查询响应时间增加，建议优化索引或考虑分库分表方案。
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageTemplate>
  );
}

```
### app/storage/page.tsx
```typescript
// app/storage/page.tsx
'use client';

import React, { useState } from 'react';
import { PageTemplate } from '@/components/layout/page-template';
import { StatCard, StatCardGroup } from '@/components/business/stat-card';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Database, 
  HardDrive, 
  Cloud, 
  Server,
  Activity,
  AlertTriangle,
  Settings,
  RefreshCw,
  TrendingUp,
  BarChart3
} from 'lucide-react';

export default function StoragePage() {
  // 模拟存储数据
  const [storageData, setStorageData] = useState({
    total: 1024, // GB
    used: 785,   // GB
    available: 239, // GB
    usagePercentage: 76.7
  });

  // 模拟存储节点数据
  const [storageNodes, setStorageNodes] = useState([
    { 
      id: 1, 
      name: '主存储节点', 
      type: 'SSD',
      status: 'online',
      capacity: 512,
      used: 389,
      performance: 98,
      location: '北京机房'
    },
    { 
      id: 2, 
      name: '备份存储节点', 
      type: 'HDD',
      status: 'online',
      capacity: 1024,
      used: 396,
      performance: 85,
      location: '上海机房'
    },
    { 
      id: 3, 
      name: '归档存储节点', 
      type: 'Tape',
      status: 'online',
      capacity: 2048,
      used: 0,
      performance: 45,
      location: '深圳机房'
    },
    { 
      id: 4, 
      name: '缓存存储节点', 
      type: 'NVMe',
      status: 'warning',
      capacity: 256,
      used: 245,
      performance: 92,
      location: '北京机房'
    }
  ]);

  // 模拟存储性能数据
  const [storagePerformance, setStoragePerformance] = useState({
    readSpeed: 1250, // MB/s
    writeSpeed: 980,  // MB/s
    iops: 45000,     // I/O operations per second
    latency: 0.8     // ms
  });

  // 模拟存储活动数据
  const [storageActivities, setStorageActivities] = useState([
    { id: 1, action: '数据备份', size: '2.4 GB', status: 'completed', time: '10分钟前' },
    { id: 2, action: '数据迁移', size: '15.6 GB', status: 'running', progress: 65, time: '25分钟前' },
    { id: 3, action: '存储扩容', size: '100 GB', status: 'completed', time: '2小时前' },
    { id: 4, action: '数据清理', size: '3.2 GB', status: 'pending', time: '3小时前' }
  ]);

  // 获取状态样式
  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'online':
        return 'bg-green-100 text-green-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      case 'offline':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'running':
        return 'bg-purple-100 text-purple-800';
      case 'pending':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <PageTemplate
      title="存储管理"
      description="数据存储配置和资源管理界面，显示存储使用率和性能监控图表"
      breadcrumbs={[
        { title: '首页', path: '/dashboard' },
        { title: '智能引擎', path: '/ai' },
        { title: '存储管理', path: '/storage' }
      ]}
      actions={
        <div className="flex gap-2">
          <Button variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" />
            刷新数据
          </Button>
          <Button>
            <Settings className="mr-2 h-4 w-4" />
            存储设置
          </Button>
        </div>
      }
    >
      <div className="space-y-8">
        {/* 存储统计卡片 */}
        <StatCardGroup>
          <StatCard
            title="总存储容量"
            value={`${storageData.total} GB`}
            icon={<Database className="h-5 w-5" />}
            description="系统总存储容量"
          />
          <StatCard
            title="已用存储"
            value={`${storageData.used} GB`}
            change={{ value: 5, type: 'increase', text: '较上月' }}
            icon={<HardDrive className="h-5 w-5" />}
            description="已使用的存储空间"
          />
          <StatCard
            title="可用存储"
            value={`${storageData.available} GB`}
            icon={<Cloud className="h-5 w-5" />}
            description="剩余可用存储空间"
          />
          <StatCard
            title="存储使用率"
            value={`${storageData.usagePercentage}%`}
            change={{ value: 2, type: 'increase', text: '较上月' }}
            icon={<Activity className="h-5 w-5" />}
            description="存储空间使用率"
          />
        </StatCardGroup>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 存储节点 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Server className="mr-2 h-5 w-5" />
                存储节点
              </CardTitle>
              <CardDescription>系统中的存储节点及其状态</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {storageNodes.map(node => (
                  <div key={node.id} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium">{node.name}</div>
                      <Badge className={getStatusStyle(node.status)}>
                        {node.status === 'online' ? '在线' :
                         node.status === 'warning' ? '警告' :
                         node.status === 'offline' ? '离线' : node.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <div className="text-gray-500">类型</div>
                        <div>{node.type}</div>
                      </div>
                      <div>
                        <div className="text-gray-500">位置</div>
                        <div>{node.location}</div>
                      </div>
                      <div>
                        <div className="text-gray-500">容量</div>
                        <div>{node.capacity} GB</div>
                      </div>
                      <div>
                        <div className="text-gray-500">已用</div>
                        <div>{node.used} GB</div>
                      </div>
                    </div>
                    <div className="mt-2">
                      <div className="flex justify-between text-sm mb-1">
                        <span>使用率</span>
                        <span>{Math.round((node.used / node.capacity) * 100)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            (node.used / node.capacity) > 0.9 ? 'bg-red-500' :
                            (node.used / node.capacity) > 0.7 ? 'bg-yellow-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${(node.used / node.capacity) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="mt-2 text-sm">
                      <span className="text-gray-500">性能: </span>
                      <span className={node.performance > 90 ? 'text-green-600' : node.performance > 70 ? 'text-yellow-600' : 'text-red-600'}>
                        {node.performance}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 存储性能 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="mr-2 h-5 w-5" />
                存储性能
              </CardTitle>
              <CardDescription>存储系统性能指标</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4">
                    <div className="text-sm text-gray-500 mb-1">读取速度</div>
                    <div className="text-2xl font-bold">{storagePerformance.readSpeed} MB/s</div>
                  </div>
                  <div className="border rounded-lg p-4">
                    <div className="text-sm text-gray-500 mb-1">写入速度</div>
                    <div className="text-2xl font-bold">{storagePerformance.writeSpeed} MB/s</div>
                  </div>
                  <div className="border rounded-lg p-4">
                    <div className="text-sm text-gray-500 mb-1">IOPS</div>
                    <div className="text-2xl font-bold">{storagePerformance.iops.toLocaleString()}</div>
                  </div>
                  <div className="border rounded-lg p-4">
                    <div className="text-sm text-gray-500 mb-1">延迟</div>
                    <div className="text-2xl font-bold">{storagePerformance.latency} ms</div>
                  </div>
                </div>

                <div>
                  <div className="text-sm font-medium mb-2">性能趋势</div>
                  <div className="h-32 flex items-end space-x-1">
                    {Array.from({ length: 24 }, (_, i) => {
                      const height = 30 + Math.random() * 70;
                      return (
                        <div 
                          key={i} 
                          className="flex-1 bg-blue-500 rounded-t"
                          style={{ height: `${height}%` }}
                        ></div>
                      );
                    })}
                  </div>
                  <div className="flex justify-between mt-1 text-xs text-gray-500">
                    <span>24小时前</span>
                    <span>12小时前</span>
                    <span>现在</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 存储活动 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="mr-2 h-5 w-5" />
              存储活动
            </CardTitle>
            <CardDescription>最近的存储操作和活动</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {storageActivities.map(activity => (
                <div key={activity.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center">
                    <div className="mr-3 p-2 rounded-full bg-blue-100">
                      <Database className="h-5 w-5 text-blue-500" />
                    </div>
                    <div>
                      <div className="font-medium">{activity.action}</div>
                      <div className="text-sm text-gray-500">
                        大小: {activity.size} · 时间: {activity.time}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Badge className={getStatusStyle(activity.status)}>
                      {activity.status === 'completed' ? '已完成' :
                       activity.status === 'running' ? '进行中' :
                       activity.status === 'pending' ? '等待中' : activity.status}
                    </Badge>
                    {activity.status === 'running' && (
                      <div className="ml-3 w-16">
                        <div className="text-xs text-gray-500 mb-1">{activity.progress}%</div>
                        <div className="w-full bg-gray-200 rounded-full h-1">
                          <div 
                            className="h-1 rounded-full bg-blue-500"
                            style={{ width: `${activity.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 存储警告 */}
        {storageNodes.some(node => node.status === 'warning') && (
          <Card className="border-yellow-200 bg-yellow-50">
            <CardHeader>
              <CardTitle className="flex items-center text-yellow-800">
                <AlertTriangle className="mr-2 h-5 w-5" />
                存储警告
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-yellow-700">
                以下存储节点需要关注：
                <ul className="list-disc pl-5 mt-2">
                  {storageNodes
                    .filter(node => node.status === 'warning')
                    .map(node => (
                      <li key={node.id}>
                        {node.name} - 使用率 {Math.round((node.used / node.capacity) * 100)}%
                      </li>
                    ))
                  }
                </ul>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </PageTemplate>
  );
}

```
### app/development/page.tsx
```typescript
// app/development/page.tsx
'use client';

import React, { useState } from 'react';
import { PageTemplate } from '@/components/layout/page-template';
import { DataTable } from '@/components/business/data-table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Code, 
  Terminal, 
  BookOpen, 
  GitBranch,
  Play,
  Square,
  Settings,
  Plus,
  Search,
  FileText,
  Database,
  Server
} from 'lucide-react';

export default function DevelopmentPage() {
  // 模拟API文档数据
  const [apiDocs, setApiDocs] = useState([
    { 
      id: 1, 
      name: '用户管理API', 
      version: 'v1.0',
      method: 'REST',
      status: 'published',
      endpoints: 12,
      lastUpdated: '2023-05-20'
    },
    { 
      id: 2, 
      name: '内容管理API', 
      version: 'v2.1',
      method: 'REST',
      status: 'published',
      endpoints: 18,
      lastUpdated: '2023-05-15'
    },
    { 
      id: 3, 
      name: '数据分析API', 
      version: 'v1.2',
      method: 'GraphQL',
      status: 'draft',
      endpoints: 8,
      lastUpdated: '2023-05-25'
    },
    { 
      id: 4, 
      name: 'AI引擎API', 
      version: 'v0.9',
      method: 'REST',
      status: 'testing',
      endpoints: 15,
      lastUpdated: '2023-06-01'
    }
  ]);

  // API文档表格列
  const apiDocColumns = [
    { key: 'name', title: 'API名称' },
    { key: 'version', title: '版本' },
    { key: 'method', title: '协议' },
    { key: 'endpoints', title: '端点数' },
    { key: 'lastUpdated', title: '最后更新' },
    { 
      key: 'status', 
      title: '状态',
      render: (value: string) => {
        const statusMap = {
          'published': { label: '已发布', color: 'bg-green-100 text-green-800' },
          'draft': { label: '草稿', color: 'bg-yellow-100 text-yellow-800' },
          'testing': { label: '测试中', color: 'bg-blue-100 text-blue-800' }
        };
        const status = statusMap[value as keyof typeof statusMap] || statusMap['draft'];
        return <Badge className={status.color}>{status.label}</Badge>;
      }
    }
  ];

  // 模拟代码片段数据
  const [codeSnippets, setCodeSnippets] = useState([
    { 
      id: 1, 
      title: '用户认证示例', 
      language: 'JavaScript',
      description: '使用JWT进行用户认证的代码示例',
      createdAt: '2023-05-20',
      tags: ['认证', 'JWT', '安全']
    },
    { 
      id: 2, 
      title: '数据查询优化', 
      language: 'SQL',
      description: '优化数据库查询性能的SQL示例',
      createdAt: '2023-05-18',
      tags: ['数据库', '性能', '优化']
    },
    { 
      id: 3, 
      title: 'API请求封装', 
      language: 'TypeScript',
      description: '封装API请求的工具函数',
      createdAt: '2023-05-15',
      tags: ['API', 'TypeScript', '工具']
    },
    { 
      id: 4, 
      title: '文件上传处理', 
      language: 'Python',
      description: '处理文件上传的后端代码',
      createdAt: '2023-05-10',
      tags: ['文件', '上传', 'Python']
    }
  ]);

  // 代码片段表格列
  const codeSnippetColumns = [
    { key: 'title', title: '标题' },
    { key: 'language', title: '语言' },
    { key: 'description', title: '描述' },
    { key: 'createdAt', title: '创建时间' },
    { 
      key: 'tags', 
      title: '标签',
      render: (value: string[]) => (
        <div className="flex flex-wrap gap-1">
          {value.slice(0, 2).map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
          {value.length > 2 && (
            <Badge variant="outline" className="text-xs">
              +{value.length - 2}
            </Badge>
          )}
        </div>
      )
    }
  ];

  // 模拟开发环境数据
  const [devEnvironments, setDevEnvironments] = useState([
    { 
      id: 1, 
      name: '开发环境', 
      status: 'running',
      url: 'dev.yanyucloud.com',
      resources: { cpu: 2, memory: 4, storage: 50 },
      lastDeployed: '2023-06-01 10:30'
    },
    { 
      id: 2, 
      name: '测试环境', 
      status: 'running',
      url: 'test.yanyucloud.com',
      resources: { cpu: 2, memory: 4, storage: 50 },
      lastDeployed: '2023-05-30 15:45'
    },
    { 
      id: 3, 
      name: '预发布环境', 
      status: 'stopped',
      url: 'staging.yanyucloud.com',
      resources: { cpu: 4, memory: 8, storage: 100 },
      lastDeployed: '2023-05-25 09:15'
    }
  ]);

  // 获取状态样式
  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'running':
        return 'bg-green-100 text-green-800';
      case 'stopped':
        return 'bg-red-100 text-red-800';
      case 'published':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'testing':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <PageTemplate
      title="开发环境"
      description="开发者工具和API文档界面，支持代码片段管理和测试环境配置"
      breadcrumbs={[
        { title: '首页', path: '/dashboard' },
        { title: '智能引擎', path: '/ai' },
        { title: '开发环境', path: '/development' }
      ]}
      actions={
        <div className="flex gap-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            创建环境
          </Button>
          <Button variant="outline">
            <Settings className="mr-2 h-4 w-4" />
            环境设置
          </Button>
        </div>
      }
    >
      <div className="space-y-6">
        {/* 开发环境列表 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Server className="mr-2 h-5 w-5" />
              开发环境
            </CardTitle>
            <CardDescription>系统中的开发环境及其状态</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {devEnvironments.map(env => (
                <div key={env.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="font-medium">{env.name}</div>
                    <Badge className={getStatusStyle(env.status)}>
                      {env.status === 'running' ? '运行中' : '已停止'}
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-500 mb-3">
                    URL: {env.url}
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-sm mb-3">
                    <div className="text-center">
                      <div className="text-gray-500">CPU</div>
                      <div>{env.resources.cpu}核</div>
                    </div>
                    <div className="text-center">
                      <div className="text-gray-500">内存</div>
                      <div>{env.resources.memory}GB</div>
                    </div>
                    <div className="text-center">
                      <div className="text-gray-500">存储</div>
                      <div>{env.resources.storage}GB</div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 mb-4">
                    最后部署: {env.lastDeployed}
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant={env.status === 'running' ? 'outline' : 'default'} 
                      size="sm" 
                      className="flex-1"
                    >
                      {env.status === 'running' ? (
                        <>
                          <Square className="mr-1 h-4 w-4" />
                          停止
                        </>
                      ) : (
                        <>
                          <Play className="mr-1 h-4 w-4" />
                          启动
                        </>
                      )}
                    </Button>
                    <Button variant="outline" size="sm">
                      <Terminal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 开发工具标签页 */}
        <Tabs defaultValue="api" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="api">API文档</TabsTrigger>
            <TabsTrigger value="snippets">代码片段</TabsTrigger>
          </TabsList>
          
          <TabsContent value="api" className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="搜索API文档..."
                  className="pl-8"
                />
              </div>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                新建API文档
              </Button>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="mr-2 h-5 w-5" />
                  API文档列表
                </CardTitle>
              </CardHeader>
              <CardContent>
                <DataTable
                  data={apiDocs}
                  columns={apiDocColumns}
                  actions={(row) => (
                    <>
                      <button className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100">
                        查看文档
                      </button>
                      <button className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100">
                        测试API
                      </button>
                      <button className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100">
                        编辑文档
                      </button>
                      <button className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100 text-red-500">
                        删除文档
                      </button>
                    </>
                  )}
                />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="snippets" className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="搜索代码片段..."
                  className="pl-8"
                />
              </div>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                新建代码片段
              </Button>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Code className="mr-2 h-5 w-5" />
                  代码片段列表
                </CardTitle>
              </CardHeader>
              <CardContent>
                <DataTable
                  data={codeSnippets}
                  columns={codeSnippetColumns}
                  actions={(row) => (
                    <>
                      <button className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100">
                        查看代码
                      </button>
                      <button className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100">
                        复制代码
                      </button>
                      <button className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100">
                        编辑片段
                      </button>
                      <button className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100 text-red-500">
                        删除片段
                      </button>
                    </>
                  )}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageTemplate>
  );
}

```
### app/knowledge/page.tsx
```typescript
// app/knowledge/page.tsx
'use client';

import React, { useState } from 'react';
import { PageTemplate } from '@/components/layout/page-template';
import { DataTable } from '@/components/business/data-table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  BookOpen, 
  Search, 
  Plus, 
  FileText,
  Calendar,
  User,
  Eye,
  Edit,
  Tag,
  FolderOpen,
  Star,
  Filter
} from 'lucide-react';

export default function KnowledgePage() {
  // 模拟知识文档数据
  const [knowledgeDocs, setKnowledgeDocs] = useState([
    { 
      id: 1, 
      title: 'YanYu Cloud³ 平台架构设计', 
      category: '架构设计',
      author: '张三',
      status: 'published',
      version: '1.2',
      createdAt: '2023-05-20',
      updatedAt: '2023-06-01',
      views: 1250,
      tags: ['架构', '设计', '平台'],
      isStarred: true
    },
    { 
      id: 2, 
      title: '微服务开发最佳实践', 
      category: '开发指南',
      author: '李四',
      status: 'published',
      version: '2.0',
      createdAt: '2023-05-15',
      updatedAt: '2023-05-28',
      views: 890,
      tags: ['微服务', '开发', '最佳实践'],
      isStarred: false
    },
    { 
      id: 3, 
      title: '数据库性能优化策略', 
      category: '数据库',
      author: '王五',
      status: 'draft',
      version: '0.8',
      createdAt: '2023-05-10',
      updatedAt: '2023-05-25',
      views: 560,
      tags: ['数据库', '性能', '优化'],
      isStarred: true
    },
    { 
      id: 4, 
      title: '前端开发规范', 
      category: '前端开发',
      author: '赵六',
      status: 'published',
      version: '1.5',
      createdAt: '2023-05-05',
      updatedAt: '2023-05-20',
      views: 1100,
      tags: ['前端', '规范', '开发'],
      isStarred: false
    },
    { 
      id: 5, 
      title: '安全编码指南', 
      category: '安全',
      author: '钱七',
      status: 'published',
      version: '1.0',
      createdAt: '2023-05-01',
      updatedAt: '2023-05-15',
      views: 780,
      tags: ['安全', '编码', '指南'],
      isStarred: true
    }
  ]);

  // 知识文档表格列
  const knowledgeDocColumns = [
    { key: 'title', title: '标题' },
    { key: 'category', title: '分类' },
    { key: 'author', title: '作者' },
    { key: 'version', title: '版本' },
    { 
      key: 'status', 
      title: '状态',
      render: (value: string) => {
        const statusMap = {
          'published': { label: '已发布', color: 'bg-green-100 text-green-800' },
          'draft': { label: '草稿', color: 'bg-yellow-100 text-yellow-800' }
        };
        const status = statusMap[value as keyof typeof statusMap] || statusMap['draft'];
        return <Badge className={status.color}>{status.label}</Badge>;
      }
    },
    { key: 'updatedAt', title: '更新时间' },
    { 
      key: 'views', 
      title: '浏览量',
      render: (value: number) => (
        <div className="flex items-center">
          <Eye className="mr-1 h-4 w-4 text-gray-500" />
          {value}
        </div>
      )
    }
  ];

  // 知识分类数据
  const [categories, setCategories] = useState([
    { id: 1, name: '架构设计', count: 12 },
    { id: 2, name: '开发指南', count: 24 },
    { id: 3, name: '数据库', count: 8 },
    { id: 4, name: '前端开发', count: 15 },
    { id: 5, name: '安全', count: 6 },
    { id: 6, name: '运维', count: 10 },
    { id: 7, name: '测试', count: 9 }
  ]);

  // 热门标签数据
  const [popularTags, setPopularTags] = useState([
    { name: '架构', count: 15 },
    { name: '开发', count: 28 },
    { name: '数据库', count: 12 },
    { name: '前端', count: 18 },
    { name: '安全', count: 9 },
    { name: '微服务', count: 14 },
    { name: '性能', count: 11 },
    { name: '最佳实践', count: 16 }
  ]);

  // 收藏/取消收藏文档
  const toggleStar = (docId: number) => {
    setKnowledgeDocs(knowledgeDocs.map(doc => 
      doc.id === docId ? { ...doc, isStarred: !doc.isStarred } : doc
    ));
  };

  return (
    <PageTemplate
      title="知识智库"
      description="知识库管理系统，支持文档分类、搜索和版本控制"
      breadcrumbs={[
        { title: '首页', path: '/dashboard' },
        { title: '智能引擎', path: '/ai' },
        { title: '知识智库', path: '/knowledge' }
      ]}
      actions={
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          新建文档
        </Button>
      }
    >
      <div className="space-y-6">
        {/* 搜索和筛选 */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="搜索文档..."
              className="pl-8"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <div className="flex items-center">
              <Filter className="mr-2 h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-500 mr-2">分类:</span>
            </div>
            <Badge variant="outline" className="cursor-pointer">全部</Badge>
            {categories.slice(0, 3).map(category => (
              <Badge key={category.id} variant="outline" className="cursor-pointer">
                {category.name}
              </Badge>
            ))}
          </div>
          
          <div className="flex flex-wrap gap-2">
            <div className="flex items-center">
              <span className="text-sm text-gray-500 mr-2">状态:</span>
            </div>
            <Badge variant="outline" className="cursor-pointer">全部</Badge>
            <Badge variant="outline" className="cursor-pointer">已发布</Badge>
            <Badge variant="outline" className="cursor-pointer">草稿</Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* 侧边栏 */}
          <div className="lg:col-span-1 space-y-6">
            {/* 分类 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-base">
                  <FolderOpen className="mr-2 h-4 w-4" />
                  文档分类
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {categories.map(category => (
                    <div key={category.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded cursor-pointer">
                      <span>{category.name}</span>
                      <Badge variant="outline" className="text-xs">
                        {category.count}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 热门标签 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-base">
                  <Tag className="mr-2 h-4 w-4" />
                  热门标签
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {popularTags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="cursor-pointer">
                      {tag.name} ({tag.count})
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 收藏文档 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-base">
                  <Star className="mr-2 h-4 w-4" />
                  收藏文档
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {knowledgeDocs
                    .filter(doc => doc.isStarred)
                    .slice(0, 3)
                    .map(doc => (
                      <div key={doc.id} className="p-2 hover:bg-gray-50 rounded cursor-pointer">
                        <div className="font-medium text-sm truncate">{doc.title}</div>
                        <div className="text-xs text-gray-500">{doc.author}</div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 主内容区 */}
          <div className="lg:col-span-3">
            {/* 文档列表 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="mr-2 h-5 w-5" />
                  知识文档
                </CardTitle>
                <CardDescription>系统中的所有知识文档</CardDescription>
              </CardHeader>
              <CardContent>
                <DataTable
                  data={knowledgeDocs}
                  columns={knowledgeDocColumns}
                  actions={(row) => (
                    <>
                      <button className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100">
                        <Eye className="inline mr-2 h-4 w-4" />
                        查看文档
                      </button>
                      <button className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100">
                        <Edit className="inline mr-2 h-4 w-4" />
                        编辑文档
                      </button>
                      <button 
                        className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100"
                        onClick={() => toggleStar(row.id)}
                      >
                        <Star className={`inline mr-2 h-4 w-4 ${row.isStarred ? 'fill-yellow-400 text-yellow-400' : ''}`} />
                        {row.isStarred ? '取消收藏' : '收藏'}
                      </button>
                      <button className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100">
                        查看历史版本
                      </button>
                    </>
                  )}
                />
              </CardContent>
            </Card>

            {/* 最近更新 */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5" />
                  最近更新
                </CardTitle>
                <CardDescription>最近更新的知识文档</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {knowledgeDocs
                    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
                    .slice(0, 3)
                    .map(doc => (
                      <div key={doc.id} className="flex items-start p-3 border rounded-lg">
                        <div className="mr-3 p-2 rounded-full bg-blue-100">
                          <FileText className="h-5 w-5 text-blue-500" />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">{doc.title}</div>
                          <div className="text-sm text-gray-500">
                            <span className="flex items-center">
                              <User className="mr-1 h-3 w-3" />
                              {doc.author}
                            </span>
                            <span className="mx-2">·</span>
                            <span className="flex items-center">
                              <Calendar className="mr-1 h-3 w-3" />
                              {doc.updatedAt}
                            </span>
                          </div>
                        </div>
                        <Badge className={doc.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                          {doc.status === 'published' ? '已发布' : '草稿'}
                        </Badge>
                      </div>
                    ))
                  }
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
}

```
### app/files/page.tsx
```typescript
// app/files/page.tsx
'use client';

import React, { useState } from 'react';
import { PageTemplate } from '@/components/layout/page-template';
import { DataTable } from '@/components/business/data-table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Plus, 
  Search, 
  Upload,
  FolderOpen,
  File,
  Image,
  FileVideo,
  FileText,
  Download,
  Trash2,
  MoreHorizontal,
  Grid,
  List,
  Share,
  Edit,
  Copy,
  Move
} from 'lucide-react';

export default function FilesPage() {
  // 模拟文件和文件夹数据
  const [items, setItems] = useState([
    { 
      id: 1, 
      name: '项目文档', 
      type: 'folder',
      size: '-',
      modified: '2023-06-01',
      items: 12,
      path: '/project-docs'
    },
    { 
      id: 2, 
      name: '设计资源', 
      type: 'folder',
      size: '-',
      modified: '2023-05-28',
      items: 24,
      path: '/design-assets'
    },
    { 
      id: 3, 
      name: '平台架构图.png', 
      type: 'image',
      size: '2.4 MB',
      modified: '2023-06-05',
      path: '/project-docs/architecture.png'
    },
    { 
      id: 4, 
      name: '产品介绍视频.mp4', 
      type: 'video',
      size: '125 MB',
      modified: '2023-06-03',
      path: '/design-assets/intro.mp4'
    },
    { 
      id: 5, 
      name: '技术白皮书.pdf', 
      type: 'document',
      size: '5.6 MB',
      modified: '2023-05-30',
      path: '/project-docs/whitepaper.pdf'
    },
    { 
      id: 6, 
      name: '用户手册.docx', 
      type: 'document',
      size: '1.2 MB',
      modified: '2023-05-25',
      path: '/project-docs/manual.docx'
    }
  ]);

  // 文件和文件夹表格列
  const itemColumns = [
    { key: 'name', title: '名称' },
    { key: 'size', title: '大小' },
    { key: 'modified', title: '修改时间' },
    { 
      key: 'type', 
      title: '类型',
      render: (value: string) => {
        const typeMap = {
          'folder': { label: '文件夹', color: 'bg-blue-100 text-blue-800' },
          'image': { label: '图片', color: 'bg-green-100 text-green-800' },
          'video': { label: '视频', color: 'bg-purple-100 text-purple-800' },
          'document': { label: '文档', color: 'bg-yellow-100 text-yellow-800' }
        };
        const type = typeMap[value as keyof typeof typeMap] || typeMap['document'];
        return <Badge className={type.color}>{type.label}</Badge>;
      }
    }
  ];

  // 视图模式
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');

  // 当前路径
  const [currentPath, setCurrentPath] = useState('/');

  // 获取文件图标
  const getFileIcon = (type: string) => {
    switch (type) {
      case 'folder':
        return <FolderOpen className="h-8 w-8 text-blue-500" />;
      case 'image':
        return <Image className="h-8 w-8 text-green-500" />;
      case 'video':
        return <FileVideo className="h-8 w-8 text-purple-500" />;
      case 'document':
        return <FileText className="h-8 w-8 text-yellow-500" />;
      default:
        return <File className="h-8 w-8 text-gray-500" />;
    }
  };

  // 导航到文件夹
  const navigateToFolder = (path: string) => {
    setCurrentPath(path);
  };

  // 返回上一级
  const navigateUp = () => {
    const pathParts = currentPath.split('/').filter(p => p);
    if (pathParts.length > 0) {
      pathParts.pop();
      setCurrentPath(pathParts.length > 0 ? `/${pathParts.join('/')}` : '/');
    }
  };

  return (
    <PageTemplate
      title="文件管理"
      description="文件系统管理界面，支持目录结构创建、文件上传下载和权限设置"
      breadcrumbs={[
        { title: '首页', path: '/dashboard' },
        { title: '智能引擎', path: '/ai' },
        { title: '文件管理', path: '/files' }
      ]}
      actions={
        <div className="flex gap-2">
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" />
            上传文件
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            新建文件夹
          </Button>
        </div>
      }
    >
      <div className="space-y-6">
        {/* 路径导航 */}
        <div className="flex items-center">
          <Button variant="ghost" size="sm" onClick={navigateUp} disabled={currentPath === '/'}>
            返回上一级
          </Button>
          <div className="ml-2 text-sm text-gray-500">
            当前路径: {currentPath || '/'}
          </div>
        </div>

        {/* 搜索和工具栏 */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="搜索文件和文件夹..."
              className="pl-8"
            />
          </div>
          
          <div className="flex gap-2">
            <Button 
              variant={viewMode === 'list' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
            </Button>
            <Button 
              variant={viewMode === 'grid' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <Grid className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* 文件和文件夹列表 */}
        {viewMode === 'list' && (
          <Card>
            <CardHeader>
              <CardTitle>文件和文件夹</CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable
                data={items}
                columns={itemColumns}
                actions={(row) => (
                  <>
                    {row.type === 'folder' ? (
                      <button 
                        className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100"
                        onClick={() => navigateToFolder(row.path)}
                      >
                        打开文件夹
                      </button>
                    ) : (
                      <>
                        <button className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100">
                          <Download className="inline mr-2 h-4 w-4" />
                          下载
                        </button>
                        <button className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100">
                          <Share className="inline mr-2 h-4 w-4" />
                          分享
                        </button>
                      </>
                    )}
                    <button className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100">
                      <Edit className="inline mr-2 h-4 w-4" />
                      重命名
                    </button>
                    <button className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100">
                      <Copy className="inline mr-2 h-4 w-4" />
                      复制
                    </button>
                    <button className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100">
                      <Move className="inline mr-2 h-4 w-4" />
                      移动
                    </button>
                    <button className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100 text-red-500">
                      <Trash2 className="inline mr-2 h-4 w-4" />
                      删除
                    </button>
                  </>
                )}
              />
            </CardContent>
          </Card>
        )}

        {/* 文件和文件夹网格视图 */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {items.map(item => (
              <Card key={item.id} className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow">
                <div className="aspect-square bg-gray-50 flex items-center justify-center">
                  {getFileIcon(item.type)}
                </div>
                <CardContent className="p-3">
                  <div className="font-medium text-sm truncate">{item.name}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    {item.size !== '-' ? item.size : `${item.items} 项`}
                  </div>
                  <div className="text-xs text-gray-500">
                    {item.modified}
                  </div>
                  <div className="flex justify-end mt-2">
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* 存储统计 */}
        <Card>
          <CardHeader>
            <CardTitle>存储统计</CardTitle>
            <CardDescription>文件系统存储使用情况</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">已用空间</span>
                  <span className="text-sm text-gray-500">45.2 GB / 100 GB</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '45.2%' }}></div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border rounded-lg p-3">
                  <div className="text-lg font-bold">24</div>
                  <div className="text-sm text-gray-500">文件夹</div>
                </div>
                <div className="border rounded-lg p-3">
                  <div className="text-lg font-bold">156</div>
                  <div className="text-sm text-gray-500">文件</div>
                </div>
                <div className="border rounded-lg p-3">
                  <div className="text-lg font-bold">8</div>
                  <div className="text-sm text-gray-500">共享</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageTemplate>
  );
}

```
### app/sync/page.tsx
```typescript
// app/sync/page.tsx
'use client';

import React, { useState } from 'react';
import { PageTemplate } from '@/components/layout/page-template';
import { DataTable } from '@/components/business/data-table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Cloud, 
  RefreshCw, 
  Play, 
  Pause,
  CheckCircle,
  AlertTriangle,
  Clock,
  Settings,
  Plus,
  Sync,
  Calendar,
  Database,
  FileText
} from 'lucide-react';

export default function SyncPage() {
  // 模拟同步任务数据
  const [syncTasks, setSyncTasks] = useState([
    { 
      id: 1, 
      name: '用户数据同步', 
      source: '本地数据库',
      target: '云端存储',
      type: '双向',
      status: 'running',
      schedule: '每小时',
      lastSync: '2023-06-10 10:30',
      nextSync: '2023-06-10 11:30',
      progress: 65,
      dataSize: '125 MB'
    },
    { 
      id: 2, 
      name: '媒体文件同步', 
      source: '本地文件系统',
      target: '云存储',
      type: '单向',
      status: 'completed',
      schedule: '每天',
      lastSync: '2023-06-10 09:15',
      nextSync: '2023-06-11 09:15',
      progress: 100,
      dataSize: '2.4 GB'
    },
    { 
      id: 3, 
      name: '配置文件同步', 
      source: '本地配置',
      target: '云端配置',
      type: '单向',
      status: 'scheduled',
      schedule: '每天',
      lastSync: '2023-06-09 18:00',
      nextSync: '2023-06-10 18:00',
      progress: 0,
      dataSize: '5 MB'
    },
    { 
      id: 4, 
      name: '日志数据同步', 
      source: '本地日志',
      target: '云端日志',
      type: '单向',
      status: 'error',
      schedule: '每6小时',
      lastSync: '2023-06-09 12:00',
      nextSync: '2023-06-09 18:00',
      progress: 32,
      dataSize: '850 MB'
    }
  ]);

  // 同步任务表格列
  const syncTaskColumns = [
    { key: 'name', title: '任务名称' },
    { key: 'source', title: '源' },
    { key: 'target', title: '目标' },
    { key: 'type', title: '类型' },
    { key: 'schedule', title: '计划' },
    { key: 'lastSync', title: '上次同步' },
    { key: 'nextSync', title: '下次同步' },
    { 
      key: 'status', 
      title: '状态',
      render: (value: string) => {
        const statusMap = {
          'running': { label: '同步中', color: 'bg-blue-100 text-blue-800' },
          'completed': { label: '已完成', color: 'bg-green-100 text-green-800' },
          'scheduled': { label: '已计划', color: 'bg-yellow-100 text-yellow-800' },
          'error': { label: '错误', color: 'bg-red-100 text-red-800' }
        };
        const status = statusMap[value as keyof typeof statusMap] || statusMap['scheduled'];
        return <Badge className={status.color}>{status.label}</Badge>;
      }
    }
  ];

  // 模拟同步历史数据
  const [syncHistory, setSyncHistory] = useState([
    { 
      id: 1, 
      taskName: '用户数据同步', 
      startTime: '2023-06-10 10:30',
      endTime: '2023-06-10 10:45',
      status: 'completed',
      dataSize: '125 MB',
      duration: '15分钟'
    },
    { 
      id: 2, 
      taskName: '媒体文件同步', 
      startTime: '2023-06-10 09:15',
      endTime: '2023-06-10 09:45',
      status: 'completed',
      dataSize: '2.4 GB',
      duration: '30分钟'
    },
    { 
      id: 3, 
      taskName: '配置文件同步', 
      startTime: '2023-06-09 18:00',
      endTime: '2023-06-09 18:02',
      status: 'completed',
      dataSize: '5 MB',
      duration: '2分钟'
    },
    { 
      id: 4, 
      taskName: '日志数据同步', 
      startTime: '2023-06-09 12:00',
      endTime: '2023-06-09 12:15',
      status: 'error',
      dataSize: '850 MB',
      duration: '15分钟'
    }
  ]);

  // 同步历史表格列
  const syncHistoryColumns = [
    { key: 'taskName', title: '任务名称' },
    { key: 'startTime', title: '开始时间' },
    { key: 'endTime', title: '结束时间' },
    { key: 'dataSize', title: '数据大小' },
    { key: 'duration', title: '持续时间' },
    { 
      key: 'status', 
      title: '状态',
      render: (value: string) => {
        const statusMap = {
          'completed': { label: '成功', color: 'bg-green-100 text-green-800' },
          'error': { label: '失败', color: 'bg-red-100 text-red-800' }
        };
        const status = statusMap[value as keyof typeof statusMap] || statusMap['completed'];
        return <Badge className={status.color}>{status.label}</Badge>;
      }
    }
  ];

  // 开始/暂停同步任务
  const toggleSyncTask = (taskId: number) => {
    setSyncTasks(syncTasks.map(task => 
      task.id === taskId 
        ? { 
            ...task, 
            status: task.status === 'running' ? 'scheduled' : 'running',
            progress: task.status === 'running' ? task.progress : 0
          } 
        : task
    ));
  };

  // 获取状态图标
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running':
        return <RefreshCw className="h-5 w-5 text-blue-500 animate-spin" />;
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'scheduled':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'error':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <PageTemplate
      title="云端同步"
      description="数据同步任务配置和管理界面，显示同步状态和日志"
      breadcrumbs={[
        { title: '首页', path: '/dashboard' },
        { title: '智能引擎', path: '/ai' },
        { title: '云端同步', path: '/sync' }
      ]}
      actions={
        <div className="flex gap-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            创建同步任务
          </Button>
          <Button variant="outline">
            <Settings className="mr-2 h-4 w-4" />
            同步设置
          </Button>
        </div>
      }
    >
      <div className="space-y-8">
        {/* 同步任务统计 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <div className="p-2 rounded-full bg-blue-100 mr-3">
                  <Sync className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{syncTasks.length}</div>
                  <div className="text-sm text-gray-500">同步任务</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <div className="p-2 rounded-full bg-green-100 mr-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    {syncTasks.filter(t => t.status === 'completed').length}
                  </div>
                  <div className="text-sm text-gray-500">已完成</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <div className="p-2 rounded-full bg-blue-100 mr-3">
                  <RefreshCw className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    {syncTasks.filter(t => t.status === 'running').length}
                  </div>
                  <div className="text-sm text-gray-500">同步中</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <div className="p-2 rounded-full bg-red-100 mr-3">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    {syncTasks.filter(t => t.status === 'error').length}
                  </div>
                  <div className="text-sm text-gray-500">错误</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 同步任务列表 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Cloud className="mr-2 h-5 w-5" />
              同步任务
            </CardTitle>
            <CardDescription>系统中的数据同步任务</CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable
              data={syncTasks}
              columns={syncTaskColumns}
              actions={(row) => (
                <>
                  <button 
                    className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100"
                    onClick={() => toggleSyncTask(row.id)}
                  >
                    {row.status === 'running' ? (
                      <>
                        <Pause className="inline mr-2 h-4 w-4" />
                        暂停同步
                      </>
                    ) : (
                      <>
                        <Play className="inline mr-2 h-4 w-4" />
                        开始同步
                      </>
                    )}
                  </button>
                  <button className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100">
                    查看详情
                  </button>
                  <button className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100">
                    编辑任务
                  </button>
                  <button className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100">
                    查看日志
                  </button>
                  <button className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100 text-red-500">
                    删除任务
                  </button>
                </>
              )}
            />
          </CardContent>
        </Card>

        {/* 同中任务详情 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {syncTasks.filter(t => t.status === 'running').map(task => (
            <Card key={task.id}>
              <CardHeader>
                <CardTitle className="flex items-center">
                  {getStatusIcon(task.status)}
                  <span className="ml-2">{task.name}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-gray-500">源</div>
                      <div>{task.source}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">目标</div>
                      <div>{task.target}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">数据大小</div>
                      <div>{task.dataSize}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">同步类型</div>
                      <div>{task.type}</div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>同步进度</span>
                      <span>{task.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full bg-blue-500"
                        style={{ width: `${task.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <div>
                      <div className="text-gray-500">开始时间</div>
                      <div>{task.lastSync}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">预计完成</div>
                      <div>计算中...</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 同步历史 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="mr-2 h-5 w-5" />
              同步历史
            </CardTitle>
            <CardDescription>最近的同步任务执行记录</CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable
              data={syncHistory}
              columns={syncHistoryColumns}
              actions={(row) => (
                <>
                  <button className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100">
                    查看详情
                  </button>
                  <button className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100">
                    查看日志
                  </button>
                  {row.status === 'error' && (
                    <button className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100">
                      重新同步
                    </button>
                  )}
                </>
              )}
            />
          </CardContent>
        </Card>

        {/* 同步统计图表 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Database className="mr-2 h-5 w-5" />
              同步数据统计
            </CardTitle>
            <CardDescription>最近7天的同步数据量统计</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-end space-x-1">
              {Array.from({ length: 7 }, (_, i) => {
                const height = 20 + Math.random() * 160;
                return (
                  <div 
                    key={i} 
                    className="flex-1 bg-blue-500 rounded-t"
                    style={{ height: `${height}px` }}
                  ></div>
                );
              })}
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-500">
              <span>7天前</span>
              <span>3天前</span>
              <span>今天</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageTemplate>
  );
}

```
###  app/business/page.tsx
```typescript
// app/business/page.tsx
'use client';

import React, { useState } from 'react';
import { PageTemplate } from '@/components/layout/page-template';
import { StatCard, StatCardGroup } from '@/components/business/stat-card';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  DollarSign, 
  TrendingUp, 
  Users, 
  ShoppingCart,
  Briefcase,
  BarChart3,
  FileText,
  Settings,
  Plus,
  Calendar,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

export default function BusinessPage() {
  // 模拟商务统计数据
  const [businessStats, setBusinessStats] = useState([
    {
      title: '总销售额',
      value: '¥1,245,600',
      change: { value: 12, type: 'increase' as const, text: '较上月' },
      icon: <DollarSign className="h-5 w-5" />,
      description: '本月总销售额'
    },
    {
      title: '新客户',
      value: '328',
      change: { value: 8, type: 'increase' as const, text: '较上月' },
      icon: <Users className="h-5 w-5" />,
      description: '本月新增客户数'
    },
    {
      title: '订单数',
      value: '1,256',
      change: { value: 5, type: 'increase' as const, text: '较上月' },
      icon: <ShoppingCart className="h-5 w-5" />,
      description: '本月订单总数'
    },
    {
      title: '转化率',
      value: '18.5%',
      change: { value: 3, type: 'increase' as const, text: '较上月' },
      icon: <TrendingUp className="h-5 w-5" />,
      description: '销售转化率'
    }
  ]);

  // 模拟销售数据
  const [salesData, setSalesData] = useState([
    { month: '1月', sales: 850000, target: 800000 },
    { month: '2月', sales: 920000, target: 850000 },
    { month: '3月', sales: 780000, target: 900000 },
    { month: '4月', sales: 1050000, target: 950000 },
    { month: '5月', sales: 1120000, target: 1000000 },
    { month: '6月', sales: 1245600, target: 1100000 }
  ]);

  // 模拟产品销售数据
  const [productSales, setProductSales] = useState([
    { name: '企业版', sales: 568000, percentage: 45.6, change: 12 },
    { name: '专业版', sales: 356000, percentage: 28.6, change: 8 },
    { name: '标准版', sales: 198000, percentage: 15.9, change: -3 },
    { name: '基础版', sales: 123600, percentage: 9.9, change: 5 }
  ]);

  // 模拟客户数据
  const [customerData, setCustomerData] = useState([
    { type: '新客户', count: 328, percentage: 35, change: 8 },
    { type: '回头客', count: 412, percentage: 44, change: 12 },
    { type: 'VIP客户', count: 156, percentage: 17, change: 5 },
    { type: '流失客户', count: 42, percentage: 4, change: -2 }
  ]);

  // 模拟销售活动数据
  const [salesActivities, setSalesActivities] = useState([
    { id: 1, title: '夏季促销活动', status: 'active', startDate: '2023-06-01', endDate: '2023-06-30', budget: 50000, spent: 32000, roi: 0.25 },
    { id: 2, title: '新产品发布会', status: 'completed', startDate: '2023-05-20', endDate: '2023-05-25', budget: 80000, spent: 75000, roi: 0.42 },
    { id: 3, title: '客户答谢会', status: 'planned', startDate: '2023-07-15', endDate: '2023-07-15', budget: 30000, spent: 0, roi: 0 },
    { id: 4, title: '行业展会', status: 'active', startDate: '2023-06-10', endDate: '2023-06-12', budget: 120000, spent: 95000, roi: 0.18 }
  ]);

  // 获取状态样式
  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'planned':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <PageTemplate
      title="商务功能"
      description="商务数据统计和分析界面，包含销售趋势图表和客户转化漏斗"
      breadcrumbs={[
        { title: '首页', path: '/dashboard' },
        { title: '商务功能', path: '/business' }
      ]}
      actions={
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            选择日期
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            创建活动
          </Button>
        </div>
      }
    >
      <div className="space-y-8">
        {/* 商务统计卡片 */}
        <StatCardGroup>
          {businessStats.map((stat, index) => (
            <StatCard
              key={index}
              title={stat.title}
              value={stat.value}
              change={stat.change}
              icon={stat.icon}
              description={stat.description}
            />
          ))}
        </StatCardGroup>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 销售趋势 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="mr-2 h-5 w-5" />
                销售趋势
              </CardTitle>
              <CardDescription>最近6个月销售数据与目标对比</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {salesData.map((data, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">{data.month}</span>
                      <div className="flex items-center">
                        <span className="mr-2">¥{(data.sales / 10000).toFixed(1)}万</span>
                        <span className={`text-sm ${data.sales >= data.target ? 'text-green-600' : 'text-red-600'}`}>
                          {data.sales >= data.target ? (
                            <ArrowUpRight className="inline h-4 w-4" />
                          ) : (
                            <ArrowDownRight className="inline h-4 w-4" />
                          )}
                          {Math.abs(((data.sales - data.target) / data.target) * 100).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${data.sales >= data.target ? 'bg-green-500' : 'bg-red-500'}`}
                        style={{ width: `${Math.min(100, (data.sales / data.target) * 100)}%` }}
                      ></div>
                    </div>
                    <div className="text-sm text-gray-500">
                      目标: ¥{(data.target / 10000).toFixed(1)}万
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 产品销售分布 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Briefcase className="mr-2 h-5 w-5" />
                产品销售分布
              </CardTitle>
              <CardDescription>各产品线销售占比</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {productSales.map((product, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">{product.name}</span>
                      <div className="flex items-center">
                        <span className="mr-2">{product.percentage}%</span>
                        <span className={`text-sm ${product.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {product.change > 0 ? '+' : ''}{product.change}%
                        </span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full bg-blue-500"
                        style={{ width: `${product.percentage}%` }}
                      ></div>
                    </div>
                    <div className="text-sm text-gray-500">
                      销售额: ¥{(product.sales / 10000).toFixed(1)}万
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 客户分析 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="mr-2 h-5 w-5" />
                客户分析
              </CardTitle>
              <CardDescription>客户类型分布及变化</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {customerData.map((customer, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">{customer.type}</span>
                      <div className="flex items-center">
                        <span className="mr-2">{customer.percentage}%</span>
                        <span className={`text-sm ${customer.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {customer.change > 0 ? '+' : ''}{customer.change}%
                        </span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          customer.type === '新客户' ? 'bg-green-500' :
                          customer.type === '回头客' ? 'bg-blue-500' :
                          customer.type === 'VIP客户' ? 'bg-purple-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${customer.percentage}%` }}
                      ></div>
                    </div>
                    <div className="text-sm text-gray-500">
                      数量: {customer.count}人
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 销售活动 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                销售活动
              </CardTitle>
              <CardDescription>当前进行中的销售活动</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {salesActivities.map(activity => (
                  <div key={activity.id} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium">{activity.title}</div>
                      <Badge className={getStatusStyle(activity.status)}>
                        {activity.status === 'active' ? '进行中' :
                         activity.status === 'completed' ? '已完成' :
                         activity.status === 'planned' ? '计划中' : activity.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <div className="text-gray-500">开始日期</div>
                        <div>{activity.startDate}</div>
                      </div>
                      <div>
                        <div className="text-gray-500">结束日期</div>
                        <div>{activity.endDate}</div>
                      </div>
                      <div>
                        <div className="text-gray-500">预算</div>
                        <div>¥{activity.budget.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-gray-500">已花费</div>
                        <div>¥{activity.spent.toLocaleString()}</div>
                      </div>
                    </div>
                    <div className="mt-2 text-sm">
                      <span className="text-gray-500">ROI: </span>
                      <span className={activity.roi > 0 ? 'text-green-600' : 'text-red-600'}>
                        {(activity.roi * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageTemplate>
  );
}

```
### app/erp/page.tsx
```typescript
// app/erp/page.tsx
'use client';

import React, { useState } from 'react';
import { PageTemplate } from '@/components/layout/page-template';
import { DataTable } from '@/components/business/data-table';
import { StatCard, StatCardGroup } from '@/components/business/stat-card';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Package, 
  ShoppingCart, 
  Truck, 
  FileText,
  BarChart3,
  Users,
  DollarSign,
  TrendingUp,
  Plus,
  Search,
  Settings,
  Calendar,
  CheckCircle,
  AlertTriangle,
  Clock
} from 'lucide-react';

export default function ERPPage() {
  // 模拟ERP统计数据
  const [erpStats, setErpStats] = useState([
    {
      title: '库存总值',
      value: '¥2,456,800',
      change: { value: 3, type: 'decrease' as const, text: '较上月' },
      icon: <Package className="h-5 w-5" />,
      description: '当前库存总价值'
    },
    {
      title: '采购订单',
      value: '128',
      change: { value: 12, type: 'increase' as const, text: '较上月' },
      icon: <ShoppingCart className="h-5 w-5" />,
      description: '本月采购订单数'
    },
    {
      title: '供应商',
      value: '86',
      change: { value: 5, type: 'increase' as const, text: '较上月' },
      icon: <Users className="h-5 w-5" />,
      description: '活跃供应商数量'
    },
    {
      title: '交付准时率',
      value: '94.5%',
      change: { value: 2, type: 'increase' as const, text: '较上月' },
      icon: <Truck className="h-5 w-5" />,
      description: '供应商交付准时率'
    }
  ]);

  // 模拟库存数据
  const [inventoryData, setInventoryData] = useState([
    { 
      id: 1, 
      name: '服务器硬件', 
      category: '硬件设备',
      sku: 'HW-SRV-001',
      quantity: 45,
      unit: '台',
      value: 675000,
      status: 'normal',
      location: '北京仓库',
      lastUpdated: '2023-06-05'
    },
    { 
      id: 2, 
      name: '网络交换机', 
      category: '网络设备',
      sku: 'NT-SW-002',
      quantity: 120,
      unit: '台',
      value: 360000,
      status: 'normal',
      location: '上海仓库',
      lastUpdated: '2023-06-03'
    },
    { 
      id: 3, 
      name: '软件许可证', 
      category: '软件产品',
      sku: 'SW-LIC-003',
      quantity: 250,
      unit: '个',
      value: 1250000,
      status: 'low',
      location: '虚拟库存',
      lastUpdated: '2023-06-01'
    },
    { 
      id: 4, 
      name: '存储设备', 
      category: '存储设备',
      sku: 'ST-DEV-004',
      quantity: 15,
      unit: '台',
      value: 450000,
      status: 'low',
      location: '深圳仓库',
      lastUpdated: '2023-05-28'
    }
  ]);

  // 库存表格列
  const inventoryColumns = [
    { key: 'name', title: '产品名称' },
    { key: 'category', title: '分类' },
    { key: 'sku', title: 'SKU' },
    { key: 'quantity', title: '数量' },
    { key: 'unit', title: '单位' },
    { key: 'value', title: '价值', render: (value: number) => `¥${value.toLocaleString()}` },
    { key: 'location', title: '位置' },
    { key: 'lastUpdated', title: '最后更新' },
    { 
      key: 'status', 
      title: '状态',
      render: (value: string) => {
        const statusMap = {
          'normal': { label: '正常', color: 'bg-green-100 text-green-800' },
          'low': { label: '库存不足', color: 'bg-yellow-100 text-yellow-800' },
          'excess': { label: '库存过剩', color: 'bg-blue-100 text-blue-800' }
        };
        const status = statusMap[value as keyof typeof statusMap] || statusMap['normal'];
        return <Badge className={status.color}>{status.label}</Badge>;
      }
    }
  ];

  // 模拟采购订单数据
  const [purchaseOrders, setPurchaseOrders] = useState([
    { 
      id: 1, 
      orderNumber: 'PO-202306-001',
      supplier: '北京科技有限公司',
      status: 'pending',
      orderDate: '2023-06-01',
      expectedDate: '2023-06-15',
      totalAmount: 125000,
      items: 5
    },
    { 
      id: 2, 
      orderNumber: 'PO-202306-002',
      supplier: '上海网络设备公司',
      status: 'approved',
      orderDate: '2023-06-02',
      expectedDate: '2023-06-20',
      totalAmount: 86000,
      items: 3
    },
    { 
      id: 3, 
      orderNumber: 'PO-202305-003',
      supplier: '深圳软件供应商',
      status: 'delivered',
      orderDate: '2023-05-25',
      expectedDate: '2023-06-05',
      totalAmount: 450000,
      items: 8
    },
    { 
      id: 4, 
      orderNumber: 'PO-202305-004',
      supplier: '广州硬件制造商',
      status: 'cancelled',
      orderDate: '2023-05-20',
      expectedDate: '2023-06-10',
      totalAmount: 320000,
      items: 6
    }
  ]);

  // 采购订单表格列
  const purchaseOrderColumns = [
    { key: 'orderNumber', title: '订单号' },
    { key: 'supplier', title: '供应商' },
    { key: 'orderDate', title: '下单日期' },
    { key: 'expectedDate', title: '预计交付' },
    { key: 'totalAmount', title: '总金额', render: (value: number) => `¥${value.toLocaleString()}` },
    { key: 'items', title: '项目数' },
    { 
      key: 'status', 
      title: '状态',
      render: (value: string) => {
        const statusMap = {
          'pending': { label: '待审批', color: 'bg-yellow-100 text-yellow-800' },
          'approved': { label: '已批准', color: 'bg-blue-100 text-blue-800' },
          'delivered': { label: '已交付', color: 'bg-green-100 text-green-800' },
          'cancelled': { label: '已取消', color: 'bg-red-100 text-red-800' }
        };
        const status = statusMap[value as keyof typeof statusMap] || statusMap['pending'];
        return <Badge className={status.color}>{status.label}</Badge>;
      }
    }
  ];

  // 获取状态图标
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'normal':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'low':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'excess':
        return <Clock className="h-5 w-5 text-blue-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <PageTemplate
      title="ERP管理"
      description="企业资源计划管理界面，包含库存管理、采购订单和供应商管理"
      breadcrumbs={[
        { title: '首页', path: '/dashboard' },
        { title: '商务功能', path: '/business' },
        { title: 'ERP管理', path: '/erp' }
      ]}
      actions={
        <div className="flex gap-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            新建采购订单
          </Button>
          <Button variant="outline">
            <Settings className="mr-2 h-4 w-4" />
            系统设置
          </Button>
        </div>
      }
    >
      <div className="space-y-8">
        {/* ERP统计卡片 */}
        <StatCardGroup>
          {erpStats.map((stat, index) => (
            <StatCard
              key={index}
              title={stat.title}
              value={stat.value}
              change={stat.change}
              icon={stat.icon}
              description={stat.description}
            />
          ))}
        </StatCardGroup>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 库存管理 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Package className="mr-2 h-5 w-5" />
                库存管理
              </CardTitle>
              <CardDescription>当前库存状态</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {inventoryData.map(item => (
                  <div key={item.id} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium">{item.name}</div>
                      <div className="flex items-center">
                        {getStatusIcon(item.status)}
                        <Badge className={`ml-2 ${
                          item.status === 'normal' ? 'bg-green-100 text-green-800' :
                          item.status === 'low' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {item.status === 'normal' ? '正常' :
                           item.status === 'low' ? '库存不足' : '库存过剩'}
                        </Badge>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <div className="text-gray-500">分类</div>
                        <div>{item.category}</div>
                      </div>
                      <div>
                        <div className="text-gray-500">SKU</div>
                        <div>{item.sku}</div>
                      </div>
                      <div>
                        <div className="text-gray-500">数量</div>
                        <div>{item.quantity} {item.unit}</div>
                      </div>
                      <div>
                        <div className="text-gray-500">价值</div>
                        <div>¥{item.value.toLocaleString()}</div>
                      </div>
                    </div>
                    <div className="mt-2 text-sm text-gray-500">
                      位置: {item.location} · 最后更新: {item.lastUpdated}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 采购订单 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <ShoppingCart className="mr-2 h-5 w-5" />
                采购订单
              </CardTitle>
              <CardDescription>最近的采购订单</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {purchaseOrders.map(order => (
                  <div key={order.id} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium">{order.orderNumber}</div>
                      <Badge className={
                        order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        order.status === 'approved' ? 'bg-blue-100 text-blue-800' :
                        order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
                      }>
                        {order.status === 'pending' ? '待审批' :
                         order.status === 'approved' ? '已批准' :
                         order.status === 'delivered' ? '已交付' : '已取消'}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <div className="text-gray-500">供应商</div>
                        <div>{order.supplier}</div>
                      </div>
                      <div>
                        <div className="text-gray-500">下单日期</div>
                        <div>{order.orderDate}</div>
                      </div>
                      <div>
                        <div className="text-gray-500">预计交付</div>
                        <div>{order.expectedDate}</div>
                      </div>
                      <div>
                        <div className="text-gray-500">总金额</div>
                        <div>¥{order.totalAmount.toLocaleString()}</div>
                      </div>
                    </div>
                    <div className="mt-2 text-sm text-gray-500">
                      项目数: {order.items}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 库存预警 */}
        {inventoryData.some(item => item.status === 'low') && (
          <Card className="border-yellow-200 bg-yellow-50">
            <CardHeader>
              <CardTitle className="flex items-center text-yellow-800">
                <AlertTriangle className="mr-2 h-5 w-5" />
                库存预警
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-yellow-700">
                以下产品库存不足，请及时补充：
                <ul className="list-disc pl-5 mt-2">
                  {inventoryData
                    .filter(item => item.status === 'low')
                    .map(item => (
                      <li key={item.id}>
                        {item.name} - 剩余 {item.quantity} {item.unit}
                      </li>
                    ))
                  }
                </ul>
              </div>
            </CardContent>
          </Card>
        )}

        {/* 库存价值分布 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="mr-2 h-5 w-5" />
              库存价值分布
            </CardTitle>
            <CardDescription>各分类库存价值占比</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { category: '硬件设备', value: 1125000, percentage: 45.8 },
                { category: '网络设备', value: 360000, percentage: 14.7 },
                { category: '软件产品', value: 1250000, percentage: 50.9 },
                { category: '存储设备', value: 450000, percentage: 18.3 }
              ].map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">{item.category}</span>
                    <div className="flex items-center">
                      <span className="mr-2">{item.percentage}%</span>
                      <span>¥{(item.value / 10000).toFixed(1)}万</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full bg-blue-500"
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </PageTemplate>
  );
}

```
### app/crm/page.tsx
```typescript
// app/crm/page.tsx
'use client';

import React, { useState } from 'react';
import { PageTemplate } from '@/components/layout/page-template';
import { DataTable } from '@/components/business/data-table';
import { StatCard, StatCardGroup } from '@/components/business/stat-card';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Users, 
  DollarSign, 
  TrendingUp, 
  Phone,
  Mail,
  Calendar,
  MapPin,
  Star,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  User,
  Building,
  Activity
} from 'lucide-react';

export default function CRMPage() {
  // 模拟CRM统计数据
  const [crmStats, setCrmStats] = useState([
    {
      title: '总客户数',
      value: '1,256',
      change: { value: 8, type: 'increase' as const, text: '较上月' },
      icon: <Users className="h-5 w-5" />,
      description: '系统中的客户总数'
    },
    {
      title: '潜在客户',
      value: '428',
      change: { value: 12, type: 'increase' as const, text: '较上月' },
      icon: <User className="h-5 w-5" />,
      description: '潜在客户数量'
    },
    {
      title: '销售线索',
      value: '856',
      change: { value: 5, type: 'increase' as const, text: '较上月' },
      icon: <Activity className="h-5 w-5" />,
      description: '销售线索总数'
    },
    {
      title: '客户转化率',
      value: '24.5%',
      change: { value: 3, type: 'increase' as const, text: '较上月' },
      icon: <TrendingUp className="h-5 w-5" />,
      description: '客户转化率'
    }
  ]);

  // 模拟客户数据
  const [customers, setCustomers] = useState([
    { 
      id: 1, 
      name: '北京科技有限公司', 
      type: '企业客户',
      industry: '信息技术',
      contact: '张经理',
      phone: '13800138000',
      email: 'zhang@bjtech.com',
      status: 'active',
      value: 1250000,
      lastContact: '2023-06-05',
      nextFollowUp: '2023-06-15',
      location: '北京市',
      rating: 4
    },
    { 
      id: 2, 
      name: '上海网络有限公司', 
      type: '企业客户',
      industry: '网络服务',
      contact: '李总',
      phone: '13900139000',
      email: 'li@shnet.com',
      status: 'active',
      value: 860000,
      lastContact: '2023-06-03',
      nextFollowUp: '2023-06-12',
      location: '上海市',
      rating: 5
    },
    { 
      id: 3, 
      name: '深圳软件开发商', 
      type: '企业客户',
      industry: '软件开发',
      contact: '王总监',
      phone: '13700137000',
      email: 'wang@szsoft.com',
      status: 'prospect',
      value: 0,
      lastContact: '2023-06-01',
      nextFollowUp: '2023-06-10',
      location: '深圳市',
      rating: 3
    },
    { 
      id: 4, 
      name: '广州系统集成商', 
      type: '企业客户',
      industry: '系统集成',
      contact: '陈经理',
      phone: '13600136000',
      email: 'chen@gzsys.com',
      status: 'inactive',
      value: 450000,
      lastContact: '2023-05-20',
      nextFollowUp: '2023-06-20',
      location: '广州市',
      rating: 2
    }
  ]);

  // 客户表格列
  const customerColumns = [
    { key: 'name', title: '客户名称' },
    { key: 'type', title: '客户类型' },
    { key: 'industry', title: '行业' },
    { key: 'contact', title: '联系人' },
    { key: 'phone', title: '电话' },
    { key: 'email', title: '邮箱' },
    { key: 'location', title: '地区' },
    { key: 'lastContact', title: '最后联系' },
    { 
      key: 'status', 
      title: '状态',
      render: (value: string) => {
        const statusMap = {
          'active': { label: '活跃', color: 'bg-green-100 text-green-800' },
          'prospect': { label: '潜在', color: 'bg-yellow-100 text-yellow-800' },
          'inactive': { label: '不活跃', color: 'bg-gray-100 text-gray-800' }
        };
        const status = statusMap[value as keyof typeof statusMap] || statusMap['inactive'];
        return <Badge className={status.color}>{status.label}</Badge>;
      }
    },
    { 
      key: 'value', 
      title: '客户价值',
      render: (value: number) => value > 0 ? `¥${value.toLocaleString()}` : '-'
    }
  ];

  // 模拟销售线索数据
  const [leads, setLeads] = useState([
    { 
      id: 1, 
      title: '企业云平台需求', 
      source: '网站咨询',
      status: 'qualified',
      contact: '赵经理',
      company: '杭州数据公司',
      phone: '13500135000',
      email: 'zhao@hzdata.com',
      assignedTo: '销售团队A',
      createdDate: '2023-06-01',
      estimatedValue: 580000
    },
    { 
      id: 2, 
      title: 'AI解决方案咨询', 
      source: '展会',
      status: 'contacted',
      contact: '钱总监',
      company: '南京智能科技',
      phone: '13400134000',
      email: 'qian@njai.com',
      assignedTo: '销售团队B',
      createdDate: '2023-05-28',
      estimatedValue: 750000
    },
    { 
      id: 3, 
      title: '数据分析平台', 
      source: '推荐',
      status: 'new',
      contact: '孙总',
      company: '成都大数据公司',
      phone: '13300133000',
      email: 'sun@cddata.com',
      assignedTo: '销售团队A',
      createdDate: '2023-05-25',
      estimatedValue: 420000
    },
    { 
      id: 4, 
      title: '移动应用开发', 
      source: '电话咨询',
      status: 'converted',
      contact: '周经理',
      company: '武汉移动科技',
      phone: '13200132000',
      email: 'zhou@whmobile.com',
      assignedTo: '销售团队C',
      createdDate: '2023-05-20',
      estimatedValue: 350000
    }
  ]);

  // 销售线索表格列
  const leadColumns = [
    { key: 'title', title: '线索标题' },
    { key: 'source', title: '来源' },
    { key: 'contact', title: '联系人' },
    { key: 'company', title: '公司' },
    { key: 'assignedTo', title: '负责人' },
    { key: 'createdDate', title: '创建日期' },
    { 
      key: 'status', 
      title: '状态',
      render: (value: string) => {
        const statusMap = {
          'new': { label: '新线索', color: 'bg-blue-100 text-blue-800' },
          'contacted': { label: '已联系', color: 'bg-yellow-100 text-yellow-800' },
          'qualified': { label: '已确认', color: 'bg-purple-100 text-purple-800' },
          'converted': { label: '已转化', color: 'bg-green-100 text-green-800' }
        };
        const status = statusMap[value as keyof typeof statusMap] || statusMap['new'];
        return <Badge className={status.color}>{status.label}</Badge>;
      }
    },
    { 
      key: 'estimatedValue', 
      title: '预计价值',
      render: (value: number) => `¥${value.toLocaleString()}`
    }
  ];

  // 获取星级评分
  const getStarRating = (rating: number) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star 
            key={star} 
            className={`h-4 w-4 ${star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
          />
        ))}
      </div>
    );
  };

  return (
    <PageTemplate
      title="CRM管理"
      description="客户关系管理界面，包含客户信息管理、销售线索跟踪和客户价值分析"
      breadcrumbs={[
        { title: '首页', path: '/dashboard' },
        { title: '商务功能', path: '/business' },
        { title: 'CRM管理', path: '/crm' }
      ]}
      actions={
        <div className="flex gap-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            新建客户
          </Button>
          <Button variant="outline">
            <Plus className="mr-2 h-4 w-4" />
            新建线索
          </Button>
        </div>
      }
    >
      <div className="space-y-8">
        {/* CRM统计卡片 */}
        <StatCardGroup>
          {crmStats.map((stat, index) => (
            <StatCard
              key={index}
              title={stat.title}
              value={stat.value}
              change={stat.change}
              icon={stat.icon}
              description={stat.description}
            />
          ))}
        </StatCardGroup>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 客户管理 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="mr-2 h-5 w-5" />
                客户管理
              </CardTitle>
              <CardDescription>系统中的客户信息</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {customers.map(customer => (
                  <div key={customer.id} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium">{customer.name}</div>
                      <div className="flex items-center">
                        <Badge className={
                          customer.status === 'active' ? 'bg-green-100 text-green-800' :
                          customer.status === 'prospect' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }>
                          {customer.status === 'active' ? '活跃' :
                           customer.status === 'prospect' ? '潜在' : '不活跃'}
                        </Badge>
                        {getStarRating(customer.rating)}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center">
                        <Building className="mr-1 h-3 w-3 text-gray-500" />
                        <span>{customer.industry}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="mr-1 h-3 w-3 text-gray-500" />
                        <span>{customer.location}</span>
                      </div>
                      <div className="flex items-center">
                        <User className="mr-1 h-3 w-3 text-gray-500" />
                        <span>{customer.contact}</span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="mr-1 h-3 w-3 text-gray-500" />
                        <span>{customer.phone}</span>
                      </div>
                    </div>
                    <div className="mt-2 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Mail className="mr-1 h-3 w-3 text-gray-500" />
                        <span>{customer.email}</span>
                      </div>
                      <div className="flex items-center mt-1">
                        <Calendar className="mr-1 h-3 w-3 text-gray-500" />
                        <span>下次跟进: {customer.nextFollowUp}</span>
                      </div>
                    </div>
                    {customer.value > 0 && (
                      <div className="mt-2 text-sm">
                        <span className="text-gray-500">客户价值: </span>
                        <span className="font-medium">¥{customer.value.toLocaleString()}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 销售线索 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="mr-2 h-5 w-5" />
                销售线索
              </CardTitle>
              <CardDescription>当前销售线索</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {leads.map(lead => (
                  <div key={lead.id} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium">{lead.title}</div>
                      <Badge className={
                        lead.status === 'new' ? 'bg-blue-100 text-blue-800' :
                        lead.status === 'contacted' ? 'bg-yellow-100 text-yellow-800' :
                        lead.status === 'qualified' ? 'bg-purple-100 text-purple-800' :
                        'bg-green-100 text-green-800'
                      }>
                        {lead.status === 'new' ? '新线索' :
                         lead.status === 'contacted' ? '已联系' :
                         lead.status === 'qualified' ? '已确认' : '已转化'}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <div className="text-gray-500">来源</div>
                        <div>{lead.source}</div>
                      </div>
                      <div>
                        <div className="text-gray-500">负责人</div>
                        <div>{lead.assignedTo}</div>
                      </div>
                      <div>
                        <div className="text-gray-500">联系人</div>
                        <div>{lead.contact}</div>
                      </div>
                      <div>
                        <div className="text-gray-500">公司</div>
                        <div>{lead.company}</div>
                      </div>
                    </div>
                    <div className="mt-2 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="mr-1 h-3 w-3 text-gray-500" />
                        <span>创建日期: {lead.createdDate}</span>
                      </div>
                    </div>
                    <div className="mt-2 text-sm">
                      <span className="text-gray-500">预计价值: </span>
                      <span className="font-medium">¥{lead.estimatedValue.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 客户分布 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin className="mr-2 h-5 w-5" />
              客户地域分布
            </CardTitle>
            <CardDescription>客户所在地区分布</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { region: '华北地区', customers: 356, percentage: 28.3 },
                { region: '华东地区', customers: 425, percentage: 33.8 },
                { region: '华南地区', customers: 268, percentage: 21.3 },
                { region: '西南地区', customers: 125, percentage: 10.0 },
                { region: '其他地区', customers: 82, percentage: 6.5 }
              ].map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">{item.region}</span>
                    <div className="flex items-center">
                      <span className="mr-2">{item.percentage}%</span>
                      <span>{item.customers}家</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full bg-blue-500"
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </PageTemplate>
  );
}

```
### app/platform/page.tsx
```typescript
// app/platform/page.tsx
'use client';

import React, { useState } from 'react';
import { PageTemplate } from '@/components/layout/page-template';
import { DataTable } from '@/components/business/data-table';
import { StatCard, StatCardGroup } from '@/components/business/stat-card';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Server, 
  Users, 
  Activity, 
  AlertTriangle,
  CheckCircle,
  Settings,
  Plus,
  Search,
  RefreshCw,
  Globe,
  Database,
  Zap,
  HardDrive
} from 'lucide-react';

export default function PlatformPage() {
  // 模拟平台统计数据
  const [platformStats, setPlatformStats] = useState([
    {
      title: '服务实例',
      value: '42',
      change: { value: 3, type: 'increase' as const, text: '较上月' },
      icon: <Server className="h-5 w-5" />,
      description: '运行中的服务实例数'
    },
    {
      title: '活跃用户',
      value: '12,560',
      change: { value: 8, type: 'increase' as const, text: '较上月' },
      icon: <Users className="h-5 w-5" />,
      description: '平台活跃用户数'
    },
    {
      title: 'API调用',
      value: '4.5M',
      change: { value: 12, type: 'increase' as const, text: '较上月' },
      icon: <Activity className="h-5 w-5" />,
      description: '本月API调用次数'
    },
    {
      title: '系统负载',
      value: '68%',
      change: { value: 5, type: 'decrease' as const, text: '较上月' },
      icon: <Zap className="h-5 w-5" />,
      description: '当前系统负载'
    }
  ]);

  // 模拟服务实例数据
  const [serviceInstances, setServiceInstances] = useState([
    { 
      id: 1, 
      name: 'Web服务', 
      type: '前端',
      status: 'running',
      version: 'v2.1.0',
      cpu: 25,
      memory: 512,
      requests: 12560,
      uptime: '15天',
      lastDeployed: '2023-06-01'
    },
    { 
      id: 2, 
      name: 'API服务', 
      type: '后端',
      status: 'running',
      version: 'v3.2.1',
      cpu: 45,
      memory: 1024,
      requests: 45680,
      uptime: '20天',
      lastDeployed: '2023-05-28'
    },
    { 
      id: 3, 
      name: '数据库服务', 
      type: '数据',
      status: 'running',
      version: 'v5.7.0',
      cpu: 35,
      memory: 2048,
      requests: 0,
      uptime: '30天',
      lastDeployed: '2023-05-20'
    },
    { 
      id: 4, 
      name: '缓存服务', 
      type: '缓存',
      status: 'warning',
      version: 'v6.0.2',
      cpu: 15,
      memory: 768,
      requests: 32560,
      uptime: '10天',
      lastDeployed: '2023-06-05'
    }
  ]);

  // 服务实例表格列
  const serviceInstanceColumns = [
    { key: 'name', title: '服务名称' },
    { key: 'type', title: '类型' },
    { key: 'version', title: '版本' },
    { key: 'cpu', title: 'CPU使用率', render: (value: number) => `${value}%` },
    { key: 'memory', title: '内存使用', render: (value: number) => `${value}MB` },
    { key: 'requests', title: '请求数', render: (value: number) => value.toLocaleString() },
    { key: 'uptime', title: '运行时间' },
    { key: 'lastDeployed', title: '最后部署' },
    { 
      key: 'status', 
      title: '状态',
      render: (value: string) => {
        const statusMap = {
          'running': { label: '运行中', color: 'bg-green-100 text-green-800' },
          'stopped': { label: '已停止', color: 'bg-red-100 text-red-800' },
          'warning': { label: '警告', color: 'bg-yellow-100 text-yellow-800' }
        };
        const status = statusMap[value as keyof typeof statusMap] || statusMap['stopped'];
        return <Badge className={status.color}>{status.label}</Badge>;
      }
    }
  ];

  // 模拟平台事件数据
  const [platformEvents, setPlatformEvents] = useState([
    { 
      id: 1, 
      type: 'deployment', 
      service: 'Web服务',
      message: '成功部署到生产环境',
      status: 'success',
      time: '2023-06-01 10:30',
      user: '张三'
    },
    { 
      id: 2, 
      type: 'error', 
      service: '缓存服务',
      message: '内存使用率超过90%',
      status: 'warning',
      time: '2023-06-05 14:20',
      user: '系统'
    },
    { 
      id: 3, 
      type: 'scaling', 
      service: 'API服务',
      message: '自动扩容至3个实例',
      status: 'info',
      time: '2023-06-03 09:15',
      user: '系统'
    },
    { 
      id: 4, 
      type: 'update', 
      service: '数据库服务',
      message: '安全补丁已应用',
      status: 'success',
      time: '2023-05-28 16:45',
      user: '李四'
    }
  ]);

  // 平台事件表格列
  const platformEventColumns = [
    { key: 'time', title: '时间' },
    { key: 'type', title: '类型' },
    { key: 'service', title: '服务' },
    { key: 'message', title: '消息' },
    { key: 'user', title: '用户' },
    { 
      key: 'status', 
      title: '状态',
      render: (value: string) => {
        const statusMap = {
          'success': { label: '成功', color: 'bg-green-100 text-green-800' },
          'warning': { label: '警告', color: 'bg-yellow-100 text-yellow-800' },
          'error': { label: '错误', color: 'bg-red-100 text-red-800' },
          'info': { label: '信息', color: 'bg-blue-100 text-blue-800' }
        };
        const status = statusMap[value as keyof typeof statusMap] || statusMap['info'];
        return <Badge className={status.color}>{status.label}</Badge>;
      }
    }
  ];

  // 获取状态图标
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'stopped':
        return <div className="h-5 w-5 rounded-full bg-red-500"></div>;
      default:
        return <div className="h-5 w-5 rounded-full bg-gray-300"></div>;
    }
  };

  return (
    <PageTemplate
      title="平台管理"
      description="平台服务管理和监控界面，显示服务状态和系统资源使用情况"
      breadcrumbs={[
        { title: '首页', path: '/dashboard' },
        { title: '商务功能', path: '/business' },
        { title: '平台管理', path: '/platform' }
      ]}
      actions={
        <div className="flex gap-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            部署服务
          </Button>
          <Button variant="outline">
            <Settings className="mr-2 h-4 w-4" />
            平台设置
          </Button>
        </div>
      }
    >
      <div className="space-y-8">
        {/* 平台统计卡片 */}
        <StatCardGroup>
          {platformStats.map((stat, index) => (
            <StatCard
              key={index}
              title={stat.title}
              value={stat.value}
              change={stat.change}
              icon={stat.icon}
              description={stat.description}
            />
          ))}
        </StatCardGroup>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 服务实例 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Server className="mr-2 h-5 w-5" />
                服务实例
              </CardTitle>
              <CardDescription>平台中的服务实例</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {serviceInstances.map(instance => (
                  <div key={instance.id} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium">{instance.name}</div>
                      <div className="flex items-center">
                        {getStatusIcon(instance.status)}
                        <Badge className={`ml-2 ${
                          instance.status === 'running' ? 'bg-green-100 text-green-800' :
                          instance.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {instance.status === 'running' ? '运行中' :
                           instance.status === 'warning' ? '警告' : '已停止'}
                        </Badge>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <div className="text-gray-500">类型</div>
                        <div>{instance.type}</div>
                      </div>
                      <div>
                        <div className="text-gray-500">版本</div>
                        <div>{instance.version}</div>
                      </div>
                      <div>
                        <div className="text-gray-500">CPU</div>
                        <div>{instance.cpu}%</div>
                      </div>
                      <div>
                        <div className="text-gray-500">内存</div>
                        <div>{instance.memory}MB</div>
                      </div>
                    </div>
                    <div className="mt-2 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Activity className="mr-1 h-3 w-3 text-gray-500" />
                        <span>请求数: {instance.requests.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center mt-1">
                        <RefreshCw className="mr-1 h-3 w-3 text-gray-500" />
                        <span>运行时间: {instance.uptime}</span>
                      </div>
                    </div>
                    <div className="mt-2 text-xs text-gray-500">
                      最后部署: {instance.lastDeployed}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 平台事件 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="mr-2 h-5 w-5" />
                平台事件
              </CardTitle>
              <CardDescription>最近的平台事件</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {platformEvents.map(event => (
                  <div key={event.id} className="p-3 border rounded-lg">
                    <div className="flex items-start">
                      <div className={`mr-3 p-1 rounded-full ${
                        event.status === 'success' ? 'bg-green-100' :
                        event.status === 'warning' ? 'bg-yellow-100' :
                        event.status === 'error' ? 'bg-red-100' : 'bg-blue-100'
                      }`}>
                        {event.status === 'success' ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : event.status === 'warning' ? (
                          <AlertTriangle className="h-4 w-4 text-yellow-500" />
                        ) : event.status === 'error' ? (
                          <div className="h-4 w-4 rounded-full bg-red-500"></div>
                        ) : (
                          <div className="h-4 w-4 rounded-full bg-blue-500"></div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{event.message}</div>
                        <div className="text-sm text-gray-500">
                          {event.service} · {event.user} · {event.time}
                        </div>
                      </div>
                      <Badge className={
                        event.status === 'success' ? 'bg-green-100 text-green-800' :
                        event.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                        event.status === 'error' ? 'bg-red-100 text-red-800' :
                        'bg-blue-100 text-blue-800'
                      }>
                        {event.status === 'success' ? '成功' :
                         event.status === 'warning' ? '警告' :
                         event.status === 'error' ? '错误' : '信息'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 系统资源监控 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <HardDrive className="mr-2 h-5 w-5" />
              系统资源监控
            </CardTitle>
            <CardDescription>平台系统资源使用情况</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium">CPU使用率</div>
                  <span className="text-lg font-bold">45%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="h-2 rounded-full bg-blue-500" style={{ width: '45%' }}></div>
                </div>
              </div>
              
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium">内存使用率</div>
                  <span className="text-lg font-bold">62%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="h-2 rounded-full bg-green-500" style={{ width: '62%' }}></div>
                </div>
              </div>
              
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium">磁盘使用率</div>
                  <span className="text-lg font-bold">78%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="h-2 rounded-full bg-yellow-500" style={{ width: '78%' }}></div>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <div className="text-sm font-medium mb-2">网络流量</div>
              <div className="h-32 flex items-end space-x-1">
                {Array.from({ length: 24 }, (_, i) => {
                  const height = 20 + Math.random() * 80;
                  return (
                    <div 
                      key={i} 
                      className="flex-1 bg-blue-500 rounded-t"
                      style={{ height: `${height}%` }}
                    ></div>
                  );
                })}
              </div>
              <div className="flex justify-between mt-1 text-xs text-gray-500">
                <span>24小时前</span>
                <span>12小时前</span>
                <span>现在</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageTemplate>
  );
}

```
### app/api/page.tsx
```typescript
// app/api/page.tsx
'use client';

import React, { useState } from 'react';
import { PageTemplate } from '@/components/layout/page-template';
import { DataTable } from '@/components/business/data-table';
import { StatCard, StatCardGroup } from '@/components/business/stat-card';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Code, 
  Zap, 
  BarChart3, 
  Activity,
  Key,
  Shield,
  Settings,
  Plus,
  Search,
  Play,
  Pause,
  Trash2,
  Copy,
  FileText,
  Database,
  Users,
  AlertTriangle
} from 'lucide-react';

export default function APIPage() {
  // 模拟API统计数据
  const [apiStats, setApiStats] = useState([
    {
      title: 'API总数',
      value: '48',
      change: { value: 5, type: 'increase' as const, text: '较上月' },
      icon: <Code className="h-5 w-5" />,
      description: '系统中的API总数'
    },
    {
      title: '今日调用',
      value: '2.4M',
      change: { value: 12, type: 'increase' as const, text: '较昨日' },
      icon: <Zap className="h-5 w-5" />,
      description: '今日API调用次数'
    },
    {
      title: '平均响应时间',
      value: '125ms',
      change: { value: 8, type: 'decrease' as const, text: '较上周' },
      icon: <Activity className="h-5 w-5" />,
      description: 'API平均响应时间'
    },
    {
      title: '错误率',
      value: '0.8%',
      change: { value: 0.2, type: 'decrease' as const, text: '较上周' },
      icon: <AlertTriangle className="h-5 w-5" />,
      description: 'API调用错误率'
    }
  ]);

  // 模拟API列表数据
  const [apiList, setApiList] = useState([
    { 
      id: 1, 
      name: '用户管理API', 
      version: 'v1.2',
      method: 'REST',
      status: 'published',
      endpoints: 12,
      requests: 456000,
      avgResponseTime: 85,
      errorRate: 0.5,
      lastUpdated: '2023-06-01'
    },
    { 
      id: 2, 
      name: '内容管理API', 
      version: 'v2.1',
      method: 'REST',
      status: 'published',
      endpoints: 18,
      requests: 789000,
      avgResponseTime: 120,
      errorRate: 0.3,
      lastUpdated: '2023-05-28'
    },
    { 
      id: 3, 
      name: '数据分析API', 
      version: 'v1.0',
      method: 'GraphQL',
      status: 'draft',
      endpoints: 8,
      requests: 123000,
      avgResponseTime: 210,
      errorRate: 1.2,
      lastUpdated: '2023-06-05'
    },
    { 
      id: 4, 
      name: 'AI引擎API', 
      version: 'v0.9',
      method: 'REST',
      status: 'testing',
      endpoints: 15,
      requests: 234000,
      avgResponseTime: 350,
      errorRate: 2.1,
      lastUpdated: '2023-06-03'
    }
  ]);

  // API列表表格列
  const apiColumns = [
    { key: 'name', title: 'API名称' },
    { key: 'version', title: '版本' },
    { key: 'method', title: '协议' },
    { key: 'endpoints', title: '端点数' },
    { key: 'requests', title: '请求数', render: (value: number) => value.toLocaleString() },
    { key: 'avgResponseTime', title: '平均响应时间', render: (value: number) => `${value}ms` },
    { key: 'errorRate', title: '错误率', render: (value: number) => `${value}%` },
    { key: 'lastUpdated', title: '最后更新' },
    { 
      key: 'status', 
      title: '状态',
      render: (value: string) => {
        const statusMap = {
          'published': { label: '已发布', color: 'bg-green-100 text-green-800' },
          'draft': { label: '草稿', color: 'bg-yellow-100 text-yellow-800' },
          'testing': { label: '测试中', color: 'bg-blue-100 text-blue-800' }
        };
        const status = statusMap[value as keyof typeof statusMap] || statusMap['draft'];
        return <Badge className={status.color}>{status.label}</Badge>;
      }
    }
  ];

  // 模拟API密钥数据
  const [apiKeys, setApiKeys] = useState([
    { 
      id: 1, 
      name: '生产环境密钥', 
      key: 'ak_1a2b3c4d5e6f7g8h9i0j',
      status: 'active',
      created: '2023-05-01',
      lastUsed: '2023-06-10',
      permissions: ['read', 'write'],
      rateLimit: '1000/min'
    },
    { 
      id: 2, 
      name: '测试环境密钥', 
      key: 'ak_2b3c4d5e6f7g8h9i0j1k',
      status: 'active',
      created: '2023-05-15',
      lastUsed: '2023-06-09',
      permissions: ['read', 'write'],
      rateLimit: '5000/min'
    },
    { 
      id: 3, 
      name: '开发环境密钥', 
      key: 'ak_3c4d5e6f7g8h9i0j1k2l',
      status: 'revoked',
      created: '2023-04-20',
      lastUsed: '2023-05-30',
      permissions: ['read', 'write', 'delete'],
      rateLimit: '10000/min'
    }
  ]);

  // API密钥表格列
  const apiKeyColumns = [
    { key: 'name', title: '密钥名称' },
    { key: 'key', title: '密钥', render: (value: string) => `${value.substring(0, 20)}...` },
    { key: 'status', title: '状态', render: (value: string) => 
      <Badge className={value === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
        {value === 'active' ? '活跃' : '已撤销'}
      </Badge>
    },
    { key: 'created', title: '创建时间' },
    { key: 'lastUsed', title: '最后使用' },
    { key: 'rateLimit', title: '速率限制' }
  ];

  // 模拟API调用日志数据
  const [apiLogs, setApiLogs] = useState([
    { 
      id: 1, 
      api: '用户管理API',
      endpoint: '/api/v1/users',
      method: 'GET',
      status: 200,
      responseTime: 85,
      timestamp: '2023-06-10 10:30:25',
      ip: '192.168.1.100',
      userAgent: 'Mozilla/5.0'
    },
    { 
      id: 2, 
      api: '内容管理API',
      endpoint: '/api/v2/content',
      method: 'POST',
      status: 201,
      responseTime: 120,
      timestamp: '2023-06-10 10:29:15',
      ip: '192.168.1.101',
      userAgent: 'curl/7.68.0'
    },
    { 
      id: 3, 
      api: '数据分析API',
      endpoint: '/api/v1/analytics',
      method: 'GET',
      status: 500,
      responseTime: 210,
      timestamp: '2023-06-10 10:28:45',
      ip: '192.168.1.102',
      userAgent: 'PostmanRuntime/7.28.0'
    },
    { 
      id: 4, 
      api: 'AI引擎API',
      endpoint: '/api/v0.9/predict',
      method: 'POST',
      status: 200,
      responseTime: 350,
      timestamp: '2023-06-10 10:27:30',
      ip: '192.168.1.103',
      userAgent: 'Python-requests/2.25.1'
    }
  ]);

  // API调用日志表格列
  const apiLogColumns = [
    { key: 'timestamp', title: '时间' },
    { key: 'api', title: 'API' },
    { key: 'endpoint', title: '端点' },
    { key: 'method', title: '方法' },
    { key: 'status', title: '状态码', render: (value: number) => 
      <Badge className={value >= 200 && value < 300 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
        {value}
      </Badge>
    },
    { key: 'responseTime', title: '响应时间', render: (value: number) => `${value}ms` },
    { key: 'ip', title: 'IP地址' }
  ];

  // 获取状态样式
  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'revoked':
        return 'bg-red-100 text-red-800';
      case 'published':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'testing':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <PageTemplate
      title="API管理"
      description="API接口管理和监控界面，包含API文档、密钥管理和调用日志"
      breadcrumbs={[
        { title: '首页', path: '/dashboard' },
        { title: '商务功能', path: '/business' },
        { title: 'API管理', path: '/api' }
      ]}
      actions={
        <div className="flex gap-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            创建API
          </Button>
          <Button variant="outline">
            <Settings className="mr-2 h-4 w-4" />
            API设置
          </Button>
        </div>
      }
    >
      <div className="space-y-8">
        {/* API统计卡片 */}
        <StatCardGroup>
          {apiStats.map((stat, index) => (
            <StatCard
              key={index}
              title={stat.title}
              value={stat.value}
              change={stat.change}
              icon={stat.icon}
              description={stat.description}
            />
          ))}
        </StatCardGroup>

        {/* API管理标签页 */}
        <Tabs defaultValue="apis" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="apis">API列表</TabsTrigger>
            <TabsTrigger value="keys">API密钥</TabsTrigger>
            <TabsTrigger value="logs">调用日志</TabsTrigger>
          </TabsList>
          
          <TabsContent value="apis" className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="搜索API..."
                  className="pl-8"
                />
              </div>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Code className="mr-2 h-5 w-5" />
                  API列表
                </CardTitle>
              </CardHeader>
              <CardContent>
                <DataTable
                  data={apiList}
                  columns={apiColumns}
                  actions={(row) => (
                    <>
                      <button className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100">
                        <FileText className="inline mr-2 h-4 w-4" />
                        查看文档
                      </button>
                      <button className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100">
                        <Play className="inline mr-2 h-4 w-4" />
                        测试API
                      </button>
                      <button className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100">
                        <BarChart3 className="inline mr-2 h-4 w-4" />
                        查看统计
                      </button>
                      <button className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100">
                        编辑API
                      </button>
                      <button className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100 text-red-500">
                        <Trash2 className="inline mr-2 h-4 w-4" />
                        删除API
                      </button>
                    </>
                  )}
                />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="keys" className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="搜索密钥..."
                  className="pl-8"
                />
              </div>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                生成密钥
              </Button>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Key className="mr-2 h-5 w-5" />
                  API密钥
                </CardTitle>
              </CardHeader>
              <CardContent>
                <DataTable
                  data={apiKeys}
                  columns={apiKeyColumns}
                  actions={(row) => (
                    <>
                      <button className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100">
                        <Copy className="inline mr-2 h-4 w-4" />
                        复制密钥
                      </button>
                      <button className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100">
                        <Shield className="inline mr-2 h-4 w-4" />
                        管理权限
                      </button>
                      {row.status === 'active' ? (
                        <button className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100">
                          <Pause className="inline mr-2 h-4 w-4" />
                          撤销密钥
                        </button>
                      ) : (
                        <button className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100">
                          <Play className="inline mr-2 h-4 w-4" />
                          重新激活
                        </button>
                      )}
                      <button className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100 text-red-500">
                        <Trash2 className="inline mr-2 h-4 w-4" />
                        删除密钥
                      </button>
                    </>
                  )}
                />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="logs" className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="搜索日志..."
                  className="pl-8"
                />
              </div>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="mr-2 h-5 w-5" />
                  API调用日志
                </CardTitle>
              </CardHeader>
              <CardContent>
                <DataTable
                  data={apiLogs}
                  columns={apiLogColumns}
                  actions={(row) => (
                    <>
                      <button className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100">
                        查看详情
                      </button>
                      <button className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100">
                        查看请求
                      </button>
                      <button className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100">
                        查看响应
                      </button>
                    </>
                  )}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* API性能监控 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="mr-2 h-5 w-5" />
              API性能监控
            </CardTitle>
            <CardDescription>API响应时间和错误率趋势</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="text-sm font-medium mb-2">响应时间趋势 (ms)</div>
                <div className="h-48 flex items-end space-x-1">
                  {Array.from({ length: 24 }, (_, i) => {
                    const height = 30 + Math.random() * 70;
                    return (
                      <div 
                        key={i} 
                        className="flex-1 bg-blue-500 rounded-t"
                        style={{ height: `${height}%` }}
                      ></div>
                    );
                  })}
                </div>
                <div className="flex justify-between mt-1 text-xs text-gray-500">
                  <span>24小时前</span>
                  <span>12小时前</span>
                  <span>现在</span>
                </div>
              </div>
              
              <div>
                <div className="text-sm font-medium mb-2">错误率趋势 (%)</div>
                <div className="h-48 flex items-end space-x-1">
                  {Array.from({ length: 24 }, (_, i) => {
                    const height = 10 + Math.random() * 20;
                    return (
                      <div 
                        key={i} 
                        className="flex-1 bg-red-500 rounded-t"
                        style={{ height: `${height}%` }}
                      ></div>
                    );
                  })}
                </div>
                <div className="flex justify-between mt-1 text-xs text-gray-500">
                  <span>24小时前</span>
                  <span>12小时前</span>
                  <span>现在</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageTemplate>
  );
}

```
### app/mobile/page.tsx
```typescript
// app/mobile/page.tsx
'use client';

import React, { useState } from 'react';
import { PageTemplate } from '@/components/layout/page-template';
import { DataTable } from '@/components/business/data-table';
import { StatCard, StatCardGroup } from '@/components/business/stat-card';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Smartphone, 
  Download, 
  Users, 
  Star,
  BarChart3,
  Activity,
  Settings,
  Plus,
  Search,
  Upload,
  Code,
  Bug,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

export default function MobilePage() {
  // 模拟移动应用统计数据
  const [mobileStats, setMobileStats] = useState([
    {
      title: '应用总数',
      value: '6',
      change: { value: 1, type: 'increase' as const, text: '较上月' },
      icon: <Smartphone className="h-5 w-5" />,
      description: '平台中的移动应用总数'
    },
    {
      title: '总下载量',
      value: '125.6K',
      change: { value: 18, type: 'increase' as const, text: '较上月' },
      icon: <Download className="h-5 w-5" />,
      description: '应用总下载量'
    },
    {
      title: '活跃用户',
      value: '45.2K',
      change: { value: 12, type: 'increase' as const, text: '较上月' },
      icon: <Users className="h-5 w-5" />,
      description: '移动应用活跃用户数'
    },
    {
      title: '平均评分',
      value: '4.6',
      change: { value: 0.2, type: 'increase' as const, text: '较上月' },
      icon: <Star className="h-5 w-5" />,
      description: '应用平均评分'
    }
  ]);

  // 模拟应用列表数据
  const [appList, setAppList] = useState([
    { 
      id: 1, 
      name: 'YanYu Cloud³ 移动版', 
      platform: 'iOS, Android',
      version: '2.1.0',
      status: 'published',
      downloads: 45600,
      rating: 4.8,
      size: '45 MB',
      lastUpdated: '2023-06-01'
    },
    { 
      id: 2, 
      name: 'YanYu 数据分析', 
      platform: 'Android',
      version: '1.5.2',
      status: 'published',
      downloads: 32500,
      rating: 4.5,
      size: '32 MB',
      lastUpdated: '2023-05-28'
    },
    { 
      id: 3, 
      name: 'YanYu AI助手', 
      platform: 'iOS',
      version: '0.9.5',
      status: 'testing',
      downloads: 12500,
      rating: 4.2,
      size: '28 MB',
      lastUpdated: '2023-06-05'
    },
    { 
      id: 4, 
      name: 'YanYu 项目管理', 
      platform: 'iOS, Android',
      version: '1.2.0',
      status: 'development',
      downloads: 0,
      rating: 0,
      size: '38 MB',
      lastUpdated: '2023-06-03'
    }
  ]);

  // 应用列表表格列
  const appColumns = [
    { key: 'name', title: '应用名称' },
    { key: 'platform', title: '平台' },
    { key: 'version', title: '版本' },
    { key: 'downloads', title: '下载量', render: (value: number) => value.toLocaleString() },
    { key: 'rating', title: '评分', render: (value: number) => value > 0 ? `${value} ★` : '-' },
    { key: 'size', title: '大小' },
    { key: 'lastUpdated', title: '最后更新' },
    { 
      key: 'status', 
      title: '状态',
      render: (value: string) => {
        const statusMap = {
          'published': { label: '已发布', color: 'bg-green-100 text-green-800' },
          'testing': { label: '测试中', color: 'bg-yellow-100 text-yellow-800' },
          'development': { label: '开发中', color: 'bg-blue-100 text-blue-800' }
        };
        const status = statusMap[value as keyof typeof statusMap] || statusMap['development'];
        return <Badge className={status.color}>{status.label}</Badge>;
      }
    }
  ];

  // 模拟应用版本数据
  const [appVersions, setAppVersions] = useState([
    { 
      id: 1, 
      appId: 1,
      appName: 'YanYu Cloud³ 移动版',
      version: '2.1.0',
      buildNumber: '20230601',
      status: 'published',
      releaseDate: '2023-06-01',
      changes: '修复已知问题，优化用户体验',
      downloads: 5600,
      crashRate: 0.2
    },
    { 
      id: 2, 
      appId: 1,
      appName: 'YanYu Cloud³ 移动版',
      version: '2.0.5',
      buildNumber: '20230520',
      status: 'archived',
      releaseDate: '2023-05-20',
      changes: '新增数据同步功能',
      downloads: 12500,
      crashRate: 0.3
    },
    { 
      id: 3, 
      appId: 2,
      appName: 'YanYu 数据分析',
      version: '1.5.2',
      buildNumber: '20230528',
      status: 'published',
      releaseDate: '2023-05-28',
      changes: '优化图表加载速度',
      downloads: 3200,
      crashRate: 0.1
    },
    { 
      id: 4, 
      appId: 3,
      appName: 'YanYu AI助手',
      version: '0.9.5',
      buildNumber: '20230605',
      status: 'testing',
      releaseDate: '2023-06-05',
      changes: '新增语音识别功能',
      downloads: 800,
      crashRate: 1.2
    }
  ]);

  // 应用版本表格列
  const appVersionColumns = [
    { key: 'appName', title: '应用名称' },
    { key: 'version', title: '版本' },
    { key: 'buildNumber', title: '构建号' },
    { key: 'releaseDate', title: '发布日期' },
    { key: 'downloads', title: '下载量', render: (value: number) => value.toLocaleString() },
    { key: 'crashRate', title: '崩溃率', render: (value: number) => `${value}%` },
    { 
      key: 'status', 
      title: '状态',
      render: (value: string) => {
        const statusMap = {
          'published': { label: '已发布', color: 'bg-green-100 text-green-800' },
          'testing': { label: '测试中', color: 'bg-yellow-100 text-yellow-800' },
          'archived': { label: '已归档', color: 'bg-gray-100 text-gray-800' }
        };
        const status = statusMap[value as keyof typeof statusMap] || statusMap['testing'];
        return <Badge className={status.color}>{status.label}</Badge>;
      }
    }
  ];

  // 模拟应用崩溃报告数据
  const [crashReports, setCrashReports] = useState([
    { 
      id: 1, 
      appName: 'YanYu Cloud³ 移动版',
      version: '2.1.0',
      device: 'iPhone 13 Pro',
      os: 'iOS 16.5',
      error: 'NSInvalidArgumentException',
      occurrences: 125,
      date: '2023-06-10',
      status: 'resolved'
    },
    { 
      id: 2, 
      appName: 'YanYu AI助手',
      version: '0.9.5',
      device: 'Samsung Galaxy S22',
      os: 'Android 13',
      error: 'NullPointerException',
      occurrences: 89,
      date: '2023-06-09',
      status: 'investigating'
    },
    { 
      id: 3, 
      appName: 'YanYu 数据分析',
      version: '1.5.2',
      device: 'Google Pixel 6',
      os: 'Android 13',
      error: 'NetworkOnMainThreadException',
      occurrences: 45,
      date: '2023-06-08',
      status: 'resolved'
    },
    { 
      id: 4, 
      appName: 'YanYu Cloud³ 移动版',
      version: '2.0.5',
      device: 'iPhone 12',
      os: 'iOS 16.4',
      error: 'SIGSEGV',
      occurrences: 32,
      date: '2023-06-07',
      status: 'open'
    }
  ]);

  // 应用崩溃报告表格列
  const crashReportColumns = [
    { key: 'appName', title: '应用名称' },
    { key: 'version', title: '版本' },
    { key: 'device', title: '设备' },
    { key: 'os', title: '操作系统' },
    { key: 'error', title: '错误类型' },
    { key: 'occurrences', title: '发生次数' },
    { key: 'date', title: '日期' },
    { 
      key: 'status', 
      title: '状态',
      render: (value: string) => {
        const statusMap = {
          'resolved': { label: '已解决', color: 'bg-green-100 text-green-800' },
          'investigating': { label: '调查中', color: 'bg-yellow-100 text-yellow-800' },
          'open': { label: '未处理', color: 'bg-red-100 text-red-800' }
        };
        const status = statusMap[value as keyof typeof statusMap] || statusMap['open'];
        return <Badge className={status.color}>{status.label}</Badge>;
      }
    }
  ];

  // 获取状态样式
  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800';
      case 'testing':
        return 'bg-yellow-100 text-yellow-800';
      case 'development':
        return 'bg-blue-100 text-blue-800';
      case 'archived':
        return 'bg-gray-100 text-gray-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'investigating':
        return 'bg-yellow-100 text-yellow-800';
      case 'open':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // 获取状态图标
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'published':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'testing':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'development':
        return <Code className="h-5 w-5 text-blue-500" />;
      case 'archived':
        return <div className="h-5 w-5 rounded-full bg-gray-500"></div>;
      default:
        return <div className="h-5 w-5 rounded-full bg-gray-300"></div>;
    }
  };

  return (
    <PageTemplate
      title="移动应用"
      description="移动应用管理和监控界面，包含应用发布、版本控制和崩溃报告"
      breadcrumbs={[
        { title: '首页', path: '/dashboard' },
        { title: '商务功能', path: '/business' },
        { title: '移动应用', path: '/mobile' }
      ]}
      actions={
        <div className="flex gap-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            创建应用
          </Button>
          <Button variant="outline">
            <Settings className="mr-2 h-4 w-4" />
            应用设置
          </Button>
        </div>
      }
    >
      <div className="space-y-8">
        {/* 移动应用统计卡片 */}
        <StatCardGroup>
          {mobileStats.map((stat, index) => (
            <StatCard
              key={index}
              title={stat.title}
              value={stat.value}
              change={stat.change}
              icon={stat.icon}
              description={stat.description}
            />
          ))}
        </StatCardGroup>

        {/* 移动应用管理标签页 */}
        <Tabs defaultValue="apps" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="apps">应用列表</TabsTrigger>
            <TabsTrigger value="versions">版本管理</TabsTrigger>
            <TabsTrigger value="crashes">崩溃报告</TabsTrigger>
          </TabsList>
          
          <TabsContent value="apps" className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="搜索应用..."
                  className="pl-8"
                />
              </div>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Smartphone className="mr-2 h-5 w-5" />
                  应用列表
                </CardTitle>
              </CardHeader>
              <CardContent>
                <DataTable
                  data={appList}
                  columns={appColumns}
                  actions={(row) => (
                    <>
                      <button className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100">
                        查看详情
                      </button>
                      <button className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100">
                        <BarChart3 className="inline mr-2 h-4 w-4" />
                        查看统计
                      </button>
                      <button className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100">
                        <Upload className="inline mr-2 h-4 w-4" />
                        上传新版本
                      </button>
                      <button className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100">
                        编辑应用
                      </button>
                      <button className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100 text-red-500">
                        删除应用
                      </button>
                    </>
                  )}
                />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="versions" className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="搜索版本..."
                  className="pl-8"
                />
              </div>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Code className="mr-2 h-5 w-5" />
                  版本管理
                </CardTitle>
              </CardHeader>
              <CardContent>
                <DataTable
                  data={appVersions}
                  columns={appVersionColumns}
                  actions={(row) => (
                    <>
                      <button className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100">
                        查看详情
                      </button>
                      <button className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100">
                        下载版本
                      </button>
                      {row.status === 'published' ? (
                        <button className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100">
                          归档版本
                        </button>
                      ) : (
                        <button className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100">
                          发布版本
                        </button>
                      )}
                      <button className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100 text-red-500">
                        删除版本
                      </button>
                    </>
                  )}
                />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="crashes" className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="搜索崩溃报告..."
                  className="pl-8"
                />
              </div>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bug className="mr-2 h-5 w-5" />
                  崩溃报告
                </CardTitle>
              </CardHeader>
              <CardContent>
                <DataTable
                  data={crashReports}
                  columns={crashReportColumns}
                  actions={(row) => (
                    <>
                      <button className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100">
                        查看详情
                      </button>
                      <button className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100">
                        查看堆栈
                      </button>
                      {row.status === 'open' ? (
                        <button className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100">
                          标记为调查中
                        </button>
                      ) : row.status === 'investigating' ? (
                        <button className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100">
                          标记为已解决
                        </button>
                      ) : null}
                    </>
                  )}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* 应用性能监控 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="mr-2 h-5 w-5" />
              应用性能监控
            </CardTitle>
            <CardDescription>应用性能指标和用户行为分析</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="text-sm font-medium mb-2">日活跃用户</div>
                <div className="h-48 flex items-end space-x-1">
                  {Array.from({ length: 7 }, (_, i) => {
                    const height = 30 + Math.random() * 70;
                    return (
                      <div 
                        key={i} 
                        className="flex-1 bg-blue-500 rounded-t"
                        style={{ height: `${height}%` }}
                      ></div>
                    );
                  })}
                </div>
                <div className="flex justify-between mt-1 text-xs text-gray-500">
                  <span>7天前</span>
                  <span>3天前</span>
                  <span>今天</span>
                </div>
              </div>
              
              <div>
                <div className="text-sm font-medium mb-2">应用崩溃率 (%)</div>
                <div className="h-48 flex items-end space-x-1">
                  {Array.from({ length: 7 }, (_, i) => {
                    const height = 5 + Math.random() * 15;
                    return (
                      <div 
                        key={i} 
                        className="flex-1 bg-red-500 rounded-t"
                        style={{ height: `${height}%` }}
                      ></div>
                    );
                  })}
                </div>
                <div className="flex justify-between mt-1 text-xs text-gray-500">
                  <span>7天前</span>
                  <span>3天前</span>
                  <span>今天</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageTemplate>
  );
}

```
### app/chat/page.tsx
```typescript
// app/chat/page.tsx
'use client';

import React, { useState } from 'react';
import { PageTemplate } from '@/components/layout/page-template';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  MessageSquare, 
  Users, 
  Bot, 
  Send,
  Search,
  Plus,
  Settings,
  Paperclip,
  Smile,
  MoreHorizontal,
  Phone,
  Video,
  Info,
  Check,
  CheckCheck
} from 'lucide-react';

export default function ChatPage() {
  // 模拟聊天列表数据
  const [chatList, setChatList] = useState([
    { 
      id: 1, 
      name: '产品团队', 
      type: 'group',
      lastMessage: '新版本计划已经确定',
      time: '10:30',
      unread: 3,
      members: 8,
      avatar: ''
    },
    { 
      id: 2, 
      name: '张三', 
      type: 'private',
      lastMessage: '明天的会议准备好了吗？',
      time: '09:45',
      unread: 0,
      members: 1,
      avatar: ''
    },
    { 
      id: 3, 
      name: '技术支持', 
      type: 'group',
      lastMessage: '问题已经解决，感谢反馈',
      time: '昨天',
      unread: 0,
      members: 5,
      avatar: ''
    },
    { 
      id: 4, 
      name: '李四', 
      type: 'private',
      lastMessage: '文档已经更新完成',
      time: '昨天',
      unread: 1,
      members: 1,
      avatar: ''
    },
    { 
      id: 5, 
      name: 'AI助手', 
      type: 'bot',
      lastMessage: '有什么可以帮助您的吗？',
      time: '前天',
      unread: 0,
      members: 1,
      avatar: ''
    }
  ]);

  // 模拟聊天消息数据
  const [chatMessages, setChatMessages] = useState([
    { 
      id: 1, 
      senderId: 'user',
      senderName: '我',
      content: '大家好，关于新版本的开发计划有什么想法吗？',
      time: '10:15',
      status: 'read'
    },
    { 
      id: 2, 
      senderId: 'other',
      senderName: '张三',
      content: '我认为我们应该优先考虑用户体验的改进',
      time: '10:18',
      status: 'read'
    },
    { 
      id: 3, 
      senderId: 'other',
      senderName: '李四',
      content: '同意，另外性能优化也很重要',
      time: '10:20',
      status: 'read'
    },
    { 
      id: 4, 
      senderId: 'user',
      senderName: '我',
      content: '好的，我会整理大家的意见，制定一个详细的计划',
      time: '10:25',
      status: 'read'
    },
    { 
      id: 5, 
      senderId: 'other',
      senderName: '王五',
      content: '新版本计划已经确定，请大家查看邮件',
      time: '10:30',
      status: 'delivered'
    }
  ]);

  // 模拟AI助手聊天数据
  const [aiMessages, setAiMessages] = useState([
    { 
      id: 1, 
      sender: 'user',
      content: '你好，我需要了解YanYu Cloud³平台的API使用方法',
      time: '14:20'
    },
    { 
      id: 2, 
      sender: 'ai',
      content: '您好！YanYu Cloud³平台提供了丰富的API接口，您可以通过我们的API文档了解详细信息。请问您具体需要了解哪个方面的API？',
      time: '14:21'
    },
    { 
      id: 3, 
      sender: 'user',
      content: '我想了解用户管理相关的API',
      time: '14:22'
    },
    { 
      id: 4, 
      sender: 'ai',
      content: '用户管理API包括用户注册、登录、信息修改等功能。主要接口有：\n1. POST /api/v1/users/register - 用户注册\n2. POST /api/v1/users/login - 用户登录\n3. GET /api/v1/users/{id} - 获取用户信息\n4. PUT /api/v1/users/{id} - 更新用户信息\n\n您可以通过访问我们的开发者中心获取完整的API文档和示例代码。',
      time: '14:23'
    }
  ]);

  // 当前选中的聊天
  const [activeChat, setActiveChat] = useState(1);
  const [newMessage, setNewMessage] = useState('');

  // 发送消息
  const sendMessage = () => {
    if (newMessage.trim() === '') return;
    
    const userMessage = {
      id: chatMessages.length + 1,
      senderId: 'user',
      senderName: '我',
      content: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sent'
    };
    
    setChatMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    
    // 模拟回复
    setTimeout(() => {
      const aiMessage = {
        id: chatMessages.length + 2,
        senderId: 'other',
        senderName: 'AI助手',
        content: '我正在处理您的请求，请稍候...',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'delivered'
      };
      setChatMessages(prev => [...prev, aiMessage]);
    }, 1000);
  };

  // 获取状态图标
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'sent':
        return <Check className="h-3 w-3 text-gray-400" />;
      case 'delivered':
        return <CheckCheck className="h-3 w-3 text-gray-400" />;
      case 'read':
        return <CheckCheck className="h-3 w-3 text-blue-500" />;
      default:
        return null;
    }
  };

  // 获取聊天类型图标
  const getChatTypeIcon = (type: string) => {
    switch (type) {
      case 'group':
        return <Users className="h-4 w-4 text-gray-500" />;
      case 'private':
        return <MessageSquare className="h-4 w-4 text-gray-500" />;
      case 'bot':
        return <Bot className="h-4 w-4 text-gray-500" />;
      default:
        return <MessageSquare className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <PageTemplate
      title="聊天系统"
      description="团队沟通和AI助手界面，支持群组聊天、私聊和智能对话"
      breadcrumbs={[
        { title: '首页', path: '/dashboard' },
        { title: '商务功能', path: '/business' },
        { title: '聊天系统', path: '/chat' }
      ]}
      actions={
        <div className="flex gap-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            新建聊天
          </Button>
          <Button variant="outline">
            <Settings className="mr-2 h-4 w-4" />
            聊天设置
          </Button>
        </div>
      }
    >
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row h-[calc(100vh-200px)]">
          {/* 聊天列表 */}
          <div className="w-full md:w-1/3 border-r">
            <div className="p-4 border-b">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="搜索聊天..."
                  className="pl-8"
                />
              </div>
            </div>
            
            <div className="overflow-y-auto h-[calc(100%-60px)]">
              {chatList.map(chat => (
                <div 
                  key={chat.id} 
                  className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${
                    activeChat === chat.id ? 'bg-blue-50' : ''
                  }`}
                  onClick={() => setActiveChat(chat.id)}
                >
                  <div className="flex items-start">
                    <div className="mr-3">
                      {chat.type === 'group' ? (
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <Users className="h-5 w-5 text-blue-500" />
                        </div>
                      ) : chat.type === 'bot' ? (
                        <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                          <Bot className="h-5 w-5 text-purple-500" />
                        </div>
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                          <span className="font-medium">{chat.name.charAt(0)}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div className="font-medium truncate">{chat.name}</div>
                        <div className="text-xs text-gray-500">{chat.time}</div>
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <div className="text-sm text-gray-500 truncate">{chat.lastMessage}</div>
                        {chat.unread > 0 && (
                          <Badge className="bg-red-500 text-white text-xs">
                            {chat.unread}
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center mt-1 text-xs text-gray-500">
                        {getChatTypeIcon(chat.type)}
                        <span className="ml-1">
                          {chat.type === 'group' ? `${chat.members} 成员` : chat.type === 'bot' ? 'AI助手' : '私聊'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* 聊天内容 */}
          <div className="w-full md:w-2/3 flex flex-col">
            <div className="p-4 border-b flex items-center justify-between">
              <div className="flex items-center">
                <div className="mr-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <Users className="h-5 w-5 text-blue-500" />
                  </div>
                </div>
                <div>
                  <div className="font-medium">产品团队</div>
                  <div className="text-sm text-gray-500">8 成员</div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm">
                  <Phone className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Video className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Info className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
              <div className="space-y-4">
                {chatMessages.map(message => (
                  <div 
                    key={message.id} 
                    className={`flex ${message.senderId === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-xs lg:max-w-md ${
                      message.senderId === 'user' ? 'order-2' : 'order-1'
                    }`}>
                      {message.senderId !== 'user' && (
                        <div className="text-xs text-gray-500 mb-1">{message.senderName}</div>
                      )}
                      <div className={`p-3 rounded-lg ${
                        message.senderId === 'user' 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-white border'
                      }`}>
                        {message.content}
                      </div>
                      <div className={`flex items-center mt-1 text-xs text-gray-500 ${
                        message.senderId === 'user' ? 'justify-end' : 'justify-start'
                      }`}>
                        <span>{message.time}</span>
                        {message.senderId === 'user' && (
                          <span className="ml-1">{getStatusIcon(message.status)}</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Button variant="ghost" size="sm">
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="输入消息..."
                  className="flex-1"
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                />
                <Button variant="ghost" size="sm">
                  <Smile className="h-4 w-4" />
                </Button>
                <Button onClick={sendMessage}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* AI助手标签页 */}
        <Tabs defaultValue="chat" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="chat">团队聊天</TabsTrigger>
            <TabsTrigger value="ai">AI助手</TabsTrigger>
          </TabsList>
          
          <TabsContent value="ai" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bot className="mr-2 h-5 w-5" />
                  AI助手
                </CardTitle>
                <CardDescription>与AI助手对话，获取智能分析和建议</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 overflow-y-auto mb-4 border rounded-lg p-4">
                  {aiMessages.map(message => (
                    <div 
                      key={message.id} 
                      className={`mb-4 ${message.sender === 'user' ? 'text-right' : ''}`}
                    >
                      <div className={`inline-block p-3 rounded-lg max-w-xs lg:max-w-md ${
                        message.sender === 'user' 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {message.content}
                      </div>
                      <div className={`text-xs text-gray-500 mt-1 ${
                        message.sender === 'user' ? 'text-right' : ''
                      }`}>
                        {message.time}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex">
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="输入您的问题..."
                    className="flex-1"
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  />
                  <Button onClick={sendMessage} className="ml-2">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageTemplate>
  );
}

```
### app/settings/general/page.tsx
```typescript
// app/settings/general/page.tsx
'use client';

import React, { useState } from 'react';
import { PageTemplate } from '@/components/layout/page-template';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Settings, 
  Save, 
  RefreshCw,
  Globe,
  Mail,
  Bell,
  Shield,
  Palette,
  Database,
  Users
} from 'lucide-react';

export default function GeneralSettingsPage() {
  // 系统基本信息
  const [systemInfo, setSystemInfo] = useState({
    siteName: 'YanYu Cloud³',
    siteUrl: 'https://yanyucloud.com',
    adminEmail: 'admin@yanyucloud.com',
    timezone: 'Asia/Shanghai',
    language: 'zh-CN',
    description: 'YanYu Cloud³ - 企业级云平台解决方案'
  });

  // 系统设置
  const [systemSettings, setSystemSettings] = useState({
    allowRegistration: true,
    emailVerification: true,
    defaultUserRole: 'user',
    sessionTimeout: 30,
    maxLoginAttempts: 5,
    passwordMinLength: 8,
    requireSpecialChars: true
  });

  // 邮件设置
  const [emailSettings, setEmailSettings] = useState({
    smtpHost: 'smtp.yanyucloud.com',
    smtpPort: 587,
    smtpUsername: 'noreply@yanyucloud.com',
    smtpPassword: '********',
    encryption: 'tls',
    fromName: 'YanYu Cloud³',
    fromEmail: 'noreply@yanyucloud.com'
  });

  // 通知设置
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    systemAlerts: true,
    securityAlerts: true,
    updateNotifications: true,
    marketingEmails: false
  });

  // 保存设置
  const saveSettings = () => {
    // 这里应该调用API保存设置
    alert('设置已保存');
  };

  // 重置设置
  const resetSettings = () => {
    // 这里应该重置为默认值
    alert('设置已重置');
  };

  return (
    <PageTemplate
      title="常规设置"
      description="系统常规设置界面，包含站点信息、系统配置和邮件设置"
      breadcrumbs={[
        { title: '首页', path: '/dashboard' },
        { title: '系统设置', path: '/settings' },
        { title: '常规设置', path: '/settings/general' }
      ]}
    >
      <div className="space-y-6">
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="general">常规</TabsTrigger>
            <TabsTrigger value="system">系统</TabsTrigger>
            <TabsTrigger value="email">邮件</TabsTrigger>
            <TabsTrigger value="notifications">通知</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe className="mr-2 h-5 w-5" />
                  站点信息
                </CardTitle>
                <CardDescription>配置站点的基本信息</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="siteName">站点名称</Label>
                    <Input
                      id="siteName"
                      value={systemInfo.siteName}
                      onChange={(e) => setSystemInfo({...systemInfo, siteName: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="siteUrl">站点URL</Label>
                    <Input
                      id="siteUrl"
                      value={systemInfo.siteUrl}
                      onChange={(e) => setSystemInfo({...systemInfo, siteUrl: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="adminEmail">管理员邮箱</Label>
                    <Input
                      id="adminEmail"
                      type="email"
                      value={systemInfo.adminEmail}
                      onChange={(e) => setSystemInfo({...systemInfo, adminEmail: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="timezone">时区</Label>
                    <Input
                      id="timezone"
                      value={systemInfo.timezone}
                      onChange={(e) => setSystemInfo({...systemInfo, timezone: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="language">默认语言</Label>
                    <Input
                      id="language"
                      value={systemInfo.language}
                      onChange={(e) => setSystemInfo({...systemInfo, language: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="description">站点描述</Label>
                  <Input
                    id="description"
                    value={systemInfo.description}
                    onChange={(e) => setSystemInfo({...systemInfo, description: e.target.value})}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="system" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="mr-2 h-5 w-5" />
                  系统配置
                </CardTitle>
                <CardDescription>配置系统的基本设置</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>允许用户注册</Label>
                    <p className="text-sm text-gray-500">允许新用户自行注册账户</p>
                  </div>
                  <Switch
                    checked={systemSettings.allowRegistration}
                    onCheckedChange={(checked) => setSystemSettings({...systemSettings, allowRegistration: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>邮箱验证</Label>
                    <p className="text-sm text-gray-500">新用户注册后需要验证邮箱</p>
                  </div>
                  <Switch
                    checked={systemSettings.emailVerification}
                    onCheckedChange={(checked) => setSystemSettings({...systemSettings, emailVerification: checked})}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="defaultUserRole">默认用户角色</Label>
                    <Input
                      id="defaultUserRole"
                      value={systemSettings.defaultUserRole}
                      onChange={(e) => setSystemSettings({...systemSettings, defaultUserRole: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="sessionTimeout">会话超时（分钟）</Label>
                    <Input
                      id="sessionTimeout"
                      type="number"
                      value={systemSettings.sessionTimeout}
                      onChange={(e) => setSystemSettings({...systemSettings, sessionTimeout: parseInt(e.target.value)})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="maxLoginAttempts">最大登录尝试次数</Label>
                    <Input
                      id="maxLoginAttempts"
                      type="number"
                      value={systemSettings.maxLoginAttempts}
                      onChange={(e) => setSystemSettings({...systemSettings, maxLoginAttempts: parseInt(e.target.value)})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="passwordMinLength">密码最小长度</Label>
                    <Input
                      id="passwordMinLength"
                      type="number"
                      value={systemSettings.passwordMinLength}
                      onChange={(e) => setSystemSettings({...systemSettings, passwordMinLength: parseInt(e.target.value)})}
                    />
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>密码必须包含特殊字符</Label>
                    <p className="text-sm text-gray-500">要求用户密码包含特殊字符</p>
                  </div>
                  <Switch
                    checked={systemSettings.requireSpecialChars}
                    onCheckedChange={(checked) => setSystemSettings({...systemSettings, requireSpecialChars: checked})}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="email" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Mail className="mr-2 h-5 w-5" />
                  邮件设置
                </CardTitle>
                <CardDescription>配置系统的邮件发送设置</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="smtpHost">SMTP服务器</Label>
                    <Input
                      id="smtpHost"
                      value={emailSettings.smtpHost}
                      onChange={(e) => setEmailSettings({...emailSettings, smtpHost: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="smtpPort">SMTP端口</Label>
                    <Input
                      id="smtpPort"
                      type="number"
                      value={emailSettings.smtpPort}
                      onChange={(e) => setEmailSettings({...emailSettings, smtpPort: parseInt(e.target.value)})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="smtpUsername">SMTP用户名</Label>
                    <Input
                      id="smtpUsername"
                      value={emailSettings.smtpUsername}
                      onChange={(e) => setEmailSettings({...emailSettings, smtpUsername: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="smtpPassword">SMTP密码</Label>
                    <Input
                      id="smtpPassword"
                      type="password"
                      value={emailSettings.smtpPassword}
                      onChange={(e) => setEmailSettings({...emailSettings, smtpPassword: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="encryption">加密方式</Label>
                    <Input
                      id="encryption"
                      value={emailSettings.encryption}
                      onChange={(e) => setEmailSettings({...emailSettings, encryption: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="fromName">发件人名称</Label>
                    <Input
                      id="fromName"
                      value={emailSettings.fromName}
                      onChange={(e) => setEmailSettings({...emailSettings, fromName: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="fromEmail">发件人邮箱</Label>
                  <Input
                    id="fromEmail"
                    type="email"
                    value={emailSettings.fromEmail}
                    onChange={(e) => setEmailSettings({...emailSettings, fromEmail: e.target.value})}
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={saveSettings}>
                    <Save className="mr-2 h-4 w-4" />
                    保存设置
                  </Button>
                  <Button variant="outline" onClick={resetSettings}>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    重置设置
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="mr-2 h-5 w-5" />
                  通知设置
                </CardTitle>
                <CardDescription>配置系统通知和提醒</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>邮件通知</Label>
                    <p className="text-sm text-gray-500">通过邮件发送系统通知</p>
                  </div>
                  <Switch
                    checked={notificationSettings.emailNotifications}
                    onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, emailNotifications: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>推送通知</Label>
                    <p className="text-sm text-gray-500">通过浏览器推送通知</p>
                  </div>
                  <Switch
                    checked={notificationSettings.pushNotifications}
                    onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, pushNotifications: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>系统警报</Label>
                    <p className="text-sm text-gray-500">接收系统错误和警报通知</p>
                  </div>
                  <Switch
                    checked={notificationSettings.systemAlerts}
                    onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, systemAlerts: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>安全警报</Label>
                    <p className="text-sm text-gray-500">接收安全相关警报</p>
                  </div>
                  <Switch
                    checked={notificationSettings.securityAlerts}
                    onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, securityAlerts: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>更新通知</Label>
                    <p className="text-sm text-gray-500">接收系统更新通知</p>
                  </div>
                  <Switch
                    checked={notificationSettings.updateNotifications}
                    onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, updateNotifications: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>营销邮件</Label>
                    <p className="text-sm text-gray-500">接收产品更新和营销信息</p>
                  </div>
                  <Switch
                    checked={notificationSettings.marketingEmails}
                    onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, marketingEmails: checked})}
                  />
                </div>
                
                <div className="flex gap-2">
                  <Button onClick={saveSettings}>
                    <Save className="mr-2 h-4 w-4" />
                    保存设置
                  </Button>
                  <Button variant="outline" onClick={resetSettings}>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    重置设置
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageTemplate>
  );
}

```
### app/settings/security/page.tsx
```typescript
// app/settings/security/page.tsx
'use client';

import React, { useState } from 'react';
import { PageTemplate } from '@/components/layout/page-template';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Shield, 
  Key, 
  UserCheck, 
  Fingerprint,
  Save,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Clock,
  Eye,
  EyeOff
} from 'lucide-react';

export default function SecuritySettingsPage() {
  // 密码策略
  const [passwordPolicy, setPasswordPolicy] = useState({
    minLength: 8,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSpecialChars: true,
    expireDays: 90,
    preventReuse: 5,
    lockoutThreshold: 5,
    lockoutDuration: 15
  });

  // 两步验证
  const [twoFactorAuth, setTwoFactorAuth] = useState({
    enabled: true,
    requiredForAdmins: true,
    requiredForUsers: false,
    methods: ['app', 'sms', 'email']
  });

  // 登录安全
  const [loginSecurity, setLoginSecurity] = useState({
    sessionTimeout: 30,
    concurrentSessions: 3,
    rememberMeDays: 7,
    loginAttempts: 5,
    lockoutDuration: 15,
    ipWhitelist: '',
    ipBlacklist: ''
  });

  // API安全
  const [apiSecurity, setApiSecurity] = useState({
    rateLimit: 1000,
    rateLimitWindow: 'minute',
    apiKeyExpiration: 365,
    requireHttps: true,
    corsOrigins: '',
    allowedMethods: ['GET', 'POST', 'PUT', 'DELETE']
  });

  // 安全日志
  const [securityLogs, setSecurityLogs] = useState([
    { 
      id: 1, 
      type: 'login', 
      user: 'admin', 
      ip: '192.168.1.100', 
      status: 'success', 
      time: '2023-06-10 10:30:25',
      details: '成功登录'
    },
    { 
      id: 2, 
      type: 'login', 
      user: 'user1', 
      ip: '192.168.1.101', 
      status: 'failed', 
      time: '2023-06-10 10:25:18',
      details: '密码错误'
    },
    { 
      id: 3, 
      type: 'password_change', 
      user: 'admin', 
      ip: '192.168.1.100', 
      status: 'success', 
      time: '2023-06-09 15:45:32',
      details: '密码已更改'
    },
    { 
      id: 4, 
      type: 'api_access', 
      user: 'api_user', 
      ip: '192.168.1.102', 
      status: 'success', 
      time: '2023-06-09 14:20:15',
      details: 'API访问成功'
    }
  ]);

  // 保存设置
  const saveSettings = () => {
    // 这里应该调用API保存设置
    alert('安全设置已保存');
  };

  // 重置设置
  const resetSettings = () => {
    // 这里应该重置为默认值
    alert('安全设置已重置');
  };

  // 获取状态样式
  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-100 text-green-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // 获取状态图标
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'failed':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'warning':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <PageTemplate
      title="安全设置"
      description="系统安全配置界面，包含密码策略、两步验证和访问控制"
      breadcrumbs={[
        { title: '首页', path: '/dashboard' },
        { title: '系统设置', path: '/settings' },
        { title: '安全设置', path: '/settings/security' }
      ]}
    >
      <div className="space-y-6">
        <Tabs defaultValue="password" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="password">密码策略</TabsTrigger>
            <TabsTrigger value="twofactor">两步验证</TabsTrigger>
            <TabsTrigger value="login">登录安全</TabsTrigger>
            <TabsTrigger value="api">API安全</TabsTrigger>
          </TabsList>
          
          <TabsContent value="password" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Key className="mr-2 h-5 w-5" />
                  密码策略
                </CardTitle>
                <CardDescription>配置系统的密码安全策略</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="minLength">最小长度</Label>
                    <Input
                      id="minLength"
                      type="number"
                      value={passwordPolicy.minLength}
                      onChange={(e) => setPasswordPolicy({...passwordPolicy, minLength: parseInt(e.target.value)})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="expireDays">密码过期天数</Label>
                    <Input
                      id="expireDays"
                      type="number"
                      value={passwordPolicy.expireDays}
                      onChange={(e) => setPasswordPolicy({...passwordPolicy, expireDays: parseInt(e.target.value)})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="preventReuse">防止重复使用次数</Label>
                    <Input
                      id="preventReuse"
                      type="number"
                      value={passwordPolicy.preventReuse}
                      onChange={(e) => setPasswordPolicy({...passwordPolicy, preventReuse: parseInt(e.target.value)})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="lockoutThreshold">账户锁定阈值</Label>
                    <Input
                      id="lockoutThreshold"
                      type="number"
                      value={passwordPolicy.lockoutThreshold}
                      onChange={(e) => setPasswordPolicy({...passwordPolicy, lockoutThreshold: parseInt(e.target.value)})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="lockoutDuration">锁定持续时间（分钟）</Label>
                    <Input
                      id="lockoutDuration"
                      type="number"
                      value={passwordPolicy.lockoutDuration}
                      onChange={(e) => setPasswordPolicy({...passwordPolicy, lockoutDuration: parseInt(e.target.value)})}
                    />
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>要求大写字母</Label>
                    <p className="text-sm text-gray-500">密码必须包含大写字母</p>
                  </div>
                  <Switch
                    checked={passwordPolicy.requireUppercase}
                    onCheckedChange={(checked) => setPasswordPolicy({...passwordPolicy, requireUppercase: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>要求小写字母</Label>
                    <p className="text-sm text-gray-500">密码必须包含小写字母</p>
                  </div>
                  <Switch
                    checked={passwordPolicy.requireLowercase}
                    onCheckedChange={(checked) => setPasswordPolicy({...passwordPolicy, requireLowercase: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>要求数字</Label>
                    <p className="text-sm text-gray-500">密码必须包含数字</p>
                  </div>
                  <Switch
                    checked={passwordPolicy.requireNumbers}
                    onCheckedChange={(checked) => setPasswordPolicy({...passwordPolicy, requireNumbers: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>要求特殊字符</Label>
                    <p className="text-sm text-gray-500">密码必须包含特殊字符</p>
                  </div>
                  <Switch
                    checked={passwordPolicy.requireSpecialChars}
                    onCheckedChange={(checked) => setPasswordPolicy({...passwordPolicy, requireSpecialChars: checked})}
                  />
                </div>
                
                <div className="flex gap-2">
                  <Button onClick={saveSettings}>
                    <Save className="mr-2 h-4 w-4" />
                    保存设置
                  </Button>
                  <Button variant="outline" onClick={resetSettings}>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    重置设置
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="twofactor" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <UserCheck className="mr-2 h-5 w-5" />
                  两步验证
                </CardTitle>
                <CardDescription>配置系统的两步验证设置</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>启用两步验证</Label>
                    <p className="text-sm text-gray-500">允许用户使用两步验证</p>
                  </div>
                  <Switch
                    checked={twoFactorAuth.enabled}
                    onCheckedChange={(checked) => setTwoFactorAuth({...twoFactorAuth, enabled: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>管理员必须使用两步验证</Label>
                    <p className="text-sm text-gray-500">要求管理员账户必须使用两步验证</p>
                  </div>
                  <Switch
                    checked={twoFactorAuth.requiredForAdmins}
                    onCheckedChange={(checked) => setTwoFactorAuth({...twoFactorAuth, requiredForAdmins: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>普通用户必须使用两步验证</Label>
                    <p className="text-sm text-gray-500">要求普通用户账户必须使用两步验证</p>
                  </div>
                  <Switch
                    checked={twoFactorAuth.requiredForUsers}
                    onCheckedChange={(checked) => setTwoFactorAuth({...twoFactorAuth, requiredForUsers: checked})}
                  />
                </div>
                
                <div>
                  <Label>验证方法</Label>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="method-app"
                        checked={twoFactorAuth.methods.includes('app')}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setTwoFactorAuth({...twoFactorAuth, methods: [...twoFactorAuth.methods, 'app']});
                          } else {
                            setTwoFactorAuth({...twoFactorAuth, methods: twoFactorAuth.methods.filter(m => m !== 'app')});
                          }
                        }}
                        className="mr-2"
                      />
                      <label htmlFor="method-app">认证器应用</label>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="method-sms"
                        checked={twoFactorAuth.methods.includes('sms')}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setTwoFactorAuth({...twoFactorAuth, methods: [...twoFactorAuth.methods, 'sms']});
                          } else {
                            setTwoFactorAuth({...twoFactorAuth, methods: twoFactorAuth.methods.filter(m => m !== 'sms')});
                          }
                        }}
                        className="mr-2"
                      />
                      <label htmlFor="method-sms">短信验证</label>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="method-email"
                        checked={twoFactorAuth.methods.includes('email')}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setTwoFactorAuth({...twoFactorAuth, methods: [...twoFactorAuth.methods, 'email']});
                          } else {
                            setTwoFactorAuth({...twoFactorAuth, methods: twoFactorAuth.methods.filter(m => m !== 'email')});
                          }
                        }}
                        className="mr-2"
                      />
                      <label htmlFor="method-email">邮箱验证</label>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button onClick={saveSettings}>
                    <Save className="mr-2 h-4 w-4" />
                    保存设置
                  </Button>
                  <Button variant="outline" onClick={resetSettings}>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    重置设置
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="login" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Fingerprint className="mr-2 h-5 w-5" />
                  登录安全
                </CardTitle>
                <CardDescription>配置系统的登录安全设置</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="sessionTimeout">会话超时（分钟）</Label>
                    <Input
                      id="sessionTimeout"
                      type="number"
                      value={loginSecurity.sessionTimeout}
                      onChange={(e) => setLoginSecurity({...loginSecurity, sessionTimeout: parseInt(e.target.value)})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="concurrentSessions">并发会话数</Label>
                    <Input
                      id="concurrentSessions"
                      type="number"
                      value={loginSecurity.concurrentSessions}
                      onChange={(e) => setLoginSecurity({...loginSecurity, concurrentSessions: parseInt(e.target.value)})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="rememberMeDays">记住登录天数</Label>
                    <Input
                      id="rememberMeDays"
                      type="number"
                      value={loginSecurity.rememberMeDays}
                      onChange={(e) => setLoginSecurity({...loginSecurity, rememberMeDays: parseInt(e.target.value)})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="loginAttempts">登录尝试次数</Label>
                    <Input
                      id="loginAttempts"
                      type="number"
                      value={loginSecurity.loginAttempts}
                      onChange={(e) => setLoginSecurity({...loginSecurity, loginAttempts: parseInt(e.target.value)})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="lockoutDuration">锁定持续时间（分钟）</Label>
                    <Input
                      id="lockoutDuration"
                      type="number"
                      value={loginSecurity.lockoutDuration}
                      onChange={(e) => setLoginSecurity({...loginSecurity, lockoutDuration: parseInt(e.target.value)})}
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="ipWhitelist">IP白名单（每行一个）</Label>
                  <textarea
                    id="ipWhitelist"
                    className="w-full min-h-[100px] p-2 border rounded-md"
                    value={loginSecurity.ipWhitelist}
                    onChange={(e) => setLoginSecurity({...loginSecurity, ipWhitelist: e.target.value})}
                  />
                </div>
                
                <div>
                  <Label htmlFor="ipBlacklist">IP黑名单（每行一个）</Label>
                  <textarea
                    id="ipBlacklist"
                    className="w-full min-h-[100px] p-2 border rounded-md"
                    value={loginSecurity.ipBlacklist}
                    onChange={(e) => setLoginSecurity({...loginSecurity, ipBlacklist: e.target.value})}
                  />
                </div>
                
                <div className="flex gap-2">
                  <Button onClick={saveSettings}>
                    <Save className="mr-2 h-4 w-4" />
                    保存设置
                  </Button>
                  <Button variant="outline" onClick={resetSettings}>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    重置设置
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="api" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="mr-2 h-5 w-5" />
                  API安全
                </CardTitle>
                <CardDescription>配置系统的API安全设置</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="rateLimit">速率限制</Label>
                    <Input
                      id="rateLimit"
                      type="number"
                      value={apiSecurity.rateLimit}
                      onChange={(e) => setApiSecurity({...apiSecurity, rateLimit: parseInt(e.target.value)})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="rateLimitWindow">速率限制窗口</Label>
                    <Input
                      id="rateLimitWindow"
                      value={apiSecurity.rateLimitWindow}
                      onChange={(e) => setApiSecurity({...apiSecurity, rateLimitWindow: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="apiKeyExpiration">API密钥过期天数</Label>
                    <Input
                      id="apiKeyExpiration"
                      type="number"
                      value={apiSecurity.apiKeyExpiration}
                      onChange={(e) => setApiSecurity({...apiSecurity, apiKeyExpiration: parseInt(e.target.value)})}
                    />
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>要求HTTPS</Label>
                    <p className="text-sm text-gray-500">API访问必须使用HTTPS</p>
                  </div>
                  <Switch
                    checked={apiSecurity.requireHttps}
                    onCheckedChange={(checked) => setApiSecurity({...apiSecurity, requireHttps: checked})}
                  />
                </div>
                
                <div>
                  <Label htmlFor="corsOrigins">CORS允许的源（每行一个）</Label>
                  <textarea
                    id="corsOrigins"
                    className="w-full min-h-[100px] p-2 border rounded-md"
                    value={apiSecurity.corsOrigins}
                    onChange={(e) => setApiSecurity({...apiSecurity, corsOrigins: e.target.value})}
                  />
                </div>
                
                <div>
                  <Label>允许的HTTP方法</Label>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="method-get"
                        checked={apiSecurity.allowedMethods.includes('GET')}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setApiSecurity({...apiSecurity, allowedMethods: [...apiSecurity.allowedMethods, 'GET']});
                          } else {
                            setApiSecurity({...apiSecurity, allowedMethods: apiSecurity.allowedMethods.filter(m => m !== 'GET')});
                          }
                        }}
                        className="mr-2"
                      />
                      <label htmlFor="method-get">GET</label>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="method-post"
                        checked={apiSecurity.allowedMethods.includes('POST')}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setApiSecurity({...apiSecurity, allowedMethods: [...apiSecurity.allowedMethods, 'POST']});
                          } else {
                            setApiSecurity({...apiSecurity, allowedMethods: apiSecurity.allowedMethods.filter(m => m !== 'POST')});
                          }
                        }}
                        className="mr-2"
                      />
                      <label htmlFor="method-post">POST</label>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="method-put"
                        checked={apiSecurity.allowedMethods.includes('PUT')}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setApiSecurity({...apiSecurity, allowedMethods: [...apiSecurity.allowedMethods, 'PUT']});
                          } else {
                            setApiSecurity({...apiSecurity, allowedMethods: apiSecurity.allowedMethods.filter(m => m !== 'PUT')});
                          }
                        }}
                        className="mr-2"
                      />
                      <label htmlFor="method-put">PUT</label>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="method-delete"
                        checked={apiSecurity.allowedMethods.includes('DELETE')}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setApiSecurity({...apiSecurity, allowedMethods: [...apiSecurity.allowedMethods, 'DELETE']});
                          } else {
                            setApiSecurity({...apiSecurity, allowedMethods: apiSecurity.allowedMethods.filter(m => m !== 'DELETE')});
                          }
                        }}
                        className="mr-2"
                      />
                      <label htmlFor="method-delete">DELETE</label>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button onClick={saveSettings}>
                    <Save className="mr-2 h-4 w-4" />
                    保存设置
                  </Button>
                  <Button variant="outline" onClick={resetSettings}>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    重置设置
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        {/* 安全日志 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="mr-2 h-5 w-5" />
              安全日志
            </CardTitle>
            <CardDescription>最近的安全事件日志</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {securityLogs.map(log => (
                <div key={log.id} className="flex items-start p-3 border rounded-lg">
                  <div className="mr-3 mt-1">
                    {getStatusIcon(log.status)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">{log.type === 'login' ? '登录' : log.type === 'password_change' ? '密码更改' : 'API访问'}</div>
                      <Badge className={getStatusStyle(log.status)}>
                        {log.status === 'success' ? '成功' : '失败'}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      用户: {log.user} · IP: {log.ip} · 时间: {log.time}
                    </div>
                    <div className="text-sm mt-1">
                      {log.details}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </PageTemplate>
  );
}

```
### app/notifications/page.tsx
```json
// app/notifications/page.tsx
'use client';

import React, { useState } from 'react';
import { PageTemplate } from '@/components/layout/page-template';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Bell, 
  Mail, 
  Smartphone, 
  Settings,
  Save,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Info
} from 'lucide-react';

export default function NotificationsPage() {
  // 邮件通知设置
  const [emailNotifications, setEmailNotifications] = useState({
    systemUpdates: true,
    securityAlerts: true,
    accountActivity: true,
    marketingEmails: false,
    productUpdates: true,
    communityUpdates: false
  });

  // 推送通知设置
  const [pushNotifications, setPushNotifications] = useState({
    systemUpdates: true,
    securityAlerts: true,
    accountActivity: true,
    mentions: true,
    comments: true,
    likes: false
  });

  // 短信通知设置
  const [smsNotifications, setSmsNotifications] = useState({
    securityAlerts: true,
    accountActivity: false,
    criticalSystemAlerts: true
  });

  // 通知频率设置
  const [notificationFrequency, setNotificationFrequency] = useState({
    digestEmail: 'daily',
    pushFrequency: 'immediate',
    quietHours: {
      enabled: true,
      start: '22:00',
      end: '08:00'
    }
  });

  // 保存设置
  const saveSettings = () => {
    // 这里应该调用API保存设置
    alert('通知设置已保存');
  };

  // 重置设置
  const resetSettings = () => {
    // 这里应该重置为默认值
    alert('通知设置已重置');
  };

  return (
    <PageTemplate
      title="通知设置"
      description="配置系统通知和提醒方式"
      breadcrumbs={[
        { title: '首页', path: '/dashboard' },
        { title: '系统设置', path: '/settings' },
        { title: '通知设置', path: '/settings/notifications' }
      ]}
    >
      <div className="space-y-6">
        <Tabs defaultValue="email" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="email">邮件通知</TabsTrigger>
            <TabsTrigger value="push">推送通知</TabsTrigger>
            <TabsTrigger value="sms">短信通知</TabsTrigger>
          </TabsList>
          
          <TabsContent value="email" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Mail className="mr-2 h-5 w-5" />
                  邮件通知设置
                </CardTitle>
                <CardDescription>配置您希望接收的邮件通知类型</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>系统更新</Label>
                    <p className="text-sm text-gray-500">接收系统更新和维护通知</p>
                  </div>
                  <Switch
                    checked={emailNotifications.systemUpdates}
                    onCheckedChange={(checked) => setEmailNotifications({...emailNotifications, systemUpdates: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>安全警报</Label>
                    <p className="text-sm text-gray-500">接收账户安全相关警报</p>
                  </div>
                  <Switch
                    checked={emailNotifications.securityAlerts}
                    onCheckedChange={(checked) => setEmailNotifications({...emailNotifications, securityAlerts: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>账户活动</Label>
                    <p className="text-sm text-gray-500">接收账户登录和活动通知</p>
                  </div>
                  <Switch
                    checked={emailNotifications.accountActivity}
                    onCheckedChange={(checked) => setEmailNotifications({...emailNotifications, accountActivity: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>营销邮件</Label>
                    <p className="text-sm text-gray-500">接收产品推广和营销邮件</p>
                  </div>
                  <Switch
                    checked={emailNotifications.marketingEmails}
                    onCheckedChange={(checked) => setEmailNotifications({...emailNotifications, marketingEmails: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>产品更新</Label>
                    <p className="text-sm text-gray-500">接收新功能和产品更新通知</p>
                  </div>
                  <Switch
                    checked={emailNotifications.productUpdates}
                    onCheckedChange={(checked) => setEmailNotifications({...emailNotifications, productUpdates: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>社区更新</Label>
                    <p className="text-sm text-gray-500">接收社区活动和讨论通知</p>
                  </div>
                  <Switch
                    checked={emailNotifications.communityUpdates}
                    onCheckedChange={(checked) => setEmailNotifications({...emailNotifications, communityUpdates: checked})}
                  />
                </div>
                
                <div className="flex gap-2">
                  <Button onClick={saveSettings}>
                    <Save className="mr-2 h-4 w-4" />
                    保存设置
                  </Button>
                  <Button variant="outline" onClick={resetSettings}>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    重置设置
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="push" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Smartphone className="mr-2 h-5 w-5" />
                  推送通知设置
                </CardTitle>
                <CardDescription>配置您希望接收的推送通知类型</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>系统更新</Label>
                    <p className="text-sm text-gray-500">接收系统更新和维护通知</p>
                  </div>
                  <Switch
                    checked={pushNotifications.systemUpdates}
                    onCheckedChange={(checked) => setPushNotifications({...pushNotifications, systemUpdates: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>安全警报</Label>
                    <p className="text-sm text-gray-500">接收账户安全相关警报</p>
                  </div>
                  <Switch
                    checked={pushNotifications.securityAlerts}
                    onCheckedChange={(checked) => setPushNotifications({...pushNotifications, securityAlerts: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>账户活动</Label>
                    <p className="text-sm text-gray-500">接收账户登录和活动通知</p>
                  </div>
                  <Switch
                    checked={pushNotifications.accountActivity}
                    onCheckedChange={(checked) => setPushNotifications({...pushNotifications, accountActivity: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>提及通知</Label>
                    <p className="text-sm text-gray-500">当有人提及您时接收通知</p>
                  </div>
                  <Switch
                    checked={pushNotifications.mentions}
                    onCheckedChange={(checked) => setPushNotifications({...pushNotifications, mentions: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>评论通知</Label>
                    <p className="text-sm text-gray-500">当有人评论您的内容时接收通知</p>
                  </div>
                  <Switch
                    checked={pushNotifications.comments}
                    onCheckedChange={(checked) => setPushNotifications({...pushNotifications, comments: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>点赞通知</Label>
                    <p className="text-sm text-gray-500">当有人点赞您的内容时接收通知</p>
                  </div>
                  <Switch
                    checked={pushNotifications.likes}
                    onCheckedChange={(checked) => setPushNotifications({...pushNotifications, likes: checked})}
                  />
                </div>
                
                <div className="flex gap-2">
                  <Button onClick={saveSettings}>
                    <Save className="mr-2 h-4 w-4" />
                    保存设置
                  </Button>
                  <Button variant="outline" onClick={resetSettings}>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    重置设置
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="sms" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Smartphone className="mr-2 h-5 w-5" />
                  短信通知设置
                </CardTitle>
                <CardDescription>配置您希望接收的短信通知类型</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>安全警报</Label>
                    <p className="text-sm text-gray-500">接收账户安全相关警报</p>
                  </div>
                  <Switch
                    checked={smsNotifications.securityAlerts}
                    onCheckedChange={(checked) => setSmsNotifications({...smsNotifications, securityAlerts: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>账户活动</Label>
                    <p className="text-sm text-gray-500">接收账户登录和活动通知</p>
                  </div>
                  <Switch
                    checked={smsNotifications.accountActivity}
                    onCheckedChange={(checked) => setSmsNotifications({...smsNotifications, accountActivity: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>关键系统警报</Label>
                    <p className="text-sm text-gray-500">接收关键系统故障和警报</p>
                  </div>
                  <Switch
                    checked={smsNotifications.criticalSystemAlerts}
                    onCheckedChange={(checked) => setSmsNotifications({...smsNotifications, criticalSystemAlerts: checked})}
                  />
                </div>
                
                <div className="flex gap-2">
                  <Button onClick={saveSettings}>
                    <Save className="mr-2 h-4 w-4" />
                    保存设置
                  </Button>
                  <Button variant="outline" onClick={resetSettings}>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    重置设置
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        {/* 通知频率设置 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Settings className="mr-2 h-5 w-5" />
              通知频率设置
            </CardTitle>
            <CardDescription>配置通知的发送频率和时间</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="digestEmail">邮件摘要频率</Label>
              <select
                id="digestEmail"
                className="w-full p-2 border rounded-md"
                value={notificationFrequency.digestEmail}
                onChange={(e) => setNotificationFrequency({...notificationFrequency, digestEmail: e.target.value})}
              >
                <option value="realtime">实时</option>
                <option value="hourly">每小时</option>
                <option value="daily">每天</option>
                <option value="weekly">每周</option>
                <option value="never">从不</option>
              </select>
            </div>
            
            <div>
              <Label htmlFor="pushFrequency">推送通知频率</Label>
              <select
                id="pushFrequency"
                className="w-full p-2 border rounded-md"
                value={notificationFrequency.pushFrequency}
                onChange={(e) => setNotificationFrequency({...notificationFrequency, pushFrequency: e.target.value})}
              >
                <option value="immediate">立即</option>
                <option value="hourly">每小时</option>
                <option value="daily">每天</option>
              </select>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label>免打扰时间</Label>
                <p className="text-sm text-gray-500">在指定时间内不接收通知</p>
              </div>
              <Switch
                checked={notificationFrequency.quietHours.enabled}
                onCheckedChange={(checked) => setNotificationFrequency({
                  ...notificationFrequency, 
                  quietHours: {...notificationFrequency.quietHours, enabled: checked}
                })}
              />
            </div>
            
            {notificationFrequency.quietHours.enabled && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="quietStart">开始时间</Label>
                  <Input
                    id="quietStart"
                    type="time"
                    value={notificationFrequency.quietHours.start}
                    onChange={(e) => setNotificationFrequency({
                      ...notificationFrequency, 
                      quietHours: {...notificationFrequency.quietHours, start: e.target.value}
                    })}
                  />
                </div>
                <div>
                  <Label htmlFor="quietEnd">结束时间</Label>
                  <Input
                    id="quietEnd"
                    type="time"
                    value={notificationFrequency.quietHours.end}
                    onChange={(e) => setNotificationFrequency({
                      ...notificationFrequency, 
                      quietHours: {...notificationFrequency.quietHours, end: e.target.value}
                    })}
                  />
                </div>
              </div>
            )}
            
            <div className="flex gap-2">
              <Button onClick={saveSettings}>
                <Save className="mr-2 h-4 w-4" />
                保存设置
              </Button>
              <Button variant="outline" onClick={resetSettings}>
                <RefreshCw className="mr-2 h-4 w-4" />
                重置设置
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageTemplate>
  );
}
```
### app/appearance/page.tsx
```json
// app/appearance/page.tsx
'use client';

import React, { useState } from 'react';
import { PageTemplate } from '@/components/layout/page-template';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Palette, 
  Layout, 
  Type, 
  Save,
  RefreshCw,
  Monitor,
  Smartphone,
  Sun,
  Moon
} from 'lucide-react';

export default function AppearancePage() {
  // 主题设置
  const [themeSettings, setThemeSettings] = useState({
    mode: 'light',
    primaryColor: '#3b82f6',
    secondaryColor: '#64748b',
    accentColor: '#8b5cf6',
    borderRadius: '0.5rem'
  });

  // 布局设置
  const [layoutSettings, setLayoutSettings] = useState({
    sidebarPosition: 'left',
    sidebarWidth: '240px',
    topbarHeight: '60px',
    contentPadding: '1.5rem',
    compactMode: false
  });

  // 字体设置
  const [fontSettings, setFontSettings] = useState({
    fontFamily: 'Inter',
    fontSize: '14px',
    lineHeight: '1.5',
    fontWeight: '400'
  });

  // 响应式设置
  const [responsiveSettings, setResponsiveSettings] = useState({
    mobileLayout: 'stacked',
    tabletBreakpoint: '768px',
    mobileBreakpoint: '480px'
  });

  // 保存设置
  const saveSettings = () => {
    // 这里应该调用API保存设置
    alert('外观设置已保存');
  };

  // 重置设置
  const resetSettings = () => {
    // 这里应该重置为默认值
    alert('外观设置已重置');
  };

  return (
    <PageTemplate
      title="外观设置"
      description="自定义系统外观和布局"
      breadcrumbs={[
        { title: '首页', path: '/dashboard' },
        { title: '系统设置', path: '/settings' },
        { title: '外观设置', path: '/settings/appearance' }
      ]}
    >
      <div className="space-y-6">
        <Tabs defaultValue="theme" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="theme">主题</TabsTrigger>
            <TabsTrigger value="layout">布局</TabsTrigger>
            <TabsTrigger value="typography">字体</TabsTrigger>
            <TabsTrigger value="responsive">响应式</TabsTrigger>
          </TabsList>
          
          <TabsContent value="theme" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Palette className="mr-2 h-5 w-5" />
                  主题设置
                </CardTitle>
                <CardDescription>自定义系统主题和颜色</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>主题模式</Label>
                  <div className="flex gap-4 mt-2">
                    <button
                      className={`p-4 border rounded-lg flex flex-col items-center ${
                        themeSettings.mode === 'light' ? 'border-blue-500 bg-blue-50' : ''
                      }`}
                      onClick={() => setThemeSettings({...themeSettings, mode: 'light'})}
                    >
                      <Sun className="h-6 w-6 mb-2" />
                      <span>浅色模式</span>
                    </button>
                    <button
                      className={`p-4 border rounded-lg flex flex-col items-center ${
                        themeSettings.mode === 'dark' ? 'border-blue-500 bg-blue-50' : ''
                      }`}
                      onClick={() => setThemeSettings({...themeSettings, mode: 'dark'})}
                    >
                      <Moon className="h-6 w-6 mb-2" />
                      <span>深色模式</span>
                    </button>
                    <button
                      className={`p-4 border rounded-lg flex flex-col items-center ${
                        themeSettings.mode === 'system' ? 'border-blue-500 bg-blue-50' : ''
                      }`}
                      onClick={() => setThemeSettings({...themeSettings, mode: 'system'})}
                    >
                      <Monitor className="h-6 w-6 mb-2" />
                      <span>跟随系统</span>
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="primaryColor">主色调</Label>
                    <div className="flex items-center gap-2 mt-2">
                      <input
                        type="color"
                        id="primaryColor"
                        value={themeSettings.primaryColor}
                        onChange={(e) => setThemeSettings({...themeSettings, primaryColor: e.target.value})}
                        className="w-10 h-10 p-1 border rounded"
                      />
                      <Input
                        value={themeSettings.primaryColor}
                        onChange={(e) => setThemeSettings({...themeSettings, primaryColor: e.target.value})}
                        className="flex-1"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="secondaryColor">次要色调</Label>
                    <div className="flex items-center gap-2 mt-2">
                      <input
                        type="color"
                        id="secondaryColor"
                        value={themeSettings.secondaryColor}
                        onChange={(e) => setThemeSettings({...themeSettings, secondaryColor: e.target.value})}
                        className="w-10 h-10 p-1 border rounded"
                      />
                      <Input
                        value={themeSettings.secondaryColor}
                        onChange={(e) => setThemeSettings({...themeSettings, secondaryColor: e.target.value})}
                        className="flex-1"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="accentColor">强调色</Label>
                    <div className="flex items-center gap-2 mt-2">
                      <input
                        type="color"
                        id="accentColor"
                        value={themeSettings.accentColor}
                        onChange={(e) => setThemeSettings({...themeSettings, accentColor: e.target.value})}
                        className="w-10 h-10 p-1 border rounded"
                      />
                      <Input
                        value={themeSettings.accentColor}
                        onChange={(e) => setThemeSettings({...themeSettings, accentColor: e.target.value})}
                        className="flex-1"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="borderRadius">圆角大小</Label>
                    <select
                      id="borderRadius"
                      className="w-full p-2 border rounded-md mt-2"
                      value={themeSettings.borderRadius}
                      onChange={(e) => setThemeSettings({...themeSettings, borderRadius: e.target.value})}
                    >
                      <option value="0">无圆角</option>
                      <option value="0.25rem">小圆角</option>
                      <option value="0.5rem">中等圆角</option>
                      <option value="0.75rem">大圆角</option>
                      <option value="1rem">超大圆角</option>
                    </select>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button onClick={saveSettings}>
                    <Save className="mr-2 h-4 w-4" />
                    保存设置
                  </Button>
                  <Button variant="outline" onClick={resetSettings}>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    重置设置
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="layout" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Layout className="mr-2 h-5 w-5" />
                  布局设置
                </CardTitle>
                <CardDescription>自定义系统布局和组件排列</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>侧边栏位置</Label>
                  <div className="flex gap-4 mt-2">
                    <button
                      className={`p-4 border rounded-lg flex flex-col items-center ${
                        layoutSettings.sidebarPosition === 'left' ? 'border-blue-500 bg-blue-50' : ''
                      }`}
                      onClick={() => setLayoutSettings({...layoutSettings, sidebarPosition: 'left'})}
                    >
                      <div className="w-16 h-10 bg-gray-200 rounded mb-2"></div>
                      <span>左侧</span>
                    </button>
                    <button
                      className={`p-4 border rounded-lg flex flex-col items-center ${
                        layoutSettings.sidebarPosition === 'right' ? 'border-blue-500 bg-blue-50' : ''
                      }`}
                      onClick={() => setLayoutSettings({...layoutSettings, sidebarPosition: 'right'})}
                    >
                      <div className="w-16 h-10 bg-gray-200 rounded mb-2"></div>
                      <span>右侧</span>
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="sidebarWidth">侧边栏宽度</Label>
                    <select
                      id="sidebarWidth"
                      className="w-full p-2 border rounded-md mt-2"
                      value={layoutSettings.sidebarWidth}
                      onChange={(e) => setLayoutSettings({...layoutSettings, sidebarWidth: e.target.value})}
                    >
                      <option value="200px">窄 (200px)</option>
                      <option value="240px">标准 (240px)</option>
                      <option value="280px">宽 (280px)</option>
                      <option value="320px">超宽 (320px)</option>
                    </select>
                  </div>
                  
                  <div>
                    <Label htmlFor="topbarHeight">顶部栏高度</Label>
                    <select
                      id="topbarHeight"
                      className="w-full p-2 border rounded-md mt-2"
                      value={layoutSettings.topbarHeight}
                      onChange={(e) => setLayoutSettings({...layoutSettings, topbarHeight: e.target.value})}
                    >
                      <option value="50px">矮 (50px)</option>
                      <option value="60px">标准 (60px)</option>
                      <option value="70px">高 (70px)</option>
                      <option value="80px">超高 (80px)</option>
                    </select>
                  </div>
                  
                  <div>
                    <Label htmlFor="contentPadding">内容内边距</Label>
                    <select
                      id="contentPadding"
                      className="w-full p-2 border rounded-md mt-2"
                      value={layoutSettings.contentPadding}
                      onChange={(e) => setLayoutSettings({...layoutSettings, contentPadding: e.target.value})}
                    >
                      <option value="1rem">小 (1rem)</option>
                      <option value="1.5rem">标准 (1.5rem)</option>
                      <option value="2rem">大 (2rem)</option>
                      <option value="2.5rem">超大 (2.5rem)</option>
                    </select>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>紧凑模式</Label>
                    <p className="text-sm text-gray-500">使用更紧凑的布局和更小的间距</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={layoutSettings.compactMode}
                    onChange={(e) => setLayoutSettings({...layoutSettings, compactMode: e.target.checked})}
                    className="h-4 w-4"
                  />
                </div>
                
                <div className="flex gap-2">
                  <Button onClick={saveSettings}>
                    <Save className="mr-2 h-4 w-4" />
                    保存设置
                  </Button>
                  <Button variant="outline" onClick={resetSettings}>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    重置设置
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="typography" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Type className="mr-2 h-5 w-5" />
                  字体设置
                </CardTitle>
                <CardDescription>自定义系统字体和排版</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fontFamily">字体族</Label>
                    <select
                      id="fontFamily"
                      className="w-full p-2 border rounded-md mt-2"
                      value={fontSettings.fontFamily}
                      onChange={(e) => setFontSettings({...fontSettings, fontFamily: e.target.value})}
                    >
                      <option value="Inter">Inter</option>
                      <option value="Roboto">Roboto</option>
                      <option value="Open Sans">Open Sans</option>
                      <option value="Lato">Lato</option>
                      <option value="Montserrat">Montserrat</option>
                      <option value="Poppins">Poppins</option>
                      <option value="system">系统默认</option>
                    </select>
                  </div>
                  
                  <div>
                    <Label htmlFor="fontSize">基础字体大小</Label>
                    <select
                      id="fontSize"
                      className="w-full p-2 border rounded-md mt-2"
                      value={fontSettings.fontSize}
                      onChange={(e) => setFontSettings({...fontSettings, fontSize: e.target.value})}
                    >
                      <option value="12px">小 (12px)</option>
                      <option value="14px">标准 (14px)</option>
                      <option value="16px">大 (16px)</option>
                      <option value="18px">超大 (18px)</option>
                    </select>
                  </div>
                  
                  <div>
                    <Label htmlFor="lineHeight">行高</Label>
                    <select
                      id="lineHeight"
                      className="w-full p-2 border rounded-md mt-2"
                      value={fontSettings.lineHeight}
                      onChange={(e) => setFontSettings({...fontSettings, lineHeight: e.target.value})}
                    >
                      <option value="1.2">紧凑 (1.2)</option>
                      <option value="1.4">标准 (1.4)</option>
                      <option value="1.5">舒适 (1.5)</option>
                      <option value="1.6">宽松 (1.6)</option>
                      <option value="1.8">超宽松 (1.8)</option>
                    </select>
                  </div>
                  
                  <div>
                    <Label htmlFor="fontWeight">字体粗细</Label>
                    <select
                      id="fontWeight"
                      className="w-full p-2 border rounded-md mt-2"
                      value={fontSettings.fontWeight}
                      onChange={(e) => setFontSettings({...fontSettings, fontWeight: e.target.value})}
                    >
                      <option value="300">细体 (300)</option>
                      <option value="400">常规 (400)</option>
                      <option value="500">中等 (500)</option>
                      <option value="600">半粗 (600)</option>
                      <option value="700">粗体 (700)</option>
                    </select>
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <div className="mb-2 font-medium">字体预览</div>
                  <div style={{ 
                    fontFamily: fontSettings.fontFamily, 
                    fontSize: fontSettings.fontSize,
                    lineHeight: fontSettings.lineHeight,
                    fontWeight: fontSettings.fontWeight
                  }}>
                    <p>这是正文文本的预览效果。YanYu Cloud³ 是一个企业级云平台解决方案，提供全面的服务和功能。</p>
                    <h3 className="text-lg font-semibold mt-2">这是标题文本的预览效果</h3>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button onClick={saveSettings}>
                    <Save className="mr-2 h-4 w-4" />
                    保存设置
                  </Button>
                  <Button variant="outline" onClick={resetSettings}>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    重置设置
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="responsive" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Smartphone className="mr-2 h-5 w-5" />
                  响应式设置
                </CardTitle>
                <CardDescription>配置不同设备上的布局和行为</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>移动设备布局</Label>
                  <div className="flex gap-4 mt-2">
                    <button
                      className={`p-4 border rounded-lg flex flex-col items-center ${
                        responsiveSettings.mobileLayout === 'stacked' ? 'border-blue-500 bg-blue-50' : ''
                      }`}
                      onClick={() => setResponsiveSettings({...responsiveSettings, mobileLayout: 'stacked'})}
                    >
                      <div className="w-10 h-16 bg-gray-200 rounded mb-2"></div>
                      <span>堆叠布局</span>
                    </button>
                    <button
                      className={`p-4 border rounded-lg flex flex-col items-center ${
                        responsiveSettings.mobileLayout === 'sidebar' ? 'border-blue-500 bg-blue-50' : ''
                      }`}
                      onClick={() => setResponsiveSettings({...responsiveSettings, mobileLayout: 'sidebar'})}
                    >
                      <div className="flex gap-1 mb-2">
                        <div className="w-3 h-16 bg-gray-200 rounded"></div>
                        <div className="w-10 h-16 bg-gray-200 rounded"></div>
                      </div>
                      <span>侧边栏布局</span>
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="tabletBreakpoint">平板设备断点</Label>
                    <select
                      id="tabletBreakpoint"
                      className="w-full p-2 border rounded-md mt-2"
                      value={responsiveSettings.tabletBreakpoint}
                      onChange={(e) => setResponsiveSettings({...responsiveSettings, tabletBreakpoint: e.target.value})}
                    >
                      <option value="640px">小 (640px)</option>
                      <option value="768px">标准 (768px)</option>
                      <option value="896px">大 (896px)</option>
                      <option value="1024px">超大 (1024px)</option>
                    </select>
                  </div>
                  
                  <div>
                    <Label htmlFor="mobileBreakpoint">移动设备断点</Label>
                    <select
                      id="mobileBreakpoint"
                      className="w-full p-2 border rounded-md mt-2"
                      value={responsiveSettings.mobileBreakpoint}
                      onChange={(e) => setResponsiveSettings({...responsiveSettings, mobileBreakpoint: e.target.value})}
                    >
                      <option value="360px">小 (360px)</option>
                      <option value="480px">标准 (480px)</option>
                      <option value="600px">大 (600px)</option>
                      <option value="768px">超大 (768px)</option>
                </select>
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <div className="mb-2 font-medium">响应式预览</div>
                  <div className="flex gap-4">
                    <div className="flex-1 border rounded-lg p-2">
                      <div className="text-center text-sm mb-2">桌面</div>
                      <div className="h-32 bg-gray-100 rounded flex items-center justify-center">
                        <Monitor className="h-8 w-8 text-gray-400" />
                      </div>
                    </div>
                    <div className="flex-1 border rounded-lg p-2">
                      <div className="text-center text-sm mb-2">平板</div>
                      <div className="h-32 bg-gray-100 rounded flex items-center justify-center">
                        <div className="w-12 h-16 bg-gray-300 rounded"></div>
                      </div>
                    </div>
                    <div className="flex-1 border rounded-lg p-2">
                      <div className="text-center text-sm mb-2">手机</div>
                      <div className="h-32 bg-gray-100 rounded flex items-center justify-center">
                        <Smartphone className="h-8 w-8 text-gray-400" />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button onClick={saveSettings}>
                    <Save className="mr-2 h-4 w-4" />
                    保存设置
                  </Button>
                  <Button variant="outline" onClick={resetSettings}>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    重置设置
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageTemplate>
  );
}
```
### app/project-execution/
```json
// app/project-execution/page.tsx
'use client';

import React, { useState } from 'react';
import { PageTemplate } from '@/components/layout/page-template';
import { StatCard, StatCardGroup } from '@/components/business/stat-card';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calendar, 
  Users, 
  CheckCircle, 
  Clock,
  AlertTriangle,
  Plus,
  Filter,
  Search,
  MoreHorizontal,
  BarChart3,
  Target,
  Zap
} from 'lucide-react';

export default function ProjectExecutionPage() {
  // 项目统计数据
  const [projectStats, setProjectStats] = useState([
    {
      title: '总项目数',
      value: '24',
      change: { value: 3, type: 'increase' as const, text: '较上月' },
      icon: <Target className="h-5 w-5" />,
      description: '系统中的项目总数'
    },
    {
      title: '进行中项目',
      value: '12',
      change: { value: 2, type: 'increase' as const, text: '较上月' },
      icon: <Zap className="h-5 w-5" />,
      description: '正在执行的项目数'
    },
    {
      title: '已完成项目',
      value: '8',
      change: { value: 1, type: 'increase' as const, text: '较上月' },
      icon: <CheckCircle className="h-5 w-5" />,
      description: '已完成的项目数'
    },
    {
      title: '项目延期率',
      value: '12.5%',
      change: { value: 2, type: 'decrease' as const, text: '较上月' },
      icon: <AlertTriangle className="h-5 w-5" />,
      description: '延期项目比例'
    }
  ]);

  // 项目列表数据
  const [projects, setProjects] = useState([
    { 
      id: 1, 
      name: 'YanYu Cloud³ 平台升级', 
      status: 'active',
      progress: 75,
      startDate: '2023-03-01',
      endDate: '2023-07-15',
      manager: '张三',
      team: 8,
      budget: 850000,
      spent: 620000
    },
    { 
      id: 2, 
      name: '移动应用开发', 
      status: 'active',
      progress: 45,
      startDate: '2023-04-10',
      endDate: '2023-08-30',
      manager: '李四',
      team: 5,
      budget: 450000,
      spent: 180000
    },
    { 
      id: 3, 
      name: '数据分析系统', 
      status: 'completed',
      progress: 100,
      startDate: '2023-01-15',
      endDate: '2023-05-20',
      manager: '王五',
      team: 6,
      budget: 620000,
      spent: 590000
    },
    { 
      id: 4, 
      name: '安全系统升级', 
      status: 'delayed',
      progress: 30,
      startDate: '2023-02-20',
      endDate: '2023-06-10',
      manager: '赵六',
      team: 4,
      budget: 380000,
      spent: 150000
    }
  ]);

  // 项目任务数据
  const [tasks, setTasks] = useState([
    { 
      id: 1, 
      projectId: 1,
      title: '前端界面重构', 
      status: 'in-progress',
      priority: 'high',
      assignee: '张三',
      dueDate: '2023-06-20',
      progress: 65
    },
    { 
      id: 2, 
      projectId: 1,
      title: 'API接口优化', 
      status: 'todo',
      priority: 'medium',
      assignee: '李四',
      dueDate: '2023-06-25',
      progress: 0
    },
    { 
      id: 3, 
      projectId: 2,
      title: '用户认证模块', 
      status: 'in-progress',
      priority: 'high',
      assignee: '王五',
      dueDate: '2023-06-15',
      progress: 80
    },
    { 
      id: 4, 
      projectId: 3,
      title: '数据迁移', 
      status: 'completed',
      priority: 'high',
      assignee: '赵六',
      dueDate: '2023-05-10',
      progress: 100
    }
  ]);

  // 项目里程碑数据
  const [milestones, setMilestones] = useState([
    { 
      id: 1, 
      projectId: 1,
      title: '需求分析完成', 
      status: 'completed',
      date: '2023-03-20',
      description: '完成所有需求分析和文档'
    },
    { 
      id: 2, 
      projectId: 1,
      title: '原型设计完成', 
      status: 'completed',
      date: '2023-04-15',
      description: '完成系统原型设计和评审'
    },
    { 
      id: 3, 
      projectId: 1,
      title: '开发阶段完成', 
      status: 'in-progress',
      date: '2023-06-30',
      description: '完成所有功能模块开发'
    },
    { 
      id: 4, 
      projectId: 1,
      title: '系统上线', 
      status: 'upcoming',
      date: '2023-07-15',
      description: '系统正式上线运行'
    }
  ]);

  // 获取状态样式
  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'delayed':
        return 'bg-red-100 text-red-800';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'todo':
        return 'bg-gray-100 text-gray-800';
      case 'upcoming':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // 获取优先级样式
  const getPriorityStyle = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <PageTemplate
      title="项目执行"
      description="项目执行和管理界面，包含项目进度跟踪和任务分配"
      breadcrumbs={[
        { title: '首页', path: '/dashboard' },
        { title: '项目管理', path: '/project' },
        { title: '项目执行', path: '/project-execution' }
      ]}
      actions={
        <div className="flex gap-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            新建项目
          </Button>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            筛选
          </Button>
        </div>
      }
    >
      <div className="space-y-8">
        {/* 项目统计卡片 */}
        <StatCardGroup>
          {projectStats.map((stat, index) => (
            <StatCard
              key={index}
              title={stat.title}
              value={stat.value}
              change={stat.change}
              icon={stat.icon}
              description={stat.description}
            />
          ))}
        </StatCardGroup>

        <Tabs defaultValue="projects" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="projects">项目列表</TabsTrigger>
            <TabsTrigger value="tasks">任务管理</TabsTrigger>
            <TabsTrigger value="milestones">里程碑</TabsTrigger>
          </TabsList>
          
          <TabsContent value="projects" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="mr-2 h-5 w-5" />
                  项目列表
                </CardTitle>
                <CardDescription>系统中的所有项目</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {projects.map(project => (
                    <div key={project.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium">{project.name}</div>
                        <Badge className={getStatusStyle(project.status)}>
                          {project.status === 'active' ? '进行中' :
                           project.status === 'completed' ? '已完成' :
                           project.status === 'delayed' ? '延期' : project.status}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <div className="text-sm text-gray-500">项目经理</div>
                          <div>{project.manager}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">团队规模</div>
                          <div>{project.team}人</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">开始日期</div>
                          <div>{project.startDate}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">结束日期</div>
                          <div>{project.endDate}</div>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-1">
                          <span>项目进度</span>
                          <span>{project.progress}%</span>
                        </div>
                        <Progress value={project.progress} className="h-2" />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="text-gray-500">预算</div>
                          <div>¥{project.budget.toLocaleString()}</div>
                        </div>
                        <div>
                          <div className="text-gray-500">已花费</div>
                          <div>¥{project.spent.toLocaleString()}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="tasks" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5" />
                  任务管理
                </CardTitle>
                <CardDescription>项目任务列表和分配</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tasks.map(task => (
                    <div key={task.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium">{task.title}</div>
                        <div className="flex gap-2">
                          <Badge className={getStatusStyle(task.status)}>
                            {task.status === 'in-progress' ? '进行中' :
                             task.status === 'todo' ? '待办' :
                             task.status === 'completed' ? '已完成' : task.status}
                          </Badge>
                          <Badge className={getPriorityStyle(task.priority)}>
                            {task.priority === 'high' ? '高优先级' :
                             task.priority === 'medium' ? '中优先级' : '低优先级'}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <div className="text-sm text-gray-500">负责人</div>
                          <div>{task.assignee}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">截止日期</div>
                          <div>{task.dueDate}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">项目ID</div>
                          <div>#{task.projectId}</div>
                        </div>
                      </div>
                      
                      {task.status !== 'todo' && (
                        <div className="mb-2">
                          <div className="flex justify-between text-sm mb-1">
                            <span>任务进度</span>
                            <span>{task.progress}%</span>
                          </div>
                          <Progress value={task.progress} className="h-2" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="milestones" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5" />
                  项目里程碑
                </CardTitle>
                <CardDescription>项目关键里程碑和节点</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {milestones.map(milestone => (
                    <div key={milestone.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium">{milestone.title}</div>
                        <Badge className={getStatusStyle(milestone.status)}>
                          {milestone.status === 'completed' ? '已完成' :
                           milestone.status === 'in-progress' ? '进行中' :
                           milestone.status === 'upcoming' ? '即将开始' : milestone.status}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                        <div>
                          <div className="text-sm text-gray-500">日期</div>
                          <div>{milestone.date}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">项目ID</div>
                          <div>#{milestone.projectId}</div>
                        </div>
                      </div>
                      
                      <div className="text-sm text-gray-600">
                        {milestone.description}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        {/* 项目进度图表 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="mr-2 h-5 w-5" />
              项目进度分析
            </CardTitle>
            <CardDescription>各项目进度和状态分析</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {projects.map(project => (
                <div key={project.id} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">{project.name}</span>
                    <span>{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>预算: ¥{project.budget.toLocaleString()}</span>
                    <span>已花费: ¥{project.spent.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </PageTemplate>
  );
}
```
### app/agile-workflow/page.tsx
```json
// app/agile-workflow/page.tsx
'use client';

import React, { useState } from 'react';
import { PageTemplate } from '@/components/layout/page-template';
import { StatCard, StatCardGroup } from '@/components/business/stat-card';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  GitBranch, 
  Users, 
  CheckCircle, 
  Clock,
  AlertTriangle,
  Plus,
  Filter,
  Search,
  MoreHorizontal,
  BarChart3,
  Target,
  Zap,
  Calendar,
  MessageSquare
} from 'lucide-react';

export default function AgileWorkflowPage() {
  // 敏捷统计数据
  const [agileStats, setAgileStats] = useState([
    {
      title: '活跃冲刺',
      value: '6',
      change: { value: 1, type: 'increase' as const, text: '较上周' },
      icon: <Zap className="h-5 w-5" />,
      description: '当前活跃的冲刺数'
    },
    {
      title: '团队速度',
      value: '42',
      change: { value: 3, type: 'increase' as const, text: '较上周' },
      icon: <Target className="h-5 w-5" />,
      description: '团队平均故事点/冲刺'
    },
    {
      title: '完成故事',
      value: '128',
      change: { value: 12, type: 'increase' as const, text: '较上周' },
      icon: <CheckCircle className="h-5 w-5" />,
      description: '本周完成的故事数'
    },
    {
      title: '冲刺延期率',
      value: '8.3%',
      change: { value: 2, type: 'decrease' as const, text: '较上周' },
      icon: <AlertTriangle className="h-5 w-5" />,
      description: '延期冲刺比例'
    }
  ]);

  // 冲刺列表数据
  const [sprints, setSprints] = useState([
    { 
      id: 1, 
      name: 'Sprint 12 - 用户管理优化', 
      status: 'active',
      startDate: '2023-05-29',
      endDate: '2023-06-12',
      goal: '优化用户管理模块的性能和体验',
      velocity: 45,
      completed: 32,
      team: '产品团队'
    },
    { 
      id: 2, 
      name: 'Sprint 11 - API性能提升', 
      status: 'completed',
      startDate: '2023-05-15',
      endDate: '2023-05-29',
      goal: '提升API响应速度和稳定性',
      velocity: 38,
      completed: 38,
      team: '技术团队'
    },
    { 
      id: 3, 
      name: 'Sprint 10 - 移动端开发', 
      status: 'completed',
      startDate: '2023-05-01',
      endDate: '2023-05-15',
      goal: '完成移动端核心功能开发',
      velocity: 42,
      completed: 40,
      team: '移动团队'
    },
    { 
      id: 4, 
      name: 'Sprint 13 - 数据分析功能', 
      status: 'planned',
      startDate: '2023-06-12',
      endDate: '2023-06-26',
      goal: '开发数据分析和可视化功能',
      velocity: 40,
      completed: 0,
      team: '数据团队'
    }
  ]);

  // 用户故事数据
  const [userStories, setUserStories] = useState([
    { 
      id: 1, 
      sprintId: 1,
      title: '用户密码重置功能优化', 
      status: 'in-progress',
      priority: 'high',
      points: 5,
      assignee: '张三',
      dueDate: '2023-06-10',
      description: '作为用户，我希望能够更方便地重置密码，以便在忘记密码时快速恢复访问。'
    },
    { 
      id: 2, 
      sprintId: 1,
      title: '用户个人资料编辑功能', 
      status: 'todo',
      priority: 'medium',
      points: 3,
      assignee: '李四',
      dueDate: '2023-06-12',
      description: '作为用户，我希望能够编辑我的个人资料，包括头像、姓名和联系方式。'
    },
    { 
      id: 3, 
      sprintId: 2,
      title: 'API响应时间优化', 
      status: 'completed',
      priority: 'high',
      points: 8,
      assignee: '王五',
      dueDate: '2023-05-25',
      description: '作为系统管理员，我希望API响应时间能够优化到200ms以内，以提升用户体验。'
    },
    { 
      id: 4, 
      sprintId: 3,
      title: '移动端登录功能', 
      status: 'completed',
      priority: 'high',
      points: 5,
      assignee: '赵六',
      dueDate: '2023-05-10',
      description: '作为移动端用户，我希望能够通过手机号和验证码快速登录系统。'
    }
  ]);

  // 看板数据
  const [kanbanData, setKanbanData] = useState({
    todo: [
      { id: 5, title: '用户权限管理功能', points: 5, assignee: '张三' },
      { id: 6, title: '数据导出功能', points: 3, assignee: '李四' }
    ],
    inProgress: [
      { id: 1, title: '用户密码重置功能优化', points: 5, assignee: '张三' },
      { id: 7, title: '系统性能监控', points: 8, assignee: '王五' }
    ],
    testing: [
      { id: 3, title: 'API响应时间优化', points: 8, assignee: '王五' }
    ],
    done: [
      { id: 4, title: '移动端登录功能', points: 5, assignee: '赵六' },
      { id: 8, title: '用户注册流程优化', points: 3, assignee: '李四' }
    ]
  });

  // 获取状态样式
  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'planned':
        return 'bg-purple-100 text-purple-800';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'todo':
        return 'bg-gray-100 text-gray-800';
      case 'testing':
        return 'bg-orange-100 text-orange-800';
      case 'done':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // 获取优先级样式
  const getPriorityStyle = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <PageTemplate
      title="敏捷工作流"
      description="敏捷开发工作流管理界面，包含冲刺规划和看板管理"
      breadcrumbs={[
        { title: '首页', path: '/dashboard' },
        { title: '项目管理', path: '/project' },
        { title: '敏捷工作流', path: '/agile-workflow' }
      ]}
      actions={
        <div className="flex gap-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            新建冲刺
          </Button>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            筛选
          </Button>
        </div>
      }
    >
      <div className="space-y-8">
        {/* 敏捷统计卡片 */}
        <StatCardGroup>
          {agileStats.map((stat, index) => (
            <StatCard
              key={index}
              title={stat.title}
              value={stat.value}
              change={stat.change}
              icon={stat.icon}
              description={stat.description}
            />
          ))}
        </StatCardGroup>

        <Tabs defaultValue="sprints" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="sprints">冲刺管理</TabsTrigger>
            <TabsTrigger value="stories">用户故事</TabsTrigger>
            <TabsTrigger value="kanban">看板</TabsTrigger>
          </TabsList>
          
          <TabsContent value="sprints" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <GitBranch className="mr-2 h-5 w-5" />
                  冲刺管理
                </CardTitle>
                <CardDescription>敏捷开发冲刺列表和规划</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sprints.map(sprint => (
                    <div key={sprint.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium">{sprint.name}</div>
                        <Badge className={getStatusStyle(sprint.status)}>
                          {sprint.status === 'active' ? '进行中' :
                           sprint.status === 'completed' ? '已完成' :
                           sprint.status === 'planned' ? '计划中' : sprint.status}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <div className="text-sm text-gray-500">开始日期</div>
                          <div>{sprint.startDate}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">结束日期</div>
                          <div>{sprint.endDate}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">团队</div>
                          <div>{sprint.team}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">速度</div>
                          <div>{sprint.velocity} 点</div>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <div className="text-sm text-gray-500 mb-1">冲刺目标</div>
                        <div>{sprint.goal}</div>
                      </div>
                      
                      <div className="mb-2">
                        <div className="flex justify-between text-sm mb-1">
                          <span>完成进度</span>
                          <span>{Math.round((sprint.completed / sprint.velocity) * 100)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="h-2 rounded-full bg-blue-500"
                            style={{ width: `${(sprint.completed / sprint.velocity) * 100}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>{sprint.completed} / {sprint.velocity} 点</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="stories" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="mr-2 h-5 w-5" />
                  用户故事
                </CardTitle>
                <CardDescription>敏捷开发用户故事列表</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userStories.map(story => (
                    <div key={story.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium">{story.title}</div>
                        <div className="flex gap-2">
                          <Badge className={getStatusStyle(story.status)}>
                            {story.status === 'in-progress' ? '进行中' :
                             story.status === 'todo' ? '待办' :
                             story.status === 'completed' ? '已完成' : story.status}
                          </Badge>
                          <Badge className={getPriorityStyle(story.priority)}>
                            {story.priority === 'high' ? '高优先级' :
                             story.priority === 'medium' ? '中优先级' : '低优先级'}
                          </Badge>
                          <Badge variant="outline">
                            {story.points} 点
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <div className="text-sm text-gray-500">负责人</div>
                          <div>{story.assignee}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">截止日期</div>
                          <div>{story.dueDate}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">冲刺ID</div>
                          <div>Sprint {story.sprintId}</div>
                        </div>
                      </div>
                      
                      <div className="text-sm text-gray-600">
                        {story.description}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="kanban" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="mr-2 h-5 w-5" />
                  看板
                </CardTitle>
                <CardDescription>敏捷开发看板管理</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <div className="bg-gray-100 p-3 rounded-t-lg">
                      <div className="font-medium">待办</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-b-lg min-h-[400px]">
                      {kanbanData.todo.map(item => (
                        <div key={item.id} className="mb-3 p-3 bg-white border rounded-lg shadow-sm">
                          <div className="font-medium mb-1">{item.title}</div>
                          <div className="flex justify-between text-sm">
                            <span>{item.points} 点</span>
                            <span>{item.assignee}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <div className="bg-yellow-100 p-3 rounded-t-lg">
                      <div className="font-medium">进行中</div>
                    </div>
                    <div className="bg-yellow-50 p-3 rounded-b-lg min-h-[400px]">
                      {kanbanData.inProgress.map(item => (
                        <div key={item.id} className="mb-3 p-3 bg-white border rounded-lg shadow-sm">
                          <div className="font-medium mb-1">{item.title}</div>
                          <div className="flex justify-between text-sm">
                            <span>{item.points} 点</span>
                            <span>{item.assignee}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <div className="bg-orange-100 p-3 rounded-t-lg">
                      <div className="font-medium">测试中</div>
                    </div>
                    <div className="bg-orange-50 p-3 rounded-b-lg min-h-[400px]">
                      {kanbanData.testing.map(item => (
                        <div key={item.id} className="mb-3 p-3 bg-white border rounded-lg shadow-sm">
                          <div className="font-medium mb-1">{item.title}</div>
                          <div className="flex justify-between text-sm">
                            <span>{item.points} 点</span>
                            <span>{item.assignee}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <div className="bg-green-100 p-3 rounded-t-lg">
                      <div className="font-medium">已完成</div>
                    </div>
                    <div className="bg-green-50 p-3 rounded-b-lg min-h-[400px]">
                      {kanbanData.done.map(item => (
                        <div key={item.id} className="mb-3 p-3 bg-white border rounded-lg shadow-sm">
                          <div className="font-medium mb-1">{item.title}</div>
                          <div className="flex justify-between text-sm">
                            <span>{item.points} 点</span>
                            <span>{item.assignee}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        {/* 冲刺燃尽图 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="mr-2 h-5 w-5" />
              冲刺燃尽图
            </CardTitle>
            <CardDescription>当前冲刺的燃尽图和进度跟踪</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-end space-x-1">
              {Array.from({ length: 14 }, (_, i) => {
                const height = 100 - (i * 7);
                return (
                  <div 
                    key={i} 
                    className="flex-1 bg-blue-500 rounded-t"
                    style={{ height: `${height}%` }}
                  ></div>
                );
              })}
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-500">
              <span>冲刺开始</span>
              <span>冲刺中</span>
              <span>冲刺结束</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageTemplate>
  );
}
```
### app/ci-cd-pipeline/page.tsx
```json
// app/ci-cd-pipeline/page.tsx
'use client';

import React, { useState } from 'react';
import { PageTemplate } from '@/components/layout/page-template';
import { StatCard, StatCardGroup } from '@/components/business/stat-card';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  GitBranch, 
  Zap, 
  CheckCircle, 
  Clock,
  AlertTriangle,
  Plus,
  Play,
  Pause,
  RefreshCw,
  BarChart3,
  Settings,
  Calendar,
  Server,
  Code
} from 'lucide-react';

export default function CICDPipelinePage() {
  // CI/CD统计数据
  const [cicdStats, setCicdStats] = useState([
    {
      title: '流水线总数',
      value: '18',
      change: { value: 2, type: 'increase' as const, text: '较上月' },
      icon: <GitBranch className="h-5 w-5" />,
      description: '系统中的CI/CD流水线总数'
    },
    {
      title: '今日构建',
      value: '42',
      change: { value: 8, type: 'increase' as const, text: '较昨日' },
      icon: <Zap className="h-5 w-5" />,
      description: '今日构建次数'
    },
    {
      title: '平均构建时间',
      value: '8.5分钟',
      change: { value: 1.2, type: 'decrease' as const, text: '较上周' },
      icon: <Clock className="h-5 w-5" />,
      description: '平均构建时间'
    },
    {
      title: '构建成功率',
      value: '96.8%',
      change: { value: 1.5, type: 'increase' as const, text: '较上周' },
      icon: <CheckCircle className="h-5 w-5" />,
      description: '构建成功率'
    }
  ]);

  // 流水线列表数据
  const [pipelines, setPipelines] = useState([
    { 
      id: 1, 
      name: '主应用构建流水线', 
      status: 'running',
      lastRun: '2023-06-10 10:30',
      duration: '8分25秒',
      successRate: 98.5,
      trigger: '代码提交',
      environment: 'production'
    },
    { 
      id: 2, 
      name: '测试环境部署流水线', 
      status: 'success',
      lastRun: '2023-06-10 09:45',
      duration: '5分12秒',
      successRate: 96.2,
      trigger: '手动触发',
      environment: 'testing'
    },
    { 
      id: 3, 
      name: '移动应用构建流水线', 
      status: 'failed',
      lastRun: '2023-06-09 16:20',
      duration: '12分45秒',
      successRate: 92.8,
      trigger: '定时触发',
      environment: 'staging'
    },
    { 
      id: 4, 
      name: 'API服务构建流水线', 
      status: 'idle',
      lastRun: '2023-06-08 14:15',
      duration: '6分30秒',
      successRate: 97.5,
      trigger: '代码提交',
      environment: 'production'
    }
  ]);

  // 构建历史数据
  const [buildHistory, setBuildHistory] = useState([
    { 
      id: 1, 
      pipelineId: 1,
      pipelineName: '主应用构建流水线',
      status: 'running',
      number: '#1245',
      commit: 'a1b2c3d',
      branch: 'main',
      startTime: '2023-06-10 10:30',
      duration: '8分25秒',
      progress: 65
    },
    { 
      id: 2, 
      pipelineId: 2,
      pipelineName: '测试环境部署流水线',
      status: 'success',
      number: '#856',
      commit: 'e4f5g6h',
      branch: 'develop',
      startTime: '2023-06-10 09:45',
      duration: '5分12秒',
      progress: 100
    },
    { 
      id: 3, 
      pipelineId: 3,
      pipelineName: '移动应用构建流水线',
      status: 'failed',
      number: '#432',
      commit: 'i7j8k9l',
      branch: 'feature/mobile',
      startTime: '2023-06-09 16:20',
      duration: '12分45秒',
      progress: 100
    },
    { 
      id: 4, 
      pipelineId: 4,
      pipelineName: 'API服务构建流水线',
      status: 'success',
      number: '#321',
      commit: 'm0n1o2p',
      branch: 'main',
      startTime: '2023-06-08 14:15',
      duration: '6分30秒',
      progress: 100
    }
  ]);

  // 部署环境数据
  const [environments, setEnvironments] = useState([
    { 
      id: 1, 
      name: '生产环境', 
      status: 'active',
      lastDeployed: '2023-06-10 10:30',
      version: 'v2.1.0',
      url: 'https://app.yanyucloud.com',
      health: 'healthy'
    },
    { 
      id: 2, 
      name: '测试环境', 
      status: 'active',
      lastDeployed: '2023-06-10 09:45',
      version: 'v2.1.0-rc1',
      url: 'https://test.yanyucloud.com',
      health: 'healthy'
    },
    { 
      id: 3, 
      name: '预发布环境', 
      status: 'active',
      lastDeployed: '2023-06-08 16:20',
      version: 'v2.0.5',
      url: 'https://staging.yanyucloud.com',
      health: 'warning'
    },
    { 
      id: 4, 
      name: '开发环境', 
      status: 'active',
      lastDeployed: '2023-06-07 14:15',
      version: 'v2.0.5-dev',
      url: 'https://dev.yanyucloud.com',
      health: 'healthy'
    }
  ]);

  // 获取状态样式
  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'running':
        return 'bg-blue-100 text-blue-800';
      case 'success':
        return 'bg-green-100 text-green-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'idle':
        return 'bg-gray-100 text-gray-800';
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // 获取健康状态样式
  const getHealthStyle = (health: string) => {
    switch (health) {
      case 'healthy':
        return 'bg-green-100 text-green-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      case 'unhealthy':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <PageTemplate
      title="CI/CD流水线"
      description="持续集成和持续部署流水线管理界面"
      breadcrumbs={[
        { title: '首页', path: '/dashboard' },
        { title: '项目管理', path: '/project' },
        { title: 'CI/CD流水线', path: '/ci-cd-pipeline' }
      ]}
      actions={
        <div className="flex gap-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            新建流水线
          </Button>
          <Button variant="outline">
            <Settings className="mr-2 h-4 w-4" />
            配置
          </Button>
        </div>
      }
    >
      <div className="space-y-8">
        {/* CI/CD统计卡片 */}
        <StatCardGroup>
          {cicdStats.map((stat, index) => (
            <StatCard
              key={index}
              title={stat.title}
              value={stat.value}
              change={stat.change}
              icon={stat.icon}
              description={stat.description}
            />
          ))}
        </StatCardGroup>

        <Tabs defaultValue="pipelines" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="pipelines">流水线</TabsTrigger>
            <TabsTrigger value="builds">构建历史</TabsTrigger>
            <TabsTrigger value="environments">部署环境</TabsTrigger>
          </TabsList>
          
          <TabsContent value="pipelines" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <GitBranch className="mr-2 h-5 w-5" />
                  流水线列表
                </CardTitle>
                <CardDescription>系统中的CI/CD流水线</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pipelines.map(pipeline => (
                    <div key={pipeline.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium">{pipeline.name}</div>
                        <Badge className={getStatusStyle(pipeline.status)}>
                          {pipeline.status === 'running' ? '运行中' :
                           pipeline.status === 'success' ? '成功' :
                           pipeline.status === 'failed' ? '失败' : '空闲'}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <div className="text-sm text-gray-500">最后运行</div>
                          <div>{pipeline.lastRun}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">持续时间</div>
                          <div>{pipeline.duration}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">成功率</div>
                          <div>{pipeline.successRate}%</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">触发方式</div>
                          <div>{pipeline.trigger}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm text-gray-500">环境</div>
                          <div>{pipeline.environment}</div>
                        </div>
                        <div className="flex gap-2">
                          {pipeline.status === 'running' ? (
                            <Button variant="outline" size="sm">
                              <Pause className="mr-1 h-4 w-4" />
                              暂停
                            </Button>
                          ) : (
                            <Button variant="outline" size="sm">
                              <Play className="mr-1 h-4 w-4" />
                              运行
                            </Button>
                          )}
                          <Button variant="outline" size="sm">
                            <RefreshCw className="mr-1 h-4 w-4" />
                            重新运行
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="builds" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="mr-2 h-5 w-5" />
                  构建历史
                </CardTitle>
                <CardDescription>最近的构建记录</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {buildHistory.map(build => (
                    <div key={build.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium">{build.pipelineName} - {build.number}</div>
                        <Badge className={getStatusStyle(build.status)}>
                          {build.status === 'running' ? '运行中' :
                           build.status === 'success' ? '成功' :
                           build.status === 'failed' ? '失败' : build.status}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <div className="text-sm text-gray-500">提交</div>
                          <div>{build.commit}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">分支</div>
                          <div>{build.branch}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">开始时间</div>
                          <div>{build.startTime}</div>
                        </div>
                      </div>
                      
                      {build.status === 'running' && (
                        <div className="mb-2">
                          <div className="flex justify-between text-sm mb-1">
                            <span>构建进度</span>
                            <span>{build.progress}%</span>
                          </div>
                          <Progress value={build.progress} className="h-2" />
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm text-gray-500">持续时间</div>
                          <div>{build.duration}</div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            查看日志
                          </Button>
                          <Button variant="outline" size="sm">
                            下载构建
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="environments" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Server className="mr-2 h-5 w-5" />
                  部署环境
                </CardTitle>
                <CardDescription>系统部署环境状态</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {environments.map(env => (
                    <div key={env.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium">{env.name}</div>
                        <div className="flex gap-2">
                          <Badge className={getStatusStyle(env.status)}>
                            {env.status === 'active' ? '活跃' : env.status}
                          </Badge>
                          <Badge className={getHealthStyle(env.health)}>
                            {env.health === 'healthy' ? '健康' :
                             env.health === 'warning' ? '警告' : '不健康'}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <div className="text-sm text-gray-500">最后部署</div>
                          <div>{env.lastDeployed}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">版本</div>
                          <div>{env.version}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">URL</div>
                          <div>{env.url}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            查看日志
                          </Button>
                          <Button variant="outline" size="sm">
                            访问环境
                          </Button>
                        </div>
                        <Button>
                          部署新版本
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        {/* 构建趋势图表 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="mr-2 h-5 w-5" />
              构建趋势分析
            </CardTitle>
            <CardDescription>最近7天的构建次数和成功率趋势</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="text-sm font-medium mb-2">构建次数</div>
                <div className="h-48 flex items-end space-x-1">
                  {Array.from({ length: 7 }, (_, i) => {
                    const height = 20 + Math.random() * 80;
                    return (
                      <div 
                        key={i} 
                        className="flex-1 bg-blue-500 rounded-t"
                        style={{ height: `${height}%` }}
                      ></div>
                    );
                  })}
                </div>
                <div className="flex justify-between mt-1 text-xs text-gray-500">
                  <span>7天前</span>
                  <span>3天前</span>
                  <span>今天</span>
                </div>
              </div>
              
              <div>
                <div className="text-sm font-medium mb-2">构建成功率</div>
                <div className="h-48 flex items-end space-x-1">
                  {Array.from({ length: 7 }, (_, i) => {
                    const height = 85 + Math.random() * 15;
                    return (
                      <div 
                        key={i} 
                        className="flex-1 bg-green-500 rounded-t"
                        style={{ height: `${height}%` }}
                      ></div>
                    );
                  })}
                </div>
                <div className="flex justify-between mt-1 text-xs text-gray-500">
                  <span>7天前</span>
                  <span>3天前</span>
                  <span>今天</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageTemplate>
  );
}
```
### app/roadmap/page.tsx
```json
// app/roadmap/page.tsx
'use client';

import React, { useState } from 'react';
import { PageTemplate } from '@/components/layout/page-template';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Map, 
  Calendar, 
  CheckCircle, 
  Clock,
  AlertTriangle,
  Plus,
  Filter,
  BarChart3,
  Target,
  Zap,
  Users,
  Star
} from 'lucide-react';

export default function RoadmapPage() {
  // 路线图统计数据
  const [roadmapStats, setRoadmapStats] = useState([
    {
      title: '总功能数',
      value: '48',
      change: { value: 6, type: 'increase' as const, text: '较上季度' },
      icon: <Target className="h-5 w-5" />,
      description: '路线图中的功能总数'
    },
    {
      title: '已完成功能',
      value: '32',
      change: { value: 8, type: 'increase' as const, text: '较上季度' },
      icon: <CheckCircle className="h-5 w-5" />,
      description: '已实现的功能数'
    },
    {
      title: '进行中功能',
      value: '10',
      change: { value: 2, type: 'increase' as const, text: '较上季度' },
      icon: <Zap className="h-5 w-5" />,
      description: '正在开发的功能数'
    },
    {
      title: '计划功能',
      value: '6',
      change: { value: 4, type: 'decrease' as const, text: '较上季度' },
      icon: <Clock className="h-5 w-5" />,
      description: '计划中的功能数'
    }
  ]);

  // 路线图数据
  const [roadmapData, setRoadmapData] = useState([
    {
      id: 1,
      quarter: '2023 Q2',
      status: 'active',
      progress: 75,
      features: [
        { id: 1, name: '用户管理优化', status: 'completed', priority: 'high', votes: 45 },
        { id: 2, name: 'API性能提升', status: 'completed', priority: 'high', votes: 38 },
        { id: 3, name: '移动端开发', status: 'in-progress', priority: 'high', votes: 52 },
        { id: 4, name: '数据分析功能', status: 'in-progress', priority: 'medium', votes: 28 }
      ]
    },
    {
      id: 2,
      quarter: '2023 Q3',
      status: 'upcoming',
      progress: 0,
      features: [
        { id: 5, name: 'AI助手集成', status: 'planned', priority: 'high', votes: 65 },
        { id: 6, name: '实时协作功能', status: 'planned', priority: 'medium', votes: 32 },
        { id: 7, name: '高级报表功能', status: 'planned', priority: 'medium', votes: 24 },
        { id: 8, name: '多语言支持', status: 'planned', priority: 'low', votes: 18 }
      ]
    },
    {
      id: 3,
      quarter: '2023 Q4',
      status: 'upcoming',
      progress: 0,
      features: [
        { id: 9, name: '企业级安全功能', status: 'planned', priority: 'high', votes: 42 },
        { id: 10, name: '工作流自动化', status: 'planned', priority: 'medium', votes: 35 },
        { id: 11, name: '第三方集成', status: 'planned', priority: 'medium', votes: 28 },
        { id: 12, name: '自定义主题', status: 'planned', priority: 'low', votes: 15 }
      ]
    }
  ]);

  // 功能请求数据
  const [featureRequests, setFeatureRequests] = useState([
    { 
      id: 1, 
      title: '暗色主题支持', 
      description: '希望系统支持暗色主题，减少眼部疲劳',
      status: 'approved',
      priority: 'medium',
      votes: 125,
      requestedBy: '张三',
      requestedDate: '2023-05-15'
    },
    { 
      id: 2, 
      title: '批量操作功能', 
      description: '需要能够批量处理数据和文件',
      status: 'planned',
      priority: 'high',
      votes: 89,
      requestedBy: '李四',
      requestedDate: '2023-05-20'
    },
    { 
      id: 3, 
      title: '导出PDF报告', 
      description: '希望能够将分析报告导出为PDF格式',
      status: 'approved',
      priority: 'medium',
      votes: 76,
      requestedBy: '王五',
      requestedDate: '2023-05-10'
    },
    { 
      id: 4, 
      title: '移动端离线模式', 
      description: '移动端需要支持离线访问功能',
      status: 'under-review',
      priority: 'high',
      votes: 64,
      requestedBy: '赵六',
      requestedDate: '2023-05-25'
    }
  ]);

  // 获取状态样式
  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'planned':
        return 'bg-purple-100 text-purple-800';
      case 'upcoming':
        return 'bg-gray-100 text-gray-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'under-review':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // 获取优先级样式
  const getPriorityStyle = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <PageTemplate
      title="产品路线图"
      description="产品功能规划和路线图管理界面"
      breadcrumbs={[
        { title: '首页', path: '/dashboard' },
        { title: '项目管理', path: '/project' },
        { title: '产品路线图', path: '/roadmap' }
      ]}
      actions={
        <div className="flex gap-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            添加功能
          </Button>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            筛选
          </Button>
        </div>
      }
    >
      <div className="space-y-8">
        {/* 路线图统计卡片 */}
        <StatCardGroup>
          {roadmapStats.map((stat, index) => (
            <StatCard
              key={index}
              title={stat.title}
              value={stat.value}
              change={stat.change}
              icon={stat.icon}
              description={stat.description}
            />
          ))}
        </StatCardGroup>

        <Tabs defaultValue="roadmap" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="roadmap">路线图</TabsTrigger>
            <TabsTrigger value="requests">功能请求</TabsTrigger>
          </TabsList>
          
          <TabsContent value="roadmap" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Map className="mr-2 h-5 w-5" />
                  产品路线图
                </CardTitle>
                <CardDescription>产品功能规划和时间线</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {roadmapData.map(quarter => (
                    <div key={quarter.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="text-lg font-semibold">{quarter.quarter}</div>
                        <Badge className={getStatusStyle(quarter.status)}>
                          {quarter.status === 'active' ? '进行中' :
                           quarter.status === 'upcoming' ? '计划中' : quarter.status}
                        </Badge>
                      </div>
                      
                      {quarter.progress > 0 && (
                        <div className="mb-4">
                          <div className="flex justify-between text-sm mb-1">
                            <span>季度进度</span>
                            <span>{quarter.progress}%</span>
                          </div>
                          <Progress value={quarter.progress} className="h-2" />
                        </div>
                      )}
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {quarter.features.map(feature => (
                          <div key={feature.id} className="border rounded-lg p-3">
                            <div className="flex items-center justify-between mb-2">
                              <div className="font-medium">{feature.name}</div>
                              <div className="flex gap-1">
                                <Badge className={getStatusStyle(feature.status)}>
                                  {feature.status === 'completed' ? '已完成' :
                                   feature.status === 'in-progress' ? '进行中' :
                                   feature.status === 'planned' ? '计划中' : feature.status}
                                </Badge>
                                <Badge className={getPriorityStyle(feature.priority)}>
                                  {feature.priority === 'high' ? '高优先级' :
                                   feature.priority === 'medium' ? '中优先级' : '低优先级'}
                                </Badge>
                              </div>
                            </div>
                            
                            <div className="flex items-center justify-between text-sm">
                              <div className="flex items-center">
                                <Star className="mr-1 h-4 w-4 text-yellow-400" />
                                <span>{feature.votes}</span>
                              </div>
                              <Button variant="ghost" size="sm">
                                投票
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="requests" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="mr-2 h-5 w-5" />
                  功能请求
                </CardTitle>
                <CardDescription>用户提交的功能请求和建议</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {featureRequests.map(request => (
                    <div key={request.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium">{request.title}</div>
                        <div className="flex gap-2">
                          <Badge className={getStatusStyle(request.status)}>
                            {request.status === 'approved' ? '已批准' :
                             request.status === 'planned' ? '已计划' :
                             request.status === 'under-review' ? '审核中' : request.status}
                          </Badge>
                          <Badge className={getPriorityStyle(request.priority)}>
                            {request.priority === 'high' ? '高优先级' :
                             request.priority === 'medium' ? '中优先级' : '低优先级'}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="text-sm text-gray-600 mb-3">
                        {request.description}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <div className="text-gray-500">请求者</div>
                          <div>{request.requestedBy}</div>
                        </div>
                        <div>
                          <div className="text-gray-500">请求日期</div>
                          <div>{request.requestedDate}</div>
                        </div>
                        <div>
                          <div className="text-gray-500">投票数</div>
                          <div className="flex items-center">
                            <Star className="mr-1 h-4 w-4 text-yellow-400" />
                            <span>{request.votes}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            详情
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Star className="mr-1 h-4 w-4" />
                            投票
                          </Button>
                        </div>
                        <Button variant="outline" size="sm">
                          评论
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        {/* 功能分布图表 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="mr-2 h-5 w-5" />
              功能分布分析
            </CardTitle>
            <CardDescription>各季度功能分布和完成情况</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {roadmapData.map(quarter => (
                <div key={quarter.id} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">{quarter.quarter}</span>
                    <span>{quarter.progress}% 完成</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full bg-blue-500"
                      style={{ width: `${quarter.progress}%` }}
                    ></div>
                  </div>
                  <div className="text-sm text-gray-500">
                    {quarter.features.filter(f => f.status === 'completed').length} 已完成, 
                    {quarter.features.filter(f => f.status === 'in-progress').length} 进行中, 
                    {quarter.features.filter(f => f.status === 'planned').length} 计划中
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </PageTemplate>
  );
}
```
### app/specifications/page.tsx
```json
// app/specifications/page.tsx
'use client';

import React, { useState } from 'react';
import { PageTemplate } from '@/components/layout/page-template';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  FileText, 
  Search, 
  Download, 
  Eye,
  Plus,
  Filter,
  Calendar,
  User,
  Tag,
  CheckCircle,
  Clock,
  AlertTriangle
} from 'lucide-react';

export default function SpecificationsPage() {
  // 规格文档数据
  const [specifications, setSpecifications] = useState([
    { 
      id: 1, 
      title: 'YanYu Cloud³ 系统架构规格书', 
      type: '架构',
      version: 'v2.1',
      status: 'approved',
      author: '张三',
      lastUpdated: '2023-06-05',
      tags: ['架构', '系统', '核心'],
      size: '2.4 MB'
    },
    { 
      id: 2, 
      title: 'API接口规格说明', 
      type: 'API',
      version: 'v3.2',
      status: 'approved',
      author: '李四',
      lastUpdated: '2023-06-01',
      tags: ['API', '接口', '开发'],
      size: '1.8 MB'
    },
    { 
      id: 3, 
      title: '数据库设计规格书', 
      type: '数据库',
      version: 'v1.5',
      status: 'draft',
      author: '王五',
      lastUpdated: '2023-06-10',
      tags: ['数据库', '设计', '存储'],
      size: '3.2 MB'
    },
    { 
      id: 4, 
      title: '安全规格说明', 
      type: '安全',
      version: 'v1.2',
      status: 'review',
      author: '赵六',
      lastUpdated: '2023-06-08',
      tags: ['安全', '认证', '权限'],
      size: '1.5 MB'
    }
  ]);

  // 规格类型数据
  const [specTypes, setSpecTypes] = useState([
    { id: 'architecture', name: '架构', count: 12 },
    { id: 'api', name: 'API', count: 8 },
    { id: 'database', name: '数据库', count: 6 },
    { id: 'security', name: '安全', count: 4 },
    { id: 'ui', name: '界面', count: 10 },
    { id: 'business', name: '业务', count: 8 }
  ]);

  // 规格状态数据
  const [specStatuses, setSpecStatuses] = useState([
    { id: 'approved', name: '已批准', count: 18 },
    { id: 'draft', name: '草稿', count: 8 },
    { id: 'review', name: '审核中', count: 6 },
    { id: 'archived', name: '已归档', count: 4 }
  ]);

  // 获取状态样式
  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'review':
        return 'bg-blue-100 text-blue-800';
      case 'archived':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <PageTemplate
      title="规格说明"
      description="系统规格说明文档管理界面"
      breadcrumbs={[
        { title: '首页', path: '/dashboard' },
        { title: '项目管理', path: '/project' },
        { title: '规格说明', path: '/specifications' }
      ]}
      actions={
        <div className="flex gap-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            新建规格
          </Button>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            筛选
          </Button>
        </div>
      }
    >
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="搜索规格文档..."
              className="pl-8"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <div className="flex items-center">
              <span className="text-sm text-gray-500 mr-2">类型:</span>
            </div>
            {specTypes.map(type => (
              <Badge key={type.id} variant="outline" className="cursor-pointer">
                {type.name} ({type.count})
              </Badge>
            ))}
          </div>
          
          <div className="flex flex-wrap gap-2">
            <div className="flex items-center">
              <span className="text-sm text-gray-500 mr-2">状态:</span>
            </div>
            {specStatuses.map(status => (
              <Badge key={status.id} variant="outline" className="cursor-pointer">
                {status.name} ({status.count})
              </Badge>
            ))}
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="mr-2 h-5 w-5" />
              规格文档列表
            </CardTitle>
            <CardDescription>系统中的所有规格说明文档</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {specifications.map(spec => (
                <div key={spec.id} className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium">{spec.title}</div>
                    <Badge className={getStatusStyle(spec.status)}>
                      {spec.status === 'approved' ? '已批准' :
                       spec.status === 'draft' ? '草稿' :
                       spec.status === 'review' ? '审核中' : '已归档'}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                    <div>
                      <div className="text-sm text-gray-500">类型</div>
                      <div>{spec.type}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">版本</div>
                      <div>{spec.version}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">大小</div>
                      <div>{spec.size}</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                    <div>
                      <div className="text-sm text-gray-500">作者</div>
                      <div>{spec.author}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">最后更新</div>
                      <div>{spec.lastUpdated}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {spec.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="mr-1 h-4 w-4" />
                        查看
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="mr-1 h-4 w-4" />
                        下载
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 规格类型统计 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Tag className="mr-2 h-5 w-5" />
                规格类型分布
              </CardTitle>
              <CardDescription>各类型规格文档数量</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {specTypes.map(type => (
                  <div key={type.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded cursor-pointer">
                    <span className="font-medium">{type.name}</span>
                    <Badge variant="outline">
                      {type.count}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 规格状态统计 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckCircle className="mr-2 h-5 w-5" />
                规格状态分布
              </CardTitle>
              <CardDescription>各状态规格文档数量</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {specStatuses.map(status => (
                  <div key={status.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded cursor-pointer">
                    <span className="font-medium">{status.name}</span>
                    <Badge variant="outline">
                      {status.count}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 最近更新 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="mr-2 h-5 w-5" />
              最近更新
            </CardTitle>
            <CardDescription>最近更新的规格文档</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {specifications
                .sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime())
                .slice(0, 3)
                .map(spec => (
                  <div key={spec.id} className="flex items-start p-3 border rounded-lg">
                    <div className="mr-3 p-2 rounded-full bg-blue-100">
                      <FileText className="h-5 w-5 text-blue-500" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{spec.title}</div>
                      <div className="text-sm text-gray-500">
                        <span className="flex items-center">
                          <User className="mr-1 h-3 w-3 text-gray-500" />
                          <span>{spec.author}</span>
                        </span>
                        <span className="mx-2">·</span>
                        <span className="flex items-center">
                          <Calendar className="mr-1 h-3 w-3 text-gray-500" />
                          <span>{spec.lastUpdated}</span>
                        </span>
                      </div>
                    </div>
                    <Badge className={getStatusStyle(spec.status)}>
                      {spec.status === 'approved' ? '已批准' :
                       spec.status === 'draft' ? '草稿' :
                       spec.status === 'review' ? '审核中' : '已归档'}
                    </Badge>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </PageTemplate>
  );
}
```
### app/status-analysis/page.tsx
```json
// app/status-analysis/page.tsx
'use client';

import React, { useState } from 'react';
import { PageTemplate } from '@/components/layout/page-template';
import { StatCard, StatCardGroup } from '@/components/business/stat-card';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart3, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle,
  Activity,
  Zap,
  Target,
  Calendar,
  RefreshCw,
  Filter,
  Download
} from 'lucide-react';

export default function StatusAnalysisPage() {
  // 状态分析统计数据
  const [analysisStats, setAnalysisStats] = useState([
    {
      title: '总项目数',
      value: '24',
      change: { value: 3, type: 'increase' as const, text: '较上月' },
      icon: <Target className="h-5 w-5" />,
      description: '系统中的项目总数'
    },
    {
      title: '健康项目',
      value: '18',
      change: { value: 2, type: 'increase' as const, text: '较上月' },
      icon: <CheckCircle className="h-5 w-5" />,
      description: '状态健康的项目数'
    },
    {
      title: '警告项目',
      value: '4',
      change: { value: 1, type: 'decrease' as const, text: '较上月' },
      icon: <AlertTriangle className="h-5 w-5" />,
      description: '需要关注的项目数'
    },
    {
      title: '风险项目',
      value: '2',
      change: { value: 0, type: 'stable' as const, text: '较上月' },
      icon: <Activity className="h-5 w-5" />,
      description: '存在风险的项目数'
    }
  ]);

  // 项目状态数据
  const [projectStatus, setProjectStatus] = useState([
    { 
      id: 1, 
      name: 'YanYu Cloud³ 平台升级', 
      status: 'healthy',
      progress: 75,
      health: 95,
      risks: ['预算超支'],
      lastUpdated: '2023-06-10'
    },
    { 
      id: 2, 
      name: '移动应用开发', 
      status: 'healthy',
      progress: 45,
      health: 88,
      risks: [],
      lastUpdated: '2023-06-09'
    },
    { 
      id: 3, 
      name: '数据分析系统', 
      status: 'warning',
      progress: 100,
      health: 72,
      risks: ['性能问题', '用户反馈'],
      lastUpdated: '2023-06-08'
    },
    { 
      id: 4, 
      name: '安全系统升级', 
      status: 'at-risk',
      progress: 30,
      health: 45,
      risks: ['进度延迟', '资源不足'],
      lastUpdated: '2023-06-07'
    }
  ]);

  // 健康指标数据
  const [healthMetrics, setHealthMetrics] = useState([
    { 
      id: 1, 
      name: '进度健康度', 
      value: 78,
      target: 80,
      status: 'warning',
      description: '项目整体进度略低于目标'
    },
    { 
      id: 2, 
      name: '预算健康度', 
      value: 85,
      target: 90,
      status: 'warning',
      description: '部分项目预算超支'
    },
    { 
      id: 3, 
      name: '资源健康度', 
      value: 92,
      target: 85,
      status: 'healthy',
      description: '资源分配合理'
    },
    { 
      id: 4, 
      name: '质量健康度', 
      value: 88,
      target: 90,
      status: 'warning',
      description: '部分项目质量问题'
    }
  ]);

  // 风险分析数据
  const [riskAnalysis, setRiskAnalysis] = useState([
    { 
      id: 1, 
      category: '进度风险', 
      count: 3,
      severity: 'medium',
      projects: ['安全系统升级', 'API服务优化'],
      description: '项目进度落后于计划'
    },
    { 
      id: 2, 
      category: '预算风险', 
      count: 2,
      severity: 'high',
      projects: ['YanYu Cloud³ 平台升级'],
      description: '项目预算可能超支'
    },
    { 
      id: 3, 
      category: '资源风险', 
      count: 2,
      severity: 'medium',
      projects: ['安全系统升级'],
      description: '项目资源不足'
    },
    { 
      id: 4, 
      category: '质量风险', 
      count: 1,
      severity: 'low',
      projects: ['数据分析系统'],
      description: '项目存在质量问题'
    }
  ]);

  // 获取状态样式
  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'bg-green-100 text-green-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      case 'at-risk':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // 获取严重程度样式
  const getSeverityStyle = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // 获取健康状态样式
  const getHealthStatusStyle = (health: number) => {
    if (health >= 90) return 'bg-green-100 text-green-800';
    if (health >= 70) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <PageTemplate
      title="状态分析"
      description="项目状态分析和健康度评估界面"
      breadcrumbs={[
        { title: '首页', path: '/dashboard' },
        { title: '项目管理', path: '/project' },
        { title: '状态分析', path: '/status-analysis' }
      ]}
      actions={
        <div className="flex gap-2">
          <Button variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" />
            刷新数据
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            导出报告
          </Button>
        </div>
      }
    >
      <div className="space-y-8">
        {/* 状态分析统计卡片 */}
        <StatCardGroup>
          {analysisStats.map((stat, index) => (
            <StatCard
              key={index}
              title={stat.title}
              value={stat.value}
              change={stat.change}
              icon={stat.icon}
              description={stat.description}
            />
          ))}
        </StatCardGroup>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">项目概览</TabsTrigger>
            <TabsTrigger value="health">健康指标</TabsTrigger>
            <TabsTrigger value="risks">风险分析</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="mr-2 h-5 w-5" />
                  项目状态概览
                </CardTitle>
                <CardDescription>所有项目的当前状态</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {projectStatus.map(project => (
                    <div key={project.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium">{project.name}</div>
                        <Badge className={getStatusStyle(project.status)}>
                          {project.status === 'healthy' ? '健康' :
                           project.status === 'warning' ? '警告' :
                           project.status === 'at-risk' ? '风险' : project.status}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <div className="text-sm text-gray-500">进度</div>
                          <div className="flex items-center">
                            <span className="mr-2">{project.progress}%</span>
                            <Progress value={project.progress} className="flex-1 h-2" />
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">健康度</div>
                          <div className="flex items-center">
                            <span className="mr-2">{project.health}%</span>
                            <div className={`w-2 h-2 rounded-full ${
                              project.health >= 90 ? 'bg-green-500' :
                              project.health >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}></div>
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">最后更新</div>
                          <div>{project.lastUpdated}</div>
                        </div>
                      </div>
                      
                      {project.risks.length > 0 && (
                        <div>
                          <div className="text-sm text-gray-500 mb-1">风险</div>
                          <div className="flex flex-wrap gap-1">
                            {project.risks.map((risk, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {risk}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="health" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5" />
                  健康指标分析
                </CardTitle>
                <CardDescription>项目健康度各项指标分析</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {healthMetrics.map(metric => (
                    <div key={metric.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium">{metric.name}</div>
                        <Badge className={getHealthStatusStyle(metric.value)}>
                          {metric.value >= 90 ? '优秀' :
                           metric.value >= 70 ? '良好' : '需改进'}
                        </Badge>
                      </div>
                      
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-1">
                          <span>当前值</span>
                          <span>目标值</span>
                        </div>
                        <div className="flex items-center">
                          <div className="flex-1">
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full ${
                                  metric.value >= 90 ? 'bg-green-500' :
                                  metric.value >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                                }`}
                                style={{ width: `${metric.value}%` }}
                              ></div>
                            </div>
                            <span className="ml-2 text-sm">{metric.value}%</span>
                          </div>
                          <div className="mx-4 text-gray-400">→</div>
                          <div className="flex-1">
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="h-2 rounded-full bg-blue-500"
                                style={{ width: `${metric.target}%` }}
                              ></div>
                            </div>
                            <span className="ml-2 text-sm">{metric.target}%</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-sm text-gray-600">
                        {metric.description}
                      </div>
                      
                      <div className={`text-sm font-medium ${
                        metric.status === 'healthy' ? 'text-green-600' :
                        metric.status === 'warning' ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {metric.status === 'healthy' ? '指标正常' :
                         metric.status === 'warning' ? '需要关注' : '需要改进'}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="risks" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertTriangle className="mr-2 h-5 w-5" />
                  风险分析
                </CardTitle>
                <CardDescription>项目风险分类和分析</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {riskAnalysis.map(risk => (
                    <div key={risk.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium">{risk.category}</div>
                        <Badge className={getSeverityStyle(risk.severity)}>
                          {risk.severity === 'high' ? '高风险' :
                           risk.severity === 'medium' ? '中风险' : '低风险'}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <div className="text-sm text-gray-500">影响项目数</div>
                          <div>{risk.count}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">涉及项目</div>
                          <div>{risk.projects.join(', ')}</div>
                        </div>
                      </div>
                      
                      <div className="text-sm text-gray-600">
                        {risk.description}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        {/* 健康度趋势图表 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="mr-2 h-5 w-5" />
              健康度趋势
            </CardTitle>
            <CardDescription>最近30天项目健康度变化趋势</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-end space-x-1">
              {Array.from({ length: 30 }, (_, i) => {
                const height = 70 + Math.random() * 25;
                return (
                  <div 
                    key={i} 
                    className="flex-1 bg-green-500 rounded-t"
                    style={{ height: `${height}%` }}
                  ></div>
                );
              })}
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-500">
              <span>30天前</span>
              <span>15天前</span>
              <span>今天</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageTemplate>
  );
}
```
### app/analysis-report/page.tsx
```json
// app/analysis-report/page.tsx
'use client';

import React, { useState } from 'react';
import { PageTemplate } from '@/components/layout/page-template';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart3, 
  FileText, 
  Download, 
  Calendar,
  Filter,
  RefreshCw,
  TrendingUp,
  Users,
  Zap,
  Target,
  CheckCircle,
  Clock
} from 'lucide-react';

export default function AnalysisReportPage() {
  // 报告统计数据
  const [reportStats, setReportStats] = useState([
    {
      title: '总报告数',
      value: '48',
      change: { value: 6, type: 'increase' as const, text: '较上月' },
      icon: <FileText className="h-5 w-5" />,
      description: '系统中的分析报告总数'
    },
    {
      title: '本月生成',
      value: '12',
      change: { value: 3, type: 'increase' as const, text: '较上月' },
      icon: <Calendar className="h-5 w-5" />,
      description: '本月生成的报告数'
    },
    {
      title: '自动报告',
      value: '32',
      change: { value: 4, type: 'increase' as const, text: '较上月' },
      icon: <Zap className="h-5 w-5" />,
      description: '自动生成的报告数'
    },
    {
      title: '平均生成时间',
      value: '5.2分钟',
      change: { value: 1.8, type: 'decrease' as const, text: '较上月' },
      icon: <Clock className="h-5 w-5" />,
      description: '报告平均生成时间'
    }
  ]);

  // 报告列表数据
  const [reports, setReports] = useState([
    { 
      id: 1, 
      title: '月度运营分析报告', 
      type: '运营',
      category: '定期报告',
      status: 'completed',
      generatedDate: '2023-06-10',
      size: '2.4 MB',
      format: 'PDF',
      auto: true
    },
    { 
      id: 2, 
      title: '用户行为分析报告', 
      type: '用户',
      category: '分析报告',
      status: 'completed',
      generatedDate: '2023-06-08',
      size: '3.8 MB',
      format: 'PDF',
      auto: true
    },
    { 
      id: 3, 
      title: '系统性能分析报告', 
      type: '系统',
      category: '技术报告',
      status: 'processing',
      generatedDate: '2023-06-10',
      size: '1.2 MB',
      format: 'HTML',
      auto: false
    },
    { 
      id: 4, 
      title: '销售数据分析报告', 
      type: '销售',
      category: '业务报告',
      status: 'scheduled',
      generatedDate: '2023-06-12',
      size: '0 MB',
      format: 'Excel',
      auto: true
    }
  ]);

  // 报告类型数据
  const [reportTypes, setReportTypes] = useState([
    { id: 'operation', name: '运营', count: 15 },
    { id: 'user', name: '用户', count: 12 },
    { id: 'system', name: '系统', count: 8 },
    { id: 'sales', name: '销售', count: 10 },
    { id: 'finance', name: '财务', count: 3 }
  ]);

  // 报告模板数据
  const [reportTemplates, setReportTemplates] = useState([
    { 
      id: 1, 
      name: '月度运营报告模板', 
      type: 'operation',
      description: '包含用户活跃度、内容分析等关键指标',
      usage: 125
    },
    { 
      id: 2, 
      name: '用户行为分析模板', 
      type: 'user',
      description: '分析用户行为路径和转化漏斗',
      usage: 89
    },
    { 
      id: 3, 
      name: '系统性能报告模板', 
      type: 'system',
      description: '监控系统性能和资源使用情况',
      usage: 64
    },
    { 
      id: 4, 
      name: '销售数据分析模板', 
      type: 'sales',
      description: '分析销售趋势和客户转化',
      usage: 76
    }
  ]);

  // 获取状态样式
  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'scheduled':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <PageTemplate
      title="分析报告"
      description="数据分析报告生成和管理界面"
      breadcrumbs={[
        { title: '首页', path: '/dashboard' },
        { title: '数据分析', path: '/analytics' },
        { title: '分析报告', path: '/analysis-report' }
      ]}
      actions={
        <div className="flex gap-2">
          <Button>
            <FileText className="mr-2 h-4 w-4" />
            生成报告
          </Button>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            筛选
          </Button>
        </div>
      }
    >
      <div className="space-y-8">
        {/* 报告统计卡片 */}
        <StatCardGroup>
          {reportStats.map((stat, index) => (
            <StatCard
              key={index}
              title={stat.title}
              value={stat.value}
              change={stat.change}
              icon={stat.icon}
              description={stat.description}
            />
          ))}
        </StatCardGroup>

        <Tabs defaultValue="reports" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="reports">报告列表</TabsTrigger>
            <TabsTrigger value="templates">报告模板</TabsTrigger>
            <TabsTrigger value="schedule">定时报告</TabsTrigger>
          </TabsList>
          
          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="mr-2 h-5 w-5" />
                  报告列表
                </CardTitle>
                <CardDescription>系统中的所有分析报告</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reports.map(report => (
                    <div key={report.id} className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium">{report.title}</div>
                        <Badge className={getStatusStyle(report.status)}>
                          {report.status === 'completed' ? '已完成' :
                           report.status === 'processing' ? '生成中' :
                           report.status === 'scheduled' ? '计划中' : '失败'}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                        <div>
                          <div className="text-sm text-gray-500">类型</div>
                          <div>{report.type}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">生成日期</div>
                          <div>{report.generatedDate}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">大小</div>
                          <div>{report.size}</div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <div className="text-gray-500">分类</div>
                          <div>{report.category}</div>
                        </div>
                        <div>
                          <div className="text-gray-500">格式</div>
                          <div>{report.format}</div>
                        </div>
                        <div>
                          <div className="text-gray-500">生成方式</div>
                          <div>{report.auto ? '自动' : '手动'}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <FileText className="mr-1 h-4 w-4" />
                            查看
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="mr-1 h-4 w-4" />
                            下载
                          </Button>
                        </div>
                        {report.status === 'processing' && (
                          <Button variant="outline" size="sm">
                            取消生成
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="templates" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="mr-2 h-5 w-5" />
                  报告模板
                </CardTitle>
                <CardDescription>可用的报告模板</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reportTemplates.map(template => (
                    <div key={template.id} className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium">{template.name}</div>
                        <Badge variant="outline">
                          {template.type}
                        </Badge>
                      </div>
                      
                      <div className="text-sm text-gray-600 mb-3">
                        {template.description}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-500">
                          使用次数: {template.usage}
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            预览
                          </Button>
                          <Button size="sm">
                            使用模板
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="schedule" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5" />
                  定时报告
                </CardTitle>
                <CardDescription>定时生成的报告配置</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reports.filter(r => r.auto).map(report => (
                    <div key={report.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium">{report.title}</div>
                        <Badge className={getStatusStyle(report.status)}>
                          {report.status === 'completed' ? '已完成' :
                           report.status === 'processing' ? '生成中' :
                           report.status === 'scheduled' ? '计划中' : '失败'}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                        <div>
                          <div className="text-sm text-gray-500">生成频率</div>
                          <div>每月</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">下次生成</div>
                          <div>{report.generatedDate}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-500">
                          格式: {report.format}
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            编辑计划
                          </Button>
                          <Button variant="outline" size="sm">
                            立即生成
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        {/* 报告生成趋势图表 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="mr-2 h-5 w-5" />
              报告生成趋势
            </CardTitle>
            <CardDescription>最近30天报告生成数量趋势</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-end space-x-1">
              {Array.from({ length: 30 }, (_, i) => {
                const height = 20 + Math.random() * 80;
                return (
                  <div 
                    key={i} 
                    className="flex-1 bg-blue-500 rounded-t"
                    style={{ height: `${height}%` }}
                  ></div>
                );
              })}
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-500">
              <span>30天前</span>
              <span>15天前</span>
              <span>今天</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageTemplate>
  );
}
```
### app/profile/page.tsx

```json
// app/profile/page.tsx
'use client';

import React, { useState } from 'react';
import { PageTemplate } from '@/components/layout/page-template';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin,
  Calendar,
  Settings,
  Shield,
  Bell,
  Save,
  Upload,
  Camera,
  Lock,
  Globe,
  Briefcase,
  Award,
  Star
} from 'lucide-react';

export default function ProfilePage() {
  // 用户基本信息
  const [userInfo, setUserInfo] = useState({
    name: '张三',
    email: 'zhangsan@yanyucloud.com',
    phone: '13800138000',
    location: '北京市',
    bio: 'YanYu Cloud³ 平台产品经理，负责产品规划和用户体验设计。',
    joinDate: '2022-03-15',
    lastLogin: '2023-06-10 10:30'
  });

  // 账户设置
  const [accountSettings, setAccountSettings] = useState({
    language: 'zh-CN',
    timezone: 'Asia/Shanghai',
    theme: 'light',
    notifications: {
      email: true,
      push: true,
      sms: false
    }
  });

  // 隐私设置
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'all',
    activityVisibility: 'connections',
    showEmail: false,
    showPhone: false,
    allowSearch: true
  });

  // 安全设置
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: true,
    loginAlerts: true,
    sessionTimeout: 30,
    passwordLastChanged: '2023-05-10'
  });

  // 成就徽章
  const [badges, setBadges] = useState([
    { id: 1, name: '早期用户', description: '2022年3月加入', icon: '🏆' },
    { id: 2, name: '活跃贡献者', description: '积极参与社区讨论', icon: '⭐' },
    { id: 3, name: '产品专家', description: '产品规划核心成员', icon: '🎯' }
  ]);

  // 保存设置
  const saveSettings = () => {
    // 这里应该调用API保存设置
    alert('个人资料已更新');
  };

  return (
    <PageTemplate
      title="个人资料"
      description="用户个人资料和账户设置界面"
      breadcrumbs={[
        { title: '首页', path: '/dashboard' },
        { title: '个人资料', path: '/profile' }
      ]}
    >
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* 左侧个人信息卡片 */}
          <div className="md:w-1/3">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center">
                  <div className="relative mb-4">
                    <Avatar className="w-24 h-24">
                      <AvatarImage src="/placeholder-user.jpg" alt={userInfo.name} />
                      <AvatarFallback>{userInfo.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <Button variant="ghost" size="sm" className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow">
                      <Camera className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <h2 className="text-xl font-bold">{userInfo.name}</h2>
                  <p className="text-gray-500">{userInfo.email}</p>
                  
                  <div className="mt-4 w-full">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-gray-500">加入时间</span>
                      <span>{userInfo.joinDate}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">最后登录</span>
                      <span>{userInfo.lastLogin}</span>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <Button variant="outline" className="w-full">
                      <Upload className="mr-2 h-4 w-4" />
                      上传头像
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* 成就徽章 */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="mr-2 h-5 w-5" />
                  成就徽章
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {badges.map(badge => (
                    <div key={badge.id} className="flex items-center p-2 border rounded-lg">
                      <div className="text-2xl mr-3">{badge.icon}</div>
                      <div>
                        <div className="font-medium">{badge.name}</div>
                        <div className="text-sm text-gray-500">{badge.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* 右侧设置区域 */}
          <div className="md:w-2/3">
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="profile">个人资料</TabsTrigger>
                <TabsTrigger value="account">账户</TabsTrigger>
                <TabsTrigger value="privacy">隐私</TabsTrigger>
                <TabsTrigger value="security">安全</TabsTrigger>
              </TabsList>
              
              <TabsContent value="profile" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <User className="mr-2 h-5 w-5" />
                      个人信息
                    </CardTitle>
                    <CardDescription>更新您的个人资料和联系信息</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">姓名</Label>
                        <Input
                          id="name"
                          value={userInfo.name}
                          onChange={(e) => setUserInfo({...userInfo, name: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">邮箱</Label>
                        <Input
                          id="email"
                          type="email"
                          value={userInfo.email}
                          onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">电话</Label>
                        <Input
                          id="phone"
                          value={userInfo.phone}
                          onChange={(e) => setUserInfo({...userInfo, phone: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="location">位置</Label>
                        <Input
                          id="location"
                          value={userInfo.location}
                          onChange={(e) => setUserInfo({...userInfo, location: e.target.value})}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="bio">个人简介</Label>
                      <textarea
                        id="bio"
                        className="w-full min-h-[100px] p-2 border rounded-md"
                        value={userInfo.bio}
                        onChange={(e) => setUserInfo({...userInfo, bio: e.target.value})}
                      />
                    </div>
                    
                    <div className="flex gap-2">
                      <Button onClick={saveSettings}>
                        <Save className="mr-2 h-4 w-4" />
                        保存更改
                      </Button>
                      <Button variant="outline">取消</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="account" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Settings className="mr-2 h-5 w-5" />
                      账户设置
                    </CardTitle>
                    <CardDescription>管理您的账户偏好设置</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="language">语言</Label>
                      <select
                        id="language"
                        className="w-full p-2 border rounded-md"
                        value={accountSettings.language}
                        onChange={(e) => setAccountSettings({...accountSettings, language: e.target.value})}
                      >
                        <option value="zh-CN">简体中文</option>
                        <option value="en-US">English</option>
                        <option value="ja-JP">日本語</option>
                      </select>
                    </div>
                    
                    <div>
                      <Label htmlFor="timezone">时区</Label>
                      <select
                        id="timezone"
                        className="w-full p-2 border rounded-md"
                        value={accountSettings.timezone}
                        onChange={(e) => setAccountSettings({...accountSettings, timezone: e.target.value})}
                      >
                        <option value="Asia/Shanghai">北京时间 (UTC+8)</option>
                        <option value="America/New_York">纽约时间 (UTC-5)</option>
                        <option value="Europe/London">伦敦时间 (UTC+0)</option>
                      </select>
                    </div>
                    
                    <div>
                      <Label>主题</Label>
                      <div className="flex gap-4 mt-2">
                        <button
                          className={`p-4 border rounded-lg flex flex-col items-center ${
                            accountSettings.theme === 'light' ? 'border-blue-500 bg-blue-50' : ''
                          }`}
                          onClick={() => setAccountSettings({...accountSettings, theme: 'light'})}
                        >
                          <div className="w-10 h-10 bg-white border rounded mb-2"></div>
                          <span>浅色</span>
                        </button>
                        <button
                          className={`p-4 border rounded-lg flex flex-col items-center ${
                            accountSettings.theme === 'dark' ? 'border-blue-500 bg-blue-50' : ''
                          }`}
                          onClick={() => setAccountSettings({...accountSettings, theme: 'dark'})}
                        >
                          <div className="w-10 h-10 bg-gray-800 border rounded mb-2"></div>
                          <span>深色</span>
                        </button>
                        <button
                          className={`p-4 border rounded-lg flex flex-col items-center ${
                            accountSettings.theme === 'system' ? 'border-blue-500 bg-blue-50' : ''
                          }`}
                          onClick={() => setAccountSettings({...accountSettings, theme: 'system'})}
                        >
                          <div className="w-10 h-10 bg-gradient-to-r from-white to-gray-800 border rounded mb-2"></div>
                          <span>跟随系统</span>
                        </button>
                      </div>
                    </div>
                    
                    <div>
                      <Label>通知设置</Label>
                      <div className="space-y-3 mt-2">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">邮件通知</div>
                            <div className="text-sm text-gray-500">接收邮件通知</div>
                          </div>
                          <input
                            type="checkbox"
                            checked={accountSettings.notifications.email}
                            onChange={(e) => setAccountSettings({
                              ...accountSettings, 
                              notifications: {...accountSettings.notifications, email: e.target.checked}
                            })}
                            className="h-4 w-4"
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">推送通知</div>
                            <div className="text-sm text-gray-500">接收浏览器推送通知</div>
                          </div>
                          <input
                            type="checkbox"
                            checked={accountSettings.notifications.push}
                            onChange={(e) => setAccountSettings({
                              ...accountSettings, 
                              notifications: {...accountSettings.notifications, push: e.target.checked}
                            })}
                            className="h-4 w-4"
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">短信通知</div>
                            <div className="text-sm text-gray-500">接收短信通知</div>
                          </div>
                          <input
                            type="checkbox"
                            checked={accountSettings.notifications.sms}
                            onChange={(e) => setAccountSettings({
                              ...accountSettings, 
                              notifications: {...accountSettings.notifications, sms: e.target.checked}
                            })}
                            className="h-4 w-4"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button onClick={saveSettings}>
                        <Save className="mr-2 h-4 w-4" />
                        保存设置
                      </Button>
                      <Button variant="outline">取消</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="privacy" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Shield className="mr-2 h-5 w-5" />
                      隐私设置
                    </CardTitle>
                    <CardDescription>管理您的隐私和可见性设置</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>个人资料可见性</Label>
                      <select
                        className="w-full p-2 border rounded-md"
                        value={privacySettings.profileVisibility}
                        onChange={(e) => setPrivacySettings({...privacySettings, profileVisibility: e.target.value})}
                      >
                        <option value="all">所有人可见</option>
                        <option value="connections">仅联系人可见</option>
                        <option value="only-me">仅自己可见</option>
                      </select>
                    </div>
                    
                    <div>
                      <Label>活动可见性</Label>
                      <select
                        className="w-full p-2 border rounded-md"
                        value={privacySettings.activityVisibility}
                        onChange={(e) => setPrivacySettings({...privacySettings, activityVisibility: e.target.value})}
                      >
                        <option value="all">所有人可见</option>
                        <option value="connections">仅联系人可见</option>
                        <option value="only-me">仅自己可见</option>
                      </select>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">显示邮箱</div>
                          <div className="text-sm text-gray-500">在个人资料中显示邮箱地址</div>
                        </div>
                        <input
                          type="checkbox"
                          checked={privacySettings.showEmail}
                          onChange={(e) => setPrivacySettings({...privacySettings, showEmail: e.target.checked})}
                          className="h-4 w-4"
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">显示电话</div>
                          <div className="text-sm text-gray-500">在个人资料中显示电话号码</div>
                        </div>
                        <input
                          type="checkbox"
                          checked={privacySettings.showPhone}
                          onChange={(e) => setPrivacySettings({...privacySettings, showPhone: e.target.checked})}
                          className="h-4 w-4"
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">允许搜索</div>
                        <div className="text-sm text-gray-500">允许其他用户通过姓名或邮箱搜索到您</div>
                      </div>
                      <input
                        type="checkbox"
                        checked={privacySettings.allowSearch}
                        onChange={(e) => setPrivacySettings({...privacySettings, allowSearch: e.target.checked})}
                        className="h-4 w-4"
                      />
                    </div>
                    
                    <div className="flex gap-2">
                      <Button onClick={saveSettings}>
                        <Save className="mr-2 h-4 w-4" />
                        保存设置
                      </Button>
                      <Button variant="outline">取消</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="security" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Lock className="mr-2 h-5 w-5" />
                      安全设置
                    </CardTitle>
                    <CardDescription>管理您的账户安全设置</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">两步验证</div>
                        <div className="text-sm text-gray-500">为您的账户添加额外的安全保护</div>
                      </div>
                      <div className="flex items-center">
                        <Badge className={securitySettings.twoFactorAuth ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                          {securitySettings.twoFactorAuth ? '已启用' : '未启用'}
                        </Badge>
                        <Button variant="outline" size="sm">
                          {securitySettings.twoFactorAuth ? '管理' : '启用'}
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">登录警报</div>
                        <div className="text-sm text-gray-500">当有新登录时发送通知</div>
                      </div>
                      <input
                        type="checkbox"
                        checked={securitySettings.loginAlerts}
                        onChange={(e) => setSecuritySettings({...securitySettings, loginAlerts: e.target.checked})}
                        className="h-4 w-4"
                      />
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <div className="font-medium">会话超时</div>
                          <div className="text-sm text-gray-500">自动退出登录的时间</div>
                        </div>
                        <span>{securitySettings.sessionTimeout} 分钟</span>
                      </div>
                      <input
                        type="range"
                        min="15"
                        max="120"
                        step="15"
                        value={securitySettings.sessionTimeout}
                        onChange={(e) => setSecuritySettings({...securitySettings, sessionTimeout: parseInt(e.target.value)})}
                        className="w-full"
                      />
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">密码最后更改</div>
                          <div className="text-sm text-gray-500">上次更改密码的时间</div>
                        </div>
                        <span>{securitySettings.passwordLastChanged}</span>
                      </div>
                      <Button variant="outline" className="w-full mt-2">
                        更改密码
                      </Button>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button onClick={saveSettings}>
                        <Save className="mr-2 h-4 w-4" />
                        保存设置
                      </Button>
                      <Button variant="outline">取消</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
}
```