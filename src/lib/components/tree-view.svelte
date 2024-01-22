<script>
    import TreeViewItems from '$lib/components/tree-view-items.svelte'
    import { t } from '$lib/translations'

    export let items
    export let selectedItemKey = null
</script>

<h2>{$t('common.tree-view.title')}</h2>
<TreeViewItems {items} {selectedItemKey}/>
