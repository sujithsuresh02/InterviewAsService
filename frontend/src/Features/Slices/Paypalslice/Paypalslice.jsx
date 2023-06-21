
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import myAxios from "../../../api/company/addRequestSlice.api";


 export  const createOrder = async ({data, actions}) => {
    try {
      // Make a POST request to your backend API for creating a PayPal order
      const response = await myAxios.post('/my-server/create-paypal-order', {
        cart: [
          {
            sku: 'YOUR_PRODUCT_STOCK_KEEPING_UNIT',
            quantity: 'YOUR_PRODUCT_QUANTITY',
          },
        ],
      });

      // Return the order ID from the response
      return response.data.id;
    } catch (error) {
      console.error('Error creating PayPal order:', error);
      throw new Error('Failed to create PayPal order');
    }
  };
