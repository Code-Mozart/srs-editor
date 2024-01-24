<script>
    import TreeViewItems from '$lib/components/tree-view-items.svelte'
    import { t } from '$lib/translations'

    export let items

    function loadItems(itemMap, parent = null) {
        let rootItems = []
        let allItems = []
        Object.entries(itemMap).forEach(([key, mapItem]) => {
            const item = {
                parent,
                key,
                name: mapItem.name,
                children: [],
                isOpen: false,
            }
            rootItems = [...rootItems, item]

            const {rootItems: children, allItems: allChildren} = loadItems(mapItem.children, item)
            item.children = children
            allItems = [...allItems, item, ...allChildren]
        })

        return {
            rootItems,
            allItems,
        }
    }

    const {rootItems, allItems} = loadItems(items)

    let selectedItemIndex = null
    $: selectedItem = selectedItemIndex !== null ? allItems[selectedItemIndex] : null

    /**
     * Rotates backwards through the list of items by 1.
     */
     function selectPreviousItem() {
        if (selectedItemIndex === null) {
            selectedItemIndex = 0
            return
        }
        
        const parent = selectedItem.parent
        const indexInParent = parent?.children?.indexOf(selectedItem) ?? -1
        if (indexInParent > 0) {
            const previousInParent = parent.children[indexInParent - 1]
            selectedItemIndex = allItems.indexOf(previousInParent)
        } else if (parent !== null) {
            selectedItemIndex = allItems.indexOf(parent)
        }
    }

    /**
     * Rotates forwards through the list of items by 1.
     */
    function selectNextItem() {
        if (selectedItemIndex === null) {
            selectedItemIndex = 0
            return
        }

        const parent = selectedItem.parent
        if (parent === null) {
            return
        }

        const indexInParent = parent.children.indexOf(selectedItem)
        if (indexInParent < parent.children.length - 1) {
            const nextInParent = parent.children[indexInParent + 1]
            selectedItemIndex = allItems.indexOf(nextInParent)
            return
        }
        
        for (let grandParent = parent.parent; grandParent !== null; grandParent = grandParent.parent) {
            const parentIndexInGrandParent = grandParent.children.indexOf(parent)

            if (parentIndexInGrandParent < grandParent.children.length - 1) {
                const nextInGrandParent = grandParent.children[parentIndexInGrandParent + 1]
                selectedItemIndex = allItems.indexOf(nextInGrandParent)
                return
            }
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

    function handleClick(event) {
        const { item } = event.detail
        selectedItemIndex = allItems.indexOf(item)
    }

    function handleClickInVoid(event) {
        selectedItemIndex = null
    }

    function handleToggle(event) {
        const { item, isOpen } = event.detail
        item.isOpen = isOpen

        if (!isOpen && selectedItem !== null) {
            deselectOnParentCollapse(item)
        }
    }

    /**
     * Deselects the currently selected item if any of its ancestor items are collapsed.
     */
    function deselectOnParentCollapse(parent) {
        for (let ancestor = selectedItem.parent; ancestor !== null; ancestor = ancestor.parent) {
            if (ancestor === parent) {
                selectedItemIndex = null
                break
            }
        }
    }
</script>

<div class="tree-view">
    <h2>{$t('common.tree-view.title')}</h2>
    <div
        class="tree-view-content"
        tabindex="0"
        role="tree"
        on:click={handleClickInVoid}
        on:keydown={handleKeyDown}
    >
        <TreeViewItems
            items={rootItems}
            {selectedItem}
            on:itemclick={handleClick}
            on:itemtoggle={handleToggle}
        />
    </div>
    <p class="status">Selected: <i>{selectedItem?.name || "None"}</i></p>
</div>

<style>
    .tree-view {
        display: flex;
        flex-direction: column;
        height: 100%;
    }
    .tree-view-content {
        flex: 1;
    }
    .status {
        flex: 0;
    }
</style>
