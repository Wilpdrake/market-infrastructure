import {onMounted, type Ref, ref} from 'vue'

/**
 * Toggle theme between light and dark
 * @returns An object with the current theme and a function to toggle the theme
 */
export function useToggleTheme(): {
    theme: Ref<string>
    toggleTheme: () => void
} {
    const defaultTheme = 'dark'
    const theme = ref<string>(localStorage.getItem('theme') || defaultTheme)

    const setTheme = (val: string): void => {
        theme.value = val
        localStorage.setItem('theme', val)

        if (val === 'dark') {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }

    const toggleTheme = (): void => {
        const nextTheme = theme.value === 'dark' ? 'light' : 'dark'
        setTheme(nextTheme)
    }

    onMounted(() => {
        setTheme(theme.value)
    })

    return {theme, toggleTheme}
}