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
<style lang="scss">
.table-wrapper {
    overflow: auto;
}

table {
    //min-width: 600px;
    border-collapse: collapse;
    border-bottom: 2px solid #048a81;

    & thead tr {
        background-color: #048a81;
    }

    & tbody {
        overflow-y: scroll;
        tr {
            &:nth-of-type(even) {
                background-color: rgba($color: #fff, $alpha: 0.07);
            }
        }
        td {
            border-bottom: 1px solid #dddddd;
        }
    }
}
th,
td {
    padding: 1rem;
    text-align: center;
}
</style>
