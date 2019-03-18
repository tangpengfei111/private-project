<template>
    <div>

    </div>
</template>

<script>
    export default {
        created() {
            let str = localStorage.getItem('name');
            let p = this.$store.dispatch('exitLogin',str).then(data => {
                if (data.data === 'success') {
                    localStorage.clear();
                }
            })
        }
    }
</script>

<style scoped>

</style>