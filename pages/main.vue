<template>
    <v-app dark>
        <v-card height="auto">
            <v-toolbar align-center justify-center v-show="this.$store.state.hivesigner.isLoading">
                <v-spacer />
                <v-btn class="ma-3" outlined color="indigo" @click="login" v-show="this.$store.state.hivesigner.isLoading"> Log in </v-btn>
                <v-spacer />
            </v-toolbar>
            <v-toolbar align-center justify-center v-show="!this.$store.state.hivesigner.isLoading">
                <v-spacer />
                <v-card id="profile"></v-card>
                <v-btn class="ma-12" outlined color="blue" id="getContributions"> Show my contributions </v-btn>
                <v-btn class="ma-3" outlined color="blue" @click="logout"> Log out </v-btn>
                <v-spacer />
            </v-toolbar>
        </v-card>
        <div id="vmap" align-center justify-center style="width: 800px; height: 600px"></div>

        <v-card style="visibility:hidden;" class="centered ma-3 modalWindow" id="modal1" width="15%">
            <v-btn id="closeTesting-modal1"
            icon
            dark
            >
                <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-row
            justify="center"
            >
                <v-btn color="primary" id="openVoicesList" class="ma-2" dark> Voices list </v-btn>
                <v-btn color="primary" id="openPhonetics" class="ma-2" dark> Phonetics (English only) </v-btn>
                <v-btn color="primary" id="openUsersList" class="ma-2" dark> Users list </v-btn>
            </v-row>
        </v-card>
        <v-card style="visibility:hidden;" height="80%" width="80%" class="centered ma-3 modalWindow2 scroll" id="modal2">
            <v-btn id="closeTesting-modal2" class="fixedIcon"
            icon
            dark
            >
                <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-row id="ListOfPosts1"
            justify="center"
            >
            </v-row>
        </v-card>
        <v-card style="visibility:hidden;" height="80%" width="80%" class="centered ma-3 modalWindow2 scroll" id="modal3">
            <v-btn id="closeTesting-modal3" class="fixedIcon"
            icon
            dark
            >
                <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-row id="ListOfPosts2"
            justify="center"
            >
            </v-row>
        </v-card>
        <v-card style="visibility:hidden;" height="80%" width="80%" class="centered ma-3 modalWindow2 scroll" id="modal4">
            <v-btn id="closeTesting-modal4" class="fixedIcon"
            icon
            dark
            >
                <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-row id="ListOfPosts3"
            justify="center"
            >
            </v-row>
        </v-card>
        <v-card style="visibility:hidden;" height="80%" width="80%" class="centered ma-3 modalWindow2 scroll" id="modal5">
            <v-btn id="closeTesting-modal5" class="fixedIcon"
            icon
            dark
            >
                <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-row id="PostDetails1"
            justify="center"
            >
            </v-row>
        </v-card>
        <v-card style="visibility:hidden;" height="80%" width="80%" class="centered ma-3 modalWindow2 scroll" id="modal6">
            <v-btn id="closeTesting-modal6" class="fixedIcon"
            icon
            dark
            >
                <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-row id="PostDetails2"
            justify="center"
            >
            </v-row>
        </v-card>
        <v-card style="visibility:hidden;" height="80%" width="80%" class="centered ma-3 modalWindow2 scroll" id="modal7">
            <v-btn id="closeTesting-modal7" class="fixedIcon"
            icon
            dark
            >
                <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-row id="PostDetails3"
            justify="center"
            >
            </v-row>
        </v-card>
        <v-card style="visibility:hidden" height="80%" width="80%" class="centered ma-3 modalWindow2 scroll" id="modal8">
            <v-btn id="closeTesting-modal8" class="fixedIcon"
            icon
            dark
            >
                <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-row id="ListOfUserContributions"
            justify="center"
            >
            </v-row>
        </v-card>
        <v-card style="visibility:hidden" height="80%" width="80%" class="centered ma-3 modalWindow2" id="modal9">
            <v-btn id="closeTesting-modal9" class="fixedIcon"
            icon
            dark
            >
                <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-row id="PostDetails4"
            justify="center"
            >
            </v-row>
        </v-card>
        <v-card style="visibility:hidden;" height="80%" width="80%" class="centered ma-3 modalWindow2" id="modal10">
            <v-btn id="closeTesting-modal10" class="fixedIcon"
            icon
            dark
            >
                <v-icon>mdi-close</v-icon>
            </v-btn>
            <p>( Testing for English. Click on the symbols (in Unicode) to search for posts about the particular sound)</p>
            <div id="Phonetics">
            </div>
        </v-card>

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
        callbackURL: 'https://dlingua.netlify.app/main',
        scope: ['vote', 'comment']
    });


    var myUsername = "";
    
/*PHONETIC SYSTEM*/    
    var array = ["0061", "0065"];
    var list, list2;
    var array2 = ["[a]", "[e]"];



    var dhive = require("@hivechain/dhive");
    var clientHive = new dhive.Client(["https://api.hive.blog", "https://api.hivekings.com", "https://anyx.io", "https://api.openhive.network"]);


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
                    
                    
                    /*unbinding*/
                    $('#Phonetics').off("click");

                    $("#modal1").off("click");

                    $('#closeTesting-modal1').off("click");

                    $('#openVoicesList').off("click");

                    $('#closeTesting-modal2').off("click");

                    $('#openUsersList').off("click");

                    $('#closeTesting-modal4').off("click");

                    $('#openPhonetics').off("click");

                    $('#closeTesting-modal3').off("click");

                    $('#closeTesting-modal5').off("click");

                    $('#closeTesting-modal6').off("click");

                    $('#closeTesting-modal7').off("click");

                    $('#closeTesting-modal10').off("click");
                    
                    
                    
                    
                    $('#Phonetics').html("");/*fixing a bug*/
                    
                    $("#modal1").css("visibility", "visible");

                    $('#closeTesting-modal1').click(function(e){
                        /*$("#modal1").css("visibility", "hidden");*/
                        $('#modal1').css("visibility", "hidden");
                    });

                    $('#openVoicesList').click(function(e){

                        code = "voice-" + code;

                        getDiscussions ("created", code, "modal2", "ListOfPosts1", "modal5", "PostDetails1");
                    });

                    $('#closeTesting-modal2').click(function(e){
                        /*$("#modal2").css("visibility", "hidden");*/
                        $("#ListOfPosts1").html("");          
                        $('#modal2').css("visibility", "hidden");
                        
                    });



                    $('#openUsersList').click(function(e){

                        code = "application-" + code;

                        getDiscussions ("trending", code, "modal4", "ListOfPosts3", "modal7", "PostDetails3"); //change to "created"
                    });

                    $('#closeTesting-modal4').click(function(e){
                        /*$("#modal4").css("visibility", "hidden");*/
                        $("#ListOfPosts3").html("");          
                        $('#modal4').css("visibility", "hidden");
                    });





                    $('#openPhonetics').click(function(e){

                        /*code = "sound-" + code; will be used later for countries mapping*/

                        $('#modal10').css("visibility", "visible");

                        phoneticsFormation();
                    });


/*phonetics*/
                    $('#closeTesting-modal3').click(function(e){
                        /*$("#modal3").css("visibility", "hidden");*/
                        $("#ListOfPosts2").html("");          
                        $('#modal3').css("visibility", "hidden");
                    });


/*posts details*/
                    $('#closeTesting-modal5').click(function(e){
                        $("#PostDetails1").html("");          
                        $('#modal5').css("visibility", "hidden");
                    });

                    $('#closeTesting-modal6').click(function(e){
                        $("#PostDetails2").html("");          
                        $('#modal6').css("visibility", "hidden");
                    });

                    $('#closeTesting-modal7').click(function(e){
                        $("#PostDetails3").html("");          
                        $('#modal7').css("visibility", "hidden");
                    });


/*phonetics*/
                    $('#closeTesting-modal10').click(function(e){
                        /*
                        $("#modal10").fadeOut("slow");
                        ("#modal10").innerHTML = "";
                        */
                        $('#Phonetics').html("");
                        /*$("#Phonetics").html("");*/
                        $('#modal10').css("visibility", "hidden");
                    });


                }
            }
        )
        


                    /*creating phonetics table and fetching results*/

                    function phonetics (){

                            for (var i=0; i<array.length; i++){
                                list = document.createElement('div');
                                list2 = document.createElement('div');
                                list.innerHTML= array[i];
                                list2.innerHTML= array2[i];
                                list.setAttribute("data-phoneme",array[i]);
                                list.setAttribute("class","phonemes");
                                list2.setAttribute("data-phoneme",array[i]);
                                list2.setAttribute("class","phonemes");
                                $("#Phonetics").append(list);
                                $("#Phonetics").append(list2);
                                console.log(list);
                                console.log(list2);
                            }
                            console.log("text");
                     };



                    function phoneticsFormation (){
                        

                        phonetics();

                        $(".phonemes").click(function(e) {
                            var phoneme = e.target.dataset.phoneme;
                            console.log(phoneme);
                            
                            /*
                            const query = {
                                tag: phoneme,
                                limit: 100,
                            };
                            */

                            getDiscussions ("created", phoneme, "modal3", "ListOfPosts2", "modal6", "PostDetails2");                            
                        });
                    }
                    
                    
                    





        
                    /*ListOfUserContributions*/
                    $('#getContributions').click(function(e){

                        getDiscussions ("blog", myUsername, "modal8", "ListOfUserContributions", "modal9", "PostDetails4");
                    });


                    /*ListOfUserContributions*/
                    $('#closeTesting-modal8').click(function(e){
                        $("#ListOfUserContributions").html("");
                        $('#modal8').css("visibility", "hidden");
                    });

                    $('#closeTesting-modal9').click(function(e){
                        $("#PostDetails4").html("");          
                        $('#modal9').css("visibility", "hidden");
                        
                        
                    });
        

    });






function getDiscussions (typeOfRequest, code, modelIdForList, elementIdforList, modelIdForPostDetails, elementIdforPostDetails){
    console.log(code);
    $('#' + modelIdForList).css("visibility", "visible");
    /*
    $('#' + modelIdForList).css("width", "500px");
    $('#' + modelIdForList).css("height", "800px");
    */
    
    
    const query = {
        tag: code,
        limit: 10
    };

    clientHive.database.getDiscussions(typeOfRequest, query).then(result => {
        console.log("Response received:", result);
    if (result) {
        var posts = [];
        result.forEach(post =>{
            if(post.category == "dlingua"){ /* for user's feed specifically for dLingua*/
            const json = JSON.parse(post.json_metadata);
            const image = json.image ? json.image[0] : '';
            const title = post.title;
            const permlink = post.permlink;
            const author = post.author;
            const created = new Date(post.created).toDateString();
            posts.push(`<div style="background-color:gray" id="elements">
                <h2> ${title}</h2>
                <p> Author: ${author}</p>
                <h2 class="addedposts" data-author="${author}" data-permlink="${permlink}"> Click here to Show details </h2><center><img src="${image}" style="max-width: 200px"/></center><p>${created}</p></div>`
            );
        }
    });
    document.getElementById(elementIdforList).innerHTML = posts.join('');
    $(".addedposts").click(function(e) {
        var author = e.target.dataset.author;
        console.log(e);
        console.log(author);
        var permlink = e.target.dataset.permlink;
        console.log(permlink);

        $('#'+modelIdForPostDetails).css("visibility", "visible");
        /*
        $('#' + modelIdForList).css("width", "500px");
        $('#' + modelIdForList).css("height", "800px");
        */  
        getPostDetails(modelIdForPostDetails, elementIdforPostDetails, author, permlink);
    })
    }
});
};



function getPostDetails (modelIdForPostDetails, elementIdforPostDetails, author, permlink){

    /*$('#'+modelIdForPostDetails).css("visibility", "visible");*/

    clientHive.database.call('get_content', [author, permlink]).then(result => {
        console.log("text");
        console.log(result);
    const md = new Remarkable({ html: true}).use(linkify);
    const body = md.render(result.body);
    const content = `<div style="background-color:gray" id="elements"><br>
        <h2>${result.title}</h2><br>${body}<br>
        <div id="voteButton">
        <button id="voteit"><h1>Vote!</h1></button><br>
            <input type="range" min="1" max="100" value="50" id="slider"><div id="sliderResult"></div></div>`;
            
            document.getElementById(elementIdforPostDetails).innerHTML = content;
            
            var voteWeight = 0;

            /*slider*/
            var slider = document.getElementById("slider");
            var sliderResult = document.getElementById("sliderResult");
            sliderResult.innerHTML = slider.value;

            slider.oninput = function() {
                sliderResult.innerHTML = this.value;
                voteWeight = this.value*100;
                }

            $("#voteit").click(function(e) {
                client.vote(myUsername, author, permlink, voteWeight, function(err, result) {
                    console.log(myUsername);
                    console.log('Vote result', err, result);
                    $("#voteit").css("color", "yellow");
                    var txId = 0;
                    if (result) txId = result.id || result.result.id;
                    console.log(txId);
                })
            })
    })
}





export default {
    mounted: function() {
        let params = (new URL(location)).searchParams;
        const token = params.get('access_token') || localStorage.getItem('sc_token');
        if (token) {
            this.$store.dispatch('hivesigner/toggleisLoading');

            client.setAccessToken(token);
            window.history.replaceState({}, document.title, "https://dlingua.netlify.app/main");

            client.me(function(err, result) {
                if (result) myUsername = result.name;
                localStorage.setItem('sc_token', token);
                console.log(err, result);

                /*profile data / image*/

                var json_metadata = result.account.json_metadata;

                var metadata = JSON.parse(json_metadata);

                var image = metadata.profile.profile_image;

                console.log(myUsername + " " + result.account.balance + " " + metadata.profile.about + " " + image);

                var profile = '<center><img id="profileImage" src="" style="max-width: 50px"/></center>';

                document.getElementById('profile').innerHTML = profile;

                document.getElementById('profileImage').setAttribute("src",image);
            });
        }
    },
    methods: {
        testing (){
            this.$store.dispatch('hivesigner/toggleisLoading');
        },
        toggleMenu (){
            this.$store.dispatch('hivesigner/showMenu');
        },
        login () {
            client.login({ username: '' }, function(err, token) {
            client.setAccessToken(token);
            client.me(function(err, result) {
            console.log('Verification result', err, result);
            if (result) myUsername = result.name;
            localStorage.setItem('sc_token', token);
            });
            });
        },
        logout: function () {
            myUsername = null;
            localStorage.removeItem('sc_token');
            window.location.replace("https://dlingua.netlify.app/main");
        }
    }
}

</script>

