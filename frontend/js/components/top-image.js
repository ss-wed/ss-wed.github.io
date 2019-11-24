Vue.component('top-image', {
  template: `
    <div>
      <v-container style="margin:15px auto auto auto">
        <transition name="fade">
          <v-img :src="image_src" v-show="data.is_showing" style="display: flex; align-items: center; justify-content: center;">
            <div style="text-align: center;">
              <span class="ourwedding">Welcome<br>OurWedding</span>
            </div>
          </v-img>
        </transition>
      </v-container>
    </div>
  `,
  data: function () {
    return {
      data: {
        images: [
          './frontend/resources/image1.jpg',
          './frontend/resources/image2.jpg',
          './frontend/resources/image3.jpg',
        ],
        current_idx: 0,
        is_showing: false,
        text: 'Welcome to our Wedding'
      }
    }
  },
  computed: {
    image_src: function () {
      return this.data.images[this.data.current_idx]
    },
    get_height: function () {
      return window.innerHeight - 50
    }
  },
  mounted: function () {
    var vm = this

    // 初回、3秒かけて画像フェードイン
    vm.data.is_showing = true
    // 6秒後にフェードアウト
    setTimeout(function () {
      vm.data.is_showing = false
    }, 6000)

    // 画像切り替えフェード周期処理
    window.setInterval(function () {
      // 画像を切り替えて3秒かけてフェードイン
      vm.data.current_idx++
      if ((vm.data.current_idx+1) > vm.data.images.length) {
        vm.data.current_idx = 0
      }
      vm.data.is_showing = true

      // 3～6秒は何もせず画像表示させる

      // 6秒後にフェードアウト
      setTimeout(function () {
        vm.data.is_showing = false
      }, 6000)
    }, 9000)
  }
})