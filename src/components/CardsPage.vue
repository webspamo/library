<template>
    <header class="header">
        <h2>
            <slot name="h2"></slot>
        </h2>

        <BaseButton
            @click="openModal('new')"
            class="header-button">
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

                <label for="">Full name:</label>
                <input
                    type="text"
                    v-model="modalDetails.name" />
                <label for="">Phone number:</label>
                <input
                    type="tel"
                    pattern="0[0-9]{2}[0-9]{3}[0-9]{4}"
                    minlength="10"
                    maxlength="10"
                    placeholder="0504217890"
                    v-model="modalDetails.phone" />

                <div class="controls">
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
            <div>
                <div class="modal-aside">
                    <h3>{{ modalDetails.asideHeader }}</h3>
                    <input
                        type="search"
                        v-model="search" />
                    <!-- <BaseButton>Search</BaseButton> -->
                </div>
                <BaseTable
                    class="table modal-table"
                    :entries="booksList">
                    <template #thead>
                        <th>BOOK</th>
                    </template>
                    <template #tbody>
                        <tr
                            v-for="book in booksList"
                            :key="book">
                            <td>{{ book.title }}</td>
                        </tr>
                    </template>
                </BaseTable>
            </div>
        </BaseModal>
    </header>

    <hr />
    <div class="options">
        <div class="option">
            <label for="parameters">Sort by:</label>
            <select
                name="parameters"
                id="parameters"
                v-model="sortParameter">
                <option value="id">ID</option>
                <option value="name">NAME</option>
            </select>
            <BaseButton @click="sortCardsBy(sortParameter)">Sort</BaseButton>
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
        class="table"
        v-if="cardsList.length !== 0"
        :entries="cardsList">
        <template #thead>
            <th>ID</th>
            <th>NAME</th>
            <th>PHONE</th>
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
    data() {
        return {
            booksList: [],
            cardsList: [],
            isModalOpen: false,
            modalType: "",
            modalDetails: {
                visitorId: null,
                header: "",
                asideHeader: "",
                name: "",
                phone: "",
                submit: "Save",
            },
            sortParameter: "",
            search: "",
        };
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
                            const nameA = a.name.toUpperCase();
                            const nameB = b.name.toUpperCase();
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
                        this.cardsList.sort((a, b) => a.id - b.id);
                    }
                    break;
            }
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
.table-wrapper {
    max-height: 400px;
}
</style>
