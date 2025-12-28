import { configureStore, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { coupons } from "./coupon";
import apiurl from "./apiurl";

// Async Thunk
export const fetchVegProducts = createAsyncThunk(
  "veg/fetchVegProducts",
  async () => {
    const response = await apiurl.get("/api/v1/products/getveg");
    return response.data;
  }
  );
export const fetchNonvegProducts=createAsyncThunk(
  "nonveg/fetchnonVeg",
  async () => {
    const responce= await apiurl.get("/api/v1/products/getnonveg")
    return responce.data;
  }
);
export const placeOrder = createAsyncThunk(
  "orders/orders",
  async (orderData) => {
    const res = await apiurl.post("/api/v1/products/orders", orderData);
    return res.data;
  }
);

export const fetchOrders = createAsyncThunk(
  "orders/getOrders",
  async () => {
    const res = await apiurl.get("/api/v1/products/getorders");
    return res.data;
  }
);

export const registerUser = createAsyncThunk(
  "user/register",
  async (userDetails) => {
    const res = await apiurl.post("/api/v1/products/register", userDetails);
    return res.data;
  }
);




// Login Thunk
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await apiurl.post("/api/v1/products/login", {
        email,
        password,
      });

      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Login failed");
    }
  }
);





//Cart Slice
const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addtocart: (state, action) => {
      let item = state.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity += 1;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
    },

    removefromcart: (state, action) => {
      return state.filter((item) => item.id !== action.payload.id);
    },

    incrementQuantity: (state, action) => {
      let item = state.find((item) => item.id === action.payload.id);
      if (item) item.quantity += 1;
    },

    decrementQuantity: (state, action) => {
      let item = state.find((item) => item.id === action.payload.id);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          return state.filter((cartItem) => cartItem.id !== action.payload.id);
        }
      }
    },
    clearCart: () => {
      return [];
    },

  },
});

// ==================== Veg Slice
const vegSlice = createSlice({
  
  name: "veg",
  initialState: {
    vegItems: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchVegProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchVegProducts.fulfilled, (state, action) => {
        state.vegItems = action.payload;
        state.loading = false;

      })
      .addCase(fetchVegProducts.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading=false;
        
      });
  },
});

const nonvegslice=createSlice({
  name: "nonveg",
  initialState: {
    nonVegItems: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(fetchNonvegProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNonvegProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.nonVegItems = action.payload;
      })
      .addCase(fetchNonvegProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});


// ==================== Coupon Slice ===================
const couponSlice = createSlice({
  name: "coupon",
  initialState: { code: "", cdiscount: 0, applied: false, message: "" },
  reducers: {
    applyCoupon: (state, action) => {
      state.code = action.payload.code;
      if (coupons[state.code]) {
        state.cdiscount = coupons[state.code];
        state.applied = true;
        state.message = `Coupon ${state.code} applied successfully! You got ${state.cdiscount}% off.`;
      } else {
        state.code = "";
        state.cdiscount = 0;
        state.applied = false;
        state.message = "Invalid coupon code. Please try again.";
      }
    },
     resetCoupon: (state) => {
      state.cdiscount = 0;
      state.applied = false;
      state.message = '';
    },
  },
});

const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    loading: false,
    error: null,
    successMessage: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })

      .addCase(placeOrder.fulfilled, (state, action) => {
        state.loading = false;

        state.successMessage = action.payload.message || "Order placed successfully";
      })

      .addCase(placeOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to place order";
      });
  },
});

//getorders slice
const getordersSlice = createSlice({
  name: "allorders",
  initialState: {
    loading: false,
    error: null,
    orders: [],
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload; 
      })

      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to load orders";
      });
  },
});

//New user slice
const newUserSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    error: null,
    successMessage: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })

      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;

        state.successMessage = action.payload.message || "Registration successfully";
      })

      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to Register";
      });
  },
});

//login slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,    
    loading: false,
    error: null,
    successMessage: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    },
     clearAuthMessages: (state) => {
      state.successMessage = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message || "Login successful";
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, clearAuthMessages } = authSlice.actions;

//Export Actions
export const { addtocart, removefromcart, incrementQuantity, decrementQuantity, clearCart } =
  cartSlice.actions;
export const { applyCoupon,resetCoupon } = couponSlice.actions;

//Store
const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    coupon: couponSlice.reducer,
    veg: vegSlice.reducer,
    nonveg: nonvegslice.reducer,
    orders: ordersSlice.reducer,
    allorders: getordersSlice.reducer,
    newuser :newUserSlice.reducer,
    auth:authSlice.reducer
  },
});

export default store;
