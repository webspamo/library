<template>
    <div class="main-header">
        <h2>
            <slot name="h2"></slot>
        </h2>

        <BaseButton @click="openModal('new')">
            <slot name="new"></slot>
        </BaseButton>

        <BaseModal
            @closeModal="isModalOpen = false"
            v-if="isModalOpen">
            <form
                action="#"
                class="modal-form"
                @submit="saveVisitor">
                <h3>{{ modalDetails.header }}</h3>
                <label for="">Book's title:</label>
                <input
                    type="text"
                    required
                    placeholder="The Old Man and the Sea"
                    v-model="modalDetails.title" />
                <label for="">Author:</label>
                <input
                    type="text"
                    placeholder="Ernest Hemingway"
                    v-model="modalDetails.author" />
                <label for="">Published:</label>
                <input
                    type="text"
                    pattern="[1-2][0-9]{3}"
                    minlength="4"
                    maxlength="4"
                    placeholder="1952"
                    v-model="modalDetails.year" />
                <label for="">Pages:</label>
                <input
                    type="text"
                    pattern="[1-9][0-9]{0-3}"
                    minlength="1"
                    maxlength="4"
                    placeholder="127"
                    v-model="modalDetails.pages" />
                <label for="">Amount:</label>
                <div class="modal-quantity">
                    <button
                        :disabled="modalDetails.amount === 1"
                        @click="modalDetails.amount--"
                        class="quantity-button">
                        -
                    </button>
                    <input
                        type="text"
                        pattern="\d+"
                        required
                        v-model="modalDetails.amount"
                        class="quantity-input" />
                    <button
                        @click="modalDetails.amount++"
                        class="quantity-button">
                        +
                    </button>
                </div>
                <div class="modal-controls">
                    <BaseButton
                        class="delete-button"
                        v-if="modalType === 'edit'"
                        @click="deleteVisitor()">
                        Delete
                    </BaseButton>
                    <BaseButton
                        type="submit"
                        class="submit-button">
                        {{ modalDetails.submit }}
                    </BaseButton>
                </div>
            </form>
        </BaseModal>
    </div>
</template>

<script>
import BaseButton from "./BaseButton.vue";
//import BaseTable from "./BaseTable.vue";
import BaseModal from "./BaseModal.vue";

export default {
    name: "BooksPage",

    components: {
        BaseButton,
        BaseModal,
    },

    data() {
        return {
            booksList: [],
            isModalOpen: false,
            modalType: "",
            modalDetails: {
                visitorId: null,
                header: "",
                title: "",
                author: "",
                year: "",
                pages: "",
                amount: 1,
                submit: "Save",
            },
            sortParameter: "",
            search: "",
        };
    },

    methods: {
        openModal(type, visitor = null) {
            this.isModalOpen = true;
            this.modalType = type;

            switch (type) {
                case "new":
                    {
                        this.modalDetails.header = "New book(s):";
                    }
                    break;
                case "edit":
                    {
                        this.modalDetails.header = "Edit book:";
                        this.modalDetails.visitorId = visitor.id;
                    }
                    break;
            }
        },
    },
};
</script>
<style lang="scss" scoped>
.modal-quantity {
    margin-bottom: 1.5rem;

    display: flex;
    gap: 0.5rem;
}

.quantity-button {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: none;
    background-color: lightgray;
    &:hover {
        cursor: pointer;
        background-color: rgb(185, 185, 185);
    }
}
.quantity-input {
    width: 2rem;
    text-align: center;
}
</style>
