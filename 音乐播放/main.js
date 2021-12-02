axios.defaults.baseURL = 'https://autumnfish.cn';
const app = new Vue({
    el: '#app',
    data: {
        music_list: [],
        query: '',
        musicUrl: '',
        hotComments: [],
        mvurl: '',
        mvplay: false,
        isplay: true
    },
    methods: {
        search() {
            var that = this
            axios.get("/search?keywords=" + this.query).then(response => {
                console.log(response)
                console.log(response.data.result.songs)
                that.music_list = response.data.result.songs
            }).catch(err => {
                console.log("err:" + err)
            })
        },
        musicplay(musicId) {
            var that = this
            axios.get("/song/url?id=" + musicId).then(response => {
                console.log(response)
                console.log(response.data.data.url)
                that.musicUrl = response.data.data.url
            }).catch(err => {
                console.log("err:" + err)
            })
            axios.get("/song/detail?ids=" + musicId).then(response => {
                console.log(response)
            }).catch(err => {
                console.log("err:" + err)
            })
            axios.get("/comment/hot?type=0&id=" + musicId).then(response => {
                console.log(response)
                that.hotComments = response.data.hotComments
            }).catch(err => {
                console.log("err:" + err)
            })
        },
        play() {
            console.log('play')
        },
        pause() {
            console.log('pause')
        },
        mv_play(mvid) {
            var that = this
            axios.get("/mv/url?id=" + mvid).then(response => {
                that.mvurl = response.data.data.url
            }).catch(err => {
                console.log("err:" + err)
            })
            this.mvplay = true
        },
        clickmv() {
            var mv = document.getElementById('mvcontent')
            if (!this.isplay) {
                mv.play()
            } else {
                mv.pause()
            }
            this.isplay = !this.isplay
        },
        close() {
            this.mvplay = false
        },

    }
})