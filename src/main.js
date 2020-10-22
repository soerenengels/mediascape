import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
// import ContextInitial from './components/ContextInitial.vue'
import ContextNode from './components/ContextNode.vue'
import ContextAuthor from './components/ContextAuthor.vue'
import Sidebar from './components/Sidebar.vue'
import Graph from './components/Graph.vue'
import store from './store/store.js'
import * as d3 from "d3";

Vue.use(VueRouter);
Vue.config.productionTip = false;

const Node = { template: '<div>404</div>' }
const routes = [
  {
    path: '/',
    components: {
      graph: Graph,
      sidebar: Sidebar
    },
    children: [
      {
        path: '',
        component: ContextNode
      },
      {
        path: 'node/:node_id',
        component: ContextNode
      },
      {
        path: 'author/:author_id',
        component: ContextAuthor
      },
      {
        path: '*',
        component: Node
      }
    ],
    props: {
      graph: true,
      sidebar: true
    }
  },
  /* Beim Aufrufen von /node/:id entsprechenden Node mit Links hervorheben und Seitenleiste anpassen (default-state) 
  { 
    path: '/node/:node_id', 
    components: {
      graph: Graph,
      sidebar: ContextBar
    }, 
    props: {
      graph: true,
      sidebar: true
    }
  },
  /* Beim Aufrufen von /author/:id entsprechende:n Author hexagon hervorheben und Seitenleiste anpassen (default-state) */
  { path: '/author/:author_id', component: ContextAuthor },
  {
    path: '*',
    components: {
      graph: Graph,
      sidebar: Sidebar
    }
  },
]
const router = new VueRouter({
  /*mode: 'history',*/
  routes
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')





// Zeichenfläche mit padding anlegen
const w = 600; //console.log(w);
const h = 600; //console.log(h);
const plotPadding = 30; //console.log(plotPadding);
const svg = d3.select(".graph")
  .append("svg").attr('id', 'svgBox')
  .attr("viewBox", "0 0 600 600")
  .attr("width", "100%").attr("height", "100%")
  .call(d3.zoom().on("zoom", () => {
    svg.attr("transform", d3.event.transform);
  })).append("g");

/* Gradients */
const svgDefs = d3.select('svg').append('defs');
// svgDefs.append('rect').attr('id','d0').attr('fill', 'yellow')
// "Farbenblind" + Geschlecht
const svgGradientColorlessMale = svgDefs.append('linearGradient').attr('id', 'm0');
svgGradientColorlessMale.append('stop')
  .attr('offset', '0%').attr('stop-color', 'skyblue');
svgGradientColorlessMale.append('stop')
  .attr('offset', '100%').attr('stop-color', 'yellow');
const svgGradientColorlessFemale = svgDefs.append('linearGradient').attr('id', 'w0');
svgGradientColorlessFemale.append('stop')
  .attr('offset', '0%').attr('stop-color', 'salmon');
svgGradientColorlessFemale.append('stop')
  .attr('offset', '100%').attr('stop-color', 'yellow');
const svgGradientColorlessDiverse = svgDefs.append('linearGradient').attr('id', 'd0');
svgGradientColorlessDiverse.append('stop')
  .attr('offset', '0%').attr('stop-color', 'purple');
svgGradientColorlessDiverse.append('stop')
  .attr('offset', '100%').attr('stop-color', 'yellow');
// missing: "Farbenblind" + divers
// White + Geschlecht  
const svgGradientWhiteMale = svgDefs.append('linearGradient').attr('id', 'm1');
svgGradientWhiteMale.append('stop')
  .attr('offset', '0%').attr('stop-color', 'skyblue');
svgGradientWhiteMale.append('stop')
  .attr('offset', '100%').attr('stop-color', 'white');
const svgGradientWhiteFemale = svgDefs.append('linearGradient').attr('id', 'w1');
svgGradientWhiteFemale.append('stop')
  .attr('offset', '0%').attr('stop-color', 'white');
svgGradientWhiteFemale.append('stop')
  .attr('offset', '100%').attr('stop-color', 'salmon');
const svgGradientWhiteDiverse = svgDefs.append('linearGradient').attr('id', 'd1');
svgGradientWhiteDiverse.append('stop')
  .attr('offset', '0%').attr('stop-color', 'white');
svgGradientWhiteDiverse.append('stop')
  .attr('offset', '100%').attr('stop-color', 'purple');
// 'poc' + Geschlecht
const svgGradientPOCMale = svgDefs.append('linearGradient').attr('id', 'm2');
svgGradientPOCMale.append('stop')
  .attr('offset', '0%').attr('stop-color', 'brown');
svgGradientPOCMale.append('stop')
  .attr('offset', '100%').attr('stop-color', 'skyblue');
const svgGradientPOCFemale = svgDefs.append('linearGradient').attr('id', 'w2');
svgGradientPOCFemale.append('stop')
  .attr('offset', '0%').attr('stop-color', 'brown');
svgGradientPOCFemale.append('stop')
  .attr('offset', '100%').attr('stop-color', 'salmon');
const svgGradientPOCDiverse = svgDefs.append('linearGradient').attr('id', 'd2');
svgGradientPOCDiverse.append('stop')
  .attr('offset', '0%').attr('stop-color', 'brown');
svgGradientPOCDiverse.append('stop')
  .attr('offset', '100%').attr('stop-color', 'purple');


// Transition anlegen
const t = d3.transition().duration(300).ease(d3.easeCubicInOut);
// Zufallsgenerator initiieren
let zufall = (a, b) => (Math.random() * (b - a)) + a;

// Daten aufbereiten
let nodes = [];
let links = [];

const urlcontent = "https://ausdemlebeneinestaugenichts.de/wp-json/wp/v2/referenzen?per_page=100";
const urlAuthor = "https://ausdemlebeneinestaugenichts.de/wp-json/wp/v2/authors?per_page=100";
fetch(urlAuthor)
  .then(response => response.json())
  .then((authors) => {
    fetch(urlcontent)
      .then(response => response.json())
      .then((data) => {
        // console.log(data);

        // Skala anlegen
        // minimaler bzw. maximaler Datensatz
        const min = d3.min(data, (d) => {
          if (d.acf.jahr) {
            return d.acf.jahr
          }
        });
        const max = d3.max(data, (d) => d.acf.jahr);

        // y-Skala
        let yScale = d3.scaleLinear()
          .domain([min, max]) // Data-Ratio
          .range([plotPadding, h - plotPadding]); // Pixel-Ratio    
        // console.log(yScale("1958")); // Test: ySkala    

        // x-Skala
        let xScale = d3.scaleLinear()
          .domain([1, 1000]) // Daten-Ratio
          .range([0, w]); // Pixel-Ratio    

        data.forEach((d) => {
          // Nodes anlegen
          const id = d.id;
          const x = xScale(zufall(0, 1000)); // x-Wert generieren
          const jahr = d.acf.jahr;
          const y = jahr ? yScale(jahr) : yScale("1950"); // ySkala anwenden, überprüfen ob Jahr vorhanden
          const title = d.title.rendered;
          const autorid = d.acf.autor ? d.acf.autor : "Unbekannt";
          let authorACF = authors.find((aut) => d.acf.autor['0'].ID == aut.id);
          const authorGender = authorACF.acf.geschlecht[0];
          // console.log(authorACF);
          const authorRace = authorACF.acf.race.value[0];
          const abstract = d.content.rendered;
          nodes.push(
            {
              "id": id,
              "x": x,
              "y": y,
              "title": title,
              "author": autorid,
              "authorGender": authorGender,
              "authorRace": authorRace,
              "jahr": jahr,
              "abstract": abstract,
              "content": d.content.rendered
            }
          );
          // Links anlegen
          const anchor = d.acf.anchor;
          if (anchor) {
            const source = d.id;
            anchor.forEach((l) => {
              let target = l;
              links.push({ "source": source, "target": target });
            });
          }
        });

        // Nodes und Links ausgeben um zu überprüfen, ob sie korrekt angelegt wurden
        console.log(nodes);
        // console.log(links);

        const ticked = () => {
          let u = svg
            .selectAll('circle')
            .data(nodes);

          // Linien im SVG anlegen
          let v = svg
            .selectAll('line')
            .data(links);
          v.enter()
            .append('line')
            .attr('id', (d, i) => "anchor" + i)
            .attr('class', (d) => "source" + d.source);
          v.attr('x1', (d) => nodes.find(n => n.id == d.source).x)
            .attr('x2', (d) => nodes.find(n => n.id == d.target).x)
            .attr('y1', (d) => nodes.find(n => n.id == d.source).y)
            .attr('y2', (d) => nodes.find(n => n.id == d.target).y)
            .merge(u);

          u.enter()
            .append('circle')
            .attr('r', 5)
            .attr('class', 'nodes')
            .attr('tabindex', '0')
            .attr('fill', 'grey')
            .classed("genderMale", () => {/*console.log(d);*/ return true }) //differenzieren
            .classed("raceOfColor", () => {/*console.log(d);*/ return true }) //differenzieren
            .merge(u)
            .attr('cx', (d) => d.x)
            .attr('cy', (d) => d.y)
            .on('mouseover', (data, i, n) => {
              store.commit('changeActive', data);
              d3.select(n[i]).transition(t).attr('r', 8);
              // Alle Links auswählen, die die Klasse mit ID des Nodes haben und class 'links' anhängen
              let sourceClass = ".source" + data.id;
              d3.selectAll(sourceClass).classed("links", true);
            })
            .on("mouseout", (d, i, n) => {
              store.commit('backToDefault');
              d3.select(n[i]).transition(t).attr('r', 5);
              let sourceClass = ".source" + d.id;
              d3.selectAll(sourceClass).classed("links", false);
            })
            .on('click', (d/*, i, n*/) => {
              //store.commit('changeDefault', d);
              router.push({ path: '/node/' + d.id });
              /*let el = d3.select(n[i]);
              el.style("fill", 'red');*/
            });

          /*svg.on('click', () => {
            store.commit('backToDefault');
          });*/

          //d3.selectAll('.reference-label-top').transition(t);

          u.exit().remove();
        }
        const simulation = d3.forceSimulation(nodes);
        simulation
          .force('charge', d3.forceManyBody())
          .force('y', d3.forceY().y((d) => d.y).strength(0.5))
          .force('link', d3.forceLink()
            .id((d) => {/*console.log(d);*/ return d.id }).distance(5).strength(1))
          .on('tick', ticked);

        let authorsForState = [];
        authors.forEach((_, i) => authorsForState.push(authors[i]))

        store.commit('pushNodesAuthors', [nodes, authors]);

      });
  });

d3.select('#svgBox').on('click', () => {
  console.log('click');
})