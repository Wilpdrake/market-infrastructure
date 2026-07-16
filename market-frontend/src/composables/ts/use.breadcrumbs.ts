import {computed} from 'vue'
import {type RouteLocationMatched, useRoute} from 'vue-router'

interface Breadcrumb {
    label: string
    path: string
}

export function useBreadcrumbs() {
    const route = useRoute()

    const breadcrumbs = computed<Breadcrumb[]>(() => {

        const matched = route.matched.filter((record): record is RouteLocationMatched & {
            meta: { breadcrumbs: string }
        } => Boolean(record.meta && record.meta.breadcrumbs))

        return matched.map((record) => ({
            label: record.meta.breadcrumbs, path: record.path || '/',
        }))
    })

    return {breadcrumbs}
}