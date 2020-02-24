Vue.component('header-menu', {
  template: `
    <div>
      <v-toolbar color="white" height="50px" flat app style="opacity:0.5">
        <v-spacer></v-spacer>

        <v-btn icon @click="on_click_linkbutton('/index.html')">
          <v-icon color="teal">home</v-icon>
        </v-btn>

        <v-btn icon @click="on_click_linkbutton('/frontend/templates/profile.html')">
          <v-icon color="teal">supervisor_account</v-icon>
        </v-btn>

        <v-btn icon @click="on_click_linkbutton('/frontend/templates/form.html')">
          <v-icon color="teal">edit</v-icon>
        </v-btn>

        <v-btn icon @click="on_click_linkbutton('/frontend/templates/album.html')">
          <v-icon color="teal">photo</v-icon>
        </v-btn>

      </v-toolbar>

      <div sytle="height: 60px;"></div>
    </div>
  `,
  methods: {
    on_click_linkbutton: function (path) {
      window.location.href = path
    }
  }
})