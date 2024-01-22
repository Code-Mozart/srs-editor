<script>
    import TreeView from '$lib/components/tree-view.svelte'

    import items from '$lib/example-data.json'
</script>

<main>
    <TreeView items={items} />
</main>

<style>
    main {
        height: 100%;
    }
</style>
