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
                <label for="">Full name:</label>
                <input
                    type="text"
                    required
                    v-model="modalDetails.name" />
                <label for="">Phone number:</label>
                <input
                    type="tel"
                    required
                    pattern="0[0-9]{2}[0-9]{3}[0-9]{4}"
                    minlength="10"
                    maxlength="10"
                    placeholder="0504217890"
                    v-model="modalDetails.phone" />
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
            <BaseButton @click="sortVisitorsBy(sortParameter)">Sort</BaseButton>
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
        v-if="visitorsList.length !== 0"
        :entries="visitorsList">
        <template #thead>
            <th>ID</th>
            <th>NAME</th>
            <th>PHONE</th>
            <th>EDIT</th>
        </template>
        <template #tbody>
            <tr
                v-for="visitor in filteredVisitorsList"
                :key="visitor">
                <td>{{ visitor.id }}</td>
                <td>{{ visitor.name }}</td>
                <td>{{ visitor.phone }}</td>
                <td>
                    <svg-icon
                        type="mdi"
                        :path="path"
                        class="table-icon"
                        @click="openModal('edit', visitor)"></svg-icon>
                </td>
            </tr>
        </template>
    </BaseTable>
</template>

<script>
import SvgIcon from "@jamescoyle/vue-icon";
import {mdiAccountEditOutline} from "@mdi/js";
import BaseButton from "./BaseButton.vue";
import BaseTable from "./BaseTable.vue";
import BaseModal from "./BaseModal.vue";

export default {
    name: "VisitorsPage",
    components: {
        BaseButton,
        BaseTable,
        BaseModal,
        SvgIcon,
    },
    props: {},
    data() {
        return {
            visitorsList: [],
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
            path: mdiAccountEditOutline,
        };
    },
    computed: {
        filteredVisitorsList() {
            return this.visitorsList.filter((visitor) => {
                return (
                    visitor.name
                        .toLowerCase()
                        .indexOf(this.search.toLowerCase()) !== -1 ||
                    visitor.phone.indexOf(this.search) !== -1
                );
            });
        },
    },
    methods: {
        updateLocalStorage() {
            localStorage.setItem("visitors", JSON.stringify(this.visitorsList));
        },
        saveVisitor() {
            if (this.modalType === "new") {
                const newVisitor = {
                    id: null,
                    name: "",
                    phone: "",
                };
                newVisitor.id = Date.now();
                this.modalDetails.name = this.modalDetails.name.trim();
                newVisitor.phone = this.modalDetails.phone.replace(/\s+/g, "");

                if (
                    this.modalDetails.name !== "" &&
                    this.modalDetails.phone !== ""
                ) {
                    newVisitor.name = this.modalDetails.name;
                } else return;
                this.visitorsList.push(newVisitor);
            } else if (this.modalType === "edit") {
                const visitorId = this.modalDetails.visitorId;

                const visitor = this.visitorsList.find(
                    (visitor) => visitor.id === visitorId
                );
                visitor.name = this.modalDetails.name;
                visitor.phone = this.modalDetails.phone;
            }

            this.modalDetails.name = "";
            this.modalDetails.phone = "";

            this.isModalOpen = false;
        },

        openModal(type, visitor = null) {
            this.isModalOpen = true;
            this.modalType = type;

            switch (type) {
                case "new":
                    {
                        this.modalDetails.header = "New visitor:";
                    }
                    break;
                case "edit":
                    {
                        this.modalDetails.header = "Edit visitor:";
                        this.modalDetails.visitorId = visitor.id;
                        this.modalDetails.name = visitor.name;
                        this.modalDetails.phone = visitor.phone;
                    }
                    break;
            }
        },
        deleteVisitor() {
            const visitorIndex = this.visitorsList.findIndex(
                (visitor) => visitor.id === this.modalDetails.visitorId
            );
            this.visitorsList.splice(visitorIndex, 1);

            this.modalDetails.name = "";
            this.modalDetails.phone = "";

            this.isModalOpen = false;
        },
        sortVisitorsBy(parameter) {
            switch (parameter) {
                case "name":
                    {
                        this.visitorsList.sort((a, b) => {
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
                        this.visitorsList.sort((a, b) => a.id - b.id);
                    }
                    break;
            }
        },
    },
    watch: {
        visitorsList: {
            deep: true,
            handler: function () {
                this.updateLocalStorage();
            },
        },
    },
    mounted() {
        if (localStorage.getItem("visitors")) {
            this.visitorsList = JSON.parse(localStorage.getItem("visitors"));
        }
    },
};
</script>
<style lang="scss" scoped>
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

.highlighted {
    color: #edd83d;
    //border-bottom: 1px solid #edd83d;
}
</style>
