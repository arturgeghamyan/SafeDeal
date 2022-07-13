<template>
    <div class="container">
        <div class="row">
            <div class="col-lg-6">
                <div class="px-5 py-4 bg-white rounded shadow">
                    <p class="mb-2 text-secondary fs-5">Customer</p>
                    <input type="text" class="bg-secondary-bg rounded-1 border-0 p-3 w-100 mb-4">
                    <div class="d-flex justify-content-between mb-2 text-secondary fs-5">
                        <p class="mb-0">Amount ( BNB )</p>
                        <p class="mb-0">Balance: <app-count-up :value="balanceOf('BNB')"/> BNB</p>
                    </div>
                    <input type="text" class="bg-secondary-bg rounded-1 border-0 p-3 w-100 mb-4">
                    <!-- <web3-form> -->
                        <button class="btn btn-primary fs-4 fw-bold px-5 py-3">Send</button>
                    <!-- </web3-form> -->
                </div>
            </div>
            <div class="col-lg-6">
                <div class="px-5 py-4 bg-white rounded shadow">

                </div>
            </div>
            <div class="col-lg-6">
                <div class="px-5 py-4 bg-white rounded shadow">

                </div>
            </div>
            <div class="col-lg-6">
                <div class="px-5 py-4 bg-white rounded shadow">

                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    computed: {
        ...mapGetters({
			balanceOf: "user/assets/balanceOf",
        }),
    },
}
</script>