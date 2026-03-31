<template>
  <div
    class="modal fade"
    :id="id"
    tabindex="-1"
    aria-hidden="true"
  >
    <div
      class="modal-dialog modal-dialog-centered"
      :class="dialogClass"
    >
      <div class="modal-content">

        <div class="modal-header">
          <h5 class="modal-title">{{ title }}</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
          ></button>
        </div>

        <div class="modal-body">
          <slot />
        </div>

        <div class="modal-footer">
          <slot name="footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </slot>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseModal',
  props: {
    id: {
      type: String,
      required: true
    },
    title: {
      type: String,
      default: 'Modal'
    },
    size: {
      type: String,
      default: 'md', // sm | md | lg | xl | fullscreen
    }
  },
  computed: {
    dialogClass() {
      return {
        'modal-sm': this.size === 'sm',
        'modal-lg': this.size === 'lg',
        'modal-xl': this.size === 'xl',
        'modal-fullscreen': this.size === 'fullscreen',
      };
    }
  }
}
</script>
