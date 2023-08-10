import { useCallback, useEffect, useState } from "react"

export interface UseSessionStorageOpts {
  sync?: boolean
}

export type SetSessionStorageValue<T> = T | ((prevValue: T) => T)
export type RemoveSessionStorageValue<T> = () => void
export type SetSessionStorage<T> = (value: SetSessionStorageValue<T>) => void
export function useSessionStorage<T>(
  key: string,
  initialValue: T,
  { sync }: UseSessionStorageOpts = {}
): [
  T,
  { setValue: SetSessionStorage<T>; removeValue: RemoveSessionStorageValue<T> }
] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    let result: T
    try {
      const item = window.sessionStorage.getItem(key)
      result = item ? JSON.parse(item) : initialValue
    } catch {
      result = initialValue
    }

    return result
  })

  const setValue = (valueOrCb: SetSessionStorageValue<T>) => {
    setStoredValue(valueOrCb)
    const valueToStore =
      valueOrCb instanceof Function ? valueOrCb(storedValue) : valueOrCb

    console.log({ valueToStore })

    try {
      window.sessionStorage.setItem(key, JSON.stringify(valueToStore))
    } catch {
      console.warn(`Could not save ${key} to SessionStorage`)
    }
  }

  const onStorage = useCallback(
    (event: StorageEvent) => {
      if (event.key !== key) return

      try {
        const item = event.newValue
        if (item) {
          // @todo: should we validate the value here?
          setStoredValue(JSON.parse(item) as T)
        }
      } catch {
        console.warn(`Could not update value for ${key}`)
      }
    },
    [key]
  )

  const removeValue = () => {
    try {
      window.sessionStorage.removeItem(key)
    } catch {
      console.warn(`Could not remove ${key} from SessionStorage`)
    }
  }

  useEffect(() => {
    if (sync) {
      window.addEventListener("storage", onStorage)

      return () => {
        window.removeEventListener("storage", onStorage)
      }
    }
    return undefined
  }, [onStorage, sync])

  return [storedValue, { setValue, removeValue }]
}
