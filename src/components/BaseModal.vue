<template>
    <div class="modal">
        <div class="modal-content">
            <slot></slot>
            <span
                class="close"
                @click="$emit('closeModal')">
                &times;
            </span>
        </div>
    </div>
</template>
<script>
export default {
    name: "BaseModal",
    data() {
        return {};
    },
};
</script>
<style lang="scss" scoped>
.modal {
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgb(0, 0, 0);
    background-color: rgba(0, 0, 0, 0.4);

    display: flex;
    align-items: center;
    justify-content: center;
}

.modal-content {
    position: relative;
    min-width: 40vw;
    max-width: 60vw;
    max-height: 80vh;
    overflow-y: scroll;
    padding: 1.5rem 2rem;
    background-color: #fefefe;
    color: black;
    border: 1px solid #888;

    display: flex;
    justify-content: space-between;
    gap: 3rem;
}
.modal-controls {
    display: flex;
    justify-content: space-between;
    gap: 2rem;
    .submit-button {
        width: 50%;
    }
    .delete-button {
        width: 50%;
        background-color: #db4c40;
    }
}

BaseTable {
    tbody {
        tr {
            &:nth-of-type(even) {
                background-color: rgba($color: rgb(0, 255, 255), $alpha: 0.7);
            }
        }
    }
}

.close {
    width: 1em;
    height: 1em;
    position: absolute;
    top: 0;
    right: 0;
    font-size: 36px;
    font-weight: bold;
    color: #aaa;
    border-radius: 50%;
    box-sizing: border-box;

    display: flex;
    align-items: center;
    justify-content: center;
}

.close:hover,
.close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
}
</style>
