/**
 * A composable that can be used in a component. It will fetch data and is SSR compatible.
 * On the client side, it will then start an interval to refetch the data every `intervalDuration` seconds (defaults to 60 seconds).
 * When the tab is not visible, the interval will pause and resume when the tab is visible again.
 *
 * @param url API url to fetch
 * @param intervalDuration Interval duration in seconds
 * @returns An object containing the fetched data, error, fetchData function, clearFetchInterval function, and startInterval function
 */
export const useFetchData = <T>(url: string, intervalDuration = 60) => {
  // Set variables
  const data = ref<T | null>(null)
  const error = ref<Error | null>(null)
  const interval = ref<NodeJS.Timeout | null>(null)

  // Fetch data function
  const fetchData = async () => {
    try {
      const response = await useFetch(url)
      data.value = response.data.value as T
    } catch (err) {
      error.value = err
    }
  }

  // Interval management
  const startInterval = () => {
    if (interval.value) clearInterval(interval.value)
    interval.value = setInterval(fetchData, intervalDuration * 1000)
  }

  const clearFetchInterval = () => {
    if (interval.value) clearInterval(interval.value)
    interval.value = null
  }

  // Attach to visibility of document (tab focus)
  const handleVisibilityChange = () => {
    if (document.visibilityState === 'visible') {
      // If tab is visible, fetch data and start interval
      fetchData()
      startInterval()
    } else {
      // If tab is not visible, clear interval (pause background refreshes)
      clearFetchInterval()
    }
  }

  // Lifecycle hooks - automatically attaches to the component lifecycle
  const initialFetch = async () => {
    await fetchData()
    if (process.client) {
      startInterval()
      document.addEventListener('visibilitychange', handleVisibilityChange)
    }
  }

  onMounted(() => {
    // This is the initial, client-side fetch that causes any stale data by ISR to be refetched. This doesn't cause any additional load due to the caching strategy on the route.
    if (process.client) {
      fetchData()
    }
  })

  onUnmounted(() => {
    clearFetchInterval()
    if (process.client) {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  })

  // Return values
  return { data, error, initialFetch, clearFetchInterval, startInterval }
}
