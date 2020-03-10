var app = new Vue({
    el: '#app',
    data: {
        button_lable: 'LOADING...',
        panel: [false],
        image: '',
        container_height: 0,
        container_padding: 0,
        head_height: 0
    },
    created: function () {
        let vm = this

        axios
        .post('https://asia-east2-wedding-system-244912.cloudfunctions.net/get_smilescore_result')
        .then(response => {
            vm.image = "data:image/jpg;base64," + response.data['image']
            vm.button_lable = 'WINNER'
        })
        .catch(error => {
            console.log(error)
        })
    },
    mounted: function () {
        this.all_height = document.documentElement.clientHeight
        this.container_padding = document.getElementsByClassName('container')[0].style.padding
        this.head_height = document.getElementsByClassName('v-expansion-panel__header')[0].clientHeight

        // 背景に泡アニメーション設定
        bubbly();
    },
    computed: {
        style_img: function () {
            let offsedet = 10
            let height = `calc(${this.all_height}px - ${this.container_padding} - ${this.container_padding} - ${this.head_height}px - ${offsedet}px)`

            return `width:auto; height:${height}; max-width:100%; max-height:100%;`
        },
    },
    watch: {
        panel: function () {
            // パネルを開ける度に背景に泡アニメーション設定
            if (this.panel[0]) {
                bubbly({
                    colorStart: "#fff4e6",
                    colorStop: "#ffe9e4",
                    blur: 1,
                    compose: "source-over",
                    bubbleFunc: () => `hsla(${Math.random() * 50}, 100%, 50%, .3)`
                });
            }
        }
    }
})