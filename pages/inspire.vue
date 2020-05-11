<template>
    <v-app dark>
    <v-app-bar fixed>
      <v-btn class="ma-3" outlined color="indigo"> map </v-btn>
      <v-btn class="ma-3" outlined color="indigo"> phonetic system </v-btn>
      <v-btn class="ma-3" outlined color="indigo"> users list </v-btn>
      <v-btn class="ma-3" outlined color="indigo" @click="login"> Log in </v-btn>
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer fixed>
      <span>{{ new Date().getFullYear() }}, by <a href="https://peakd.com/@alexbiojs" target="_blank">alexbiojs</a></span>
    </v-footer>
    </v-app>
</template>


<script type="text/javascript">

const client = new hivesigner.Client({
  app: 'dlingua',
  callbackURL: 'http://localhost:3000/hivesigner',
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
  <v-layout>
    <v-flex class="text-center">
      <img
        src="/v.png"
        alt="Vuetify.js"
        class="mb-5"
      >
      <blockquote class="blockquote">
        &#8220;First, solve the problem. Then, write the code.&#8221;
        <footer>
          <small>
            <em>&mdash;John Johnson</em>
          </small>
        </footer>
      </blockquote>
    </v-flex>
  </v-layout>
</template>
-->