package com.ez.shopnowbackend.entity;

import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;

@Entity
@Table(name="product")
// generate getter/setter
@Data
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "unitPrice")
    private BigDecimal unitPrice;

    @Column(name = "imageUrl")
    private String imageUrl;

    @Column(name = "active")
    private boolean active;

    @Column(name = "unitInStock")
    private int unitInStock;

    // foreign key "categoryId"
    @ManyToOne
    @JoinColumn(name = "categoryId", nullable = false)
    private ProductCategory category;

    @Column(name = "dateCreated")
    @CreationTimestamp
    private Date dateCreated;

    @Column(name = "lastUpdated")
    @UpdateTimestamp
    private Date lastUpdated;
}

