<template>
    <div class="layout-px-spacing">
        <teleport to="#breadcrumb">
            <ul class="navbar-nav flex-row">
                <li>
                    <div class="page-header">
                        <nav class="breadcrumb-one" aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="javascript:;">Clients</a></li>
                                <li class="breadcrumb-item active" aria-current="page"><span>Hotsport Clients</span></li>
                            </ol>
                        </nav>
                    </div>
                </li>
            </ul>
        </teleport>

        <div class="row layout-top-spacing" >
           
            <div class="col-xl-3 col-lg-12 col-md-12 col-sm-12 col-12 layout-spacing">
                <div class="widget widget-statistics">
                    <div class="widget-heading">
                        <h5>Statistics</h5>
                        <div class="task-action">                           
                        </div>
                    </div>
                    <div class="widget-content">
                        <div class="row">
                            <div class="col-6">
                                <div class="w-detail">
                                    <p class="w-title">Total Visits</p>
                                    <p class="w-stats">423,964</p>
                                </div>
                                <apexchart v-if="total_visit_options" height="58" type="line" :options="total_visit_options" :series="total_visit_series"></apexchart>
                            </div>
                            <div class="col-6">
                                <div class="w-detail">
                                    <p class="w-title">Paid Visits</p>
                                    <p class="w-stats">7,929</p>
                                </div>
                                <apexchart v-if="paid_visit_options" height="58" type="line" :options="paid_visit_options" :series="paid_visit_series"></apexchart>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12 layout-spacing">
                <div class="widget widget-expenses">
                    <div class="widget-heading">
                        <h5>Expenses</h5>
                        <div class="task-action">
                            <div class="dropdown btn-group">                               
                                <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="ddlExpenses">
                                    <li><a href="javascript:;" class="dropdown-item">This Week</a></li>
                                    <li><a href="javascript:;" class="dropdown-item">Last Week</a></li>
                                    <li><a href="javascript:;" class="dropdown-item">Last Month</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="widget-content">
                        <p class="value">
                            $ 45,141
                            <span>this week </span>                          
                        </p>                        
                    </div>
                </div>
            </div>

            <div class="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12 layout-spacing">
                <div class="widget widget-expenses">
                    <div class="widget-heading">
                        <h5>Expenses</h5>
                        <div class="task-action">
                            <div class="dropdown btn-group">
                                <a href="javascript:;" id="ddlExpenses" class="btn dropdown-toggle btn-icon-only" data-bs-toggle="dropdown" aria-expanded="false">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        class="feather feather-more-horizontal"
                                    >
                                        <circle cx="12" cy="12" r="1"></circle>
                                        <circle cx="19" cy="12" r="1"></circle>
                                        <circle cx="5" cy="12" r="1"></circle>
                                    </svg>
                                </a>
                                <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="ddlExpenses">
                                    <li><a href="javascript:;" class="dropdown-item">This Week</a></li>
                                    <li><a href="javascript:;" class="dropdown-item">Last Week</a></li>
                                    <li><a href="javascript:;" class="dropdown-item">Last Month</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div class="widget-content">
                        <p class="value">
                            $ 45,141
                            <span>this week </span>                            
                        </p>
                         </div>
                </div>
            </div>

            <div class="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12 layout-spacing">
                <div class="d-flex ">
                   
       <button
  class="btn btn-success col-md-12"
  data-bs-toggle="modal"
  data-bs-target="#registerClientModal"
>
  Add Clients
</button>

                 
                </div>
                <div>
                    <button class="btn btn-secondary mt-2 col-md-12">Add Clients</button>                    
                </div>
                <div>
                    <button class="btn btn-primary mt-2 col-md-12">Add Clients</button>
                    
                </div>
            </div>

        </div>

        <div class="row layout-top-spacing">
            <div class="col-xl-12 col-lg-12 col-sm-12 layout-spacing">
                <div class="panel br-6 p-0">
                    <div class="custom-table">
                        <v-client-table :data="items" :columns="columns" :options="table_option">
                            <template #name="props">
                                <div class="d-flex">
                                    <div class="usr-img-frame me-2 rounded-circle">
                                        <img :src="require('@/assets/images/' + props.row.thumb)" class="img-fluid rounded-circle" alt="avatar" />
                                    </div>
                                    <p class="align-self-center mb-0 admin-name">{{ props.row.name }}</p>
                                </div>
                            </template>
                            <template #salary="props"> ${{ props.row.salary }} </template>
                        </v-client-table>
                    </div>
                </div>
            </div>
        </div>
        <BaseModal
    id="registerClientModal"
    title="Register Client"
     size="lg"
>
    <!-- BODY CONTENT (FORM) -->
     <div class="row">
  <div class="col-md-6 mb-3">
        <label class="form-label">Company</label>
        <input v-model="company" type="text" class="form-control" />
    </div>

    <div class="col-md-6 mb-3">
        <label class="form-label">Full Name</label>
        <input v-model="fullname" type="text" class="form-control" />
    </div>

    <div class="col-md-6 mb-3">
        <label class="form-label">Username</label>
        <input v-model="username" type="text" class="form-control" />
    </div>

    <div class="col-md-6 mb-3">
        <label class="form-label">Phone Number</label>
        <input v-model="phone_number" type="text" class="form-control" />
    </div>

    <div class="col-md-12 mb-3">
        <label class="form-label">MAC Address</label>
        <input v-model="mac_address" type="text" class="form-control" />
    </div>

     </div>
    

    <!-- FOOTER -->
    <template #footer>
        <button
            class="btn btn-secondary"
            data-bs-dismiss="modal"
        >
            Cancel
        </button>

        <button
            class="btn btn-success"
            @click="registerClient"
        >
            Register
        </button>
    </template>
</BaseModal>


    </div>
</template>


<script setup>
    import { onMounted, ref } from 'vue';
    import axiosInstance from '@/services/axios'       
    import BaseModal from "@/components/plugins/modal.vue";
    import { useMeta } from '@/composables/use-meta';
    import { useNotification } from '@/composables/swal';
    const { showAlert } = useNotification();
    useMeta({ title: 'Hotspot Clients' });

    const isRegister = ref("");
    const company = ref("");
    const fullname = ref("");
    const username = ref("");
    const phone_number = ref("");
    const mac_address = ref("");
    const is_active = ref("");

    const columns = ref(['name', 'position', 'office', 'age', 'start_date', 'salary']);
    const items = ref([]);
    const table_option = ref({
        perPage: 10,
        perPageValues: [5, 10, 20, 50],
        skin: 'table',
        columnsClasses: { actions: 'actions text-center' },
        sortable: [],
        pagination: { nav: 'scroll', chunk: 5 },
        texts: {
            count: 'Showing {from} to {to} of {count}',
            filter: '',
            filterPlaceholder: 'Search...',
            limit: 'Results:',
        },
        sortable: ['name', 'position', 'office', 'age', 'start_date', 'salary'],
        sortIcon: {
            base: 'sort-icon-none',
            up: 'sort-icon-asc',
            down: 'sort-icon-desc',
        },
        resizableColumns: false,
    });



const registerClient = async () => {
  try {
    const payload = {
      companyId: 1,               // hii pekee inatosha
      fullName: fullname.value,
      userName: username.value,
      phoneNumber: phone_number.value,
      mac_address: mac_address.value,
      is_active: is_active.value,
    };

    const res = await axiosInstance.post('/clients/', payload);

    console.log(res.data);

    if (res.data.status === 201) {
      showAlert('success', res.data.message);

      const modalEl = document.getElementById('registerClientModal');
      const modal =
        bootstrap.Modal.getInstance(modalEl) ||
        new bootstrap.Modal(modalEl);

      modal.hide();
      clearAlldata();
    }

  } catch (error) {
    console.error(error.response?.data || error);

    showAlert(
      'error',
      error.response?.data?.message || 'Failed to register client'
    );
  }
};

const fetchClient = async () => {
  try {
   
    const res = await axiosInstance.get('/clients/');

   

    if (res.data.status === 201) {
      showAlert('success', res.data.message);     
    }

  } catch (error) {
    console.error(error.response?.data || error);
    showAlert(
      'error',
      error.response?.data?.message || 'Failed to register client'
    );
  }
};


const clearAlldata = () => {
      company.value = '';        
      fullname.value = '';
      username.value  = '';
      phone_number.value  = '';
      mac_address.value  = '';
      is_active.value  = '';
}

onMounted(() => {
    fetchClient();
});
   
</script>
