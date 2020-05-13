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
      <v-btn class="ma-12" outlined color="indigo"> map </v-btn>
      <v-btn class="ma-12" outlined color="indigo"> phonetic system </v-btn>
      <v-btn class="ma-12" outlined color="indigo" :disabled="this.$store.state.hivesigner.isLoading" @click="testing"> {{this.$store.state.hivesigner.testing}} </v-btn>
      <v-btn class="ma-3" outlined color="indigo" @click="login"> Log in </v-btn>
    </v-app-bar>
        <div id="vmap" style="width: 80%; height: 80%"></div>
        <p>text</p>
        <div id="postList"></div>
        <v-card id="modal" style="visibility: hidden; width: 50%; height: 50%"> text </v-card>
    <v-footer fixed>
      <span>{{ new Date().getFullYear() }}, by <a href="https://peakd.com/@alexbiojs" target="_blank">alexbiojs</a></span>
    </v-footer>
    </v-app>
</template>


<script>

import { Remarkable } from 'remarkable';

import { linkify } from 'remarkable/linkify';


const client = new hivesigner.Client({
  app: 'dlingua',
  callbackURL: 'http://localhost:3000/hivesigner',
  scope: ['vote', 'comment']
});


var dhive = require("@hivechain/dhive");
var clientHive = new dhive.Client(["https://api.hive.blog", "https://api.hivekings.com", "https://anyx.io", "https://api.openhive.network"]);
/*     clientHive.database.getDiscussions("trending", { tag: "ru", limit: 5 }).then(result => {
            console.log("Response received:", result);
            if (result) {
                var posts = [];
                result.forEach(post => {
                    const json = JSON.parse(post.json_metadata);
                    const image = json.image ? json.image[0] : '';
                    const title = post.title;
                    const author = post.author;
                    const created = new Date(post.created).toDateString();
                    posts.push(
                        `<div><h4>${title}</h4><p>by ${author}</p><center><img src="${image}" style="max-width: 450px"/></center><p>${created}</p></div>`
                    );
                });

                document.getElementById('postList').innerHTML = posts.join('');
            } else {
                document.getElementById('postList').innerHTML = "No result.";
            }
       });
  */     
/*
            console.log("working");
            console.log("Response received:", discussions);
            document.body.innerHTML += "<h1>" + discussions[0].title + "</h1>";
            document.body.innerHTML += "<h2>by " + discussions[0].author + "</h2>";
            document.body.innerHTML +=
            '<pre style="white-space: pre-wrap">' + discussions[0].body + "</pre>";
*/

        

jQuery(document).ready(function() {

  jQuery('#vmap').vectorMap(
  {
    map: 'world_en',
    backgroundColor: '#a5bfdd',
    borderColor: '#818181',
    borderOpacity: 0.25,
    borderWidth: 1,
    color: '#f4f3f0',
    enableZoom: true,
    hoverColor: '#c9dfaf',
    hoverOpacity: null,
    normalizeFunction: 'linear',
    scaleColors: ['#b6d6ff', '#005ace'],
    selectedColor: '#c9dfaf',
    selectedRegions: null,
    showTooltip: true,
    onRegionClick: function(element, code, region)
    {
        
        var message = 'You clicked "'
            + region
            + '" which has the code: '
            + code.toUpperCase();

        alert(code.toUpperCase());
        document.getElementById("modal").style.visibility = 'visible';
        
        
        const query = {
          tag: code,
          limit: 20,
        };
        
        clientHive.database.getDiscussions("trending", query).then(result => {
            console.log("Response received:", result);
            if (result) {
                var posts = [];
                result.forEach(post =>{
                    /*if (post.category == "steem"){*/
                    /*console.log(post.category == query.tag);*/
                    const json = JSON.parse(post.json_metadata);
                    const image = json.image ? json.image[0] : '';
                    const title = post.title;
                    const permlink = post.permlink;
                    const author = post.author;
                    const created = new Date(post.created).toDateString();
                    posts.push(
                        `<div id="addedposts"><h4 class="rollout">${title}</h4><p data-author="${author}" data-permlink="${permlink}">${author}</p><p>${permlink}</p><center><img src="${image}" style="max-width: 450px"/></center><p>${created}</p></div>`
                    );
                    /*}*/
                });
                    /*const list = posts.join('');*/
                document.getElementById('postList').innerHTML = posts.join('');
                  $(".rollout").click(function(e) {
                       var author = e.target.nextSibling.dataset.author;
                       console.log(e);
                       console.log(author);
                       
                       var permlink = e.target.nextSibling.dataset.permlink;
                       console.log(permlink);
                       
                       /*var author = $("#author").text();
                       console.log(permlink);
                       */
                       
                       /*var searchparams = ;*/
                       
                       /*clientHive.database.getDiscussions("trending");*/
                       
                       /*clientHive.database.call('get_content', ["jossduarte", "mi-experiencia-con-tinder-parte-2"]).then(result => {*/
                            
                         clientHive.database.call('get_content', [author, permlink]).then(result => {
                            console.log("text");
                            const md = new Remarkable({ html: true}).use(linkify);
                            
                            const body = md.render(result.body);

                            const content = `<div >Close</button></div><br><h2>${
                                result.title
                            }</h2><br>${body}<br>`;
                            
                            
                            
                            
                            document.getElementById('postList').innerHTML = content;
                            
                            
                            
                            
                        });
                        
                       
                     }
                   );
            } else {
                document.getElementById('postList').innerHTML = "No result.";
            }
       });
        
        /*posts.join('');*/
        
        /*
    clientHive.database.getDiscussions("trending", query).then(discussions => {
            console.log("working");
            console.log("Response received:", discussions);
            document.body.innerHTML += "<h1>" + discussions[0].title + "</h1>";
            document.body.innerHTML += "<h2>by " + discussions[0].author + "</h2>";
            document.body.innerHTML +=
            '<pre style="white-space: pre-wrap">' + discussions[0].body + "</pre>";
    });
        */
        var para = document.createElement("p");
        para.innerHTML = "This is a paragraph.";
        document.getElementById("modal").appendChild(para);    
        
        
        
    }
  });
  
  
});







export default {
   /*data: function() {
      return {
        isLoading:false,
      }
   },*/
   mounted: function() {
      let params = (new URL(location)).searchParams;
      const token = params.get('access_token') || localStorage.getItem('sc_token');
      if (token) {
        
        /*const self = this;*/
        
        this.$store.dispatch('hivesigner/toggleisLoading');
        
        /*this.$store.state.dispatch('toggleisLoading');*/
        
        client.setAccessToken(token);
        window.history.replaceState({}, document.title, "http://localhost:3000/hivesigner");
        
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
    testing (){
      this.$store.dispatch('hivesigner/toggleisLoading');
    },
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