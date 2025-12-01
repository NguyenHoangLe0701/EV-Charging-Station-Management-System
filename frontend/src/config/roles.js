// Role & Permission Configuration
// Hệ thống quản lý vai trò và quyền linh hoạt

export const ROLES = {
  ADMIN: 'ADMIN',
  MANAGER: 'MANAGER',
  OPERATOR: 'OPERATOR',
  USER: 'USER',
  DRIVER: 'DRIVER',
};

// Permissions cho từng module
export const PERMISSIONS = {
  // Dashboard
  VIEW_DASHBOARD: 'VIEW_DASHBOARD',
  
  // Stations
  VIEW_STATIONS: 'VIEW_STATIONS',
  CREATE_STATIONS: 'CREATE_STATIONS',
  EDIT_STATIONS: 'EDIT_STATIONS',
  DELETE_STATIONS: 'DELETE_STATIONS',
  
  // Users
  VIEW_USERS: 'VIEW_USERS',
  CREATE_USERS: 'CREATE_USERS',
  EDIT_USERS: 'EDIT_USERS',
  DELETE_USERS: 'DELETE_USERS',
  
  // Sessions
  VIEW_SESSIONS: 'VIEW_SESSIONS',
  MANAGE_SESSIONS: 'MANAGE_SESSIONS',
  
  // Payments
  VIEW_PAYMENTS: 'VIEW_PAYMENTS',
  MANAGE_PAYMENTS: 'MANAGE_PAYMENTS',
  
  // Reports
  VIEW_REPORTS: 'VIEW_REPORTS',
  EXPORT_REPORTS: 'EXPORT_REPORTS',
  
  // Settings
  VIEW_SETTINGS: 'VIEW_SETTINGS',
  MANAGE_SETTINGS: 'MANAGE_SETTINGS',
  
  // Packages
  VIEW_PACKAGES: 'VIEW_PACKAGES',
  MANAGE_PACKAGES: 'MANAGE_PACKAGES',
};

// Role-based permissions mapping
export const ROLE_PERMISSIONS = {
  [ROLES.ADMIN]: [
    // Admin có tất cả quyền
    ...Object.values(PERMISSIONS),
  ],
  
  [ROLES.MANAGER]: [
    PERMISSIONS.VIEW_DASHBOARD,
    PERMISSIONS.VIEW_STATIONS,
    PERMISSIONS.EDIT_STATIONS,
    PERMISSIONS.VIEW_USERS,
    PERMISSIONS.VIEW_SESSIONS,
    PERMISSIONS.MANAGE_SESSIONS,
    PERMISSIONS.VIEW_PAYMENTS,
    PERMISSIONS.VIEW_REPORTS,
    PERMISSIONS.EXPORT_REPORTS,
    PERMISSIONS.VIEW_PACKAGES,
    PERMISSIONS.EDIT_STATIONS,
  ],
  
  [ROLES.OPERATOR]: [
    PERMISSIONS.VIEW_DASHBOARD,
    PERMISSIONS.VIEW_STATIONS,
    PERMISSIONS.VIEW_SESSIONS,
    PERMISSIONS.MANAGE_SESSIONS,
    PERMISSIONS.VIEW_PAYMENTS,
  ],
  
  [ROLES.USER]: [
    PERMISSIONS.VIEW_STATIONS,
  ],
  
  [ROLES.DRIVER]: [
    PERMISSIONS.VIEW_STATIONS,
    PERMISSIONS.VIEW_SESSIONS,
  ],
};

// Menu items với permissions
export const MENU_ITEMS = [
  {
    id: 'dashboard',
    icon: 'fas fa-tachometer-alt',
    text: 'Tổng quan',
    path: '/admin',
    permission: PERMISSIONS.VIEW_DASHBOARD,
    roles: [ROLES.ADMIN, ROLES.MANAGER, ROLES.OPERATOR],
  },
  {
    id: 'stations',
    icon: 'fas fa-charging-station',
    text: 'Quản lý trạm',
    path: '/admin/stations',
    permission: PERMISSIONS.VIEW_STATIONS,
    roles: [ROLES.ADMIN, ROLES.MANAGER, ROLES.OPERATOR],
  },
  {
    id: 'sessions',
    icon: 'fas fa-plug',
    text: 'Phiên sạc',
    path: '/admin/sessions',
    permission: PERMISSIONS.VIEW_SESSIONS,
    roles: [ROLES.ADMIN, ROLES.MANAGER, ROLES.OPERATOR],
  },
  {
    id: 'users',
    icon: 'fas fa-users',
    text: 'Người dùng',
    path: '/admin/users',
    permission: PERMISSIONS.VIEW_USERS,
    roles: [ROLES.ADMIN, ROLES.MANAGER],
  },
  {
    id: 'payments',
    icon: 'fas fa-credit-card',
    text: 'Thanh toán',
    path: '/admin/payments',
    permission: PERMISSIONS.VIEW_PAYMENTS,
    roles: [ROLES.ADMIN, ROLES.MANAGER, ROLES.OPERATOR],
  },
  {
    id: 'packages',
    icon: 'fas fa-box',
    text: 'Gói dịch vụ',
    path: '/admin/packages',
    permission: PERMISSIONS.VIEW_PACKAGES,
    roles: [ROLES.ADMIN, ROLES.MANAGER],
  },
  {
    id: 'reports',
    icon: 'fas fa-chart-line',
    text: 'Báo cáo',
    path: '/admin/reports',
    permission: PERMISSIONS.VIEW_REPORTS,
    roles: [ROLES.ADMIN, ROLES.MANAGER],
  },
  {
    id: 'revenue',
    icon: 'fas fa-dollar-sign',
    text: 'Doanh thu',
    path: '/admin/revenue',
    permission: PERMISSIONS.VIEW_REPORTS,
    roles: [ROLES.ADMIN, ROLES.MANAGER],
  },
  {
    id: 'settings',
    icon: 'fas fa-cog',
    text: 'Cài đặt',
    path: '/admin/settings',
    permission: PERMISSIONS.VIEW_SETTINGS,
    roles: [ROLES.ADMIN],
  },
];

// Helper functions
export const hasPermission = (userRole, permission) => {
  const rolePermissions = ROLE_PERMISSIONS[userRole] || [];
  return rolePermissions.includes(permission);
};

export const hasAnyPermission = (userRole, permissions) => {
  return permissions.some(permission => hasPermission(userRole, permission));
};

export const hasAllPermissions = (userRole, permissions) => {
  return permissions.every(permission => hasPermission(userRole, permission));
};

export const getMenuItemsForRole = (userRole) => {
  return MENU_ITEMS.filter(item => 
    item.roles.includes(userRole) || 
    hasPermission(userRole, item.permission)
  );
};

export const getRoleDisplayName = (role) => {
  const roleNames = {
    [ROLES.ADMIN]: 'Quản trị viên',
    [ROLES.MANAGER]: 'Quản lý',
    [ROLES.OPERATOR]: 'Vận hành',
    [ROLES.USER]: 'Người dùng',
    [ROLES.DRIVER]: 'Tài xế',
  };
  return roleNames[role] || role;
};

export const getRoleColor = (role) => {
  const roleColors = {
    [ROLES.ADMIN]: '#ef4444',
    [ROLES.MANAGER]: '#f59e0b',
    [ROLES.OPERATOR]: '#3b82f6',
    [ROLES.USER]: '#64748b',
    [ROLES.DRIVER]: '#10b981',
  };
  return roleColors[role] || '#64748b';
};

