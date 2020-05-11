<!--
<template>
      <button id="main" @click="login">
        Log in
      </button>
</template>
-->

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
  callbackURL: 'https://dlingua.netlify.app/hivesigner/',
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
        window.history.replaceState({}, document.title, "https://dlingua.netlify.app/hivesigner/");
        
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

      
/*
window.onload = function() {
  new Vue({
    el: '#main',
    data: {
      username: null,
      form: {
        username: null,
        comment: null,
      },
      isInit: false,
      isLoading: false,
      txId: null,
      error: null,
      useHiveKeychain: hivesigner.useHiveKeychain(),
      parentAuthor: 'steemguest',
      parentPermlink: '4lx1se-test-post',

    },
    mounted: function () {
      let params = (new URL(location)).searchParams;
      const token = params.get('access_token') || localStorage.getItem('sc_token');
      if (token) {
        const self = this;
        this.isInit = false;
        client.setAccessToken(token);

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
      login: function () {
        const self = this;
        this.isLoading = true;

        const loginObj = {};
        if (this.form.username) loginObj.username = this.form.username;

        client.login(loginObj, function(err, token) {
          console.log('Log in result', err, token);
          if (err) return self.isLoading = false;
          client.setAccessToken(token);

          client.me(function(err, result) {
            console.log('Verification result', err, result);
            if (result) self.username = result.name;
            if (err) self.error = err;
            localStorage.setItem('sc_token', token);
            self.isLoading = false;
          });
        });
      },
      comment: function () {
        const self = this;
        this.isLoading = true;
        this.txId = null;
        this.error = null;

        const permlink = 'hivesigner-' + new Date().getTime();
        const jsonMetadata = JSON.stringify({ tags: ['hivesigner'], app: 'hivesigner' });

        client.comment(this.parentAuthor, this.parentPermlink, this.username, permlink, '', this.form.comment, jsonMetadata, function(err, result) {
          console.log('Comment result', err, result);
          self.isLoading = false;
          if (result) self.txId = result.id || result.result.id;
          if (err) self.error = err;
        });
      },
      vote: function () {
        const self = this;
        this.isLoading = true;
        this.txId = null;
        this.error = null;

        client.vote(this.username, this.parentAuthor, this.parentPermlink, 10000, function(err, result) {
          console.log('Vote result', err, result);
          self.isLoading = false;
          if (result) self.txId = result.id || result.result.id;
          if (err) self.error = err;
        });
      },
      transfer: function () {
        const self = this;
        this.txId = null;
        this.error = null;

        const op = ['transfer', {
          from: '__signer',
          to: 'fabien',
          amount: '0.001 HIVE',
          memo: 'Transfer with HiveSigner demo'
        }];
        hivesigner.sendOperation(op, {}, function(err, result) {
          console.log('Transfer result', err, result);
          if (result) self.txId = result.id || result.result.id;
          if (err) self.error = err;
        });
      },
      logout: function () {
        this.username = null;
        localStorage.removeItem('sc_token');
      }
    }
  });
}*/
</script>