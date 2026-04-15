import { useEffect, useState } from "react"

/**
 * Local Storage Custom Hook
 * @param {String} key
 * @param {any} initialValue 
 */
function useLocalStorage(key, initialValue) {
    /**
     * fitur
     * 1. Ambil data dari local storage => localStorage.getItem
     * 2. Update local storage apabila ada perubahan pada data => localStorage.setItem
     * 3. Hapus local storage (clear/remove)
     */
    const [data, setData] = useState(() => {
        const localData = localStorage.getItem(key)
        if (!localData) {
            if (typeof initialValue === "function") return initialValue()
            return initialValue
        }
        return JSON.parse(localData)
    })
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(data))
    }, [key, data])
    const removeLocalData = () => {
        localStorage.removeItem(key)
        setData(typeof initialValue === "function" ? initialValue() : initialValue)
    }
    return [data, setData, removeLocalData]
}

export default useLocalStorage


