import { useCallback, useEffect, useRef, useState } from 'react'

const INITIAL_STATE = {
  data: null,
  error: null,
  isLoading: true,
  isEmpty: false
}

/**
 * Generic async read hook that guarantees every API-driven view has a
 * loading / error / empty / success state.
 *
 * @param {Function} loader     Async function returning the resource.
 * @param {Array}    deps       Dependency list controlling re-fetch.
 * @param {Function} pickEmpty  Optional predicate deciding the empty state.
 */
export default function useAsyncResource(loader, deps = [], pickEmpty) {
  const [state, setState] = useState(INITIAL_STATE)
  const requestIdRef = useRef(0)
  const loaderRef = useRef(loader)
  loaderRef.current = loader

  const execute = useCallback(async () => {
    const requestId = requestIdRef.current + 1
    requestIdRef.current = requestId
    setState((current) => ({ ...current, isLoading: true, error: null }))

    try {
      const data = await loaderRef.current()
      if (requestIdRef.current !== requestId) return

      const isEmpty = pickEmpty
        ? pickEmpty(data)
        : Array.isArray(data)
          ? data.length === 0
          : data == null

      setState({ data, error: null, isLoading: false, isEmpty })
    } catch (error) {
      if (requestIdRef.current !== requestId) return
      setState({ data: null, error, isLoading: false, isEmpty: true })
    }
  }, [pickEmpty])

  useEffect(() => {
    execute()
    return () => {
      // Invalidate any in-flight response when deps change or on unmount.
      requestIdRef.current += 1
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return { ...state, refetch: execute }
}
