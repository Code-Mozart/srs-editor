<script>
    import TreeView from '$lib/components/tree-view.svelte'

    import items from '$lib/example-data.json'
</script>

<header>
    <input type="button" value="📄 New">
    <input type="button" value="📂 Open">
    <input type="button" value="💾 Save">
</header>

<main>
    <TreeView items={items} />
</main>

<style>
    header {
        display: flex;
        flex-direction: row;
        padding: 0;
        width: fit-content;
        border: 1px solid #aaa;
        border-radius: 0.25rem;
    }

    header > input {
        font-size: medium;

        padding: 0.5rem 1rem;

        background-color: white;
        border: 1px solid white;
        border-radius: 0.25rem;
    }
    header > input:hover {
        background-color: #eee;
        border-color: #aaa;
    }
    header > input:active {
        border-color: black;
        background-color: #aaa;
    }

    main {
        height: 100%;
    }
</style>
