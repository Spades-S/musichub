<!--Created by Spades<spadesge@gmail.com> on 2018/04/24-->

<template>
    <div class="container" :class="{hasResult:hasresult}">
        <my-slide :autoPlay="false" :threshold="0.3" :itemNum="itemNum" :key="keyword">
            <template v-for="(resource, key) in resources">
                <my-slide-item :key="key" v-if="resource.data.length>0">
                    <my-scroll :options="scrollOptions" @pulling-up="resource.listener" :key="keyword"
                               class="scroll-wrapper" :ref="resource.from" :data="resource.data">
                        <div class="row" v-for="item in resource.data">
                            <a class="content" :href="item.song.link">
                                <div class="song">{{item.song.name}}</div>
                                <div class="artist">{{item.artists[0].name}}——{{item.album.name}}</div>
                            </a>
                            <div class="from" :class="resource.from"></div>
                        </div>
                    </my-scroll>
                </my-slide-item>
            </template>
        </my-slide>
    </div>

</template>
<script>
    import axios from 'axios'
    import Bus from '../../../assets/eventBus.js'

//    axios.defaults.baseURL = 'http://localhost:3000/api/v1'
        axios.defaults.baseURL = '/api/v1'
    axios.defaults.withCredentials = true
    export default {
        data() {
            return {
                currentPage: {
                    netease: 1,
                    qq: 1,
                    xiami: 1
                },
                hasresult: false,
                itemNum: 0,
                keyword: '',
                resources: {
                    netease: {
                        from: 'netease',
                        data: [],
                        listener: this.neteasePulling
                    },
                    qq: {
                        from: 'qq',
                        data: [],
                        listener: this.qqPulling
                    },
                    xiami: {
                        from: 'xiami',
                        data: [],
                        listener: this.xiamiPulling
                    }
                },
                scrollOptions: {
                    pullUpLoad: {
                        threshold: 0,
                        txt: {
                            more: 'Load more',
                            noMore: 'No more data'
                        }
                    }
                }
            }
        },
        beforeCreate() {
            Bus.$on('startsearch', (keyword) => {
                this.itemNum = 0
                this.hasresult = true
                this.resources = {
                    netease: {
                        from: 'netease',
                        data: [],
                        listener: this.neteasePulling
                    },
                    qq: {
                        from: 'qq',
                        data: [],
                        listener: this.qqPulling
                    },
                    xiami: {
                        from: 'xiami',
                        data: [],
                        listener: this.xiamiPulling
                    }
                }
                if (this.keyword !== keyword) {
                    this.keyword = keyword
                    this.getResource('netease', 1)
                    this.getResource('qq', 1)
                    this.getResource('xiami', 1)
                    this.currentPage = {
                        netease: 1,
                        qq: 1,
                        xiami: 1
                    }

                }
            })

        },
        methods: {
            getResource(source, page) {
                axios.get(`/search/${source}/${this.keyword}/${page}`)
                    .then(res => {
                        if (page === 1 && res.data.length > 0) {
                            this.itemNum += 1
                        }
                        this.resources[source].data = this.resources[source].data.concat(res.data)
                        this.currentPage[source] = page
                        if (res.data.length <= 5) {
                            if (page > 1){
                                this.$refs[source][0].forceUpdate()
                            }
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
            neteasePulling() {
                this.currentPage['netease'] += 1
                this.getResource('netease', this.currentPage['netease'])
            },
            qqPulling() {
                this.currentPage['qq'] += 1
                this.getResource('qq', this.currentPage['qq'])
            },
            xiamiPulling() {
                this.currentPage['xiami'] += 1
                this.getResource('xiami', this.currentPage['xiami'])
            }

        }
    }

</script>
<style lang="scss" scoped>
    .container {
        overflow: hidden;
        border: 1px solid #e4e4e4;
        border-radius: 10px;
        position: absolute;
        top: calc(35vh + 130px);
        bottom: 10px;
        left: 0;
        right: 0;
        margin: 0 10px;
        visibility: hidden;
        background: #eae8e838;
        transition: top 0.7s ease;
        &.hasResult {
            top: calc(3vh + 130px);
            visibility: visible;

        }
    }

    .row {
        display: flex;
        justify-content: space-between;
        align-content: center;
        border-bottom: 1px solid #e4e4e4;
        height: 60px;
        color: #575656;
        &:nth-of-type(2n) {
            background: rgba(160, 158, 158, 0.22);
        }
        .from {
            width: 52px;
            &.netease {
                background: url(../../../assets/netease.png) no-repeat center;
                background-size: 25px 25px;
            }
            &.qq {
                background: url(../../../assets/qq.png) no-repeat center;
                background-size: 25px 25px;
            }
            &.xiami {
                background: url(../../../assets/xiami.png) no-repeat center;
                background-size: 25px 25px;
            }
        }
        .content {
            box-sizing: border-box;
            flex: 1 0 200px;
            width: calc(100% - 50px);
            padding-left: 20px;
            padding-right: 10px;
        }
        .song,
        .artist {
            width: 100%;
            overflow: hidden;
            white-space: nowrap;
            text-align: left;
            text-decoration: none;
            text-overflow: ellipsis;
            color: #575656;
        }
        .song {
            margin-top: 10px;
            font-size: 16px;
            line-height: 25px;
        }
        .artist {
            font-size: 12px;
            line-height: 18px;
        }

        .cube-slide-group {
            background: red;
        }

    }
</style>