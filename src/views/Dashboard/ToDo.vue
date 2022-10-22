<script>
import { mapActions, mapState } from 'pinia';
import d$todo from '@/stores/dashboard/todo'
import axios from 'axios';

import ArgonInput from "@/components/ArgonInput.vue";
import ArgonSwitch from "@/components/ArgonSwitch.vue";
import ArgonButton from "@/components/ArgonButton.vue";

export default {
    name: 'ToDo',
    data: () => ({
        input: {
            name: '',
            description: '',
            category: '',
        },
    }),
    components: {
        ArgonInput,
        ArgonSwitch,
        ArgonButton,
    },
    computed: {
        ...mapState(d$todo, ['g$list']),
    },
    methods: {
        ...mapActions(d$todo, ["a$list", "a$add"]),
        async getList() {
            try {
                await this.a$list();
            } catch (e) {
                console.error('methods getList error', e);
            }
        },
        async addList() {
            try {
                await this.a$add({ ...this.input });
                this.$router.go(this.$router.currentRoute)
            } catch (e) {
                console.error('methods addList error', e);
            }
        },
    },
    async created() {
        await this.getList();
    },
};
</script>

<template>

    <div class="page-header min-vh-100">
        <div class="container">
            <div class="row">
                <div class="mx-auto col-xl-4 col-lg-5 col-md-7 d-flex flex-column mx-lg-0">
                    <div class="card card-plain">
                        <div class="pb-0 card-header text-start">
                            <h4 class="font-weight-bolder">Add Todo</h4>
                            <p class="mb-0">Masukkan todo</p>
                        </div>
                        <div class="card-body">
                            <form @submit.prevent="addList">
                                <div class="mb-3">
                                    <argon-input v-model="input.name" type="text" placeholder="Name" name="name"
                                        size="lg" />
                                </div>
                                <div class="mb-3">
                                    <argon-input v-model="input.description" type="text" placeholder="Description"
                                        name="description" size="lg" />
                                </div>
                                <div class="mb-3">
                                    <argon-input v-model="input.category" type="text" placeholder="Category"
                                        name="category" size="lg" />
                                </div>
                                <div class="text-center">
                                    <argon-button class="mt-4" variant="gradient" color="success" fullWidth size="lg"
                                        type="submit">
                                        Submit
                                    </argon-button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <div>
        <ol>
            <li v-for="(item, index) in g$list" :key="index">{{ item }}</li>
        </ol>
    </div>
</template>

