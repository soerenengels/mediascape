import Vuex from 'vuex'
import Vue from 'vue'
import * as d3 from "d3";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        active: {
            date: 'Jahr',
            author: false,
            title: 'Mediascape',
            content: '<h2>Wissenschaft veranschaulichen</h2><p>Beim Projekt Mediascape geht es darum, die Verbindungen zwischen wissenschaftlichen Arbeiten untereinander und in Bezug auf Medien bzw. Kunstwerke visuell sichtbar zu machen.</p><p>Gleichzeitig soll eine kritische Betrachtung von Machtebenen ermöglich werden, durch die Hervorhebung von Kategorien wie z.B. Geschlecht und Race.</p>'
        },
        default: {
            date: 'Jahr',
            author: false,
            title: 'Mediascape',
            content: '<h2>Wissenschaft veranschaulichen</h2><p>Beim Projekt Mediascape geht es darum, die Verbindungen zwischen wissenschaftlichen Arbeiten untereinander und in Bezug auf Medien bzw. Kunstwerke visuell sichtbar zu machen.</p><p>Gleichzeitig soll eine kritische Betrachtung von Machtebenen ermöglich werden, durch die Hervorhebung von Kategorien wie z.B. Geschlecht und Race.</p>'
        },
        imageURL: 'https://pbs.twimg.com/profile_images/1098358426751647744/41fBbCkt_bigger.jpg',
        filterGenderActive: false,
        filterRaceActive: false,
        nodes: [],
        authors: []
      },
    getters: {
        // Here we will create a getter
        getDate: state => state.active.date,
        getAuthors: state => {
            // compute a label for authorship
            let labelAuthor = [];
            const authors = state.active.author;
            console.log(authors)
            if (authors) {
                /* authors.forEach((author) => {
                    labelAuthor += author.post_title;
                    labelAuthor += '<br>';
                });*/
                authors.forEach((author, i) => {
                    console.log(author);
                    labelAuthor.push(authors[i]);
                });
                
            } else {
                labelAuthor = [{post_title: 'Autor:in'}];
            }
            return labelAuthor;
        },
        getAuthorBirth: (state, authorId) => {
            let author = state.authors.filter((author) => author.id == authorId);
            author = author[0];
            return author.acf.geburtstag !== '' ? author.acf.geburtstag : 'unbekannt'
        },
        getTitle: state => {
            return state.active.title;
        },
        getImageURL: state => {
            //console.log(state);
            return state.imageURL;
        },
        getContent: state => {
            return state.active.content;
        },
        getCitation: () => {
            return "Nachname, Vorname Jahr. Titel. Ort. Ausgabe" // computed
        },
        getNodes: state => { 
            return state.nodes
        }
    },
    mutations: {
        changeDefault(state, nodeObject) {
            const defaultObject = {
                date: nodeObject.jahr,
                author: nodeObject.author,
                title: nodeObject.title,
                content: nodeObject.content,
              };
            state.default = defaultObject;
            console.log('show mutation')
        },
        changeActive(state, nodeObject) {
            const activeObject = {
                date: nodeObject.jahr,
                author: nodeObject.author,
                title: nodeObject.title,
                content: nodeObject.content,
              };
            state.active = activeObject;
        },
        backToDefault(state) {
            state.active = state.default;
        },
        pushNodesAuthors(state, [nodes, authors]) {
            state.nodes = nodes;
            state.authors = authors;
        },
        toggleSwitch(state, switcher) {
            // Statewechsel
            const name = 'filter' + switcher + 'Active';
            console.log(state[name]);
            let bol = state[name] === true ? false : true;
            state[name] = bol;
            // Farbwechsel
            const circles = d3.selectAll('circle');
            if (state.filterGenderActive) {
                if (state.filterRaceActive) {
                    // Gender & Race BG
                    circles.attr('fill', (d) => {
                        let fillId = 'url(#';
                        fillId += d.authorGender;
                        fillId += d.authorRace;
                        fillId += ')';
                        return fillId;
                    });
                } else {
                    // Gender but NO-Race BG
                    circles.attr('fill', (d) => {
                        let fillId = 'url(#';
                        fillId += d.authorGender;
                        fillId += '0';
                        fillId += ')';
                        return fillId;
                    });
                }
            } else {
                if (state.filterRaceActive) {
                    // NO Gender but Race BG
                    circles.attr('fill', (d) => {
                        let fillId = 'url(#';
                        fillId += 'u';
                        fillId += d.authorRace;
                        fillId += ')';
                        return fillId;
                    });
                } else {
                    // NO Gender & NO Race BG
                    circles.attr('fill', 'grey');
                }
            }
        }
    },
  
  actions: {
    // Here we will create Larry
  }
});

// Wenn man auf einen Node klickt, wie kommt man zum Ursprung?
// state.initial ?