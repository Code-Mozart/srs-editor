<script>
    import { t } from '$lib/translations'

    export let item
    
    let boundItem = {
        name: '',
        content: '',
    }

    $: updateItem(item)

    $: console.log('item', item)
    $: console.log('boundItem', boundItem)

    function updateItem(item) {
        if (item === null) {
            return
        }

        boundItem.name = item.name
        boundItem.content = item.content
    }

    function isNameValid() {
        return boundItem.name.length > 0
    }

    function handleNameChange() {
        if (isNameValid()) {
            item.name = boundItem.name
        }
    }
</script>

<div class="editor">
    <h2>{$t('common.editor.title')}</h2>
    {#if item === null}
        <p class="nothing-selected">{$t('common.editor.nothing-selected')}</p>
    {:else}
        <div class="editor-content">
            <div class="field">
                <p>{$t('common.editor.item-name')}</p>
                <input
                    type="text"
                    name="item-name"
                    placeholder="{$t('common.editor.item-name')}"
                    bind:value={boundItem.name}
                    on:input={handleNameChange}
                    required
                    minlength="1"
                />
            </div>
            <div class="field main-content">
                <p>{$t('common.editor.item-content')}</p>
                <textarea
                    name="item-content"
                    placeholder="{$t('common.editor.item-content')}"
                    bind:value={boundItem.content}
                ></textarea>
            </div>
        </div>
    {/if}
</div>

<style>
    .editor {
        display: flex;
        flex-direction: column;
        height: 100%;
    }

    .nothing-selected {
        color: var(--color-weaker);
        font-style: italic;
    }

    .editor-content {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        flex: 1;
    }

    .field {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .field > p {
        margin: 0;
    }

    input {
        color: inherit;
        background-color: inherit;

        font: inherit;
        padding: 0.5rem;
        border: 1px solid #aaa;
        border-radius: 0.25rem;
    }

    input:invalid {
        border-color: red;
    }

    input:invalid:focus {
        outline-color: red;
    }

    .main-content {
        flex: 1;
    }

    textarea {
        color: inherit;
        background-color: inherit;

        font: inherit;
        padding: 0.5rem;
        border: 1px solid #aaa;
        border-radius: 0.25rem;

        min-height: 1rem;
        flex: 1;
        resize: none;
    }
</style>
