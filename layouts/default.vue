

<template>
    <v-app dark>
    <v-app-bar fixed>
      <v-btn class="ma-3" outlined color="indigo"> map </v-btn>
    </v-app-bar>
        <nuxt />
    <v-footer fixed>
      <span>{{ new Date().getFullYear() }}, by <a href="https://peakd.com/@alexbiojs" target="_blank">alexbiojs</a></span>
    </v-footer>
    </v-app>
</template>



<script>
/*
export default {
  middleware: ['login']
}
*/
/*
const client = new hivesigner.Client({
  app: 'dlingua',
  callbackURL: 'http://localhost:3000/hivesigner',
  scope: ['vote', 'comment']
});
*/
/*
export default {
   mounted: function() {
      let params = (new URL(location)).searchParams;
      const token = params.get('access_token') || localStorage.getItem('sc_token');
      if (token) {
        const self = this;
        this.isInit = false;
        client.setAccessToken(token);
        window.history.replaceState({}, document.title, "/");
        
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
*/
</script>

      
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





<!--
<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="clipped = !clipped"
      >
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="fixed = !fixed"
      >
        <v-icon>mdi-minus</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-btn
        icon
        @click.stop="rightDrawer = !rightDrawer"
      >
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-navigation-drawer
      v-model="rightDrawer"
      :right="right"
      temporary
      fixed
    >
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light>
              mdi-repeat
            </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

  </v-app>
</template>
-->
/*
<script>
export default {
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  }
}
</script>
*/