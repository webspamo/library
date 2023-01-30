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
                @submit="saveBook">
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
                    required
                    placeholder="Ernest Hemingway"
                    v-model="modalDetails.author" />
                <label for="">Language:</label>
                <input
                    type="text"
                    required
                    placeholder="English"
                    v-model="modalDetails.language" />
                <label for="">Published:</label>
                <input
                    type="text"
                    required
                    pattern="[1-2][0-9]{2,3}"
                    minlength="4"
                    maxlength="4"
                    placeholder="1952"
                    v-model="modalDetails.year" />
                <label for="">Pages:</label>
                <input
                    type="text"
                    required
                    pattern="[1-9][0-9]{1,2}"
                    minlength="1"
                    maxlength="4"
                    placeholder="127"
                    v-model="modalDetails.pages" />
                <div class="modal-quantity">
                    <label class="quantity-label">Amount:</label>
                    <button
                        type="button"
                        :disabled="modalDetails.amount === 1"
                        @click="modalDetails.amount--"
                        class="quantity-button">
                        -
                    </button>
                    <input
                        type="text"
                        required
                        pattern="\d+"
                        v-model="modalDetails.amount"
                        class="quantity-input" />
                    <button
                        type="button"
                        @click="modalDetails.amount++"
                        class="quantity-button">
                        +
                    </button>
                </div>
                <div class="modal-controls">
                    <BaseButton
                        class="delete-button"
                        v-if="modalType === 'edit'"
                        @click="deleteBook()">
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
        v-if="booksList.length !== 0"
        :entries="booksList">
        <template #thead>
            <th>ID</th>
            <th>TITLE</th>
            <th>AUTHOR</th>
            <th>LANGUAGE</th>
            <th>YEAR</th>
            <th>PAGES</th>
            <th>AMOUNT</th>
            <th>EDIT</th>
        </template>
        <template #tbody>
            <tr
                v-for="book in filteredBooksList"
                :key="book">
                <td>{{ book.id }}</td>
                <td>{{ book.title }}</td>
                <td>{{ book.author }}</td>
                <td>{{ book.language }}</td>
                <td>{{ book.year }}</td>
                <td>{{ book.pages }}</td>
                <td>{{ book.amount }}</td>
                <td>
                    <svg-icon
                        type="mdi"
                        :path="path"
                        class="table-icon"
                        @click="openModal('edit', book)"></svg-icon>
                </td>
            </tr>
        </template>
    </BaseTable>
</template>

<script>
import SvgIcon from "@jamescoyle/vue-icon";
import {mdiNotebookEditOutline} from "@mdi/js";
import BaseButton from "./BaseButton.vue";
import BaseTable from "./BaseTable.vue";
import BaseModal from "./BaseModal.vue";

<<<<<<< HEAD
import {mapState} from "pinia";
=======
import {mapWritableState} from "pinia";
>>>>>>> ae8b6ba (attach stores states)
import {useBooksStore} from "./stores/booksStore";

export default {
    name: "BooksPage",

    components: {
        BaseButton,
        BaseModal,
        BaseTable,
        SvgIcon,
    },

    data() {
        return {
            isModalOpen: false,
            modalType: "",
            modalDetails: {
                header: "",
                bookId: null,
                title: "",
                author: "",
                language: "",
                year: "",
                pages: "",
                amount: 1,
                submit: "Save",
            },
            sortParameter: "",
            search: "",
            path: mdiNotebookEditOutline,
        };
    },

    computed: {
<<<<<<< HEAD
        ...mapState(useBooksStore, ["booksList"]),
=======
        ...mapWritableState(useBooksStore, ["booksList"]),
>>>>>>> ae8b6ba (attach stores states)
        filteredBooksList() {
            return this.booksList.filter((book) => {
                return (
                    book.title
                        .toLowerCase()
                        .indexOf(this.search.toLowerCase()) !== -1 ||
                    book.author
                        .toLowerCase()
                        .indexOf(this.search.toLowerCase()) !== -1 ||
                    book.language
                        .toLowerCase()
                        .indexOf(this.search.toLowerCase()) !== -1 ||
                    String(book.year).indexOf(this.search) !== -1 ||
                    String(book.id).indexOf(this.search) !== -1
                );
            });
        },
    },

    methods: {
        updateLocalStorage() {
            localStorage.setItem("books", JSON.stringify(this.booksList));
        },
        saveBook() {
            if (this.modalType === "new") {
                const newBook = {
                    id: null,
                    title: "",
                    author: "",
                    language: "",
                    year: "",
                    pages: "",
                    amount: 1,
                };
                newBook.id = Date.now() - 1674000000000;
                newBook.title = this.modalDetails.title.trim();
                newBook.author = this.modalDetails.author.trim();
                newBook.language = this.modalDetails.language.trim();
                newBook.year = this.modalDetails.year;
                newBook.pages = this.modalDetails.pages;
                newBook.amount = this.modalDetails.amount;

                this.booksList.push(newBook);
            } else if (this.modalType === "edit") {
                const bookId = this.modalDetails.bookId;

                const book = this.booksList.find((book) => book.id === bookId);
                book.title = this.modalDetails.title;
                book.author = this.modalDetails.author;
                book.language = this.modalDetails.language;
                book.year = this.modalDetails.year;
                book.pages = this.modalDetails.pages;
                book.amount = this.modalDetails.amount;
            }
            this.isModalOpen = false;

            this.modalDetails.title = "";
            this.modalDetails.author = "";
            this.modalDetails.language = "";
            this.modalDetails.year = "";
            this.modalDetails.pages = "";
            this.modalDetails.amount = 1;
        },
        deleteBook() {
            const bookIndex = this.booksList.findIndex(
                (book) => book.id === this.modalDetails.bookId
            );
            this.booksList.splice(bookIndex, 1);

            this.isModalOpen = false;

            this.modalDetails.title = "";
            this.modalDetails.author = "";
            this.modalDetails.language = "";
            this.modalDetails.year = "";
            this.modalDetails.pages = "";
            this.modalDetails.amount = 1;
        },
        openModal(type, book = null) {
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
                        this.modalDetails.bookId = book.id;
                        this.modalDetails.title = book.title;
                        this.modalDetails.author = book.author;
                        this.modalDetails.language = book.language;
                        this.modalDetails.year = book.year;
                        this.modalDetails.pages = book.pages;
                        this.modalDetails.amount = book.amount;
                    }
                    break;
            }
        },
        sortBooksBy(parameter) {
            switch (parameter) {
                case "title":
                case "author":
                case "language":
                    {
                        this.booksList.sort((a, b) => {
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
                case "year":
                    {
                        this.booksList.sort(
                            (a, b) => a[parameter] - b[parameter]
                        );
                    }
                    break;
            }
        },
        getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
        },
    },
    watch: {
        booksList: {
            deep: true,
            handler: function () {
                this.updateLocalStorage();
            },
        },
    },
    mounted() {
        if (localStorage.getItem("books")) {
            this.booksList = JSON.parse(localStorage.getItem("books"));
        }
    },
};
</script>
<style lang="scss" scoped>
.modal-quantity {
    margin-bottom: 1.5rem;
    font-weight: 700;

    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 0.5rem;
}

.quantity {
    &-label {
        margin-right: 0.5rem;
    }
    &-button {
        width: 1.5rem;
        height: 1.5rem;
        border-radius: 50%;
        border: none;
        background-color: lightgray;
        &:hover {
            cursor: pointer;
            background-color: rgb(185, 185, 185);
        }
    }
    &-input {
        width: 2rem;
        text-align: center;
    }
}

.table {
    thead th,
    tbody td {
        width: 40%;
    }

    thead th:first-child,
    tbody td:first-child,
    thead th:last-child,
    tbody td:last-child {
        width: 10%;
    }

    &-icon {
        cursor: pointer;
    }
}
</style>
