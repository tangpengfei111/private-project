<template>
    <div class='home'>
        <div class='message'>
            <my-message></my-message>
        </div>
        <div class='distribute'>
            <my-distribute></my-distribute>
        </div>
        <div class='failure'>
            <my-failure></my-failure>
        </div>
        <div class='register'>
            <my-register></my-register>
        </div>
    </div>
</template>

<script>
    import message from '@/components/home/message.vue'
    import distribute from '@/components/home/distribute.vue'
    import failure from '@/components/home/failure.vue'
    import register from '@/components/home/register.vue'
    export default {
        components: {
            'my-message': message,
            'my-distribute': distribute,
            'my-failure': failure,
            'my-register': register,
        }
    }
</script>

<style scoped>
</style>