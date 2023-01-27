<template>
    <div class="table-wrapper">
        <table>
            <thead>
                <tr>
                    <slot name="thead"></slot>
                </tr>
            </thead>
            <tbody>
                <slot name="tbody"></slot>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    props: {
        entries: Array,
    },
    data() {
        return {};
    },
    mounted() {},
};
</script>
<style lang="scss" scoped>
.table-wrapper {
    overflow: auto;
    &::-webkit-scrollbar {
        display: block;
        width: 0.6rem;
    }
    &::-webkit-scrollbar-track {
        background: transparent;
    }

    &::-webkit-scrollbar-thumb {
        background-color: gray;
        height: 3rem;
        border-radius: 5px;
        border-right: none;
        border-left: none;
    }
}

:deep(table) {
    width: 100%;
    border-collapse: collapse;
    border-bottom: 2px solid #048a81;
    table-layout: fixed;

    thead {
        position: sticky;
        top: 0;
        //z-index: 1;

        background-color: #048a81;
    }

    tbody {
        tr {
            &:nth-of-type(even) {
                background-color: rgba($color: #fff, $alpha: 0.07);
            }
        }

        td {
            border-bottom: 1px solid #dddddd;
        }
    }

    th,
    td {
        padding: 1rem;
        text-align: center;
    }
}
</style>
