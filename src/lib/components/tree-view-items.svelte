<script>
    import TreeViewItem from '$lib/components/tree-view-item.svelte'

    export let items
    export let selectedItemKey
    export let depth = 0

    const keys = Object.keys(items)

    /**
     * Rotates backwards through the list of items by 1.
     */
    function selectPreviousItem() {
        const index = keys.indexOf(selectedItemKey)
        if (index === -1) {
            selectedItemKey = keys[keys.length - 1]
        } else if (index > 0) {
            selectedItemKey = keys[index - 1]
        }
    }

    /**
     * Rotates forwards through the list of items by 1.
     */
    function selectNextItem() {
        const index = keys.indexOf(selectedItemKey)
        if (index === -1) {
            selectedItemKey = keys[0]
        } else if (index < keys.length - 1) {
            selectedItemKey = keys[index + 1]
        }
    }

    function handleKeyDown(event) {
        switch (event.key) {
            case 'ArrowUp':
                selectPreviousItem()
                break
            case 'ArrowDown':
                selectNextItem()
                break
            default:
                break
        }
    }

    function handleClick(key) {
        selectedItemKey = key
    }
</script>

<ul>
    {#each Object.entries(items) as [key, item]}
        <TreeViewItem 
            {item}
            isSelected={selectedItemKey === key} 
            {depth}
            on:click={handleClick(key)}
            on:keydown={handleKeyDown}
        >
            {#if item.children && Object.entries(item.children).length > 0}
                <svelte:self
                    items={item.children}
                    selectedItemKey={selectedItemKey}
                    depth={depth + 1}
                />
            {/if}
        </TreeViewItem>
    {/each}
</ul>

<style>
    ul {
        list-style: none;
        padding-left: 0;
    }
</style>