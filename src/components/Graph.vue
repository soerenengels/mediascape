<template>
    <div class="graph">
        <div class="left-arrow">
            <div class="left-arrow-line"></div>
            <span class="left-arrow-beschriftung">Aktualität</span>
        </div>
        <GraphLabels />
        <!-- Karte von Referenzen wird hier eingefügt -->
    </div>
</template>

<script>
import * as d3 from "d3";
import GraphLabels from '../components/GraphLabels.vue';

export default {
    name: 'Graph',
    components: { GraphLabels },
    props: ['node_id'],
    watch: {
        $route(from, to) {
            if (from.params.node_id !== to.params.node_id) {
                console.log('Die Route hat sich verändert!')
                // Lösche alte Verlinkungen
                d3.selectAll('line').classed("links", false);
                d3.selectAll('circle').attr('fill', 'grey');
                // Markiere aktiven Node
                d3.selectAll('circle').filter((d) => d.id == this.node_id).attr('fill', 'red');
                // Zeige aktuelle Verlinkungen an
                let sourceClass = ".source" + this.node_id;
                d3.selectAll(sourceClass).classed("links", true);
            }
            // this.active_id = this.node_id;
            
            // bei aktiver author-route: author hervorheben
        }
    }
}
</script>

<style scoped>
    @media screen and (max-width: 799px) {
        .graph, .left-arrow { 
            height: 75vh !important;
        }
        
        
    }
    .graph {
        display: block;
        width: 75vw;
        height: 100vh;
    }
    


    /* Pfeil am linken Rand */
.left-arrow {
    height: 100vh;
    width: 60px;
    position: absolute;
    top: 0;
    z-index: -10;
}
.left-arrow-line {
    display: flex;
    height: 100%;
    width: 2px;
    background: #000000;
    margin: 0 auto;
}
.left-arrow-line::before, .left-arrow-line::after {
    content: "";
    display: flex;
    height: 29px;
    width: 29px;
    position: relative;
    border-right: 2px solid black;
    align-self: flex-end;
}
.left-arrow-line::before { 
    -ms-transform: skewX(40deg);
    transform: skewX(40deg);
    left: calc(-11px - 50%);
}
.left-arrow-line::after { 
    -ms-transform: skewX(-40deg);
    transform: skewX(-40deg);
    left: calc(50% + 9px);
}
.left-arrow-beschriftung {
    position: absolute;
    font-size: .8rem;
    top: calc(2 * 1rem);
    left: calc(-0.8rem - 2px);
    transform: rotate(270deg);
}
    
</style>