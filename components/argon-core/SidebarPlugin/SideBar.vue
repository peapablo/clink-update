<template>
  <div
    class="
      sidenav
      navbar navbar-vertical
      fixed-left
      navbar-expand-xs navbar-light
      bg-white
    "
    @mouseenter="$sidebar.onMouseEnter()"
    @mouseleave="$sidebar.onMouseLeave()"
    :data="backgroundColor"
    style="z-index: 999"
  >
    <div class="scrollbar-inner" ref="sidebarScrollArea">
      <div class="sidenav-header d-flex align-items-center">
        <a class="navbar-brand">
          <img :src="logo" class="navbar-brand-img" alt="Sidebar logo" />
        </a>
        <div class="ml-auto">
          <!-- Sidenav toggler -->
          <div
            class="sidenav-toggler d-none d-xl-block"
            :class="{ active: !$sidebar.isMinimized }"
            @click="minimizeSidebar"
          >
            <div class="sidenav-toggler-inner">
              <i class="sidenav-toggler-line"></i>
              <i class="sidenav-toggler-line"></i>
              <i class="sidenav-toggler-line"></i>
            </div>
          </div>
          <!-- Sidenav toggler -->
          <div
            class="pr-3 sidenav-toggler d-xl-none"
            :class="{ active: !$sidebar.isMinimized }"
            @click="toggleSidebar"
          >
            <div class="sidenav-toggler-inner">
              <i class="fas fa-times"></i>
            </div>
          </div>
        </div>
      </div>
      <slot></slot>
      <div class="navbar-inner">
        <ul class="navbar-nav">
          <slot name="links">
            <sidebar-item
              v-for="(link, index) in sidebarLinks"
              :key="link.name + index"
              :link="link"
            >
              <sidebar-item
                v-for="(subLink, index) in link.children"
                :key="subLink.name + index"
                :link="subLink"
              >
              </sidebar-item>
            </sidebar-item>
          </slot>
        </ul>
        <slot name="links-after"></slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'sidebar',
  props: {
    title: {
      type: String,
      default: 'Clink',
      description: 'Sidebar title',
    },
    shortTitle: {
      type: String,
      default: 'CT',
      description: 'Sidebar short title',
    },
    logo: {
      type: String,
      default: 'img/logo/clinag_logo.png',
      description: 'Sidebar app logo',
    },
    backgroundColor: {
      type: String,
      default: 'vue',
      validator: (value) => {
        let acceptedValues = [
          '',
          'vue',
          'blue',
          'green',
          'orange',
          'red',
          'primary',
        ];
        return acceptedValues.indexOf(value) !== -1;
      },
      description:
        'Sidebar background color (vue|blue|green|orange|red|primary)',
    },
    sidebarLinks: {
      type: Array,
      default: () => [],
      description:
        "List of sidebar links as an array if you don't want to use components for these.",
    },
    autoClose: {
      type: Boolean,
      default: true,
      description:
        'Whether sidebar should autoclose on mobile when clicking an item',
    },
  },
  provide() {
    return {
      autoClose: this.autoClose,
    };
  },
  methods: {
    minimizeSidebar() {
      if (this.$sidebar) {
        this.$sidebar.toggleMinimize();
      }
    },
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
  },
  mounted() {
    this.$sidebar.isMinimized = this.$sidebar.breakpoint < window.innerWidth;
    this.minimizeSidebar();
  },
  beforeDestroy() {
    if (this.$sidebar.showSidebar) {
      this.$sidebar.showSidebar = false;
    }
  },
};
</script>
