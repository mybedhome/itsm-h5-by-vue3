import { defineStore } from 'pinia'
import { reactive } from 'vue'
export const usePermissionsStore = defineStore('permissions', () => {
  const permissions = reactive<string[]>([])
  function setPermissions(data: string[]) {
    permissions.push(...data)
  }
  function hasPermission(permission: string) {
    return permissions.includes(permission)
  }
  return { permissions, setPermissions, hasPermission }
})
