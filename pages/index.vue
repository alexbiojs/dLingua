<template>
    <v-app dark>
    <v-app-bar fixed>
      <v-btn class="ma-3" outlined color="indigo"> map </v-btn>
      <v-btn class="ma-3" outlined color="indigo"> phonetic system </v-btn>
      <v-btn class="ma-3" outlined color="indigo"> users list </v-btn>
      <v-btn class="ma-3" outlined color="indigo" @click="login"> Log in </v-btn>
    </v-app-bar>
    <v-footer fixed>
      <span>{{ new Date().getFullYear() }}, by <a href="https://peakd.com/@alexbiojs" target="_blank">alexbiojs</a></span>
    </v-footer>
    </v-app>
</template>



<script type="text/javascript">

const client = new hivesigner.Client({
  app: 'dlingua',
  callbackURL: 'http://localhost:3000/hivesigner/',
  scope: ['vote', 'comment']
});

export default {
   mounted: function() {
      let params = (new URL(location)).searchParams;
      const token = params.get('access_token') || localStorage.getItem('sc_token');
      if (token) {
        const self = this;
        this.isInit = false;
        client.setAccessToken(token);
        
        /*https://stackoverflow.com/questions/22753052/remove-url-parameters-without-refreshing-page*/
        
        client.me(function(err, result) {
          if (result) self.username = result.name;
          if (err) self.error = err;
          localStorage.setItem('sc_token', token);
          self.isInit = true;
          console.log(err, result);
        });
      } else {
        this.isInit = true;
      }
   },
   methods: {
    login () {
        /*const self = this;
        this.isLoading = true;
        */
        /*const loginObj = { username: 'dlingua' };*/
        /*if (this.form.username) loginObj.username = this.form.username;*/

        client.login({ username: '' }, function(err, token) {
          /*console.log('Log in result', err, token);*/
          /*if (err) return self.isLoading = false;*/
          client.setAccessToken(token);

          client.me(function(err, result) {
            console.log('Verification result', err, result);
            if (result) self.username = result.name;
            if (err) self.error = err;
            localStorage.setItem('sc_token', token);
            self.isLoading = false;
          });
        });
     }
   }
}
</script>


<!--
<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <v-flex
      xs12
      sm8
      md6
    >
      <div class="text-center">
        <logo />
        <vuetify-logo />
      </div>
      <v-card>
        <v-card-title class="headline">
          Welcome to the Vuetify + Nuxt.js template
        </v-card-title>
        <v-card-text>
          <p>Vuetify is a progressive Material Design component framework for Vue.js. It was designed to empower developers to create amazing applications.</p>
          <p>
            For more information on Vuetify, check out the <a
              href="https://vuetifyjs.com"
              target="_blank"
            >
              documentation
            </a>.
          </p>
          <p>
            If you have questions, please join the official <a
              href="https://chat.vuetifyjs.com/"
              target="_blank"
              title="chat"
            >
              discord
            </a>.
          </p>
          <p>
            Find a bug? Report it on the github <a
              href="https://github.com/vuetifyjs/vuetify/issues"
              target="_blank"
              title="contribute"
            >
              issue board
            </a>.
          </p>
          <p>Thank you for developing with Vuetify and I look forward to bringing more exciting features in the future.</p>
          <div class="text-xs-right">
            <em><small>&mdash; John Leider</small></em>
          </div>
          <hr class="my-3">
          <a
            href="https://nuxtjs.org/"
            target="_blank"
          >
            Nuxt Documentation
          </a>
          <br>
          <a
            href="https://github.com/nuxt/nuxt.js"
            target="_blank"
          >
            Nuxt GitHub
          </a>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="primary"
            nuxt
            to="/inspire"
          >
            Continue
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>
-->

<script>
/*
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'

export default {
  components: {
    Logo,
    VuetifyLogo
  }
}
*/
</script>