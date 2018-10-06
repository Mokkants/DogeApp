<template>
<div class="container">
    <h2 class="media-heading">Post</h2>
    <div class="media-boxes">

      <h5 class="media-heading">Owner Name 1<small><i>&nbsp;Posted: 30-09-2018</i></small></h5><!--time and owner name should be dynamic-->
      <div class="media">
        <div class="media-left">
          <img src="https://cdn1.iconfinder.com/data/icons/business-charts/512/customer-512.png" alt="Image" class="mr-3" style="width:120px">
        </div>
        <div class="media-body tm-bg-pink-light">
          <div class="tm-description-box">
            <h5 class="tm-text-blue">Post description</h5>
          </div>
          <div class="row">
              <div class="col-sm-3"></div>
              <div class="col-sm-6">
                 <table>
                     <tr>
                         <td>Time and Date</td>
                     </tr>
                     <tr v-for="post in posts" :key="post.time.walkOrder">
                         <td class="date">{{post.time.walkOrder | formatDay && formatHour}} </td>
                     </tr>
                 </table>
              </div>
              <div class="col-sm-3"></div>
          </div>
          <div class="tm-buy-box">
            <a href="#" class="tm-bg-blue tm-text-white tm-buy">Claim [Walker Only]</a>
            <span class="tm-text-pink">Available</span>
          </div>
        </div>
      </div>

      <h5 class="media-heading">Owner Name 2<small><i>&nbsp;Posted: 01-10-2018</i></small></h5>
      <div class="media">
        <div class="media-left">
          <img src="https://cdn1.iconfinder.com/data/icons/business-charts/512/customer-512.png" alt="Image" class="mr-3" style="width:120px">
        </div>
        <div class="media-body tm-bg-pink-light">
          <div class="tm-description-box">
            <h5 class="tm-text-blue">Post description</h5>
          </div>
          <div class="row">
              <div class="col-sm-3"></div>
              <div class="col-sm-6">
                 <table>
                     <tr>
                         <td>Time and Date</td>
                     </tr>
                     <tr v-for="post in posts" :key="post.time.walkOrder">
                         <td class="date">{{post.time.walkOrder | formatDay && formatHour}} </td>
                     </tr>
                 </table>
              </div>
              <div class="col-sm-3"></div>
          </div>
          <div class="tm-buy-box">
            <a href="#" class="tm-bg-blue tm-text-white tm-buy">Cancel [Walker Only]</a>
            <span class="tm-text-pink">Claimed by: you</span>
          </div>
        </div>
      </div>

      <h5 class="media-heading">Owner Name 3<small><i>&nbsp;Posted: 05-10-2018</i></small></h5>
      <div class="media">
        <div class="media-left">
          <img src="https://cdn1.iconfinder.com/data/icons/business-charts/512/customer-512.png" alt="Image" class="mr-3" style="width:120px">
        </div>
        <div class="media-body tm-bg-pink-light">
          <div class="tm-description-box">
            <h5 class="tm-text-blue">Post description</h5>
          </div>
          <div class="row">
              <div class="col-sm-3"></div>
              <div class="col-sm-6">
                 <table>
                     <tr>
                         <td>Time and Date</td>
                     </tr>
                     <tr v-for="post in posts" :key="post.time.walkOrder">
                         <td class="date">{{post.time.walkOrder | formatDay && formatHour}} </td>
                     </tr>
                 </table>
              </div>
              <div class="col-sm-3"></div>
          </div>
          <div class="tm-buy-box">
            <a href="#" class="tm-bg-blue tm-text-white tm-buy">Cancel [Walker Only]</a>
            <span class="tm-text-pink">Claimed by: walker_username</span> <!-- should be dynamic-->
          </div>
        </div>
      </div>
    </div> <!-- media-boxes -->
    
    <footer class="row">
      <div class="col-xl-12">
        <p class="text-center p-4">Copyright &copy; 2018. Doge All rights reserved.</p>
      </div>
    </footer>
  </div> <!-- .container -->
</template>
  

  <script>
    const
    access = require('../../server/access-control'),
    _ = require('underscore'),
    axiox = require('axios');

    module.exports = {
      name:"post",
      data(){
        return{
          showById:null,
          posts:[]
        }
      },
      methods:{
        getPosts: function(){
          axios
          .get('/api/posts/')
          .then(response => {
              if(response.status === 200){
                  return this._getPostsCondensed(response.data.data);
              }
              else if (response.status===401){
                  console.log("unauthorized");
              }
            })
          .then(data => {
          this.posts.length = 0;
          for (let i = 0; i < data.length; i++) {
              this.posts.push(data[i]);
          }
          })
          .catch(e => {
              this.posts.length = 0;
              console.log(e)
          });
        },
        cancelClaimToPost: function(id){
            axios({
                method: 'patch',
                url: '/api/posts/'+id,
                data: {
                    walker: null
                }
            });
          }
        }
      }
    
    $(function () {

      if (renderPage) {
        $('body').addClass('loaded');
      }

      $('.tm-current-year').text(new Date().getFullYear());  // Update year in copyright
    });

  </script>