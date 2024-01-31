<script>
    import TreeView from '$lib/components/tree-view.svelte'

    import Editor from '$lib/components/editor.svelte'
    import items from '$lib/example-data.json'

    let selectedItem = null
</script>

<header>
    <input type="button" value="📄 New">
    <input type="button" value="📂 Open">
    <input type="button" value="💾 Save">
</header>

<main>
    <div class="tree-view">
        <TreeView items={items} bind:selectedItem={selectedItem} />
    </div>
    <div class="editor">
        <Editor bind:item={selectedItem} />
    </div>
</main>

<style>
    header {
        display: flex;
        flex-direction: row;
        padding: 0;
        width: fit-content;
        border: 1px solid var(--border-color-highlighted);
        border-radius: 0.25rem;
    }

    header > input {
        font-size: medium;

        padding: 0.5rem 1rem;

        color: inherit;
        background-color: var(--bg-color);
        border: 1px solid var(--bg-color);
        border-radius: 0.25rem;
    }
    header > input:hover {
        background-color: var(--bg-color-highlighted);
        border-color: var(--border-color-highlighted);
    }
    header > input:active {
        background-color: var(--bg-color-active);
        border-color: var(--border-color-active);
    }

    main {
        height: 100%;
        display: flex;
        gap: 2rem;
    }

    div.tree-view {
        flex: 1;
    }

    div.editor {
        flex: 3;
    }
</style>
