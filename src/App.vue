<template lang="">
    <header class="header">
        <div class="header-container">
            <h1>LIBRARY</h1>
            <NavMenu
                @select-tab="displayTab"
                :tabs="tabNames"
                :selected-tab="selectedTab.name">
            </NavMenu>
        </div>
    </header>
    <main class="main">
        <div class="main-container">
            <component
                v-if="selectedTab"
                :is="selectedTab.component">
                <template #h2>{{ selectedTab.slots[0] }}</template>
                <template #new>{{ selectedTab.slots[1] }}</template>
            </component>
        </div>
    </main>
</template>
<script>
import NavMenu from "./components/NavMenu.vue";
import BooksPage from "./components/BooksPage.vue";
import VisitorsPage from "./components/VisitorsPage.vue";
import CardsPage from "./components/CardsPage.vue";
import StatisticsPage from "./components/StatisticsPage.vue";

import {markRaw} from "vue";

export default {
    name: "LibraryApp",
    components: {
        NavMenu,
        BooksPage,
        VisitorsPage,
        CardsPage,
        StatisticsPage,
    },
    data() {
        return {
            tabs: [
                {
                    name: "Books",
                    component: markRaw(BooksPage),
                    slots: ["All Books", "New Book(s)"],
                },
                {
                    name: "Visitors",
                    component: markRaw(VisitorsPage),
                    slots: ["All Visitors", "New Visitor"],
                },
                {
                    name: "Cards",
                    component: markRaw(CardsPage),
                    slots: ["All Cards", "New Card"],
                },
                {name: "Statistic", component: markRaw(StatisticsPage)},
            ],
            selectedTab: null,
        };
    },
    computed: {
        tabNames() {
            return this.tabs.map((e) => e.name);
        },
        // pageAttrs() {
        //   if (!this.selectedTab) return {};

        //   switch (this.selectedTab.name) {
        //     case "Books":
        //     case "Visitors":
        //     case "Cards": {
        //       return {
        //         ["selected-tab"]: this.selectedTab.name,
        //       };
        //     }
        //     default:
        //       return {};
        //   }
        // },
    },
    methods: {
        findTabByName: function (tabName) {
            return this.tabs.find((e) => e.name === tabName);
        },
        displayTab(tabName) {
            this.selectedTab = this.findTabByName(tabName);
        },
    },
    created() {
        this.selectedTab = this.tabs[1];
    },
    watch: {
        // pageAttrs() {
        //   console.log(this.pageAttrs);
        // },
    },
};
</script>
<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;600;700&display=swap");

body {
    margin: 0;
    background-color: #373e40;
    font-family: "Open Sans", sans-serif;
    color: #e2ebf4;
}
.header {
    width: 100%;
}

.header-container {
    width: 80%;
    margin: 1rem auto 0 auto;
}
.main {
    width: 100%;
}

.main-container {
    width: 80%;
    margin: 0 auto 1rem auto;
}

.main-header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    &-button {
        width: 9rem;
    }
}
.modal-form {
    width: 100%;
    display: flex;
    flex-direction: column;

    > label {
        margin-bottom: 0.4rem;
        font-weight: 700;
    }

    > input {
        margin-bottom: 1.5rem;
    }
}
.modal-controls {
    display: flex;
    justify-content: space-between;
    gap: 2rem;
    .submit-button {
        margin-left: auto;
        width: 50%;
    }
    .delete-button {
        width: 50%;
        background-color: #db4c40;
    }
}

.options {
    margin-bottom: 2rem;

    display: flex;
    justify-content: space-between;

    .option {
        display: flex;
        gap: 20px;
    }
}
</style>
