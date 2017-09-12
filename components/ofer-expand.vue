<template>
  <div :class="{ 'expand': true, expanded: expandedData }" >
    <div class="expand__content" v-html="content"></div>
    <div class="expand__less-more">
      <span class="gradient"></span>
      <span class="see-more" v-on:click="expandOrContract">
        <span v-if="!expandedData">...</span>
        <span class="see-more__text" v-if="!expandedData" v-html="seeMore"></span>
        <span class="see-more__text" v-if="expandedData" v-html="seeLess"></span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    content: {
      type: String
    },
    seeMore: {
      type: String,
      default () {
        return 'Ver más'
      }
    },
    seeLess: {
      type: String,
      default () {
        return 'Ver menos'
      }
    },
    expanded: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      expandedData: false
    }
  },
  methods: {
    expandOrContract () {
      this.expandedData = !this.expandedData
    }
  }
}
</script>

<style>
.expand {
  position: relative;
  margin-bottom: 10px;
}

.expand__less-more {
    display: none;
}

@media (max-width: 600px) {
  .expand__content {
    max-height: 58px;
    overflow: hidden;
    padding-bottom: 10px;
    transition: all ease 0.4s;
  }

  .expanded .expand__content {
    max-height: 1000px;
  }

  .expand__less-more {
    display: block;
    position: absolute;
    right: 0;
    bottom: -5px;
    background-color: white;
  }

  .expanded .expand_less-more {
    display: inline;
    position: relative;
  }

  .gradient {
    opacity: 0.7;
    width:100px;
    position: absolute;
    right:100%;
    height: 100%;
    background-image: linear-gradient(90deg, hsla(0,0%,100%,0), #fff);
  }

  .see-more {
    width:30px;
    font-weight: bold;
    color: #1976d2;
    cursor: pointer;
  }
}
</style>
