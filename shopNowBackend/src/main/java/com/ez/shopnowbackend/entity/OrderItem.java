package com.ez.shopnowbackend.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name="orderItem")
@Getter
@Setter
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;

    @Column(name="imageUrl")
    private String imageUrl;

    @Column(name="unitPrice")
    private BigDecimal unitPrice;

    @Column(name="quantity")
    private int quantity;

    @Column(name="productId")
    private Long productId;

    @ManyToOne
    @JoinColumn(name = "orderId")
    private Order order;

}
