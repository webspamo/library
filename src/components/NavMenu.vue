<template>
    <nav class="menu">
        <div
            v-for="tab in tabs"
            :key="tab"
            class="menu-item"
            :class="{
                selected: selectedTab === tab,
            }"
            @click="$emit('select-tab', tab)">
            {{ tab }}
        </div>
    </nav>
</template>
<script>
export default {
    name: "NavMenu",
    emits: ["select-tab"],
    props: {
        tabs: Array,
        selectedTab: String,
    },
    data() {
        return {};
    },
    methods: {},
};
</script>
<style lang="scss">
.menu {
    margin: 0 -6%;
    padding: 0 6%;
    background-color: #048a81;
    $main-color: #e2ebf4;

    display: flex;
    align-items: center;

    &-item {
        padding: 0.75rem 1.25rem;
        list-style: none;
        border-bottom: 1px solid transparent;
        border-left: 1px solid rgb(82, 82, 82);
        cursor: pointer;

        &:hover,
        &.selected {
            border-bottom: 1px solid #edd83d;
        }
    }
}
</style>
