<template>
    <div class="layout-px-spacing dash_1">
        <teleport to="#breadcrumb">
            <ul class="navbar-nav flex-row">
                <li>
                    <div class="page-header">
                        <nav class="breadcrumb-one" aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="javascript:;">Settings</a></li>
                                <li class="breadcrumb-item active" aria-current="page"><span>Dashboard</span></li>
                            </ol>
                        </nav>
                    </div>
                </li>
            </ul>

            <ul class="navbar-nav flex-row ms-auto">
                <li class="nav-item more-dropdown">
                    <div class="dropdown custom-dropdown-icon">
                        <a href="javascript:;" class="nav-link dropdown-toggle" id="ddlSettings" data-bs-toggle="dropdown" aria-expanded="false">
                            <span>Settings</span>
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
                                class="feather feather-chevron-down"
                            >
                                <polyline points="6 9 12 15 18 9"></polyline>
                            </svg>
                        </a>
                        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="ddlSettings">
                            <li><a class="dropdown-item" data-value="Settings" href="javascript:void(0);">Settings</a></li>
                            <li><a class="dropdown-item" data-value="Mail" href="javascript:void(0);">Mail</a></li>
                            <li><a class="dropdown-item" data-value="Print" href="javascript:void(0);">Print</a></li>
                            <li><a class="dropdown-item" data-value="Download" href="javascript:void(0);">Download</a></li>
                            <li><a class="dropdown-item" data-value="Share" href="javascript:void(0);">Share</a></li>
                        </ul>
                    </div>
                </li>
            </ul>
        </teleport>

        <div class="row layout-top-spacing">   
            
            <div>
                <div>
                    <h1>Hellow! Admin</h1>
                    <p>Welcome to the Settings Dashboard!</p>
                </div>
            </div>           

               <div class="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12 layout-spacing">
                <div class="widget widget-transaction">
                    <div class="widget-heading">
                        <h5>Church Positions</h5>
                        <div class="task-action">
                            <div class="dropdown btn-group">
                                <a href="javascript:;" id="ddlTransactions" class="btn dropdown-toggle btn-icon-only" data-bs-toggle="dropdown" aria-expanded="false">
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
                                <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="ddlTransactions">
                                    <li><a href="javascript:;" class="dropdown-item">View Report</a></li>
                                    <li><a href="javascript:;" class="dropdown-item">Edit Report</a></li>
                                    <li><a href="javascript:;" class="dropdown-item">Mark as Done</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div class="widget-content" v-for="position in positions">
                        <div class="transactions-list">
                            <div>
                                <span class="b-avatar  me-2  rounded-circle" :class="getRoleBadge(position.category)">
                                    <span class="b-avatar-text "><span>{{ position.code }}</span></span>
                                </span>
                                <div class="t-name">                                    
                                    <h4>{{ position.name_sw }}</h4>
                                    <p>{{ position.category }}</p>
                                </div>
                            </div>
                            <div :class="position.is_active ? 'text-success': 'text-danger'">{{ position.is_active ? 'Active' :'Inactive' }}</div>
                        </div>
                    </div>                  
                </div>
            </div>

            <div class="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12 layout-spacing">
                <div class="widget widget-transaction">
                    <div class="widget-heading">
                        <h5>Church Roles</h5>
                        <div class="task-action">
                            <div class="dropdown btn-group">
                                <a href="javascript:;" id="ddlTransactions" class="btn dropdown-toggle btn-icon-only" data-bs-toggle="dropdown" aria-expanded="false">
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
                                <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="ddlTransactions">
                                    <li><a href="javascript:;" class="dropdown-item">View Report</a></li>
                                    <li><a href="javascript:;" class="dropdown-item">Edit Report</a></li>
                                    <li><a href="javascript:;" class="dropdown-item">Mark as Done</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div class="widget-content" v-for="role in roles">
                        <div class="transactions-list">
                            <div>
                                <span class="b-avatar  me-2  rounded-circle" :class="getRoleBadge(role.category)">
                                    <span class="b-avatar-text"><span>{{ role.code }}</span></span>
                                </span>
                                <div class="t-name">                                    
                                    <h4>{{ role.name_sw }}</h4>
                                    <p>{{ role.category }}</p>
                                </div>
                            </div>
                            <div :class="role.is_active ? 'text-success': 'text-danger'">{{ role.is_active ? 'Active' :'Inactive' }}</div>
                        </div>
                    </div>                  
                </div>
            </div>

            <div class="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12 layout-spacing">
                <div class="widget widget-wallet-balance">
                    <div class="widget-heading d-block">
                        <div class="wallet-usr-info">
                            <div class="usr-name">
                                <span><img src="@/assets/images/profile-32.jpeg" alt="admin-profile" class="img-fluid" /> Alan Green</span>
                            </div>
                            <div class="add">
                                <span
                                    ><svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        class="feather feather-plus"
                                    >
                                        <line x1="12" y1="5" x2="12" y2="19"></line>
                                        <line x1="5" y1="12" x2="19" y2="12"></line></svg
                                ></span>
                            </div>
                        </div>
                        <div class="wallet-balance">
                            <p>Wallet Balance</p>
                            <h5><span class="w-currency">$</span>2953</h5>
                        </div>
                    </div>

                    <div class="widget-amount">
                        <div class="w-a-info funds-received me-3">
                            <span
                                >Received
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    class="feather feather-chevron-up text-success float-end"
                                >
                                    <polyline points="18 15 12 9 6 15"></polyline></svg
                            ></span>
                            <p>$97.99</p>
                        </div>
                        <div class="w-a-info funds-spent">
                            <span
                                >Spent
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    class="feather feather-chevron-down text-danger float-end"
                                >
                                    <polyline points="6 9 12 15 18 9"></polyline></svg
                            ></span>
                            <p>$53.00</p>
                        </div>
                    </div>

                    <div class="widget-content">
                        <div class="bills-stats mb-4">
                            <span>Pending</span>
                        </div>
                        <div class="invoice-list">
                            <div class="inv-detail mb-4">
                                <div class="info-detail-1">
                                    <p>Netflix</p>
                                    <p><span class="w-currency">$</span> <span class="bill-amount">13.85</span></p>
                                </div>
                                <div class="info-detail-2">
                                    <p>BlueHost VPN</p>
                                    <p><span class="w-currency">$</span> <span class="bill-amount">15.66</span></p>
                                </div>
                            </div>
                            <div class="inv-action">
                                <a href="javascript:;" class="btn view-details btn-outline-secondary">View Details</a>
                                <a href="javascript:;" class="btn pay-now btn-outline-success">Pay Now $29.51</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


             <div class="col-xl-6 col-lg-12 col-md-12 col-sm-12 col-12 layout-spacing">
                <div class="widget widget-recent-orders">
                    <div class="widget-heading">
                        <h5>Recent Orders</h5>
                    </div>
                    <div class="widget-content table-responsive">
                     <MemberRoles></MemberRoles>   
                    
                    </div>
                </div>
            </div>

            <div class="col-xl-6 col-lg-12 col-md-12 col-sm-12 col-12 layout-spacing">
                <div class="widget widget-recent-orders">
                    <div class="widget-heading">
                        <h5>Recent Orders</h5>
                    </div>
                    <div class="widget-content table-responsive">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th><div class="th-content">Customer</div></th>
                                    <th><div class="th-content">Product</div></th>
                                    <th><div class="th-content">Invoice</div></th>
                                    <th><div class="th-content th-heading">Price</div></th>
                                    <th><div class="th-content">Status</div></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <div class="td-content"><img src="@/assets/images/profile-13.jpeg" alt="avatar" /><span>Luke Ivory</span></div>
                                    </td>
                                    <td><div class="td-content text-primary">Headphone</div></td>
                                    <td><div class="td-content">#46894</div></td>
                                    <td>
                                        <div class="td-content"><span>$56.07</span></div>
                                    </td>
                                    <td>
                                        <div class="td-content"><span class="badge badge-success">Paid</span></div>
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        <div class="td-content"><img src="@/assets/images/profile-7.jpeg" alt="avatar" /><span>Andy King</span></div>
                                    </td>
                                    <td><div class="td-content text-warning">Nike Sport</div></td>
                                    <td><div class="td-content">#76894</div></td>
                                    <td>
                                        <div class="td-content"><span>$88.00</span></div>
                                    </td>
                                    <td>
                                        <div class="td-content"><span class="badge badge-primary">Shipped</span></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div class="td-content"><img src="@/assets/images/profile-10.jpeg" alt="avatar" /><span>Laurie Fox</span></div>
                                    </td>
                                    <td><div class="td-content text-danger">Sunglasses</div></td>
                                    <td><div class="td-content">#66894</div></td>
                                    <td>
                                        <div class="td-content"><span>$126.04</span></div>
                                    </td>
                                    <td>
                                        <div class="td-content"><span class="badge badge-success">Paid</span></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div class="td-content"><img src="@/assets/images/profile-5.jpeg" alt="avatar" /><span>Ryan Collins</span></div>
                                    </td>
                                    <td><div class="td-content text-warning">Sport</div></td>
                                    <td><div class="td-content">#89891</div></td>
                                    <td>
                                        <div class="td-content"><span>$108.09</span></div>
                                    </td>
                                    <td>
                                        <div class="td-content"><span class="badge badge-primary">Shipped</span></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div class="td-content"><img src="@/assets/images/profile-4.jpeg" alt="avatar" /><span>Irene Collins</span></div>
                                    </td>
                                    <td><div class="td-content text-primary">Speakers</div></td>
                                    <td><div class="td-content">#75844</div></td>
                                    <td>
                                        <div class="td-content"><span>$84.00</span></div>
                                    </td>
                                    <td>
                                        <div class="td-content"><span class="badge badge-danger">Pending</span></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div class="td-content"><img src="@/assets/images/profile-11.jpeg" alt="avatar" /><span>Sonia Shaw</span></div>
                                    </td>
                                    <td><div class="td-content text-danger">Watch</div></td>
                                    <td><div class="td-content">#76844</div></td>
                                    <td>
                                        <div class="td-content"><span>$110.00</span></div>
                                    </td>
                                    <td>
                                        <div class="td-content"><span class="badge badge-success">Paid</span></div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div class="col-xl-6 col-lg-12 col-md-12 col-sm-12 col-12 layout-spacing">
                <div class="widget widget-top-selling-products">
                    <div class="widget-heading">
                        <h5>Top Selling Product</h5>
                    </div>

                    <div class="widget-content table-responsive">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th><div class="th-content">Product</div></th>
                                    <th><div class="th-content th-heading">Price</div></th>
                                    <th><div class="th-content th-heading">Discount</div></th>
                                    <th><div class="th-content">Sold</div></th>
                                    <th><div class="th-content">Source</div></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <div class="td-content d-flex">
                                            <img src="@/assets/images/product-headphones.jpg" alt="product" />
                                            <div class="align-self-center">
                                                <p class="prd-name">Headphone</p>
                                                <p class="prd-category text-primary">Digital</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="td-content"><span class="pricing">$168.09</span></div>
                                    </td>
                                    <td>
                                        <div class="td-content"><span class="discount-pricing">$60.09</span></div>
                                    </td>
                                    <td><div class="td-content">170</div></td>
                                    <td>
                                        <div class="td-content">
                                            <a href="javascript:void(0);" class="text-danger"
                                                ><svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    stroke-width="2"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    class="feather feather-chevrons-right"
                                                >
                                                    <polyline points="13 17 18 12 13 7"></polyline>
                                                    <polyline points="6 17 11 12 6 7"></polyline>
                                                </svg>
                                                Direct</a
                                            >
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div class="td-content d-flex">
                                            <img src="@/assets/images/product-shoes.jpg" alt="product" />
                                            <div class="align-self-center">
                                                <p class="prd-name">Shoes</p>
                                                <p class="prd-category text-warning">Faishon</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="td-content"><span class="pricing">$108.09</span></div>
                                    </td>
                                    <td>
                                        <div class="td-content"><span class="discount-pricing">$47.09</span></div>
                                    </td>
                                    <td><div class="td-content">130</div></td>
                                    <td>
                                        <div class="td-content">
                                            <a href="javascript:void(0);" class="text-primary"
                                                ><svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    stroke-width="2"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    class="feather feather-chevrons-right"
                                                >
                                                    <polyline points="13 17 18 12 13 7"></polyline>
                                                    <polyline points="6 17 11 12 6 7"></polyline>
                                                </svg>
                                                Google</a
                                            >
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div class="td-content d-flex">
                                            <img src="@/assets/images/product-watch.jpg" alt="product" />
                                            <div class="align-self-center">
                                                <p class="prd-name">Watch</p>
                                                <p class="prd-category text-danger">Accessories</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="td-content"><span class="pricing">$88.00</span></div>
                                    </td>
                                    <td>
                                        <div class="td-content"><span class="discount-pricing">$20.00</span></div>
                                    </td>
                                    <td><div class="td-content">66</div></td>
                                    <td>
                                        <div class="td-content">
                                            <a href="javascript:void(0);" class="text-warning"
                                                ><svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    stroke-width="2"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    class="feather feather-chevrons-right"
                                                >
                                                    <polyline points="13 17 18 12 13 7"></polyline>
                                                    <polyline points="6 17 11 12 6 7"></polyline>
                                                </svg>
                                                Ads</a
                                            >
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div class="td-content d-flex">
                                            <img src="@/assets/images/product-laptop.jpg" alt="product" />
                                            <div class="align-self-center">
                                                <p class="prd-name">Laptop</p>
                                                <p class="prd-category text-primary">Digital</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="td-content"><span class="pricing">$110.00</span></div>
                                    </td>
                                    <td>
                                        <div class="td-content"><span class="discount-pricing">$33.00</span></div>
                                    </td>
                                    <td><div class="td-content">35</div></td>
                                    <td>
                                        <div class="td-content">
                                            <a href="javascript:void(0);" class="text-info"
                                                ><svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    stroke-width="2"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    class="feather feather-chevrons-right"
                                                >
                                                    <polyline points="13 17 18 12 13 7"></polyline>
                                                    <polyline points="6 17 11 12 6 7"></polyline>
                                                </svg>
                                                Email</a
                                            >
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div class="td-content d-flex">
                                            <img src="@/assets/images/product-camera.jpg" alt="product" />
                                            <div class="align-self-center">
                                                <p class="prd-name">Camera</p>
                                                <p class="prd-category text-primary">Digital</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="td-content"><span class="pricing">$126.04</span></div>
                                    </td>
                                    <td>
                                        <div class="td-content"><span class="discount-pricing">$26.04</span></div>
                                    </td>
                                    <td><div class="td-content">30</div></td>
                                    <td>
                                        <div class="td-content">
                                            <a href="javascript:void(0);" class="text-secondary"
                                                ><svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    stroke-width="2"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    class="feather feather-chevrons-right"
                                                >
                                                    <polyline points="13 17 18 12 13 7"></polyline>
                                                    <polyline points="6 17 11 12 6 7"></polyline>
                                                </svg>
                                                Referral</a
                                            >
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import '@/assets/sass/widgets/widgets.scss';
    import { computed, ref ,onMounted } from 'vue';
    import { useStore } from 'vuex';
    import { axiosInstance } from '@/services/axios';
    import { useRoute ,useRouter } from 'vue-router';
    import { useMeta } from '@/composables/use-meta';
    useMeta({ title: 'Settings Dashboard' });
    import MemberRoles  from '../memberRole/index.vue'
     
    const store = useStore();



    // pages variable
   const roles = ref([]);
   const positions = ref([]);
   const isLoading = ref(false);




    //page function

    function getRoleBadge(category) {
        const badges = {
            pastoral: 'icon-fill-secondary badge-primary',
            elder: 'icon-fill-info badge-info',
            deacon: 'icon-fill-warning badge-warning',
            skill: 'icon-fill-info badge-success', 
            leadership: 'icon-fill-primary badge-success',          
        };
        return badges[category] || 'icon-fill-danger badge-default';
    }


    //API FUNCTION

const  LoadingRoles = async () => {
    isLoading.value = true;
    try{
    const response = await axiosInstance.get('/roles/');
    roles.value = response.data;
    }catch(e){
        console.error("Failed to fetch Roles", e)
    }finally{
        isLoading.value =false;
    }
}

const  LoadingPosition = async () => {
    isLoading.value = true;
    try{
    const response = await axiosInstance.get('/positions/');
    positions.value = response.data;
    }catch(e){
        console.error("Failed to fetch positions", e)
    }finally{
        isLoading.value =false;
    }
}


//initialize

onMounted(() => {
    LoadingRoles();
    LoadingPosition();
})

</script>