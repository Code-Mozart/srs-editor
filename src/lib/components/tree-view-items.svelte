<script>
    import TreeViewItem from '$lib/components/tree-view-item.svelte'
    import { createEventDispatcher } from 'svelte'
    
    export let items
    export let selectedItem
    export let depth = 0

    const dispatch = createEventDispatcher()

    function handleToggle(event, item) {
        const isOpen = event.newState === 'open'
        dispatch('itemtoggle', {item, isOpen})
    }
</script>

<ul>
    {#each items as item}
        <!-- use the div to eventually add animations -->
        <div
            class="entry"
        >
            <TreeViewItem
                item={selectedItem === item ? selectedItem : item}
                isSelected={selectedItem === item}
                {depth}
                on:click={dispatch('itemclick', {item})}
                on:toggle={(event) => handleToggle(event, item) }
            >
                {#if item.children && Object.entries(item.children).length > 0}
                    <svelte:self
                        items={item.children}
                        {selectedItem}
                        depth={depth + 1}
                        on:itemclick
                        on:itemtoggle
                    />
                {/if}
            </TreeViewItem>
        </div>
    {/each}
</ul>

<style>
    ul {
        list-style: none;
        padding: 0;
        margin: 0;
    }
</style>