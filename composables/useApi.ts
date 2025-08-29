// composables/useApi.ts
export const useApi = (
  endpoint: string,
  options: { headers?: Record<string, string>; [key: string]: any } = {}
) => {
  const baseURL = 'http://5.104.84.97:9001/api/'

  return $fetch(`${baseURL}${endpoint}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token') || ''}`,
      ...options.headers
    }
  })
}
