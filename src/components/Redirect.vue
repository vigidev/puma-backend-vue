<template>
    <div id="Redirect">
    Sign in success, redirecting you ...
    </div>
</template>

<script>
export default {
    name: 'Redirect',
    methods: {
        redirectTo() {
            setTimeout(function(){
                window.location.href = this.$route.query.redirect_url;
            }.bind(this), 5000);
        }
    },
    created () {
        this.redirectTo();
    }
}
</script>