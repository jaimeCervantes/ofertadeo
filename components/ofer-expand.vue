<template>
  <div class="expand" :class="wrapperClasses">
    <div class="expand__content" v-html="content"></div>
    <div class="expand__less-more">
      <span class="gradient"></span>
      <span class="see-more" v-on:click="toggleExpand">
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
  computed: {
    // v-bin:class can accept an object and live together with the normal
    // class attribute, so for example:
    // <div class="expand" :class="wrapperClasses"> === <div class="expand expanded">
    wrapperClasses () {
      return { expanded: this.expandedData }
    },
    expandedData () {
      return this.expanded
    }
  },
  methods: {
    toggleExpand () {
      this.$emit('on-expanded', { expanded: !this.expanded })
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

@media (max-width: 768px) {
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
