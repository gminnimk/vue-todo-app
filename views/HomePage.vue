<template>
    <section class="home">
        <div>
            <h1>
                HEROPY's HOME page!
            </h1>
            <h2
                @click="$router.push('/about')">
                About
            </h2>
            <router-link
                to="/todos"
                custom
                v-slot="{ navigate, isActive }">
                <h2
                    @click="navigate"
                    :class="{ 'router-link-active': isActive }">
                    Todo App
                </h2>
            </router-link>
        </div>
    </section>
</template>
