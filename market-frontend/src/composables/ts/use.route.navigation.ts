import {useRouter} from 'vue-router'

export function useNavigation() {
    const router = useRouter()

    const goBack = () => {
        if (window.history.length > 1) {
            router.back()
        } else {
            router.push('/')
        }
    }

    return {goBack}
}
