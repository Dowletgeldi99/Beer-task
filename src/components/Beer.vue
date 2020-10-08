<template>
    <div class="beers">
        <h2 class="beers__title">Beers list</h2>

        <div class="beers__list">
            <div class="beer" v-for="beer in BEERS" :key="beer.id">
                <div class="beer__title">
                    <div class="beer__title-img">
                        <img :src="beer.image_url" alt="">
                    </div>

                    <span>{{beer.id}}</span>
                    <span>{{beer.name}}</span>
                </div>
                
                <div class="beer__info">
                    <p>{{beer.description}}</p>
                    <p>{{beer.brewers_tips}}</p>
                </div>

                <div class="beer__buttons">
                    <button class="button" @click="deleteBeer(beer.id)">Delete</button>
                    <button class="button" @click="displayModal(beer.id)">Update</button>
                </div>
            </div>
        </div>

        <transition name = "fade" appear>
            <div class="modal-overlay" v-if="showModal">
                <button class="exit-btn" @click="exitPopup"></button>
                <div class="modal" v-if="showModal">
                    <div class="modal-form" v-if="!succsessPost">
                        <div class="modal-title">
                            <p>Input your update data</p>
                        </div>
                        <div class="popup-form">
                            <label>
                                <span>Name:</span>
                                <input type="text" v-model="updatedData.name">
                            </label>
                            <label>
                                <span>Description:</span>
                                <input type="text" v-model="updatedData.description">
                            </label>
                            <p v-if="errors.length">
                                <b>Пожалуйста исправьте указанные ошибки:</b>
                                <ul class="error_ul">
                                    <li v-for="error in errors" :key="error.id">{{ error }}</li>
                                </ul>
                            </p>
                            <button class="button" @click="checkForm">Update</button>
                        </div>
                    </div>
                    <div class="modal-succsess" v-else>
                        <h4>Comment is updated!</h4>
                    </div>
                </div>
            </div>
        </transition>

        <div v-if="IS_ARRAY" class="buttonShow">
            <button class="button" @click="nextPage">{{buttonText}}</button>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapGetters, mapState} from 'vuex';
    import axios from 'axios';

    export default {
        data() {
            return {
                isButton: true,
                page: 1,
                buttonText: null,
                errors: [],
                showModal: false,
                succsessPost: false,
                updatedData: {
                    id: null,
                    name: null,
                    description: null
                }
            }
        },
        computed: {
            ...mapGetters([
                'BEERS',
                'IS_ARRAY',
                'IS_LOADING'
            ])
        },
        mounted() {
            this.GET_LIST_FROM_API(this.page);
            
            this.buttonText = this.isLoading ? 'Loading' : 'Show next';
        },
        methods: {
            ...mapActions([
                'GET_LIST_FROM_API',
                'NEXT_PAGE',
                'DELETE_FROM_STATE',
                'UPDATE_BEER'
            ]),
            checkForm: function (e) {
                if (this.updatedData.name && this.updatedData.description) {
                    this.updateBeer();
                    
                    this.errors = [];
                } else {
                    this.errors.push('You have to write comment');
                }
            },
            exitPopup() {
                this.showModal = false;
                this.succsessPost = false;
                this.updatedData = {};
            },
            displayModal(id) {
                this.showModal = true;
                this.updatedData.id = id;
            },
            deleteBeer(id) {
                let isConfirm = confirm(`Do you want to delete ?`);
                
                if (isConfirm) {
                    this.DELETE_FROM_STATE(id);
                }
            },
            updateBeer() {
                this.UPDATE_BEER(this.updatedData);
                this.succsessPost = true;
            },
            nextPage() {
                this.page++;
                this.GET_LIST_FROM_API(this.page, this.isLoading);
            }
        }
    }
</script>

<style lang="scss">
    .beers {
        width: 80%;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 20px;

        &__title {
            margin-bottom: 50px;
        }

        &__list {
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            width: 100%;

            .beer {
                display: flex;
                justify-content: space-between;
                flex-direction: column;
                width: 30%;
                background: #ccc;
                padding: 10px 15px;
                border-radius: 10px;
                margin-top: 20px;

                &__title {
                    display: flex;
                    justify-content: start;

                    span + span {
                        margin-left: 5px;
                    }

                    &-img {
                        width: 30%;
                        height: 130px;

                        img {
                            display: block;
                            max-width: 100%;
                            height: 100%;
                        }
                    }

                }

                &__info {
                    p {
                        margin-top: 20px;
                    }
                }

                &__buttons {
                    display: flex;
                    margin-top: 20px;

                    button {
                        padding: 10px;

                        & + button {
                            margin-left: 5px;
                        }
                    }
                }
            }
        }

        .button {
            color: #fff;
            background: #0f73ee;
            padding: 15px 30px;
            border-radius: 20px;
            border: 0;
            outline: none;
            transition: 0.4 ease-out;
            font-weight: 600;
            cursor: pointer;
        }

        .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 20;
            background-color: rgba($color: #000000, $alpha: .5);
            
            .exit-btn {
                position: fixed;
                top: 30px;
                right: 30px;
                width: 20px;
                height: 20px;
                background: transparent;
                border: none;
                outline: none;
                cursor: pointer;

                &::before {
                    content: "X";
                    font-family: sans-serif;
                    width: 20px;
                    height: 20px;
                    text-align: center;
                    font-size: 22px;
                    color: #fff;
                }
            }
            
            .modal {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 400px;
                background-color: #fff;
                border-radius: 5px;
                padding: 25px;

                .modal-succsess {
                    text-align: center;
                }


                .modal-title {
                    text-align: center;

                    p {
                        font-size: 20px;
                        font-weight: 600;
                        font-family: sans-serif;
                    }

                }

                .popup-form {
                    display: flex;
                    flex-direction: column;
                    padding: 20px 20px 5px 20px;
                    
                    label {
                        text-align: left;

                        & + label {
                            margin: 10px 0 20px;
                        }
                    }

                    

                    .error_ul {
                        li {
                            list-style: none;
                            color: red;
                            margin-bottom: 15px;
                        }

                        li:first-child {
                            margin-top: 10px;
                        }
                    }

                    .buttons {
                        display: flex;
                        justify-content: space-between;
                    }

                    .button {
                        color: #fff;
                        background: #0f73ee;
                        padding: 15px 30px;
                        border-radius: 20px;
                        border: 0;
                        outline: none;
                        transition: 0.4 ease-out;
                        font-weight: 600;
                    }
                }
            }

        }

        .fade-enter-active,
        .fade-leave-active {
            transition: opacity .5s; 
        }

        .fade-enter,
        .fade-leave-to {
            opacity: 0;
        }
    }
</style>
        