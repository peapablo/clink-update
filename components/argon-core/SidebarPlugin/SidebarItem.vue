<template>
  <component
    :is="baseComponent"
    :to="link.path ? link.path : '/'"
    class="nav-item"
    :class="{ active: isActive }"
    tag="li"
  >
    <a
      v-if="isMenu"
      class="sidebar-menu-item nav-link"
      :class="{ active: isActive }"
      :aria-expanded="!collapsed"
      data-toggle="collapse"
      @click.prevent="collapseMenu"
    >
      <template v-if="addLink">
        <span class="nav-link-text">
          {{ link.name }}
        </span>
        <component
          :is="link.nameComponent"
          v-bind="link.nameComponentData"
        ></component>
        <b class="caret"></b>
      </template>
      <template v-else>
        <i :class="link.icon"></i>
        <span class="nav-link-text"
          >{{ link.name }}
          <component
            :is="link.nameComponent"
            v-bind="link.nameComponentData"
          ></component>
          <b class="caret"></b
        ></span>
      </template>
    </a>

    <collapse-transition>
      <div v-show="!collapsed" class="collapse show">
        <ul class="nav nav-sm flex-column">
          <slot></slot>
        </ul>
      </div>
    </collapse-transition>

    <slot
      name="title"
      v-if="children.length === 0 && !$slots.default && link.path"
    >
      <component
        :to="link.path"
        @click.native="linkClick"
        :is="elementType(link, false)"
        class="nav-link"
        :class="{ active: link.active }"
        :target="link.target"
        :href="link.path"
      >
        <template v-if="addLink">
          <span class="nav-link-text">{{ link.name }}</span>
        </template>
        <template v-else>
          <i :class="link.icon"></i>
          <span class="nav-link-text">{{ link.name }}</span>
        </template>
      </component>
    </slot>
  </component>
</template>
<script>
import { CollapseTransition } from "vue2-transitions";

export default {
  name: "sidebar-item",
  components: {
    CollapseTransition,
  },
  props: {
    menu: {
      type: Boolean,
      default: false,
      description:
        "Whether the item is a menu. Most of the item it's not used and should be used only if you want to override the default behavior.",
    },
    link: {
      type: Object,
      default: () => {
        return {
          name: "",
          nameComponent: {},
          nameComponentData: {},
          path: "",
          children: [],
        };
      },
      description:
        "Sidebar link. Can contain name, path, icon and other attributes. See examples for more info",
    },
  },
  provide() {
    return {
      addLink: this.addChild,
      removeLink: this.removeChild,
    };
  },
  inject: {
    addLink: { default: null },
    removeLink: { default: null },
    autoClose: {
      default: true,
    },
  },
  data() {
    return {
      children: [],
      collapsed: true,
    };
  },
  computed: {
    baseComponent() {
      return this.isMenu || this.link.isRoute ? "li" : "router-link";
    },
    isMenu() {
      if (
        this.link.nameComponent !== undefined &&
        this.link.nameComponent !== null
      ) {
        return true;
      }

      if (!this.$slots.default) {
        return false;
      }
      return this.$slots.default.some((item) => {
        return (item.tag ?? "").endsWith("sidebar-item");
      });
    },
    isActive() {
      if (this.$route && this.$route.path) {
        let matchingRoute = this.children.find((c) =>
          this.$route.path.startsWith(c.link.path)
        );
        if (matchingRoute !== undefined) {
          return true;
        }
      }
      return false;
    },
  },
  methods: {
    addChild(item) {
      const index = this.$slots.default.indexOf(item.$vnode);
      this.children.splice(index, 0, item);
    },
    removeChild(item) {
      const tabs = this.children;
      const index = tabs.indexOf(item);
      tabs.splice(index, 1);
    },
    elementType(link, isParent = true) {
      if (link.isRoute === false || link.path.startsWith("http")) {
        return isParent ? "li" : "a";
      } else {
        return "router-link";
      }
    },
    linkClick() {
      if (
        this.autoClose &&
        this.$sidebar &&
        this.$sidebar.showSidebar === true
      ) {
        this.$sidebar.displaySidebar(false);
      }
    },
    collapseMenu() {
      this.collapsed = !this.collapsed;
    },
  },
  mounted() {
    if (this.addLink) {
      this.addLink(this);
    }
    if (this.link.collapsed !== undefined) {
      this.collapsed = this.link.collapsed;
    }
    if (this.isActive && this.isMenu) {
      this.collapsed = false;
    }
  },
  destroyed() {
    if (this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el);
    }
    if (this.removeLink) {
      this.removeLink(this);
    }
  },
};
</script>
<style>
.sidebar-menu-item {
  cursor: pointer;
}
</style>
