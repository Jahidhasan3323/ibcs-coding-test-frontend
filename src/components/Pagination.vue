<template>
  <nav class="flex justify-around m-5 row" aria-label="...">
    <div class="col-md-4">
      <div class="show">
        <select v-model="$parent.form.per_page" @change="$parent.getLists()"
                class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
          <option value="12">12</option>
          <option value="15">15</option>
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="100">100</option>
          <option value="500">500</option>
        </select>
      </div>
      <div class="show">
        Showing {{ pagination.from }} to {{ pagination.to }} of {{ pagination.total }} entries
      </div>
    </div>
    <div class="col-md-8">
    <div>
      <ul class="pagination inline-flex">
        <li style="cursor: pointer" @click.prevent="changePage(1)"
            class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
            :class="{ 'opacity-50 cursor-not-allowed': pagination.current_page <= 1 }">
          <i class="fas fa-angle-double-left"></i>
        </li>
        <li style="cursor: pointer" @click.prevent="changePage(pagination.current_page - 1)"
            class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
            :class="{ 'opacity-50 cursor-not-allowed': pagination.current_page <= 1 }">
          <i class="fas fa-arrow-left"></i>
        </li>

        <li style="cursor: pointer" @click.prevent="changePage(page)"
            class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l" v-for="page in pages"
            :key="page" :class="isCurrentPage(page) ? 'active' : ''">
          {{ page }}<span v-if="isCurrentPage(page)" class="sr-only">(current)</span>
        </li>

        <li style="cursor: pointer" @click.prevent="changePage(pagination.current_page + 1)"
            class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
            :class="{ 'opacity-50 cursor-not-allowed': pagination.current_page >= pagination.last_page }">
          <i class="fas fa-arrow-right"></i>
        </li>
        <li style="cursor: pointer" @click.prevent="changePage(pagination.last_page)"
            class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
            :class="{ 'opacity-50 cursor-not-allowed': pagination.current_page >= pagination.last_page }">
          <i class="fas fa-angle-double-right"></i>
        </li>
      </ul>
    </div>
    </div>
  </nav>
</template>
<script>
export default {
  props: ['pagination', 'offset'],
  methods: {
    isCurrentPage(page) {
      return this.pagination.current_page === page
    },
    changePage(page) {
      if (page > this.pagination.last_page) {
        page = this.pagination.last_page;
      }
      this.pagination.current_page = page;
      this.$emit('paginate');
    }
  },
  computed: {
    pages() {
      let pages = []

      let from = this.pagination.current_page - Math.floor(this.offset / 2)

      if (from < 1) {
        from = 1
      }

      let to = from + this.offset - 1

      if (to > this.pagination.last_page) {
        to = this.pagination.last_page
      }

      while (from <= to) {
        pages.push(from)
        from++
      }

      return pages
    }
  }
}
</script>

