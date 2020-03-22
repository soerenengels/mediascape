<template>
  <div id="app">
      <router-view class="graph" name="graph"></router-view>
      <router-view class="sidebar" name="sidebar"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  props: ['node_id', 'author_id'],
  watch: {
        $route(to, from) {
            // react to route changes...

            // Wenn die selbe Route nochmal aufgerufen wird
            // zurück zur Startseite (?)
            if(to.params.node_id !== undefined) {

              console.log('route change to node from:');
              console.log(from);
              console.log(to);
              let routeNode = this.$store.state.nodes.filter((node) => node.id == to.params.node_id);
              console.log(routeNode);
              routeNode = routeNode[0];
              this.$store.commit('changeDefault', routeNode);
              this.$store.commit('changeActive', routeNode);
        } else if (to.params.author_id !== undefined) {
          
          let author = this.$store.state.authors.filter((author) => author.id == to.params.author_id);
          console.log('i found an author')
          console.log(author);
          author = author[0];
          console.log('but they changed');
          console.log(author);
          
          let routeAuthor = {
            date: 'Jahr',
            author: author.title.rendered,
            title: author.title.rendered,
            content: author.content.rendered
          };
          
            console.log('this is a change to author:');
            console.log(to.params.author_id);
            this.$store.commit('changeDefault', routeAuthor);
            this.$store.commit('changeActive', routeAuthor);
            }
        }
    },
}
</script>

<style>
* { margin: 0; padding: 0; }

#app {
  font-family: "Helvetica Neue", sans-serif;
  font-size: 18px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  display: flex;
}
    h2 {
        font-size: 1rem;
        font-weight: bold;
        text-transform: uppercase;
        padding-bottom: .1rem;
    }
    h3 {
        font-size: .8rem;
        text-transform: uppercase;
        padding-bottom: .1rem;
    }
    /*p {
        line-height: 1.3;
        hyphens: auto;
        padding-bottom: .2em;
    }*/

/* Graph: Nodes, Links */
/*.graph {
  display: block;
  width: 75vw;
  height: 100vh;
}*/
.sidebar {
  background-color: #f9f9f9;
  height: 100vh;
  width: 25vw;
}

@media (max-width: 799px) {
  #app {
    flex-direction: column;
  }
}
@media (max-width: 799px) {
        .graph, .left-arrow { 
            height: 66vh !important;
        }
        .graph {
          width: 100vw !important;
        }
        .labels {
            width: 100vw !important;
        }
    }



.nodes:hover {
    fill: red;
    filter: drop-shadow(0px 3px 3px rgb(204, 137, 137));
    cursor: pointer;
    transition: fill .3s, filter .3s;
}
.nodes[active] {
  fill: red;
  filter: drop-shadow(0px 3px 3px rgb(204, 137, 137));
}
.links {
    stroke: #777;
    stroke-width: 1px;
}
.links:hover {
    stroke: black;
    stroke-width: 3px;
    cursor: pointer;
    transition: stroke-width .3s, stroke .3s;
}

.special {
  fill: url('#whdiv') !important;
}
</style>
