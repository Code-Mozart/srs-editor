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
                    style="margin-left: calc(1rem * {depth});"
                >▶</span>
                <span
                    class="branch"
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
            style="padding-left: calc(1rem * {depth} + 2rem);"
        >
            {item.name}
        </span>
    {/if}
</li>

<style>
    li {
        margin: 0;
        width: 100%;
        display: flex;
    }
    .selected {
        background-color: #aaa;
    }

    span {
        user-select: none;
        display: inline-block;
    }

    .branch, .leaf {
        padding: 0.5rem;
        width: calc(100% - 2rem);
        cursor: default;
    }

    .marker {
        padding: 0.5rem;
        padding-right: 0;
        width: 1rem;
        font-size: small;

        transition: transform 200ms;
    }

    details[open] > summary > .marker {
        transform: rotate(90deg);
    }

    details {
        width: 100%;
    }

    summary {
        display: flex;
        align-items: center;
        list-style-type: none;
        cursor: pointer;
    }





/* 
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
    } */
</style>