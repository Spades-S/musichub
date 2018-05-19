<template>
    <div class="container" :class="{hasResult:hasresult}">
        <el-carousel arrow="hover" :autoplay="false" class="card" height="100%" indicator-position="none">
            <template v-for="(resource,key) in resources">
                <el-carousel-item v-if="resource.data.length>0" :key="key">
                    <div class="content" :class="resource.from">
                        <div v-for="item in resource.data" class="row">
                            <div class="from"
                                 :class="[{netease:(resource.from==='netease')},{qq:(resource.from==='qq')},{xiami:(resource.from==='xiami')}]">
                            </div>
                            <a class="song" :href="item.song.link" target="_blank">{{item.song.name}}</a>
                            <a class="artist" :href="item.artists[0].link" target="_blank">{{item.artists[0].name}}</a>
                            <a class="album" :href="item.album.link" target="_blank">《{{item.album.name}}》</a>
                            <!--<audio class="play" src="http://m10.music.126.net/20180423121832/4105d60015d1d8c81464976a9c89bd9b/ymusic/508d/9cc4/b940/0be4f86503bf0a154deb141eeae03a4a.mp3" controls>not support</audio>-->
                        </div>
                        <el-pagination
                                layout="prev, pager, next" :background="true" small
                                :total="total[resource.from]" :pageSize="20"
                                :current-page.sync="currentPage[resource.from]"
                                @current-change="resource.listener" class="pagination">
                        </el-pagination>
                    </div>
                </el-carousel-item>
            </template>
        </el-carousel>
    </div>
</template>
<script>
    import axios from 'axios'
    import Bus from '../../../assets/eventBus.js'

//    axios.defaults.baseURL = 'http://localhost:3000/api/v1'
    axios.defaults.baseURL = '/api/v1'
    axios.defaults.withCredentials = true
    const pageNum = 20

    export default {
        data() {
            return {
                currentPage: {
                    netease: 1,
                    qq: 1,
                    xiami: 1
                },
                total: {
                    netease: 0,
                    qq: 0,
                    xiami: 0
                },
                hasresult: false,
                keyword: '',
                resources: {
                    netease: {
                        from: 'netease',
                        data: [],
                        listener: this.neteaseChange
                    },
                    qq: {
                        from: 'qq',
                        data: [],
                        listener: this.qqChange
                    },
                    xiami: {
                        from: 'xiami',
                        data: [],
                        listener: this.xiamiChange
                    }
                }
            }
        },
        beforeCreate() {
            Bus.$on('startsearch', (keyword) => {
                this.hasresult = true
                if (this.keyword !== keyword) {
                    this.keyword = keyword
                    this.getResource('netease', 1)
                    this.getResource('qq', 1)
                    this.getResource('xiami', 1)
                    this.getTotalNum('netease')
                    this.getTotalNum('qq')
                    this.getTotalNum('xiami')
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
                        const container = document.getElementsByClassName(source)[0]
                        if (container) {
                            container.scrollTop = 0
                        }
                        // 这种断尾求存的方法实在令人恶心
                        if (source === 'netease' && page > 1) {
                            const dataLength = res.data.length
                            if (dataLength === 0) {
                                this.currentPage[source] = page - 1
                                this.total[source] = (page - 1) * pageNum
                                this.neteaseChange(page - 1)
                            } else if (dataLength <= 10) {
                                this.total[source] = page
                                this.currentPage[source] = page
                                this.total[source] = page * pageNum
                                this.resources[source].data = res.data
                            } else {
                                this.resources[source].data = res.data
                                this.currentPage[source] = page
                            }
                        } else {
                            this.resources[source].data = res.data
                            this.currentPage[source] = page
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
            getTotalNum(source) {
                axios.get(`/total/${source}/${this.keyword}`)
                    .then(res => {
                        this.total[source] = res.data
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
            neteaseChange(currentPage) {
                this.getResource('netease', currentPage)
            },
            qqChange(currentPage) {
                this.getResource('qq', currentPage)
            },
            xiamiChange(currentPage) {
                this.getResource('xiami', currentPage)
            }
        }
    }
</script>
<style lang="scss" scoped>
    .container {
        visibility: hidden;
        margin: auto;
        margin-top: calc(30vh + 190px);
        max-width: 900px;
        transition: margin-top .7s ease;
        &.hasResult {
            visibility: visible;
            margin-top: calc(10vh + 190px);
        }
        .card {
            height: calc(90vh - 250px);
            border: 1px solid #e4e4e4;
            border-radius: 10px;
            padding: 5px 1px 18px;
            background: #eae8e838;
            .content {
                overflow: auto;
                box-sizing: border-box;
                height: 100%;
                width: 100%;
            }
        }
    }

    .row {
        display: flex;
        justify-content: space-between;
        align-content: center;
        border-bottom: 1px solid #e4e4e4;
        height: 40px;
        font-size: 16px;
        line-height: 40px;
        color: #575656;
        &:nth-of-type(2n) {
            background: rgba(160, 158, 158, 0.22);
        }
        .from {
            width: 50px;
            &.netease {
                background: url(../../../assets/netease.png) no-repeat center;
                background-size: 20px 20px;
            }
            &.qq {
                background: url(../../../assets/qq.png) no-repeat center;
                background-size: 20px 20px;
            }
            &.xiami {
                background: url(../../../assets/xiami.png) no-repeat center;
                background-size: 20px 20px;
            }
        }
        .song,
        .artist,
        .album{
            flex: 1 0 200px;
            overflow: hidden;
            white-space: nowrap;
            text-decoration: none;
            text-overflow: ellipsis;
            color: #575656;
            &:hover {
                color: #252424;
                cursor: pointer;
            }
        }

    }

    .pagination {
        margin-top: 20px;
    }


</style>