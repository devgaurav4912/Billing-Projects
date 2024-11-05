package com.restaurant_backend.restaurant_backend.service.impl;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.restaurant_backend.restaurant_backend.entity.TransactionDetails;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

@Service
public class PaymentService {

    private static final String razorpayKeyId = "rzp_test_wRZmGuu081rGQe";
    private static final String razorpayKeySecret= "yPpkqfWjypvNvH3Rs46m3GMZ";
    private  static final String CURRENCY = "INR";

        public TransactionDetails createTransaction(Double amount){
        //amount , currency , key , secretKey

        try{
            JSONObject jsonObject = new JSONObject();
            jsonObject.put("amount", amount * 100);
            jsonObject.put("currency", CURRENCY);

            RazorpayClient razorpayClient =new RazorpayClient(razorpayKeyId,razorpayKeySecret);

           Order order = razorpayClient.orders.create(jsonObject);

          TransactionDetails transactionDetails = prepareTransactionDetails(order);

          return  transactionDetails;

        }catch (Exception e){

            System.out.println(e.getMessage());
        }
        return  null;
    }

    private  TransactionDetails prepareTransactionDetails(Order order){
        String orderId = order.get("id");
        String currency = order.get("currency");
        Integer amount = order.get("amount");

        TransactionDetails transactionDetails = new TransactionDetails(orderId , currency , amount , razorpayKeyId);
        return  transactionDetails ;

    }
}