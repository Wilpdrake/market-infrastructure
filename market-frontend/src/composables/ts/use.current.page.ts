import {computed} from 'vue';

export function currentPage(bcData: any) {

    const currentLabel = computed(() => bcData.breadcrumbs.value?.[0]?.label || '');
    const currentPath = computed(() => bcData.breadcrumbs.value?.[0]?.path || '');

    return {
        currentLabel, currentPath
    };
}
