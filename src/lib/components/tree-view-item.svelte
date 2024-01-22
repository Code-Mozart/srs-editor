<script>
    export let item
    export let isSelected = false
    export let depth = 0
</script>

<li>
    {#if item.children && Object.entries(item.children).length > 0}
        <details>
            <summary
                class:selected={isSelected}
            >
                <span
                    class="marker"
                    style="margin-left: calc(1rem * {depth} + 0.5rem);"
                />
                <span
                    class="leaf"
                    on:click|preventDefault
                    on:keydown
                    role="treeitem"
                    tabindex="0"
                    aria-selected={isSelected}
                >
                    {item.name}
                </span>
            </summary>

            <slot />
        </details>
    {:else}
        <span
            class="leaf"
            class:selected={isSelected}
            on:click
            on:keydown
            role="treeitem"
            tabindex="0"
            aria-selected={isSelected}
            style="margin-left: calc(1rem * {depth});"
        >
            {item.name}
        </span>
    {/if}
</li>

<style>
    li {
        margin: 0;
        padding: 0;
        display: flex;
        width: 100%;
    }
    .selected {
        background-color: #aaa;
    }
    details, .leaf {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
    }
    .leaf {
        cursor: default;
        user-select: none;
        padding: 0.5rem;
        padding-left: 2rem;
        width: 100%;
        list-style-type: none;
    }
    details > * {
        padding: 0.5rem;
        width: 100%;
    }
    summary {
        padding: 0;
    }
    summary > span {
        display: inline-block;
        width: 100%;
    }
    summary > span.marker {
        display: inline-block;
        padding: 0;
        margin: auto 0.5rem;
        width: 1rem;
        font-size: smaller;
        cursor: pointer;
    }
    details > summary > span.marker::before {
        content: '▶';
    }
    details[open] > summary > span.marker::before {
        content: '▼';
    }
    summary {
        display: flex;
        align-items: start;
    }
    summary > span.leaf {
        padding-left: 0rem;
    }
</style>