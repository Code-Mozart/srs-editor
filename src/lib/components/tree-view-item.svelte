<script>
    export let item
    export let isSelected = false
    export let depth = 0
</script>

<li>
    {#if item.children && Object.entries(item.children).length > 0}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
        <!-- Ignoring the warnings, as we only supress the propagation -->
        <details
            on:toggle
            bind:open={item.isOpen}
            on:click|stopPropagation
        >
            <summary
                class:selected={isSelected}
            >
                <span
                    class="marker"
                    style="margin-left: calc(1rem * {depth});"
                >▶</span>
                <span
                    class="branch"
                    on:click|preventDefault|stopPropagation
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
            on:click|stopPropagation
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
    summary, .leaf {
        background-color: white;
        border: 1px solid white;
        border-radius: 0.25rem;
    }
    .selected {
        background-color: #eee;
        border-color: #aaa;
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
</style>