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
                @submit="saveCard">
                <h3>{{ modalDetails.header }}</h3>
                <div class="content-container">
                    <div class="content-visitor">
                        <label>
                            Search Visitor:
                            <input
                                type="search"
                                required
                                v-model="search" />
                        </label>

                        <BaseTable :entries="booksList">
                            <template #thead>
                                <th>VISITOR</th>
                            </template>
                            <template #tbody>
                                <tr
                                    v-for="visitor in visitorsList"
                                    :key="visitor">
                                    <td class="table-cell">
                                        {{ visitor.name }}
                                    </td>
                                </tr>
                            </template>
                        </BaseTable>
                    </div>
                    <div class="content-book">
                        <label>
                            Search Book:
                            <input
                                type="search"
                                required
                                v-model="search" />
                        </label>

                        <BaseTable :entries="booksList">
                            <template #thead>
                                <th>BOOK</th>
                            </template>
                            <template #tbody>
                                <tr
                                    v-for="book in booksList"
                                    :key="book">
                                    <td class="table-cell">{{ book.title }}</td>
                                </tr>
                            </template>
                        </BaseTable>
                    </div>
                </div>
                <div class="modal-controls">
                    <BaseButton
                        class="delete-button"
                        v-if="modalType === 'edit'"
                        @click="deleteCard()">
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

    <hr />
    <div class="options">
        <div class="option">
            <label for="parameters">Sort by:</label>
            <select
                name="parameters"
                id="parameters"
                v-model="sortParameter">
                <option value="id">ID</option>
                <option value="title">TITLE</option>
                <option value="author">AUTHOR</option>
                <option value="language">LANGUAGE</option>
                <option value="year">YEAR</option>
            </select>
            <BaseButton @click="sortBooksBy(sortParameter)">Sort</BaseButton>
        </div>
        <div class="option">
            <label for="">Search:</label>
            <input
                type="search"
                v-model="search" />
            <BaseButton>Search</BaseButton>
        </div>
    </div>

    <BaseTable
        v-if="cardsList.length !== 0"
        :entries="cardsList">
        <template #thead>
            <th>ID</th>
            <th>VISITOR</th>
            <th>BOOK</th>
            <th>BORROW DATE</th>
            <th>RETURN DATE</th>
            <th>EDIT</th>
        </template>
        <template #tbody>
            <tr
                v-for="card in filteredcardsList"
                :key="card">
                <td>{{ card.id }}</td>
                <td>{{ card.name }}</td>
                <td>{{ card.phone }}</td>
                <td>
                    <svg-icon
                        type="mdi"
                        :path="path"
                        class="table-icon"
                        @click="openModal('edit', card)"></svg-icon>
                </td>
            </tr>
        </template>
    </BaseTable>
</template>
<script>
import SvgIcon from "@jamescoyle/vue-icon";
import BaseButton from "./BaseButton.vue";
import BaseTable from "./BaseTable.vue";
import BaseModal from "./BaseModal.vue";

export default {
    name: "CardsPage",
    components: {
        BaseButton,
        BaseTable,
        BaseModal,
        SvgIcon,
    },
    props: {},
    data() {
        return {
            booksList: [],
            visitorsList: [],
            cardsList: [],
            isModalOpen: false,
            modalType: "",
            modalDetails: {
                visitorId: null,
                header: "",
                name: "",
                phone: "",
                submit: "Save",
            },
            sortParameter: "",
            search: "",
        };
    },
    computed: {
        filteredCardsList() {
            //edit .....
            return this.cardsList.filter((cards) => {
                return (
                    cards.name
                        .toLowerCase()
                        .indexOf(this.search.toLowerCase()) !== -1 ||
                    cards.phone.indexOf(this.search) !== -1
                );
            });
        },
    },
    methods: {
        saveCard() {},
        openModal(type, visitor = null) {
            //edit .......................
            this.isModalOpen = true;
            this.modalType = type;

            switch (type) {
                case "new":
                    {
                        this.modalDetails.header = "New card:";
                        this.modalDetails.asideHeader = "Search book:";
                    }
                    break;
                case "edit":
                    {
                        this.modalDetails.header = "Edit card:";
                        this.modalDetails.visitorId = visitor.id;
                        this.modalDetails.name = visitor.name;
                        this.modalDetails.phone = visitor.phone;
                    }
                    break;
            }
        },
        deleteCard() {
            //edit .......................
            const visitorIndex = this.cardsList.findIndex(
                (visitor) => visitor.id === this.modalDetails.visitorId
            );
            this.cardsList.splice(visitorIndex, 1);

            this.modalDetails.name = "";
            this.modalDetails.phone = "";

            this.isModalOpen = false;
        },
        sortCardsBy(parameter) {
            //edit .......................
            switch (parameter) {
                case "name":
                    {
                        this.cardsList.sort((a, b) => {
                            const nameA = a[parameter].toUpperCase();
                            const nameB = b[parameter].toUpperCase();
                            if (nameA < nameB) {
                                return -1;
                            }
                            if (nameA > nameB) {
                                return 1;
                            }
                            return 0;
                        });
                    }
                    break;
                case "id":
                    {
                        this.cardsList.sort(
                            (a, b) => a[parameter] - b[parameter]
                        );
                    }
                    break;
            }
        },
    },
    mounted() {
        if (localStorage.getItem("books")) {
            this.booksList = JSON.parse(localStorage.getItem("books"));
        }
        if (localStorage.getItem("visitors")) {
            this.visitorsList = JSON.parse(localStorage.getItem("visitors"));
        }
    },
};
</script>
<style lang="scss" scoped>
.table-wrapper {
    max-height: 400px;
    &::-webkit-scrollbar-track-piece:start {
        background: transparent;
        margin-top: 3rem;
    }
    :deep(th),
    :deep(td) {
        padding: 0.8rem;
    }
}

.content {
    &-container {
        margin-bottom: 2rem;

        display: flex;
        gap: 1rem;

        & > * {
            label {
                margin-bottom: 0.4rem;
                font-weight: 700;
            }

            input {
                margin-bottom: 1.5rem;
            }
        }
        .table-cell {
            cursor: pointer;
            &:hover {
                background-color: rgba(0, 0, 0, 0.1);
            }
        }
    }

    &-visitor {
    }

    &-book {
    }
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

.table {
    &-icon {
        cursor: pointer;
    }
}
</style>
