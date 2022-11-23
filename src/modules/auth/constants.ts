/**
 * @description:
 * @author: pengrenchang
 * @Date: 2022-11-16 16:24:38
 * @LastEditors: pengrenchang
 * @LastEditTime: 2022-11-23 16:14:52
 */
export const jwtConstants = {
    secret: "shinobi7414"
};

export const ROLE_CONSTANTS = {
    SUPER_ADMIN: 0, // 超级管理员
    ADMIN: 1, // 管理员
    DEVELOPER: 2, // 开发者（测试、运营具有同一权限，若提升为 RBAC 1 以上，则可酌情分开）
    HUMAN: 3 // 普通用户
};
